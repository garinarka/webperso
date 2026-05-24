'use client'

/**
 * components/blog/ShareButtons.tsx
 *
 * Replaces the broken share section in the original blog detail page.
 * The original used `window.location.href` in a server component — crashes.
 * This is a client component that builds URLs correctly.
 *
 * Features:
 * - WhatsApp, Twitter/X, Facebook, Telegram, LinkedIn
 * - Copy link button with feedback
 * - Native Web Share API if supported (mobile)
 */

import { useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  title: string
  excerpt: string
  slug: string
}

export default function ShareButtons({ title, excerpt, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [nativeShared, setNativeShared] = useState(false)

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jgarinarka.vercel.app'}/blog/${slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(`${title} — ${excerpt.slice(0, 100)}`)

  const shareLinks = [
    {
      label: 'TWITTER/X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      variant: 'pink' as const,
    },
    {
      label: 'WHATSAPP',
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      variant: 'green' as const,
    },
    {
      label: 'TELEGRAM',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      variant: 'yellow' as const,
    },
    {
      label: 'LINKEDIN',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      variant: 'white' as const,
    },
    {
      label: 'FACEBOOK',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      variant: 'white' as const,
    },
  ]

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  async function handleNativeShare() {
    if (!navigator.share) return
    try {
      await navigator.share({ title, text: excerpt, url })
      setNativeShared(true)
      setTimeout(() => setNativeShared(false), 2000)
    } catch {
      // User cancelled or not supported — do nothing
    }
  }

  const hasNativeShare = typeof navigator !== 'undefined' && Boolean(navigator.share)

  return (
    <div className="mb-8 p-6 border-brutal border-neon-green">
      <p className="font-brutal text-brutal-xl text-neon-green mb-4">
        SHARE THIS POST
      </p>

      <div className="flex flex-wrap gap-3">
        {/* Native share (mobile) */}
        {hasNativeShare && (
          <button
            onClick={handleNativeShare}
            className={cn(
              'border-brutal px-4 py-2 font-brutal text-brutal-sm',
              'border-neon-cyan text-neon-cyan',
              'hover:bg-neon-cyan hover:text-punk-black transition-colors duration-0',
              'flex items-center gap-2'
            )}
          >
            <Share2 size={16} />
            {nativeShared ? 'SHARED!' : 'SHARE'}
          </button>
        )}

        {shareLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'border-brutal px-4 py-2 font-brutal text-brutal-sm inline-block',
              'transition-colors duration-0',
              link.variant === 'pink' && 'border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-punk-black',
              link.variant === 'green' && 'border-neon-green text-neon-green hover:bg-neon-green hover:text-punk-black',
              link.variant === 'yellow' && 'border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-punk-black',
              link.variant === 'white' && 'border-punk-white text-punk-white hover:bg-punk-white hover:text-punk-black',
            )}
          >
            {link.label}
          </a>
        ))}

        {/* Copy link */}
        <button
          onClick={handleCopy}
          className={cn(
            'border-brutal px-4 py-2 font-brutal text-brutal-sm',
            'flex items-center gap-2 transition-colors duration-0',
            copied
              ? 'border-neon-green text-neon-green bg-neon-green/10'
              : 'border-punk-white/30 text-punk-white/50 hover:border-punk-white hover:text-punk-white'
          )}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'COPIED!' : 'COPY LINK'}
        </button>
      </div>
    </div>
  )
}
