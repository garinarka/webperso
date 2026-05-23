import { NextResponse } from "next/server";
import { redis, keys } from "@/lib/redis";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { getServerFingerprint } from "@/lib/fingerprint";

interface RouteParams {
  params: Promise<{ postId: string }>;
}

// GET /api/blog/[postId]/like
export async function GET(request: Request, { params }: RouteParams) {
  const { postId } = await params;
  const fingerprint = await getServerFingerprint(request);

  try {
    const [count, liked] = await Promise.all([
      redis.get<number>(keys.likeCount(postId)),
      redis.sismember(keys.likeUsers(postId), fingerprint),
    ]);

    return NextResponse.json({
      count: count ?? 0,
      liked: Boolean(liked),
    });
  } catch {
    return NextResponse.json({ count: 0, liked: false });
  }
}

// POST /api/blog/[postId]/like
export async function POST(request: Request, { params }: RouteParams) {
  const { postId } = await params;
  const ip = getClientIp(request);

  // Rate limit: 10 like toggles per minute per IP
  const { success } = await rateLimit(ip, "like", 10, 60);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const fingerprint = await getServerFingerprint(request);
  const usersKey = keys.likeUsers(postId);
  const countKey = keys.likeCount(postId);

  try {
    const alreadyLiked = await redis.sismember(usersKey, fingerprint);

    let newCount: number;

    if (alreadyLiked) {
      // Unlike
      await redis.srem(usersKey, fingerprint);
      newCount = await redis.decr(countKey);
      if (newCount < 0) {
        await redis.set(countKey, 0);
        newCount = 0;
      }
    } else {
      // Like
      await redis.sadd(usersKey, fingerprint);
      newCount = await redis.incr(countKey);

      // Update trending score (likes weight more than views)
      await redis.zincrby(keys.trendingPosts(), 3, postId);
    }

    return NextResponse.json({
      count: newCount,
      liked: !alreadyLiked,
    });
  } catch (err) {
    console.error("[like route]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
