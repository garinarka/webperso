'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import GlitchText from '@/components/GlitchText'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-punk-black text-punk-white flex items-center justify-center px-4">
            <div className="text-center max-w-2xl">

                {/* Error Icon */}
                <div className="text-brutal-7xl mb-8">⚠️</div>

                {/* Title */}
                <GlitchText
                    as="h1"
                    className="text-brutal-5xl md:text-brutal-6xl font-brutal mb-6"
                    intensity="high"
                >
                    SOMETHING BROKE
                </GlitchText>

                {/* Message */}
                <p className="text-brutal-lg font-mono text-punk-white/70 mb-8">
                    the website encountered an error. this is embarrassing
                </p>

                {/* Error Details (Development Only) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mb-8 p-4 bg-punk-gray-100 border-brutal border-neon-red text-left">
                        <p className="font-mono text-brutal-xs text-neon-red break-all">
                            {error.message}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-neon-yellow text-punk-black font-brutal text-brutal-base border-brutal border-punk-black hover:bg-punk-black hover:text-neon-yellow hover:border-neon-yellow"
                    >
                        TRY AGAIN
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-punk-black text-punk-white font-brutal text-brutal-base border-brutal border-punk-white hover:bg-punk-white hover:text-punk-black"
                    >
                        GO HOME
                    </Link>
                </div>

                {/* Support Link */}
                <p className="mt-8 font-mono text-brutal-sm text-punk-white/50">
                    still broken?{' '}
                    <Link href="/contact" className="text-neon-yellow hover:text-punk-white">
                        let me know
                    </Link>
                </p>

            </div>
        </div>
    )
}
