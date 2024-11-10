// BlogHero.js
import React from 'react';

const BlogHero = () => {
  return (
    <div className="max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div
        className="min-h-[35vh] md:min-h-[75vh] bg-center bg-cover bg-no-repeat relative rounded-xl"
        style={{
          backgroundImage:
            "url('https://www.bing.com/th/id/OBTQ.BT9D74250C01F9862194A26E726584C5E8CAB6C9E7062AEF51BA4F21370A8391DA?qlt=90&pid=InlineBlock')",
        }}
      >
        <div className="absolute bottom-0 start-0 end-0 max-w-lg text-center mx-auto p-6 md:start-auto md:text-start md:mx-0">
          {/* Card */}
          <div className="px-5 py-4 inline-block bg-white rounded-lg md:p-7 dark:bg-neutral-800">
            <div className="">
              <h3 className="text-lg font-bold text-gray-800 sm:text-2xl dark:text-neutral-200">
              Welcome to my portfolio
              </h3>
              <p className="mt-2 text-gray-800 dark:text-neutral-200 hidden md:block">
              I create easy-to-use apps with data and AI to make work simpler and spark fresh ideas.
              </p>
            </div>

            <div className="md:mt-10">
              <a
                href="https://github.com/ducbinhminhman"
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
