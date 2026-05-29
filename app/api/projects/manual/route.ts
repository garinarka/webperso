import { NextResponse } from "next/server";
import { upsertProject } from "@/lib/projects";
import type { Project } from "@/lib/projects";

function isAdminReq(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/admin_token=([^;]+)/);
  return match?.[1] === secret;
}

export async function POST(request: Request) {
  if (!isAdminReq(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const {
    title,
    description,
    longDescription,
    category,
    tags,
    liveUrl,
    githubUrl,
    featured,
    year,
    status,
    order,
    imageUrl,
    imageAlt,
    visible,
  } = body;

  if (!title || !description || !category) {
    return NextResponse.json(
      { error: "title, description, category required" },
      { status: 400 },
    );
  }

  const id = `manual-${Date.now()}`;
  const now = new Date().toISOString();

  const project: Project = {
    id,
    source: "manual",
    title,
    description,
    longDescription,
    category: category ?? "web",
    tags: Array.isArray(tags)
      ? tags
      : (tags ?? "")
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean),
    liveUrl: liveUrl || undefined,
    githubUrl: githubUrl || undefined,
    featured: !!featured,
    year: parseInt(year) || new Date().getFullYear(),
    status: status ?? "completed",
    order: parseInt(order) || 0,
    imageUrl: imageUrl || undefined,
    imageAlt: imageAlt || undefined,
    visible: visible !== false,
    createdAt: now,
    updatedAt: now,
  };

  await upsertProject(project);
  return NextResponse.json({ project }, { status: 201 });
}
