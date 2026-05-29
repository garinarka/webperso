import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { upsertProject, deleteProject, projectKeys } from "@/lib/projects";
import type { Project } from "@/lib/projects";

function isAdminReq(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/admin_token=([^;]+)/);
  return match?.[1] === secret;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAdminReq(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const existing = await redis.get<Project>(projectKeys.item(id));
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json();
  const updated: Project = {
    ...existing,
    ...body,
    id, // prevent id override
    updatedAt: new Date().toISOString(),
  };

  await upsertProject(updated);
  return NextResponse.json({ project: updated });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAdminReq(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  await deleteProject(id);
  return NextResponse.json({ success: true });
}
