'use client'

import { useState, useEffect } from 'react'

export interface Command {
    prompt: string
    output: string[]
    color?: string
}

interface TerminalTypingProps {
    commands: Command[]
    typingSpeed?: number
    lineDelay?: number
    commandDelay?: number
}

export default function TerminalTyping({
    commands,
    typingSpeed = 30,
    lineDelay = 500,
    commandDelay = 1000
}: TerminalTypingProps) {
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
    const [currentOutputIndex, setCurrentOutputIndex] = useState(0)
    const [displayedText, setDisplayedText] = useState('')
    const [isTyping, setIsTyping] = useState(true)

    useEffect(() => {
        if (!isTyping || commands.length === 0) return

        const currentCommand = commands[currentCommandIndex]
        const currentLine = currentCommand.output[currentOutputIndex]

        // Command selesai
        if (!currentLine) {
            if (currentCommandIndex < commands.length - 1) {
                const timeout = setTimeout(() => {
                    setCurrentCommandIndex(prev => prev + 1)
                    setCurrentOutputIndex(0)
                    setDisplayedText('')
                }, commandDelay)

                return () => clearTimeout(timeout)
            } else {
                setIsTyping(false)
            }
            return
        }

        // Typing effect
        if (displayedText.length < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(currentLine.slice(0, displayedText.length + 1))
            }, typingSpeed)

            return () => clearTimeout(timeout)
        }

        // Next line
        const timeout = setTimeout(() => {
            setCurrentOutputIndex(prev => prev + 1)
            setDisplayedText('')
        }, lineDelay)

        return () => clearTimeout(timeout)
    }, [
        displayedText,
        currentCommandIndex,
        currentOutputIndex,
        isTyping,
        commands,
        typingSpeed,
        lineDelay,
        commandDelay
    ])

    return (
        <div className="space-y-4 text-brutal-base font-mono">
            {commands.map((cmd, cmdIdx) => (
                <div key={cmdIdx}>
                    {cmdIdx < currentCommandIndex ||
                        (cmdIdx === currentCommandIndex && currentOutputIndex > 0) ? (
                        <>
                            <p className="text-punk-white mb-2">{cmd.prompt}</p>

                            <div className={`${cmd.color ?? 'text-punk-white'} space-y-1 mb-4`}>
                                {cmd.output.map((line, lineIdx) => (
                                    <p key={lineIdx}>
                                        {cmdIdx < currentCommandIndex || lineIdx < currentOutputIndex
                                            ? line
                                            : cmdIdx === currentCommandIndex &&
                                                lineIdx === currentOutputIndex
                                                ? displayedText + '█'
                                                : null}
                                    </p>
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>
            ))}

            {!isTyping && (
                <p className="text-neon-green cursor-blink">
                    $ _
                </p>
            )}
        </div>
    )
}
