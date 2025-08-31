// About.js
import React, { useState, useEffect } from 'react';
import { getAboutData } from '../lib/sanity';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const data = await getAboutData();
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAboutData();
  }, []);

  // Default values if Sanity data is not available
  const name = aboutData?.name || "Minh";
  const tagline = aboutData?.tagline || "Try Creative";
  const role = aboutData?.role || "Developer & Data Analyst";
  const bio = aboutData?.bio || "I'm a data-driven creator with a strong foundation in business and data science, passionate about building applications that solve real business challenges.";
  const linkedinUrl = aboutData?.linkedinUrl || "https://www.linkedin.com/in/binhminhman/";
  const email = aboutData?.email || "manbinhminh99@gmail.com";
  const profileImage = aboutData?.profileImageUrl || require('../assets/MinhPic.jpg');
  const resumeUrl = aboutData?.resumeUrl || require('../assets/resume.pdf');
  
  // Default achievements if Sanity data is not available
  const achievements = aboutData?.achievements || [
    { year: "2024", description: "Awarded Dean's List recognition at BI Norwegian Business School for ranking in the top 10% of MSc students." },
    { year: "2024", description: "Developed automated apps at Northstar, streamlining data management and enhancing decision-making." },
    { year: "2024", description: "Completed a master's thesis on AI-driven portfolio strategies, receiving an A grade." },
    { year: "2021", description: "Valedictorian in International Business, GPA 3.82/4, Mathematics Olympiad prize." }
  ];

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
              <p className="text-sm">{tagline}</p>
            </div>
            <p className="text-sm text-gray-500 sm:text-xl">
              {role}
            </p>
            {/* Title */}
            <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:mb-8">
              {name}
            </h1>
            <p className="text-sm text-gray-500 sm:text-xl">
              {bio}
            </p>
            {/* Divider */}
            <div className="mb-8 mt-8 h-px w-full bg-black"></div>
            <div className="mb-6 flex flex-col gap-2 text-sm text-gray-500 sm:text-base lg:mb-8">
              {achievements.map((achievement, index) => (
                <p key={index}>
                  <strong>{achievement.year}: </strong>{achievement.description}
                </p>
              ))}
            </div>
            {/* Link */}
            <a
              href={linkedinUrl}
              className="mb-6 flex items-center gap-2.5 text-center text-sm font-bold uppercase md:mb-10 lg:mb-12"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Connect with me</p>
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b1465d46adaf3f26099edf_arrow.svg"
                alt=""
                className="inline-block"
              />
            </a>
            {/* Buttons */}
            <div className="flex flex-col gap-4 font-semibold sm:flex-row">
              <a
                href={`mailto:${email}`}
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
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
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
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
