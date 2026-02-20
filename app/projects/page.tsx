'use client'

import { useState, useMemo } from 'react'
import type { Metadata } from 'next'
import GlitchText from '@/components/GlitchText'
import ProjectFilter from '@/components/ProjectFilter'
import ProjectCard from '@/components/ProjectCard'
import NeonButton from '@/components/NeonButton'
import { projects } from '@/data/projects'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProjects = useMemo(() => {
        let filtered = projects

        // Filter by category/featured
        if (activeFilter !== 'all') {
            filtered = activeFilter === 'featured'
                ? filtered.filter(p => p.featured)
                : filtered.filter(p => p.category === activeFilter)
        }

        // Filter by search
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        }

        return filtered
    }, [activeFilter, searchQuery])

    return (
        <PageTransition>
            <div className="min-h-screen bg-punk-black text-punk-white relative">
                <div className="max-w-7xl mx-auto px-4 py-20 relative z-20">
                    {/* Hero Section */}
                    <section className="mb-16 text-center">
                        <GlitchText
                            as="h1"
                            className="text-brutal-6xl md:text-brutal-7xl font-brutal mb-6"
                            intensity="medium"
                        >
                            PROJECTS
                        </GlitchText>
                        <p className="text-brutal-lg md:text-brutal-xl font-mono text-punk-white/70 max-w-3xl mx-auto mb-4">
                            things i've built. from web apps to experiments
                        </p>
                        <div className="font-mono text-brutal-sm text-punk-white/50">
                            <span className="text-neon-yellow">{filteredProjects.length}</span> projects found
                        </div>
                    </section>

                    {/* Filter Section */}
                    <section className="mb-12">
                        <div className="max-w-md mx-auto mb-8">
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 bg-punk-black border-brutal border-punk-white text-punk-white font-mono text-brutal-base focus:border-neon-yellow"
                            />
                        </div>

                        <ProjectFilter
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                        />
                    </section>

                    {/* Projects Grid */}
                    <ScrollReveal>
                        <section>
                            {filteredProjects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProjects.map((project, index) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-brutal-3xl font-brutal text-punk-white/30 mb-4">
                                        NO PROJECTS FOUND
                                    </p>
                                    <p className="font-mono text-brutal-sm text-punk-white/50">
                                        try a different filter
                                    </p>
                                </div>
                            )}
                        </section>
                    </ScrollReveal>

                    {/* Stats Section */}
                    <ScrollReveal delay={0.2}>
                        <section className="mt-20 border-t-brutal border-punk-white pt-12">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <p className="text-brutal-4xl font-brutal text-neon-yellow mb-2">
                                        {projects.length}
                                    </p>
                                    <p className="font-mono text-brutal-sm text-punk-white/70">
                                        total projects
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-brutal-4xl font-brutal text-neon-green mb-2">
                                        {projects.filter(p => p.status === 'completed').length}
                                    </p>
                                    <p className="font-mono text-brutal-sm text-punk-white/70">
                                        completed
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-brutal-4xl font-brutal text-neon-pink mb-2">
                                        {projects.filter(p => p.status === 'in-progress').length}
                                    </p>
                                    <p className="font-mono text-brutal-sm text-punk-white/70">
                                        in progress
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-brutal-4xl font-brutal text-punk-white mb-2">
                                        {new Date().getFullYear()}
                                    </p>
                                    <p className="font-mono text-brutal-sm text-punk-white/70">
                                        current year
                                    </p>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* CTA Section */}
                    <ScrollReveal delay={0.2}>
                        <section className="mt-20 text-center border-brutal border-neon-yellow p-12 bg-punk-gray-100">
                            <h2 className="text-brutal-4xl font-brutal mb-6">
                                GOT A PROJECT IDEA?
                            </h2>
                            <p className="font-mono text-brutal-lg text-punk-white/70 mb-8 max-w-2xl mx-auto">
                                let's build something together
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">

                                <NeonButton href="/contact" variant="yellow" size="lg">
                                    START A PROJECT
                                </NeonButton>
                            </div>
                        </section>
                    </ScrollReveal>

                </div>
            </div >
        </PageTransition>
    )
}
