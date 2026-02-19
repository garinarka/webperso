import type { Metadata } from 'next'
import GlitchText from '@/components/GlitchText'
import TerminalBox from '@/components/TerminalBox'
import ContactForm from '@/components/ContactForm'
import NoiseOverlay from '@/components/NoiseOverlay'
import ScanLinesOverlay from '@/components/ScanLinesOverlay'

export const metadata: Metadata = {
    title: 'Contact | Punk Portfolio',
    description: 'Get in touch. Let\'s build something different together.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-punk-black text-punk-white relative">
            {/* Background Effects */}
            <NoiseOverlay opacity={0.03} />
            <ScanLinesOverlay opacity={0.02} />

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
                        Got a project? Question? Just want to say hi?
                        <br />
                        Drop me a message. I actually read and respond to all of them.
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
                                        Usually within 24-48 hours
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


                                <a href="https://linkedin.com/in/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 font-mono text-brutal-sm text-punk-white hover:text-neon-yellow transition-colors duration-0"
                                >
                                    <span className="text-brutal-2xl">💼</span>
                                    <span>LinkedIn</span>
                                </a>


                                <a href="https://twitter.com/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 font-mono text-brutal-sm text-punk-white hover:text-neon-pink transition-colors duration-0"
                                >
                                    <span className="text-brutal-2xl">🐦</span>
                                    <span>Twitter</span>
                                </a>


                                <a href="https://instagram.com/yourusername"
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
                                        Currently accepting freelance work and collaborations.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* FAQ Section */}
                <section className="mb-20">
                    <h2 className="text-brutal-4xl font-brutal text-punk mb-8 text-center">
                        FREQUENTLY ASKED
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* FAQ Item 1 */}
                        <div className="border-brutal border-punk-white p-6 bg-punk-gray-100">
                            <h3 className="text-brutal-xl font-brutal text-neon-yellow mb-3">
                                What's your rate?
                            </h3>
                            <p className="font-mono text-brutal-sm text-punk-white/70">
                                Depends on the project scope. Send me details and I'll get back with a quote.
                                I prefer fixed-price for defined projects.
                            </p>
                        </div>

                        {/* FAQ Item 2 */}
                        <div className="border-brutal border-punk-white p-6 bg-punk-gray-100">
                            <h3 className="text-brutal-xl font-brutal text-neon-green mb-3">
                                How long does a project take?
                            </h3>
                            <p className="font-mono text-brutal-sm text-punk-white/70">
                                Simple landing page: 1-2 weeks. Full website: 4-8 weeks.
                                Complex web app: 2-3 months. Timeline varies by scope.
                            </p>
                        </div>

                        {/* FAQ Item 3 */}
                        <div className="border-brutal border-punk-white p-6 bg-punk-gray-100">
                            <h3 className="text-brutal-xl font-brutal text-neon-pink mb-3">
                                Do you do maintenance?
                            </h3>
                            <p className="font-mono text-brutal-sm text-punk-white/70">
                                Yes! I offer ongoing support and maintenance packages.
                                Or I can train your team to manage it themselves.
                            </p>
                        </div>

                        {/* FAQ Item 4 */}
                        <div className="border-brutal border-punk-white p-6 bg-punk-gray-100">
                            <h3 className="text-brutal-xl font-brutal text-punk-white mb-3">
                                What if I just have a question?
                            </h3>
                            <p className="font-mono text-brutal-sm text-punk-white/70">
                                Ask away! I'm happy to help with quick questions or advice.
                                No commitment needed.
                            </p>
                        </div>

                    </div>
                </section>

                {/* Alternative Contact Methods */}
                <section className="text-center border-brutal border-punk-white p-12 bg-punk-black">
                    <h2 className="text-brutal-3xl font-brutal mb-6">
                        PREFER ANOTHER METHOD?
                    </h2>
                    <p className="font-mono text-brutal-base text-punk-white/70 mb-8 max-w-2xl mx-auto">
                        Not a fan of forms? That's cool. Here are other ways to reach me:
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">

                        <a href="mailto:hello@yourdomain.com"
                            className="px-6 py-3 bg-neon-green text-punk-black font-brutal text-brutal-base border-brutal border-punk-black hover:bg-punk-black hover:text-neon-green hover:border-neon-green transition-colors duration-0"
                        >
                            EMAIL ME
                        </a>

                        <a href="https://cal.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-neon-yellow text-punk-black font-brutal text-brutal-base border-brutal border-punk-black hover:bg-punk-black hover:text-neon-yellow hover:border-neon-yellow transition-colors duration-0"
                        >
                            SCHEDULE CALL
                        </a>

                        <a href="https://twitter.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-punk-black text-punk-white font-brutal text-brutal-base border-brutal border-punk-white hover:bg-punk-white hover:text-punk-black transition-colors duration-0"
                        >
                            DM ON TWITTER
                        </a>
                    </div>
                </section>

            </div>
        </div>
    )
}
