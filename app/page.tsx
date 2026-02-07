import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | Punk Portfolio',
  description: 'Brutalist personal website',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-punk-black text-punk-white noise scan-lines">
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-20">

        {/* Quick Test */}
        <div className="mb-12 p-8 bg-neon-yellow text-punk-black border-brutal">
          <h1 className="text-brutal-4xl font-brutal text-punk">
            ✅ CONFIG TEST
          </h1>
          <p className="font-mono mt-2">
            Kalau ini kuning dengan border tebal = SUCCESS!
          </p>
        </div>

        {/* Typography Size Test */}
        <section className="mb-16">
          <h2 className="text-brutal-3xl font-brutal text-punk mb-4">
            TYPOGRAPHY SIZES
          </h2>
          <div className="space-y-2">
            <p className="text-brutal-xs font-brutal">Brutal XS - 0.75rem</p>
            <p className="text-brutal-sm font-brutal">Brutal SM - 0.875rem</p>
            <p className="text-brutal-base font-brutal">Brutal BASE - 1rem</p>
            <p className="text-brutal-lg font-brutal">Brutal LG - 1.125rem</p>
            <p className="text-brutal-xl font-brutal">Brutal XL - 1.25rem</p>
            <p className="text-brutal-2xl font-brutal">Brutal 2XL - 1.5rem</p>
            <p className="text-brutal-3xl font-brutal">Brutal 3XL - 1.875rem</p>
            <p className="text-brutal-4xl font-brutal">Brutal 4XL - 2.25rem</p>
            <p className="text-brutal-5xl font-brutal">Brutal 5XL - 3rem</p>
            <p className="text-brutal-6xl font-brutal">Brutal 6XL - 3.75rem</p>
          </div>
        </section>

        {/* Color Test */}
        <section className="mb-16">
          <h2 className="text-brutal-3xl font-brutal text-punk mb-4">
            NEON COLORS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="h-24 bg-neon-yellow border-brutal border-punk-black flex items-center justify-center text-punk-black font-bold">
              YELLOW
            </div>
            <div className="h-24 bg-neon-green border-brutal border-punk-black flex items-center justify-center text-punk-black font-bold">
              GREEN
            </div>
            <div className="h-24 bg-neon-pink border-brutal border-punk-black flex items-center justify-center text-punk-black font-bold">
              PINK
            </div>
            <div className="h-24 bg-neon-red border-brutal border-punk-black flex items-center justify-center text-punk-white font-bold">
              RED
            </div>
            <div className="h-24 bg-punk-white border-brutal border-punk-black flex items-center justify-center text-punk-black font-bold">
              WHITE
            </div>
          </div>
        </section>

        {/* Border Test */}
        <section className="mb-16">
          <h2 className="text-brutal-3xl font-brutal text-punk mb-4">
            BRUTAL BORDERS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 border-brutal border-punk-white">
              <p className="font-mono">3px border</p>
            </div>
            <div className="p-6 border-brutal-thick border-neon-yellow">
              <p className="font-mono">6px border</p>
            </div>
            <div className="p-6 border-brutal border-neon-green bg-punk-gray-100">
              <p className="font-mono">With background</p>
            </div>
          </div>
        </section>

        {/* Neon Glow Test */}
        <section className="mb-16">
          <h2 className="text-brutal-3xl font-brutal text-punk mb-4">
            NEON GLOW
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-punk-black border-brutal border-neon-yellow shadow-neon-yellow">
              <p className="font-mono text-neon-yellow">Yellow glow</p>
            </div>
            <div className="p-6 bg-punk-black border-brutal border-neon-green shadow-neon-green">
              <p className="font-mono text-neon-green">Green glow</p>
            </div>
            <div className="p-6 bg-punk-black border-brutal border-neon-pink shadow-neon-pink">
              <p className="font-mono text-neon-pink">Pink glow</p>
            </div>
          </div>
        </section>

        {/* Animation Test */}
        <section className="mb-16">
          <h2 className="text-brutal-3xl font-brutal text-punk mb-4">
            ANIMATIONS
          </h2>
          <div className="space-y-4">
            <div className="p-4 border-brutal border-punk-white animate-glitch">
              <p className="font-mono">Glitch animation (auto)</p>
            </div>
            <div className="p-4 border-brutal border-punk-white hover:animate-shake cursor-pointer">
              <p className="font-mono">Shake animation (HOVER ME!)</p>
            </div>
            <div className="p-4 border-brutal border-neon-yellow">
              <p className="font-mono animate-flicker text-neon-yellow">
                Flicker text (auto)
              </p>
            </div>
          </div>
        </section>

        {/* Glitch Text - MULTIPLE SIZES */}
        <section className="mb-16">
          <h2 className="text-brutal-3xl font-brutal text-punk mb-4">
            GLITCH TEXT (Different Sizes)
          </h2>

          <div className="space-y-12">
            {/* 7XL */}
            <div>
              <p className="text-brutal-7xl glitch-text font-brutal" data-text="HUGE">
                HUGE
              </p>
              <span className="text-sm text-punk-white/50 font-mono">7xl - 4.5rem</span>
            </div>

            {/* 6XL */}
            <div>
              <p className="text-brutal-6xl glitch-text font-brutal" data-text="LARGE">
                LARGE
              </p>
              <span className="text-sm text-punk-white/50 font-mono">6xl - 3.75rem</span>
            </div>

            {/* 5XL */}
            <div>
              <p className="text-brutal-5xl glitch-text font-brutal" data-text="CORRUPTED">
                CORRUPTED
              </p>
              <span className="text-sm text-punk-white/50 font-mono">5xl - 3rem</span>
            </div>

            {/* 4XL with color */}
            <div>
              <p className="text-brutal-4xl glitch-text font-brutal text-neon-yellow" data-text="ERROR 404">
                ERROR 404
              </p>
              <span className="text-sm text-punk-white/50 font-mono">4xl - 2.25rem (with yellow color)</span>
            </div>

            {/* 3XL */}
            <div>
              <p className="text-brutal-3xl glitch-text font-mono" data-text="SYSTEM FAILURE">
                SYSTEM FAILURE
              </p>
              <span className="text-sm text-punk-white/50 font-mono">3xl - 1.875rem (mono font)</span>
            </div>

            {/* 2XL with color */}
            <div>
              <p className="text-brutal-2xl glitch-text font-brutal text-neon-pink" data-text="ACCESS DENIED">
                ACCESS DENIED
              </p>
              <span className="text-sm text-punk-white/50 font-mono">2xl - 1.5rem (pink color)</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
