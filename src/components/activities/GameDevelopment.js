import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InteractiveWebProject from './InteractiveWebProject';
import { gameProjects } from './gameProjectsData';
import './GameDevelopment.css';

function GameDevelopment() {
  const [selectedGame, setSelectedGame] = useState(null);

  if (selectedGame) {
    return (
      <InteractiveWebProject
        project={selectedGame}
        onBack={() => setSelectedGame(null)}
        activityId="game-development"
      />
    );
  }

  return (
    <div className="game-development-container">
      <div className="game-dev-header">
        <Link to="/activities/advanced-programming" className="back-to-advanced">
          ← Back to Advanced Programming
        </Link>
        <h1>🎮 Game Development</h1>
        <p className="game-dev-subtitle">
          Build amazing games from scratch! Type the code character by character to learn game development.
        </p>
      </div>

      <div className="game-projects-grid">
        {gameProjects.map((game) => (
          <div
            key={game.id}
            className={`game-project-card ${game.id === 10 ? 'featured' : ''}`}
            onClick={() => setSelectedGame(game)}
          >
            {game.id === 10 && (
              <div className="featured-badge">⭐ FINAL PROJECT</div>
            )}
            <div className="game-project-icon">{game.icon}</div>
            <h3 className="game-project-title">{game.title}</h3>
            <p className="game-project-description">{game.description}</p>
            
            <div className="game-project-skills">
              {game.skills.map((skill, index) => (
                <span key={index} className="skill-badge-game">{skill}</span>
              ))}
            </div>

            <button className="start-game-btn">
              Start Project →
            </button>
          </div>
        ))}
      </div>

      <div className="game-dev-footer">
        <div className="learning-path">
          <h3>🎯 Your Game Development Journey</h3>
          <div className="path-steps">
            <div className="path-step">
              <div className="step-number">1-3</div>
              <div className="step-content">
                <h4>Beginner Games</h4>
                <p>Learn basic game mechanics, events, and interactions</p>
              </div>
            </div>
            <div className="path-step">
              <div className="step-number">4-6</div>
              <div className="step-content">
                <h4>Intermediate Games</h4>
                <p>Master animations, physics, and advanced features</p>
              </div>
            </div>
            <div className="path-step">
              <div className="step-number">7-9</div>
              <div className="step-content">
                <h4>Advanced Games</h4>
                <p>Build complex games with AI, combat, and racing</p>
              </div>
            </div>
            <div className="path-step featured-step">
              <div className="step-number">10</div>
              <div className="step-content">
                <h4>Dream Game</h4>
                <p>Combine all your skills into one amazing project!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDevelopment;

