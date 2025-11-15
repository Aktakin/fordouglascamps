import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './JuniorComputers.css';

function JuniorComputers() {

  return (
    <div className="junior-computers">
      <div className="page-header">
        <h1>🖥️ Junior Computers</h1>
        <p className="page-subtitle">Ages 6-9 • Fun with Computers!</p>
      </div>

      <div className="activities-container">
        <Link to="/activities/mouse-skills" className="activity-card-link">
          <div className="activity-card">
            <h2>🎯 Mouse Skills Challenge</h2>
            <p>Learn left click, right click, and mouse movement! Test your skills with fun challenges.</p>
            <div className="activity-preview">
              <div className="preview-icon">🖱️</div>
              <p className="preview-text">Click to start the full challenge!</p>
            </div>
            <div className="card-arrow">→</div>
          </div>
        </Link>

        <Link to="/activities/keyboard-adventure" className="activity-card-link">
          <div className="activity-card">
            <h2>⌨️ Keyboard Adventure</h2>
            <p>Master typing with 10 exciting levels! Test your speed and accuracy.</p>
            <div className="activity-preview">
              <div className="preview-icon">⌨️</div>
              <p className="preview-text">Click to start the typing adventure!</p>
            </div>
            <div className="card-arrow">→</div>
          </div>
        </Link>

        <Link to="/activities/digital-art-studio" className="activity-card-link">
          <div className="activity-card">
            <h2>🎨 Digital Art Studio</h2>
            <p>Create amazing art with 10 fun challenges! Draw, color, and express your creativity!</p>
            <div className="activity-preview">
              <div className="preview-icon">🎨</div>
              <p className="preview-text">Click to start creating art!</p>
            </div>
            <div className="card-arrow">→</div>
          </div>
        </Link>


        <div className="activity-card">
          <h2>🌟 Certificate of Achievement</h2>
          <p>You've completed all activities! Print or save your certificate.</p>
          <div className="certificate">
            <div className="certificate-content">
              <h3>🏆 Certificate of Completion</h3>
              <p className="certificate-text">
                This certifies that you have completed the<br />
                <strong>Junior Computers</strong> course<br />
                and demonstrated excellent computer skills!
              </p>
              <div className="certificate-stamp">⭐</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JuniorComputers;

