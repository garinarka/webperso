export interface Project {
    id: number
    title: string
    description: string
    longDescription?: string
    image?: string
    category: 'web' | 'design' | 'mobile' | 'experiment'
    tags: string[]
    liveUrl?: string
    githubUrl?: string
    featured: boolean
    year: number
    status: 'completed' | 'in-progress' | 'archived'
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Punk Portfolio",
        description: "Personal website with brutalist design and punk aesthetics",
        longDescription: "A complete portfolio website built with Next.js, TypeScript, and Tailwind. Features full-screen navigation, glitch effects, and terminal-style components. Breaking design conventions while maintaining usability.",
        category: "web",
        tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
        liveUrl: "https://yoursite.com",
        githubUrl: "https://github.com/yourusername/portfolio",
        featured: true,
        year: 2026,
        status: "in-progress"
    },
    {
        id: 2,
        title: "E-Commerce Platform",
        description: "Full-stack online store with admin dashboard",
        longDescription: "Modern e-commerce solution with product management, cart functionality, payment integration, and admin dashboard. Built for scalability and performance.",
        category: "web",
        tags: ["Next.js", "MongoDB", "Stripe", "Node.js"],
        liveUrl: "https://example-store.com",
        githubUrl: "https://github.com/yourusername/ecommerce",
        featured: true,
        year: 2025,
        status: "completed"
    },
    {
        id: 3,
        title: "Task Manager App",
        description: "Minimalist productivity tool with drag & drop",
        longDescription: "Clean and simple task management application with drag-and-drop functionality, categories, deadlines, and progress tracking.",
        category: "web",
        tags: ["React", "TypeScript", "DnD Kit", "Local Storage"],
        githubUrl: "https://github.com/yourusername/taskmanager",
        featured: false,
        year: 2025,
        status: "completed"
    },
    {
        id: 4,
        title: "Weather Dashboard",
        description: "Real-time weather app with beautiful UI",
        category: "web",
        tags: ["React", "Weather API", "CSS"],
        liveUrl: "https://weather-app.com",
        featured: false,
        year: 2024,
        status: "completed"
    },
    {
        id: 5,
        title: "Brand Identity",
        description: "Complete visual identity for tech startup",
        category: "design",
        tags: ["Figma", "Branding", "UI/UX"],
        featured: true,
        year: 2025,
        status: "completed"
    },
    {
        id: 6,
        title: "Generative Art",
        description: "Creative coding experiments with p5.js",
        category: "experiment",
        tags: ["p5.js", "JavaScript", "Canvas"],
        liveUrl: "https://art.example.com",
        featured: false,
        year: 2024,
        status: "archived"
    },
    {
        id: 7,
        title: "Mobile Fitness App",
        description: "Workout tracking app with React Native",
        category: "mobile",
        tags: ["React Native", "TypeScript", "Firebase"],
        githubUrl: "https://github.com/yourusername/fitness",
        featured: false,
        year: 2024,
        status: "in-progress"
    },
    {
        id: 8,
        title: "Component Library",
        description: "Reusable React components with Storybook",
        category: "web",
        tags: ["React", "Storybook", "TypeScript"],
        githubUrl: "https://github.com/yourusername/components",
        featured: false,
        year: 2025,
        status: "in-progress"
    }
]
