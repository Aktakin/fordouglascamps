import React from 'react';
import './VideoGameDesign.css';

function VideoGameDesign() {
  return (
    <div className="video-game-design">
      <div className="page-header">
        <h1>🎮 Video Game Design</h1>
        <p className="page-subtitle">Ages 10-15 • Create Your Own Games!</p>
      </div>

      <div className="coming-soon-container">
        <div className="coming-soon-card">
          <div className="coming-soon-icon">🚧</div>
          <h2>Coming Soon!</h2>
          <p>We're working hard to bring you amazing video game design activities!</p>
          <p className="coming-soon-subtitle">Check back soon for exciting game creation tools and challenges.</p>
        </div>
      </div>
    </div>
  );
}

export default VideoGameDesign;

