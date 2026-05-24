'use client'

/**
 * components/blog/BlogListClient.tsx
 *
 * Extracted from app/blog/page.tsx so the parent can be a server component.
 * Handles client-side category filtering and search.
 * Receives posts as props (already fetched by server).
 */

import { useState, useMemo } from 'react'
import BlogCard from '@/components/BlogCard'
import BlogSearch from '@/components/BlogSearch'
import type { SanityPost } from '@/lib/sanity.types'

interface BlogListClientProps {
  posts: SanityPost[]
}

const filters = [
  { id: 'all', label: 'ALL' },
  { id: 'tutorial', label: 'TUTORIALS' },
  { id: 'thoughts', label: 'THOUGHTS' },
  { id: 'project', label: 'PROJECTS' },
  { id: 'rant', label: 'RANTS' },
]

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const featuredPost = posts.find(p => p.featured)

  const filteredPosts = useMemo<SanityPost[]>(() => {
    let result = posts

    if (activeFilter !== 'all') {
      result = result.filter(p => p.category === activeFilter)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.tags?.some(tag => tag.toLowerCase().includes(q))
      )
    }

    return result
  }, [activeFilter, searchQuery, posts])

  return (
    <div>
      {/* Featured post */}
      {featuredPost && activeFilter === 'all' && !searchQuery && (
        <div className="mb-10">
          <p className="font-mono text-brutal-xs text-neon-yellow mb-3">★ FEATURED</p>
          <BlogCard post={featuredPost} index={0} featured />
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`font-mono text-brutal-xs px-4 py-2 border-brutal transition-colors duration-0 ${
              activeFilter === filter.id
                ? 'bg-punk-white text-punk-black border-punk-white'
                : 'border-punk-white/30 text-punk-white/50 hover:border-punk-white hover:text-punk-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-8">
        <BlogSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Results count */}
      <p className="font-mono text-brutal-xs text-punk-white/40 mb-6">
        {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
        {searchQuery && ` matching "${searchQuery}"`}
      </p>

      {/* Post grid */}
      {filteredPosts.length === 0 ? (
        <div className="border-brutal border-punk-white/20 p-12 text-center">
          <p className="font-mono text-brutal-sm text-punk-white/40">
            // no posts found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, i) => (
            <BlogCard key={post._id} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
