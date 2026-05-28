import { NextResponse } from "next/server";
import { redis, keys } from "@/lib/redis";
import { sanitizeCommentText } from "@/lib/sanitize";
import { auth } from "@/auth";
import type { StoredComment } from "../route";

interface RouteParams {
  params: Promise<{ postId: string; commentId: string }>;
}

function isAdminCookie(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/admin_token=([^;]+)/);
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

  const adminCookie = isAdminCookie(request);
  const session = await auth();

  // Admin-only: approve/pin
  if ("approved" in body || "pinned" in body) {
    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const updated: StoredComment = {
      ...comment,
      approved: typeof body.approved === "boolean" ? body.approved : comment.approved,
      pinned: typeof body.pinned === "boolean" ? body.pinned : comment.pinned,
      updatedAt: new Date().toISOString(),
    };
    await redis.set(keys.comment(commentId), JSON.stringify(updated));
    const { authorId: _a, authorEmail: _e, ...safe } = updated;
    return NextResponse.json({ comment: safe });
  }

  // Edit text — must be owner (via session), not admin editing others
  if ("text" in body) {
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    // Only the original author can edit — admin cannot edit others' comments
    if (comment.authorId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 15-minute window
    const age = Date.now() - new Date(comment.createdAt).getTime();
    if (age > 15 * 60 * 1000) {
      return NextResponse.json({ error: "Edit window expired (15 minutes)" }, { status: 403 });
    }

    const newText = sanitizeCommentText(String(body.text));
    if (newText.length < 2) {
      return NextResponse.json({ error: "Comment too short" }, { status: 400 });
    }

    const updated: StoredComment = {
      ...comment,
      text: newText,
      updatedAt: new Date().toISOString(),
    };
    await redis.set(keys.comment(commentId), JSON.stringify(updated));
    const { authorId: _a, authorEmail: _e, ...safe } = updated;
    return NextResponse.json({ comment: safe });
  }

  return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
}

// DELETE /api/blog/[postId]/comments/[commentId]
export async function DELETE(request: Request, { params }: RouteParams) {
  const { postId, commentId } = await params;

  const comment = await redis.get<StoredComment>(keys.comment(commentId));
  if (!comment || comment.postId !== postId) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  const adminCookie = isAdminCookie(request);
  const session = await auth();

  const isOwner = session?.user?.id === comment.authorId;
  if (!adminCookie && !isOwner) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
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
