'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { BlogPost } from '@/data/blog'

interface BlogCardProps {
    post: BlogPost
    index: number
    featured?: boolean
}

export default function BlogCard({ post, index, featured = false }: BlogCardProps) {
    const categoryColors = {
        tutorial: 'text-neon-green border-neon-green',
        thoughts: 'text-neon-yellow border-neon-yellow',
        project: 'text-neon-pink border-neon-pink',
        rant: 'text-neon-red border-neon-red'
    }

    const categoryBg = {
        tutorial: 'bg-neon-green text-punk-black',
        thoughts: 'bg-neon-yellow text-punk-black',
        project: 'bg-neon-pink text-punk-black',
        rant: 'bg-neon-red text-punk-black'
    }

    // Format date
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0 }}
            className={`
        bg-punk-gray-100 border-brutal p-6
        hover:translate-y-[-4px] transition-transform duration-0
        ${featured ? 'border-neon-yellow' : 'border-punk-white'}
      `}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* Category Badge */}
                    <span className={`
            px-3 py-1 text-brutal-xs font-mono font-bold
            ${categoryBg[post.category]}
          `}>
                        {post.category.toUpperCase()}
                    </span>

                    {/* Featured Badge */}
                    {post.featured && (
                        <span className="px-3 py-1 text-brutal-xs font-mono font-bold bg-punk-black border border-neon-yellow text-neon-yellow">
                            ★ FEATURED
                        </span>
                    )}
                </div>

                {/* Read Time */}
                <span className="font-mono text-brutal-xs text-punk-white/50">
                    {post.readTime} min read
                </span>
            </div>

            {/* Title */}
            <Link href={`/blog/${post.slug}`}>
                <h2 className={`
          text-brutal-2xl font-brutal mb-3
          hover:text-neon-yellow transition-colors duration-0
          ${featured ? 'text-brutal-3xl' : ''}
        `}>
                    {post.title}
                </h2>
            </Link>

            {/* Excerpt */}
            <p className="font-mono text-brutal-sm text-punk-white/70 mb-6">
                {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 bg-punk-black border border-punk-white/30 text-punk-white text-brutal-xs font-mono"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-punk-white/30">
                <span className="font-mono text-brutal-xs text-punk-white/50">
                    [{formattedDate}]
                </span>

                <Link
                    href={`/blog/${post.slug}`}
                    className={`
            font-mono text-brutal-sm transition-colors duration-0
            ${categoryColors[post.category]}
          `}
                >
                    READ MORE →
                </Link>
            </div>
        </motion.article>
    )
}
