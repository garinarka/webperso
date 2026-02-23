'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { SanityProject } from '@/lib/sanity.types'

interface ProjectCardProps {
    project: SanityProject
    index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const categoryColors = {
        web: 'border-neon-yellow',
        design: 'border-neon-green',
        mobile: 'border-neon-pink',
        experiment: 'border-punk-white'
    }

    const statusColors = {
        completed: 'text-neon-green',
        'in-progress': 'text-neon-yellow',
        archived: 'text-punk-white/50'
    }

    const categoryEmojis = {
        web: '🌐',
        design: '🎨',
        mobile: '📱',
        experiment: '⚡'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0 }}
            className={`
        bg-punk-gray-100 border-brutal p-6
        hover:translate-y-1 transition-transform duration-0
        ${categoryColors[project.category]}
      `}
        >
            {/* Featured Badge */}
            {project.featured && (
                <div className="mb-4">
                    <span className="bg-neon-yellow text-punk-black px-3 py-1 text-brutal-xs font-mono font-bold">
                        FEATURED
                    </span>
                </div>
            )}

            {/* Image or Placeholder */}
            {project.imageUrl ? (
                <div className="mb-4 aspect-video bg-punk-black border border-punk-white/30 overflow-hidden">
                    <Image
                        src={project.imageUrl}
                        alt={project.imageAlt || project.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="mb-4 aspect-video bg-punk-black border border-punk-white/30 flex items-center justify-center">
                    <span className="text-brutal-5xl opacity-30">
                        {categoryEmojis[project.category]}
                    </span>
                </div>
            )}

            {/* Title & Year */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-brutal-2xl font-brutal text-punk-white">
                    {project.title}
                </h3>
                <span className="font-mono text-brutal-xs text-punk-white/50">
                    {project.year}
                </span>
            </div>

            {/* Description */}
            <p className="font-mono text-brutal-sm text-punk-white/70 mb-4">
                {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 bg-punk-black border border-punk-white/30 text-punk-white text-brutal-xs font-mono"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Status & Links */}
            <div className="flex justify-between items-center pt-4 border-t border-punk-white/30">
                <span className={`font-mono text-brutal-xs ${statusColors[project.status]}`}>
                    {project.status.toUpperCase().replace('-', ' ')}
                </span>

                <div className="flex gap-3">
                    {project.liveUrl && (

                        <a href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-brutal-sm text-punk-white hover:text-neon-yellow transition-colors duration-0"
                        >
                            [LIVE]
                        </a>
                    )}
                    {project.githubUrl && (

                        <a href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-brutal-sm text-punk-white hover:text-neon-green transition-colors duration-0"
                        >
                            [CODE]
                        </a>
                    )}
                </div>
            </div >
        </motion.div >
    )
}
