import { NextResponse } from "next/server";
import { redis, keys } from "@/lib/redis";
import { getServerFingerprint } from "@/lib/fingerprint";
import { sanitizeCommentText } from "@/lib/sanitize";
import type { StoredComment } from "../route";

interface RouteParams {
  params: Promise<{ postId: string; commentId: string }>;
}

function isAdmin(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const headerSecret = request.headers.get("x-admin-secret");
  if (headerSecret === secret) return true;
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/admin_token=([^;]+)/);
  return match?.[1] === secret;
}

// PATCH /api/blog/[postId]/comments/[commentId]
export async function PATCH(request: Request, { params }: RouteParams) {
  const { postId, commentId } = await params;

  const comment = await redis.get<StoredComment>(keys.comment(commentId));
  if (!comment || comment.postId !== postId) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const admin = isAdmin(request);

  // Admin-only operations
  if ("approved" in body || "pinned" in body) {
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const updated: StoredComment = {
      ...comment,
      approved:
        typeof body.approved === "boolean" ? body.approved : comment.approved,
      pinned: typeof body.pinned === "boolean" ? body.pinned : comment.pinned,
      updatedAt: new Date().toISOString(),
    };

    await redis.set(keys.comment(commentId), JSON.stringify(updated));
    const { authorFingerprint: _f, ...safe } = updated;
    return NextResponse.json({ comment: safe });
  }

  // Edit comment text — user must own it
  if ("text" in body) {
    const fingerprint = await getServerFingerprint(request);

    if (!admin && comment.authorFingerprint !== fingerprint) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const newText = sanitizeCommentText(String(body.text));
    if (newText.length < 2) {
      return NextResponse.json({ error: "Comment too short" }, { status: 400 });
    }

    // Allow editing within 15 minutes only (for non-admins)
    if (!admin) {
      const createdAt = new Date(comment.createdAt).getTime();
      const now = Date.now();
      if (now - createdAt > 15 * 60 * 1000) {
        return NextResponse.json(
          { error: "Edit window expired (15 minutes)" },
          { status: 403 },
        );
      }
    }

    const updated: StoredComment = {
      ...comment,
      text: newText,
      updatedAt: new Date().toISOString(),
    };

    await redis.set(keys.comment(commentId), JSON.stringify(updated));
    const { authorFingerprint: _f, ...safe } = updated;
    return NextResponse.json({ comment: safe });
  }

  return NextResponse.json(
    { error: "No valid fields to update" },
    { status: 400 },
  );
}

// DELETE /api/blog/[postId]/comments/[commentId]
export async function DELETE(request: Request, { params }: RouteParams) {
  const { postId, commentId } = await params;

  const comment = await redis.get<StoredComment>(keys.comment(commentId));
  if (!comment || comment.postId !== postId) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  const admin = isAdmin(request);
  if (!admin) {
    const fingerprint = await getServerFingerprint(request);
    if (comment.authorFingerprint !== fingerprint) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  }

  try {
    await Promise.all([
      redis.del(keys.comment(commentId)),
      redis.zrem(keys.comments(postId), commentId),
      redis.decr(keys.commentCount(postId)),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[comment DELETE]", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
