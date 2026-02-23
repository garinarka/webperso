'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TerminalBoxProps {
    children: ReactNode
    title?: string
    prompt?: string
    className?: string
    showScanLines?: boolean
}

export default function TerminalBox({
    children,
    title = 'TERMINAL',
    prompt = '>',
    className = '',
    showScanLines = true
}: TerminalBoxProps) {
    return (
        <div className={cn(
            'bg-punk-black border-brutal border-neon-green',
            showScanLines && 'scan-lines',
            className
        )}>
            {/* Terminal Header */}
            <div className="bg-neon-green text-punk-black px-4 py-2 font-mono font-bold flex items-center justify-between">
                <span>{title}</span>
                <div className="flex gap-2">
                    <span className="w-3 h-3 bg-punk-black"></span>
                    <span className="w-3 h-3 bg-punk-black"></span>
                    <span className="w-3 h-3 bg-punk-black"></span>
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-neon-green">
                <div className="flex items-start gap-2">
                    <span className="text-punk-white select-none">{prompt}</span>
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
