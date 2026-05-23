/**
 * lib/rate-limit.ts
 *
 * Simple sliding-window rate limiter using Redis.
 * Returns { success: boolean, remaining: number }
 *
 * Usage:
 *   const { success } = await rateLimit(ip, 'comment', 3, 60)
 *   // 3 comments per 60 seconds per IP
 */

import { redis, keys } from './redis'

interface RateLimitResult {
  success: boolean
  remaining: number
  reset: number // unix timestamp
}

export async function rateLimit(
  identifier: string,
  action: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const key = keys.rateLimit(identifier, action)

  try {
    // Atomic increment + get
    const count = await redis.incr(key)

    if (count === 1) {
      // First request in window, set expiry
      await redis.expire(key, windowSeconds)
    }

    const ttl = await redis.ttl(key)
    const reset = Math.floor(Date.now() / 1000) + ttl

    return {
      success: count <= limit,
      remaining: Math.max(0, limit - count),
      reset,
    }
  } catch {
    // If Redis is down, fail open (don't block users)
    return { success: true, remaining: 1, reset: 0 }
  }
}

// Get client IP from Next.js request headers
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()

  const real = request.headers.get('x-real-ip')
  if (real) return real

  return '127.0.0.1'
}
