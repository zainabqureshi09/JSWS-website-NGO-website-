import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fieldsets: [
    { name: 'content', title: 'CONTENT', options: { collapsible: false } },
    { name: 'media', title: 'MEDIA', options: { collapsible: true, collapsed: false } },
    { name: 'authorInfo', title: 'AUTHOR', options: { collapsible: true, collapsed: false } },
    { name: 'classification', title: 'CLASSIFICATION', options: { collapsible: true, collapsed: false } },
    { name: 'publishing', title: 'PUBLISHING', options: { collapsible: true, collapsed: false } },
    { name: 'seo', title: 'SEO METADATA', options: { collapsible: true, collapsed: true } },
    { name: 'medical', title: 'MEDICAL & REFERENCES', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // CONTENT
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      fieldset: 'content',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      fieldset: 'content',
      rows: 3,
      description: 'A brief summary of the article displayed on blog cards and search results.',
      validation: (Rule) => Rule.required().min(20).max(300),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'blockContent',
      fieldset: 'content',
      validation: (Rule) => Rule.required(),
    }),

    // MEDIA
    defineField({
      name: 'featuredImage',
      title: 'Featured Main Image',
      type: 'image',
      fieldset: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Required for accessibility and SEO.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image (Social Sharing)',
      type: 'image',
      fieldset: 'media',
      description: 'Optional custom image for Facebook/Twitter previews. Defaults to Featured Image if empty.',
      options: { hotspot: true },
    }),

    // AUTHOR
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      fieldset: 'authorInfo',
    }),
    defineField({
      name: 'authorDesignation',
      title: 'Author Designation Override',
      type: 'string',
      fieldset: 'authorInfo',
      description: 'Optional title/qualifications override (e.g. MBBS, FCPS, Senior Consultant).',
    }),

    // CLASSIFICATION
    defineField({
      name: 'category',
      title: 'Primary Category',
      type: 'reference',
      to: [{ type: 'category' }],
      fieldset: 'classification',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      fieldset: 'classification',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),

    // PUBLISHING
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      fieldset: 'publishing',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated Date',
      type: 'datetime',
      fieldset: 'publishing',
    }),
    defineField({
      name: 'readingTime',
      title: 'Estimated Reading Time (minutes)',
      type: 'number',
      fieldset: 'publishing',
      description: 'Defaults to 5 min if empty.',
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article (Show in Hero)',
      type: 'boolean',
      fieldset: 'publishing',
      initialValue: false,
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Meta Title',
      type: 'string',
      fieldset: 'seo',
      description: 'Ideal length 50-60 characters.',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      fieldset: 'seo',
      rows: 2,
      description: 'Ideal length 120-160 characters for search engines.',
      validation: (Rule) => Rule.max(170),
    }),

    // MEDICAL & REFERENCES
    defineField({
      name: 'medicalDisclaimer',
      title: 'Custom Medical Disclaimer',
      type: 'text',
      fieldset: 'medical',
      rows: 3,
      description: 'Optional custom medical disclaimer for this specific article. If left empty, default JSWS disclaimer will be used.',
    }),
    defineField({
      name: 'references',
      title: 'Medical & Academic References',
      type: 'array',
      fieldset: 'medical',
      description: 'Citations, scientific journal links, or guidelines.',
      of: [
        defineField({
          name: 'referenceItem',
          title: 'Reference Item',
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Citation Title / Paper' },
            { name: 'url', type: 'url', title: 'Link (DOI, PubMed, WHO, etc.)' },
            { name: 'journal', type: 'string', title: 'Journal / Publisher' },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      category: 'category.name',
      media: 'featuredImage',
      date: 'publishedAt',
    },
    prepare({ title, author, category, media, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : '';
      return {
        title,
        subtitle: `${category || 'Uncategorized'} | By ${author || 'JSWS Team'} (${formattedDate})`,
        media,
      };
    },
  },
});
