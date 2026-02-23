'use client'

import { useEffect, useState } from 'react'

export default function VisitCounter() {
    const [visits, setVisits] = useState<number | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        updateCount()

        // Get from localStorage
        const storedCount = localStorage.getItem('visitCount')
        const currentCount = storedCount ? parseInt(storedCount, 10) : 0
        const newCount = currentCount + 1

        setVisits(newCount)
        localStorage.setItem('visitCount', newCount.toString())
    }, [])

    const updateCount = () => {
        const storedCount = localStorage.getItem('visitCount')
        const currentCount = storedCount ? parseInt(storedCount, 10) : 0
        const newCount = currentCount + 1

        setVisits(newCount)
        localStorage.setItem('visitCount', newCount.toString())
    }

    const resetCount = () => {
        localStorage.setItem('visitCount', '0')
        setVisits(1)
    }

    // Don't render until mounted (prevent hydration mismatch)
    if (!mounted || visits === null) {
        return (
            <p className="font-mono text-brutal-xs text-punk-white/30">
                loading visit count...
            </p>
        )
    }

    return (
        <div className="text-center">
            <p className="font-mono text-brutal-xs text-punk-white/30 inline">
                you've visited this site {visits} time{visits !== 1 ? 's' : ''}{' '}
                <button
                    onClick={resetCount}
                    className="text-neon-yellow hover:text-punk-white transition-colors duration-0 ml-2"
                    title="Reset counter"
                >
                    [RESET]
                </button>
            </p>
        </div>
    )
}
