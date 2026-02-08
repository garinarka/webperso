'use client'

import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

export default function TypedText() {
    const typedRef = useRef<Typed | null>(null)

    useEffect(() => {
        const options = {
            strings: ['UNDERGRADUATE STUDENT', 'DEVELOPER(?)', 'PUNK!!!!!'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1200,
            loop: true,
            smartBackspace: false,
            preStringTyped: (arrayPos: number) => {
                const el = document.getElementById('typed-text')
                if (!el) return

                const colors = [
                    'text-neon-yellow',
                    'text-neon-green',
                    'text-neon-pink',
                ]

                el.className = `font-mono ${colors[arrayPos]}`
            },
        }

        typedRef.current = new Typed('#typed-text', options)

        return () => {
            typedRef.current?.destroy()
        }
    }, [])

    return (
        <span
            id="typed-text"
            className="font-mono text-neon-yellow"
        />
    )
}
