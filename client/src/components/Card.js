import React, { useState } from 'react';
import Pro1 from '../assets/pro1.png'; // Fallback image

const Card = ({ project }) => {
  // Define useState hook at the top level, before any conditional logic
  const [activeTab, setActiveTab] = useState('tabs-with-card-3');
  
  try {
    // Use default data if no project is available
    const defaultProject = {
      title: "MinhCipes - An AI Recipe Generator",
      description: "MinhCipes creates personalized recipes based on your ingredients, cooking time, and dietary preferences.",
      tools: "Powered by OpenAI's GPT-4, with React, Express, and styled with Tailwind CSS.",
      link: "https://chefminh.vercel.app/",
      imageUrl: Pro1
    };
    
    // Create tabs based on project data
    const tabs = project ? [
      {
        id: 'tabs-with-card-1',
        title: 'Description',
        description: project.description,
        imageUrl: project.imageUrl || Pro1,
      },
      {
        id: 'tabs-with-card-2',
        title: 'Tools Used',
        description: project.tools || defaultProject.tools,
        imageUrl: project.imageUrl || Pro1,
      },
      {
        id: 'tabs-with-card-3',
        title: 'Visit',
        description: <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{project.link}</a>,
        imageUrl: project.imageUrl || Pro1,
      },
    ] : [
      {
        id: 'tabs-with-card-1',
        title: 'Description',
        description: defaultProject.description,
        imageUrl: defaultProject.imageUrl,
      },
      {
        id: 'tabs-with-card-2',
        title: 'Tools Used',
        description: defaultProject.tools,
        imageUrl: defaultProject.imageUrl,
      },
      {
        id: 'tabs-with-card-3',
        title: 'Visit',
        description: <a href={defaultProject.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{defaultProject.link}</a>,
        imageUrl: defaultProject.imageUrl,
      },
    ];

    // Use the predefined activeTab state

    return (
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="relative p-6 md:p-16">
          <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
            
            {/* Tab Navigation */}
            <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
              <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl">
                {project ? project.title : defaultProject.title}
              </h2>

              <nav className="grid gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist" aria-orientation="vertical">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'bg-white shadow-md hover:border-transparent'
                        : 'hover:bg-gray-200'
                    } text-start focus:outline-none p-4 md:p-5 rounded-xl ${
                      tab.id === 'tabs-with-card-1' || tab.id === 'tabs-with-card-2' ? 'hidden lg:block' : ''
                    }`}
                    aria-selected={activeTab === tab.id}
                    role="tab"
                  >
                    <span className="flex gap-x-6">
                      <svg
                        className={`shrink-0 mt-2 size-6 md:size-7 ${
                          activeTab === tab.id ? 'text-blue-600' : 'text-gray-800'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* Replace with appropriate icon paths */}
                        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                        <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                      </svg>
                      <span className="grow">
                        <span className="block text-lg font-semibold">{tab.title}</span>
                        <span className="block mt-1 text-gray-800">{tab.description}</span>
                      </span>
                    </span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="lg:col-span-6">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  id={tab.id}
                  className={`${activeTab === tab.id ? 'block' : 'hidden'} p-4 sm:p-0`}
                  role="tabpanel"
                >
                  <img
                    className="shadow-xl shadow-gray-200 rounded-xl"
                    src={tab.imageUrl}
                    alt={tab.title}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Background Color */}
          <div className="absolute inset-0 grid grid-cols-12 size-full">
            <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("DEBUG ERROR: Error in Card.js:", error);
    return (
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="p-4 border rounded-lg bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Error Rendering Project</h2>
          <p>There was an error displaying this project: {error.message}</p>
          <img src={Pro1} alt="Default project" className="mt-4 rounded-lg" />
        </div>
      </div>
    );
  }
};

export default Card;
