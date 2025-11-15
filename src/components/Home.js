import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Welcome to</span>
            <span className="title-main">Douglas Kids Camps!</span>
          </h1>
          <p className="hero-subtitle">
            Where coding meets creativity and fun! Join us for an amazing adventure 
            into the world of computers, programming, and game design.
          </p>
          <div className="hero-buttons">
            <Link to="/junior-computers" className="cta-button primary">
              Start Your Journey 🚀
            </Link>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="floating-icon">💻</div>
          <div className="floating-icon">🎨</div>
          <div className="floating-icon">🎮</div>
          <div className="floating-icon">✨</div>
        </div>
      </div>

      <div className="categories-section">
        <h2 className="section-title">Choose Your Adventure</h2>
        <div className="categories-grid">
          <Link to="/junior-computers" className="category-card junior">
            <div className="card-icon">🖥️</div>
            <h3>Junior Computers</h3>
            <p className="age-range">Ages 6-9</p>
            <p className="card-description">
              Discover the magic of computers! Learn the basics through fun games, 
              colorful activities, and interactive adventures.
            </p>
            <div className="card-features">
              <span className="feature">🎯 Mouse Skills</span>
              <span className="feature">⌨️ Keyboard Fun</span>
              <span className="feature">🎨 Digital Art</span>
              <span className="feature">🧩 Puzzle Games</span>
            </div>
            <div className="card-arrow">→</div>
          </Link>

          <Link to="/playful-programming" className="category-card programming">
            <div className="card-icon">💡</div>
            <h3>Playful Programming</h3>
            <p className="age-range">Ages 9-13</p>
            <p className="card-description">
              Code your first programs! Build animations, create stories, and make 
              your computer do amazing things with simple commands.
            </p>
            <div className="card-features">
              <span className="feature">🐼 Python Basics</span>
              <span className="feature">🎭 Animations</span>
              <span className="feature">📚 Story Coding</span>
              <span className="feature">🎪 Interactive Projects</span>
            </div>
            <div className="card-arrow">→</div>
          </Link>

          <Link to="/video-game-design" className="category-card gamedev">
            <div className="card-icon">🎮</div>
            <h3>Video Game Design</h3>
            <p className="age-range">Ages 10-15</p>
            <p className="card-description">
              Create your own video games! Design characters, build levels, and 
              bring your gaming ideas to life with professional tools.
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
      </div>

    </div>
  );
}

export default Home;

