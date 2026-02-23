'use client'

import { useState, useMemo, useEffect } from 'react'
import GlitchText from '@/components/GlitchText'
import BlogCard from '@/components/BlogCard'
import BlogSearch from '@/components/BlogSearch'
import PageTransition from '@/components/PageTransition'
import { client } from '@/lib/sanity.client'
import { publishedPostsQuery } from '@/lib/sanity.queries'
import type { SanityPost } from '@/lib/sanity.types'
import NeonButton from '@/components/NeonButton'

export default function BlogPage() {
    const [activeFilter, setActiveFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [posts, setPosts] = useState<SanityPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Fetch posts from Sanity
        client.fetch(publishedPostsQuery)
            .then((data) => {
                console.log('Fetched posts:', data)
                setPosts(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching posts:', error)
                setError(error.message)
                setLoading(false)
            })
    }, [])

    const filters = [
        { id: 'all', label: 'ALL' },
        { id: 'tutorial', label: 'TUTORIALS' },
        { id: 'thoughts', label: 'THOUGHTS' },
        { id: 'project', label: 'PROJECTS' },
        { id: 'rant', label: 'RANTS' },
    ]

    // Filter + Search logic
    const filteredPosts = useMemo(() => {
        let result = posts

        // Apply category filter
        if (activeFilter !== 'all') {
            result = result.filter(p => p.category === activeFilter)
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            result = result.filter(post => {
                // Search in title
                if (post.title.toLowerCase().includes(query)) return true

                // Search in excerpt
                if (post.excerpt.toLowerCase().includes(query)) return true

                // Search in tags
                if (post.tags?.some(tag => tag.toLowerCase().includes(query))) return true

                return false
            })
        }

        return result
    }, [activeFilter, searchQuery, posts])

    const featuredPost = posts.find(p => p.featured)

    if (loading) {
        return (
            <PageTransition>
                <div className="min-h-screen bg-punk-black text-punk-white relative flex items-center justify-center">
                    <div className="text-center">
                        <p className="font-mono text-brutal-xl text-neon-yellow animate-pulse">
                            loading posts...
                        </p>
                    </div>
                </div>
            </PageTransition>
        )
    }

    if (error) {
        return (
            <PageTransition>
                <div className="min-h-screen bg-punk-black text-punk-white relative flex items-center justify-center">
                    <div className="text-center max-w-2xl mx-auto px-4">
                        <p className="font-mono text-brutal-2xl text-neon-red mb-4">
                            error loading posts
                        </p>
                        <p className="font-mono text-brutal-sm text-punk-white/70 mb-8">
                            {error}
                        </p>
                        <p className="font-mono text-brutal-xs text-punk-white/50">
                            make sure Sanity Studio is running and you have created some posts
                        </p>
                    </div>
                </div>
            </PageTransition>
        )
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-punk-black text-punk-white relative overflow-x-hidden">
                <div className="max-w-5xl mx-auto px-4 py-20 relative z-20">

                    {/* Hero */}
                    <section className="mb-16 text-center">
                        <GlitchText
                            as="h1"
                            className="text-brutal-5xl md:text-brutal-6xl lg:text-brutal-7xl font-brutal mb-6"
                            intensity="medium"
                        >
                            BLOG
                        </GlitchText>
                        <p className="text-brutal-base md:text-brutal-lg font-mono text-punk-white/70 max-w-2xl mx-auto px-4 mb-8">
                            thoughts, tutorials, rants, and everything in between.
                            no SEO bait. no fluff. just real content
                        </p>

                        {/* Search */}
                        <div className="max-w-2xl mx-auto">
                            <BlogSearch
                                onSearch={setSearchQuery}
                                resultCount={filteredPosts.length}
                                totalCount={posts.length}
                            />
                        </div>
                    </section>

                    {/* Featured Post - Only show if no search active */}
                    {featuredPost && activeFilter === 'all' && !searchQuery && (
                        <section className="mb-16">
                            <div className="font-mono text-brutal-sm text-neon-yellow mb-4">
                                &gt; FEATURED POST
                            </div>
                            <BlogCard
                                post={featuredPost}
                                index={0}
                                featured={true}
                            />
                        </section>
                    )}

                    {/* Filters */}
                    <section className="mb-8">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {filters.map((filter) => {
                                const isActive = activeFilter === filter.id
                                return (
                                    <button
                                        key={filter.id}
                                        onClick={() => setActiveFilter(filter.id)}
                                        className={`
                      font-mono text-brutal-sm px-4 py-2 border-brutal transition-colors duration-0
                      ${isActive
                                                ? 'bg-neon-yellow text-punk-black border-neon-yellow'
                                                : 'bg-punk-black text-punk-white border-punk-white hover:border-neon-yellow hover:text-neon-yellow'
                                            }
                    `}
                                    >
                                        {filter.label}
                                    </button>
                                )
                            })}

                            {/* Post Count */}
                            <div className="flex items-center sm:ml-auto font-mono text-brutal-sm text-punk-white/50">
                                <span className="text-neon-yellow">{filteredPosts.length}</span>
                                &nbsp;posts
                            </div>
                        </div>
                    </section>

                    {/* Posts Grid */}
                    <section>
                        {filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredPosts
                                    .filter(p => !searchQuery && activeFilter !== 'all' || searchQuery || !p.featured)
                                    .map((post, index) => (
                                        <BlogCard
                                            key={post._id}
                                            post={post}
                                            index={index}
                                        />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                {searchQuery ? (
                                    <>
                                        <p className="text-brutal-3xl font-brutal text-punk-white/30 mb-4">
                                            NO RESULTS
                                        </p>
                                        <p className="font-mono text-brutal-sm text-punk-white/50 mb-6">
                                            Try different keywords or clear the search
                                        </p>
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="px-6 py-3 bg-neon-yellow text-punk-black font-brutal text-brutal-base border-brutal border-punk-black hover:bg-punk-black hover:text-neon-yellow hover:border-neon-yellow"
                                        >
                                            CLEAR SEARCH
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-brutal-3xl font-brutal text-punk-white/30 mb-4">
                                            NO POSTS YET
                                        </p>
                                        <p className="font-mono text-brutal-sm text-punk-white/50 mb-4">
                                            Create some posts in Sanity Studio!
                                        </p>
                                        <a
                                            href="http://localhost:3333"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-6 py-3 bg-neon-yellow text-punk-black font-brutal text-brutal-base border-brutal border-punk-black hover:bg-punk-black hover:text-neon-yellow hover:border-neon-yellow"
                                        >
                                            OPEN SANITY STUDIO
                                        </a>
                                    </>
                                )}
                            </div>
                        )}
                    </section>

                    {/* Newsletter CTA */}
                    <section className="mt-20 border-brutal border-neon-green p-6 md:p-8 lg:p-12">
                        <div className="text-center">
                            <h2 className="text-brutal-3xl md:text-brutal-4xl font-brutal mb-4 text-neon-green">
                                STAY UPDATED
                            </h2>
                            <p className="font-mono text-brutal-sm md:text-brutal-base text-punk-white/70 mb-8 max-w-lg mx-auto px-4">
                                No spam. No newsletter BS. Just an email when I publish something worth reading.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 px-4 py-3 bg-punk-black border-brutal border-punk-white text-punk-white font-mono text-brutal-sm md:text-brutal-base focus:border-neon-green placeholder:text-punk-white/30"
                                />
                                <button className="px-4 md:px-6 py-3 bg-neon-green text-punk-black font-brutal text-brutal-sm md:text-brutal-base border-brutal border-punk-black hover:bg-punk-black hover:text-neon-green hover:border-neon-green transition-colors duration-0 whitespace-nowrap">
                                    SUBSCRIBE
                                </button>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </PageTransition>
    )
}
