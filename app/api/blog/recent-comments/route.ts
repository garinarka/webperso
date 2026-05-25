import { NextResponse } from "next/server";
import { redis, keys } from "@/lib/redis";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "5"), 20);

  try {
    // Get most recent comment data strings (highest score = newest)
    const entries = await redis.zrange(keys.recentComments(), 0, limit - 1, {
      rev: true,
    });

    if (!entries || entries.length === 0) {
      return NextResponse.json({ comments: [] });
    }

    const comments = entries
      .map((entry) => {
        try {
          return typeof entry === "string" ? JSON.parse(entry) : entry;
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    return NextResponse.json(
      { comments },
      {
        headers: {
          "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
        },
      },
    );
  } catch (err) {
    console.error("[recent-comments]", err);
    return NextResponse.json({ comments: [] });
  }
}
