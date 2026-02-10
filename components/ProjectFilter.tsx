'use client'

interface ProjectFilterProps {
    activeFilter: string
    onFilterChange: (filter: string) => void
}

export default function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
    const filters = [
        { id: 'all', label: 'ALL' },
        { id: 'featured', label: 'FEATURED' },
        { id: 'web', label: 'WEB' },
        { id: 'design', label: 'DESIGN' },
        { id: 'mobile', label: 'MOBILE' },
        { id: 'experiment', label: 'EXPERIMENTS' },
    ]

    return (
        <div className="flex flex-wrap gap-3 justify-center mb-12">
            {filters.map((filter) => {
                const isActive = activeFilter === filter.id

                return (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`
              font-mono text-brutal-sm px-4 py-2 border-brutal transition-colors duration-0
              ${isActive
                                ? 'bg-neon-yellow text-punk-black border-neon-yellow'
                                : 'bg-punk-black text-punk-white border-punk-white hover:border-neon-yellow hover:text-neon-yellow'
                            }
            `}
                    >
                        {filter.label}
                    </button>
                )
            })}
        </div>
    )
}
