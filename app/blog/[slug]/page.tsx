import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import GlitchText from "@/components/GlitchText";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import { client } from "@/lib/sanity.client";
import {
  postBySlugQuery,
  previousPostQuery,
  nextPostQuery,
  publishedPostsQuery,
} from "@/lib/sanity.queries";
import { portableTextComponents } from "@/components/PortableTextComponents";
import type { SanityPost } from "@/lib/sanity.types";
import LikeButton from "@/components/blog/LikeButton";
import ShareButtons from "@/components/blog/ShareButtons";
import CommentSection from "@/components/blog/CommentSection";
import RelatedPosts from "@/components/blog/RelatedPosts";
import TableOfContents from "@/components/blog/TableOfContents";
import { calculateReadingTime, extractToc } from "@/lib/reading-time";
import ViewTracker from "@/components/blog/ViewTracker";
import ReadingStats from "@/components/blog/ReadingStats";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://jgarinarka.vercel.app";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

interface AdjacentPost {
  _id: string;
  title: string;
  slug: { current: string };
  category: "tutorial" | "thoughts" | "project" | "rant";
}

// ─── ISR: revalidate every 60 seconds ────────────────────────────────────────
export const revalidate = 60;

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityPost>(postBySlugQuery, { slug });

  if (!post) return { title: "Post Not Found" };

  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
      images: post.imageUrl
        ? [{ url: post.imageUrl, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

// ─── Static Params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const posts = await client.fetch<Pick<SanityPost, "slug">[]>(
    `*[_type == "post" && published == true]{ slug }`,
  );
  return posts.map((p) => ({ slug: p.slug.current }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    client.fetch<SanityPost>(postBySlugQuery, { slug }),
    client.fetch<SanityPost[]>(publishedPostsQuery),
  ]);

  if (!post || !post.published) notFound();

  const [previousPost, nextPost] = await Promise.all([
    client.fetch<AdjacentPost | null>(previousPostQuery, {
      publishedAt: post.publishedAt,
    }),
    client.fetch<AdjacentPost | null>(nextPostQuery, {
      publishedAt: post.publishedAt,
    }),
  ]);

  const categoryColors: Record<string, string> = {
    tutorial: "text-neon-green",
    thoughts: "text-neon-yellow",
    project: "text-neon-pink",
    rant: "text-neon-red",
  };

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Accurate reading time from body
  const readTime = post.body ? calculateReadingTime(post.body) : 3;

  // Table of contents
  const toc = post.body ? extractToc(post.body) : [];

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: "jagaddhita",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "jagaddhita",
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${slug}`,
    image: post.imageUrl || undefined,
    keywords: post.tags?.join(", "),
    articleSection: post.category,
  };

  return (
    <PageTransition>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading progress bar */}
      <ScrollProgress />

      <div className="min-h-screen bg-punk-black text-punk-white relative overflow-x-hidden">
        {/* Wide container for 2-col layout on desktop */}
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-20">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="font-mono text-brutal-sm text-punk-white hover:text-neon-yellow transition-colors duration-0"
            >
              ← BACK TO BLOG
            </Link>
          </div>

          {/* Two-column layout: article + TOC sidebar */}
          <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">
            {/* ── Main article column ──────────────────────────────────── */}
            <div className="min-w-0">
              {/* View tracker — fires once per session */}
              <ViewTracker postId={post._id} />

              {/* Post Header */}
              <header className="mb-12">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span
                    className={`font-mono text-brutal-sm font-bold ${categoryColors[post.category] || "text-punk-white"}`}
                  >
                    [{post.category.toUpperCase()}]
                  </span>
                  <span className="font-mono text-brutal-xs text-punk-white/50">
                    {formattedDate}
                  </span>
                  <ReadingStats postId={post._id} readTime={readTime} />
                  {post.featured && (
                    <span className="font-mono text-brutal-xs text-neon-yellow">
                      ★ FEATURED
                    </span>
                  )}
                </div>

                <GlitchText
                  as="h1"
                  className="text-brutal-4xl md:text-brutal-5xl font-brutal mb-6"
                  intensity="low"
                >
                  {post.title}
                </GlitchText>

                <p className="text-brutal-lg font-mono text-punk-white/70 border-brutal p-6">
                  {post.excerpt}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-punk-black border border-punk-white/30 text-punk-white text-brutal-xs font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {post.imageUrl && (
                  <div className="mt-8 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.imageAlt || post.title}
                      width={800}
                      height={450}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                )}
              </header>

              {/* Mobile TOC (collapsible) */}
              <TableOfContents items={toc} />

              {/* Post Content */}
              <article className="prose prose-invert max-w-none mb-16">
                {post.body ? (
                  <div className="font-mono text-punk-white">
                    <PortableText
                      value={post.body}
                      components={portableTextComponents}
                    />
                  </div>
                ) : (
                  <div className="border-brutal border-punk-white/30 p-8 font-mono text-punk-white/70">
                    <p className="text-neon-yellow mb-4">// NO CONTENT YET</p>
                    <p>Edit this post in Sanity Studio to add content.</p>
                  </div>
                )}
              </article>

              {/* Post Footer */}
              <footer>
                <div className="border-t-brutal border-punk-white mb-8" />

                {/* Like + Author row */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  {/* Author */}
                  <div className="flex items-center gap-4 p-4 border-brutal border-punk-white/30 flex-1 min-w-[200px]">
                    <div className="w-14 h-14 border-brutal border-neon-yellow flex items-center justify-center text-brutal-2xl shrink-0">
                      👤
                    </div>
                    <div>
                      <p className="font-brutal text-brutal-base text-punk-white">
                        <a
                          href="https://jgarinarka.vercel.app"
                          target="_self"
                          rel="noopener noreferrer"
                          className="underline hover:text-neon-yellow transition-colors duration-0"
                        >
                          jagaddhita
                        </a>
                      </p>
                      <p className="font-mono text-brutal-xs text-punk-white/70">
                        student • developer(?) • punk!!!!!
                      </p>
                    </div>
                  </div>

                  {/* Like button */}
                  <div className="relative">
                    <LikeButton postId={post._id} />
                  </div>
                </div>

                {/* Share */}
                <ShareButtons
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug.current}
                />

                {/* Related Posts */}
                <RelatedPosts currentPost={post} allPosts={allPosts} />

                {/* Prev / Next Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                  {previousPost ? (
                    <Link
                      href={`/blog/${previousPost.slug.current}`}
                      className="block p-4 border-brutal border-punk-white hover:border-neon-yellow transition-colors duration-0 group"
                    >
                      <p className="font-mono text-brutal-xs text-punk-white/50 mb-2 group-hover:text-neon-yellow">
                        ← PREVIOUS
                      </p>
                      <p className="font-brutal text-brutal-base text-punk-white group-hover:text-neon-yellow">
                        {previousPost.title}
                      </p>
                      <p
                        className={`font-mono text-brutal-xs mt-2 ${categoryColors[previousPost.category] || ""}`}
                      >
                        [{previousPost.category.toUpperCase()}]
                      </p>
                    </Link>
                  ) : (
                    <div className="p-4 border-brutal border-punk-white/30 opacity-30">
                      <p className="font-mono text-brutal-xs text-punk-white/50 mb-2">
                        ← PREVIOUS
                      </p>
                      <p className="font-brutal text-brutal-base text-punk-white/50">
                        No previous post
                      </p>
                    </div>
                  )}

                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug.current}`}
                      className="block p-4 border-brutal border-punk-white hover:border-neon-yellow transition-colors duration-0 text-right group"
                    >
                      <p className="font-mono text-brutal-xs text-punk-white/50 mb-2 group-hover:text-neon-yellow">
                        NEXT →
                      </p>
                      <p className="font-brutal text-brutal-base text-punk-white group-hover:text-neon-yellow">
                        {nextPost.title}
                      </p>
                      <p
                        className={`font-mono text-brutal-xs mt-2 ${categoryColors[nextPost.category] || ""}`}
                      >
                        [{nextPost.category.toUpperCase()}]
                      </p>
                    </Link>
                  ) : (
                    <div className="p-4 border-brutal border-punk-white/30 opacity-30 text-right">
                      <p className="font-mono text-brutal-xs text-punk-white/50 mb-2">
                        NEXT →
                      </p>
                      <p className="font-brutal text-brutal-base text-punk-white/50">
                        No next post
                      </p>
                    </div>
                  )}
                </div>

                {/* Comment Section */}
                <CommentSection postId={post._id} />

                {/* Back to Blog */}
                <div className="text-center mt-12">
                  <Link
                    href="/blog"
                    className="font-mono text-brutal-base text-punk-white hover:text-neon-yellow transition-colors duration-0"
                  >
                    [ BACK TO ALL POSTS ]
                  </Link>
                </div>
              </footer>
            </div>

            {/* ── Desktop TOC Sidebar ──────────────────────────────────── */}
            <div className="hidden lg:block">
              <TableOfContents items={toc} />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
