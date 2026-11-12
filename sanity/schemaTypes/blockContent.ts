import { defineType, defineArrayMember } from 'sanity';

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2 (Section Heading)', value: 'h2' },
        { title: 'H3 (Sub-heading)', value: 'h3' },
        { title: 'H4 (Minor Heading)', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet List', value: 'bullet' },
        { title: 'Numbered List', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            title: 'URL Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility and SEO',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineArrayMember({
      title: 'Callout Box',
      name: 'callout',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Callout Type',
          type: 'string',
          options: {
            list: [
              { title: 'Medical Note (Red)', value: 'medical' },
              { title: 'Info (Blue)', value: 'info' },
              { title: 'Warning (Yellow)', value: 'warning' },
              { title: 'Tip (Green)', value: 'tip' },
            ],
          },
          initialValue: 'medical',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'text',
          rows: 3,
        },
      ],
      preview: {
        select: {
          title: 'title',
          subtitle: 'type',
        },
      },
    }),
  ],
});
