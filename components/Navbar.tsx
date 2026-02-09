'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import GlitchText from './GlitchText'
import { cn } from '@/lib/utils'

export default function PunkNavbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    // Navigation links
    const navLinks = [
        { href: '/', label: 'HOME' },
        { href: '/about', label: 'ABOUT' },
        { href: '/projects', label: 'PROJECTS' },
        { href: '/blog', label: 'BLOG' },
        { href: '/contact', label: 'CONTACT' },
    ]

    return (
        <>
            {/* Top Bar - Always Visible */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-punk-black border-b-brutal border-punk-white">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-brutal text-brutal-xl text-punk-white hover:text-neon-yellow transition-colors duration-0"
                    >
                        [JJ]
                    </Link>

                    {/* Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="font-mono text-brutal-base text-punk-white hover:text-neon-yellow border-brutal border-punk-white px-4 py-2 hover:border-neon-yellow transition-colors duration-0"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? '[CLOSE]' : '[MENU]'}
                    </button>

                </div>
            </nav>

            {/* Full-Screen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0 }}
                        className="fixed inset-0 z-40 bg-punk-black"
                    >
                        {/* Background Effects */}
                        <div className="absolute inset-0 noise opacity-10"></div>
                        <div className="absolute inset-0 scan-lines"></div>

                        {/* Menu Content */}
                        <div className="relative z-50 min-h-[calc(100vh-4rem)] mt-16 flex items-center justify-center">
                            <nav className="w-full max-w-4xl px-4">

                                {/* Navigation Links */}
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-20 text-center mb-16">
                                    {navLinks.map((link, index) => {
                                        const isActive = pathname === link.href
                                        const isLastOdd = navLinks.length % 2 !== 0 && index === navLinks.length - 1

                                        return (
                                            <motion.li
                                                key={link.href}
                                                className={cn(
                                                    isLastOdd && 'md:col-span-2 md:flex md:justify-center'
                                                )}
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05, duration: 0 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={closeMenu}
                                                    className={`
                            font-brutal text-brutal-5xl md:text-brutal-6xl block
                            hover:text-neon-yellow transition-colors duration-0
                            ${isActive ? 'text-neon-yellow' : 'text-punk-white'}
                          `}
                                                >
                                                    {isActive ? (
                                                        <GlitchText intensity="medium">
                                                            {link.label}
                                                        </GlitchText>
                                                    ) : (
                                                        link.label
                                                    )}
                                                </Link>
                                            </motion.li>
                                        )
                                    })}
                                </ul>

                                {/* Social Links */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0 }}
                                    className="flex justify-center gap-8"
                                >

                                    <a href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-punk-white hover:text-neon-green transition-colors duration-0">
                                        <span className="text-brutal-4xl">💻</span>
                                        <p className="font-mono text-brutal-xs mt-2">GITHUB</p>
                                    </a>

                                    <a href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-punk-white hover:text-neon-yellow transition-colors duration-0">
                                        <span className="text-brutal-4xl">💼</span>
                                        <p className="font-mono text-brutal-xs mt-2">LINKEDIN</p>
                                    </a>

                                    <a href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-punk-white hover:text-neon-pink transition-colors duration-0">
                                        <span className="text-brutal-4xl">🐦</span>
                                        <p className="font-mono text-brutal-xs mt-2">TWITTER</p>
                                    </a>
                                </motion.div>
                            </nav>
                        </div >
                    </motion.div >
                )
                }
            </AnimatePresence >
        </>
    )
}