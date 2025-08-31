import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FuturisticBuilding from '../components/FuturisticBuilding';
import { getFuturisticDoors, getAboutData } from '../lib/sanity';

const AboutPage = () => {
  const [doors, setDoors] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doors and about data in parallel
        const [doorsData, aboutInfo] = await Promise.all([
          getFuturisticDoors(),
          getAboutData()
        ]);
        
        console.log("Dữ liệu phi thuyền:", doorsData);
        setDoors(doorsData);
        setAboutData(aboutInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header is already included in App.js */}
      
      {/* Spacer element to create padding below header */}
      <div className="h-6"></div>
      
      <main className="flex-grow">
        {/* Interactive Futuristic Building */}
        <section className="mb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Thought Space
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Welcome to my thought space. Explore the floating UFOs to discover my thoughts, values, and ideas that shape my work and perspective.
              </p>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-2xl border border-cyan-500/20 transform transition-transform hover:scale-[1.01] duration-700">
              <FuturisticBuilding doors={doors} height="75vh" />
            </div>
          </div>
        </section>
        
        {/* About Me Section */}
        <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900 border-t border-cyan-900/30">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Content */}
              <div className="flex flex-col items-start gap-6">
                <div className="flex items-center rounded-md bg-cyan-900/30 px-4 py-2">
                  <div className="mr-2 h-3 w-3 rounded-full bg-cyan-400 animate-pulse"></div>
                  <p className="text-sm font-medium text-cyan-300">{aboutData?.role || 'Developer & Data Analyst'}</p>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {aboutData?.name || 'Minh'}
                </h2>
                
                <p className="text-xl text-gray-300">
                  {aboutData?.tagline || "I'm a data-driven creator with a strong foundation in business and data science"}
                </p>
                
                <p className="text-gray-400 text-lg">
                  {aboutData?.bio || "I'm passionate about building applications that solve real business challenges."}
                </p>
                
                {/* Divider */}
                <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-cyan-800/50 to-transparent"></div>
                
                {/* Achievements */}
                <div className="mb-6 flex flex-col gap-4 text-sm text-gray-400">
                  {aboutData?.achievements ? (
                    aboutData.achievements.map((achievement, index) => (
                      <p key={index} className="achievement-item relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-cyan-500/30 before:rounded-full before:shadow-glow-cyan">
                        <strong className="text-cyan-300 text-base">{achievement.year}:</strong> {achievement.description}
                      </p>
                    ))
                  ) : (
                    <>
                      <p className="achievement-item relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-cyan-500/30 before:rounded-full before:shadow-glow-cyan">
                        <strong className="text-cyan-300 text-base">2024:</strong> Master's in Data Science for Business, BI Norwegian Business School, avg. grade <strong>4.6/5</strong>.
                      </p>
                      <p className="achievement-item relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-cyan-500/30 before:rounded-full before:shadow-glow-cyan">
                        <strong className="text-cyan-300 text-base">2024:</strong> Dean's List Spring 2024, top <strong>10%</strong> of MSc students.
                      </p>
                      <p className="achievement-item relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-cyan-500/30 before:rounded-full before:shadow-glow-cyan">
                        <strong className="text-cyan-300 text-base">2024:</strong> Built automated apps at <strong>NorthStar</strong> for data management.
                      </p>
                      <p className="achievement-item relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-cyan-500/30 before:rounded-full before:shadow-glow-cyan">
                        <strong className="text-cyan-300 text-base">2024:</strong> Thesis on AI portfolio strategies, earned <strong>A</strong>.
                      </p>
                      <p className="achievement-item relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-cyan-500/30 before:rounded-full before:shadow-glow-cyan">
                        <strong className="text-cyan-300 text-base">2021:</strong> <strong>Valedictorian</strong> in International Business, GPA <strong>3.82/4</strong>, Math Olympiad prize.
                      </p>
                    </>
                  )}
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col gap-4 font-semibold sm:flex-row">
                  <a
                    href={`mailto:${aboutData?.email || 'manbinhminh99@gmail.com'}`}
                    className="flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-3 text-white transition-all hover:from-cyan-500 hover:to-blue-600 shadow-lg shadow-cyan-900/50 hover:translate-y-[-2px]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p>Email Me</p>
                  </a>
                  <a
                    href={aboutData?.resumeUrl || require('../assets/resume.pdf')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 rounded-md border border-solid border-cyan-500 px-6 py-3 text-cyan-300 transition-all hover:bg-cyan-950/30 hover:border-cyan-400 hover:translate-y-[-2px]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Resume</p>
                  </a>
                </div>
              </div>
              
              {/* Image */}
              <div className="flex flex-col space-y-4">
                <div className="overflow-hidden rounded-xl shadow-xl border border-cyan-500/20 transform transition-all duration-700 hover:scale-[1.02] group h-[480px]">
                  <img
                    src={aboutData?.futuristicProfileImageUrl || aboutData?.profileImageUrl || require('../assets/MinhPic.jpg')}
                    alt={aboutData?.name || "Minh"}
                    className="w-full h-full object-cover object-top transition-transform duration-2000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-cyan-500/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    <p className="text-sm font-medium text-cyan-300">Connect with me</p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <a href="https://github.com/ducbinhminhman" target="_blank" rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-slate-700/50 transition-all">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/binh-minh-man-39b779167/" target="_blank" rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-slate-700/50 transition-all">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="https://medium.com/@bnhminh_38309" target="_blank" rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-slate-700/50 transition-all">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer is already included in App.js */}
    </div>
  );
};

export default AboutPage;
