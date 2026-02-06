import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-200">404</h1>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Page Not Found
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                    Oops! Halaman yang kamu cari tidak ditemukan.
                </p>
                <Link
                    href="/"
                    className="bg-foreground text-background px-6 py-3 rounded-full font-medium transition-colors inline-block hover:bg-[#383838] dark:hover:bg-[#ccc]"
                >
                    Kembali ke Home
                </Link>
            </div>
        </div>
    )
}
