import type { Metadata } from 'next'
import Button from '@/components/Button'

export const metadata: Metadata = {
    title: 'Contact | King Jagad',
    description: 'Get in touch with me. Send a message or find my contact information.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Hubungi Saya
                </h1>

                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-800">
                    <form className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nama
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-50"
                                placeholder="Nama Anda"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-50"
                                placeholder="email@example.com"
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Pesan
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-50 resize-none"
                                placeholder="Tulis pesan Anda di sini..."
                            />
                        </div>

                        {/* Submit Button */}
                        <Button className="w-full" type="submit" variant="primary">
                            Kirim Pesan
                        </Button>
                    </form>

                    {/* Contact Info */}
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Informasi Kontak</h2>
                        <div className="space-y-2 text-gray-600 dark:text-gray-400">
                            <p>📧 Email: jagaddhitajalu@gmail.com</p>
                            <p>📍 Location: Yogyakarta, Indonesia</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
