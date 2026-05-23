'use client'

/**
 * components/blog/TableOfContents.tsx
 *
 * Floating TOC (desktop: sticky sidebar; mobile: collapsible inline).
 * Active heading tracked via IntersectionObserver.
 *
 * NOTE: For this to work, PortableTextComponents must render headings with
 * matching id attributes. See the updated PortableTextComponents below.
 */

import { useState, useEffect, useRef } from 'react'
import { List, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TocItem } from '@/lib/reading-time'

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [expanded, setExpanded] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (items.length === 0) return

    const headingElements = items
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    observerRef.current = new IntersectionObserver(
      entries => {
        // Find the topmost visible heading
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-10% 0% -70% 0%',
        threshold: 0,
      }
    )

    headingElements.forEach(el => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [items])

  if (items.length < 2) return null

  return (
    <>
      {/* Desktop: sticky sidebar - rendered by parent layout */}
      {/* Mobile: inline collapsible */}
      <div className="lg:hidden border-brutal border-punk-white/30 mb-8">
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center justify-between p-4 font-mono text-brutal-sm text-punk-white/70 hover:text-neon-yellow transition-colors duration-0"
          aria-expanded={expanded}
        >
          <span className="flex items-center gap-2">
            <List size={16} />
            TABLE OF CONTENTS
          </span>
          <ChevronDown
            size={16}
            className={cn('transition-transform duration-200', expanded && 'rotate-180')}
          />
        </button>

        {expanded && (
          <nav className="px-4 pb-4">
            <TocList items={items} activeId={activeId} />
          </nav>
        )}
      </div>

      {/* Desktop sticky — exported separately for use in sidebar */}
      <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <div className="border-brutal border-punk-white/30 p-4">
          <p className="font-mono text-brutal-xs text-punk-white/50 mb-4 flex items-center gap-2">
            <List size={14} />
            ON THIS PAGE
          </p>
          <nav>
            <TocList items={items} activeId={activeId} />
          </nav>
        </div>
      </aside>
    </>
  )
}

function TocList({ items, activeId }: { items: TocItem[]; activeId: string }) {
  return (
    <ul className="space-y-1">
      {items.map(item => (
        <li
          key={item.id}
          style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
        >
          <a
            href={`#${item.id}`}
            onClick={e => {
              e.preventDefault()
              document.getElementById(item.id)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
            className={cn(
              'block font-mono text-brutal-xs py-1 transition-colors duration-0',
              'hover:text-neon-yellow',
              activeId === item.id
                ? 'text-neon-yellow border-l-2 border-neon-yellow pl-2'
                : 'text-punk-white/50'
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
