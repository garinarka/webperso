import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'PROJECTS',
    description: 'portfolio of web development projects, designs, and experiments',
}

export default function ProjectsLayout({
    children,
}: {
    children: ReactNode
}) {
    return children
}
