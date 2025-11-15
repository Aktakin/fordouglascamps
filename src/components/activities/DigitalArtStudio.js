import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DigitalArtStudio.css';

function DigitalArtStudio() {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentColor, setCurrentColor] = useState('#ff6b6b');
  const [brushSize, setBrushSize] = useState(10);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('brush'); // brush, eraser, fill
  const [levelComplete, setLevelComplete] = useState(false);
  const [userName, setUserName] = useState('');
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const levelData = [
    {
      level: 1,
      title: "Create Your Name Tag",
      description: "Draw your name with colorful letters! Use the brush to draw and eraser to fix mistakes.",
      instruction: "Type your name below, then draw it on the canvas with your favorite colors!",
      theme: "🏷️",
      color: "#ff6b6b"
    },
    {
      level: 2,
      title: "Draw a Rainbow",
      description: "Create a beautiful rainbow with all the colors!",
      instruction: "Draw a rainbow arc using red, orange, yellow, green, blue, indigo, and violet!",
      theme: "🌈",
      color: "#4ecdc4"
    },
    {
      level: 3,
      title: "Design a House",
      description: "Draw your dream house with windows, door, and roof!",
      instruction: "Create a house with a roof, walls, windows, and a door. Add details like a chimney or flowers!",
      theme: "🏠",
      color: "#ffe66d"
    },
    {
      level: 4,
      title: "Draw Your Pet",
      description: "Draw your favorite pet or animal friend!",
      instruction: "Draw a cat, dog, bird, or any animal you love! Add details like eyes, nose, and fur!",
      theme: "🐾",
      color: "#aa96da"
    },
    {
      level: 5,
      title: "Create a Flower Garden",
      description: "Draw a beautiful garden full of flowers!",
      instruction: "Draw different flowers with petals, stems, and leaves. Make your garden colorful!",
      theme: "🌸",
      color: "#a8e6cf"
    },
    {
      level: 6,
      title: "Design a Robot",
      description: "Create your own robot friend!",
      instruction: "Draw a robot with a head, body, arms, and legs. Add buttons, lights, or antennas!",
      theme: "🤖",
      color: "#ff8b94"
    },
    {
      level: 7,
      title: "Draw a Space Scene",
      description: "Create an amazing space scene with planets and stars!",
      instruction: "Draw planets, stars, a moon, and maybe a rocket ship! Use dark colors for space!",
      theme: "🚀",
      color: "#95e1d3"
    },
    {
      level: 8,
      title: "Design a Birthday Cake",
      description: "Draw a delicious birthday cake with decorations!",
      instruction: "Create a cake with layers, frosting, candles, and decorations. Make it look yummy!",
      theme: "🎂",
      color: "#f38181"
    },
    {
      level: 9,
      title: "Draw a Superhero",
      description: "Create your own superhero character!",
      instruction: "Draw a superhero with a cape, mask, and super powers! Add a logo or symbol!",
      theme: "🦸",
      color: "#c7ceea"
    },
    {
      level: 10,
      title: "Masterpiece Creation",
      description: "Create your own masterpiece! Draw anything you want!",
      instruction: "This is your chance to be creative! Draw anything you imagine - be creative and have fun!",
      theme: "🎨",
      color: "#ffd93d"
    }
  ];

  const colors = [
    '#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94',
    '#95e1d3', '#f38181', '#aa96da', '#c7ceea', '#ffd93d',
    '#000000', '#ffffff', '#808080', '#ff0000', '#00ff00',
    '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 500;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    contextRef.current = ctx;
  }, []);

  useEffect(() => {
    // Reset canvas when level changes
    if (contextRef.current) {
      contextRef.current.fillStyle = '#ffffff';
      contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setLevelComplete(false);
    setUserName('');
  }, [currentLevel]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (tool === 'brush') {
      contextRef.current.strokeStyle = currentColor;
      contextRef.current.lineWidth = brushSize;
      contextRef.current.lineCap = 'round';
      contextRef.current.lineJoin = 'round';
    } else if (tool === 'eraser') {
      contextRef.current.strokeStyle = '#ffffff';
      contextRef.current.lineWidth = brushSize * 2;
      contextRef.current.lineCap = 'round';
      contextRef.current.lineJoin = 'round';
    }
    
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    if (contextRef.current) {
      contextRef.current.fillStyle = '#ffffff';
      contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const fillCanvas = () => {
    if (contextRef.current) {
      contextRef.current.fillStyle = currentColor;
      contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const completeLevel = () => {
    setLevelComplete(true);
  };

  const nextLevel = () => {
    if (currentLevel < 10) {
      setCurrentLevel(prev => prev + 1);
      setLevelComplete(false);
    }
  };

  const currentLevelData = levelData.find(l => l.level === currentLevel) || levelData[0];

  return (
    <div className="digital-art-studio">
      <div className="activity-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1>🎨 Digital Art Studio</h1>
        <p className="activity-subtitle">Create amazing art with 10 fun challenges!</p>
      </div>

      <div className="studio-container">
        <div className="studio-sidebar">
          <div className="level-info-card">
            <div className="level-badge-art" style={{ backgroundColor: currentLevelData.color }}>
              <span className="level-theme-art">{currentLevelData.theme}</span>
              <div>
                <h2>Level {currentLevel}</h2>
                <p>{currentLevelData.title}</p>
              </div>
            </div>
            <div className="level-description-art">
              <p>{currentLevelData.description}</p>
              <p className="instruction-text">{currentLevelData.instruction}</p>
            </div>
          </div>

          {currentLevel === 1 && (
            <div className="name-input-section">
              <label htmlFor="userName">Type Your Name:</label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name..."
                className="name-input"
                maxLength={20}
              />
              {userName && (
                <p className="name-hint">Now draw "{userName}" on the canvas!</p>
              )}
            </div>
          )}

          <div className="tools-section">
            <h3>🛠️ Tools</h3>
            <div className="tool-buttons">
              <button
                className={`tool-btn ${tool === 'brush' ? 'active' : ''}`}
                onClick={() => setTool('brush')}
              >
                🖌️ Brush
              </button>
              <button
                className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
                onClick={() => setTool('eraser')}
              >
                🧹 Eraser
              </button>
              <button
                className={`tool-btn ${tool === 'fill' ? 'active' : ''}`}
                onClick={() => {
                  setTool('fill');
                  fillCanvas();
                }}
              >
                🪣 Fill
              </button>
            </div>
          </div>

          <div className="color-section">
            <h3>🎨 Colors</h3>
            <div className="color-palette">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-swatch ${currentColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                  title={color}
                ></div>
              ))}
            </div>
            <div className="color-picker-container">
              <label htmlFor="colorPicker">Custom Color:</label>
              <input
                id="colorPicker"
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="color-picker"
              />
            </div>
          </div>

          <div className="brush-size-section">
            <h3>📏 Brush Size</h3>
            <input
              type="range"
              min="5"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="brush-slider"
            />
            <div className="brush-size-display">
              Size: {brushSize}px
              <div
                className="brush-preview"
                style={{
                  width: `${brushSize}px`,
                  height: `${brushSize}px`,
                  backgroundColor: tool === 'eraser' ? '#ffffff' : currentColor
                }}
              ></div>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={clearCanvas} className="action-btn clear-btn">
              🗑️ Clear Canvas
            </button>
            <button onClick={completeLevel} className="action-btn complete-btn">
              ✅ I'm Done!
            </button>
          </div>

          <div className="level-progress-art">
            <h4>Select Level</h4>
            <div className="levels-grid-art">
              {levelData.map((lvl) => (
                <div
                  key={lvl.level}
                  className={`level-dot-art ${lvl.level === currentLevel ? 'active' : ''}`}
                  style={{ 
                    backgroundColor: lvl.color
                  }}
                  title={`Level ${lvl.level}: ${lvl.title}`}
                  onClick={() => {
                    setCurrentLevel(lvl.level);
                    setLevelComplete(false);
                    clearCanvas();
                  }}
                >
                  {lvl.level === currentLevel ? lvl.theme : lvl.level}
                </div>
              ))}
            </div>
            <div className="level-selector-dropdown">
              <label htmlFor="levelSelect">Jump to Level:</label>
              <select
                id="levelSelect"
                value={currentLevel}
                onChange={(e) => {
                  setCurrentLevel(parseInt(e.target.value));
                  setLevelComplete(false);
                  clearCanvas();
                }}
                className="level-select"
              >
                {levelData.map((lvl) => (
                  <option key={lvl.level} value={lvl.level}>
                    Level {lvl.level}: {lvl.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="canvas-area">
          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousedown', {
                  clientX: touch.clientX,
                  clientY: touch.clientY
                });
                canvasRef.current.dispatchEvent(mouseEvent);
              }}
              onTouchMove={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousemove', {
                  clientX: touch.clientX,
                  clientY: touch.clientY
                });
                canvasRef.current.dispatchEvent(mouseEvent);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                const mouseEvent = new MouseEvent('mouseup', {});
                canvasRef.current.dispatchEvent(mouseEvent);
              }}
              className="drawing-canvas"
            ></canvas>
          </div>

          {levelComplete && (
            <div className="level-complete-art">
              <div className="complete-content">
                <h3>🎉 Great Job!</h3>
                <p>You completed Level {currentLevel}!</p>
                {currentLevel < 10 ? (
                  <button onClick={nextLevel} className="next-level-btn-art">
                    Continue to Level {currentLevel + 1} →
                  </button>
                ) : (
                  <div className="all-complete-art">
                    <h4>🏆 Congratulations!</h4>
                    <p>You've completed all 10 art challenges!</p>
                    <button onClick={() => {
                      setCurrentLevel(1);
                      clearCanvas();
                    }} className="play-again-btn-art">
                      Start Over
                    </button>
                  </div>
                )}
                <button onClick={() => setLevelComplete(false)} className="continue-btn">
                  Continue Drawing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DigitalArtStudio;

