'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

interface CustomCursorProps {
    color?: 'yellow' | 'green' | 'pink' | 'white'
    size?: number
    disabled?: boolean
}

export default function CustomCursor({
    color = 'yellow',
    size = 20,
    disabled = false
}: CustomCursorProps) {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
    const [isHovering, setIsHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(true) // Start true to prevent flash
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Detect mobile/touch devices
        const checkMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        setIsMobile(checkMobile)
    }, [])

    useEffect(() => {
        // Don't run on mobile or if disabled
        if (isMobile || disabled || !mounted) return

        let rafId: number | null = null

        const handleMouseMove = (e: MouseEvent) => {
            // Cancel previous frame
            if (rafId) {
                cancelAnimationFrame(rafId)
            }

            // Request new frame
            rafId = requestAnimationFrame(() => {
                setMousePosition({ x: e.clientX, y: e.clientY })
            })
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isInteractive = target.closest('a, button, [role="button"], input, textarea')
            setIsHovering(!!isInteractive)
        }

        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        window.addEventListener('mouseover', handleMouseOver, { passive: true })

        // Get initial position
        const initialMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
            window.removeEventListener('mousemove', initialMove)
        }
        window.addEventListener('mousemove', initialMove, { passive: true })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
            window.removeEventListener('mousemove', initialMove)
            if (rafId) {
                cancelAnimationFrame(rafId)
            }
        }
    }, [isMobile, disabled, mounted])

    // Don't render on mobile or before mount
    if (!mounted || isMobile || disabled) return null

    const colors = {
        yellow: '#FFFF00',
        green: '#00FF00',
        pink: '#FF00FF',
        white: '#FFFFFF'
    }

    return (
        <>
            {/* Hide default cursor */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

            {/* Custom cursor */}
            <motion.div
                className="fixed pointer-events-none z-[9999]"
                style={{
                    left: 0,
                    top: 0,
                    x: mousePosition.x - size / 2,
                    y: mousePosition.y - size / 2,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            >
                {/* Crosshair cursor */}
                <div
                    style={{
                        width: size,
                        height: size,
                        position: 'relative'
                    }}
                >
                    {/* Horizontal line */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            width: '100%',
                            height: 2,
                            backgroundColor: colors[color],
                            transform: 'translateY(-50%)'
                        }}
                    />
                    {/* Vertical line */}
                    <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            width: 2,
                            height: '100%',
                            backgroundColor: colors[color],
                            transform: 'translateX(-50%)'
                        }}
                    />
                    {/* Center dot */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: 4,
                            height: 4,
                            backgroundColor: colors[color],
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '50%'
                        }}
                    />
                </div>

                {/* Cursor trail - removed for performance */}
            </motion.div>
        </>
    )
}
