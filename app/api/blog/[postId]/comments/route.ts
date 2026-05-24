import { NextResponse } from "next/server";
import { redis, keys } from "@/lib/redis";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { validateComment } from "@/lib/sanitize";
import { getServerFingerprint } from "@/lib/fingerprint";

interface RouteParams {
  params: Promise<{ postId: string }>;
}

export interface StoredComment {
  id: string;
  postId: string;
  text: string;
  authorName: string;
  authorFingerprint: string; // hashed, for admin dedup
  parentId: string | null;
  approved: boolean;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  // replies are assembled client-side from flat list
}

// GET /api/blog/[postId]/comments
export async function GET(_request: Request, { params }: RouteParams) {
  const { postId } = await params;

  try {
    // Get all comment IDs for this post, sorted by timestamp (newest first)
    const commentIds = await redis.zrange(keys.comments(postId), 0, -1, {
      rev: true,
    });

    if (!commentIds || commentIds.length === 0) {
      return NextResponse.json({ comments: [], count: 0 });
    }

    // Batch fetch all comments
    const commentDataList = await Promise.all(
      commentIds.map((id) =>
        redis.get<StoredComment>(keys.comment(id as string)),
      ),
    );

    const autoApprove = process.env.AUTO_APPROVE_COMMENTS === "true";

    // Filter: only approved (or all if auto-approve is on)
    // Pinned comments always shown first
    const visible = commentDataList
      .filter(
        (c): c is StoredComment => c !== null && (c.approved || autoApprove),
      )
      .sort((a: StoredComment, b: StoredComment) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

    // Strip fingerprint from public response
    const safe = visible.map(({ authorFingerprint: _f, ...rest }: StoredComment) => rest);

    return NextResponse.json({
      comments: safe,
      count: safe.length,
    });
  } catch (err) {
    console.error("[comments GET]", err);
    return NextResponse.json({ comments: [], count: 0 });
  }
}

// POST /api/blog/[postId]/comments
export async function POST(request: Request, { params }: RouteParams) {
  const { postId } = await params;
  const ip = getClientIp(request);

  // Rate limit: 3 comments per 60 seconds per IP
  const { success, remaining } = await rateLimit(ip, "comment", 3, 60);
  if (!success) {
    return NextResponse.json(
      { error: "Too many comments. Please wait a moment." },
      {
        status: 429,
        headers: { "Retry-After": "60" },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Inject postId into validation
  const input = { ...(body as object), postId };
  const validation = validateComment(input);

  if (!validation.valid || !validation.sanitized) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { text, authorName, parentId } = validation.sanitized;
  const fingerprint = await getServerFingerprint(request);
  const autoApprove = process.env.AUTO_APPROVE_COMMENTS === "true";

  // Validate parentId exists if provided
  if (parentId) {
    const parent = await redis.get<StoredComment>(keys.comment(parentId));
    if (!parent || parent.postId !== postId) {
      return NextResponse.json(
        { error: "Invalid parent comment" },
        { status: 400 },
      );
    }
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const comment: StoredComment = {
    id,
    postId,
    text,
    authorName: authorName || "anonymous",
    authorFingerprint: fingerprint,
    parentId: parentId || null,
    approved: autoApprove,
    pinned: false,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const timestamp = Date.now();

    await Promise.all([
      // Store full comment data
      redis.set(keys.comment(id), JSON.stringify(comment)),
      // Add to post's sorted set (score = timestamp for ordering)
      redis.zadd(keys.comments(postId), { score: timestamp, member: id }),
      // Increment comment count
      redis.incr(keys.commentCount(postId)),
      // Update trending score
      redis.zincrby(keys.trendingPosts(), 1, postId),
      // Update recent comments list (keep last 20)
      updateRecentComments({
        id,
        postId,
        text,
        authorName: authorName || "anonymous",
        createdAt: now,
      }),
    ]);

    const { authorFingerprint: _f, ...safeComment } = comment;

    return NextResponse.json(
      {
        comment: safeComment,
        approved: autoApprove,
        remaining,
        message: autoApprove
          ? "Comment posted!"
          : "Comment submitted for review.",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[comments POST]", err);
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 },
    );
  }
}

// Helper: maintain recent comments list in Redis (for the sidebar widget)
async function updateRecentComments(data: {
  id: string;
  postId: string;
  text: string;
  authorName: string;
  createdAt: string;
}) {
  const key = keys.recentComments();
  const score = Date.now();
  const value = JSON.stringify({
    id: data.id,
    postId: data.postId,
    text: data.text.slice(0, 100),
    authorName: data.authorName,
    createdAt: data.createdAt,
  });

  await redis.zadd(key, { score, member: value });
  // Keep only last 20
  await redis.zremrangebyrank(key, 0, -21);
}
