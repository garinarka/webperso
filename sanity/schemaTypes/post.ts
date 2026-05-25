import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Meta & SEO'},
    {name: 'engagement', title: 'Engagement'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'meta',
      rows: 3,
      description: 'Used in cards, SEO description, and RSS. Keep under 160 chars for best SEO.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          {title: 'Tutorial', value: 'tutorial'},
          {title: 'Thoughts', value: 'thoughts'},
          {title: 'Project', value: 'project'},
          {title: 'Rant', value: 'rant'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'meta',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      group: 'meta',
      description: 'Set to true to make this post visible on the site',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      description: 'Show this post in the featured slot on the blog list',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),

    // ── New engagement fields ─────────────────────────────────────────────────
    defineField({
      name: 'commentsEnabled',
      title: 'Comments enabled',
      type: 'boolean',
      group: 'engagement',
      description: 'Disable to close the comment section for this post only',
      initialValue: true,
    }),
    defineField({
      name: 'pinnedCommentId',
      title: 'Pinned comment ID',
      type: 'string',
      group: 'engagement',
      description: 'Optional. Paste a Redis comment UUID here to pin it at the top.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'category',
      published: 'published',
    },
    prepare({title, media, subtitle, published}) {
      return {
        title,
        subtitle: `${subtitle} ${published ? '✓' : '(draft)'}`,
        media,
      }
    },
  },
})
