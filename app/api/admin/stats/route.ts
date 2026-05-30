import { NextResponse } from "next/server";
import { redis, keys } from "@/lib/redis";
import { getAllProjects } from "@/lib/projects";
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

  try {
    // ── Projects ──────────────────────────────────────────────────────────────
    const allProjects = await getAllProjects();
    const visibleProjects = allProjects.filter((p) => p.visible);
    const githubProjects = allProjects.filter((p) => p.source === "github");
    const manualProjects = allProjects.filter((p) => p.source === "manual");

    // ── Comments ──────────────────────────────────────────────────────────────
    let cursor = 0;
    const commentKeyList: string[] = [];
    do {
      const [next, batch] = await redis.scan(cursor, {
        match: "comment:*",
        count: 100,
      });
      cursor = Number(next);
      commentKeyList.push(...(batch as string[]));
    } while (cursor !== 0);

    const comments = (
      await Promise.all(commentKeyList.map((k) => redis.get<StoredComment>(k)))
    ).filter((c): c is StoredComment => c !== null);

    const pendingComments = comments.filter((c) => !c.approved);
    const approvedComments = comments.filter((c) => c.approved);

    // ── Views — top posts ────────────────────────────────────────────────────
    // views are stored as views:{postId}
    const viewKeys: string[] = [];
    let vc = 0;
    do {
      const [next, batch] = await redis.scan(vc, {
        match: "views:*",
        count: 100,
      });
      vc = Number(next);
      viewKeys.push(...(batch as string[]));
    } while (vc !== 0);

    const viewEntries = await Promise.all(
      viewKeys.map(async (k) => {
        const postId = k.replace("views:", "");
        const count = (await redis.get<number>(k)) ?? 0;
        return { postId, count };
      }),
    );
    const topPosts = viewEntries.sort((a, b) => b.count - a.count).slice(0, 5);
    const totalViews = viewEntries.reduce((s, e) => s + e.count, 0);

    // ── Trending (from sorted set) ────────────────────────────────────────────
    const trendingRaw = await redis.zrange(keys.trendingPosts(), 0, 4, {
      rev: true,
      withScores: true,
    });
    const trending: { postId: string; score: number }[] = [];
    for (let i = 0; i < trendingRaw.length; i += 2) {
      trending.push({
        postId: String(trendingRaw[i]),
        score: Number(trendingRaw[i + 1]),
      });
    }

    // ── Recent comments ───────────────────────────────────────────────────────
    const recentRaw = await redis.zrange(keys.recentComments(), 0, 4, {
      rev: true,
    });
    const recentComments = recentRaw
      .map((r) => {
        try {
          return JSON.parse(r as string);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    // ── Last GitHub sync ──────────────────────────────────────────────────────
    const lastGithubSync = await redis.get<string>("projects:github:last_sync");

    return NextResponse.json({
      projects: {
        total: allProjects.length,
        visible: visibleProjects.length,
        hidden: allProjects.length - visibleProjects.length,
        github: githubProjects.length,
        manual: manualProjects.length,
        byStatus: {
          completed: allProjects.filter((p) => p.status === "completed").length,
          inProgress: allProjects.filter((p) => p.status === "in-progress")
            .length,
          archived: allProjects.filter((p) => p.status === "archived").length,
        },
        byCategory: {
          web: allProjects.filter((p) => p.category === "web").length,
          mobile: allProjects.filter((p) => p.category === "mobile").length,
          design: allProjects.filter((p) => p.category === "design").length,
          experiment: allProjects.filter((p) => p.category === "experiment")
            .length,
        },
        lastGithubSync,
      },
      comments: {
        total: comments.length,
        pending: pendingComments.length,
        approved: approvedComments.length,
        recent: recentComments,
      },
      content: {
        totalViews,
        topPosts,
        trending,
      },
    });
  } catch (err) {
    console.error("[admin stats]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
