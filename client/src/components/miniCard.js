import React from 'react';

const MiniCard = ({ title, description, imageUrl, link, featureLabel, featured }) => {
  // Fallback image if imageUrl is missing
  const fallbackImage = "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  
  return (
    <div className="relative flex flex-col bg-white border shadow-sm rounded-xl">
      <div className="relative ">
        <img 
          className="w-full h-auto rounded-t-xl object-cover object-center transition duration-200 group-hover:scale-110" 
          src={imageUrl || fallbackImage} 
          alt={title} 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = fallbackImage;
          }}
        />
        {(featureLabel || featured) && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold py-1 px-2 rounded-lg">
            {featureLabel || (featured ? "Featured" : "")}
          </span>
        )}
      </div>
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800">
          {title}
        </h3>
        <p className="mt-1 text-gray-500 hidden md:block">
          {description}
        </p>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
               <p className="mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 font-medium group-hover:underline">
                Read more
                <svg className="shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </p>
        </a>
      </div>
    </div>
  );
};

export default MiniCard;
