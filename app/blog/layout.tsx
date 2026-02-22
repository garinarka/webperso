import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'BLOG',
    description: 'thoughts, tutorials, rants about web development, design or anything else',
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
