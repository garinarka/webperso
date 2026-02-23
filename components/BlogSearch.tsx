'use client'

import { useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'

interface BlogSearchProps {
    onSearch: (query: string) => void
    resultCount: number
    totalCount: number
}

export default function BlogSearch({ onSearch, resultCount, totalCount }: BlogSearchProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    const handleSearch = useCallback((value: string) => {
        setSearchQuery(value)
        onSearch(value)
    }, [onSearch])

    const clearSearch = () => {
        setSearchQuery('')
        onSearch('')
    }

    return (
        <div className="mb-8">
            {/* Search Box */}
            <div className={`
        relative border-brutal transition-colors duration-0
        ${isFocused ? 'border-neon-yellow' : 'border-punk-white'}
      `}>
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Search className="w-5 h-5 text-punk-white/50" />
                </div>

                {/* Input */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search posts by title, excerpt, or tags..."
                    className="
            w-full px-12 py-4 
            bg-punk-black text-punk-white 
            font-mono text-brutal-base
            placeholder:text-punk-white/30
            focus:outline-none
          "
                />

                {/* Clear Button */}
                {searchQuery && (
                    <button
                        onClick={clearSearch}
                        className="
              absolute right-4 top-1/2 -translate-y-1/2
              text-punk-white/50 hover:text-neon-red
              transition-colors duration-0
            "
                        aria-label="Clear search"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Search Results Info */}
            {searchQuery && (
                <div className="mt-3 font-mono text-brutal-sm text-punk-white/70">
                    {resultCount > 0 ? (
                        <>
                            Found <span className="text-neon-yellow">{resultCount}</span> post{resultCount !== 1 ? 's' : ''}
                            {' '}matching <span className="text-neon-green">"{searchQuery}"</span>
                        </>
                    ) : (
                        <>
                            No posts found for <span className="text-neon-red">"{searchQuery}"</span>
                            {' '}• Try different keywords
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
