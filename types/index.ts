// Project type
export interface Project {
    id: number
    title: string
    description: string
    tech: string[]
    status: 'In Progress' | 'Planning' | 'Completed'
    link?: string
    github?: string
}

// Contact form type
export interface ContactFormData {
    name: string
    email: string
    message: string
}

// Navigation link type
export interface NavLink {
    label: string
    href: string
}
