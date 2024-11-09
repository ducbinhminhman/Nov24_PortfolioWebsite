import React from 'react';
import MiniCard from '../components/miniCard';
import BlogHero from '../components/BlogHero';
import blogInfo from '../constants/blogInfo'; // Import blogInfo

function BlogPage() {
  // Step 1: Separate pinned (labeled) and non-pinned articles
  const pinnedArticles = blogInfo.filter(article => article.featureLabel);
  const nonPinnedArticles = blogInfo.filter(article => !article.featureLabel);

  // Step 2: Sort non-pinned articles by date (latest first)
  const sortedArticles = nonPinnedArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Step 3: Distribute remaining articles across 4 columns starting from the fourth position
  const columns = [[], [], [], []];
  sortedArticles.forEach((article, index) => {
    columns[index % 4].push(article); // Round-robin distribution for remaining articles
  });

  return (
    <div className="mx-auto">
      <BlogHero />
      <div className="mx-auto max-w-screen-2xl px-4 py-2 md:py-10 md:px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* First Row: Display pinned articles in columns 1, 2, and 3 */}
          <div className="flex flex-col space-y-6">
            {pinnedArticles[0] && <MiniCard {...pinnedArticles[0]} />}
            {columns[0].map((article, index) => (
              <MiniCard key={index} {...article} />
            ))}
          </div>
          <div className="flex flex-col space-y-6">
            {pinnedArticles[1] && <MiniCard {...pinnedArticles[1]} />}
            {columns[1].map((article, index) => (
              <MiniCard key={index} {...article} />
            ))}
          </div>
          <div className="flex flex-col space-y-6">
            {pinnedArticles[2] && <MiniCard {...pinnedArticles[2]} />}
            {columns[2].map((article, index) => (
              <MiniCard key={index} {...article} />
            ))}
          </div>
          <div className="flex flex-col space-y-6">
            {columns[3].map((article, index) => (
              <MiniCard key={index} {...article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
