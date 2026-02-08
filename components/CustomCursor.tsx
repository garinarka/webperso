'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CustomCursorProps {
    color?: 'yellow' | 'green' | 'pink' | 'white'
    size?: number
}

export default function CustomCursor({
    color = 'yellow',
    size = 20
}: CustomCursorProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isInteractive = target.closest('a, button, [role="button"]')
            setIsHovering(!!isInteractive)
        }

        window.addEventListener('mousemove', updateMousePosition)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', updateMousePosition)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [])

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
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - size / 2,
                    y: mousePosition.y - size / 2,
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

                {/* Cursor trail effect */}
                <motion.div
                    className="absolute top-1/2 left-1/2"
                    style={{
                        width: size * 2,
                        height: size * 2,
                        border: `1px solid ${colors[color]}`,
                        borderRadius: '50%',
                        opacity: 0.3
                    }}
                    animate={{
                        scale: isHovering ? 1.5 : 1,
                        x: '-50%',
                        y: '-50%'
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20
                    }}
                />
            </motion.div>
        </>
    )
}
