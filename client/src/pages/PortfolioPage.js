import React from 'react';
import MiniCard from '../components/miniCard';
import HeroPortfolio from '../components/HeroPortfolio';
import portfolioInfo from '../constants/portfolioInfo'; // Import portfolioInfo

function PortfolioPage() {
  // Step 1: Separate pinned (labeled) and non-pinned projects
  const pinnedProjects = portfolioInfo.filter(project => project.featureLabel);
  const nonPinnedProjects = portfolioInfo.filter(project => !project.featureLabel);

  // Step 2: Sort non-pinned projects by date (latest first)
  const sortedProjects = nonPinnedProjects.sort((a, b) => new Date(b.date) - new Date(a.date));

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Render projects row-wise, left to right */}
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col space-y-6">
              {column.map((project, index) => (
                <MiniCard key={index} {...project} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage;
