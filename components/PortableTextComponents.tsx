import { PortableTextComponents } from '@portabletext/react'
import { createImageUrlBuilder } from '@sanity/image-url' // CHANGED
import { client } from '@/lib/sanity.client'
import Image from 'next/image'

// Create builder
const builder = createImageUrlBuilder(client)

function urlFor(source: any) {
    return builder.image(source)
}

export const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <div className="my-8">
                    <Image
                        src={urlFor(value).width(800).url()}
                        alt={value.alt || 'Blog image'}
                        width={800}
                        height={450}
                        className="border-brutal border-punk-white w-full"
                    />
                    {value.alt && (
                        <p className="text-brutal-xs font-mono text-punk-white/50 mt-2 text-center">
                            {value.alt}
                        </p>
                    )}
                </div>
            )
        },
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
            const target = !value.href.startsWith('/') ? '_blank' : undefined
            return (
                <a
                    href={value.href}
                    rel={rel}
                    target={target}
                    className="text-neon-yellow hover:text-punk-white underline"
                >
                    {children}
                </a>
            )
        },
    },
    block: {
        h1: ({ children }) => (
            <h1 className="text-brutal-4xl font-brutal text-punk-white mb-6 mt-8">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-brutal-3xl font-brutal text-neon-yellow mb-4 mt-8">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-brutal-2xl font-brutal text-neon-green mb-4 mt-6">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-brutal-xl font-brutal text-neon-pink mb-3 mt-4">
                {children}
            </h4>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-brutal border-neon-yellow pl-6 py-2 my-6 italic text-punk-white/80">
                {children}
            </blockquote>
        ),
        normal: ({ children }) => (
            <p className="font-mono text-brutal-base text-punk-white/80 mb-4 leading-relaxed">
                {children}
            </p>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-none ml-6 mb-6 space-y-2">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="list-none ml-6 mb-6 space-y-2">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="font-mono text-brutal-base text-punk-white/80 flex items-center">
                <span className="text-neon-yellow mr-3">→</span>
                <span>{children}</span>
            </li>
        ),
        number: ({ children, index }) => (
            <li className="font-mono text-brutal-base text-punk-white/80 flex items-center">
                <span className="text-neon-green mr-3">{(index || 0) + 1}.</span>
                <span>{children}</span>
            </li>
        ),
    },
}
