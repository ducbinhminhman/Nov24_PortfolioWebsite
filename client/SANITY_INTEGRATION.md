# Integrating Sanity.io with Your Portfolio Website

This guide will help you set up Sanity.io as a CMS for your blog articles.

## Prerequisites

- Node.js installed
- Your React portfolio website project
- A Sanity.io account (free tier available)

## Setup Steps

### 1. Sanity Studio Setup

The Sanity Studio is already set up in the `blogfolder` directory. To continue setting it up:

```bash
# Navigate to the Sanity Studio folder
cd blogfolder

# Start the Sanity Studio development server
npm run dev
```

Access the Sanity Studio at http://localhost:3333 and log in with your credentials.

### 2. Update Your Project ID

Find your Sanity project ID in the Sanity Studio dashboard or in the `sanity.config.ts` file. Then update it in:

```javascript
// src/lib/sanity.js
projectId: 'your-project-id', // Replace with your actual project ID
```

### 3. Create Blog Content in Sanity

Use the Sanity Studio to create blog posts with the following fields:
- Title
- Description
- Main Image (upload an image)
- Published At (date)
- External Link (URL to the full article)
- Featured (boolean - marks as "Pinned")
- Is Latest (boolean - marks as "Latest")

### 4. Migrate Existing Blog Data (Optional)

To import your existing blog data to Sanity:

1. Get a write token from the Sanity management console (https://sanity.io/manage)
2. Update the token in the migration script:
   ```javascript
   // scripts/migrate-blog-to-sanity.js
   token: 'YOUR_WRITE_TOKEN',
   ```

3. Run the migration script:
   ```bash
   cd client
   node scripts/migrate-blog-to-sanity.js
   ```

### 5. Test Your Integration

The application is set up to fall back to your static blog data if the Sanity API is not available, so you can test and transition smoothly.

## Schema Structure

The Sanity schema for blog posts matches your existing data structure:

- `title`: Article title
- `description`: Brief summary of the article content
- `mainImage`: Cover image for the article
- `publishedAt`: Publication date (used for sorting)
- `externalLink`: URL to the full article
- `featured`: Special label for pinned articles
- `isLatest`: Special label for the latest article

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity React Hooks](https://www.sanity.io/docs/react-hooks)

## Troubleshooting

If you encounter issues:

1. Check your Sanity project ID and dataset name
2. Ensure your Sanity project is publicly accessible or use a token for private datasets
3. Verify your schema structure matches what your queries expect
4. Check browser console for detailed error messages
