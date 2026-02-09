import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About | King Jagad',
    description: 'Learn more about me, my skills, and my journey in web development.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl">
                        👤
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Tentang Saya
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Web Developer | Lifelong Learner | Tech Enthusiast
                    </p>
                </div>

                {/* Bio */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 mb-8 border border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Bio</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Halo! Saya sedang dalam perjalanan mempelajari web development dengan fokus pada
                        teknologi modern seperti Next.js, TypeScript, dan Tailwind CSS.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Website ini adalah bukti nyata dari proses belajar saya. Setiap hari saya terus
                        mengembangkan skill dan pengetahuan untuk menjadi developer yang lebih baik.
                    </p>
                </div>

                {/* Skills */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 mb-8 border border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Skills</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Git', 'VS Code'].map((skill) => (
                            <div
                                key={skill}
                                className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-lg text-center font-medium"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Learning Journey</h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center flex-shrink-0">
                                📚
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Mulai Belajar Web Development</h3>
                                <p className="text-gray-600 dark:text-gray-400">Memulai perjalanan dengan HTML, CSS, dan JavaScript</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center flex-shrink-0">
                                ⚛️
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Belajar React & Next.js</h3>
                                <p className="text-gray-600 dark:text-gray-400">Mempelajari framework modern untuk web development</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center flex-shrink-0">
                                🚀
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Membuat Website Pertama</h3>
                                <p className="text-gray-600 dark:text-gray-400">Website pribadi dengan Next.js, TypeScript, dan Tailwind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
