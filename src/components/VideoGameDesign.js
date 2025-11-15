import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoGameDesign.css';

function VideoGameDesign() {
  const navigate = useNavigate();

  return (
    <div className="video-game-design">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1>🎮 Video Game Design</h1>
        <p className="page-subtitle">Create Your Own Games!</p>
      </div>

      <div className="age-group-selection">
        <div className="age-group-cards">
          {/* Ages 6-9 Card */}
          <div 
            className="age-group-card junior"
            onClick={() => navigate('/video-game-design/junior')}
          >
            <div className="card-icon">🎨</div>
            <h2>Ages 6-9</h2>
            <p className="age-range">Junior Game Designers</p>
            <p className="card-description">
              Create your own games with simple tools! Design characters, 
              choose themes, add enemies and collectibles, then play your game!
            </p>
            <div className="card-features">
              <span>🎮 Simple Game Studio</span>
              <span>👤 Character Creator</span>
              <span>🎯 Play & Export</span>
            </div>
            <div className="select-age-btn">Start Creating →</div>
          </div>

          {/* Ages 10-15 Card */}
          <div className="age-group-card senior coming-soon">
            <div className="card-icon">🚀</div>
            <h2>Ages 10-15</h2>
            <p className="age-range">Advanced Game Designers</p>
            <p className="card-description">
              Coming soon! Advanced game design tools with more features, 
              complex mechanics, and professional game development concepts.
            </p>
            <div className="card-features">
              <span>⚡ Advanced Tools</span>
              <span>🎨 Custom Graphics</span>
              <span>📊 Game Analytics</span>
            </div>
            <div className="coming-soon-badge">Coming Soon</div>
            <div className="select-age-btn disabled">Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGameDesign;
