/**
 * lib/sanitize.ts
 *
 * - Strips HTML/JS from user input (XSS prevention)
 * - Basic profanity filter (block list approach — add your own words)
 * - Validates comment structure
 */

// Minimal HTML entity encoder — no external deps
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Strip all HTML tags
export function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}

// Basic profanity list — extend as needed
const PROFANITY_PATTERNS: RegExp[] = [
  // Add explicit words here as RegExp with word boundaries
  // Example: /\bbadword\b/gi
  // Keeping this minimal — content moderation is your admin responsibility
]

export function containsProfanity(text: string): boolean {
  return PROFANITY_PATTERNS.some(pattern => pattern.test(text))
}

// Sanitize comment text: strip HTML, trim, length limit
export function sanitizeCommentText(raw: string): string {
  return stripHtml(raw).slice(0, 2000).trim()
}

// Sanitize display name
export function sanitizeDisplayName(raw: string): string {
  return stripHtml(raw).slice(0, 60).trim() || 'anonymous'
}

// Validate comment input
export interface CommentInput {
  text: string
  authorName?: string
  parentId?: string | null
  postId: string
}

export interface ValidationResult {
  valid: boolean
  error?: string
  sanitized?: CommentInput
}

export function validateComment(input: unknown): ValidationResult {
  if (typeof input !== 'object' || input === null) {
    return { valid: false, error: 'Invalid input' }
  }

  const raw = input as Record<string, unknown>

  if (typeof raw.text !== 'string' || raw.text.trim().length < 2) {
    return { valid: false, error: 'Comment must be at least 2 characters' }
  }

  if (typeof raw.postId !== 'string' || !raw.postId) {
    return { valid: false, error: 'Missing post ID' }
  }

  const text = sanitizeCommentText(raw.text as string)
  const authorName = sanitizeDisplayName((raw.authorName as string) || 'anonymous')

  if (text.length < 2) {
    return { valid: false, error: 'Comment is too short after sanitization' }
  }

  if (containsProfanity(text)) {
    return { valid: false, error: 'Comment contains prohibited content' }
  }

  // Block common spam patterns
  const urlCount = (text.match(/https?:\/\//g) || []).length
  if (urlCount > 2) {
    return { valid: false, error: 'Too many links in comment' }
  }

  return {
    valid: true,
    sanitized: {
      text,
      authorName,
      parentId: typeof raw.parentId === 'string' ? raw.parentId : null,
      postId: raw.postId as string,
    },
  }
}
