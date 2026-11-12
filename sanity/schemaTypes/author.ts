import { defineField, defineType } from 'sanity';

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'designation',
      title: 'Designation / Medical Title',
      type: 'string',
      description: 'e.g. Senior Consultant Ophthalmologist, MBBS, FCPS',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'organization',
      title: 'Organization / Hospital',
      type: 'string',
      initialValue: 'Jamila Sultan Welfare Society (JSWS)',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'twitter', type: 'url', title: 'Twitter / X URL' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
        { name: 'website', type: 'url', title: 'Personal Website URL' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'designation',
      media: 'profileImage',
    },
  },
});
