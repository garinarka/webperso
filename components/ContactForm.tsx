'use client'

import { useState, FormEvent } from 'react'
import NeonButton from './NeonButton'

interface FormData {
    name: string
    email: string
    subject: string
    message: string
}

interface FormStatus {
    type: 'idle' | 'loading' | 'success' | 'error'
    message: string
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [status, setStatus] = useState<FormStatus>({
        type: 'idle',
        message: ''
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const statusColors = {
        idle: 'text-punk-white/50',
        loading: 'text-neon-yellow',
        success: 'text-neon-green',
        error: 'text-neon-red'
    }

    return (
        <form className="space-y-6">

            {/* Name */}
            <div>
                <label
                    htmlFor="name"
                    className="block font-mono text-brutal-sm text-punk-white mb-2"
                >
                    &gt; NAME *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-punk-black border-brutal border-punk-white text-punk-white font-mono text-brutal-base focus:border-neon-yellow placeholder:text-punk-white/30"
                    placeholder="Your name"
                />
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="block font-mono text-brutal-sm text-punk-white mb-2"
                >
                    &gt; EMAIL *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-punk-black border-brutal border-punk-white text-punk-white font-mono text-brutal-base focus:border-neon-yellow placeholder:text-punk-white/30"
                    placeholder="your@email.com"
                />
            </div>

            {/* Subject */}
            <div>
                <label
                    htmlFor="subject"
                    className="block font-mono text-brutal-sm text-punk-white mb-2"
                >
                    &gt; SUBJECT *
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-punk-black border-brutal border-punk-white text-punk-white font-mono text-brutal-base focus:border-neon-yellow placeholder:text-punk-white/30"
                    placeholder="What's this about?"
                />
            </div>

            {/* Message */}
            <div>
                <label
                    htmlFor="message"
                    className="block font-mono text-brutal-sm text-punk-white mb-2"
                >
                    &gt; MESSAGE *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-punk-black border-brutal border-punk-white text-punk-white font-mono text-brutal-base focus:border-neon-yellow placeholder:text-punk-white/30 resize-none"
                    placeholder="Tell me what you need..."
                />
            </div>

            {/* Status Message */}
            {status.message && (
                <div className={`
          p-4 border-brutal font-mono text-brutal-sm
          ${status.type === 'success' && 'border-neon-green bg-neon-green/10'}
          ${status.type === 'error' && 'border-neon-red bg-neon-red/10'}
          ${status.type === 'loading' && 'border-neon-yellow bg-neon-yellow/10'}
        `}>
                    <p className={statusColors[status.type]}>
                        {status.type === 'loading' && '⏳ '}
                        {status.type === 'success' && '✓ '}
                        {status.type === 'error' && '✗ '}
                        {status.message}
                    </p>
                </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
                <NeonButton
                    type="submit"
                    variant="yellow"
                    size="lg"
                    disabled={status.type === 'loading'}
                    className="w-full"
                >
                    {status.type === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                </NeonButton>
            </div>

            {/* Helper Text */}
            <p className="font-mono text-brutal-xs text-punk-white/50 text-center">
                Or email me directly at{' '}
                <a
                    href="mailto:jagaddhitajalu@gmail.com"
                    className="text-neon-yellow hover:text-punk-white transition-colors duration-0"
                >
                    jagaddhitajalu@gmail.com
                </a>
            </p>

        </form>
    )
}
