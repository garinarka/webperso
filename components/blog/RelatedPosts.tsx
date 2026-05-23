/**
 * components/blog/RelatedPosts.tsx
 *
 * Server component — rendered at build/ISR time.
 * Related = same category + overlapping tags, excluding current post.
 */

import Link from 'next/link'
import type { SanityPost } from '@/lib/sanity.types'

interface RelatedPostsProps {
  currentPost: SanityPost
  allPosts: SanityPost[]
}

function scoreRelevance(current: SanityPost, candidate: SanityPost): number {
  let score = 0

  if (candidate.category === current.category) score += 3

  const currentTags = new Set(current.tags || [])
  const sharedTags = (candidate.tags || []).filter(t => currentTags.has(t))
  score += sharedTags.length * 2

  return score
}

export default function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  const related = allPosts
    .filter(p => p._id !== currentPost._id)
    .map(p => ({ post: p, score: scoreRelevance(currentPost, p) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ post }) => post)

  if (related.length === 0) return null

  const categoryColors: Record<string, string> = {
    tutorial: 'text-neon-green',
    thoughts: 'text-neon-yellow',
    project: 'text-neon-pink',
    rant: 'text-neon-red',
  }

  return (
    <section className="mt-16">
      <div className="border-t-brutal border-punk-white mb-8" />

      <h2 className="font-brutal text-brutal-2xl text-punk-white mb-6">
        RELATED POSTS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map(post => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="block p-4 border-brutal border-punk-white/20 hover:border-neon-yellow transition-colors duration-0 group"
          >
            <p
              className={`font-mono text-brutal-xs mb-2 ${categoryColors[post.category] || 'text-punk-white/50'}`}
            >
              [{post.category.toUpperCase()}]
            </p>
            <p className="font-brutal text-brutal-base text-punk-white group-hover:text-neon-yellow">
              {post.title}
            </p>
            <p className="font-mono text-brutal-xs text-punk-white/50 mt-2 line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
