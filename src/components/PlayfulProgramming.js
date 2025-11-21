import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlayfulProgramming.css';

function PlayfulProgramming() {
  const navigate = useNavigate();

  return (
    <div className="playful-programming">
      <div className="activity-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Home
        </button>
        <h1>💡 Playful Programming</h1>
        <p className="activity-subtitle">Choose your programming path!</p>
      </div>

      <div className="programming-selection">
        <div className="programming-cards">
          <div 
            className="programming-option-card"
            onClick={() => navigate('/activities/programming-adventure')}
          >
            <div className="card-icon-large">💻</div>
            <h2>Programming Adventure</h2>
            <p className="card-description">
              Learn the basics of programming! Master variables, conditionals, functions, and loops with JavaScript or Python.
            </p>
            <div className="card-features">
              <span>📦 Variables</span>
              <span>🔀 If & Else</span>
              <span>⚙️ Functions</span>
              <span>🔄 Loops</span>
            </div>
            <div className="difficulty-badge beginner">Beginner Friendly</div>
            <div className="select-card-btn">Start Learning →</div>
          </div>

          <div 
            className="programming-option-card advanced"
            onClick={() => navigate('/activities/advanced-programming')}
          >
            <div className="card-icon-large">🚀</div>
            <h2>Advanced Playful Programming</h2>
            <p className="card-description">
              Take your skills to the next level! Build complex projects, work with APIs, create interactive games, and more advanced concepts.
            </p>
            <div className="card-features">
              <span>🎨 Classes & Objects</span>
              <span>📡 APIs & Data</span>
              <span>🎮 Game Development</span>
              <span>🌐 Web Projects</span>
            </div>
            <div className="difficulty-badge advanced">Advanced Level</div>
            <div className="select-card-btn">Start Advanced →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayfulProgramming;

