// scripts/migrate-blog-to-sanity.js
// This script helps you migrate your existing blog data to Sanity

const { createClient } = require('@sanity/client');
const blogInfo = require('./BlogInfoCommonJS');

// Configure your Sanity client
const client = createClient({
  projectId: 'e8s5muuk', // Project ID from sanity.config.ts
  dataset: 'production',
  token: 'sklLANDloeI7TBgbOofM1wuzasvtacnAY2N9fFio2zLCAeZwXxj3JTgvB89QDa4UrMjH7ygsf2rpPs1NXd8CnVa52ETER2eKX0zjCsQHlxKtrHjn3hPj6S1lkNHJAWDcDmeT2zBv9hRKrLXkIGHenUkmXO2N8XKJBfiZdCVfMc6ujG9VSVsb', // IMPORTANT: Replace with your write token from sanity.io/manage
  apiVersion: '2023-05-03',
  useCdn: false, // We need to use the API directly for writes
});

// Import node-fetch cho Node.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Function to delete all existing posts
async function deleteAllPosts() {
  try {
    // Fetch all existing posts
    const query = `*[_type == "post"]`;
    const existingPosts = await client.fetch(query);
    console.log(`Found ${existingPosts.length} existing posts to delete.`);
    
    // Delete each post
    for (const post of existingPosts) {
      await client.delete(post._id);
      console.log(`Deleted post: ${post.title || post._id}`);
    }
    
    console.log('All existing posts deleted successfully.');
  } catch (error) {
    console.error('Error deleting existing posts:', error);
  }
}

// Function to upload an image to Sanity from a URL
async function uploadImageFromUrl(imageUrl) {
  try {
    // Tải hình ảnh từ URL
    const response = await fetch(imageUrl);
    const imageBuffer = await response.buffer();
    
    // Tạo asset từ buffer
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: imageUrl.split('/').pop(),
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Error uploading image from ${imageUrl}, will use direct URL instead:`, error);
    // Trả về null để biết là không tải được, sẽ dùng URL trực tiếp
    return null;
  }
}

// Function to migrate all blog posts
async function migrateBlogPosts() {
  for (const post of blogInfo) {
    try {
      // Thử tải ảnh lên, nếu không được sẽ dùng URL trực tiếp
      let mainImage = null;
      let useDirectImageUrl = true;
      
      try {
        // Thử tải ảnh lên Sanity
        mainImage = await uploadImageFromUrl(post.imageUrl);
        if (mainImage) {
          useDirectImageUrl = false; // Nếu tải được thì dùng hình ảnh đã tải
          console.log(`✅ Uploaded image for: ${post.title}`);
        } else {
          useDirectImageUrl = true; // Không tải được thì dùng URL trực tiếp
          console.log(`⚠️ Using direct URL for: ${post.title}`);
        }
      } catch (imgError) {
        console.log(`⚠️ Using direct URL for: ${post.title} due to error: ${imgError.message}`);
        useDirectImageUrl = true;
      }
      
      // Determine if this is a featured/pinned post
      const featured = post.featureLabel === 'Pinned';
      const isLatest = post.featureLabel === 'Latest';

      // Convert date format from YYYY-MM-DD to ISO string
      const publishedAt = new Date(post.date).toISOString();
      
      // Tạo slug từ title
      const slug = {
        _type: 'slug',
        current: post.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
      };

      // Chuẩn bị dữ liệu cơ bản
      const postData = {
        _type: 'post',
        title: post.title,
        description: post.description,
        slug: slug,
        publishedAt: publishedAt,
        link: post.link,
        featureLabel: post.featureLabel,
        useDirectImageUrl: useDirectImageUrl,
        imageUrl: post.imageUrl
      };
      
      // Thêm mainImage nếu tải lên thành công
      if (!useDirectImageUrl && mainImage) {
        postData.mainImage = mainImage;
      }

      // Tạo document post khớp với schema mới
      const result = await client.create(postData);

      console.log(`✅ Migrated post: ${post.title}`);
    } catch (error) {
      console.error(`❌ Failed to migrate post: ${post.title}`);
      console.error(error);
    }
  }
}

// Run the migration
async function run() {
  try {
    // Xóa tất cả các bài viết cũ trước
    await deleteAllPosts();
    
    // Sau đó thêm các bài viết mới
    await migrateBlogPosts();
    
    console.log('Migration completed!');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

run();
