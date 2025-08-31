// Hero.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Banner from './BannerText';
import { getHeroData } from '../lib/sanity';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const data = await getHeroData();
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchHeroData();
  }, []);

  // Fallback video URL if Sanity data is not available
  const fallbackVideoUrl = process.env.PUBLIC_URL + '/IntroVid.mp4';
  
  // Get video URL from Sanity if available, otherwise use fallback
  const videoUrl = heroData?.backgroundVideoUrl || fallbackVideoUrl;

  return (
    <section className="relative min-h-screen bg-gray-100 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-0"
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* About Section */}
      <div className="relative">
        <Banner 
          title={heroData?.title}
          subtitle={heroData?.subtitle}
          primaryButtonText={heroData?.primaryButtonText}
          primaryButtonLink={heroData?.primaryButtonLink}
          secondaryButtonText={heroData?.secondaryButtonText}
          secondaryButtonLink={heroData?.secondaryButtonLink}
        />
      </div>
    </section>
  );
};

export default Hero;
