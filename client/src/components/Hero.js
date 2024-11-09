// Hero.js
import React from 'react';
import Header from './Header';
import Banner from './BannerText';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gray-100 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-0"
        src={process.env.PUBLIC_URL + '/IntroVid.mp4'}  // Ensure this path is correct
        autoPlay
        muted
        loop
        playsInline
      />

      {/* About Section */}
      <div className="relative ">
        <Banner />
      </div>
    </section>
  );
};

export default Hero;
