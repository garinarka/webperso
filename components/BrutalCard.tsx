'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BrutalCardProps {
    children: ReactNode
    title?: string
    subtitle?: string
    tags?: string[]
    borderColor?: 'yellow' | 'green' | 'pink' | 'red' | 'white'
    hover?: 'lift' | 'glow' | 'glitch' | 'none'
    className?: string
    onClick?: () => void
}

export default function BrutalCard({
    children,
    title,
    subtitle,
    tags = [],
    borderColor = 'white',
    hover = 'lift',
    className = '',
    onClick
}: BrutalCardProps) {

    // Border color classes
    const borderColors = {
        yellow: 'border-neon-yellow',
        green: 'border-neon-green',
        pink: 'border-neon-pink',
        red: 'border-neon-red',
        white: 'border-punk-white'
    }

    // Hover variants
    const hoverVariants = {
        lift: {
            hover: { y: -4, transition: { duration: 0 } }
        },
        glow: {
            hover: {
                boxShadow: borderColor === 'yellow' ? '0 0 20px #FFFF00' :
                    borderColor === 'green' ? '0 0 20px #00FF00' :
                        borderColor === 'pink' ? '0 0 20px #FF00FF' :
                            borderColor === 'red' ? '0 0 20px #FF0000' :
                                '0 0 20px #FFFFFF',
                transition: { duration: 0 }
            }
        },
        glitch: {
            hover: {
                x: [0, -2, 2, -2, 0],
                transition: { duration: 0.3, repeat: 3 }
            }
        },
        none: {}
    }

    return (
        <motion.div
            className={cn(
                'bg-punk-gray-100 border-brutal p-6',
                borderColors[borderColor],
                onClick && 'cursor-pointer',
                className
            )}
            variants={hoverVariants[hover]}
            whileHover="hover"
            onClick={onClick}
        >
            {/* Title */}
            {title && (
                <h3 className="text-brutal-2xl font-brutal text-punk mb-2">
                    {title}
                </h3>
            )}

            {/* Subtitle */}
            {subtitle && (
                <p className="text-brutal-sm font-mono text-punk-white/70 mb-4">
                    {subtitle}
                </p>
            )}

            {/* Content */}
            <div className="mb-4">
                {children}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-punk-black border border-punk-white text-punk-white text-brutal-xs font-mono uppercase"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    )
}
