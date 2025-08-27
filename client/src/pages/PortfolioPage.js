import React, { useState, useEffect } from 'react';
import MiniCard from '../components/miniCard';
import HeroPortfolio from '../components/HeroPortfolio';
import { getAllProjects } from '../lib/sanity';
import portfolioInfo from '../constants/portfolioInfo'; // Import portfolioInfo as fallback

function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchProjects() {
      try {
        // Lấy tất cả dự án từ Sanity
        const allProjects = await getAllProjects();
        setProjects(allProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);

  // Step 1: Separate pinned (labeled) and non-pinned projects
  const pinnedProjects = projects.filter(project => project.featureLabel || project.featured);
  const nonPinnedProjects = projects.filter(project => !project.featureLabel && !project.featured);

  // Step 2: Sort non-pinned projects by date (latest first)
  const sortedProjects = nonPinnedProjects.sort((a, b) => {
    const dateA = a.publishedAt || a.date;
    const dateB = b.publishedAt || b.date;
    return new Date(dateB) - new Date(dateA);
  });

  // Step 3: Combine pinned and sorted non-pinned projects for row-wise display
  const allProjects = [...pinnedProjects, ...sortedProjects];

  // Step 4: Distribute projects across rows, filling each row left to right, column by column
  const columns = [[], [], [], []];
  allProjects.forEach((project, index) => {
    columns[index % 4].push(project); // Row-wise distribution, left to right
  });

  return (
    <div className="mx-auto">
      <HeroPortfolio />
      <div className="mx-auto max-w-screen-2xl px-4 py-2 md:py-10 md:px-8 pb-10">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Render projects row-wise, left to right */}
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col space-y-6">
                {column.map((project, index) => (
                  <MiniCard key={project._id || index} {...project} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PortfolioPage;
