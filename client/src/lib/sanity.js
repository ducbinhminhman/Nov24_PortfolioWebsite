// src/lib/sanity.js
import { createClient } from '@sanity/client';
import blogInfo from '../constants/blogInfo'; // Import static blog info as fallback
import portfolioInfo from '../constants/portfolioInfo'; // Import static portfolio info as fallback

// Get Sanity configuration from environment variables with fallbacks
const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || 'e8s5muuk';
const dataset = process.env.REACT_APP_SANITY_DATASET || 'production';
const apiVersion = process.env.REACT_APP_SANITY_API_VERSION || '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  useCdn: false, // Đặt thành false để sử dụng API trực tiếp
  apiVersion,
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
    const posts = await client.fetch(`*[_type == "post" && featured == true] | order(publishedAt desc) {
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
    
    return posts.length > 0 ? posts : formatStaticBlogInfo().filter(post => post.featured || post.featureLabel === "Pinned");
  } catch (error) {
    console.error("Error fetching from Sanity, using static data:", error);
    return formatStaticBlogInfo().filter(post => post.featured || post.featureLabel === "Pinned");
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
    featureLabel: post.featureLabel,
    featured: post.featureLabel === "Pinned" || post.featureLabel === "Latest"
  }));
}

// Helper function to get all projects
export async function getAllProjects() {
  try {
    const projects = await client.fetch(`*[_type == "project"] | order(publishedAt desc) {
      _id,
      title,
      description,
      tools,
      useDirectImageUrl,
      "imageUrl": select(
        useDirectImageUrl == true => imageUrl,
        mainImage.asset->url
      ),
      publishedAt,
      link,
      featureLabel,
      featured
    }`);
    
    return projects.length > 0 ? projects : formatStaticProjectInfo();
  } catch (error) {
    console.error("Error fetching projects from Sanity, using static data:", error);
    return formatStaticProjectInfo();
  }
}

// Helper function to get featured projects
export async function getFeaturedProjects() {
  try {
    const projects = await client.fetch(`*[_type == "project" && (featured == true || defined(featureLabel))] | order(publishedAt desc) {
      _id,
      title,
      description,
      tools,
      useDirectImageUrl,
      "imageUrl": select(
        useDirectImageUrl == true => imageUrl,
        mainImage.asset->url
      ),
      publishedAt,
      link,
      featureLabel,
      featured
    }`);
    
    return projects.length > 0 ? projects : formatStaticProjectInfo().filter(project => project.featured || project.featureLabel);
  } catch (error) {
    console.error("Error fetching featured projects from Sanity, using static data:", error);
    return formatStaticProjectInfo().filter(project => project.featured || project.featureLabel);
  }
}

// Format static project info to match Sanity structure
function formatStaticProjectInfo() {
  return portfolioInfo.map((project, index) => ({
    _id: `static-project-${index}`,
    title: project.title,
    description: project.description,
    tools: project.tools || "",
    imageUrl: project.imageUrl,
    publishedAt: project.date,
    link: project.link,
    featureLabel: project.featureLabel,
    featured: project.featureLabel === "Pinned" || project.featureLabel === "New"
  }));
}

// Helper function to get the first featured project for the homepage Card
export async function getFirstFeaturedProject() {
  try {
    // Trước tiên tìm dự án có firstFeatured = true
    let project = await client.fetch(`*[_type == "project" && firstFeatured == true] | order(publishedAt desc)[0] {
      _id,
      title,
      description,
      tools,
      useDirectImageUrl,
      "imageUrl": select(
        useDirectImageUrl == true => imageUrl,
        mainImage.asset->url
      ),
      publishedAt,
      link,
      featureLabel,
      featured
    }`);
    
    // Nếu không tìm thấy, lấy dự án đầu tiên có featured = true
    if (!project) {
      project = await client.fetch(`*[_type == "project" && featured == true] | order(publishedAt desc)[0] {
        _id,
        title,
        description,
        tools,
        useDirectImageUrl,
        "imageUrl": select(
          useDirectImageUrl == true => imageUrl,
          mainImage.asset->url
        ),
        publishedAt,
        link,
        featureLabel,
        featured
      }`);
    }
    
    // Nếu vẫn không tìm thấy, lấy dự án mới nhất
    if (!project) {
      project = await client.fetch(`*[_type == "project"] | order(publishedAt desc)[0] {
        _id,
        title,
        description,
        tools,
        useDirectImageUrl,
        "imageUrl": select(
          useDirectImageUrl == true => imageUrl,
          mainImage.asset->url
        ),
        publishedAt,
        link,
        featureLabel,
        featured
      }`);
    }
    
    // Nếu không có dự án nào từ Sanity, sử dụng dữ liệu tĩnh
    if (!project) {
      // Ưu tiên dự án có featureLabel = "Pinned" và vị trí đầu tiên
      const staticProjects = formatStaticProjectInfo();
      const firstPinned = staticProjects.find(p => p.featureLabel === "Pinned");
      return firstPinned || staticProjects[0];
    }
    
    return project;
  } catch (error) {
    console.error("Error fetching first featured project from Sanity, using static data:", error);
    const staticProjects = formatStaticProjectInfo();
    const firstPinned = staticProjects.find(p => p.featureLabel === "Pinned");
    return firstPinned || staticProjects[0];
  }
}

// Helper function to get the second featured project for the homepage ReverseCard
export async function getSecondFeaturedProject() {
  try {
    // Trước tiên tìm dự án có secondFeatured = true
    let project = await client.fetch(`*[_type == "project" && secondFeatured == true] | order(publishedAt desc)[0] {
      _id,
      title,
      description,
      tools,
      useDirectImageUrl,
      "imageUrl": select(
        useDirectImageUrl == true => imageUrl,
        mainImage.asset->url
      ),
      publishedAt,
      link,
      featureLabel,
      featured
    }`);
    
    // Nếu không tìm thấy, lấy dự án thứ hai có featured = true
    if (!project) {
      const featuredProjects = await client.fetch(`*[_type == "project" && featured == true] | order(publishedAt desc)[0...2] {
        _id,
        title,
        description,
        tools,
        useDirectImageUrl,
        "imageUrl": select(
          useDirectImageUrl == true => imageUrl,
          mainImage.asset->url
        ),
        publishedAt,
        link,
        featureLabel,
        featured
      }`);
      
      if (featuredProjects.length > 1) {
        project = featuredProjects[1]; // Lấy dự án thứ hai
      }
    }
    
    // Nếu vẫn không tìm thấy, lấy dự án mới thứ hai
    if (!project) {
      const projects = await client.fetch(`*[_type == "project"] | order(publishedAt desc)[0...2] {
        _id,
        title,
        description,
        tools,
        useDirectImageUrl,
        "imageUrl": select(
          useDirectImageUrl == true => imageUrl,
          mainImage.asset->url
        ),
        publishedAt,
        link,
        featureLabel,
        featured
      }`);
      
      if (projects.length > 1) {
        project = projects[1]; // Lấy dự án thứ hai
      }
    }
    
    // Nếu không có dự án nào từ Sanity, sử dụng dữ liệu tĩnh
    if (!project) {
      // Ưu tiên dự án có featureLabel = "Pinned" và vị trí thứ hai
      const staticProjects = formatStaticProjectInfo();
      const pinnedProjects = staticProjects.filter(p => p.featureLabel === "Pinned");
      
      if (pinnedProjects.length > 1) {
        return pinnedProjects[1]; // Lấy dự án ghim thứ hai
      } else {
        return staticProjects.length > 1 ? staticProjects[1] : staticProjects[0];
      }
    }
    
    return project;
  } catch (error) {
    console.error("Error fetching second featured project from Sanity, using static data:", error);
    const staticProjects = formatStaticProjectInfo();
    const pinnedProjects = staticProjects.filter(p => p.featureLabel === "Pinned");
    
    if (pinnedProjects.length > 1) {
      return pinnedProjects[1]; // Lấy dự án ghim thứ hai
    } else {
      return staticProjects.length > 1 ? staticProjects[1] : staticProjects[0];
    }
  }
}

// Get the active hero section data
export async function getHeroData() {
  try {
    const heroData = await client.fetch(`*[_type == "hero" && active == true][0] {
      title,
      subtitle,
      "backgroundVideoUrl": backgroundVideo.asset->url,
      "mobileFallbackImageUrl": mobileFallbackImage.asset->url,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink
    }`);
    
    return heroData || null;
  } catch (error) {
    console.error("Error fetching hero data from Sanity:", error);
    return null;
  }
}

// Get the active about section data
export async function getAboutData() {
  try {
    const aboutData = await client.fetch(`*[_type == "about" && active == true][0] {
      name,
      tagline,
      role,
      bio,
      "profileImageUrl": profileImage.asset->url,
      "futuristicProfileImageUrl": futuristicProfileImage.asset->url,
      linkedinUrl,
      email,
      "resumeUrl": resumeFile.asset->url,
      achievements[] {
        year,
        description
      }
    }`);
    
    return aboutData || null;
  } catch (error) {
    console.error("Error fetching about data from Sanity:", error);
    return null;
  }
}

// Get futuristic door data (phi thuyền)
export async function getFuturisticDoors() {
  try {
    const doors = await client.fetch(`*[_type == "futuristicDoor" && active == true] | order(order asc) {
      _id,
      content,
      date,
      createdAt,
      "imageUrl": image.asset->url,
      initialX,
      initialY,
      initialVelocityX,
      initialVelocityY,
      order
    }`);
    
    // Process the date field - if date is empty, format createdAt to "MMM DD" format
    const processedDoors = doors.map(door => {
      if (!door.date && door.createdAt) {
        const dateObj = new Date(door.createdAt);
        const month = dateObj.toLocaleString('en-US', { month: 'short' });
        const day = dateObj.getDate();
        door.date = `${month} ${day}`;
      }
      return door;
    });
    
    return processedDoors || [];
  } catch (error) {
    console.error("Error fetching futuristic doors from Sanity:", error);
    // Fallback to static data
    return [
      {
        _id: 'door1',
        content: 'Creativity is the key to innovation',
        date: 'Dec 15',
        createdAt: '2025-12-15T12:00:00Z',
        imageUrl: '/logo.svg',
        initialX: 100,
        initialY: 200,
        initialVelocityX: 1.5,
        initialVelocityY: -1.3,
        order: 1
      },
      {
        _id: 'door2',
        content: 'Learning never stops',
        date: 'Jan 21',
        createdAt: '2025-01-21T12:00:00Z',
        imageUrl: '/logo.svg',
        initialX: 500,
        initialY: 300,
        initialVelocityX: -1.8,
        initialVelocityY: 1.2,
        order: 2
      },
      {
        _id: 'door3',
        content: 'Technology should empower people',
        date: 'Mar 8',
        createdAt: '2025-03-08T12:00:00Z',
        imageUrl: '/logo.svg',
        initialX: 800,
        initialY: 150,
        initialVelocityX: -1.2,
        initialVelocityY: -1.5,
        order: 3
      },
      {
        _id: 'door4',
        content: 'Continuous improvement is the path to excellence',
        date: 'Apr 12',
        createdAt: '2025-04-12T12:00:00Z',
        imageUrl: '/logo.svg',
        initialX: 300,
        initialY: 400,
        initialVelocityX: 2.0,
        initialVelocityY: 1.0,
        order: 4
      },
      {
        _id: 'door5',
        content: 'Adapt, evolve, and innovate',
        date: 'May 25',
        createdAt: '2025-05-25T12:00:00Z',
        imageUrl: '/logo.svg',
        initialX: 600,
        initialY: 100,
        initialVelocityX: -1.8,
        initialVelocityY: 1.8,
        order: 5
      }
    ];
  }
}
