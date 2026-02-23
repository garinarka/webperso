import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            validation: Rule => Rule.required().max(200)
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                }
            ]
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Tutorial', value: 'tutorial' },
                    { title: 'Thoughts', value: 'thoughts' },
                    { title: 'Project', value: 'project' },
                    { title: 'Rant', value: 'rant' },
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'published',
            title: 'Published',
            type: 'boolean',
            description: 'Set to true to publish this post',
            initialValue: false,
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
            validation: Rule => Rule.required()
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            subtitle: 'category',
            published: 'published'
        },
        prepare(selection) {
            const { title, media, subtitle, published } = selection
            return {
                title: title,
                subtitle: `${subtitle} ${published ? '✓' : '(draft)'}`,
                media: media
            }
        }
    },
})
