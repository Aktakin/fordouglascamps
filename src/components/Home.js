import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <main className="home" role="main">
      <section className="hero-section" aria-label="Hero section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Welcome to</span>
            <span className="title-main">Douglas Kids Camps!</span>
          </h1>
          <p className="hero-subtitle">
            Where coding meets creativity and fun! Join us for an amazing adventure 
            into the world of computers, programming, and game design. Perfect for kids 
            who want to learn coding, programming, and computer skills through interactive 
            games and activities.
          </p>
          <div className="hero-buttons">
            <Link to="/junior-computers" className="cta-button primary">
              Start Your Journey 🚀
            </Link>
          </div>
        </div>
        <div className="hero-illustration" aria-hidden="true">
          <div className="floating-icon" aria-label="Computer icon">💻</div>
          <div className="floating-icon" aria-label="Art icon">🎨</div>
          <div className="floating-icon" aria-label="Game controller icon">🎮</div>
          <div className="floating-icon" aria-label="Sparkle icon">✨</div>
        </div>
      </section>

      <section className="categories-section" aria-label="Kids coding camp programs">
        <h2 className="section-title">Choose Your Adventure - Kids Coding Camp Programs</h2>
        <div className="categories-grid" role="list">
          <Link to="/junior-computers" className="category-card junior" role="listitem">
            <div className="card-icon" aria-label="Computer monitor icon">🖥️</div>
            <h3>Junior Computers</h3>
            <p className="age-range">Ages 6-9</p>
            <p className="card-description">
              Discover the magic of computers! Learn the basics through fun games, 
              colorful activities, and interactive adventures. Perfect for kids starting 
              their coding journey with mouse skills, keyboard practice, and digital art.
            </p>
            <div className="card-features">
              <span className="feature">🎯 Mouse Skills</span>
              <span className="feature">⌨️ Keyboard Fun</span>
              <span className="feature">🎨 Digital Art</span>
              <span className="feature">🧩 Puzzle Games</span>
            </div>
            <div className="card-arrow">→</div>
          </Link>

          <Link to="/playful-programming" className="category-card programming" role="listitem">
            <div className="card-icon" aria-label="Light bulb icon">💡</div>
            <h3>Playful Programming</h3>
            <p className="age-range">Ages 9-13</p>
            <p className="card-description">
              Code your first programs! Build animations, create stories, and make 
              your computer do amazing things with simple commands. Learn Python and 
              JavaScript programming through interactive coding activities designed for kids.
            </p>
            <div className="card-features">
              <span className="feature">🐼 Python Basics</span>
              <span className="feature">🎭 Animations</span>
              <span className="feature">📚 Story Coding</span>
              <span className="feature">🎪 Interactive Projects</span>
            </div>
            <div className="card-arrow">→</div>
          </Link>

          <Link to="/video-game-design" className="category-card gamedev" role="listitem">
            <div className="card-icon" aria-label="Video game controller icon">🎮</div>
            <h3>Video Game Design</h3>
            <p className="age-range">Ages 10-15</p>
            <p className="card-description">
              Create your own video games! Design characters, build levels, and 
              bring your gaming ideas to life with professional tools. Learn game design, 
              character creation, and interactive game development for kids.
            </p>
            <div className="card-features">
              <span className="feature">🎨 Game Design</span>
              <span className="feature">👾 Character Creation</span>
              <span className="feature">🏗️ Level Building</span>
              <span className="feature">🚀 Publish Games</span>
            </div>
            <div className="card-arrow">→</div>
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Home;

