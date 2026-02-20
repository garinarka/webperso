'use client'

import { cn } from '@/lib/utils'

interface NoiseOverlayProps {
    opacity?: number
    className?: string
    disabled?: boolean
}

export default function NoiseOverlay({
    opacity = 0.1,
    className = '',
    disabled = false
}: NoiseOverlayProps) {
    if (disabled) return null

    return (
        <div
            className={cn('noise', className)}
            style={{
                '--noise-opacity': opacity,
                willChange: 'transform',
                transform: 'translateZ(0)'
            } as React.CSSProperties}
        />
    )
}
