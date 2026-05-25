# Admin Comment Moderation

Since this is a personal blog, the simplest admin interface is:

## 1. Auto-approve (recommended for low-traffic personal blog)

Set in `.env.local`:
```
AUTO_APPROVE_COMMENTS=true
```

All comments appear immediately. You delete spam via API.

## 2. Manual approval via curl

### Approve a comment
```bash
curl -X PATCH https://yoursite.com/api/blog/{postId}/comments/{commentId} \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: your_secret" \
  -d '{"approved": true}'
```

### Delete a comment
```bash
curl -X DELETE https://yoursite.com/api/blog/{postId}/comments/{commentId} \
  -H "x-admin-secret: your_secret"
```

### Pin a comment
```bash
curl -X PATCH https://yoursite.com/api/blog/{postId}/comments/{commentId} \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: your_secret" \
  -d '{"pinned": true}'
```

## 3. View pending comments
```bash
# Redis CLI — list all comment IDs for a post
redis-cli ZRANGE "comments:{postId}" 0 -1

# Get a specific comment
redis-cli GET "comment:{commentId}"
```

## 4. Optional: Build a simple admin page

Create `app/admin/comments/page.tsx` (protected by middleware checking a session cookie).
Use the same API routes — just add the `x-admin-secret` header from the server side.

Example middleware protection (add to `middleware.ts`):
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value
    if (token !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  return NextResponse.next()
}
```
