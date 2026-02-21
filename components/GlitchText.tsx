'use client'

import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useRef, memo } from 'react'

interface GlitchTextProps {
    children: string
    className?: string
    intensity?: 'low' | 'medium' | 'high'
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

function GlitchText({
    children,
    className = '',
    intensity = 'medium',
    as = 'p'
}: GlitchTextProps) {
    const Component = as
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: "-100px" })

    // Only animate when in view
    const glitchVariants = {
        low: {
            x: isInView ? [0, -1, 1, -1, 0] : 0,
            transition: { duration: 0.5, repeat: Infinity, repeatDelay: 5 }
        },
        medium: {
            x: isInView ? [0, -2, 2, -2, 0] : 0,
            transition: { duration: 0.3, repeat: Infinity, repeatDelay: 3 }
        },
        high: {
            x: isInView ? [0, -3, 3, -3, 3, -3, 0] : 0,
            y: isInView ? [0, 2, -2, 2, -2, 0] : 0,
            transition: { duration: 0.2, repeat: Infinity, repeatDelay: 2 }
        }
    }

    return (
        <motion.div
            ref={ref}
            className="inline-block"
            animate={glitchVariants[intensity]}
            style={{ willChange: isInView ? 'transform' : 'auto' }}
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

export default memo(GlitchText)
