import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

// Simple rate limit via in-memory map (resets on cold start — good enough for contact form)
const rateLimitMap = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 60 * 1000; // 1 hour
  const max = 3;
  const hits = (rateLimitMap.get(ip) ?? []).filter((t) => now - t < window);
  if (hits.length >= max) return true;
  rateLimitMap.set(ip, [...hits, now]);
  return false;
}

function getIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 },
    );
  }

  let body: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, subject, message } = body;
  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  const TO_EMAIL = process.env.CONTACT_EMAIL ?? "jagaddhitajalu@gmail.com";
  const FROM_EMAIL = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#ffffff;border:2px solid #ffffff;">
          <h2 style="color:#FFE600;margin-top:0;">[NEW MESSAGE]</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border-color:#333;margin:16px 0;"/>
          <p style="white-space:pre-wrap;color:#cccccc;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          <hr style="border-color:#333;margin:16px 0;"/>
          <p style="color:#666;font-size:12px;">Sent from jgarinarka.vercel.app contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { error: "Failed to send. Please try again." },
      { status: 500 },
    );
  }
}
