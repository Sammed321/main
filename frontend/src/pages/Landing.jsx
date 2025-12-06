import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/hero-bg.png"; // <--- ADD THIS

// THEME INTEGRATED STYLES
const landingPageStyles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  overflow-x: hidden !important;
  width: 100%;
}

.landing-page {
  overflow-x: hidden !important;
  min-height: 100vh;
  font-family: var(--font-primary, "Inter", sans-serif);
  color: var(--text-primary);
  background: var(--bg-primary);
}

/* container */
.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  overflow-x: hidden;
}

/* HEADER */
.landing-header {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
}

.landing-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
}

.logo {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
}

.logo-span {
  color: var(--blue-primary);
}

/* HERO SECTION WITH BACKGROUND */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7rem 0;
  overflow: hidden;

  /* 🌟 APPLYING BACKGROUND IMAGE */
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 55%;
}

.hero-content {
  max-width: 50%;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  line-height: 1.2;
  color: var(--text-primary);
}

.hero-title-span {
  color: var(--blue-primary);
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  font-weight: 300;
  margin-bottom: 2.5rem;
  max-width: 48rem;
}

.hero-cta-btn {
  padding: 0.75rem 2rem;
  background: var(--blue-primary);
  color: #fff;
  border-radius: 9999px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-cta-btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

/* FEATURES */
.features-section {
  padding: 5rem 0;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.section-title {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.feature-icon-wrapper {
  width: 4rem;
  height: 4rem;
  background: var(--sidebar-bg-start);
  color: var(--blue-primary);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  font-size: 1.75rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: .75rem;
}

.feature-description {
  color: var(--text-secondary);
}

/* TECH STACK SECTION */
.tech-stack-section {
  padding: 5rem 0;
  background: var(--sidebar-bg-end);
  overflow: hidden;
}

.tech-stack-title {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
}

.marquee-wrapper {
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}

.marquee-content {
  display: inline-block;
  animation: marqueeAnimation 25s linear infinite;
  padding-right: 50px;
}

@keyframes marqueeAnimation {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.tech-item {
  display: inline-block;
  padding: 1rem 2rem;
  margin: 0 1rem;
  border-radius: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  background: var(--card-bg);
  border: 1px solid var(--blue-primary);
}

/* GUEST SECTION */
.guest-section {
  padding: 5rem 0;
  background: var(--bg-secondary);
}

.section-title-light {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
}

.guest-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 2.5rem;
}

.guest-buttons-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.guest-btn-primary,
.guest-btn-secondary {
  padding: 0.75rem 2.5rem;
  border-radius: 9999px;
  font-weight: 700;
  cursor: pointer;
}

.guest-btn-primary {
  background: var(--blue-primary);
  color: #fff;
}

.guest-btn-secondary {
  background: transparent;
  border: 2px solid var(--blue-primary);
  color: var(--blue-primary);
}

.guest-btn-secondary:hover {
  background: var(--blue-primary);
  color: #fff;
}
`;

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <style>{landingPageStyles}</style>

      <div className="landing-page">
        {/* HEADER */}
        <header className="landing-header">
          <nav className="landing-nav container">
            <h1 className="logo">
              Shiksha<span className="logo-span">Plus</span>
            </h1>
          </nav>
        </header>

        {/* HERO */}
        <section className="hero-section container">
          <div className="hero-content">
            <h2 className="hero-title">
              Welcome to <span className="hero-title-span">ShikshaPlus</span>
            </h2>
            <p className="hero-subtitle">
              Your ultimate productivity and learning platform, crafted to help
              you achieve more every day.
            </p>

            <button className="hero-cta-btn" onClick={() => navigate("/auth")}>
              Get Started →
            </button>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-section">
          <div className="container">
            <h3 className="section-title">Everything You Need to Succeed</h3>

            <div className="features-grid">
              {[
                { icon: "📊", title: "Dashboard", desc: "Track your journey and stay on top." },
                { icon: "📘", title: "Courses", desc: "Learn deeply with expert-led content." },
                { icon: "🎯", title: "Focus", desc: "Keep distractions away with AI." },
                { icon: "🤖", title: "AI Assistant", desc: "Instant help anytime." },
                { icon: "👨‍🏫", title: "Mentorship", desc: "Guided learning from experts." },
                { icon: "💻", title: "Digital Skills", desc: "Be ready for the future." },
              ].map((f, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-icon-wrapper">{f.icon}</div>
                  <h4 className="feature-title">{f.title}</h4>
                  <p className="feature-description">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="tech-stack-section">
          <div className="container">
            <h3 className="tech-stack-title">Built With a Modern Stack</h3>

            <div className="marquee-wrapper">
              <div className="marquee-content">
                {["Vite + React", "Python", "OpenCV", "SQL Database"]
                  .flatMap((item) => [item, item])
                  .map((item, i) => (
                    <span className="tech-item" key={i}>
                      {item}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* GUEST SECTION */}
        <section className="guest-section">
          <div className="container">
            <h3 className="section-title-light">Take a Look Inside</h3>
            <p className="guest-subtitle">
              No account needed — explore the dashboards freely.
            </p>

            <div className="guest-buttons-container">
              <button
                className="guest-btn-primary"
                onClick={() => navigate("/dashboard")}
              >
                Student Dashboard
              </button>

              <button
                className="guest-btn-secondary"
                onClick={() => navigate("/mentor-dashboard")}
              >
                Mentor Dashboard
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
