export default function Loading() {
    return (
        <div className="min-h-screen bg-punk-black flex items-center justify-center">
            <div className="text-center">
                {/* ASCII Loader */}
                <pre className="font-mono text-neon-yellow text-brutal-base mb-4 animate-pulse">
                    {`
╔═══════════════╗
║   LOADING...  ║
╚═══════════════╝
`}
                </pre>

                {/* Glitch Loading Text */}
                <div className="font-brutal text-brutal-2xl text-punk-white glitch-text" data-text="LOADING">
                    LOADING
                </div>

                {/* Progress Bar */}
                <div className="mt-8 w-64 mx-auto">
                    <div className="h-2 bg-punk-white/20 border-brutal border-punk-white overflow-hidden">
                        <div className="h-full bg-neon-yellow animate-pulse" style={{ width: '60%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
