import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projects | Punk Portfolio',
    description: 'Portfolio of web development projects, designs, and experiments.',
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
