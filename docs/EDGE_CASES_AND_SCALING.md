# Edge Cases, Scaling Notes & Deployment Checklist

---

## 🔴 EDGE CASES TO HANDLE

### Like System
- **Redis down**: `rateLimit()` and all like routes fail open (return 200 with defaults). Users won't notice.
- **Fingerprint collision**: SHA-256 gives 2^256 space. Collision probability for a personal blog is astronomically small. Not a concern.
- **Like count goes negative**: Protected by `if (newCount < 0) { await redis.set(countKey, 0) }` in the API.
- **User clears localStorage**: They can like again. Server will detect the new fingerprint as a new user. Acceptable for a personal blog.

### Comment System
- **Orphaned replies**: If a parent comment is deleted, replies still exist in Redis. They'll be fetched but `buildThreads()` will render them as root-level comments (parentId doesn't match any root). Fix: before deleting a comment, also delete its replies. Add to DELETE route:
  ```typescript
  // Also delete replies
  const allIds = await redis.zrange(keys.comments(postId), 0, -1)
  const replies = await Promise.all(allIds.map(id => redis.get<StoredComment>(keys.comment(id as string))))
  const orphaned = replies.filter(c => c?.parentId === commentId)
  await Promise.all(orphaned.map(c => redis.del(keys.comment(c!.id))))
  ```
- **Concurrent comment posts**: Redis `ZADD` is atomic. No race condition.
- **Comment ID collision**: Uses `crypto.randomUUID()` — collision probability negligible.
- **15-minute edit window**: Enforced server-side. Client shows the edit button based on `createdAt` but server re-validates.

### Trending Score
- **Score bloat over time**: Old posts accumulate score forever. Add a weekly decay job (Vercel Cron):
  ```typescript
  // app/api/cron/decay-trending/route.ts
  // Multiply all scores by 0.9 weekly
  // Vercel Cron: schedule: "0 0 * * 0" (Sunday midnight)
  ```
- **New post never appears**: A new post with 0 score won't show in trending until it gets engagement. Consider seeding with `publishedAt` timestamp as initial score in the blog post page after publish.

### RSS Feed
- **Special characters in title/excerpt**: Wrapped in `<![CDATA[...]]>` so this is handled.
- **Missing publishedAt**: Sanity validates this as required, so shouldn't occur.

---

## 📈 SCALING CONCERNS

### Current setup handles:
- **~10,000 unique visitors/day** without any changes
- **~1,000 comments/day** comfortably with Vercel KV free tier (30,000 requests/day)
- **~100,000 likes/day** (each like = 3-4 Redis ops)

### If you grow beyond this:

**Vercel KV limits hit?**
→ Upgrade to Upstash Redis Pro ($10/mo), or self-host Redis on Railway/Render.

**Sanity API rate limited?**
→ Your blog pages are ISR with `revalidate = 60`. Sanity is only hit once per minute per page, not per user. This scales to millions of visitors.

**Comment spam surge?**
→ The rate limiter (3/minute per IP) handles basic attacks. For serious abuse:
  1. Set `AUTO_APPROVE_COMMENTS=false` (already default)
  2. Add Cloudflare Turnstile (free CAPTCHA): add a hidden field to the form, verify token in API before saving
  3. Block IP ranges via Vercel firewall rules

**TOC IntersectionObserver performance?**
→ Already using `IntersectionObserver` (O(1) per scroll, no scroll event listener). This is the correct approach and scales fine.

---

## 🚀 DEPLOYMENT CHECKLIST

### 1. Dependencies
```bash
# From project root
pnpm add @vercel/kv

# From /sanity workspace
cd sanity && pnpm add @sanity/code-input
```

### 2. Environment variables (Vercel Dashboard → Settings → Environment Variables)
```
NEXT_PUBLIC_SITE_URL=https://yoursite.com
KV_REST_API_URL=...          ← from Vercel KV → Connect
KV_REST_API_TOKEN=...        ← from Vercel KV → Connect
AUTO_APPROVE_COMMENTS=false
ADMIN_SECRET=<random 32+ char string>
```

### 3. Vercel KV setup
1. Go to Vercel Dashboard → Storage → Create Database → KV
2. Connect to your project
3. KV_REST_API_URL and KV_REST_API_TOKEN auto-added to env vars

### 4. Sanity Studio update
```bash
cd sanity
pnpm install
pnpm dev  # test locally
# Deploy studio:
npx sanity deploy
```

### 5. Files to copy from this output into your project

| From (this output)                              | To (your project)                          |
|-------------------------------------------------|--------------------------------------------|
| `lib/redis.ts`                                  | `lib/redis.ts` (NEW)                       |
| `lib/rate-limit.ts`                             | `lib/rate-limit.ts` (NEW)                  |
| `lib/fingerprint.ts`                            | `lib/fingerprint.ts` (NEW)                 |
| `lib/sanitize.ts`                               | `lib/sanitize.ts` (NEW)                    |
| `lib/reading-time.ts`                           | `lib/reading-time.ts` (NEW)                |
| `lib/sanity.queries.ts`                         | `lib/sanity.queries.ts` (REPLACE)          |
| `lib/sanity.types.ts`                           | `lib/sanity.types.ts` (REPLACE)            |
| `app/api/blog/[postId]/like/route.ts`           | (NEW)                                      |
| `app/api/blog/[postId]/view/route.ts`           | (NEW)                                      |
| `app/api/blog/[postId]/comments/route.ts`       | (NEW)                                      |
| `app/api/blog/[postId]/comments/[commentId]/route.ts` | (NEW)                              |
| `app/api/blog/trending/route.ts`                | (NEW)                                      |
| `app/api/blog/recent-comments/route.ts`         | (NEW)                                      |
| `app/api/rss/route.ts`                          | (NEW)                                      |
| `app/blog/page.tsx`                             | `app/blog/page.tsx` (REPLACE)              |
| `app/blog/[slug]/page.tsx`                      | `app/blog/[slug]/page.tsx` (REPLACE)       |
| `app/sitemap.ts`                                | `app/sitemap.ts` (REPLACE)                 |
| `next.config.ts`                                | `next.config.ts` (REPLACE)                 |
| `components/PortableTextComponents.tsx`         | `components/PortableTextComponents.tsx` (REPLACE) |
| `components/BlogSearch.tsx`                     | `components/BlogSearch.tsx` (REPLACE)      |
| `components/blog/LikeButton.tsx`                | `components/blog/LikeButton.tsx` (NEW)     |
| `components/blog/ShareButtons.tsx`              | `components/blog/ShareButtons.tsx` (NEW)   |
| `components/blog/CommentSection.tsx`            | `components/blog/CommentSection.tsx` (NEW) |
| `components/blog/TableOfContents.tsx`           | `components/blog/TableOfContents.tsx` (NEW)|
| `components/blog/RelatedPosts.tsx`              | `components/blog/RelatedPosts.tsx` (NEW)   |
| `components/blog/TrendingWidget.tsx`            | `components/blog/TrendingWidget.tsx` (NEW) |
| `components/blog/RecentComments.tsx`            | `components/blog/RecentComments.tsx` (NEW) |
| `components/blog/BlogListClient.tsx`            | `components/blog/BlogListClient.tsx` (NEW) |
| `components/blog/ViewTracker.tsx`               | `components/blog/ViewTracker.tsx` (NEW)    |
| `components/blog/ReadingStats.tsx`              | `components/blog/ReadingStats.tsx` (NEW)   |
| `sanity/schemaTypes/post.ts`                    | `sanity/schemaTypes/post.ts` (REPLACE)     |
| `sanity/schemaTypes/blockContent.ts`            | `sanity/schemaTypes/blockContent.ts` (REPLACE) |
| `sanity/sanity.config.ts`                       | `sanity/sanity.config.ts` (REPLACE)        |
| `.env.example`                                  | `.env.example` (REPLACE)                   |

### 6. Append to globals.css
Copy the contents of `docs/globals-css-additions.css` and paste at the END of `app/globals.css`.

### 7. Add RSS autodiscovery to `<head>`
In `app/layout.tsx`, add inside `<head>`:
```tsx
<link
  rel="alternate"
  type="application/rss+xml"
  title="JAGADDHITA Blog RSS"
  href="/api/rss"
/>
```

### 8. Test locally
```bash
# Mock KV locally with env vars pointing to Upstash or use a local Redis:
# Option A: Use Upstash free tier for dev (recommended)
# Option B: Run Redis locally + use @upstash/redis client

pnpm dev
# Visit: /blog, /blog/[any-slug], /api/rss
```

---

## 🔐 SECURITY SUMMARY

| Attack vector           | Mitigation                                           |
|-------------------------|------------------------------------------------------|
| XSS in comments         | `stripHtml()` + `escapeHtml()` in `sanitize.ts`     |
| Spam comments           | Rate limit (3/min), URL count check, profanity filter|
| Like manipulation       | SHA-256 fingerprint SET in Redis (dedup)             |
| Admin route abuse       | `x-admin-secret` header required                     |
| Input injection         | All user input sanitized before Redis write          |
| Clickjacking            | `X-Frame-Options: SAMEORIGIN` header                |
| MIME sniffing           | `X-Content-Type-Options: nosniff` header            |
| Referrer leakage        | `Referrer-Policy: strict-origin-when-cross-origin`  |
| View count gaming       | 1 view per IP per 30 minutes rate limit             |

---

## 💡 FUTURE IMPROVEMENTS (Not implemented — out of scope)

1. **Email notifications**: Send email to admin when a new comment is posted. Use Resend or Nodemailer in the POST comment route.
2. **Comment reactions**: Add emoji reactions (👍 🔥 💡) as lightweight Redis counters per comment.
3. **Full-text search**: Integrate Algolia or Sanity's built-in search API for cross-post search.
4. **View count in blog list**: Show "X views" on BlogCard — requires one Redis GET per card. Cache with Redis MGET.
5. **Bookmarks**: Let users bookmark posts to localStorage with a sidebar widget.
6. **Newsletter**: Integrate Buttondown or ConvertKit via their APIs.
