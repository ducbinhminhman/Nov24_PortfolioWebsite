// App.js
import React from 'react';
import Hero from './components/Hero';
import Blog from './components/Blog';
import About from './components/About';
import './App.css';
import Portfolio from './components/Portfolio';
import RecQuo1 from './components/RecQuo1';
import RecQuo2 from './components/RecQuo2';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-slate-200">
      <Hero />
      <Portfolio/>
      <Blog/>
      <RecQuo2/>
      <About/>
      <RecQuo1/>
      <ContactUs/>
      <div className="bg-white">
      <Footer/>
      </div>
    </div>
  );
}

export default App;
