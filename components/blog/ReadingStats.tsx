'use client'

/**
 * components/blog/ReadingStats.tsx
 *
 * Shows: "X min read · Y views · Z likes"
 * Fetches view count from API. Like count fetched separately by LikeButton.
 * Read time passed as prop (calculated server-side).
 */

import { useEffect, useState } from 'react'
import { Eye, Clock } from 'lucide-react'

interface ReadingStatsProps {
  postId: string
  readTime: number
}

export default function ReadingStats({ postId, readTime }: ReadingStatsProps) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    fetch(`/api/blog/${postId}/view`)
      .then(r => r.json())
      .then(d => setViews(d.count ?? 0))
      .catch(() => {})
  }, [postId])

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="flex items-center gap-1.5 font-mono text-brutal-xs text-punk-white/50">
        <Clock size={12} />
        {readTime} min read
      </span>

      {views !== null && (
        <span className="flex items-center gap-1.5 font-mono text-brutal-xs text-punk-white/50">
          <Eye size={12} />
          {views.toLocaleString()} {views === 1 ? 'view' : 'views'}
        </span>
      )}
    </div>
  )
}
