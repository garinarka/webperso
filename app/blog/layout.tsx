import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog | Punk Portfolio',
    description: 'Thoughts, tutorials, rants about web development and design.',
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
