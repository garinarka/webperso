import type { Metadata } from 'next'
import GlitchText from '@/components/GlitchText'
import NeonButton from '@/components/NeonButton'
import TerminalBox from '@/components/TerminalBox'
import TerminalTyping, { Command } from '@/components/TerminalTyping'
import TypedText from '@/components/TypedText'
import BrutalCard from '@/components/BrutalCard'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'

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
    <PageTransition>
      <div className="min-h-screen bg-punk-black text-punk-white relative">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="max-w-6xl mx-auto px-4 text-center relative z-20">

            {/* Main Title */}
            <div className="mb-8">
              <GlitchText
                as="h1"
                className="text-brutal-5xl md:text-brutal-6xl lg:text-brutal-7xl font-brutal leading-none mb-4 main-title"
                intensity="high"
              >
                JxGxDDHxTx
              </GlitchText>

              <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-brutal-base md:text-brutal-xl font-mono">
                <TypedText />
              </div>
            </div>

            {/* Tagline */}
            <p className="text-brutal-base md:text-brutal-lg font-mono text-punk-white/70 mb-12 max-w-3xl mx-auto px-4">
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
        </section>

        {/* About Section - Terminal Style */}
        <ScrollReveal>
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
        </ScrollReveal>

        {/* What I Do Section */}
        <ScrollReveal delay={0.2}>
          <section id="whatido" className="py-20 relative">
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
        </ScrollReveal>

        {/* Tech Stack Section */}
        <ScrollReveal delay={0.2}>
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
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal delay={0.2}>
          <section id="cta" className="py-32 relative border-t-brutal border-punk-white">
            <div className="max-w-4xl mx-auto px-4 text-center relative z-20">
              <GlitchText
                as="h2"
                className="text-brutal-6xl font-brutal mb-6"
                intensity="medium"
              >
                LET'S BUILD SOMETHING
              </GlitchText>

              <p className="text-brutal-xl font-mono text-punk-white/70 mb-12">
                got a project? need a developer who thinks different?<br />
                let's talk
              </p>

              <div className="flex flex-wrap gap-6 justify-center">
                <NeonButton href="/contact" variant="yellow" size="lg">
                  START A PROJECT
                </NeonButton>
                <NeonButton href="/projects" variant="white" size="lg">
                  SEE MY WORK
                </NeonButton>
              </div>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </PageTransition>
  )
}
