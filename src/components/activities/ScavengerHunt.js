import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ScavengerHunt.css';
import { isLevelUnlocked, completeLevel as markLevelComplete } from '../../utils/levelProgress';

function ScavengerHunt() {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [foundItems, setFoundItems] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const levelData = [
    {
      level: 1,
      title: "Find the Mouse",
      description: "Find the hidden mouse on the screen!",
      items: [
        { id: 1, emoji: '🖱️', name: 'Mouse', x: 75, y: 30, hint: 'Look near the top right!' }
      ],
      timeLimit: 60,
      theme: "🖱️",
      color: "#ff6b6b"
    },
    {
      level: 2,
      title: "Find Computer Parts",
      description: "Find the keyboard and monitor!",
      items: [
        { id: 1, emoji: '⌨️', name: 'Keyboard', x: 20, y: 60, hint: 'Check the left side!' },
        { id: 2, emoji: '🖥️', name: 'Monitor', x: 80, y: 25, hint: 'Look up high!' }
      ],
      timeLimit: 60,
      theme: "💻",
      color: "#4ecdc4"
    },
    {
      level: 3,
      title: "Tech Treasure Hunt",
      description: "Find the laptop, tablet, and phone!",
      items: [
        { id: 1, emoji: '💻', name: 'Laptop', x: 15, y: 40, hint: 'Bottom left corner!' },
        { id: 2, emoji: '📱', name: 'Phone', x: 70, y: 70, hint: 'Right side, down low!' },
        { id: 3, emoji: '📱', name: 'Tablet', x: 50, y: 15, hint: 'Top center area!' }
      ],
      timeLimit: 75,
      theme: "📱",
      color: "#ffe66d"
    },
    {
      level: 4,
      title: "Audio Equipment",
      description: "Find all the sound devices!",
      items: [
        { id: 1, emoji: '🔊', name: 'Speakers', x: 10, y: 50, hint: 'Far left side!' },
        { id: 2, emoji: '🎧', name: 'Headphones', x: 85, y: 45, hint: 'Right side, middle!' },
        { id: 3, emoji: '📻', name: 'Radio', x: 45, y: 75, hint: 'Bottom center!' }
      ],
      timeLimit: 80,
      theme: "🔊",
      color: "#aa96da"
    },
    {
      level: 5,
      title: "Camera Collection",
      description: "Find all the cameras!",
      items: [
        { id: 1, emoji: '📷', name: 'Camera', x: 25, y: 20, hint: 'Top left quarter!' },
        { id: 2, emoji: '📹', name: 'Video Camera', x: 75, y: 60, hint: 'Right side, lower!' },
        { id: 3, emoji: '📸', name: 'Polaroid', x: 50, y: 80, hint: 'Bottom center!' },
        { id: 4, emoji: '📷', name: 'Webcam', x: 90, y: 15, hint: 'Top right corner!' }
      ],
      timeLimit: 90,
      theme: "📷",
      color: "#a8e6cf"
    },
    {
      level: 6,
      title: "Storage Devices",
      description: "Find all storage devices!",
      items: [
        { id: 1, emoji: '💾', name: 'Floppy Disk', x: 15, y: 30, hint: 'Left side, upper!' },
        { id: 2, emoji: '💿', name: 'CD', x: 60, y: 25, hint: 'Top right area!' },
        { id: 3, emoji: '📀', name: 'DVD', x: 30, y: 70, hint: 'Left side, lower!' },
        { id: 4, emoji: '💿', name: 'Blu-ray', x: 80, y: 75, hint: 'Bottom right!' },
        { id: 5, emoji: '💾', name: 'USB Drive', x: 50, y: 50, hint: 'Center of screen!' }
      ],
      timeLimit: 100,
      theme: "💾",
      color: "#ff8b94"
    },
    {
      level: 7,
      title: "Gaming Gear",
      description: "Find all gaming equipment!",
      items: [
        { id: 1, emoji: '🎮', name: 'Game Controller', x: 20, y: 40, hint: 'Left side, middle!' },
        { id: 2, emoji: '🕹️', name: 'Joystick', x: 70, y: 35, hint: 'Right side, upper!' },
        { id: 3, emoji: '🎯', name: 'VR Headset', x: 45, y: 20, hint: 'Top center!' },
        { id: 4, emoji: '🎲', name: 'Gaming Dice', x: 25, y: 75, hint: 'Bottom left!' },
        { id: 5, emoji: '🎮', name: 'Console', x: 85, y: 65, hint: 'Bottom right!' },
        { id: 6, emoji: '🕹️', name: 'Arcade Stick', x: 55, y: 80, hint: 'Bottom center-right!' }
      ],
      timeLimit: 110,
      theme: "🎮",
      color: "#95e1d3"
    },
    {
      level: 8,
      title: "Smart Devices",
      description: "Find all smart devices!",
      items: [
        { id: 1, emoji: '⌚', name: 'Smartwatch', x: 10, y: 25, hint: 'Top left corner!' },
        { id: 2, emoji: '📱', name: 'Smartphone', x: 75, y: 40, hint: 'Right side, middle!' },
        { id: 3, emoji: '📺', name: 'Smart TV', x: 40, y: 15, hint: 'Top left-center!' },
        { id: 4, emoji: '🏠', name: 'Smart Home', x: 60, y: 70, hint: 'Right side, lower!' },
        { id: 5, emoji: '💡', name: 'Smart Light', x: 30, y: 55, hint: 'Left side, middle!' },
        { id: 6, emoji: '🔌', name: 'Smart Plug', x: 85, y: 80, hint: 'Bottom right!' },
        { id: 7, emoji: '📱', name: 'Tablet', x: 50, y: 45, hint: 'Center area!' }
      ],
      timeLimit: 120,
      theme: "🏠",
      color: "#f38181"
    },
    {
      level: 9,
      title: "Complete Tech Setup",
      description: "Find everything for a complete computer setup!",
      items: [
        { id: 1, emoji: '🖥️', name: 'Monitor', x: 20, y: 20, hint: 'Top left!' },
        { id: 2, emoji: '⌨️', name: 'Keyboard', x: 15, y: 60, hint: 'Left side, lower!' },
        { id: 3, emoji: '🖱️', name: 'Mouse', x: 80, y: 30, hint: 'Top right!' },
        { id: 4, emoji: '🔊', name: 'Speakers', x: 25, y: 75, hint: 'Bottom left!' },
        { id: 5, emoji: '📷', name: 'Webcam', x: 75, y: 15, hint: 'Top right corner!' },
        { id: 6, emoji: '💻', name: 'Computer', x: 50, y: 50, hint: 'Center!' },
        { id: 7, emoji: '🎧', name: 'Headphones', x: 85, y: 65, hint: 'Bottom right!' },
        { id: 8, emoji: '📱', name: 'Phone', x: 60, y: 80, hint: 'Bottom center-right!' }
      ],
      timeLimit: 120,
      theme: "🖥️",
      color: "#c7ceea"
    },
    {
      level: 10,
      title: "Ultimate Tech Hunt",
      description: "Find ALL the tech items! This is the ultimate challenge!",
      items: [
        { id: 1, emoji: '🖥️', name: 'Monitor', x: 10, y: 15, hint: 'Top left corner!' },
        { id: 2, emoji: '⌨️', name: 'Keyboard', x: 20, y: 70, hint: 'Left side, bottom!' },
        { id: 3, emoji: '🖱️', name: 'Mouse', x: 85, y: 25, hint: 'Top right!' },
        { id: 4, emoji: '💻', name: 'Laptop', x: 30, y: 40, hint: 'Left-center!' },
        { id: 5, emoji: '📱', name: 'Phone', x: 70, y: 50, hint: 'Right-center!' },
        { id: 6, emoji: '🎮', name: 'Controller', x: 15, y: 45, hint: 'Left side, middle!' },
        { id: 7, emoji: '🎧', name: 'Headphones', x: 80, y: 60, hint: 'Right side, lower!' },
        { id: 8, emoji: '📷', name: 'Camera', x: 50, y: 20, hint: 'Top center!' },
        { id: 9, emoji: '💾', name: 'USB', x: 40, y: 75, hint: 'Bottom left-center!' },
        { id: 10, emoji: '⌚', name: 'Watch', x: 90, y: 80, hint: 'Bottom right corner!' }
      ],
      timeLimit: 150,
      theme: "🏆",
      color: "#ffd93d"
    }
  ];

  const currentLevelData = levelData.find(l => l.level === currentLevel) || levelData[0];

  useEffect(() => {
    if (gameActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameActive, timeRemaining]);

  useEffect(() => {
    if (foundItems.length === currentLevelData.items.length && gameActive) {
      setGameActive(false);
      setLevelComplete(true);
      const timeBonus = Math.max(0, timeRemaining * 10);
      const levelScore = (currentLevelData.items.length * 100) + timeBonus;
      setScore(prev => prev + levelScore);
      // Mark level as completed in localStorage
      markLevelComplete('scavenger-hunt', currentLevel);
    }
  }, [foundItems, currentLevelData.items.length, gameActive, timeRemaining, currentLevel]);

  const startLevel = () => {
    setFoundItems([]);
    setTimeRemaining(currentLevelData.timeLimit);
    setGameActive(true);
    setLevelComplete(false);
    setShowHint(false);
  };

  const handleItemClick = (itemId) => {
    if (!gameActive || foundItems.includes(itemId)) return;
    
    setFoundItems([...foundItems, itemId]);
    
    // Play success sound effect (visual feedback)
    const item = currentLevelData.items.find(i => i.id === itemId);
    if (item) {
      // Visual feedback handled by CSS
    }
  };

  const nextLevel = () => {
    if (currentLevel < 10) {
      setCurrentLevel(prev => prev + 1);
      setFoundItems([]);
      setLevelComplete(false);
      setGameActive(false);
      setShowHint(false);
    }
  };

  const resetLevel = () => {
    setFoundItems([]);
    setTimeRemaining(currentLevelData.timeLimit);
    setGameActive(false);
    setLevelComplete(false);
    setShowHint(false);
  };

  const getItemPosition = (item) => {
    return {
      left: `${item.x}%`,
      top: `${item.y}%`
    };
  };

  return (
    <div className="scavenger-hunt">
      <div className="activity-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1>🔍 Scavenger Hunt</h1>
        <p className="activity-subtitle">Find hidden tech items in 10 exciting levels!</p>
      </div>

      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <div className="coming-soon-icon">🚧</div>
          <h2>Coming Soon!</h2>
          <p className="coming-soon-text">
            The Scavenger Hunt is currently under development.
          </p>
          <p className="coming-soon-description">
            We're working hard to create an amazing scavenger hunt experience where you'll find hidden tech items across 10 exciting levels!
          </p>
          <div className="coming-soon-features">
            <div className="feature-item">🔍 Find hidden items</div>
            <div className="feature-item">⏱️ Race against time</div>
            <div className="feature-item">🏆 Earn points and badges</div>
            <div className="feature-item">🎮 10 challenging levels</div>
          </div>
          <button onClick={() => navigate(-1)} className="back-to-activities-btn">
            ← Back
          </button>
        </div>
      </div>

      {/* Commented out for coming soon
      <div className="hunt-container">
        <div className="hunt-sidebar">
          <div className="level-info-hunt">
            <div className="level-badge-hunt" style={{ backgroundColor: currentLevelData.color }}>
              <span className="level-theme-hunt">{currentLevelData.theme}</span>
              <div>
                <h2>Level {currentLevel}</h2>
                <p>{currentLevelData.title}</p>
              </div>
            </div>
            <div className="level-description-hunt">
              <p>{currentLevelData.description}</p>
            </div>
          </div>

          <div className="hunt-stats">
            <div className="stat-card-hunt">
              <span className="stat-label-hunt">Items Found</span>
              <span className="stat-value-hunt">
                {foundItems.length} / {currentLevelData.items.length}
              </span>
            </div>
            <div className="stat-card-hunt">
              <span className="stat-label-hunt">Time Left</span>
              <span className={`stat-value-hunt ${timeRemaining < 10 ? 'time-warning' : ''}`}>
                {timeRemaining}s
              </span>
            </div>
            <div className="stat-card-hunt">
              <span className="stat-label-hunt">Score</span>
              <span className="stat-value-hunt">{score}</span>
            </div>
          </div>

          <div className="items-to-find">
            <h3>🔍 Find These Items:</h3>
            <div className="items-list">
              {currentLevelData.items.map(item => (
                <div
                  key={item.id}
                  className={`item-check ${foundItems.includes(item.id) ? 'found' : ''}`}
                >
                  <span className="item-emoji-check">{item.emoji}</span>
                  <span className="item-name-check">{item.name}</span>
                  {foundItems.includes(item.id) && <span className="check-mark">✓</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="hunt-controls">
            {!gameActive && !levelComplete && (
              <button onClick={startLevel} className="start-btn-hunt">
                ▶️ Start Hunt
              </button>
            )}
            {gameActive && (
              <button onClick={() => setShowHint(!showHint)} className="hint-btn">
                {showHint ? '🙈 Hide Hints' : '💡 Show Hints'}
              </button>
            )}
            {levelComplete && currentLevel < 10 && (
              <button onClick={nextLevel} className="next-btn-hunt">
                Continue to Level {currentLevel + 1} →
              </button>
            )}
            {levelComplete && currentLevel === 10 && (
              <div className="all-complete-hunt">
                <h4>🏆 Congratulations!</h4>
                <p>You completed all 10 levels!</p>
                <p className="final-score-hunt">Final Score: {score}</p>
                <button onClick={() => {
                  setCurrentLevel(1);
                  setScore(0);
                  resetLevel();
                }} className="play-again-hunt">
                  Play Again
                </button>
              </div>
            )}
            <button onClick={resetLevel} className="reset-btn-hunt">
              🔄 Reset Level
            </button>
          </div>

          <div className="level-progress-hunt">
            <h4>Select Level</h4>
            <div className="levels-grid-hunt">
              {levelData.map((lvl) => {
                const activityId = 'scavenger-hunt';
                const unlocked = isLevelUnlocked(activityId, lvl.level);
                
                return (
                  <div
                    key={lvl.level}
                    className={`level-dot-hunt ${lvl.level === currentLevel ? 'active' : ''} ${!unlocked ? 'locked' : ''}`}
                    style={{ 
                      backgroundColor: lvl.color,
                      opacity: unlocked ? 1 : 0.4,
                      cursor: unlocked ? 'pointer' : 'not-allowed'
                    }}
                    title={unlocked ? `Level ${lvl.level}: ${lvl.title}` : `🔒 Complete previous levels to unlock`}
                    onClick={() => {
                      if (unlocked) {
                        setCurrentLevel(lvl.level);
                        resetLevel();
                      }
                    }}
                  >
                    {!unlocked ? '🔒' : (lvl.level === currentLevel ? lvl.theme : lvl.level)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hunt-area">
          <div className="hunt-canvas">
            {!gameActive && !levelComplete && (
              <div className="start-screen">
                <h3>🔍 Ready to Hunt?</h3>
                <p>Click "Start Hunt" to begin finding items!</p>
                <p className="instruction-text">
                  Find all {currentLevelData.items.length} item{currentLevelData.items.length !== 1 ? 's' : ''} before time runs out!
                </p>
              </div>
            )}

            {gameActive && currentLevelData.items.map(item => {
              const isFound = foundItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`hunt-item ${isFound ? 'found' : ''} ${showHint ? 'hint-visible' : ''}`}
                  style={getItemPosition(item)}
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className="item-emoji">{item.emoji}</div>
                  {showHint && !isFound && (
                    <div className="item-hint">{item.hint}</div>
                  )}
                  {isFound && (
                    <div className="found-effect">✓</div>
                  )}
                </div>
              );
            })}

            {levelComplete && (
              <div className="level-complete-screen">
                <h3>🎉 Level Complete!</h3>
                <p>You found all {currentLevelData.items.length} items!</p>
                <p className="time-bonus">Time Bonus: +{timeRemaining * 10} points</p>
                <p className="level-score">Level Score: {(currentLevelData.items.length * 100) + (timeRemaining * 10)}</p>
              </div>
            )}

            {gameActive && timeRemaining === 0 && (
              <div className="time-up-screen">
                <h3>⏰ Time's Up!</h3>
                <p>You found {foundItems.length} out of {currentLevelData.items.length} items!</p>
                <button onClick={resetLevel} className="retry-btn-hunt">
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      */}
    </div>
  );
}

export default ScavengerHunt;

