import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { upsertProject, getAllProjects, projectKeys } from "@/lib/projects";
import type { Project } from "@/lib/projects";

// Add all your GitHub usernames here
const GITHUB_ACCOUNTS = (process.env.GITHUB_ACCOUNTS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // optional, increases rate limit

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  fork: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  owner: { login: string };
}

function isAdminReq(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/admin_token=([^;]+)/);
  return match?.[1] === secret;
}

function isCronReq(request: Request): boolean {
  // Vercel cron sends CRON_SECRET as Bearer
  const auth = request.headers.get("authorization") ?? "";
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

async function fetchReposForAccount(username: string): Promise<GithubRepo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (GITHUB_TOKEN) headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`,
    { headers, next: { revalidate: 0 } },
  );
  if (!res.ok)
    throw new Error(`GitHub API error for ${username}: ${res.status}`);
  return res.json();
}

function repoToProject(
  repo: GithubRepo,
  existingVisibility?: boolean,
): Project {
  const tags: string[] = [];
  if (repo.language) tags.push(repo.language);
  if (repo.topics?.length) tags.push(...repo.topics.slice(0, 5));

  const year = new Date(repo.created_at).getFullYear();
  const id = `github-${repo.owner.login}-${repo.id}`;

  return {
    id,
    source: "github",
    githubId: repo.id,
    githubOwner: repo.owner.login,
    title: repo.name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    description: repo.description ?? `${repo.name} repository`,
    category: "web",
    tags: [...new Set(tags)],
    liveUrl: repo.homepage ?? undefined,
    githubUrl: repo.html_url,
    featured: repo.stargazers_count > 0,
    year,
    status: repo.archived ? "archived" : "completed",
    order: repo.stargazers_count,
    visible: existingVisibility ?? false, // new repos hidden by default
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    syncedAt: new Date().toISOString(),
  };
}

export async function POST(request: Request) {
  if (!isAdminReq(request) && !isCronReq(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  if (!GITHUB_ACCOUNTS.length) {
    return NextResponse.json(
      { error: "No GITHUB_ACCOUNTS configured" },
      { status: 400 },
    );
  }

  try {
    // Get existing projects to preserve visibility settings
    const existing = await getAllProjects();
    const visibilityMap = new Map(existing.map((p) => [p.id, p.visible]));

    const allRepos: GithubRepo[] = [];
    for (const account of GITHUB_ACCOUNTS) {
      const repos = await fetchReposForAccount(account);
      // Skip forks
      allRepos.push(...repos.filter((r) => !r.fork));
    }

    let synced = 0;
    for (const repo of allRepos) {
      const id = `github-${repo.owner.login}-${repo.id}`;
      const project = repoToProject(repo, visibilityMap.get(id));
      await upsertProject(project);
      synced++;
    }

    await redis.set(projectKeys.githubSync(), new Date().toISOString());

    return NextResponse.json({ synced, accounts: GITHUB_ACCOUNTS });
  } catch (err) {
    console.error("[github-sync]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// Allow GET to check last sync time
export async function GET(request: Request) {
  if (!isAdminReq(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const lastSync = await redis.get<string>(projectKeys.githubSync());
  return NextResponse.json({ lastSync, accounts: GITHUB_ACCOUNTS });
}
