import type { Metadata } from 'next'
import type { Project } from '@/types'

export const metadata: Metadata = {
    title: 'Projects | King Jagad',
    description: 'Check out my web development projects and work.',
}

export default function ProjectsPage() {
    const projects: Project[] = [
        {
            id: 1,
            title: "Personal Website",
            description: "Website pribadi yang dibuat dengan Next.js, TypeScript, dan Tailwind CSS",
            tech: ["Next.js", "TypeScript", "Tailwind"],
            status: "In Progress"
        },
        {
            id: 2,
            title: "Future Project 1",
            description: "Project amazing yang akan dibuat nanti",
            tech: ["React", "Node.js"],
            status: "Planning"
        },
        {
            id: 3,
            title: "Future Project 2",
            description: "Ide project keren lainnya",
            tech: ["Next.js", "MongoDB"],
            status: "Planning"
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    My Projects
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                    Berikut adalah beberapa project yang sedang dan akan saya kerjakan
                </p>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-200 dark:border-gray-800"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {project.title}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-center text-xs font-medium ${project.status === 'In Progress'
                                        ? 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300'
                                        : 'bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-300'
                                    }`}>
                                    {project.status}
                                </span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
