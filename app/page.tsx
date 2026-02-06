import type { Metadata } from 'next'
import Button from '@/components/Button'

export const metadata: Metadata = {
  title: 'Home | King Jagad',
  description: 'Welcome to my personal website. Built with Next.js, TypeScript, and Tailwind CSS.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Selamat Datang di Website King Jagad
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Saya sedang belajar web development dengan Next.js, TypeScript, dan Tailwind CSS.
            Ini adalah langkah pertama saya dalam membangun kehadiran digital.
          </p>
          <div className="flex gap-4 justify-center">
            <Button href="/about" variant="primary">
              Tentang Saya
            </Button>
            <Button href="/projects" variant="secondary">
              Lihat Projects
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Fast Performance</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Dibangun dengan Next.js untuk performa optimal dan loading cepat.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Modern Design</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Menggunakan Tailwind CSS untuk tampilan yang clean dan modern.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="text-3xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">TypeScript</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Type-safe development untuk code yang lebih maintainable.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
