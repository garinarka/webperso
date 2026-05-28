import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return NextResponse.json({ isAdmin: false });

  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/admin_token=([^;]+)/);
  const isAdmin = match?.[1] === secret;

  return NextResponse.json({ isAdmin });
}
