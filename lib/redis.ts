/**
 * lib/redis.ts
 */

import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

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
