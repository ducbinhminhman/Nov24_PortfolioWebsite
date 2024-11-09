// BlogHero.js
import React from 'react';

const BlogHero = () => {
  return (
    <div className="max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div
        className="min-h-[35vh] md:min-h-[75vh] bg-center bg-cover bg-no-repeat relative rounded-xl"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1634479999416-08154adf73c1?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute bottom-0 start-0 end-0 max-w-lg text-center mx-auto p-6 md:start-auto md:text-start md:mx-0">
          {/* Card */}
          <div className="px-5 py-4 inline-block bg-white rounded-lg md:p-7 dark:bg-neutral-800">
            <div className="">
              <h3 className="text-lg font-bold text-gray-800 sm:text-2xl dark:text-neutral-200">
                Welcome to my Blog
              </h3>
              <p className="mt-2 text-gray-800 dark:text-neutral-200 hidden md:block">
              I share practical insights on data, software, and AI to simplify workflows and drive innovation.
              </p>
            </div>

            <div className="md:mt-10">
              <a
                href="https://medium.com/@bnhminh_38309"
                className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-white dark:hover:text-neutral-400 dark:focus:text-neutral-400"
              >
                <svg
                  className="shrink-0 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Learn more
              </a>
            </div>
          </div>
          {/* End Card */}
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
