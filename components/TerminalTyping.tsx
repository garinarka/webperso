'use client'

import { useState, useEffect } from 'react'

interface Command {
    prompt: string
    output: string[]
    color?: string
}

export default function TerminalTyping() {
    const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
    const [currentOutputIndex, setCurrentOutputIndex] = useState(0)
    const [displayedText, setDisplayedText] = useState('')
    const [isTyping, setIsTyping] = useState(true)

    const commands: Command[] = [
        {
            prompt: '$ whoami',
            output: [
                "hola! i'm jagaddhita",
                "my role is full-stack developer(?)",
                "i'm located at YKC",
                "i'm available for projects, btw"
            ],
            color: 'text-neon-yellow'
        },
        {
            prompt: '$ echo $vibe',
            output: [
                "i mix punk aesthetics with serious code",
                "ignore rules that restrict self-expression, build experiences that feel different",
                "no templates, no corporate BS",
            ],
            color: 'text-neon-pink'
        }
    ]

    useEffect(() => {
        if (!isTyping) return

        const currentCommand = commands[currentCommandIndex]
        const currentLine = currentCommand.output[currentOutputIndex]

        if (!currentLine) {
            // Move to next command
            if (currentCommandIndex < commands.length - 1) {
                setTimeout(() => {
                    setCurrentCommandIndex(prev => prev + 1)
                    setCurrentOutputIndex(0)
                    setDisplayedText('')
                }, 1000)
            } else {
                setIsTyping(false)
            }
            return
        }

        if (displayedText.length < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(currentLine.slice(0, displayedText.length + 1))
            }, 30)
            return () => clearTimeout(timeout)
        } else {
            // Move to next line
            setTimeout(() => {
                setCurrentOutputIndex(prev => prev + 1)
                setDisplayedText('')
            }, 500)
        }
    }, [displayedText, currentCommandIndex, currentOutputIndex, isTyping])

    const currentCommand = commands[currentCommandIndex]

    return (
        <div className="space-y-4 text-brutal-base font-mono">
            {commands.map((cmd, cmdIdx) => (
                <div key={cmdIdx}>
                    {cmdIdx < currentCommandIndex || (cmdIdx === currentCommandIndex && currentOutputIndex > 0) ? (
                        <>
                            <p className="text-punk-white mb-2">{cmd.prompt}</p>
                            <div className={`${cmd.color} space-y-1 mb-4`}>
                                {cmd.output.map((line, lineIdx) => (
                                    <p key={lineIdx}>
                                        {cmdIdx < currentCommandIndex || lineIdx < currentOutputIndex
                                            ? line
                                            : cmdIdx === currentCommandIndex && lineIdx === currentOutputIndex
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
