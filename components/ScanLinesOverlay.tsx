'use client'

import { cn } from '@/lib/utils'

interface ScanLinesOverlayProps {
    opacity?: number
    speed?: 'slow' | 'normal' | 'fast'
    className?: string
}

export default function ScanLinesOverlay({
    opacity = 0.03,
    speed = 'normal',
    className = ''
}: ScanLinesOverlayProps) {

    const speedClasses = {
        slow: 'animate-scan-slow',
        normal: 'animate-scan',
        fast: 'animate-scan-fast'
    }

    return (
        <div className={cn('scan-lines', className)}>
            {/* Optional: Moving scan line */}
            <div
                className={cn(
                    'absolute left-0 w-full h-[2px] bg-neon-green/30',
                    speedClasses[speed]
                )}
                style={{ opacity }}
            />
        </div>
    )
}
