import type { Metadata } from 'next'
import GlitchText from '@/components/GlitchText'
import NeonButton from '@/components/NeonButton'
import NoiseOverlay from '@/components/NoiseOverlay'
import ScanLinesOverlay from '@/components/ScanLinesOverlay'
import TerminalBox from '@/components/TerminalBox'
import CustomCursor from '@/components/CustomCursor'
import TerminalTyping, { Command } from '@/components/TerminalTyping'
import TypedText from '@/components/TypedText'
import BrutalCard from '@/components/BrutalCard'

export const metadata: Metadata = {
  title: 'Home | Punk Portfolio',
  description: 'Digital rebellion. Built with Next.js, TypeScript, and raw energy.',
}

const aboutCommands: Command[] = [
  {
    prompt: '$ whoami',
    output: [
      "hola! i'm jagaddhita",
      "my role is full-stack developer(?)",
      "i'm located at YKC",
      "i'm available for projects, btw"
    ],
    color: 'text-neon-yellow'
  },
  {
    prompt: '$ echo $vibe',
    output: [
      "i mix punk aesthetics with serious code",
      "ignore rules that restrict self-expression",
      "no templates, no corporate BS"
    ],
    color: 'text-neon-pink'
  }
]

export default function HomePage() {
  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor color="yellow" />

      <div className="min-h-screen bg-punk-black text-punk-white relative">
        {/* Background Effects */}
        <NoiseOverlay opacity={0.05} />
        <ScanLinesOverlay />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="max-w-6xl mx-auto px-4 text-center relative z-20">

            {/* Main Title */}
            <div className="mb-6">
              <GlitchText
                as="h1"
                className="text-brutal-7xl main-title md:text-[6rem] lg:text-[8rem] font-brutal leading-none mb-6"
                intensity="high"
              >
                JxGxDDHxTx
              </GlitchText>

              <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-brutal-xl md:text-brutal-2xl font-mono">
                <TypedText />
              </div>
            </div>

            {/* Tagline */}
            <p className="text-brutal-lg md:text-brutal-xl font-mono text-punk-white/70 mb-12 max-w-3xl mx-auto">
              breaking conventions. building experiences. no corporate BS.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <NeonButton href="/projects" variant="yellow" size="lg">
                VIEW WORK
              </NeonButton>
              <NeonButton href="/contact" variant="white" size="lg">
                GET IN TOUCH
              </NeonButton>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-6 flex justify-center animate-bounce">
              <div className="w-6 h-10 border-brutal border-punk-white flex items-end justify-center pb-2">
                <div className="w-1 h-3 bg-punk-white animate-pulse"></div>
              </div>
              <p className="font-mono text-brutal-xs mt-2 text-punk-white/50 ml-2">SCROLL</p>
            </div>
          </div>

          {/* ESTD */}
          <div className="fixed bottom-4 right-4 font-mono text-brutal-xs text-neon-green/30 lg:block z-40">
            <div>
              <p>EST. 2026</p>
              <p>BUILT DIFF</p>
            </div>
          </div>
        </section>

        {/* About Section - Terminal Style */}
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 relative z-20">

            <h2 className="text-brutal-5xl font-brutal text-punk mb-8">
              ABOUT.TXT
            </h2>

            <TerminalBox title="BIO.SH" prompt=">>">
              <TerminalTyping
                commands={aboutCommands}
                typingSpeed={30}
                lineDelay={500}
                commandDelay={1000}
              />
            </TerminalBox>

          </div>
        </section>

        {/* What I Do Section */}
        <section id="whatido" className="py-20 relative">
          <NoiseOverlay opacity={0.03} />

          <div className="max-w-6xl mx-auto px-4 relative z-20">

            <h2 className="text-brutal-5xl font-brutal text-punk mb-12 text-center">
              WHAT I DO
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Development */}
              <BrutalCard
                theme="yellow"
                hover="glow"
                icon="⚡"
                title="DEVELOPMENT"
                description="Full-stack web apps with modern tech. React, Next.js, TypeScript, Node.js."
                tags={[
                  'Responsive web applications',
                  'API development',
                  'Performance optimization'
                ]}
              />

              {/* Design */}
              <BrutalCard
                theme="green"
                hover="glow"
                icon="🎨"
                title="DESIGN"
                description="Interfaces that don't look like everyone else's. Bold, functional, memorable."
                tags={[
                  'UI/UX design',
                  'Design systems',
                  'Brutalist aesthetics'
                ]}
              />

              {/* Creative Coding */}
              <BrutalCard
                theme="pink"
                hover="glow"
                icon="✨"
                title="CREATIVE CODE"
                description="Experimental projects, animations, interactive experiences."
                tags={[
                  'Generative art',
                  'WebGL experiments',
                  'Interactive installations'
                ]}
              />
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="techstack" className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 relative z-20">

            <h2 className="text-brutal-5xl font-brutal text-punk mb-12 text-center">
              TECH STACK
            </h2>

            <div className="border-brutal border-punk-white p-8 bg-punk-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {[
                  'NEXT.JS',
                  'REACT',
                  'TYPESCRIPT',
                  'NODE.JS',
                  'TAILWIND',
                  'FRAMER',
                  'GIT',
                  'FIGMA'
                ].map((tech, index) => (
                  <div
                    key={tech}
                    className="border border-punk-white/30 p-4 text-center hover:border-neon-yellow hover:text-neon-yellow transition-colors duration-0"
                  >
                    <p className="font-brutal text-brutal-base">{tech}</p>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-32 relative border-t-brutal border-punk-white">
          <NoiseOverlay opacity={0.08} />

          <div className="max-w-4xl mx-auto px-4 text-center relative z-20">

            <GlitchText
              as="h2"
              className="text-brutal-6xl font-brutal mb-6"
              intensity="medium"
            >
              LET'S BUILD SOMETHING
            </GlitchText>

            <p className="text-brutal-xl font-mono text-punk-white/70 mb-12">
              Got a project? Need a developer who thinks different?<br />
              Let's talk.
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <NeonButton href="/contact" variant="yellow" size="lg">
                START A PROJECT
              </NeonButton>
              <NeonButton href="/projects" variant="white" size="lg">
                SEE MY WORK
              </NeonButton>
            </div>

            {/* Social Links */}
            <div className="mt-16 flex justify-center gap-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-punk-white"
              >
                <span className="text-brutal-4xl">💻</span>
                <p className="font-mono text-brutal-xs mt-2 group-hover:text-neon-green">GITHUB</p>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-punk-white"
              >
                <span className="text-brutal-4xl">💼</span>
                <p className="font-mono text-brutal-xs mt-2 group-hover:text-neon-yellow">LINKEDIN</p>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-punk-white"
              >
                <span className="text-brutal-4xl">🐦</span>
                <p className="font-mono text-brutal-xs mt-2 group-hover:text-neon-pink">TWITTER</p>
              </a>
            </div>

          </div>
        </section>

      </div>
    </>
  )
}
