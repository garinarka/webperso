/**
 * lib/reading-time.ts
 *
 * Calculates accurate reading time from Sanity PortableText blocks.
 * Also extracts headings for Table of Contents.
 */

import type { PortableTextBlock } from '@portabletext/react'

const WORDS_PER_MINUTE = 200

// Extract plain text from PortableText blocks
function extractText(blocks: PortableTextBlock[]): string {
  return blocks
    .filter(block => block._type === 'block')
    .map(block => {
      if (!Array.isArray((block as any).children)) return ''
      return (block as any).children
        .map((child: any) => child.text || '')
        .join(' ')
    })
    .join(' ')
}

export function calculateReadingTime(body: PortableTextBlock[]): number {
  if (!body || body.length === 0) return 1

  const text = extractText(body)
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

// ─── Table of Contents ───────────────────────────────────────────────────────

export interface TocItem {
  id: string
  text: string
  level: 2 | 3 | 4
}

// Generate slug from heading text (matches what we render in PortableText)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function extractToc(body: PortableTextBlock[]): TocItem[] {
  if (!body) return []

  return body
    .filter(
      block =>
        block._type === 'block' &&
        ['h2', 'h3', 'h4'].includes((block as any).style)
    )
    .map(block => {
      const children = (block as any).children || []
      const text = children.map((c: any) => c.text || '').join('')
      const level = parseInt((block as any).style.replace('h', ''), 10) as 2 | 3 | 4
      return {
        id: slugify(text),
        text,
        level,
      }
    })
    .filter(item => item.text.length > 0)
}
