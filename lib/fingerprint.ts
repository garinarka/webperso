/**
 * lib/fingerprint.ts
 *
 * Generates a privacy-safe anonymous fingerprint from request headers.
 * - Never stores raw IP
 * - Hashed with SHA-256 so it's one-way
 * - Stable per device/browser (same hash for same user)
 * - Not 100% unique, but good enough for like deduplication on a personal blog
 *
 * For client-side we also use localStorage to persist a random UUID.
 * The API uses the server-side hash; the client stores a session ID for
 * optimistic UI updates only.
 */

// Server-side fingerprint from request
export async function getServerFingerprint(request: Request): Promise<string> {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || request.headers.get('x-real-ip')
    || '0.0.0.0'

  const ua = request.headers.get('user-agent') || 'unknown'
  const lang = request.headers.get('accept-language') || 'unknown'

  const raw = `${ip}:${ua}:${lang}`

  // SHA-256 hash — works in Edge Runtime
  const encoder = new TextEncoder()
  const data = encoder.encode(raw)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Client-side: persistent random ID stored in localStorage
// This is used only for optimistic UI — the server always re-checks
export function getClientFingerprint(): string {
  if (typeof window === 'undefined') return ''

  const stored = localStorage.getItem('blog_uid')
  if (stored) return stored

  const id = crypto.randomUUID()
  localStorage.setItem('blog_uid', id)
  return id
}
