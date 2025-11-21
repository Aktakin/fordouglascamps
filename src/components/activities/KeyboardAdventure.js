import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './KeyboardAdventure.css';
import { isLevelUnlocked, completeLevel as markLevelComplete } from '../../utils/levelProgress';

const levelData = [
    {
      level: 1,
      title: "Home Row Basics",
      description: "Learn the home row keys: ASDF JKL;",
      text: "asdf jkl; asdf jkl; asdf jkl; asdf jkl;",
      targetWpm: 10,
      theme: "🏠",
      color: "#ff6b6b"
    },
    {
      level: 2,
      title: "Top Row Adventure",
      description: "Master the top row: QWERTY UIOP",
      text: "qwerty uiop qwerty uiop qwerty uiop",
      targetWpm: 15,
      theme: "⛰️",
      color: "#4ecdc4"
    },
    {
      level: 3,
      title: "Bottom Row Challenge",
      description: "Conquer the bottom row: ZXCV BNM",
      text: "zxcv bnm zxcv bnm zxcv bnm zxcv bnm",
      targetWpm: 15,
      theme: "🌊",
      color: "#ffe66d"
    },
    {
      level: 4,
      title: "Mixed Letters",
      description: "Combine all rows together!",
      text: "quick brown fox jumps over lazy dog",
      targetWpm: 20,
      theme: "🌈",
      color: "#aa96da"
    },
    {
      level: 5,
      title: "Number Row",
      description: "Type numbers: 1234567890",
      text: "123 456 789 012 345 678 901 234",
      targetWpm: 18,
      theme: "🔢",
      color: "#a8e6cf"
    },
    {
      level: 6,
      title: "Symbols & Punctuation",
      description: "Master special characters!",
      text: "hello! how are you? i'm great, thanks.",
      targetWpm: 22,
      theme: "✨",
      color: "#ff8b94"
    },
    {
      level: 7,
      title: "Short Sentences",
      description: "Type complete sentences!",
      text: "the cat sat on the mat. the dog ran fast. birds fly high in sky.",
      targetWpm: 25,
      theme: "📝",
      color: "#95e1d3"
    },
    {
      level: 8,
      title: "Longer Sentences",
      description: "Challenge yourself with longer text!",
      text: "coding is fun and exciting. practice makes perfect. keep typing every day.",
      targetWpm: 30,
      theme: "📚",
      color: "#f38181"
    },
    {
      level: 9,
      title: "Speed Challenge",
      description: "Type as fast as you can!",
      text: "the quick brown fox jumps over the lazy dog. typing fast is a great skill.",
      targetWpm: 35,
      theme: "⚡",
      color: "#c7ceea"
    },
    {
      level: 10,
      title: "Special Keys Master",
      description: "Master special keyboard keys: Enter, Tab, Shift, Caps Lock, Backspace, and Control!",
      text: "special",
      targetWpm: 0,
      theme: "👑",
      color: "#ffd93d",
      isSpecialKeysLevel: true
    }
  ];

function KeyboardAdventure() {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [levelComplete, setLevelComplete] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [levelScore, setLevelScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [specialKeysProgress, setSpecialKeysProgress] = useState({
    enter: false,
    tab: false,
    shift: false,
    capslock: false,
    backspace: false,
    control: false
  });
  const [currentSpecialKey, setCurrentSpecialKey] = useState(0);
  const [specialKeyInstructions, setSpecialKeyInstructions] = useState('');
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const specialKeysChallenge = [
    {
      key: 'Enter',
      display: 'Enter',
      instruction: 'Press ENTER to go to the next line!',
      emoji: '⏎',
      description: 'Enter creates a new line or submits forms!'
    },
    {
      key: 'Tab',
      display: 'Tab',
      instruction: 'Press TAB to move forward!',
      emoji: '⇥',
      description: 'Tab moves your cursor forward or switches between fields!'
    },
    {
      key: 'Shift',
      display: 'Shift',
      instruction: 'Hold SHIFT and type a letter to make it CAPITAL!',
      emoji: '⇧',
      description: 'Shift makes letters uppercase! Try: Shift + A = A'
    },
    {
      key: 'CapsLock',
      display: 'Caps Lock',
      instruction: 'Press CAPS LOCK to type in ALL CAPS!',
      emoji: '⇪',
      description: 'Caps Lock makes all letters uppercase until you turn it off!'
    },
    {
      key: 'Backspace',
      display: 'Backspace',
      instruction: 'Press BACKSPACE to delete the last character!',
      emoji: '⌫',
      description: 'Backspace erases what you just typed!'
    },
    {
      key: 'Control',
      display: 'Control',
      instruction: 'Hold CONTROL (Ctrl) and press a key for shortcuts!',
      emoji: 'Ctrl',
      description: 'Control is used for keyboard shortcuts like Ctrl+C to copy!'
    }
  ];

  useEffect(() => {
    if (gameActive && startTime) {
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        setTimeElapsed(elapsed);
        
        if (userInput.length > 0) {
          const wordsTyped = userInput.trim().split(/\s+/).length;
          const minutes = elapsed / 60;
          const calculatedWpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
          setWpm(calculatedWpm);
        }
      }, 100);
      
      return () => clearInterval(timerRef.current);
    }
  }, [gameActive, startTime, userInput]);

  useEffect(() => {
    if (currentLevel <= 10) {
      const level = levelData.find(l => l.level === currentLevel);
      if (level) {
        if (level.isSpecialKeysLevel) {
          // Special keys level
          setCurrentSpecialKey(0);
          setSpecialKeysProgress({
            enter: false,
            tab: false,
            shift: false,
            capslock: false,
            backspace: false,
            control: false
          });
          setSpecialKeyInstructions(specialKeysChallenge[0].instruction);
        } else {
          // Regular typing level
          setCurrentText(level.text);
          setUserInput('');
        }
        setGameActive(false);
        setStartTime(null);
        setTimeElapsed(0);
        setWpm(0);
        setAccuracy(100);
        setErrors(0);
        setLevelComplete(false);
        setShowResults(false);
        setLevelScore(0);
      }
    }
  }, [currentLevel]);

  const handleKeyDown = (e) => {
    const level = levelData.find(l => l.level === currentLevel);
    
    if (level && level.isSpecialKeysLevel) {
      // Prevent default for all special keys to keep focus in input
      if (['Enter', 'Tab', 'CapsLock', 'Backspace', 'Control'].includes(e.key) || 
          (e.shiftKey && e.key.match(/[A-Z]/)) ||
          (e.ctrlKey && e.key !== 'Control')) {
        e.preventDefault();
      }
      handleSpecialKeyPress(e);
      return;
    }
  };

  const handleSpecialKeyPress = (e) => {
    const currentChallenge = specialKeysChallenge[currentSpecialKey];
    let keyPressed = false;
    let keyName = '';

    // Check which special key was pressed
    if (currentChallenge.key === 'Enter' && e.key === 'Enter') {
      keyPressed = true;
      keyName = 'enter';
    } else if (currentChallenge.key === 'Tab' && e.key === 'Tab') {
      keyPressed = true;
      keyName = 'tab';
    } else if (currentChallenge.key === 'Shift') {
      // For Shift, check if they're holding Shift and typing an uppercase letter
      if (e.shiftKey && e.key.length === 1 && e.key.match(/[A-Z]/)) {
        keyPressed = true;
        keyName = 'shift';
      }
    } else if (currentChallenge.key === 'CapsLock' && e.key === 'CapsLock') {
      keyPressed = true;
      keyName = 'capslock';
    } else if (currentChallenge.key === 'Backspace' && e.key === 'Backspace') {
      keyPressed = true;
      keyName = 'backspace';
    } else if (currentChallenge.key === 'Control') {
      // For Control, check if they're using Ctrl + another key (not just Ctrl alone)
      if (e.ctrlKey && e.key !== 'Control' && e.key.length > 0) {
        keyPressed = true;
        keyName = 'control';
      }
    }

    if (keyPressed) {
      setSpecialKeysProgress(prev => ({
        ...prev,
        [keyName]: true
      }));

      // Move to next key
      if (currentSpecialKey < specialKeysChallenge.length - 1) {
        setTimeout(() => {
          setCurrentSpecialKey(prev => prev + 1);
          setSpecialKeyInstructions(specialKeysChallenge[currentSpecialKey + 1].instruction);
        }, 800);
      } else {
        // All keys completed
        setTimeout(() => {
          completeSpecialKeysLevel();
        }, 800);
      }
    }
  };

  const handleInputChange = (e) => {
    const level = levelData.find(l => l.level === currentLevel);
    
    if (level && level.isSpecialKeysLevel) {
      return; // Don't handle input for special keys level
    }

    const value = e.target.value;
    
    if (!gameActive && value.length > 0) {
      setGameActive(true);
      setStartTime(Date.now());
    }
    
    setUserInput(value);
    
    // Calculate accuracy
    let errorCount = 0;
    for (let i = 0; i < Math.min(value.length, currentText.length); i++) {
      if (value[i] !== currentText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
    
    const totalChars = Math.max(value.length, 1);
    const accuracyPercent = Math.max(0, Math.round(((totalChars - errorCount) / totalChars) * 100));
    setAccuracy(accuracyPercent);
    
    // Check if level is complete
    if (value === currentText) {
      completeLevel();
    }
  };

  const completeSpecialKeysLevel = () => {
    setLevelComplete(true);
    setShowResults(true);
    const score = 1000; // Bonus score for completing special keys
    setLevelScore(score);
    setTotalScore(prev => prev + score);
    
    // Mark level as completed in localStorage
    markLevelComplete('keyboard-adventure', currentLevel);
  };

  const completeLevel = () => {
    setGameActive(false);
    clearInterval(timerRef.current);
    
    const level = levelData.find(l => l.level === currentLevel);
    const wordsTyped = currentText.trim().split(/\s+/).length;
    const minutes = timeElapsed / 60;
    const finalWpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
    
    // Calculate score: WPM * accuracy * level multiplier
    const baseScore = finalWpm * (accuracy / 100);
    const levelMultiplier = currentLevel;
    const bonus = finalWpm >= level.targetWpm ? 50 : 0;
    const score = Math.round(baseScore * levelMultiplier + bonus);
    
    setLevelScore(score);
    setTotalScore(prev => prev + score);
    setLevelComplete(true);
    setShowResults(true);
    
    // Mark level as completed in localStorage
    markLevelComplete('keyboard-adventure', currentLevel);
  };

  const startNextLevel = () => {
    if (currentLevel < 10) {
      setCurrentLevel(prev => prev + 1);
      setShowResults(false);
    }
  };

  const resetLevel = () => {
    setUserInput('');
    setGameActive(false);
    setStartTime(null);
    setTimeElapsed(0);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setLevelComplete(false);
    setShowResults(false);
    setLevelScore(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getCurrentLevelData = () => {
    return levelData.find(l => l.level === currentLevel) || levelData[0];
  };

  const level = getCurrentLevelData();
  const isSpecialKeysLevel = level.isSpecialKeysLevel;
  
  const displayText = !isSpecialKeysLevel ? currentText.split('').map((char, index) => {
    let className = 'char';
    if (index < userInput.length) {
      className += userInput[index] === char ? ' correct' : ' incorrect';
    } else if (index === userInput.length) {
      className += ' current';
    }
    return <span key={index} className={className}>{char === ' ' ? '\u00A0' : char}</span>;
  }) : null;

  return (
    <div className="keyboard-adventure">
      <div className="activity-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1>⌨️ Keyboard Adventure</h1>
        <p className="activity-subtitle">Master typing with 10 exciting levels!</p>
      </div>

      {currentLevel <= 10 ? (
        <div className="typing-screen">
          <div className="level-header">
            <div className="level-info">
              <div className="level-badge" style={{ backgroundColor: level.color }}>
                <span className="level-theme">{level.theme}</span>
                <div>
                  <h2>Level {currentLevel}</h2>
                  <p>{level.title}</p>
                </div>
              </div>
            </div>
            <div className="level-stats">
              <div className="stat-card">
                <span className="stat-label">WPM</span>
                <span className="stat-value">{wpm}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Accuracy</span>
                <span className="stat-value">{accuracy}%</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Time</span>
                <span className="stat-value">{Math.round(timeElapsed)}s</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Errors</span>
                <span className="stat-value errors">{errors}</span>
              </div>
            </div>
          </div>

          <div className="level-description">
            <p>{level.description}</p>
            {!isSpecialKeysLevel && <p className="target-info">Target: {level.targetWpm} WPM</p>}
            {isSpecialKeysLevel && <p className="target-info">Complete all 6 special key challenges!</p>}
          </div>

          {isSpecialKeysLevel ? (
            <div className="special-keys-area">
              <div className="special-keys-instruction">
                <div className="instruction-box">
                  <h3>{specialKeysChallenge[currentSpecialKey].emoji}</h3>
                  <p className="instruction-text">{specialKeyInstructions}</p>
                  <p className="instruction-description">{specialKeysChallenge[currentSpecialKey].description}</p>
                </div>
              </div>

              <div className="special-keys-grid">
                {specialKeysChallenge.map((challenge, index) => (
                  <div
                    key={challenge.key}
                    className={`special-key-card ${specialKeysProgress[challenge.key.toLowerCase()] ? 'completed' : ''} ${index === currentSpecialKey ? 'active' : ''}`}
                    style={{ 
                      backgroundColor: specialKeysProgress[challenge.key.toLowerCase()] ? level.color : 'rgba(255, 255, 255, 0.1)',
                      borderColor: index === currentSpecialKey ? level.color : 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <div className="key-emoji">{challenge.emoji}</div>
                    <div className="key-name">{challenge.display}</div>
                    {specialKeysProgress[challenge.key.toLowerCase()] && (
                      <div className="key-check">✓</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="special-keys-input-area">
                <div className="input-hint">
                  {currentSpecialKey < specialKeysChallenge.length ? (
                    <p>Try pressing: <strong>{specialKeysChallenge[currentSpecialKey].display}</strong></p>
                  ) : (
                    <p>🎉 All special keys completed!</p>
                  )}
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  onKeyDown={handleKeyDown}
                  className="special-keys-input"
                  placeholder="Press the special keys as instructed..."
                  autoFocus
                  defaultValue=""
                />
                <div className="special-keys-progress">
                  <div className="progress-text">
                    Progress: {Object.values(specialKeysProgress).filter(Boolean).length} / {specialKeysChallenge.length}
                  </div>
                  <div className="progress-bar-special">
                    <div 
                      className="progress-fill-special"
                      style={{ 
                        width: `${(Object.values(specialKeysProgress).filter(Boolean).length / specialKeysChallenge.length) * 100}%`,
                        backgroundColor: level.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="typing-area">
              <div className="text-display">
                {displayText}
              </div>
              <div className="input-container">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && levelComplete) {
                      startNextLevel();
                    }
                  }}
                  className="typing-input"
                  placeholder={gameActive ? "" : "Start typing to begin..."}
                  disabled={levelComplete}
                  autoFocus
                />
              </div>
              <div className="progress-indicator">
                <div 
                  className="progress-bar-fill"
                  style={{ 
                    width: `${(userInput.length / currentText.length) * 100}%`,
                    backgroundColor: level.color
                  }}
                ></div>
              </div>
            </div>
          )}

          {showResults && (
            <div className="results-popup">
              <div className="results-content">
                <h3>🎉 Level {currentLevel} Complete!</h3>
                <div className="results-stats">
                  <div className="result-item">
                    <span className="result-label">Words Per Minute:</span>
                    <span className="result-value">{wpm} WPM</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Accuracy:</span>
                    <span className="result-value">{accuracy}%</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Time:</span>
                    <span className="result-value">{Math.round(timeElapsed)}s</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Score:</span>
                    <span className="result-value highlight">{levelScore} points</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Total Score:</span>
                    <span className="result-value highlight">{totalScore} points</span>
                  </div>
                </div>
                {wpm >= level.targetWpm ? (
                  <div className="target-achieved">
                    🏆 Target Achieved! Bonus points earned!
                  </div>
                ) : (
                  <div className="target-missed">
                    💪 Keep practicing! Target was {level.targetWpm} WPM
                  </div>
                )}
                {currentLevel < 10 ? (
                  <button onClick={startNextLevel} className="next-level-btn">
                    Continue to Level {currentLevel + 1} →
                  </button>
                ) : (
                  <div className="all-complete">
                    <h4>🏆 Congratulations!</h4>
                    <p>You've completed all 10 levels!</p>
                    <p className="final-score">Final Score: {totalScore} points</p>
                    <button onClick={() => {
                      setCurrentLevel(1);
                      setTotalScore(0);
                      resetLevel();
                    }} className="play-again-btn">
                      Play Again
                    </button>
                  </div>
                )}
                <button onClick={resetLevel} className="retry-level-btn">
                  Retry Level
                </button>
              </div>
            </div>
          )}

          <div className="keyboard-tips">
            <h4>💡 Typing Tips</h4>
            <ul>
              <li>Keep your fingers on the home row (ASDF JKL;)</li>
              <li>Use all your fingers, not just one or two!</li>
              <li>Look at the screen, not your keyboard</li>
              <li>Practice makes perfect - keep trying!</li>
            </ul>
          </div>

          <div className="level-progress-indicator">
            <div className="levels-grid">
              {levelData.map((lvl) => {
                const activityId = 'keyboard-adventure';
                const unlocked = isLevelUnlocked(activityId, lvl.level);
                
                return (
                  <div
                    key={lvl.level}
                    className={`level-dot ${lvl.level === currentLevel ? 'active' : ''} ${!unlocked ? 'locked' : ''}`}
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
            <div className="level-selector-keyboard">
              <label htmlFor="levelSelectKeyboard">Jump to Level:</label>
              <select
                id="levelSelectKeyboard"
                value={currentLevel}
                onChange={(e) => {
                  const selectedLevel = parseInt(e.target.value);
                  if (isLevelUnlocked('keyboard-adventure', selectedLevel)) {
                    setCurrentLevel(selectedLevel);
                    resetLevel();
                  }
                }}
                className="level-select-keyboard"
              >
                {levelData.map((lvl) => {
                  const unlocked = isLevelUnlocked('keyboard-adventure', lvl.level);
                  return (
                    <option key={lvl.level} value={lvl.level} disabled={!unlocked}>
                      {unlocked ? `Level ${lvl.level}: ${lvl.title}` : `🔒 Level ${lvl.level} (Locked)`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="game-controls">
            <button onClick={resetLevel} className="reset-btn">
              🔄 Reset Level
            </button>
            <button onClick={() => navigate(-1)} className="back-btn">
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="completion-screen">
          <h2>🎉 All Levels Complete!</h2>
          <p>You're a typing master!</p>
        </div>
      )}
    </div>
  );
}

export default KeyboardAdventure;

