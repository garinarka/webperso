'use client'

import { cn } from '@/lib/utils'

interface NoiseOverlayProps {
    opacity?: number
    className?: string
}

export default function NoiseOverlay({
    opacity = 0.03,
    className = ''
}: NoiseOverlayProps) {
    return (
        <div
            className={cn('noise', className)}
            style={{
                '--noise-opacity': opacity
            } as React.CSSProperties}
        />
    )
}
