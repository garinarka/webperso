import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import type { StoredComment } from "@/app/api/blog/[postId]/comments/route";

function isAdminReq(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/admin_token=([^;]+)/);
  return match?.[1] === secret;
}

export async function GET(request: Request) {
  if (!isAdminReq(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  let cursor = 0;
  const commentKeys: string[] = [];
  do {
    const [next, batch] = await redis.scan(cursor, {
      match: "comment:*",
      count: 100,
    });
    cursor = Number(next);
    commentKeys.push(...(batch as string[]));
  } while (cursor !== 0);

  if (!commentKeys.length) return NextResponse.json({ comments: [] });

  const comments = (
    await Promise.all(commentKeys.map((k) => redis.get<StoredComment>(k)))
  )
    .filter((c): c is StoredComment => c !== null)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return NextResponse.json({ comments });
}
