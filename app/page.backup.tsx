import type { Metadata } from 'next'
import GlitchText from '@/components/GlitchText'
import NeonButton from '@/components/NeonButton'
import TerminalBox from '@/components/TerminalBox'
import BrutalCard from '@/components/BrutalCard'
import NoiseOverlay from '@/components/NoiseOverlay'
import ScanLinesOverlay from '@/components/ScanLinesOverlay'
import CustomCursor from '@/components/CustomCursor'
import InteractiveDemo from '@/components/InteractiveDemo'

export const metadata: Metadata = {
  title: 'Component Showcase | Punk Portfolio',
  description: 'Brutalist component library',
}

export default function HomePage() {
  return (
    <>
      {/* Custom Cursor - OPTIONAL, comment out kalau tidak suka */}
      <CustomCursor color="yellow" />

      <div className="min-h-screen bg-punk-black text-punk-white relative">
        {/* Background Effects */}
        <NoiseOverlay />
        <ScanLinesOverlay />

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-20">

          {/* Hero */}
          <section className="mb-20 text-center">
            <GlitchText
              as="h1"
              className="text-brutal-7xl font-brutal mb-4"
              intensity="high"
            >
              PUNK COMPONENTS
            </GlitchText>
            <p className="text-brutal-lg font-mono text-punk-white/70">
              Brutalist React Components • Built with Next.js & Framer Motion
            </p>
          </section>

          {/* Buttons Section */}
          <section className="mb-20">
            <h2 className="text-brutal-4xl font-brutal text-punk mb-8">
              NEON BUTTONS
            </h2>

            <div className="space-y-6">
              {/* Sizes */}
              <div>
                <p className="font-mono text-brutal-sm mb-4 text-punk-white/50">
                  SIZE COMPARISON (hover to see better):
                </p>
                <div className="flex items-end gap-4">
                  <div className="text-center">
                    <NeonButton size="sm" variant="yellow">SM</NeonButton>
                    <p className="text-xs mt-2 font-mono text-punk-white/30">0.5rem / 0.875rem</p>
                  </div>
                  <div className="text-center">
                    <NeonButton size="md" variant="green">MD</NeonButton>
                    <p className="text-xs mt-2 font-mono text-punk-white/30">0.75rem / 1rem</p>
                  </div>
                  <div className="text-center">
                    <NeonButton size="lg" variant="pink">LG</NeonButton>
                    <p className="text-xs mt-2 font-mono text-punk-white/30">1rem / 1.125rem</p>
                  </div>
                </div>
              </div>

              {/* Variants */}
              <div>
                <p className="font-mono text-brutal-sm mb-4 text-punk-white/50">COLORS:</p>
                <div className="flex flex-wrap gap-4">
                  <NeonButton variant="yellow">YELLOW</NeonButton>
                  <NeonButton variant="green">GREEN</NeonButton>
                  <NeonButton variant="pink">PINK</NeonButton>
                  <NeonButton variant="red">RED</NeonButton>
                  <NeonButton variant="white">WHITE</NeonButton>
                </div>
              </div>

              {/* States */}
              <InteractiveDemo />
            </div>
          </section>

          {/* Cards Section */}
          <section className="mb-20">
            <h2 className="text-brutal-4xl font-brutal text-punk mb-8">
              BRUTAL CARDS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Lift hover */}
              <BrutalCard
                title="LIFT EFFECT"
                subtitle="Hover me"
                borderColor="yellow"
                hover="lift"
                tags={['HOVER', 'LIFT']}
              >
                <p className="text-punk-white/70 font-mono text-brutal-sm">
                  Card lifts up on hover. Clean and simple.
                </p>
              </BrutalCard>

              {/* Glow hover */}
              <BrutalCard
                title="GLOW EFFECT"
                subtitle="Hover me"
                borderColor="green"
                hover="glow"
                tags={['HOVER', 'GLOW']}
              >
                <p className="text-punk-white/70 font-mono text-brutal-sm">
                  Neon glow appears on hover. Cyberpunk vibes.
                </p>
              </BrutalCard>

              {/* Glitch hover */}
              <BrutalCard
                title="GLITCH EFFECT"
                subtitle="Hover me"
                borderColor="pink"
                hover="glitch"
                tags={['HOVER', 'GLITCH']}
              >
                <p className="text-punk-white/70 font-mono text-brutal-sm">
                  Glitches when hovered. Chaotic energy.
                </p>
              </BrutalCard>
            </div>
          </section>

          {/* Terminal Box Section */}
          <section className="mb-20">
            <h2 className="text-brutal-4xl font-brutal text-punk mb-8">
              TERMINAL BOX
            </h2>

            <TerminalBox title="SYSTEM.LOG" prompt="$">
              <div className="space-y-2">
                <p>Initializing punk protocol...</p>
                <p className="text-neon-yellow">WARNING: Maximum brutalism detected</p>
                <p>Loading components... [OK]</p>
                <p>System ready.</p>
                <p className="cursor-blink inline-block">_</p>
              </div>
            </TerminalBox>
          </section>

          {/* Glitch Text Section */}
          <section className="mb-20">
            <h2 className="text-brutal-4xl font-brutal text-punk mb-8">
              GLITCH TEXT
            </h2>

            <div className="space-y-8">
              <div>
                <p className="font-mono text-brutal-sm mb-4 text-punk-white/50">LOW INTENSITY:</p>
                <GlitchText
                  as="h3"
                  className="text-brutal-4xl font-brutal"
                  intensity="low"
                >
                  SUBTLE GLITCH
                </GlitchText>
              </div>

              <div>
                <p className="font-mono text-brutal-sm mb-4 text-punk-white/50">MEDIUM INTENSITY:</p>
                <GlitchText
                  as="h3"
                  className="text-brutal-4xl font-brutal text-neon-green"
                  intensity="medium"
                >
                  MODERATE CHAOS
                </GlitchText>
              </div>

              <div>
                <p className="font-mono text-brutal-sm mb-4 text-punk-white/50">HIGH INTENSITY:</p>
                <GlitchText
                  as="h3"
                  className="text-brutal-4xl font-brutal text-neon-pink"
                  intensity="high"
                >
                  MAXIMUM GLITCH
                </GlitchText>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-20 border-brutal border-neon-yellow">
            <GlitchText
              as="h2"
              className="text-brutal-5xl font-brutal mb-6"
              intensity="medium"
            >
              READY TO BUILD?
            </GlitchText>
            <p className="text-brutal-lg font-mono mb-8 text-punk-white/70">
              All components are reusable, customizable, and BRUTAL.
            </p>
            <div className="flex gap-4 justify-center">
              <NeonButton variant="yellow" size="lg">
                LET'S GO
              </NeonButton>
              <NeonButton variant="white" size="lg">
                DOCS
              </NeonButton>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
