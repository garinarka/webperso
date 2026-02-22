import { groq } from 'next-sanity'

// Blog Post Queries
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    tags,
    featured,
    published,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }
`

export const publishedPostsQuery = groq`
  *[_type == "post" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    tags,
    featured,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    tags,
    featured,
    published,
    body,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }
`

export const featuredPostQuery = groq`
  *[_type == "post" && featured == true && published == true][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category,
    tags,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }
`

export const previousPostQuery = groq`
  *[_type == "post" && published == true && publishedAt < $publishedAt] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    category
  }
`

export const nextPostQuery = groq`
  *[_type == "post" && published == true && publishedAt > $publishedAt] | order(publishedAt asc)[0] {
    _id,
    title,
    slug,
    category
  }
`

// Project Queries - same as before
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, year desc) {
    _id,
    title,
    slug,
    description,
    longDescription,
    category,
    tags,
    liveUrl,
    githubUrl,
    featured,
    year,
    status,
    order,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    longDescription,
    category,
    tags,
    liveUrl,
    githubUrl,
    featured,
    year,
    status,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    "gallery": gallery[]{
      "url": asset->url,
      alt
    }
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, year desc) {
    _id,
    title,
    slug,
    description,
    category,
    tags,
    liveUrl,
    githubUrl,
    year,
    status,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }
`
