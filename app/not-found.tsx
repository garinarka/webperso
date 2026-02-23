import Link from 'next/link'
import GlitchText from '@/components/GlitchText'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-punk-black text-punk-white relative flex items-center justify-center">

            <div className="text-center relative z-20 px-4">
                {/* 404 Number */}
                <GlitchText
                    as="h1"
                    className="text-[12rem] md:text-[16rem] font-brutal leading-none mb-8"
                    intensity="high"
                >
                    404
                </GlitchText>

                {/* Message */}
                <h2 className="text-brutal-4xl font-brutal text-neon-yellow mb-4">
                    PAGE NOT FOUND
                </h2>

                <p className="font-mono text-brutal-lg text-punk-white/70 mb-8 max-w-lg mx-auto">
                    This page doesn't exist. Maybe it never did. Maybe it's from an alternate dimension.
                    Either way, you're lost.
                </p>

                {/* ASCII Art */}
                <pre className="font-mono text-brutal-xs text-neon-green/30 mb-8 hidden md:block">
                    {`
    ¯\_(ツ)_/¯
`}
                </pre>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-neon-yellow text-punk-black font-brutal text-brutal-base border-brutal border-punk-black hover:bg-punk-black hover:text-neon-yellow hover:border-neon-yellow transition-colors duration-0"
                    >
                        GO HOME
                    </Link>
                    <Link
                        href="/projects"
                        className="px-6 py-3 bg-punk-black text-punk-white font-brutal text-brutal-base border-brutal border-punk-white hover:bg-punk-white hover:text-punk-black transition-colors duration-0"
                    >
                        VIEW PROJECTS
                    </Link>
                </div>

                {/* Fun fact */}
                <p className="font-mono text-brutal-xs text-punk-white/50 my-12">
                    Fun fact: This 404 page has glitch effects. Try selecting the text.
                </p>
            </div>
        </div>
    )
}
