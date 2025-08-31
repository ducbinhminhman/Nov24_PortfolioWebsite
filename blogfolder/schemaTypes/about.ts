import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Your name displayed in the about section',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'The small tag displayed above your role (e.g., "Try Creative")',
    }),
    defineField({
      name: 'role',
      title: 'Professional Role',
      type: 'string',
      description: 'Your professional role (e.g., "Developer & Data Analyst")',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'A short description about yourself and your professional focus',
    }),
    defineField({
      name: 'profileImage',
      title: 'Homepage Profile Image',
      type: 'image',
      description: 'Your profile image displayed in the homepage about section (square or horizontal format recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'futuristicProfileImage',
      title: 'Futuristic Page Profile Image',
      type: 'image',
      description: 'Your profile image for the futuristic about page (vertical portrait format recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'URL to your LinkedIn profile',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Your email address for the contact button',
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume PDF',
      type: 'file',
      description: 'Your resume PDF file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'year', 
              title: 'Year', 
              type: 'string' 
            },
            { 
              name: 'description', 
              title: 'Description', 
              type: 'text' 
            }
          ]
        }
      ],
      description: 'List of your achievements with year and description',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this about section currently active?',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
    },
  },
})
