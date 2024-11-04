// About.js
import React from 'react';

const About = () => {
  return (
    <section>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
        {/* Component */}
        <div className="grid gap-12 sm:gap-20 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center rounded-md bg-gray-300 px-3 py-1">
              <div className="mr-1 h-2 w-2 rounded-full bg-black"></div>
              <p className="text-sm">Try Creative</p>
            </div>
            <p className="text-sm text-gray-500 sm:text-xl">
              Developer &amp; Data Analyst
            </p>
            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:mb-8">
              Minh
            </h1>
            <p className="text-sm text-gray-500 sm:text-xl">
              I'm a data-driven creator with a strong foundation in business and data science, 
              passionate about building applications that solve real business challenges. 
            </p>
            {/* Divider */}
            <div className="mb-8 mt-8 h-px w-full bg-black"></div>
            <div className="mb-6 flex flex-col gap-2 text-sm text-gray-500 sm:text-base lg:mb-8">
              <p>
                <strong>2024: </strong>Awarded Dean's List recognition at BI Norwegian Business School for ranking in the top 10% of MSc students.
              </p>
              <p>
                <strong>2024: </strong>Developed automated apps at Northstar, streamlining data management and enhancing decision-making.
              </p>
              <p>
                <strong>2024: </strong>Completed a master’s thesis on AI-driven portfolio strategies, receiving an A grade.
              </p>
              <p>
                <strong>2021: </strong> Valedictorian in International Business, GPA 3.82/4, Mathematics Olympiad prize.
              </p>
            </div>
            {/* Link */}
            <a
              href="#"
              className="mb-6 flex items-center gap-2.5 text-center text-sm font-bold uppercase md:mb-10 lg:mb-12"
            >
              <p>All Achievements</p>
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b1465d46adaf3f26099edf_arrow.svg"
                alt=""
                className="inline-block"
              />
            </a>
            {/* Buttons */}
            <div className="flex flex-col gap-4 font-semibold sm:flex-row">
              <a
                href="mailto:manbinhminh99@gmail.com" // Mailto link to open the default email client
                className="flex items-center gap-4 rounded-md bg-black px-6 py-3 text-white"
              >
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b147043fe6ab404e65635e_Envelope.svg"
                  alt=""
                  className="inline-block"
                />
                <p>Email Me</p>
              </a>
              <a
                href={require('../assets/resume.pdf')} // Link to your resume PDF file
                target="_blank" // Open in a new tab
                rel="noopener noreferrer" // Security best practice for external links
                className="flex gap-4 rounded-md border border-solid border-black px-6 py-3"
              >
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b14704c8616ad7ba080fe0_Note.svg"
                  alt=""
                  className="inline-block"
                />
                <p>Resume</p>
              </a>
            </div>
          </div>
          {/* Image Placeholder */}
          <div className="min-h-[530px] overflow-hidden rounded-md bg-gray-100">
            <img
              src={require('../assets/MinhPic.jpg')}
              alt="Minh"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
