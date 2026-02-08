'use client'

import NeonButton from './NeonButton'

export default function InteractiveDemo() {
    return (
        <div>
            <p className="font-mono text-brutal-sm mb-4 text-punk-white/50">STATES:</p>
            <div className="flex flex-wrap gap-4">
                <NeonButton variant="green" onClick={() => alert('Button clicked! 🔥')}>
                    CLICK ME
                </NeonButton>
                <NeonButton variant="green" href="#test">
                    I'M A LINK
                </NeonButton>
                <NeonButton variant="green" disabled>
                    DISABLED
                </NeonButton>
            </div>
        </div>
    )
}
