'use client'

/**
 * components/blog/RecentComments.tsx
 *
 * Shows the 5 most recent comments across all posts.
 * Fetches from Redis recent:comments sorted set.
 * Can be dropped in any sidebar.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

interface RecentComment {
  id: string
  postId: string
  text: string
  authorName: string
  createdAt: string
}

interface RecentCommentsWidgetProps {
  limit?: number
}

export default function RecentCommentsWidget({ limit = 5 }: RecentCommentsWidgetProps) {
  const [comments, setComments] = useState<RecentComment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blog/recent-comments?limit=${limit}`)
      .then(r => r.json())
      .then(data => setComments(data.comments || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [limit])

  if (!loading && comments.length === 0) return null

  return (
    <div className="border-brutal border-punk-white/30 p-4">
      <h3 className="font-brutal text-brutal-lg text-neon-cyan mb-4 flex items-center gap-2">
        <MessageSquare size={18} />
        RECENT COMMENTS
      </h3>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 bg-punk-gray-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {comments.map(comment => (
            <li key={comment.id}>
              <Link
                href={`/blog/${comment.postId}#comments`}
                className="block group"
              >
                <p className="font-mono text-brutal-xs text-neon-yellow group-hover:text-punk-white transition-colors">
                  {comment.authorName}
                </p>
                <p className="font-mono text-brutal-xs text-punk-white/50 line-clamp-2 mt-0.5">
                  {comment.text}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
