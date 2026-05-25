import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'BLOG',
    description: 'thoughts, tutorials, rants about web development, design or anything else',
}

export default function BlogLayout({
    children,
}: {
    children: ReactNode
}) {
    return children
}
