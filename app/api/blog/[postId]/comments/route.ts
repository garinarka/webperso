import { NextResponse } from "next/server";
import { redis, keys } from "@/lib/redis";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { validateComment } from "@/lib/sanitize";
import { auth } from "@/auth";

interface RouteParams {
  params: Promise<{ postId: string }>;
}

export interface StoredComment {
  id: string;
  postId: string;
  text: string;
  authorName: string;
  authorId: string; // Auth.js user ID — source of truth for ownership
  authorEmail: string;
  parentId: string | null;
  approved: boolean;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

function isAdminCookie(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/admin_token=([^;]+)/);
  return match?.[1] === secret;
}

// GET /api/blog/[postId]/comments
export async function GET(request: Request, { params }: RouteParams) {
  const { postId } = await params;

  // Get current user session to mark own comments
  const session = await auth();
  const currentUserId = session?.user?.id ?? null;

  try {
    const commentIds = await redis.zrange(keys.comments(postId), 0, -1, {
      rev: true,
    });

    if (!commentIds || commentIds.length === 0) {
      return NextResponse.json({ comments: [], count: 0 });
    }

    const commentDataList = await Promise.all(
      commentIds.map((id) =>
        redis.get<StoredComment>(keys.comment(id as string)),
      ),
    );

    const autoApprove = process.env.AUTO_APPROVE_COMMENTS === "true";

    const visible = commentDataList
      .filter(
        (c): c is StoredComment => c !== null && (c.approved || autoApprove),
      )
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

    // Strip sensitive fields; expose isOwner flag based on session
    const safe = visible.map(({ authorId, authorEmail: _e, ...rest }) => ({
      ...rest,
      isOwner: currentUserId !== null && authorId === currentUserId,
    }));

    return NextResponse.json({ comments: safe, count: safe.length });
  } catch (err) {
    console.error("[comments GET]", err);
    return NextResponse.json({ comments: [], count: 0 });
  }
}

// POST /api/blog/[postId]/comments
export async function POST(request: Request, { params }: RouteParams) {
  const { postId } = await params;

  // Must be authenticated
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "You must be signed in to comment." },
      { status: 401 },
    );
  }

  const ip = getClientIp(request);
  const { success, remaining } = await rateLimit(ip, "comment", 3, 60);
  if (!success) {
    return NextResponse.json(
      { error: "Too many comments. Please wait a moment." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const input = { ...(body as object), postId };
  const validation = validateComment(input);

  if (!validation.valid || !validation.sanitized) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { text, parentId } = validation.sanitized;

  const isAdmin = isAdminCookie(request);
  const autoApprove = isAdmin || process.env.AUTO_APPROVE_COMMENTS === "true";

  // Admin uses fixed display name; others use their Google/email name
  const ADMIN_NAME = "jagaddhita";
  const authorName = isAdmin
    ? ADMIN_NAME
    : (session.user.name ?? session.user.email?.split("@")[0] ?? "anonymous");

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
    authorName,
    authorId: session.user.id,
    authorEmail: session.user.email ?? "",
    parentId: parentId || null,
    approved: autoApprove,
    pinned: false,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const timestamp = Date.now();

    await Promise.all([
      redis.set(keys.comment(id), JSON.stringify(comment)),
      redis.zadd(keys.comments(postId), { score: timestamp, member: id }),
      redis.incr(keys.commentCount(postId)),
      redis.zincrby(keys.trendingPosts(), 1, postId),
      updateRecentComments({ id, postId, text, authorName, createdAt: now }),
    ]);

    const { authorId: _a, authorEmail: _e, ...safeComment } = comment;

    return NextResponse.json(
      {
        comment: { ...safeComment, isOwner: true },
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

async function updateRecentComments(data: {
  id: string;
  postId: string;
  text: string;
  authorName: string;
  createdAt: string;
}) {
  const key = keys.recentComments();
  const value = JSON.stringify({
    id: data.id,
    postId: data.postId,
    text: data.text.slice(0, 100),
    authorName: data.authorName,
    createdAt: data.createdAt,
  });
  await redis.zadd(key, { score: Date.now(), member: value });
  await redis.zremrangebyrank(key, 0, -21);
}
