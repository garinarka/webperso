import type { Metadata } from 'next'
import GlitchText from '@/components/GlitchText'
import TerminalBox from '@/components/TerminalBox'
import BrutalCard from '@/components/BrutalCard'
import TerminalTyping, { Command } from '@/components/TerminalTyping'
import NeonButton from '@/components/NeonButton'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
    title: 'About | Punk Portfolio',
    description: 'Learn about me, my journey, and what makes me tick.',
}

const aboutCommands: Command[] = [
    {
        prompt: '## FRONTEND',
        output: [
            "• Next.js / React - component architecture, hooks, SSR",
            "• TypeScript - type safety, better DX",
            "• Tailwind CSS - utility-first styling",
            "• Framer Motion - smooth animations"
        ],
        color: 'text-neon-yellow'
    },
    {
        prompt: '## BACKEND',
        output: [
            "• Node.js / Express - API development",
            "• MongoDB / PostgreSQL - databases",
            "• REST APIs - building & consuming"
        ],
        color: 'text-neon-pink'
    }
]

export default function AboutPage() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-punk-black text-punk-white relative">
                <div className="max-w-5xl mx-auto px-4 py-20 relative z-20">
                    {/* Hero Section */}
                    <section className="mb-20 text-center">
                        <GlitchText
                            as="h1"
                            className="text-brutal-5xl md:text-brutal-6xl lg:text-brutal-7xl font-brutal mb-6"
                            intensity="medium"
                        >
                            ABOUT ME
                        </GlitchText>
                        <p className="text-brutal-base md:text-brutal-lg font-mono text-punk-white/70 max-w-3xl mx-auto px-4">
                            who i am, what i do, and why i build the way i build
                        </p>
                    </section>

                    {/* Profile Section */}
                    <section className="mb-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                            {/* Photo/Avatar Placeholder */}
                            <div className="md:col-span-1">
                                <div className="border-brutal border-neon-yellow bg-punk-gray-100 aspect-square flex items-center justify-center max-w-sm mx-auto md:max-w-none">
                                    <span className="text-brutal-6xl">👤</span>
                                </div>
                                <p className="font-mono text-brutal-xs text-center mt-4 text-punk-white/50">
                                    [PHOTO.JPG]
                                </p>
                            </div>

                            {/* Bio */}
                            <div className="md:col-span-2">
                                <h2 className="text-brutal-2xl md:text-brutal-3xl font-brutal text-neon-yellow mb-6">
                                    HOLA! I'M JAGADDHITA JALU
                                </h2>

                                <div className="space-y-4 font-mono text-brutal-sm md:text-brutal-base text-punk-white/80">
                                    <p>
                                        (i think) i'm a developer who believes good design doesn't have to be boring.
                                        i build websites and digital experiences that stand out from the cookie-cutter templates
                                    </p>
                                    <p>
                                        currently based in <span className="text-neon-green">YOGYAKARTA, ID</span>,
                                        working on projects that blend punk aesthetics with clean, functional code
                                    </p>
                                    <p>
                                        when i'm not coding, you'll find me <span className="text-neon-pink">BECAME PUNK.... or maybe fall asleep xD</span>
                                    </p>
                                </div>

                                {/* Quick Stats */}
                                <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4">
                                    <div className="border border-punk-white/30 p-3 md:p-4">
                                        <p className="text-brutal-2xl md:text-brutal-3xl font-brutal text-neon-yellow">2+</p>
                                        <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">years coding</p>
                                    </div>
                                    <div className="border border-punk-white/30 p-3 md:p-4">
                                        <p className="text-brutal-2xl md:text-brutal-3xl font-brutal text-neon-green">10+</p>
                                        <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">projects built</p>
                                    </div>
                                    <div className="border border-punk-white/30 p-3 md:p-4">
                                        <p className="text-brutal-2xl md:text-brutal-3xl font-brutal text-neon-pink">∞</p>
                                        <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">coffee consumed</p>
                                    </div>
                                    <div className="border border-punk-white/30 p-3 md:p-4">
                                        <p className="text-brutal-2xl md:text-brutal-3xl font-brutal text-punk-white">100%</p>
                                        <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">punk spirit</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Journey/Timeline Section */}
                    <ScrollReveal>
                        <section className="mb-20">
                            <h2 className="text-brutal-3xl md:text-brutal-4xl font-brutal text-punk mb-12 text-center">
                                MY JOURNEY
                            </h2>

                            <div className="space-y-6 md:space-y-8">

                                {/* Timeline Item 1 */}
                                <div className="border-l-brutal border-neon-yellow pl-6 md:pl-8 relative">
                                    <div className="absolute left-0 top-0 w-3 h-3 md:w-4 md:h-4 bg-neon-yellow -translate-x-[7px] md:-translate-x-[10px]"></div>
                                    <div className="mb-2">
                                        <span className="font-mono text-brutal-xs md:text-brutal-sm text-neon-yellow">2022</span>
                                    </div>
                                    <h3 className="text-brutal-xl md:text-brutal-2xl font-brutal mb-2">started coding journey</h3>
                                    <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">
                                        fell in love with web development. started with HTML, CSS, JavaScript basics.
                                        built my first terrible website (we all start somewhere)
                                    </p>
                                </div>

                                {/* Timeline Item 2 */}
                                <div className="border-l-brutal border-neon-green pl-6 md:pl-8 relative">
                                    <div className="absolute left-0 top-0 w-3 h-3 md:w-4 md:h-4 bg-neon-green -translate-x-[7px] md:-translate-x-[10px]"></div>
                                    <div className="mb-2">
                                        <span className="font-mono text-brutal-xs md:text-brutal-sm text-neon-green">2023</span>
                                    </div>
                                    <h3 className="text-brutal-xl md:text-brutal-2xl font-brutal mb-2">discovered React & Next.js</h3>
                                    <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">
                                        leveled up to modern frameworks. started building actual projects.
                                        learned TypeScript because type safety is punk rock
                                    </p>
                                </div>

                                {/* Timeline Item 3 */}
                                <div className="border-l-brutal border-neon-pink pl-6 md:pl-8 relative">
                                    <div className="absolute left-0 top-0 w-3 h-3 md:w-4 md:h-4 bg-neon-pink -translate-x-[7px] md:-translate-x-[10px]"></div>
                                    <div className="mb-2">
                                        <span className="font-mono text-brutal-xs md:text-brutal-sm text-neon-pink">2024</span>
                                    </div>
                                    <h3 className="text-brutal-xl md:text-brutal-2xl font-brutal mb-2">found my style</h3>
                                    <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">
                                        realized i don't have to follow boring design trends.
                                        started experimenting with brutalism and punk aesthetics
                                    </p>
                                </div>

                                {/* Timeline Item 4 */}
                                <div className="border-l-brutal border-punk-white pl-6 md:pl-8 relative">
                                    <div className="absolute left-0 top-0 w-3 h-3 md:w-4 md:h-4 bg-punk-white -translate-x-[7px] md:-translate-x-[10px]"></div>
                                    <div className="mb-2">
                                        <span className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white">2025-NOW</span>
                                    </div>
                                    <h3 className="text-brutal-xl md:text-brutal-2xl font-brutal mb-2">building different</h3>
                                    <p className="font-mono text-brutal-xs md:text-brutal-sm text-punk-white/70">
                                        creating projects that stand out. helping others build cool stuff.
                                        this website is proof of concept
                                    </p>
                                </div>

                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Skills Section - Terminal Style */}
                    <ScrollReveal delay={0.2}>
                        <section className="mb-20">
                            <h2 className="text-brutal-3xl md:text-brutal-4xl font-brutal text-punk mb-12 text-center">
                                TECH STACK
                            </h2>

                            <TerminalBox title="SKILLS.SH" prompt="$">
                                <TerminalTyping
                                    commands={aboutCommands}
                                    typingSpeed={30}
                                    lineDelay={500}
                                    commandDelay={1000}
                                />
                            </TerminalBox>
                        </section>
                    </ScrollReveal>

                    {/* Values/Principles Section */}
                    <ScrollReveal delay={0.2}>
                        <section className="mb-20">
                            <h2 className="text-brutal-3xl md:text-brutal-4xl font-brutal text-punk mb-12 text-center">
                                WHAT I BELIEVE
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <BrutalCard
                                    theme="yellow"
                                    hover="lift"
                                    title="DESIGN WITH PURPOSE"
                                    description="every design choice should have a reason. break rules intentionally, not randomly. form follows function, but function can be fun"
                                />

                                <BrutalCard
                                    theme="green"
                                    hover="lift"
                                    title="CODE QUALITY MATTERS"
                                    description="clean code isn't boring - it's respectful. write code like someone (including future you) will read it. type safety saves lives"
                                />

                                <BrutalCard
                                    theme="pink"
                                    hover="lift"
                                    title="NO CORPORATE BS"
                                    description="be honest. be real. don't pretend to be a massive agency when you're one person. authenticity > fake professionalism"
                                />

                                <BrutalCard
                                    theme="white"
                                    hover="lift"
                                    title="ALWAYS LEARNING"
                                    description="tech moves fast. stay curious. experiment with new tools. share knowledge. we're all figuring this out together"
                                />
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Fun Facts / Personality */}
                    <ScrollReveal delay={0.2}>
                        <section className="mb-20">
                            <h2 className="text-brutal-3xl md:text-brutal-4xl font-brutal text-punk mb-12 text-center">
                                RANDOM FACTS
                            </h2>

                            <div className="border-brutal border-punk-white bg-punk-gray-100 p-6 md:p-8">
                                <ul className="space-y-3 md:space-y-4 font-mono text-brutal-sm md:text-brutal-base">
                                    <li className="flex gap-3">
                                        <span className="text-neon-yellow flex-shrink-0">→</span>
                                        <span>favorite editor theme: dark mode, always. light mode is a crime</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-neon-green flex-shrink-0">→</span>
                                        <span>music while coding: PUNK, GRUNGE, ROCK and METAL keeps the flow going</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-neon-yellow flex-shrink-0">→</span>
                                        <span>(non)coffee order: red velvet, matcha or nothing</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-neon-green flex-shrink-0">→</span>
                                        <span>late night coder: best code happens after midnight</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Contact Info */}
                    <ScrollReveal delay={0.2}>
                        <section className="mb-20">
                            <h2 className="text-brutal-3xl md:text-brutal-4xl font-brutal text-punk mb-8 text-center">
                                REACH ME
                            </h2>
                            <div className="text-center font-mono">
                                <p className="text-brutal-base md:text-brutal-lg mb-2">
                                    <span className="text-neon-yellow">📧</span> jagaddhitajalu@gmail.com
                                </p>
                                <p className="text-brutal-base md:text-brutal-lg">
                                    <span className="text-neon-green">📍</span> YOGYAKARTA, INDONESIA
                                </p>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* CTA Section */}
                    <ScrollReveal delay={0.2}>
                        <section className="text-center border-brutal border-neon-yellow p-8 md:p-12 bg-punk-gray-100">
                            <h2 className="text-brutal-3xl md:text-brutal-4xl font-brutal mb-6">
                                WANT TO WORK TOGETHER?
                            </h2>
                            <p className="font-mono text-brutal-sm md:text-brutal-lg text-punk-white/70 mb-8 max-w-2xl mx-auto px-4">
                                i'm always open to interesting projects and collaborations.
                                let's build something different.
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">

                                <NeonButton href="/contact" variant="yellow" size="lg">
                                    GET IN TOUCH
                                </NeonButton>
                                <NeonButton href="/projects" variant="white" size="lg">
                                    VIEW PROJECT
                                </NeonButton>
                            </div>
                        </section>
                    </ScrollReveal>
                </div >
            </div >
        </PageTransition>
    )
}
