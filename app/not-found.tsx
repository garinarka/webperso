import Link from 'next/link'
import GlitchText from '@/components/GlitchText'
import NeonButton from '@/components/NeonButton'

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
                    this page doesn't exist. maybe it never did. maybe it's from an alternate dimension.
                    either way, you're lost
                </p>

                {/* ASCII Art */}
                <pre className="font-mono text-brutal-xs text-neon-green/30 mb-8 hidden md:block">
                    {`
    ¯\_(ツ)_/¯
`}
                </pre>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <NeonButton href="/" variant="yellow" size="lg" className="w-full sm:w-auto">
                        GO HOME
                    </NeonButton>
                    <NeonButton href="/" variant="white" size="lg" className="w-full sm:w-auto">
                        VIEW PROJECTS
                    </NeonButton>
                </div>

                {/* Fun fact */}
                <p className="font-mono text-brutal-xs text-punk-white/50 my-12">
                    fun fact: this 404 page has glitch effects. try selecting the text
                </p>
            </div>
        </div>
    )
}
