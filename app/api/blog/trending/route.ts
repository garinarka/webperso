import { NextResponse } from "next/server";
import { redis, keys } from "@/lib/redis";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const postsByIdsQuery = groq`
  *[_type == "post" && _id in $ids && published == true] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    "imageUrl": mainImage.asset->url
  }
`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "5"), 10);

  try {
    // Get top posts by score, highest first
    const entries = await redis.zrange(keys.trendingPosts(), 0, limit - 1, {
      rev: true,
      withScores: true,
    });

    if (!entries || entries.length === 0) {
      return NextResponse.json({ posts: [] });
    }

    // entries = [id, score, id, score, ...] from @vercel/kv with withScores
    // Structure depends on client. Handle both array-of-pairs and flat array.
    const ids: string[] = [];
    const scores: Record<string, number> = {};

    if (Array.isArray(entries[0])) {
      // Array of [member, score] tuples
      for (const [member, score] of entries as [string, number][]) {
        ids.push(member);
        scores[member] = score;
      }
    } else {
      // Flat array: [member, score, member, score, ...]
      for (let i = 0; i < entries.length; i += 2) {
        const id = entries[i] as string;
        const score = Number(entries[i + 1]);
        ids.push(id);
        scores[id] = score;
      }
    }

    // Fetch Sanity post details
    const posts = await client.fetch(postsByIdsQuery, { ids });

    // Merge scores and sort
    const enriched = posts
      .map((post: any) => ({
        ...post,
        engagementScore: scores[post._id] || 0,
      }))
      .sort((a: any, b: any) => b.engagementScore - a.engagementScore);

    return NextResponse.json(
      { posts: enriched },
      {
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (err) {
    console.error("[trending]", err);
    return NextResponse.json({ posts: [] });
  }
}
