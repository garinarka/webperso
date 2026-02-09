import Link from 'next/link'
import GlitchText from './GlitchText'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-punk-gray-100 border-t-brutal border-punk-white text-punk-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* About */}
                    <div>
                        <h3 className="text-brutal-xl font-brutal mb-4 text-neon-yellow">
                            [JxGxDDHxTx]
                        </h3>
                        <p className="font-mono text-brutal-sm text-punk-white/70">
                            undergraduate student • developer(?) • punk!!!!!
                        </p>
                        <p className="font-mono text-brutal-xs text-punk-white/50 mt-2">
                            breaking conventions.<br />
                            building experiences.<br />
                            no corporate BS.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-brutal-xl font-brutal mb-4 text-neon-green">
                            NAVIGATE
                        </h3>
                        <ul className="space-y-2 font-mono text-brutal-sm">
                            <li>
                                <Link href="/" className="text-punk-white/70 hover:text-neon-yellow transition-colors duration-0">
                                    &gt; Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-punk-white/70 hover:text-neon-yellow transition-colors duration-0">
                                    &gt; About
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="text-punk-white/70 hover:text-neon-yellow transition-colors duration-0">
                                    &gt; Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-punk-white/70 hover:text-neon-yellow transition-colors duration-0">
                                    &gt; Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-punk-white/70 hover:text-neon-yellow transition-colors duration-0">
                                    &gt; Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-brutal-xl font-brutal mb-4 text-neon-pink">
                            CONNECT
                        </h3>
                        <div className="space-y-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-punk-white/70 hover:text-neon-green transition-colors duration-0 font-mono text-brutal-sm"
                            >
                                <span>💻</span>
                                <span>GitHub</span>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-punk-white/70 hover:text-neon-yellow transition-colors duration-0 font-mono text-brutal-sm"
                            >
                                <span>💼</span>
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-punk-white/70 hover:text-neon-pink transition-colors duration-0 font-mono text-brutal-sm"
                            >
                                <span>🐦</span>
                                <span>Twitter</span>
                            </a>
                            <a
                                href="mailto:hello@yourdomain.com"
                                className="flex items-center gap-2 text-punk-white/70 hover:text-neon-cyan transition-colors duration-0 font-mono text-brutal-sm"
                            >
                                <span>📧</span>
                                <span>Email</span>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-punk-white/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-mono text-brutal-xs text-punk-white/50">
                        &copy; {currentYear} <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-neon-green transition-colors duration-0"
                        >
                            [JxGxDDHxTx]</a>.
                        Built with Next.js & raw energy.
                    </p>
                    <div className="flex gap-4 font-mono text-brutal-xs text-punk-white/50">
                        <GlitchText
                            as="span"
                            className="text-neon-yellow"
                            intensity="high"
                        >
                            PUNK
                        </GlitchText>
                        <span>•</span>
                        <GlitchText
                            as="span"
                            className="text-neon-green"
                            intensity="medium"
                        >
                            BRUTAL
                        </GlitchText>
                        <span>•</span>
                        <GlitchText
                            as="span"
                            className="text-neon-pink"
                            intensity="low"
                        >
                            DIGITAL
                        </GlitchText>
                    </div>
                </div>

            </div>
        </footer>
    )
}
