import type { Metadata } from 'next'
import GlitchText from '@/components/GlitchText'
import TerminalBox from '@/components/TerminalBox'
import ContactForm from '@/components/ContactForm'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'
import NeonButton from '@/components/NeonButton'
import BrutalCard from '@/components/BrutalCard'

export const metadata: Metadata = {
    title: 'CONTACT',
    description: 'get in touch. let\'s build something different together',
}

export default function ContactPage() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-punk-black text-punk-white relative">
                <div className="max-w-5xl mx-auto px-4 py-20 relative z-20">
                    {/* Hero */}
                    <section className="mb-16 text-center">
                        <GlitchText
                            as="h1"
                            className="text-brutal-5xl md:text-brutal-6xl lg:text-brutal-7xl font-brutal mb-6"
                            intensity="medium"
                        >
                            GET IN TOUCH
                        </GlitchText>
                        <p className="text-brutal-base md:text-brutal-lg font-mono text-punk-white/70 max-w-2xl mx-auto px-4">
                            got a project? question? just want to say hi?
                            <br className="hidden md:block" />
                            drop me a message. i actually read and respond to all of them
                        </p>
                    </section>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">

                        {/* Contact Form - Takes 2 columns */}
                        <div className="lg:col-span-2">
                            <TerminalBox title="SEND_MESSAGE.SH" prompt="">
                                <ContactForm />
                            </TerminalBox>
                        </div>

                        {/* Contact Info Sidebar - 1 column */}
                        <div className="space-y-6">

                            {/* Contact Methods */}
                            <div className="border-brutal border-neon-green p-6 bg-punk-gray-100">
                                <h2 className="text-brutal-2xl font-brutal text-neon-green mb-6">
                                    CONTACT INFO
                                </h2>

                                <div className="space-y-4 font-mono text-brutal-sm">

                                    {/* Email */}
                                    <div>
                                        <p className="text-punk-white/50 mb-1">EMAIL</p>
                                        <a
                                            href="mailto:jagaddhitajalu@gmail.com"
                                            className="text-neon-green hover:text-punk-white transition-colors duration-0"
                                        >
                                            jagaddhitajalu@gmail.com
                                        </a>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <p className="text-punk-white/50 mb-1">LOCATION</p>
                                        <p className="text-punk-white">
                                            Yogyakarta, ID
                                        </p>
                                    </div>

                                    {/* Timezone */}
                                    <div>
                                        <p className="text-punk-white/50 mb-1">TIMEZONE</p>
                                        <p className="text-punk-white">
                                            UTC+7 (Jakarta)
                                        </p>
                                    </div>

                                    {/* Response Time */}
                                    <div>
                                        <p className="text-punk-white/50 mb-1">RESPONSE TIME</p>
                                        <p className="text-punk-white">
                                            usually within 24-48 hours
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="border-brutal border-neon-yellow p-6 bg-punk-gray-100">
                                <h2 className="text-brutal-2xl font-brutal text-neon-yellow mb-6">
                                    SOCIAL
                                </h2>

                                <div className="space-y-3">

                                    <a href="https://github.com/garinarka"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 font-mono text-brutal-sm text-punk-white hover:text-neon-green transition-colors duration-0"
                                    >
                                        <span className="text-brutal-2xl">💻</span>
                                        <span>GitHub</span>
                                    </a>


                                    <a href="https://linkedin.com/in/jalugar"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 font-mono text-brutal-sm text-punk-white hover:text-neon-yellow transition-colors duration-0"
                                    >
                                        <span className="text-brutal-2xl">💼</span>
                                        <span>LinkedIn</span>
                                    </a>


                                    <a href="https://twitter.com/jjgarinarka"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 font-mono text-brutal-sm text-punk-white hover:text-neon-pink transition-colors duration-0"
                                    >
                                        <span className="text-brutal-2xl">🐦</span>
                                        <span>Twitter</span>
                                    </a>


                                    {/* <a href="https://instagram.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 font-mono text-brutal-sm text-punk-white hover:text-neon-pink transition-colors duration-0"
                                    >
                                        <span className="text-brutal-2xl">📷</span>
                                        <span>Instagram</span>
                                    </a> */}
                                </div>
                            </div>

                            {/* Availability Status */}
                            <div className="border-brutal border-neon-pink p-6 bg-punk-gray-100">
                                <h2 className="text-brutal-2xl font-brutal text-neon-pink mb-4">
                                    AVAILABILITY
                                </h2>
                                <div className="flex items-start gap-3">
                                    <div className="w-3 h-3 bg-neon-green rounded-full mt-1 animate-pulse"></div>
                                    <div className="font-mono text-brutal-sm">
                                        <p className="text-punk-white mb-2">
                                            OPEN FOR PROJECTS
                                        </p>
                                        <p className="text-punk-white/70 text-brutal-xs">
                                            currently accepting freelance work and collaborations
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* FAQ Section */}
                    <ScrollReveal>
                        <section className="mb-20">
                            <h2 className="text-brutal-3xl md:text-brutal-4xl font-brutal text-punk mb-8 text-center">
                                FREQUENTLY ASKED
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                                {/* FAQ Item 1 */}
                                <BrutalCard
                                    theme="yellow"
                                    hover="lift"
                                    title="what's your rate?"
                                    description="depends on the project scope. send me details and i'll get back with a quote. i prefer fixed-price for defined projects"
                                />

                                {/* FAQ Item 2 */}
                                <BrutalCard
                                    theme="green"
                                    hover="lift"
                                    title="how long does a project take?"
                                    description="simple landing page: 1-2 weeks. full website: 4-8 weeks. complex web app: 2-3 months. timeline varies by scope"
                                />

                                {/* FAQ Item 3 */}
                                <BrutalCard
                                    theme="pink"
                                    hover="lift"
                                    title="do you maintenance?"
                                    description="yes! i offer ongoing support and maintenance packages. or i can train your team to manage it themselves"
                                />

                                {/* FAQ Item 4 */}
                                <BrutalCard
                                    theme="white"
                                    hover="lift"
                                    title="what if i just have a question?"
                                    description="ask away! i'm happy to help with quick questions or advice. no commitment needed"
                                />

                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Alternative Contact Methods */}
                    <ScrollReveal delay={0.2}>
                        <section className="text-center border-brutal border-punk-white p-8 md:p-12 bg-punk-gray-100">
                            <h2 className="text-brutal-2xl md:text-brutal-3xl font-brutal mb-6">
                                PREFER ANOTHER METHOD?
                            </h2>
                            <p className="font-mono text-brutal-sm md:text-brutal-base text-punk-white/70 mb-8 max-w-2xl mx-auto px-4">
                                not a fan of forms? that's cool. here are other ways to reach me
                            </p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">

                                <NeonButton href="mailto:jagaddhitajalu@gmail.com" variant="green" size="lg">
                                    EMAIL ME
                                </NeonButton>

                                {/* <NeonButton href="https://cal.com/" variant="yellow" size="lg">
                                    SCHEDULE CALL
                                </NeonButton> */}

                                <NeonButton href="https://twitter.com/jjgarinarka" variant="white" size="lg">
                                    DM ON TWITTER
                                </NeonButton>
                            </div>
                        </section>
                    </ScrollReveal>

                </div>
            </div>
        </PageTransition>
    )
}
