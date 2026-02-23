import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import GlitchText from '@/components/GlitchText'
import PageTransition from '@/components/PageTransition'
import { client } from '@/lib/sanity.client'
import { postBySlugQuery, previousPostQuery, nextPostQuery } from '@/lib/sanity.queries'
import { portableTextComponents } from '@/components/PortableTextComponents'
import type { SanityPost } from '@/lib/sanity.types'
import NeonButton from '@/components/NeonButton'

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

// simple post type for prev/next
interface AdjacentPost {
    _id: string
    title: string
    slug: {
        current: string
    }
    category: 'tutorial' | 'thoughts' | 'project' | 'rant'
}

// Generate metadata dynamically
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = await client.fetch<SanityPost>(postBySlugQuery, { slug })

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} | Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.imageUrl ? [post.imageUrl] : [],
        }
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = await client.fetch<SanityPost>(postBySlugQuery, { slug })

    if (!post || !post.published) {
        notFound()
    }

    const previousPost = await client.fetch<AdjacentPost | null>(
        previousPostQuery,
        { publishedAt: post.publishedAt }
    )

    const nextPost = await client.fetch<AdjacentPost | null>(
        nextPostQuery,
        { publishedAt: post.publishedAt }
    )

    const categoryColors = {
        tutorial: 'text-neon-green',
        thoughts: 'text-neon-yellow',
        project: 'text-neon-pink',
        rant: 'text-neon-red'
    }

    const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    // Calculate read time
    const readTime = Math.ceil(post.excerpt.length / 200) || 3

    return (
        <PageTransition>
            <div className="min-h-screen bg-punk-black text-punk-white relative overflow-x-hidden">
                <div className="max-w-3xl mx-auto px-4 py-20 relative z-20">

                    {/* Back Button */}
                    <div className="mb-8">
                        <Link
                            href="/blog"
                            className="font-mono text-brutal-sm text-punk-white hover:text-neon-yellow transition-colors duration-0"
                        >
                            ← BACK TO BLOG
                        </Link>
                    </div>

                    {/* Post Header */}
                    <header className="mb-12">
                        {/* Category & Meta */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className={`font-mono text-brutal-sm font-bold ${categoryColors[post.category]}`}>
                                [{post.category.toUpperCase()}]
                            </span>
                            <span className="font-mono text-brutal-xs text-punk-white/50">
                                {formattedDate}
                            </span>
                            <span className="font-mono text-brutal-xs text-punk-white/50">
                                {readTime} min read
                            </span>
                            {post.featured && (
                                <span className="font-mono text-brutal-xs text-neon-yellow">
                                    ★ FEATURED
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <GlitchText
                            as="h1"
                            className="text-brutal-4xl md:text-brutal-5xl font-brutal mb-6"
                            intensity="low"
                        >
                            {post.title}
                        </GlitchText>

                        {/* Excerpt */}
                        <p className="text-brutal-lg font-mono text-punk-white/70 border-brutal p-6">
                            {post.excerpt}
                        </p>

                        {/* Tags */}
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

                        {/* Featured Image */}
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
                                <p>this post doesn't have any content yet. edit it in Sanity Studio to add content</p>
                            </div>
                        )}
                    </article>

                    {/* Post Footer */}
                    <footer>
                        {/* Divider */}
                        <div className="border-t-brutal border-punk-white mb-8"></div>

                        {/* Author */}
                        <div className="flex items-center gap-4 mb-8 p-6 border-brutal border-punk-white/30">
                            <div className="w-16 h-16 border-brutal border-neon-yellow flex items-center justify-center text-brutal-3xl shrink-0">
                                👤
                            </div>
                            <div>
                                <p className="font-brutal text-brutal-lg text-punk-white">
                                    jagaddhita
                                </p>
                                <p className="font-mono text-brutal-sm text-punk-white/70">
                                    student • developer(?) • punk!!!!!
                                </p>
                            </div>
                        </div>

                        {/* Share */}
                        <div className="mb-8 p-6 border-brutal border-neon-green">
                            <p className="font-brutal text-brutal-xl text-neon-green mb-4">
                                SHARE THIS POST
                            </p>
                            <div className="flex flex-wrap gap-4">

                                <NeonButton href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank" variant="pink" size="lg" className="w-full sm:w-auto">
                                    TWITTER
                                </NeonButton>

                                <NeonButton href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank" variant="yellow" size="lg" className="w-full sm:w-auto">
                                    LINKEDIN
                                </NeonButton>
                            </div>
                        </div>

                        {/* Prev / Next Navigation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {/* Previous Post */}
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
                                    <p className={`font-mono text-brutal-xs mt-2 ${categoryColors[previousPost.category]}`}>
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

                            {/* Next Post */}
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
                                    <p className={`font-mono text-brutal-xs mt-2 ${categoryColors[nextPost.category]}`}>
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

                        {/* Back to Blog */}
                        <div className="text-center mt-8">
                            <Link
                                href="/blog"
                                className="font-mono text-brutal-base text-punk-white hover:text-neon-yellow transition-colors duration-0"
                            >
                                [ BACK TO ALL POSTS ]
                            </Link>
                        </div>

                    </footer>

                </div>
            </div>
        </PageTransition>
    )
}
