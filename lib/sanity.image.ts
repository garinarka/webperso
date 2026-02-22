import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './sanity.client'
import { SanityImageSource } from '@sanity/image-url'

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
    return builder.image(source)
}

// Helper function for optimized images
export function getSanityImageUrl(source: SanityImageSource, width?: number, height?: number) {
    let image = urlFor(source).auto('format')

    if (width) {
        image = image.width(width)
    }

    if (height) {
        image = image.height(height)
    }

    return image.url()
}
