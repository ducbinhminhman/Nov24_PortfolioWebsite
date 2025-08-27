// Blog.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFeaturedPosts, getAllPosts } from '../lib/sanity';

// Dữ liệu mặc định để hiển thị khi đang tải
const defaultBlogPosts = [
  {
    title: "Building Beautiful UIs Fast",
    description: "Create stunning UIs quickly and efficiently with Tailwind CSS component libraries, skipping the hassle of designing from scratch.",
    link: "https://medium.com/@bnhminh_38309/building-beautiful-uis-fast-how-i-stopped-designing-from-scratch-and-started-using-tailwind-808438f3a755",
    imageUrl: "https://images.unsplash.com/photo-1730708267873-a8a51afa6f67?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featureLabel: "Latest"
  },
  {
    title: "Build an AI-Powered Recipe Generator ",
    description: "Leverages OpenAI to generate personalized recipes based on user preferences and ingredients. This hands-on guide combines the power of AI with a user-friendly web app, making cooking easier and more innovative.",
    link: "https://medium.com/@bnhminh_38309/build-an-ai-powered-recipe-generator-with-react-and-express-abc453b1f99c?sk=ba0daff2525b3f3a0fc8956d46297771",
    imageUrl: "https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
  },
  {
    title: "Launching Your Journey in LSTM Stock Predictions",
    description: "Learn how to use LSTM networks for stock price predictions, from data setup to model evaluation, in this beginner-friendly guide to AI in finance.",
    link: "https://medium.com/dev-genius/a-beginners-guide-to-predicting-stock-prices-with-lstm-networks-278070252731?sk=3e6073d85783d250e3a7114ea744b53f",
    imageUrl: "https://plus.unsplash.com/premium_photo-1701121214648-245e9c86cc92?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState(defaultBlogPosts);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        // Lấy bài viết từ Sanity
        const featuredPosts = await getFeaturedPosts();
        const allPosts = await getAllPosts();
        
        // Logic chọn 3 bài viết
        let postsToShow = [];
        
        // Ưu tiên bài featured
        if (featuredPosts.length > 0) {
          postsToShow = [...featuredPosts];
        }
        
        // Nếu chưa đủ 3 bài, bổ sung bài mới nhất
        if (postsToShow.length < 3) {
          const nonFeaturedPosts = allPosts.filter(post => 
            !postsToShow.some(p => p._id === post._id)
          );
          
          postsToShow = [
            ...postsToShow,
            ...nonFeaturedPosts.slice(0, 3 - postsToShow.length)
          ];
        } else if (postsToShow.length > 3) {
          // Nếu có nhiều hơn 3 bài featured, chỉ lấy 3 bài
          postsToShow = postsToShow.slice(0, 3);
        }
        
        setBlogPosts(postsToShow);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        // Giữ lại bài viết mặc định nếu có lỗi
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlogPosts();
  }, []);

  const handleReadMoreClick = () => {
    window.scrollTo(0, 0); // Scroll to the top
    navigate("/blog"); // Navigate to the blog page
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-gray-900">From the Blog</h2>
        <p className="mt-1 text-lg text-gray-600 inline-flex items-center gap-x-1">
          Stay in the know with insights from industry experts.
          <span 
            onClick={handleReadMoreClick}
            className="text-blue-600 font-medium hover:underline flex items-center gap-x-1 cursor-pointer"
          >
            Read more
            <svg className="shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </p>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <a key={post._id || index} className="group flex flex-col focus:outline-none" href={post.link}>
            <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                src={post.imageUrl}
                alt={post.title}
              />
              {post.featureLabel && (
                <span className="absolute top-0 right-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3">
                  {post.featureLabel}
                </span>
              )}
            </div>

            <div className="mt-7">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600">{post.title}</h3>
              <p className="mt-3 text-gray-800">{post.description}</p>
              <p className="mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 font-medium group-hover:underline">
                Read more
                <svg className="shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </p>
            </div>
          </a>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
};

export default Blog;
