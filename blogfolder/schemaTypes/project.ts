import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'tools',
      title: 'Tools Used',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
    }),
    defineField({
      name: 'featureLabel',
      title: 'Feature Label',
      type: 'string',
      description: 'Optional label like "Pinned", "New", etc.'
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark this project to appear at the top of the portfolio page',
      initialValue: false
    }),
    defineField({
      name: 'firstFeatured',
      title: 'First Homepage Featured',
      type: 'boolean',
      description: 'Mark this project to appear in the first card on the homepage',
      initialValue: false
    }),
    defineField({
      name: 'secondFeatured',
      title: 'Second Homepage Featured',
      type: 'boolean',
      description: 'Mark this project to appear in the second card on the homepage',
      initialValue: false
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
      description: 'Direct URL to project image'
    }),
    defineField({
      name: 'useDirectImageUrl',
      title: 'Use Direct Image URL',
      type: 'boolean',
      description: 'Select when you want to use direct URL instead of uploading an image',
      initialValue: false
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description: 'Project completion date (used for sorting)'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
