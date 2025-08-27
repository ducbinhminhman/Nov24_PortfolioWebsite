// src/lib/sanity.js
import { createClient } from '@sanity/client';
import blogInfo from '../constants/blogInfo'; // Import static blog info as fallback

export const client = createClient({
  projectId: 'e8s5muuk', // Sanity Project ID
  dataset: 'production', // or the name you chose
  useCdn: false, // Đặt thành false để sử dụng API trực tiếp
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

// Helper function to get all blog posts
export async function getAllPosts() {
  try {
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      description,
      useDirectImageUrl,
      "imageUrl": select(
        useDirectImageUrl == true => imageUrl,
        mainImage.asset->url
      ),
      publishedAt,
      link,
      featureLabel
    }`);
    
    return posts.length > 0 ? posts : formatStaticBlogInfo();
  } catch (error) {
    console.error("Error fetching from Sanity, using static data:", error);
    return formatStaticBlogInfo();
  }
}

// Helper function to get featured posts
export async function getFeaturedPosts() {
  try {
    const posts = await client.fetch(`*[_type == "post" && defined(featureLabel)] | order(publishedAt desc) {
      _id,
      title,
      description,
      useDirectImageUrl,
      "imageUrl": select(
        useDirectImageUrl == true => imageUrl,
        mainImage.asset->url
      ),
      publishedAt,
      link,
      featureLabel
    }`);
    
    return posts.length > 0 ? posts : formatStaticBlogInfo().filter(post => post.featureLabel);
  } catch (error) {
    console.error("Error fetching from Sanity, using static data:", error);
    return formatStaticBlogInfo().filter(post => post.featureLabel);
  }
}

// Helper function to get latest post
export async function getLatestPost() {
  try {
    const posts = await client.fetch(`*[_type == "post" && featureLabel == "Latest"] | order(publishedAt desc)[0] {
      _id,
      title,
      description,
      useDirectImageUrl,
      "imageUrl": select(
        useDirectImageUrl == true => imageUrl,
        mainImage.asset->url
      ),
      publishedAt,
      link,
      featureLabel
    }`);
    
    return posts ? posts : formatStaticBlogInfo().find(post => post.featureLabel === "Latest");
  } catch (error) {
    console.error("Error fetching from Sanity, using static data:", error);
    return formatStaticBlogInfo().find(post => post.featureLabel === "Latest");
  }
}

// Format static blog info to match Sanity structure
function formatStaticBlogInfo() {
  return blogInfo.map((post, index) => ({
    _id: `static-${index}`,
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    publishedAt: post.date,
    link: post.link,
    featureLabel: post.featureLabel
  }));
}
