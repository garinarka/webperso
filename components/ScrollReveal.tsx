'use client'

import { motion } from 'framer-motion'
import { ReactNode, memo } from 'react'

interface ScrollRevealProps {
    children: ReactNode
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    className?: string
}

function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    className = ''
}: ScrollRevealProps) {

    const directionOffset = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 }
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directionOffset[direction]
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.5,
                delay,
                ease: 'easeOut'
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default memo(ScrollReveal)
