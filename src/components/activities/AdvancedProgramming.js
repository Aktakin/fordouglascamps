import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvancedProgramming.css';
import InteractiveWebProject from './InteractiveWebProject';
import { webProjects } from './webProjectsData';
import GameDevelopment from './GameDevelopment';

function AdvancedProgramming() {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(null);

  if (!selectedPath) {
    return (
      <div className="advanced-programming">
        <div className="activity-header">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Back
          </button>
          <h1>🚀 Advanced Playful Programming</h1>
          <p className="activity-subtitle">Choose your path!</p>
        </div>

        <div className="path-selection">
          <div className="path-cards">
            <div 
              className="path-card web-projects"
              onClick={() => setSelectedPath('web')}
            >
              <div className="path-icon">🌐</div>
              <h2>Web Projects</h2>
              <p className="path-description">
                Build interactive websites and web applications! Learn HTML, CSS, JavaScript, and create real projects.
              </p>
              <div className="path-features">
                <span>🎨 HTML & CSS</span>
                <span>✨ Interactive Design</span>
                <span>🎯 Real Projects</span>
                <span>📱 Responsive Web</span>
              </div>
              <div className="select-path-btn">Start Building →</div>
            </div>

            <div 
              className="path-card game-dev"
              onClick={() => setSelectedPath('game')}
            >
              <div className="path-icon">🎮</div>
              <h2>Game Development</h2>
              <p className="path-description">
                Create your own games from scratch! Build complete games with physics, scoring, levels, and more.
              </p>
              <div className="path-features">
                <span>👾 Game Mechanics</span>
                <span>⚡ Physics Engine</span>
                <span>🎯 Levels & Scoring</span>
                <span>🎨 Graphics & Sound</span>
              </div>
              <div className="select-path-btn">Start Creating →</div>
            </div>
          </div>

          <div className="coming-soon-note">
            <p>🚧 More paths coming soon: Classes & Objects, APIs & Data</p>
          </div>
        </div>
      </div>
    );
  }

  // Render the selected path component
  if (selectedPath === 'web') {
    return <WebProjects onBack={() => setSelectedPath(null)} />;
  } else if (selectedPath === 'game') {
    return <GameDevelopment onBack={() => setSelectedPath(null)} />;
  }

  return null;
}

// Web Projects Component
function WebProjects({ onBack }) {
  const [selectedProject, setSelectedProject] = useState(null);

  // If a project is selected, show the interactive editor
  if (selectedProject) {
    return (
      <InteractiveWebProject
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
        activityId="web-projects"
      />
    );
  }

  // Show project selection
  return (
    <div className="advanced-programming">
      <div className="activity-header">
        <button onClick={onBack} className="back-button">
          ← Back to Paths
        </button>
        <h1>🌐 Web Projects</h1>
        <p className="activity-subtitle">Build real websites!</p>
      </div>

      <div className="projects-container">
        <div className="intro-section">
          <h2>What You'll Build</h2>
          <p>Create interactive websites and web applications with HTML, CSS, and JavaScript!</p>
        </div>

        <div className="project-cards-grid">
          {webProjects.map((project) => (
            <div 
              key={project.id} 
              className={`project-card ${project.id === 10 ? 'featured' : ''}`}
            >
              <div className="project-number">Project {project.id}</div>
              <div className="project-icon">{project.icon}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-skills">
                {project.skills.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
              <button 
                className="start-project-btn"
                onClick={() => setSelectedProject(project)}
              >
                Start Project
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdvancedProgramming;

