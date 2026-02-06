import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 dark:bg-black text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">KING JAGAD</h3>
                        <p className="text-gray-400 dark:text-gray-500">
                            Personal website untuk showcase projects dan berbagi pengalaman dalam web development.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 dark:text-gray-500 hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 dark:text-gray-500 hover:text-white">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="text-gray-400 dark:text-gray-500 hover:text-white">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 dark:text-gray-500 hover:text-white">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 dark:text-gray-500 hover:text-white"
                            >
                                <span className="text-2xl">💻</span>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 dark:text-gray-500 hover:text-white"
                            >
                                <span className="text-2xl">💼</span>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 dark:text-gray-500 hover:text-white"
                            >
                                <span className="text-2xl">🐦</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
                    <p>&copy; {currentYear} JGDT. All rights reserved.</p>
                    <p className="text-sm mt-2">jgarinarka.vercel.app</p>
                </div>
            </div>
        </footer>
    )
}
