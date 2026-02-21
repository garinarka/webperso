import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import GlitchText from '@/components/GlitchText'
import { blogPosts } from '@/data/blog'
import fs from 'fs'
import path from 'path'

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

// Generate metadata dynamically
export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = blogPosts.find(p => p.slug === slug)

    if (!post) {
        return { title: 'Post Not Found' }
    }

    return {
        title: `${post.title} | Blog`,
        description: post.excerpt,
    }
}

// Generate static params for all posts
export async function generateStaticParams() {
    return blogPosts.map(post => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = blogPosts.find(p => p.slug === slug)

    if (!post || !post.published) {
        notFound()
    }

    const contentPath = path.join(
        process.cwd(),
        'content/blog',
        `${slug}.mdx`
    )

    const hasContent = fs.existsSync(contentPath)

    const categoryColors = {
        tutorial: 'text-neon-green',
        thoughts: 'text-neon-yellow',
        project: 'text-neon-pink',
        rant: 'text-neon-red'
    }

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    // Find prev/next posts
    const postIndex = blogPosts.findIndex(p => p.slug === slug)
    const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null
    const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null

    return (
        <div className="min-h-screen bg-punk-black text-punk-white relative">
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
                            {post.readTime} min read
                        </span>
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
                    <p className="text-brutal-lg font-mono text-punk-white/70 border-brutal border-neon-yellow p-6">
                        {post.excerpt}
                    </p>

                    {/* Tags */}
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
                </header>

                {/* Post Content Placeholder */}
                <article className="prose prose-invert max-w-none mb-16">
                    <div className="border-brutal border-punk-white/30 p-8 font-mono text-punk-white/70">
                        <p className="text-neon-yellow mb-4">// CONTENT PLACEHOLDER</p>
                        <p className="mb-4">
                            This is where your blog post content will go.
                        </p>
                        <p className="mb-4">
                            You can write your posts in MDX format inside{' '}
                            <span className="text-neon-green">app/blog/[slug]/content.mdx</span>{' '}
                            or use a CMS like Contentful or Sanity.
                        </p>
                        <p>
                            For now, this is a placeholder showing the post structure.
                        </p>
                    </div>
                </article>

                {/* Post Footer */}
                <footer>
                    {/* Divider */}
                    <div className="border-t-brutal border-punk-white mb-8"></div>

                    {/* Author */}
                    <div className="flex items-center gap-4 mb-8 p-6 border-brutal border-punk-white/30">
                        <div className="w-16 h-16 border-brutal border-neon-yellow flex items-center justify-center text-brutal-3xl flex-shrink-0">
                            👤
                        </div>
                        <div>
                            <p className="font-brutal text-brutal-lg text-punk-white">
                                [YOUR NAME]
                            </p>
                            <p className="font-mono text-brutal-sm text-punk-white/70">
                                Developer • Designer • Digital Punk
                            </p>
                        </div>
                    </div>

                    {/* Prev / Next */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {prevPost ? (
                            <Link href={`/blog/${prevPost.slug}`} className="block">
                                <div className="p-4 border-brutal border-punk-white hover:border-neon-yellow transition-colors duration-0">
                                    <p className="font-mono text-brutal-xs text-punk-white/50 mb-2">
                                        ← PREVIOUS
                                    </p>
                                    <p className="font-brutal text-brutal-base hover:text-neon-yellow transition-colors duration-0">
                                        {prevPost.title}
                                    </p>
                                </div>
                            </Link>
                        ) : <div />}

                        {nextPost && (
                            <Link href={`/blog/${nextPost.slug}`} className="block">
                                <div className="p-4 border-brutal border-punk-white hover:border-neon-yellow transition-colors duration-0 text-right">
                                    <p className="font-mono text-brutal-xs text-punk-white/50 mb-2">
                                        NEXT →
                                    </p>
                                    <p className="font-brutal text-brutal-base hover:text-neon-yellow transition-colors duration-0">
                                        {nextPost.title}
                                    </p>
                                </div>
                            </Link>
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
    )
}
