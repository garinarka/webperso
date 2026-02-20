'use client'

import { useState, useMemo } from 'react'
import GlitchText from '@/components/GlitchText'
import BlogCard from '@/components/BlogCard'
import { blogPosts } from '@/data/blog'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'
import NeonButton from '@/components/NeonButton'

export default function BlogPage() {
    const [activeFilter, setActiveFilter] = useState('all')

    const filters = [
        { id: 'all', label: 'ALL' },
        { id: 'tutorial', label: 'TUTORIALS' },
        { id: 'thoughts', label: 'THOUGHTS' },
        { id: 'project', label: 'PROJECTS' },
        { id: 'rant', label: 'RANTS' },
    ]

    const filteredPosts = useMemo(() => {
        const published = blogPosts.filter(p => p.published)
        if (activeFilter === 'all') return published
        return published.filter(p => p.category === activeFilter)
    }, [activeFilter])

    const featuredPost = blogPosts.find(p => p.featured && p.published)

    return (
        <PageTransition>
            <div className="min-h-screen bg-punk-black text-punk-white relative">
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
                        <p className="text-brutal-base md:text-brutal-lg font-mono text-punk-white/70 max-w-2xl mx-auto px-4">
                            thoughts, tutorials, rants, and everything in between.
                            no SEO bait. no fluff. just real content
                        </p>
                    </section>

                    {/* Featured Post */}
                    {featuredPost && activeFilter === 'all' && (
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
                        <div className="flex flex-wrap gap-3">
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
                            <div className="flex items-center ml-auto font-mono text-brutal-sm text-punk-white/50">
                                <span className="text-neon-yellow">{filteredPosts.length}</span>
                                &nbsp;posts
                            </div>
                        </div>
                    </section>

                    {/* Posts Grid */}
                    <ScrollReveal>
                        <section>
                            {filteredPosts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredPosts
                                        .filter(p => activeFilter !== 'all' || !p.featured)
                                        .map((post, index) => (
                                            <BlogCard
                                                key={post.slug}
                                                post={post}
                                                index={index}
                                            />
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-brutal-3xl font-brutal text-punk-white/30 mb-4">
                                        NO POSTS FOUND
                                    </p>
                                    <p className="font-mono text-brutal-sm text-punk-white/50">
                                        Check back soon.
                                    </p>
                                </div>
                            )}
                        </section>
                    </ScrollReveal>

                    {/* Newsletter CTA */}
                    <ScrollReveal delay={0.2}>
                        <section className="mt-20 border-brutal border-neon-green bg-punk-gray-100 p-6 md:p-8 lg:p-12">
                            <div className="text-center">
                                <h2 className="text-brutal-3xl md:text-brutal-4xl font-brutal mb-4 text-neon-green">
                                    STAY UPDATED
                                </h2>
                                <p className="font-mono text-brutal-sm md:text-brutal-base text-punk-white/70 mb-8 max-w-lg mx-auto px-4">
                                    no spam. no newsletter BS. just an email when i publish something worth reading
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="flex-1 px-4 py-3 bg-punk-black border-brutal border-punk-white text-punk-white font-mono text-brutal-sm md:text-brutal-base focus:border-neon-green placeholder:text-punk-white/30"
                                    />
                                    <NeonButton href="/contact" variant="green" size="lg">
                                        SUBSCRIBE
                                    </NeonButton>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                </div>
            </div>
        </PageTransition>
    )
}
