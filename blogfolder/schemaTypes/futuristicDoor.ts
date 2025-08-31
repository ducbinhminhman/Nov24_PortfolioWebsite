import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'futuristicDoor',
  title: 'Futuristic Door',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'The thought or value displayed inside the door',
    }),
    defineField({
      name: 'date',
      title: 'Display Date',
      type: 'string',
      description: 'Date displayed on the UFO (e.g., "Dec 15"). If empty, will be auto-generated from createdAt date.',
      validation: Rule => Rule.max(20),
    }),
    defineField({
      name: 'createdAt',
      title: 'Creation Date',
      type: 'datetime',
      description: 'Date when this thought was created. Used to auto-generate the display date if not specified.',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Image representing this thought',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'initialX',
      title: 'Initial X Position',
      type: 'number',
      description: 'Initial X position on screen (0-1000)',
      validation: Rule => Rule.min(0).max(1000)
    }),
    defineField({
      name: 'initialY',
      title: 'Initial Y Position',
      type: 'number',
      description: 'Initial Y position on screen (0-1000)',
      validation: Rule => Rule.min(0).max(1000)
    }),
    defineField({
      name: 'initialVelocityX',
      title: 'Initial Velocity X',
      type: 'number',
      description: 'Initial X velocity (-5 to 5)',
      validation: Rule => Rule.min(-5).max(5)
    }),
    defineField({
      name: 'initialVelocityY',
      title: 'Initial Velocity Y',
      type: 'number',
      description: 'Initial Y velocity (-5 to 5)',
      validation: Rule => Rule.min(-5).max(5)
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which the door appears (lower numbers appear first)',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this door should be displayed',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'content',
      subtitle: 'date',
      media: 'image',
    },
  },
})
