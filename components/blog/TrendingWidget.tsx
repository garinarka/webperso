'use client'

/**
 * components/blog/TrendingWidget.tsx
 *
 * Client component — fetches trending posts from Redis via API.
 * Used in blog list page sidebar or as an inline section.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import type { SanityPost } from '@/lib/sanity.types'

interface TrendingPost extends Pick<SanityPost, '_id' | 'title' | 'slug' | 'category' | 'publishedAt'> {
  engagementScore: number
}

interface TrendingWidgetProps {
  limit?: number
  title?: string
}

const categoryColors: Record<string, string> = {
  tutorial: 'text-neon-green',
  thoughts: 'text-neon-yellow',
  project: 'text-neon-pink',
  rant: 'text-neon-red',
}

export default function TrendingWidget({ limit = 5, title = 'TRENDING' }: TrendingWidgetProps) {
  const [posts, setPosts] = useState<TrendingPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blog/trending?limit=${limit}`)
      .then(r => r.json())
      .then(data => setPosts(data.posts || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [limit])

  if (!loading && posts.length === 0) return null

  return (
    <div className="border-brutal border-punk-white/30 p-4">
      <h3 className="font-brutal text-brutal-lg text-neon-pink mb-4 flex items-center gap-2">
        <TrendingUp size={18} />
        {title}
      </h3>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="h-8 bg-punk-gray-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <ol className="space-y-3">
          {posts.map((post, index) => (
            <li key={post._id}>
              <Link
                href={`/blog/${post.slug.current}`}
                className="flex items-start gap-3 group"
              >
                <span className="font-brutal text-brutal-xl text-punk-white/20 leading-none w-6 shrink-0 group-hover:text-neon-pink transition-colors">
                  {index + 1}
                </span>
                <div>
                  <p className="font-mono text-brutal-sm text-punk-white group-hover:text-neon-yellow transition-colors leading-snug">
                    {post.title}
                  </p>
                  <p className={`font-mono text-brutal-xs mt-0.5 ${categoryColors[post.category] || 'text-punk-white/40'}`}>
                    [{post.category?.toUpperCase()}]
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
