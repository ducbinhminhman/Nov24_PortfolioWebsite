// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import Blog from './components/Blog';
import About from './components/About';
import Portfolio from './components/Portfolio';
import RecQuo1 from './components/RecQuo1';
import RecQuo2 from './components/RecQuo2';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import BlogPage from './pages/BlogPage';
import Header from './components/Header';

function HomePage() {
  return (
    <div>
      <Hero />
      <Portfolio />
      <Blog />
      <RecQuo2 />
      <About />
      <RecQuo1 />
      <ContactUs />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <div className="bg-slate-200">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page with all sections */}
          <Route path="/blog" element={<BlogPage />} /> {/* BlogPage route */}
          <Route path="/about" element={<About />} /> {/* About page route */}
          <Route path="/portfolio" element={<Portfolio />} /> {/* Portfolio page route */}
          <Route path="/contact" element={<ContactUs />} /> {/* Contact page route */}
        </Routes>
        <div className="bg-white">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
