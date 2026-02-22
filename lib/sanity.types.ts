import { PortableTextBlock } from '@portabletext/react'

// Blog Post Types
export interface SanityPost {
    _id: string
    title: string
    slug: {
        current: string
    }
    excerpt: string
    publishedAt: string
    category: 'tutorial' | 'thoughts' | 'project' | 'rant'
    tags: string[]
    featured: boolean
    published: boolean
    body?: PortableTextBlock[]
    imageUrl?: string
    imageAlt?: string
}

// Project Types
export interface SanityProject {
    _id: string
    title: string
    slug: {
        current: string
    }
    description: string
    longDescription?: string
    category: 'web' | 'design' | 'mobile' | 'experiment'
    tags: string[]
    liveUrl?: string
    githubUrl?: string
    featured: boolean
    year: number
    status: 'completed' | 'in-progress' | 'archived'
    order?: number
    imageUrl?: string
    imageAlt?: string
    gallery?: Array<{
        url: string
        alt?: string
    }>
}

// Portable Text Component Props
export interface PortableTextComponents {
    types?: {
        image?: React.ComponentType<any>
        code?: React.ComponentType<any>
    }
    marks?: {
        link?: React.ComponentType<any>
    }
    block?: {
        h1?: React.ComponentType<any>
        h2?: React.ComponentType<any>
        h3?: React.ComponentType<any>
        h4?: React.ComponentType<any>
        blockquote?: React.ComponentType<any>
        normal?: React.ComponentType<any>
    }
    list?: {
        bullet?: React.ComponentType<any>
        number?: React.ComponentType<any>
    }
}
