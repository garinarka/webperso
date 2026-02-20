'use client'

import { cn } from '@/lib/utils'

interface ScanLinesOverlayProps {
    opacity?: number
    speed?: 'slow' | 'normal' | 'fast'
    className?: string
    disabled?: boolean
}

export default function ScanLinesOverlay({
    opacity = 0.03,
    speed = 'normal',
    className = '',
    disabled = false
}: ScanLinesOverlayProps) {
    if (disabled) return null

    const speedClasses = {
        slow: 'animate-scan-slow',
        normal: 'animate-scan',
        fast: 'animate-scan-fast'
    }

    return (
        <div
            className={cn('scan-lines', className)}
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        >
            {/* Moving scan line - reduced opacity for performance */}
            <div
                className={cn(
                    'absolute left-0 w-full h-[2px] bg-neon-green/20',
                    speedClasses[speed]
                )}
                style={{
                    opacity: opacity,
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                }}
            />
        </div>
    )
}
