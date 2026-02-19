'use client'

import { useEffect, useState } from 'react'

export default function KonamiCode() {
    const [activated, setActivated] = useState(false)

    useEffect(() => {
        const konamiCode = [
            'ArrowUp', 'ArrowUp',
            'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight',
            'ArrowLeft', 'ArrowRight',
            'b', 'a'
        ]
        let konamiIndex = 0

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++
                if (konamiIndex === konamiCode.length) {
                    setActivated(true)
                    document.body.classList.add('animate-glitch')

                    // Show easter egg message
                    const message = document.createElement('div')
                    message.className = 'fixed inset-0 z-[9999] bg-punk-black/95 flex items-center justify-center'
                    message.innerHTML = `
            <div class="text-center">
              <p class="text-brutal-6xl font-brutal text-neon-yellow mb-4 glitch-text" data-text="PUNK MODE">PUNK MODE</p>
              <p class="text-brutal-2xl font-brutal text-neon-green mb-8">ACTIVATED!</p>
              <p class="font-mono text-brutal-sm text-punk-white/70">You found the secret. You're officially punk. 🤘</p>
            </div>
          `
                    document.body.appendChild(message)

                    // Remove after 3 seconds
                    setTimeout(() => {
                        document.body.removeChild(message)
                        document.body.classList.remove('animate-glitch')
                    }, 3000)

                    konamiIndex = 0
                }
            } else {
                konamiIndex = 0
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return null
}
