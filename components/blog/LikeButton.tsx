'use client'

/**
 * components/blog/LikeButton.tsx
 *
 * Handles like/unlike with optimistic UI.
 * Persists liked state in localStorage for instant re-render on revisit.
 *
 * Props:
 *   postId — Sanity document _id (used as the Redis key)
 */

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LikeButtonProps {
  postId: string
  className?: string
}

export default function LikeButton({ postId, className }: LikeButtonProps) {
  const [count, setCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [animating, setAnimating] = useState(false)

  // Persist liked state in localStorage for instant UI on revisit
  const storageKey = `liked:${postId}`

  useEffect(() => {
    // Optimistic: check localStorage first
    const localLiked = localStorage.getItem(storageKey) === 'true'
    setLiked(localLiked)

    // Then verify with server
    fetch(`/api/blog/${postId}/like`)
      .then(r => r.json())
      .then(data => {
        setCount(data.count ?? 0)
        setLiked(data.liked ?? false)
        if (data.liked) {
          localStorage.setItem(storageKey, 'true')
        } else {
          localStorage.removeItem(storageKey)
        }
      })
      .catch(() => {/* fail silently */})
      .finally(() => setLoading(false))
  }, [postId, storageKey])

  const toggle = useCallback(async () => {
    if (loading) return

    // Optimistic update
    const wasLiked = liked
    const delta = wasLiked ? -1 : 1
    setLiked(!wasLiked)
    setCount((c: number) => c + delta)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 600)

    if (!wasLiked) {
      localStorage.setItem(storageKey, 'true')
    } else {
      localStorage.removeItem(storageKey)
    }

    try {
      const res = await fetch(`/api/blog/${postId}/like`, { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        // Revert
        setLiked(wasLiked)
        setCount((c: number) => c - delta)
        if (wasLiked) localStorage.setItem(storageKey, 'true')
        else localStorage.removeItem(storageKey)
      } else {
        // Sync with server truth
        setCount(data.count)
        setLiked(data.liked)
        if (data.liked) localStorage.setItem(storageKey, 'true')
        else localStorage.removeItem(storageKey)
      }
    } catch {
      // Revert on network failure
      setLiked(wasLiked)
      setCount((c: number) => c - delta)
    }
  }, [liked, loading, postId, storageKey])

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
      aria-pressed={liked}
      className={cn(
        'group flex items-center gap-3 border-brutal px-4 py-2 font-mono text-brutal-sm',
        'transition-colors duration-0',
        liked
          ? 'border-neon-pink text-neon-pink bg-neon-pink/10 hover:bg-neon-pink hover:text-punk-black'
          : 'border-punk-white/30 text-punk-white/50 hover:border-neon-pink hover:text-neon-pink',
        loading && 'opacity-40 cursor-not-allowed',
        className
      )}
    >
      <motion.div
        animate={animating && !liked ? { scale: [1, 1.4, 0.9, 1.1, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        <Heart
          size={18}
          className={cn(
            'transition-all duration-0',
            liked ? 'fill-current' : 'fill-none'
          )}
        />
      </motion.div>

      <span className="tabular-nums">
        {loading ? '—' : count}
      </span>

      {/* Floating +1 animation */}
      <AnimatePresence>
        {animating && !liked && (
          <motion.span
            key="plus1"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -24 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute text-neon-pink font-brutal text-brutal-sm pointer-events-none select-none"
            style={{ marginTop: '-2rem', marginLeft: '1rem' }}
          >
            +1
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
