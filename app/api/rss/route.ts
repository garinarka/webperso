import { client } from "@/lib/sanity.client";
import { publishedPostsQuery } from "@/lib/sanity.queries";
import type { SanityPost } from "@/lib/sanity.types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://jgarinarka.vercel.app";
const SITE_TITLE = "JAGADDHITA Blog";
const SITE_DESCRIPTION =
  "full-stack developer wannabe. breaking conventions, building experiences.";

export async function GET() {
  const posts = await client.fetch<SanityPost[]>(publishedPostsQuery);

  const items = posts
    .slice(0, 20) // latest 20
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug.current}`;
      const pubDate = new Date(post.publishedAt).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${post.category}</category>
      ${post.tags?.map((t) => `<category>${t}</category>`).join("\n      ") || ""}
    </item>`;
    })
    .join("\n");

  const lastBuild = posts[0]
    ? new Date(posts[0].publishedAt).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}/blog</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>id-ID</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/api/rss" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
