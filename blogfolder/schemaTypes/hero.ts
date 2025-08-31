import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title displayed in the hero section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'The subtitle or tagline displayed below the title',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'file',
      description: 'MP4 video file to be used as background in the Hero section',
      options: {
        accept: 'video/mp4'
      }
    }),
    defineField({
      name: 'mobileFallbackImage',
      title: 'Mobile Fallback Image',
      type: 'image',
      description: 'Image to display on mobile devices instead of video (optional)',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      description: 'Text for the primary CTA button',
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'url',
      description: 'URL for the primary CTA button',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      description: 'Text for the secondary CTA button',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'url',
      description: 'URL for the secondary CTA button',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this hero section currently active?',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'mobileFallbackImage',
    },
  },
})
