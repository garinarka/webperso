'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import React from 'react'

type Theme = 'yellow' | 'green' | 'pink' | 'red' | 'white'
type Hover = 'lift' | 'glow' | 'glitch' | 'none'

interface BrutalCardProps {
    theme?: Theme
    hover?: Hover
    icon?: React.ReactNode
    title?: string
    description?: string
    tags?: string[]
    className?: string
}

export default function BrutalCard({
    theme = 'green',
    hover = 'lift',
    icon,
    title,
    description,
    tags = [],
    className
}: BrutalCardProps) {

    const themeStyles: Record<Theme, {
        border: string;
        text: string;
        glow: string
    }> = {
        yellow: {
            border: 'border-brutal-yellow',
            text: 'title-neon-yellow',
            glow: '0 0 20px #FFFF00'
        },
        green: {
            border: 'border-brutal-green',
            text: 'title-neon-green',
            glow: '0 0 20px #00FF00'
        },
        pink: {
            border: 'border-brutal-pink',
            text: 'title-neon-pink',
            glow: '0 0 20px #FF00FF'
        },
        red: {
            border: 'border-brutal-red',
            text: 'title-neon-red',
            glow: '0 0 20px #FF0000'
        },
        white: {
            border: 'border-brutal-white',
            text: 'title-neon-white',
            glow: '0 0 20px #FFFFFF'
        }
    }

    const hoverVariants = {
        lift: {
            hover: { y: -4, transition: { duration: 0 } }
        },
        glow: {
            hover: {
                boxShadow: themeStyles[theme].glow,
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
            variants={hoverVariants[hover]}
            whileHover="hover"
            className={cn(
                'p-6 bg-punk-black transition-transform duration-0',
                themeStyles[theme].border,
                className
            )}
        >

            {/* Icon */}
            <div className="text-brutal-6xl mb-4">
                {icon}
            </div>

            {/* Title */}
            <h3 className={cn(
                'font-brutal mb-3',
                themeStyles[theme].text,
            )}>
                {title}
            </h3>

            {/* Description */}
            <p className="font-mono text-brutal-sm text-punk-white/70 mb-4">
                {description}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-punk-gray-100 border border-punk-white text-punk-white text-brutal-xs font-mono uppercase"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    )
}
