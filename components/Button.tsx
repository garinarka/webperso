import Link from 'next/link'

interface ButtonProps {
    children: React.ReactNode
    href?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit'
    className?: string
}

export default function Button({
    children,
    href,
    onClick,
    variant = 'primary',
    type = 'button',
    className = ''
}: ButtonProps) {
    const baseStyles = 'px-6 py-3 rounded-full font-medium transition inline-block text-center'

    const variantStyles = {
        primary: 'bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]',
        secondary: 'border border-solid border-black/[.08] transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]'
    }

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`

    if (href) {
        return (
            <Link href={href} className={combinedStyles}>
                {children}
            </Link>
        )
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={combinedStyles}
        >
            {children}
        </button>
    )
}
