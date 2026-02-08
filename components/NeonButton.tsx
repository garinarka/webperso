'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode, CSSProperties } from 'react'

interface NeonButtonProps {
    children: ReactNode
    onClick?: () => void
    href?: string
    variant?: 'yellow' | 'green' | 'pink' | 'red' | 'white'
    size?: 'sm' | 'md' | 'lg'
    className?: string
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}

export default function NeonButton({
    children,
    onClick,
    href,
    variant = 'yellow',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button'
}: NeonButtonProps) {

    // Size styles (inline untuk guarantee aplikasi)
    const sizeStyles: Record<string, CSSProperties> = {
        sm: {
            padding: '0.5rem 1rem',
            fontSize: '0.875rem'
        },
        md: {
            padding: '0.75rem 1.5rem',
            fontSize: '1rem'
        },
        lg: {
            padding: '1rem 2rem',
            fontSize: '1.125rem'
        }
    }

    // Variant classes
    const variantClasses = {
        yellow: 'bg-punk-black text-neon-yellow border-neon-yellow hover:bg-neon-yellow hover:text-punk-black hover:shadow-neon-yellow',
        green: 'bg-punk-black text-neon-green border-neon-green hover:bg-neon-green hover:text-punk-black hover:shadow-neon-green',
        pink: 'bg-punk-black text-neon-pink border-neon-pink hover:bg-neon-pink hover:text-punk-black hover:shadow-neon-pink',
        red: 'bg-punk-black text-neon-red border-neon-red hover:bg-neon-red hover:text-punk-black hover:shadow-neon-red', // UPDATED
        white: 'bg-punk-black text-punk-white border-punk-white hover:bg-punk-white hover:text-punk-black hover:shadow-neon-white' // UPDATED
    }

    const baseClasses = cn(
        'border-brutal font-brutal text-punk uppercase tracking-wider',
        'cursor-pointer select-none inline-block',
        'active:translate-x-[2px] active:translate-y-[2px]',
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
    )

    // Hover animation
    const hoverVariants = {
        hover: {
            scale: 1.02,
            transition: { duration: 0 }
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0 }
        }
    }

    // If href provided, render as link
    if (href) {
        return (
            <motion.a
                href={href}
                className={baseClasses}
                style={sizeStyles[size]}
                variants={hoverVariants}
                whileHover="hover"
                whileTap="tap"
            >
                {children}
            </motion.a>
        )
    }

    // Otherwise render as button
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={baseClasses}
            style={sizeStyles[size]}
            variants={hoverVariants}
            whileHover="hover"
            whileTap="tap"
        >
            {children}
        </motion.button>
    )
}
