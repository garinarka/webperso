import type { Metadata } from "next";
import { client } from "@/lib/sanity.client";
import { publishedPostsQuery } from "@/lib/sanity.queries";
import type { SanityPost } from "@/lib/sanity.types";
import PageTransition from "@/components/PageTransition";
import GlitchText from "@/components/GlitchText";
import BlogListClient from "@/components/blog/BlogListClient";
import TrendingWidget from "@/components/blog/TrendingWidget";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, rants, and projects from jagaddhita.",
  alternates: {
    types: {
      "application/rss+xml": "/api/rss",
    },
  },
};

export default async function BlogPage() {
  const posts = await client.fetch<SanityPost[]>(publishedPostsQuery);

  return (
    <PageTransition>
      <div className="min-h-screen bg-punk-black text-punk-white relative">
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          {/* Header */}
          <div className="mb-12">
            <GlitchText
              as="h1"
              className="text-brutal-6xl md:text-brutal-7xl font-brutal mb-4"
              intensity="medium"
            >
              BLOG
            </GlitchText>
            <p className="font-mono text-brutal-lg text-punk-white/60">
              // {posts.length} posts and counting
            </p>
          </div>

          {/* Layout */}
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10 lg:items-start">
            {/* Blog list */}
            <BlogListClient posts={posts} />

            {/* Sidebar */}
            <aside className="mt-12 lg:mt-0 space-y-6 sticky top-24 self-start">
              {/* Trending */}
              <TrendingWidget limit={5} title="TRENDING" />

              {/* Category breakdown */}
              <div className="border-brutal border-punk-white/20 p-4">
                <p className="font-mono text-brutal-xs text-punk-white/50 mb-3">
                  CATEGORIES
                </p>
                <div className="space-y-1">
                  {[
                    { id: "tutorial", color: "text-neon-green" },
                    { id: "thoughts", color: "text-neon-yellow" },
                    { id: "project", color: "text-neon-pink" },
                    { id: "rant", color: "text-neon-red" },
                  ].map(({ id, color }) => {
                    const count = posts.filter((p) => p.category === id).length;
                    if (count === 0) return null;
                    return (
                      <div
                        key={id}
                        className="flex justify-between font-mono text-brutal-xs"
                      >
                        <span className={color}>[{id.toUpperCase()}]</span>
                        <span className="text-punk-white/40">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
