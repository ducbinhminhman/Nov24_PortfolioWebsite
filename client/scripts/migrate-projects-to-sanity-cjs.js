// scripts/migrate-projects-to-sanity-cjs.js
const { createClient } = require('@sanity/client');
// Trực tiếp require không dùng .default vì chúng ta đang sử dụng CJS
const portfolioInfo = require('../src/constants/portfolioInfo');
require('dotenv').config();

// Check if SANITY_TOKEN is available
if (!process.env.SANITY_TOKEN) {
  console.error('Error: SANITY_TOKEN environment variable is missing');
  console.error('Please create a .env file with your SANITY_TOKEN or provide it when running this script');
  console.error('Example: SANITY_TOKEN=your_token node scripts/migrate-projects-to-sanity-cjs.js');
  process.exit(1);
}

// Sanity client configuration
const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || 'e8s5muuk',
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN, // Read token from environment variable
  useCdn: false,
  apiVersion: process.env.REACT_APP_SANITY_API_VERSION || '2023-05-03',
});

// Convert date string to ISO format for Sanity
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toISOString();
};

// Process and import each project
async function importProjects() {
  try {
    console.log(`Found ${portfolioInfo.length} projects to import`);
    
    for (const project of portfolioInfo) {
      console.log(`Importing project: ${project.title}`);
      
      // Create project document in Sanity
      const doc = {
        _type: 'project',
        title: project.title,
        description: project.description,
        tools: project.tools || '',
        imageUrl: project.imageUrl,
        useDirectImageUrl: true, // Use direct URLs for migrated projects
        link: project.link,
        publishedAt: formatDate(project.date),
        featureLabel: project.featureLabel,
        featured: project.featureLabel === 'Pinned' || project.featureLabel === 'New',
        // Add default slug
        slug: {
          _type: 'slug',
          current: project.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
        }
      };

      // Create document in Sanity
      const result = await client.create(doc);
      console.log(`✅ Imported: ${result.title} with ID: ${result._id}`);
    }
    
    console.log('✨ All projects have been imported successfully!');
  } catch (error) {
    console.error('❌ Error importing projects:', error);
  }
}

// Run the import
importProjects();
