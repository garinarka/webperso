'use client'

import dynamic from 'next/dynamic'
import ScrollProgress from './ScrollProgress'
import BackToTop from './BackToTop'
import KonamiCode from './KonamiCode'

// Lazy load CustomCursor
const CustomCursor = dynamic(() => import('./CustomCursor'), {
    ssr: false,
    loading: () => null
})

export default function ClientProviders() {
    return (
        <>
            <ScrollProgress />
            <BackToTop />
            <CustomCursor color="yellow" />
            <KonamiCode />
        </>
    )
}
