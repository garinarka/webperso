'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlitchTextProps {
    children: string
    className?: string
    intensity?: 'low' | 'medium' | 'high'
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

export default function GlitchText({
    children,
    className = '',
    intensity = 'medium',
    as = 'p'
}: GlitchTextProps) {
    const Component = as

    // Animation variants based on intensity
    const glitchVariants = {
        low: {
            x: [0, -1, 1, -1, 0],
            transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 }
        },
        medium: {
            x: [0, -2, 2, -2, 0],
            transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2 }
        },
        high: {
            x: [0, -3, 3, -3, 3, -3, 0],
            y: [0, 2, -2, 2, -2, 0],
            transition: { duration: 0.2, repeat: Infinity, repeatDelay: 1 }
        }
    }

    return (
        <motion.div
            className="inline-block"
            animate={glitchVariants[intensity]}
        >
            <Component
                className={cn('glitch-text', className)}
                data-text={children}
            >
                {children}
            </Component>
        </motion.div>
    )
}
