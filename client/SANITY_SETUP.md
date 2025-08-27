# Sanity Blog Schema for Portfolio Website

This document describes the schema modifications needed in your Sanity Studio to match your existing blog data structure.

## Post Schema

You need to modify the post.ts schema in your Sanity Studio to include the following fields:

```javascript
// schemaTypes/post.ts
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief summary of the article content',
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      description: 'Cover image for the article',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      description: 'Publication date (used for sorting)',
      validation: Rule => Rule.required()
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'URL to the full article (e.g. Medium)',
      validation: Rule => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Mark this article as featured (will show up as "Pinned")',
      initialValue: false
    },
    {
      name: 'isLatest',
      title: 'Latest Article',
      type: 'boolean',
      description: 'Mark this article as the latest (will show "Latest" label)',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage'
    }
  }
}
```

## Sanity Configuration Steps

1. Navigate to your Sanity Studio folder:
   ```
   cd C:\dev\portfolioweb\Nov24_PortfolioWebsite\blogfolder
   ```

2. Open the `schemaTypes/post.ts` file and replace its contents with the schema above.

3. Start the Sanity Studio:
   ```
   npm run dev
   ```

4. Access the Sanity Studio in your browser (typically at http://localhost:3333)

5. Create blog posts that match your existing data structure

6. Update your Sanity client configuration in your React app with your project ID:
   ```javascript
   // In src/lib/sanity.js
   projectId: 'your-project-id', // Replace with your actual project ID
   ```

## Finding Your Project ID

You can find your Sanity project ID in the following locations:
- In the Sanity Studio URL when you're logged in (it's in the URL path)
- In the sanity.config.ts file in your Sanity Studio project
- By running `sanity debug` in your Sanity Studio folder

## Content Migration

Once your schema is set up, you'll need to manually create blog posts in Sanity Studio or use a migration script to import your existing data.
