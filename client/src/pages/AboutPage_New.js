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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      <Header />
      
      <main className="flex-grow">
        {/* Interactive Futuristic Building */}
        <section className="mb-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                Thought Space
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Welcome to my thought space. Explore the floating UFOs to discover my thoughts, values, and ideas that shape my work and perspective.
              </p>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-2xl border border-cyan-500/20">
              <FuturisticBuilding doors={doors} height="70vh" />
            </div>
          </div>
        </section>
        
        {/* About Me Section */}
        <section className="py-12 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Content */}
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center rounded-md bg-cyan-900/30 px-3 py-1">
                  <div className="mr-1 h-2 w-2 rounded-full bg-cyan-400"></div>
                  <p className="text-sm text-cyan-300">{aboutData?.role || 'Developer & Data Analyst'}</p>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {aboutData?.name || 'Minh'}
                </h2>
                
                <p className="text-gray-300">
                  {aboutData?.tagline || "I'm a data-driven creator with a strong foundation in business and data science"}
                </p>
                
                <p className="text-gray-400">
                  {aboutData?.bio || "I'm passionate about building applications that solve real business challenges."}
                </p>
                
                {/* Divider */}
                <div className="my-6 h-px w-full bg-cyan-800/50"></div>
                
                {/* Achievements */}
                <div className="mb-6 flex flex-col gap-3 text-sm text-gray-400">
                  {aboutData?.achievements ? (
                    aboutData.achievements.map((achievement, index) => (
                      <p key={index}>
                        <strong className="text-cyan-300">{achievement.year}:</strong> {achievement.description}
                      </p>
                    ))
                  ) : (
                    <>
                      <p>
                        <strong className="text-cyan-300">2024:</strong> Master's in Data Science for Business, BI Norwegian Business School, avg. grade <strong>4.6/5</strong>.
                      </p>
                      <p>
                        <strong className="text-cyan-300">2024:</strong> Dean's List Spring 2024, top <strong>10%</strong> of MSc students.
                      </p>
                      <p>
                        <strong className="text-cyan-300">2024:</strong> Built automated apps at <strong>NorthStar</strong> for data management.
                      </p>
                      <p>
                        <strong className="text-cyan-300">2024:</strong> Thesis on AI portfolio strategies, earned <strong>A</strong>.
                      </p>
                      <p>
                        <strong className="text-cyan-300">2021:</strong> <strong>Valedictorian</strong> in International Business, GPA <strong>3.82/4</strong>, Math Olympiad prize.
                      </p>
                    </>
                  )}
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col gap-4 font-semibold sm:flex-row">
                  <a
                    href={`mailto:${aboutData?.email || 'manbinhminh99@gmail.com'}`}
                    className="flex items-center gap-3 rounded-md bg-gradient-to-r from-cyan-600 to-blue-700 px-5 py-3 text-white transition-all hover:from-cyan-500 hover:to-blue-600"
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
                    className="flex items-center gap-3 rounded-md border border-solid border-cyan-500 px-5 py-3 text-cyan-300 transition-all hover:bg-cyan-950/30"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Resume</p>
                  </a>
                </div>
              </div>
              
              {/* Image */}
              <div className="min-h-[530px] overflow-hidden rounded-xl shadow-xl border border-cyan-500/20">
                <img
                  src={aboutData?.profileImageUrl || require('../assets/MinhPic.jpg')}
                  alt={aboutData?.name || "Minh"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
