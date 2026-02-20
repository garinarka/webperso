import type { Metadata } from 'next'
import GlitchText from '@/components/GlitchText'
import TerminalBox from '@/components/TerminalBox'
import ContactForm from '@/components/ContactForm'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'
import NeonButton from '@/components/NeonButton'

export const metadata: Metadata = {
    title: 'Contact | Punk Portfolio',
    description: 'Get in touch. Let\'s build something different together.',
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
                            className="text-brutal-6xl md:text-brutal-7xl font-brutal mb-6"
                            intensity="medium"
                        >
                            GET IN TOUCH
                        </GlitchText>
                        <p className="text-brutal-lg font-mono text-punk-white/70 max-w-2xl mx-auto">
                            got a project? question? just want to say hi?
                            <br />
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
                                            href="mailto:hello@yourdomain.com"
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


                                    <a href="https://linkedin.com/in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 font-mono text-brutal-sm text-punk-white hover:text-neon-yellow transition-colors duration-0"
                                    >
                                        <span className="text-brutal-2xl">💼</span>
                                        <span>LinkedIn</span>
                                    </a>


                                    <a href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 font-mono text-brutal-sm text-punk-white hover:text-neon-pink transition-colors duration-0"
                                    >
                                        <span className="text-brutal-2xl">🐦</span>
                                        <span>Twitter</span>
                                    </a>


                                    <a href="https://instagram.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 font-mono text-brutal-sm text-punk-white hover:text-neon-pink transition-colors duration-0"
                                    >
                                        <span className="text-brutal-2xl">📷</span>
                                        <span>Instagram</span>
                                    </a>
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
                            <h2 className="text-brutal-4xl font-brutal text-punk mb-8 text-center">
                                FREQUENTLY ASKED
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* FAQ Item 1 */}
                                <div className="border-brutal border-punk-white p-6 bg-punk-gray-100">
                                    <h3 className="text-brutal-xl font-brutal text-neon-yellow mb-3">
                                        what's your rate?
                                    </h3>
                                    <p className="font-mono text-brutal-sm text-punk-white/70">
                                        depends on the project scope. Send me details and i'll get back with a quote.
                                        i prefer fixed-price for defined projects
                                    </p>
                                </div>

                                {/* FAQ Item 2 */}
                                <div className="border-brutal border-punk-white p-6 bg-punk-gray-100">
                                    <h3 className="text-brutal-xl font-brutal text-neon-green mb-3">
                                        how long does a project take?
                                    </h3>
                                    <p className="font-mono text-brutal-sm text-punk-white/70">
                                        simple landing page: 1-2 weeks. full website: 4-8 weeks.
                                        complex web app: 2-3 months. timeline varies by scope
                                    </p>
                                </div>

                                {/* FAQ Item 3 */}
                                <div className="border-brutal border-punk-white p-6 bg-punk-gray-100">
                                    <h3 className="text-brutal-xl font-brutal text-neon-pink mb-3">
                                        do you do maintenance?
                                    </h3>
                                    <p className="font-mono text-brutal-sm text-punk-white/70">
                                        yes! i offer ongoing support and maintenance packages.
                                        or i can train your team to manage it themselves
                                    </p>
                                </div>

                                {/* FAQ Item 4 */}
                                <div className="border-brutal border-punk-white p-6 bg-punk-gray-100">
                                    <h3 className="text-brutal-xl font-brutal text-punk-white mb-3">
                                        what if i just have a question?
                                    </h3>
                                    <p className="font-mono text-brutal-sm text-punk-white/70">
                                        ask away! i'm happy to help with quick questions or advice.
                                        no commitment needed
                                    </p>
                                </div>

                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Alternative Contact Methods */}
                    <ScrollReveal delay={0.2}>
                        <section className="text-center border-brutal border-punk-white p-12 bg-punk-gray-100">
                            <h2 className="text-brutal-3xl font-brutal mb-6">
                                PREFER ANOTHER METHOD?
                            </h2>
                            <p className="font-mono text-brutal-base text-punk-white/70 mb-8 max-w-2xl mx-auto">
                                not a fan of forms? that's cool. here are other ways to reach me
                            </p>

                            <div className="flex flex-wrap gap-4 justify-center">

                                <NeonButton href="mailto:jagaddhitajalu@gmail.com" variant="green" size="lg">
                                    EMAIL ME
                                </NeonButton>

                                <NeonButton href="https://cal.com/" variant="yellow" size="lg">
                                    SCHEDULE CALL
                                </NeonButton>

                                <NeonButton href="https://twitter.com/" variant="white" size="lg">
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
