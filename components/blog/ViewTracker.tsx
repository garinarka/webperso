'use client'

/**
 * components/blog/ViewTracker.tsx
 *
 * Invisible component — fires view count API once per session per post.
 * Uses sessionStorage to avoid double-counting within the same tab session.
 * Drop it anywhere inside the blog post page.
 */

import { useEffect } from 'react'

interface ViewTrackerProps {
  postId: string
}

export default function ViewTracker({ postId }: ViewTrackerProps) {
  useEffect(() => {
    const key = `viewed:${postId}`
    if (sessionStorage.getItem(key)) return

    // Fire and forget
    fetch(`/api/blog/${postId}/view`, { method: 'POST' })
      .then(() => sessionStorage.setItem(key, '1'))
      .catch(() => {/* silent */})
  }, [postId])

  return null
}
