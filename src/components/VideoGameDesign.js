import React, { useState } from 'react';
import './VideoGameDesign.css';

function VideoGameDesign() {
  const [characterName, setCharacterName] = useState('Hero');
  const [characterColor, setCharacterColor] = useState('#ff6b6b');
  const [characterPower, setCharacterPower] = useState('Super Speed');
  const [levelName, setLevelName] = useState('Level 1');
  const [levelTheme, setLevelTheme] = useState('forest');
  const [gameTitle, setGameTitle] = useState('My Awesome Game');
  const [gameGenre, setGameGenre] = useState('Adventure');
  const [enemies, setEnemies] = useState([]);
  const [collectibles, setCollectibles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const addEnemy = () => {
    const enemyTypes = ['👾', '👹', '🐉', '🦹', '👻'];
    const randomEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    setEnemies([...enemies, { id: Date.now(), type: randomEnemy, x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }]);
  };

  const addCollectible = () => {
    const collectibleTypes = ['⭐', '💎', '🍎', '💰', '🎁'];
    const randomCollectible = collectibleTypes[Math.floor(Math.random() * collectibleTypes.length)];
    setCollectibles([...collectibles, { id: Date.now(), type: randomCollectible, x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 }]);
  };

  const removeEnemy = (id) => {
    setEnemies(enemies.filter(e => e.id !== id));
  };

  const removeCollectible = (id) => {
    setCollectibles(collectibles.filter(c => c.id !== id));
    setScore(score + 10);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
  };

  const resetGame = () => {
    setGameActive(false);
    setEnemies([]);
    setCollectibles([]);
    setScore(0);
  };

  return (
    <div className="video-game-design">
      <div className="page-header">
        <h1>🎮 Video Game Design</h1>
        <p className="page-subtitle">Ages 10-15 • Create Your Own Games!</p>
      </div>

      <div className="activities-container">
        <div className="activity-card">
          <h2>🎨 Character Creator</h2>
          <p>Design your own game character! Choose their name, color, and special powers.</p>
          <div className="character-creator">
            <div className="character-preview">
              <div 
                className="character-display"
                style={{ backgroundColor: characterColor }}
              >
                <div className="character-face">😊</div>
                <div className="character-name-display">{characterName}</div>
              </div>
            </div>
            <div className="character-controls">
              <div className="control-group">
                <label>Character Name:</label>
                <input
                  type="text"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  className="character-input"
                  placeholder="Enter name..."
                />
              </div>
              <div className="control-group">
                <label>Character Color:</label>
                <div className="color-options">
                  {['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94', '#95e1d3', '#f38181', '#aa96da'].map(color => (
                    <button
                      key={color}
                      className="color-option"
                      style={{ backgroundColor: color }}
                      onClick={() => setCharacterColor(color)}
                    />
                  ))}
                </div>
              </div>
              <div className="control-group">
                <label>Special Power:</label>
                <select
                  value={characterPower}
                  onChange={(e) => setCharacterPower(e.target.value)}
                  className="power-select"
                >
                  <option>Super Speed</option>
                  <option>Flying</option>
                  <option>Invisibility</option>
                  <option>Super Strength</option>
                  <option>Ice Powers</option>
                  <option>Fire Powers</option>
                  <option>Teleportation</option>
                </select>
              </div>
              <div className="character-stats">
                <div className="stat">
                  <span className="stat-label">Power Level:</span>
                  <span className="stat-value">★★★★☆</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Special Ability:</span>
                  <span className="stat-value">{characterPower}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h2>🏗️ Level Builder</h2>
          <p>Build your game levels! Choose themes, add obstacles, and design the perfect challenge.</p>
          <div className="level-builder">
            <div className="level-controls">
              <div className="control-group">
                <label>Level Name:</label>
                <input
                  type="text"
                  value={levelName}
                  onChange={(e) => setLevelName(e.target.value)}
                  className="level-input"
                />
              </div>
              <div className="control-group">
                <label>Theme:</label>
                <div className="theme-buttons">
                  <button
                    className={levelTheme === 'forest' ? 'theme-btn active' : 'theme-btn'}
                    onClick={() => setLevelTheme('forest')}
                  >
                    🌲 Forest
                  </button>
                  <button
                    className={levelTheme === 'space' ? 'theme-btn active' : 'theme-btn'}
                    onClick={() => setLevelTheme('space')}
                  >
                    🚀 Space
                  </button>
                  <button
                    className={levelTheme === 'ocean' ? 'theme-btn active' : 'theme-btn'}
                    onClick={() => setLevelTheme('ocean')}
                  >
                    🌊 Ocean
                  </button>
                  <button
                    className={levelTheme === 'castle' ? 'theme-btn active' : 'theme-btn'}
                    onClick={() => setLevelTheme('castle')}
                  >
                    🏰 Castle
                  </button>
                </div>
              </div>
            </div>
            <div className={`level-preview ${levelTheme}`}>
              <div className="level-content">
                <h3>{levelName}</h3>
                <div className="theme-icon">
                  {levelTheme === 'forest' && '🌲'}
                  {levelTheme === 'space' && '🚀'}
                  {levelTheme === 'ocean' && '🌊'}
                  {levelTheme === 'castle' && '🏰'}
                </div>
                <p className="level-description">
                  {levelTheme === 'forest' && 'Navigate through the mysterious forest!'}
                  {levelTheme === 'space' && 'Explore the vast universe!'}
                  {levelTheme === 'ocean' && 'Dive into the deep blue sea!'}
                  {levelTheme === 'castle' && 'Conquer the ancient castle!'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h2>👾 Enemy Designer</h2>
          <p>Create enemies for your game! Add different types and place them on your level.</p>
          <div className="enemy-designer">
            <div className="enemy-controls">
              <button onClick={addEnemy} className="add-enemy-btn">
                ➕ Add Enemy
              </button>
              <div className="enemy-count">
                Enemies: {enemies.length}
              </div>
            </div>
            <div className="enemy-list">
              {enemies.length === 0 ? (
                <div className="empty-state">No enemies yet. Add some to make your game challenging!</div>
              ) : (
                enemies.map(enemy => (
                  <div key={enemy.id} className="enemy-item">
                    <span className="enemy-icon">{enemy.type}</span>
                    <span className="enemy-info">Enemy at ({Math.round(enemy.x)}, {Math.round(enemy.y)})</span>
                    <button onClick={() => removeEnemy(enemy.id)} className="remove-btn">❌</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h2>⭐ Collectible Items</h2>
          <p>Add collectible items to your game! Players can collect them for points.</p>
          <div className="collectible-designer">
            <div className="collectible-controls">
              <button onClick={addCollectible} className="add-collectible-btn">
                ➕ Add Collectible
              </button>
              <div className="collectible-count">
                Items: {collectibles.length}
              </div>
            </div>
            <div className="collectible-list">
              {collectibles.length === 0 ? (
                <div className="empty-state">No collectibles yet. Add some for players to find!</div>
              ) : (
                collectibles.map(collectible => (
                  <div key={collectible.id} className="collectible-item">
                    <span className="collectible-icon">{collectible.type}</span>
                    <span className="collectible-info">Item at ({Math.round(collectible.x)}, {Math.round(collectible.y)})</span>
                    <button onClick={() => removeCollectible(collectible.id)} className="collect-btn">✅ Collect</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h2>🎮 Game Playground</h2>
          <p>Test your game! Play with your character, enemies, and collectibles.</p>
          <div className="game-playground">
            <div className="game-header">
              <div className="game-title-input">
                <input
                  type="text"
                  value={gameTitle}
                  onChange={(e) => setGameTitle(e.target.value)}
                  className="game-title"
                  placeholder="Game Title"
                />
              </div>
              <div className="game-genre-select">
                <select
                  value={gameGenre}
                  onChange={(e) => setGameGenre(e.target.value)}
                  className="genre-select"
                >
                  <option>Adventure</option>
                  <option>Action</option>
                  <option>Puzzle</option>
                  <option>Racing</option>
                  <option>Platformer</option>
                  <option>RPG</option>
                </select>
              </div>
            </div>
            <div className="game-screen">
              <div className="game-ui">
                <div className="score-display">Score: {score}</div>
                <div className="game-status">
                  {gameActive ? '🎮 Playing...' : '⏸️ Paused'}
                </div>
              </div>
              <div className="game-world">
                <div className="game-character" style={{ backgroundColor: characterColor }}>
                  {characterName[0] || 'H'}
                </div>
                {enemies.map(enemy => (
                  <div
                    key={enemy.id}
                    className="game-enemy"
                    style={{ left: `${enemy.x}%`, top: `${enemy.y}%` }}
                  >
                    {enemy.type}
                  </div>
                ))}
                {collectibles.map(collectible => (
                  <div
                    key={collectible.id}
                    className="game-collectible"
                    style={{ left: `${collectible.x}%`, top: `${collectible.y}%` }}
                  >
                    {collectible.type}
                  </div>
                ))}
              </div>
            </div>
            <div className="game-controls">
              <button onClick={startGame} className="play-btn" disabled={gameActive}>
                ▶️ Play Game
              </button>
              <button onClick={resetGame} className="reset-btn">
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h2>📋 Game Design Document</h2>
          <p>Create your game design document! This is what professional game designers use.</p>
          <div className="game-document">
            <div className="document-section">
              <h3>Game Title</h3>
              <p className="document-value">{gameTitle}</p>
            </div>
            <div className="document-section">
              <h3>Genre</h3>
              <p className="document-value">{gameGenre}</p>
            </div>
            <div className="document-section">
              <h3>Main Character</h3>
              <p className="document-value">{characterName} - {characterPower}</p>
            </div>
            <div className="document-section">
              <h3>Levels</h3>
              <p className="document-value">{levelName} ({levelTheme} theme)</p>
            </div>
            <div className="document-section">
              <h3>Gameplay</h3>
              <p className="document-value">
                Players control {characterName} to collect {collectibles.length} items 
                while avoiding {enemies.length} enemies in the {levelTheme} level.
              </p>
            </div>
            <div className="document-section">
              <h3>Win Condition</h3>
              <p className="document-value">Collect all items and reach the end!</p>
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h2>🚀 Publish Your Game</h2>
          <p>Ready to share your game? Export your design and show it to friends!</p>
          <div className="publish-section">
            <div className="game-summary">
              <h3>Your Game Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Title:</span>
                  <span className="summary-value">{gameTitle}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Character:</span>
                  <span className="summary-value">{characterName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Levels:</span>
                  <span className="summary-value">1</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Enemies:</span>
                  <span className="summary-value">{enemies.length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Collectibles:</span>
                  <span className="summary-value">{collectibles.length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">High Score:</span>
                  <span className="summary-value">{score}</span>
                </div>
              </div>
            </div>
            <button className="export-btn">
              📤 Export Game Design
            </button>
            <div className="publish-hint">
              💡 Share your game design document with friends and family!
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h2>🏆 Game Design Certificate</h2>
          <p>Congratulations! You've created your own video game!</p>
          <div className="certificate">
            <div className="certificate-content">
              <h3>🏆 Certificate of Game Design</h3>
              <p className="certificate-text">
                This certifies that you have completed the<br />
                <strong>Video Game Design</strong> course<br />
                and created your own game: <strong>{gameTitle}</strong>!
              </p>
              <div className="certificate-stamp">⭐</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGameDesign;

