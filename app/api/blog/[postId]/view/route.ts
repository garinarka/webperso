import { NextResponse } from "next/server";
import { redis, keys } from "@/lib/redis";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

interface RouteParams {
  params: Promise<{ postId: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  const { postId } = await params;
  const ip = getClientIp(request);

  // 1 view counted per IP per post per 30 minutes
  const { success } = await rateLimit(ip, `view:${postId}`, 1, 30 * 60);
  if (!success) {
    // Return silently — user doesn't need to know
    const count = await redis.get<number>(keys.viewCount(postId));
    return NextResponse.json({ count: count ?? 0 });
  }

  try {
    const [count] = await Promise.all([
      redis.incr(keys.viewCount(postId)),
      // Views are worth less than likes in trending score
      redis.zincrby(keys.trendingPosts(), 0.1, postId),
    ]);

    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { postId } = await params;
  try {
    const count = await redis.get<number>(keys.viewCount(postId));
    return NextResponse.json({ count: count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
