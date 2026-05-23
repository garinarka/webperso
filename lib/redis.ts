/**
 * lib/redis.ts
 *
 * Redis client abstraction.
 * Uses @vercel/kv when KV_REST_API_URL is set (Vercel hosted).
 * Falls back to @upstash/redis when UPSTASH_REDIS_REST_URL is set.
 *
 * Install: pnpm add @vercel/kv
 * Or:      pnpm add @upstash/redis   (non-Vercel hosts)
 *
 * Both packages expose the same API so this file never needs to change.
 */

import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()

await redis.set("foo", "bar");
await redis.get("foo");

// ─── Key builders ────────────────────────────────────────────────────────────

export const keys = {
  likeCount: (postId: string) => `likes:${postId}:count`,
  likeUsers: (postId: string) => `likes:${postId}:users`,
  commentCount: (postId: string) => `comments:${postId}:count`,
  comments: (postId: string) => `comments:${postId}`,
  comment: (commentId: string) => `comment:${commentId}`,
  rateLimit: (ip: string, action: string) => `ratelimit:${ip}:${action}`,
  trendingPosts: () => `trending:posts`,
  recentComments: () => `recent:comments`,
  viewCount: (postId: string) => `views:${postId}`,
} as const
