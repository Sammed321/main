import React from 'react';
import { useNavigate } from 'react-router-dom';
// Removed the import for './Landing.css' as it's now embedded below

// All the CSS styles are now embedded as a string within the component
const landingPageStyles = `
/* --- Global Styles & Resets --- */:root {
  --bg-primary: #354c93ff;
  --bg-secondary: #ffffff;
  --text-primary: #ffffff;
  --text-secondary: #dbeafe;

  --card-bg: #f9fafb;
  --card-text: #1f2937;
}

[data-theme="dark"] {
  --bg-primary: #0d264cff;
  --bg-secondary: #161b22;

  --text-primary: #e5e7eb;
  --text-secondary: #9ca3af;

  --card-bg: #1f2937;
  --card-text: #e5e7eb;
}

.landing-page {
  min-height: 100vh;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
 background-color: var(--bg-primary);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Re-usable container class */
.container {
  width: 100%;
  max-width: 1100px; /* Equivalent to max-w-6xl */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;  /* 24px */
  padding-right: 1.5rem; /* 24px */
}

/* Targeting buttons within .landing-page to avoid 
  conflicting with other potential button styles.
*/
.landing-page button {
  cursor: pointer;
  font-family: inherit;
  border: none;
  border-radius: 9999px; /* rounded-full */
  font-weight: 700;
  transition: all 0.3s ease;
}

/* --- 1. Header/Navbar --- */
.landing-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.landing-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.logo {
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700;
  color: #fff;
}

.logo-span {
  color: #60a5fa; /* text-blue-400 */
}

.nav-signin-btn {
  padding: 0.5rem 1.5rem;
  background-color: transparent;
  border: 2px solid #60a5fa; /* border-blue-400 */
  color: #60a5fa; /* text-blue-400 */
  font-weight: 600;
}

.nav-signin-btn:hover {
  background-color: #60a5fa;
  color: #fff;
}

/* --- Keyframes for Animations --- */
@keyframes floatAnimation {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes marqueeAnimation {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}


/* --- 2. Hero Section --- */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  /* changed to space-between to push content left and graphic right */
  justify-content: space-between; 
  padding-top: 5rem;
  padding-bottom: 8rem;
  overflow: hidden; /* Hide overflow for floating graphic */
}

.hero-gradient {
  position: absolute;
  inset: 0;
  /* Updated gradient to fade to the new blue background */
  background-image: linear-gradient(to bottom, #3b82f6, #2563eb, #1e3a8a);
  opacity: 0.9;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: left; /* Changed to left alignment */
  max-width: 50%; /* Constrain width for better layout with graphic */
  padding-left: 1.5rem; /* Ensure padding for left alignment */
}

/* Floating Graphic Style */
.hero-floating-graphic {
  display: none; /* Hidden by default on mobile */
  position: absolute;
  top: 30%; /* Adjusted position */
  right: 15%; /* Adjusted position */
  width: 350px; /* Increased size */
  height: 250px; /* Increased size */
  z-index: 0;
  animation: floatAnimation 6s ease-in-out infinite;
  opacity: 0.9; /* Increased opacity for visibility */
  transform-origin: center; /* Ensures animation looks natural with new size */
}
/* Ensure the SVG itself fills the graphic container and is white */
.hero-floating-graphic svg path, 
.hero-floating-graphic svg rect, 
.hero-floating-graphic svg circle {
    stroke: white; /* Changed stroke color to white */
    fill: white; /* Changed fill color to white */
}


.hero-title {
  font-size: 2.25rem; /* text-4xl */
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-title-span {
  color: #93c5fd; /* text-blue-300 */
}

.hero-subtitle {
  font-size: 1.125rem; /* text-lg */
  color: #dbeafe; /* text-blue-100 */
  font-weight: 300;
  margin-bottom: 2.5rem;
  max-width: 48rem; /* max-w-3xl */
  /* margin-left: auto; Removed for left alignment */
  /* margin-right: auto; Removed for left alignment */
}

.hero-cta-btn {
  padding: 0.75rem 2rem;
  background-color: #fff;
  color: #1d4ed8; /* text-blue-700 */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.hero-cta-btn:hover {
  background-color: #f9fafb; /* hover:bg-blue-50 */
  transform: scale(1.05);
}

/* --- 3. Features Section --- */
.features-section {
  padding-top: 5rem;
  padding-bottom: 5rem;
  background-color: var(--bg-secondary);
  color: var(--card-text);
}

.section-title {
  font-size: 2.25rem; /* text-4xl */
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr; /* Default to 1 column */
  gap: 2.5rem; /* gap-10 */
}

.feature-card {
  background-color: #f9fafb; /* bg-gray-50 */
  border-radius: 0.75rem; /* rounded-xl */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-0.5rem);
}

.feature-icon-wrapper {
  width: 4rem;
  height: 4rem;
  background-color: #dbeafe; /* bg-blue-100 */
  color: #2563eb; /* text-blue-600 */
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.feature-title {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.feature-description {
  color: #4b5563; /* text-gray-600 */
}

/* --- 3.5. Tech Stack Section (NEW) --- */
.tech-stack-section {
  padding-top: 5rem;
  padding-bottom: 5rem;
  background-color: #1e3a8a; /* bg-blue-900 - Replaced dark gray */
  color: #fff;
  overflow: hidden;
}

.tech-stack-title {
  font-size: 2.25rem; /* text-4xl */
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
}

.marquee-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
}

/* Fades on the edges */
.marquee-wrapper::before,
.marquee-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
}

.marquee-wrapper::before {
  left: 0;
  background: linear-gradient(to right, #1e3a8a, transparent); /* Replaced dark gray */
}

.marquee-wrapper::after {
  right: 0;
  background: linear-gradient(to left, #1e3a8a, transparent); /* Replaced dark gray */
}

.marquee-content {
  display: inline-block;
  animation: marqueeAnimation 30s linear infinite;
}

.tech-item {
  display: inline-block;
  padding: 1rem 2rem;
  margin: 0 1rem;
  border-radius: 0.75rem; /* rounded-xl */
  font-size: 1.25rem; /* text-xl */
  font-weight: 600;
  background-color: #1e40af; /* bg-blue-800 - Replaced dark gray */
  border: 1px solid #2563eb; /* border-blue-600 - Replaced dark gray border */
  color: #fff;
}
.theme-toggle-btn {
  padding: 0.5rem 1.2rem;
  border-radius: 9999px;
  font-weight: 600;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.4);
  color: white;
  backdrop-filter: blur(8px);
}

[data-theme="dark"] .theme-toggle-btn {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.2);
}

/* Tech-specific colors for flair */
.tech-item.vite { color: #61DAFB; }
.tech-item.python { color: #FFD43B; }
.tech-item.opencv { color: #5CDB95; }
.tech-item.sql { color: #F0A356; }


/* --- 4. Guest View Section --- */
.guest-section {
  padding-top: 5rem;
  padding-bottom: 5rem;
  background-color: var(--bg-secondary);
  color: var(--card-text);
}

.guest-content {
  text-align: center;
}

.section-title-light {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.guest-subtitle {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2.5rem;
  max-width: 42rem; /* max-w-2xl */
  margin-left: auto;
  margin-right: auto;
}

.guest-buttons-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}

.guest-btn-primary,
.guest-btn-secondary {
  padding: 0.75rem 2.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.guest-btn-primary {
  background-color: #2563eb; /* bg-blue-600 */
  color: #fff;
}
.guest-btn-primary:hover {
  background-color: #1d4ed8; /* hover:bg-blue-700 */
}

.guest-btn-secondary {
  background-color: transparent;
  border: 2px solid #2563eb;
  color: #2563eb;
}
.guest-btn-secondary:hover {
  background-color: #2563eb;
  color: #fff;
}

/* --- 5. Footer --- */
/*
.landing-footer {
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  background-color: #111827;
  color: #bfdbfe; /* text-blue-200 */
/*
  text-align: center;
}
*/


/* --- Responsive Media Queries --- */

/* sm: (640px) */
@media (min-width: 640px) {
  .nav-signin-btn {
    display: block; /* Was hidden */
  }

  .guest-buttons-container {
    flex-direction: row;
  }
}

/* md: (768px) */
@media (min-width: 768px) {
  .hero-title {
    font-size: 3.75rem; /* md:text-6xl */
  }

  .hero-subtitle {
    font-size: 1.5rem; /* md:text-2xl */
  }

  .features-grid {
    grid-template-columns: repeat(3, 1fr); /* md:grid-cols-3 */
  }
  
  /* Adjust hero content for medium screens */
  .hero-content {
      max-width: 60%; 
  }
}

/* lg: (1024px) */
@media (min-width: 1024px) {
  .hero-floating-graphic {
    display: block; /* Show floating graphic on large screens */
  }
  .hero-content {
      max-width: 50%; /* Revert to 50% for larger screens */
  }
}
`;

const Landing = () => {
  const navigate = useNavigate();

  return (
    // Use a React Fragment (<>) to inject styles alongside the main div
    <>
      <style>{landingPageStyles}</style>
      
      <div className="landing-page">
        
        {/* 1. Header/Navbar */}
      <header className="landing-header">
        <nav className="landing-nav container">
          <h1 className="logo">
            Shiksha<span className="logo-span">Plus</span>
          </h1>
          {/* Sign In button removed as requested */}
          {/* <button
            onClick={() => navigate('/auth')}
            className="nav-signin-btn"
          >
            Sign In
          </button> */}
          <button
  className="theme-toggle-btn"
  onClick={() => {
    const newTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  }}
>
  Toggle Theme
</button>

        </nav>
      </header>

      {/* 2. Hero Section */}
        <section className="hero-section container"> {/* Added container here */}
          <div className="hero-gradient"></div>

          {/* Floating SVG Graphic */}
          <div className="hero-floating-graphic">
            <svg width="100%" height="100%" viewBox="0 0 250 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Changed stroke and fill colors to currentColor, which will inherit from CSS */}
              <rect x="1" y="1" width="248" height="198" rx="12" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
              <rect x="20" y="30" width="100" height="10" rx="5" fill="currentColor" opacity="0.3"/>
              <rect x="20" y="50" width="150" height="60" rx="8" fill="currentColor" opacity="0.2"/>
              <rect x="180" y="50" width="50" height="120" rx="8" fill="currentColor" opacity="0.2"/>
              <circle cx="28" cy="18" r="4" fill="currentColor" opacity="0.5"/>
              <circle cx="42" cy="18" r="4" fill="currentColor" opacity="0.5"/>
              <circle cx="56" cy="18" r="4" fill="currentColor" opacity="0.5"/>
            </svg>
          </div>

          <div className="hero-content"> {/* Container removed from here */}
            <h2 className="hero-title">
              Welcome to <span className="hero-title-span">ShikshaPlus</span>
            </h2>
            <p className="hero-subtitle">
              Your ultimate productivity and learning platform, designed to help you succeed.
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="hero-cta-btn"
            >
              Get Started
              {/* Embedded SVG Arrow */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ marginLeft: '8px' }}
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </section>

        {/* 3. Features Section */}
        <section className="features-section">
          <div className="container">
            <h3 className="section-title">
              Everything You Need to Succeed
            </h3>
            
            <div className="features-grid">
              {/* Feature Card 1: Dashboard */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  {/* Embedded SVG Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                </div>
                <h4 className="feature-title">Dashboard</h4>
                <p className="feature-description">
                  Track your progress, manage your tasks, and stay on top of your goals.
                </p>
              </div>
              
              {/* Feature Card 2: Courses */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  {/* Embedded SVG Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </div>
                <h4 className="feature-title">Courses</h4>
                <p className="feature-description">
                  Learn new skills with our comprehensive and expert-led courses.
                </p>
              </div>
              
              {/* Feature Card 3: Focus */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  {/* Embedded SVG Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                </div>
                <h4 className="feature-title">Focus</h4>
                <p className="feature-description">
                  Stay focused and productive with our built-in tools and techniques.
                </p>
              </div>

              {/* Feature Card 4: Advanced AI Chatbot and Assistant */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  {/* Embedded SVG Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <h4 className="feature-title">Advanced AI Chatbot and Assistant</h4>
                <p className="feature-description">
                  Get instant help and personalized assistance with our intelligent AI chatbot.
                </p>
              </div>

              {/* Feature Card 5: Mentorship */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  {/* Embedded SVG Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h4 className="feature-title">Mentorship</h4>
                <p className="feature-description">
                  Connect with experienced mentors to guide your learning journey.
                </p>
              </div>

              {/* Feature Card 6: Digital Literacy */}
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  {/* Embedded SVG Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><line x1="12" y1="6" x2="16" y2="6"></line><line x1="12" y1="10" x2="16" y2="10"></line><line x1="12" y1="14" x2="16" y2="14"></line></svg>
                </div>
                <h4 className="feature-title">Digital Literacy</h4>
                <p className="feature-description">
                  Build essential digital skills for the modern world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3.5. Tech Stack Section */}
        <section className="tech-stack-section">
          <div className="container">
            <h3 className="tech-stack-title">
              Built With a Modern Stack
            </h3>
            <div className="marquee-wrapper">
              <div className="marquee-content">
                {/* List items twice for infinite loop */}
                <span className="tech-item vite">Vite + React</span>
                <span className="tech-item python">Python</span>
                <span className="tech-item opencv">OpenCV</span>
                <span className="tech-item sql">SQL Database</span>
                
                <span className="tech-item vite">Vite + React</span>
                <span className="tech-item python">Python</span>
                <span className="tech-item opencv">OpenCV</span>
                <span className="tech-item sql">SQL Database</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Guest View Section */}
        <section className="guest-section">
          <div className="container guest-content">
            <h3 className="section-title-light">Take a Look Inside</h3>
            <p className="guest-subtitle">
              No account? No problem. View our platform as a guest and see what we offer.
            </p>
            
            <div className="guest-buttons-container">
              <button
                onClick={() => navigate('/dashboard')}
                className="guest-btn-primary"
              >
                Student Dashboard
              </button>
              <button
                onClick={() => navigate('/mentor-dashboard')}
                className="guest-btn-secondary"
              >
                Mentor Dashboard
              </button>
            </div>
          </div>
        </section>

        {/* 5. Footer - REMOVED */}
        {/*
        <footer className="landing-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} ShikshaPlus. All rights reserved.</p>
          </div>
        </footer>
        */}

      </div>
    </>
  );
};

export default Landing;