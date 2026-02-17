export interface BlogPost {
    slug: string
    title: string
    excerpt: string
    date: string
    readTime: number
    category: 'tutorial' | 'thoughts' | 'project' | 'rant'
    tags: string[]
    featured: boolean
    published: boolean
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'why-brutalism-is-the-future',
        title: 'Why Brutalism Is The Future of Web Design',
        excerpt: 'Everyone is building the same boring minimalist websites. Here\'s why brutalism is a breath of fresh air.',
        date: '2026-02-01',
        readTime: 5,
        category: 'thoughts',
        tags: ['Design', 'Brutalism', 'Web'],
        featured: true,
        published: true
    },
    {
        slug: 'nextjs-punk-setup',
        title: 'Setting Up a Punk Next.js Project from Scratch',
        excerpt: 'A complete guide to building a brutalist website with Next.js, TypeScript, and Tailwind CSS.',
        date: '2026-01-20',
        readTime: 10,
        category: 'tutorial',
        tags: ['Next.js', 'TypeScript', 'Tutorial'],
        featured: true,
        published: true
    },
    {
        slug: 'typescript-is-punk-rock',
        title: 'TypeScript is Punk Rock',
        excerpt: 'Why type safety is actually an act of rebellion against chaotic codebases.',
        date: '2026-01-10',
        readTime: 4,
        category: 'thoughts',
        tags: ['TypeScript', 'Programming'],
        featured: false,
        published: true
    },
    {
        slug: 'building-glitch-effects-css',
        title: 'Building Glitch Effects with Pure CSS',
        excerpt: 'How to create distorted, corrupted text and image effects using only CSS animations.',
        date: '2025-12-15',
        readTime: 8,
        category: 'tutorial',
        tags: ['CSS', 'Animation', 'Design'],
        featured: false,
        published: true
    },
    {
        slug: 'stop-making-boring-websites',
        title: 'Stop Making Boring Websites',
        excerpt: 'A rant about cookie-cutter design and why the web needs more personality.',
        date: '2025-12-01',
        readTime: 3,
        category: 'rant',
        tags: ['Design', 'Opinion'],
        featured: false,
        published: true
    },
    {
        slug: 'framer-motion-punk-animations',
        title: 'Punk Animations with Framer Motion',
        excerpt: 'Creating glitch, shake, and distortion animations using Framer Motion.',
        date: '2025-11-20',
        readTime: 7,
        category: 'tutorial',
        tags: ['Framer Motion', 'Animation', 'React'],
        featured: false,
        published: true
    }
]
