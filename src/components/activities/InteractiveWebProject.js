import React, { useState, useEffect, useRef } from 'react';
import './InteractiveWebProject.css';

function InteractiveWebProject({ project, onBack }) {
  const [userCode, setUserCode] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef(null);
  const iframeRef = useRef(null);

  const targetCode = project.code;

  useEffect(() => {
    // Auto-focus the textarea when component mounts
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Handle ESC key to exit fullscreen game
  useEffect(() => {
    const handleEscKey = (e) => {
      // Only handle ESC key, let all other keys pass to the iframe
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setShowPreview(false);
        setShowInstructions(false);
      }
    };

    if (showPreview) {
      // Prevent scrolling when game is fullscreen
      document.body.style.overflow = 'hidden';
      
      // Capture ESC at the window level but with capture phase
      window.addEventListener('keydown', handleEscKey, true);
      
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleEscKey, true);
      };
    }
  }, [showPreview]);

  useEffect(() => {
    // Check if user has typed the code correctly
    if (userCode === targetCode) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [userCode, targetCode]);

  const handleCodeChange = (e) => {
    const newValue = e.target.value;
    setUserCode(newValue);
    setCursorPosition(e.target.selectionStart);
  };

  const handleViewPage = () => {
    setShowInstructions(true);
  };

  const handlePreviewFinal = () => {
    setShowInstructions(true);
  };

  const handleStartGame = () => {
    setShowInstructions(false);
    setShowPreview(true);
  };

  const getDisplayCode = () => {
    const lines = targetCode.split('\n');
    return lines.map((line, lineIndex) => {
      const lineStart = targetCode.split('\n').slice(0, lineIndex).join('\n').length + (lineIndex > 0 ? 1 : 0);
      const lineEnd = lineStart + line.length;
      
      return (
        <div key={lineIndex} className="code-line">
          <span className="line-number">{lineIndex + 1}</span>
          <span className="line-content">
            {line.split('').map((char, charIndex) => {
              const globalIndex = lineStart + charIndex;
              const isTyped = globalIndex < userCode.length;
              const isCorrect = isTyped && userCode[globalIndex] === char;
              const isCurrent = globalIndex === userCode.length;
              
              let className = 'char';
              if (isTyped) {
                className += isCorrect ? ' typed-correct' : ' typed-incorrect';
              } else {
                className += ' untyped';
              }
              if (isCurrent) {
                className += ' cursor-position';
              }
              
              return (
                <span key={charIndex} className={className}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        </div>
      );
    });
  };

  const handleKeyDown = (e) => {
    // Prevent default paste behavior
    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      e.preventDefault();
      return;
    }
  };

  const calculateProgress = () => {
    return Math.round((userCode.length / targetCode.length) * 100);
  };

  // Load iframe content when preview is shown
  useEffect(() => {
    if (showPreview && iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(isComplete ? userCode : targetCode);
      iframeDoc.close();
      
      // Focus the iframe so it receives keyboard events
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.focus();
          // Also focus the iframe's window
          if (iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.focus();
          }
        }
      }, 100);
    }
  }, [showPreview, isComplete, userCode, targetCode]);

  // Instructions screen before game starts
  if (showInstructions && !showPreview) {
    return (
      <div className="interactive-project">
        <div className="project-header">
          <button onClick={() => setShowInstructions(false)} className="back-to-code-btn">
            ← Back to Code
          </button>
          <h2>{project.title}</h2>
          <button onClick={onBack} className="exit-project-btn">
            Exit Project
          </button>
        </div>

        <div className="instructions-screen">
          <div className="instructions-card">
            <div className="instructions-icon">{project.icon}</div>
            <h1>{project.title}</h1>
            <p className="instructions-description">{project.description}</p>
            
            <div className="game-instructions">
              <h3>📖 How to Play / Use:</h3>
              <p>{project.instructions}</p>
            </div>

            <div className="skills-preview">
              <h4>🎯 Skills You'll Learn:</h4>
              <div className="skills-list">
                {project.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <button onClick={handleStartGame} className="start-game-button">
              🚀 Start {project.fileName.includes('game') || project.title.includes('Game') ? 'Game' : 'Project'} Now!
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleRestartGame = () => {
    // Reload the iframe to restart the game
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(isComplete ? userCode : targetCode);
      iframeDoc.close();
      
      // Refocus the iframe after restart so keyboard works
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.focus();
          if (iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.focus();
          }
        }
      }, 100);
    }
  };

  if (showPreview) {
    return (
      <div className="fullscreen-game-container">
        <div className="game-controls">
          <button onClick={handleRestartGame} className="restart-game-btn" title="Restart Game">
            🔄 Restart
          </button>
          <div className="esc-hint">
            Press <kbd>ESC</kbd> to exit
          </div>
        </div>
        <iframe
          ref={iframeRef}
          className="fullscreen-iframe"
          title="Web Preview"
          sandbox="allow-scripts allow-same-origin"
          tabIndex="0"
          onClick={() => {
            if (iframeRef.current) {
              iframeRef.current.focus();
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="interactive-project">
      <div className="project-header">
        <button onClick={onBack} className="back-to-projects-btn">
          ← Back to Projects
        </button>
        <div className="project-info">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-info">
          <span>Progress: {calculateProgress()}%</span>
          <span>{userCode.length} / {targetCode.length} characters</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>

      <div className="coding-workspace">
        <div className="instructions-panel">
          <h3>📝 Instructions</h3>
          <p>{project.instructions}</p>
          
          {calculateProgress() >= 50 ? (
            <div className="preview-box">
              <h4>👀 Want to see the final result?</h4>
              <p>Click below to preview what you'll build!</p>
              <button onClick={handlePreviewFinal} className="preview-final-btn">
                🎮 Preview Final Result
              </button>
            </div>
          ) : (
            <div className="locked-preview-box">
              <h4>🔒 Preview Locked</h4>
              <p>Type at least 50% of the code to unlock the preview!</p>
              <div className="unlock-progress">
                <div className="unlock-bar" style={{ width: `${(calculateProgress() / 50) * 100}%` }}></div>
              </div>
              <p className="unlock-text">{calculateProgress()}% / 50% completed</p>
            </div>
          )}
          
          <div className="tips-box">
            <h4>💡 Tips:</h4>
            <ul>
              <li>Type the greyed-out code exactly as shown</li>
              <li>Pay attention to spacing and punctuation</li>
              <li>Copy-paste is disabled - you must type it!</li>
              <li>Green text = correct, Red text = incorrect</li>
            </ul>
          </div>

          {isComplete && (
            <div className="completion-box">
              <h4>🎉 Code Complete!</h4>
              <p>Great job! Now view your creation:</p>
              <button onClick={handleViewPage} className="view-page-btn">
                🌐 View Page
              </button>
            </div>
          )}
        </div>

        <div className="editor-panel">
          <div className="editor-header">
            <span className="editor-title">💻 Code Editor</span>
            <span className="file-name">{project.fileName}</span>
          </div>
          
          {userCode.length === 0 && (
            <div className="start-typing-hint">
              👆 Click here and start typing!
            </div>
          )}
          
          <div 
            className="code-editor-container"
            onClick={() => textareaRef.current && textareaRef.current.focus()}
          >
            {/* Display layer - shows the target code with highlighting */}
            <div className="code-display">
              {getDisplayCode()}
            </div>

            {/* Input layer - invisible textarea for typing */}
            <textarea
              ref={textareaRef}
              className="code-input-overlay"
              value={userCode}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onBlur={() => {
                // Re-focus after a short delay if clicked away
                setTimeout(() => {
                  if (textareaRef.current) {
                    textareaRef.current.focus();
                  }
                }, 100);
              }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveWebProject;

