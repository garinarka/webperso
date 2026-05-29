import { NextResponse } from "next/server";
import { getVisibleProjects, getAllProjects } from "@/lib/projects";

function isAdminReq(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/admin_token=([^;]+)/);
  return match?.[1] === secret;
}

export async function GET(request: Request) {
  try {
    const isAdmin = isAdminReq(request);
    const projects = isAdmin
      ? await getAllProjects()
      : await getVisibleProjects();
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("[projects GET]", err);
    return NextResponse.json({ projects: [] });
  }
}
