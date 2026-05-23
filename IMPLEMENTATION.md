# Blog Platform Upgrade — Full Implementation Guide

---

## 1. PROJECT ANALYSIS

### Current Architecture
- **Framework**: Next.js 16 App Router, React 19, TypeScript
- **CMS**: Sanity v5 (separate `/sanity` workspace)
- **Style**: Brutalist/punk aesthetic — `bg-punk-black`, `text-neon-*`, `border-brutal`, `font-brutal`/`font-mono`
- **UI Pattern**: Server components for data fetching, client components for interactivity
- **Design tokens**: Tailwind v4 `@theme` block in `globals.css`
- **Key deps**: framer-motion, lucide-react, @portabletext/react, next-sanity

### Blog Current State
- Blog list: `app/blog/page.tsx` — client component, fetches via `useEffect` (suboptimal: could be server component)
- Blog detail: `app/blog/[slug]/page.tsx` — server component (good)
- Share: only Twitter + LinkedIn, broken (`window.location.href` in server component — this is a **bug**)
- ReadTime: calculated from excerpt length (inaccurate — should use body word count)
- ScrollProgress: already exists in `components/ScrollProgress.tsx`
- Sanity schemas: `post`, `project`, `blockContent`

### What to Reuse
- All existing components: `NeonButton`, `GlitchText`, `PageTransition`, `ScrollProgress`, `PortableTextComponents`
- `lib/sanity.client.ts`, `lib/utils.ts`
- All existing Tailwind design tokens
- Existing `SanityPost` type (extend, don't replace)
- Pattern: server components for data, client for interaction

---

## 2. ARCHITECTURE DECISION: Where to Store Likes/Comments

### The Choice: Sanity vs External DB vs Hybrid

**Option A — Pure Sanity**: Store likes/comments as Sanity documents  
- ✅ Single CMS, no extra infra  
- ❌ Sanity write API costs money at scale, rate-limited, not meant for high-frequency writes  
- ❌ Sanity CDN cache means reads are eventually consistent — bad for real-time counts  

**Option B — External DB (Postgres/Redis)**  
- ✅ Built for high-frequency writes, atomic counters  
- ❌ New infra dependency, cost, setup overhead  

**Option C — Hybrid (CHOSEN)**  
- Likes/comments stored in **Vercel KV (Redis)** via Next.js API routes  
- Sanity stores editorial content only (posts, pinned comments, featured articles)  
- Why KV/Redis: atomic `INCR`, O(1) set operations for dedup, built into Vercel, free tier handles personal blog traffic  
- **Fallback option**: If no Vercel KV, use **Upstash Redis** (free tier, works on any host) — same API  

> If you're not on Vercel, swap `@vercel/kv` for `@upstash/redis`. The API is identical.

### Data Model in Redis

```
likes:{postId}:count          → integer (INCR/DECR)
likes:{postId}:users          → SET of fingerprints (SADD/SISMEMBER)
comments:{postId}             → JSON array in sorted set by timestamp
comment:{commentId}           → JSON hash (full comment data)
comments:{postId}:count       → integer
ratelimit:{ip}:{action}       → integer with TTL
trending:posts                → sorted set by engagement score
```

### Authentication Decision: Guest vs Auth

**Chosen: Anonymous with fingerprint + optional display name**

Rationale:
- Your blog is personal. Forcing account creation kills engagement.
- Medium/Dev.to require auth because they're multi-author platforms
- For a personal blog, guest comments with anti-spam is the right balance
- Fingerprint = hash of IP + user-agent + accept-language (not stored raw, privacy-safe)
- Admins see IP hash for moderation, never raw IP

---

## 3. IMPLEMENTATION PLAN (Feature Order)

1. Redis setup + rate limiting utility
2. Sanity schema updates (comment moderation fields on post)
3. Like system (API route + client component)
4. Comment system (API routes + components)
5. Share system (fix existing bug + add platforms)
6. Reading experience (TOC, accurate read time, syntax highlight)
7. Engagement widgets (related, trending, most liked)
8. SEO improvements (JSON-LD, Twitter card, RSS, sitemap update)
9. Performance (ISR, query optimization)
10. Admin moderation UI (Sanity Studio custom view)

---

## 4. ALL FILE CHANGES

### NEW FILES TO CREATE
```
lib/redis.ts                              — Redis client
lib/rate-limit.ts                         — Rate limiting
lib/fingerprint.ts                        — Anonymous user ID
lib/sanitize.ts                           — Input sanitization
lib/reading-time.ts                       — Accurate read time
app/api/blog/[postId]/like/route.ts       — Like toggle API
app/api/blog/[postId]/comments/route.ts   — GET/POST comments
app/api/blog/[postId]/comments/[commentId]/route.ts  — PATCH/DELETE
app/api/blog/trending/route.ts            — Trending posts API
app/api/rss/route.ts                      — RSS feed
components/blog/LikeButton.tsx            — Like button UI
components/blog/CommentSection.tsx        — Comment system UI
components/blog/ShareButtons.tsx          — Fixed share system
components/blog/TableOfContents.tsx       — TOC from headings
components/blog/ReadingProgress.tsx       — Progress bar (reuses ScrollProgress)
components/blog/RelatedPosts.tsx          — Related articles
components/blog/TrendingWidget.tsx        — Trending sidebar
components/blog/RecentComments.tsx        — Recent comments widget
lib/sanity.queries.ts                     — UPDATED: new queries
lib/sanity.types.ts                       — UPDATED: new types
app/blog/[slug]/page.tsx                  — UPDATED: integrate all features
app/blog/page.tsx                         — UPDATED: convert to server component
app/sitemap.ts                            — UPDATED: include blog posts
sanity/schemaTypes/post.ts                — UPDATED: add featured/pinComment fields
.env.example                              — UPDATED: add KV vars
```

---

## 5. CODE IMPLEMENTATION

All files below are production-ready. Follow in order.

