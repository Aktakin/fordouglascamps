import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoGameDesign.css';

// Genre-specific configurations
const genreConfigs = {
  racing: {
    characterIcon: '🏎️',
    movementType: 'forward-scroll',
    obstacles: true,
    autoMove: true,
    instructions: 'Use Left/Right arrows to avoid obstacles! Race to the finish!'
  },
  puzzle: {
    characterIcon: '🧩',
    movementType: 'free',
    obstacles: false,
    autoMove: false,
    instructions: 'Match items and solve puzzles! Collect matching pairs!'
  },
  adventure: {
    characterIcon: null, // Use character face
    movementType: 'free',
    obstacles: false,
    autoMove: false,
    instructions: 'Collect items to score points. Avoid enemies!'
  },
  action: {
    characterIcon: null,
    movementType: 'free',
    obstacles: false,
    autoMove: false,
    instructions: 'Fight enemies and collect items! Use your powers!'
  },
  platformer: {
    characterIcon: '🦘',
    movementType: 'free',
    obstacles: true,
    autoMove: false,
    instructions: 'Jump and move! Avoid obstacles and collect items!'
  },
  rpg: {
    characterIcon: null,
    movementType: 'free',
    obstacles: false,
    autoMove: false,
    instructions: 'Explore and battle! Collect items and defeat enemies!'
  }
};

function VideoGameDesignJunior() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('overview'); // overview, character, level, enemies, play, export
  const [gameTitle, setGameTitle] = useState('My Awesome Game');
  const [gameGenre, setGameGenre] = useState('adventure');
  
  // Character creation
  const [characterName, setCharacterName] = useState('Hero');
  const [characterFace, setCharacterFace] = useState('😊');
  const [characterColor, setCharacterColor] = useState('#3b88f5');
  const [characterPower, setCharacterPower] = useState('super-speed');
  
  // Level design
  const [selectedTheme, setSelectedTheme] = useState('forest');
  const [levelName, setLevelName] = useState('Level 1');
  
  // Game elements
  const [enemies, setEnemies] = useState([]);
  const [collectibles, setCollectibles] = useState([]);
  
  // Game state
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [previousHighScore, setPreviousHighScore] = useState(0);
  const [activeEnemies, setActiveEnemies] = useState([]);
  const [activeCollectibles, setActiveCollectibles] = useState([]);
  const [activeObstacles, setActiveObstacles] = useState([]);
  const [keysPressedDisplay, setKeysPressedDisplay] = useState({});
  const gameIntervalRef = useRef(null);
  const gameWorldRef = useRef(null);
  const characterRef = useRef(null);
  const keysPressedRef = useRef({});
  const characterPositionRef = useRef({ x: 0, y: 0 });
  const spawnIntervalRef = useRef(null);
  const enemyTimeoutsRef = useRef({});
  const collectibleTimeoutsRef = useRef({});
  const obstacleTimeoutsRef = useRef({});
  const activeEnemiesRef = useRef([]);
  const activeCollectiblesRef = useRef([]);
  const activeObstaclesRef = useRef([]);
  const gameSpeedRef = useRef(0); // For racing auto-scroll
  
  const characterFaces = ['😊', '😎', '🤖', '🦸', '🧙', '👾', '🐱', '🦊', '🐉', '👽'];
  const characterColors = ['#3b88f5', '#ff6b6b', '#4ecdc4', '#ffe66d', '#aa96da', '#f093fb', '#95e1d3', '#f5576c', '#a8e6cf', '#ff8b94'];
  const powers = [
    { id: 'super-speed', name: 'Super Speed', icon: '⚡', description: 'Move super fast!' },
    { id: 'flying', name: 'Flying', icon: '🦅', description: 'Soar through the air!' },
    { id: 'invisibility', name: 'Invisibility', icon: '👻', description: 'Become invisible!' },
    { id: 'strength', name: 'Super Strength', icon: '💪', description: 'Lift anything!' },
    { id: 'fire', name: 'Fire Power', icon: '🔥', description: 'Shoot fireballs!' },
    { id: 'ice', name: 'Ice Power', icon: '❄️', description: 'Freeze enemies!' }
  ];
  
  const themes = {
    forest: { name: 'Forest', icon: '🌲', bg: 'linear-gradient(135deg, #2d5016 0%, #5a8a2e 100%)', description: 'Explore a magical forest!' },
    space: { name: 'Space', icon: '🚀', bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', description: 'Journey through space!' },
    ocean: { name: 'Ocean', icon: '🌊', bg: 'linear-gradient(135deg, #0f4c75 0%, #3282b8 100%)', description: 'Dive into the deep!' },
    castle: { name: 'Castle', icon: '🏰', bg: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)', description: 'Conquer the castle!' },
    city: { name: 'City', icon: '🏙️', bg: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', description: 'Explore the urban jungle!' },
    desert: { name: 'Desert', icon: '🏜️', bg: 'linear-gradient(135deg, #d4a574 0%, #f4a460 100%)', description: 'Survive the desert!' }
  };
  
  const enemyTypes = [
    { id: 1, emoji: '👹', name: 'Goblin', color: '#ff6b6b' },
    { id: 2, emoji: '👾', name: 'Alien', color: '#4ecdc4' },
    { id: 3, emoji: '🦹', name: 'Villain', color: '#aa96da' },
    { id: 4, emoji: '🐉', name: 'Dragon', color: '#f5576c' },
    { id: 5, emoji: '👻', name: 'Ghost', color: '#95e1d3' },
    { id: 6, emoji: '🕷️', name: 'Spider', color: '#2c3e50' }
  ];
  
  const collectibleTypes = [
    { id: 1, emoji: '⭐', name: 'Star', color: '#ffe66d' },
    { id: 2, emoji: '💎', name: 'Gem', color: '#4ecdc4' },
    { id: 3, emoji: '🍎', name: 'Apple', color: '#ff6b6b' },
    { id: 4, emoji: '🔑', name: 'Key', color: '#ffe66d' },
    { id: 5, emoji: '💍', name: 'Ring', color: '#aa96da' },
    { id: 6, emoji: '🏆', name: 'Trophy', color: '#f5576c' }
  ];
  
  const genres = [
    { id: 'adventure', name: 'Adventure', icon: '🗺️' },
    { id: 'action', name: 'Action', icon: '⚔️' },
    { id: 'puzzle', name: 'Puzzle', icon: '🧩' },
    { id: 'racing', name: 'Racing', icon: '🏎️' },
    { id: 'platformer', name: 'Platformer', icon: '🦘' },
    { id: 'rpg', name: 'RPG', icon: '⚔️' }
  ];
  
  // Keyboard event handlers
  useEffect(() => {
    if (!gameActive) {
      setKeysPressedDisplay({});
      return;
    }
    
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        e.preventDefault();
        keysPressedRef.current[key] = true;
        // Update display for visual feedback
        setKeysPressedDisplay(prev => ({ ...prev, [key]: true }));
      }
    };
    
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        keysPressedRef.current[key] = false;
        // Update display for visual feedback
        setKeysPressedDisplay(prev => {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameActive]);
  
  // Sync refs with state
  useEffect(() => {
    activeEnemiesRef.current = activeEnemies;
  }, [activeEnemies]);
  
  useEffect(() => {
    activeCollectiblesRef.current = activeCollectibles;
  }, [activeCollectibles]);
  
  useEffect(() => {
    activeObstaclesRef.current = activeObstacles;
  }, [activeObstacles]);
  
  // Get genre config
  const genreConfig = genreConfigs[gameGenre] || genreConfigs.adventure;
  
  // Game loop
  useEffect(() => {
    let gameLoop = null;
    
    if (gameActive && !gameOver) {
      // Timer
      gameIntervalRef.current = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
      
      // Game loop for movement and collision
      gameLoop = setInterval(() => {
        const currentConfig = genreConfigs[gameGenre] || genreConfigs.adventure;
        
        // Move character based on genre
        if (currentConfig.movementType === 'forward-scroll') {
          // Racing: Auto-scroll forward, only left/right control
          gameSpeedRef.current += 0.1;
          const baseSpeed = characterPower === 'super-speed' ? 8 : 5;
          let dx = 0;
          
          if (keysPressedRef.current['arrowleft'] || keysPressedRef.current['a']) {
            dx = -baseSpeed;
          }
          if (keysPressedRef.current['arrowright'] || keysPressedRef.current['d']) {
            dx = baseSpeed;
          }
          
          if (characterRef.current && gameWorldRef.current) {
            const world = gameWorldRef.current;
            const newX = Math.max(0, Math.min(world.offsetWidth - 60, characterPositionRef.current.x + dx));
            const newY = world.offsetHeight - 100;
            
            characterPositionRef.current = { x: newX, y: newY };
            characterRef.current.style.left = `${newX}px`;
            characterRef.current.style.top = `${newY}px`;
          }
        } else {
          moveCharacter();
        }
        
        checkCollisions();
        moveEnemies();
        moveObstacles();
      }, 16); // ~60 FPS
      
      // Spawn enemies and collectibles
      spawnIntervalRef.current = setInterval(() => {
        spawnGameElements();
      }, 2000);
    }
    
    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
        gameIntervalRef.current = null;
      }
      if (gameLoop) {
        clearInterval(gameLoop);
      }
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
        spawnIntervalRef.current = null;
      }
    };
  }, [gameActive, gameOver, gameGenre, characterPower]);
  
  const moveCharacter = () => {
    if (!characterRef.current || !gameWorldRef.current) return;
    
    const character = characterRef.current;
    const world = gameWorldRef.current;
    const baseSpeed = characterPower === 'super-speed' ? 8 : 5;
    let dx = 0;
    let dy = 0;
    
    // Racing: Auto-scroll forward, only left/right control
    if (genreConfig.movementType === 'forward-scroll') {
      gameSpeedRef.current += 0.1; // Auto-scroll speed
      const scrollSpeed = Math.min(gameSpeedRef.current, 3);
      
      // Only allow left/right movement
      if (keysPressedRef.current['arrowleft'] || keysPressedRef.current['a']) {
        dx = -baseSpeed;
      }
      if (keysPressedRef.current['arrowright'] || keysPressedRef.current['d']) {
        dx = baseSpeed;
      }
      
      // Keep character in middle-bottom area for racing
      const newX = Math.max(0, Math.min(world.offsetWidth - 60, characterPositionRef.current.x + dx));
      const newY = world.offsetHeight - 100; // Fixed Y position for racing
      
      characterPositionRef.current = { x: newX, y: newY };
      character.style.left = `${newX}px`;
      character.style.top = `${newY}px`;
    } else {
      // Free movement for other genres
      if (keysPressedRef.current['arrowup'] || keysPressedRef.current['w']) {
        dy = -baseSpeed;
      }
      if (keysPressedRef.current['arrowdown'] || keysPressedRef.current['s']) {
        dy = baseSpeed;
      }
      if (keysPressedRef.current['arrowleft'] || keysPressedRef.current['a']) {
        dx = -baseSpeed;
      }
      if (keysPressedRef.current['arrowright'] || keysPressedRef.current['d']) {
        dx = baseSpeed;
      }
      
      const newX = Math.max(0, Math.min(world.offsetWidth - 60, characterPositionRef.current.x + dx));
      const newY = Math.max(0, Math.min(world.offsetHeight - 60, characterPositionRef.current.y + dy));
      
      characterPositionRef.current = { x: newX, y: newY };
      character.style.left = `${newX}px`;
      character.style.top = `${newY}px`;
    }
  };
  
  const moveEnemies = () => {
    const currentConfig = genreConfigs[gameGenre] || genreConfigs.adventure;
    setActiveEnemies(prev => prev.map(enemy => {
      if (currentConfig.movementType === 'forward-scroll') {
        // Racing: Enemies move down (towards player)
        const newY = enemy.y + 2;
        return { ...enemy, y: newY };
      } else {
        // Other genres: Enemies chase player
        const charX = characterPositionRef.current.x + 30;
        const charY = characterPositionRef.current.y + 30;
        const enemyX = enemy.x + 30;
        const enemyY = enemy.y + 30;
        
        const dx = charX - enemyX;
        const dy = charY - enemyY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          const speed = 1.5;
          const newX = enemy.x + (dx / distance) * speed;
          const newY = enemy.y + (dy / distance) * speed;
          
          return { ...enemy, x: newX, y: newY };
        }
      }
      return enemy;
    }));
  };
  
  const moveObstacles = () => {
    const currentConfig = genreConfigs[gameGenre] || genreConfigs.adventure;
    if (currentConfig.obstacles && currentConfig.movementType === 'forward-scroll') {
      // Racing: Obstacles move down
      setActiveObstacles(prev => prev.map(obstacle => {
        const newY = obstacle.y + 3;
        return { ...obstacle, y: newY };
      }));
    }
  };
  
  const checkCollisions = () => {
    if (!characterRef.current) return;
    
    const currentConfig = genreConfigs[gameGenre] || genreConfigs.adventure;
    const charX = characterPositionRef.current.x + 30;
    const charY = characterPositionRef.current.y + 30;
    const charRadius = 30;
    
    // Check obstacle collisions (for racing)
    if (currentConfig.obstacles) {
      activeObstaclesRef.current.forEach((obstacle) => {
        const obstacleX = obstacle.x + 25;
        const obstacleY = obstacle.y + 25;
        const obstacleRadius = 25;
        
        const distance = Math.sqrt(
          Math.pow(charX - obstacleX, 2) + Math.pow(charY - obstacleY, 2)
        );
        
        if (distance < charRadius + obstacleRadius) {
          // Hit obstacle
          setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              setGameOver(true);
              setGameActive(false);
            }
            return newLives;
          });
          
          // Remove obstacle
          if (obstacleTimeoutsRef.current[obstacle.id]) {
            clearTimeout(obstacleTimeoutsRef.current[obstacle.id]);
            delete obstacleTimeoutsRef.current[obstacle.id];
          }
          setActiveObstacles(prev => prev.filter(o => o.id !== obstacle.id));
        }
      });
    }
    
    // Check enemy collisions (use ref to get current values)
    activeEnemiesRef.current.forEach((enemy) => {
      const enemyX = enemy.x + 30;
      const enemyY = enemy.y + 30;
      const enemyRadius = 30;
      
      const distance = Math.sqrt(
        Math.pow(charX - enemyX, 2) + Math.pow(charY - enemyY, 2)
      );
      
      if (distance < charRadius + enemyRadius) {
        // Collision with enemy
        const currentConfig = genreConfigs[gameGenre] || genreConfigs.adventure;
        if (characterPower === 'invisibility' && currentConfig.movementType !== 'forward-scroll') {
          // Invisibility power: destroy enemy (not for racing)
          setScore(prev => prev + 10);
        } else {
          // Take damage
          setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              setGameOver(true);
              setGameActive(false);
            }
            return newLives;
          });
        }
        
        // Remove enemy
        if (enemyTimeoutsRef.current[enemy.id]) {
          clearTimeout(enemyTimeoutsRef.current[enemy.id]);
          delete enemyTimeoutsRef.current[enemy.id];
        }
        setActiveEnemies(prev => prev.filter(e => e.id !== enemy.id));
      }
    });
    
    // Check collectible collisions (use ref to get current values)
    activeCollectiblesRef.current.forEach((collectible) => {
      const collectibleX = collectible.x + 20;
      const collectibleY = collectible.y + 20;
      const collectibleRadius = 20;
      
      const distance = Math.sqrt(
        Math.pow(charX - collectibleX, 2) + Math.pow(charY - collectibleY, 2)
      );
      
      if (distance < charRadius + collectibleRadius) {
        // Collect item
        setScore(prev => {
          const newScore = prev + 5;
          if (newScore > highScore) {
            setHighScore(newScore);
          }
          return newScore;
        });
        
        // Remove collectible
        if (collectibleTimeoutsRef.current[collectible.id]) {
          clearTimeout(collectibleTimeoutsRef.current[collectible.id]);
          delete collectibleTimeoutsRef.current[collectible.id];
        }
        setActiveCollectibles(prev => prev.filter(c => c.id !== collectible.id));
      }
    });
  };
  
  const spawnGameElements = () => {
    if (!gameWorldRef.current || !gameActive) return;
    const world = gameWorldRef.current;
    const currentConfig = genreConfigs[gameGenre] || genreConfigs.adventure;
    
    // Racing: Spawn obstacles from top
    if (currentConfig.movementType === 'forward-scroll' && currentConfig.obstacles) {
      if (activeObstaclesRef.current.length < 3 && Math.random() < 0.3) {
        spawnObstacleInGame(world);
      }
    }
    
    // Spawn enemies (not for racing)
    if (currentConfig.movementType !== 'forward-scroll' && activeEnemiesRef.current.length < 5 && enemies.length > 0 && Math.random() < 0.4) {
      const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
      spawnEnemyInGame(randomEnemy, world);
    }
    
    // Spawn collectibles
    if (activeCollectiblesRef.current.length < 8 && collectibles.length > 0 && Math.random() < 0.5) {
      const randomCollectible = collectibles[Math.floor(Math.random() * collectibles.length)];
      spawnCollectibleInGame(randomCollectible, world);
    }
  };
  
  const spawnObstacleInGame = (world) => {
    if (!gameActive) return;
    
    const x = Math.random() * (world.offsetWidth - 50);
    const y = -50;
    
    const obstacleId = Date.now() + Math.random();
    const obstacleObj = {
      id: obstacleId,
      x: x,
      y: y,
      emoji: '🛑' // Stop sign or barrier
    };
    
    setActiveObstacles(prev => [...prev, obstacleObj]);
    
    // Remove after it goes off screen
    obstacleTimeoutsRef.current[obstacleId] = setTimeout(() => {
      setActiveObstacles(prev => prev.filter(o => o.id !== obstacleId));
      delete obstacleTimeoutsRef.current[obstacleId];
    }, 10000);
  };
  
  const spawnEnemyInGame = (enemy, world) => {
    if (!gameActive) return;
    
    // Spawn at edge of screen
    const side = Math.floor(Math.random() * 4);
    let x, y;
    
    if (side === 0) { // Top
      x = Math.random() * (world.offsetWidth - 60);
      y = -60;
    } else if (side === 1) { // Right
      x = world.offsetWidth;
      y = Math.random() * (world.offsetHeight - 60);
    } else if (side === 2) { // Bottom
      x = Math.random() * (world.offsetWidth - 60);
      y = world.offsetHeight;
    } else { // Left
      x = -60;
      y = Math.random() * (world.offsetHeight - 60);
    }
    
    const enemyId = Date.now() + Math.random();
    const enemyObj = {
      id: enemyId,
      x: x,
      y: y,
      emoji: enemy.emoji,
      name: enemy.name
    };
    
    setActiveEnemies(prev => [...prev, enemyObj]);
    
    // Remove after 15 seconds
    enemyTimeoutsRef.current[enemyId] = setTimeout(() => {
      setActiveEnemies(prev => prev.filter(e => e.id !== enemyId));
      delete enemyTimeoutsRef.current[enemyId];
    }, 15000);
  };
  
  const spawnCollectibleInGame = (collectible, world) => {
    if (!gameActive) return;
    
    const x = Math.random() * (world.offsetWidth - 40);
    const y = Math.random() * (world.offsetHeight - 40);
    
    const collectibleId = Date.now() + Math.random();
    const collectibleObj = {
      id: collectibleId,
      x: x,
      y: y,
      emoji: collectible.emoji,
      name: collectible.name
    };
    
    setActiveCollectibles(prev => [...prev, collectibleObj]);
    
    // Remove after 10 seconds
    collectibleTimeoutsRef.current[collectibleId] = setTimeout(() => {
      setActiveCollectibles(prev => prev.filter(c => c.id !== collectibleId));
      delete collectibleTimeoutsRef.current[collectibleId];
    }, 10000);
  };
  
  const addEnemy = (enemyType) => {
    const newEnemy = {
      id: Date.now(),
      ...enemyType,
      count: 1
    };
    setEnemies(prev => [...prev, newEnemy]);
  };
  
  const removeEnemy = (id) => {
    setEnemies(prev => prev.filter(e => e.id !== id));
  };
  
  const addCollectible = (collectibleType) => {
    const newCollectible = {
      id: Date.now(),
      ...collectibleType,
      count: 1
    };
    setCollectibles(prev => [...prev, newCollectible]);
  };
  
  const removeCollectible = (id) => {
    setCollectibles(prev => prev.filter(c => c.id !== id));
  };
  
  const startGame = () => {
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setGameTime(0);
    setLives(3);
    setPreviousHighScore(highScore);
    setActiveEnemies([]);
    setActiveCollectibles([]);
    setActiveObstacles([]);
    keysPressedRef.current = {};
    gameSpeedRef.current = 0;
    
    // Clear all timeouts
    Object.values(enemyTimeoutsRef.current).forEach(timeout => clearTimeout(timeout));
    Object.values(collectibleTimeoutsRef.current).forEach(timeout => clearTimeout(timeout));
    Object.values(obstacleTimeoutsRef.current).forEach(timeout => clearTimeout(timeout));
    enemyTimeoutsRef.current = {};
    collectibleTimeoutsRef.current = {};
    obstacleTimeoutsRef.current = {};
    
    // Initialize character position after a short delay to ensure DOM is ready
    setTimeout(() => {
      if (gameWorldRef.current) {
        const world = gameWorldRef.current;
        let charX, charY;
        
        if (genreConfig.movementType === 'forward-scroll') {
          // Racing: Start at bottom center
          charX = world.offsetWidth / 2 - 30;
          charY = world.offsetHeight - 100;
        } else {
          // Other genres: Start at center
          charX = world.offsetWidth / 2 - 30;
          charY = world.offsetHeight / 2 - 30;
        }
        
        characterPositionRef.current = { x: charX, y: charY };
        if (characterRef.current) {
          characterRef.current.style.left = `${charX}px`;
          characterRef.current.style.top = `${charY}px`;
        }
      }
    }, 50);
  };
  
  const stopGame = () => {
    setGameActive(false);
    setGameOver(false);
    
    // Clear all timeouts
    Object.values(enemyTimeoutsRef.current).forEach(timeout => clearTimeout(timeout));
    Object.values(collectibleTimeoutsRef.current).forEach(timeout => clearTimeout(timeout));
    Object.values(obstacleTimeoutsRef.current).forEach(timeout => clearTimeout(timeout));
    enemyTimeoutsRef.current = {};
    collectibleTimeoutsRef.current = {};
    obstacleTimeoutsRef.current = {};
    
    setActiveEnemies([]);
    setActiveCollectibles([]);
    setActiveObstacles([]);
    keysPressedRef.current = {};
    gameSpeedRef.current = 0;
  };
  
  const resetGame = () => {
    stopGame();
    setTimeout(() => {
      startGame();
    }, 100);
  };
  
  const exportGame = () => {
    const gameData = {
      gameInfo: {
        title: gameTitle,
        genre: gameGenre,
        created: new Date().toISOString(),
        version: '1.0'
      },
      character: {
        name: characterName,
        face: characterFace,
        color: characterColor,
        power: characterPower,
        powerDetails: selectedPower
      },
      level: {
        name: levelName,
        theme: selectedTheme,
        themeDetails: selectedThemeData
      },
      gameElements: {
        enemies: enemies.map(e => ({ emoji: e.emoji, name: e.name })),
        collectibles: collectibles.map(c => ({ emoji: c.emoji, name: c.name }))
      },
      gameStats: {
        highScore: highScore,
        bestTime: gameTime,
        totalGames: 1
      },
      instructions: {
        movement: 'Use Arrow Keys or WASD to move your character',
        objective: 'Collect items to score points. Avoid enemies!',
        powers: {
          'super-speed': 'Move faster than normal',
          'flying': 'Can move in all directions freely',
          'invisibility': 'Enemies are destroyed on contact',
          'strength': 'Can push through obstacles',
          'fire': 'Shoot fireballs at enemies',
          'ice': 'Freeze enemies temporarily'
        }
      }
    };
    
    const dataStr = JSON.stringify(gameData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${gameTitle.replace(/\s+/g, '_')}_game_design.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Also create a readable text version
    const textData = `
🎮 ${gameTitle} - Game Design Document
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 GAME INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: ${gameTitle}
Genre: ${selectedGenre?.name} ${selectedGenre?.icon}
Created: ${new Date().toLocaleDateString()}

👤 CHARACTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${characterName} ${characterFace}
Color: ${characterColor}
Power: ${selectedPower?.name} ${selectedPower?.icon}
${selectedPower?.description}

🗺️ LEVEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${levelName}
Theme: ${selectedThemeData.name} ${selectedThemeData.icon}
${selectedThemeData.description}

👹 ENEMIES (${enemies.length})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${enemies.map(e => `${e.emoji} ${e.name}`).join('\n') || 'None'}

⭐ COLLECTIBLES (${collectibles.length})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${collectibles.map(c => `${c.emoji} ${c.name}`).join('\n') || 'None'}

🏆 GAME STATS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
High Score: ${highScore}
Best Time: ${gameTime} seconds

🎮 HOW TO PLAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Use Arrow Keys or WASD to move
• Collect items (⭐) to score points (+5 each)
• Avoid enemies (👹) or use your power!
• ${selectedPower?.description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Created with Douglas Kids Camps Game Design Studio
    `.trim();
    
    const textBlob = new Blob([textData], { type: 'text/plain' });
    const textUrl = URL.createObjectURL(textBlob);
    const textLink = document.createElement('a');
    textLink.href = textUrl;
    textLink.download = `${gameTitle.replace(/\s+/g, '_')}_game_design.txt`;
    document.body.appendChild(textLink);
    textLink.click();
    document.body.removeChild(textLink);
    URL.revokeObjectURL(textUrl);
  };
  
  const selectedPower = powers.find(p => p.id === characterPower);
  const selectedThemeData = themes[selectedTheme];
  const selectedGenre = genres.find(g => g.id === gameGenre);
  
  return (
    <div className="video-game-design">
      <div className="page-header">
        <button onClick={() => navigate('/video-game-design')} className="back-button">
          ← Back
        </button>
        <h1>🎮 Video Game Design Studio</h1>
        <p className="page-subtitle">Ages 6-9 • Create Your Own Games!</p>
      </div>

      <div className="design-container">
        {/* Navigation Steps */}
        <div className="steps-nav">
          <button 
            className={`step-btn ${currentStep === 'overview' ? 'active' : ''}`}
            onClick={() => setCurrentStep('overview')}
          >
            📋 Overview
          </button>
          <button 
            className={`step-btn ${currentStep === 'character' ? 'active' : ''}`}
            onClick={() => setCurrentStep('character')}
          >
            👤 Character
          </button>
          <button 
            className={`step-btn ${currentStep === 'level' ? 'active' : ''}`}
            onClick={() => setCurrentStep('level')}
          >
            🗺️ Level
          </button>
          <button 
            className={`step-btn ${currentStep === 'enemies' ? 'active' : ''}`}
            onClick={() => setCurrentStep('enemies')}
          >
            👹 Enemies
          </button>
          <button 
            className={`step-btn ${currentStep === 'play' ? 'active' : ''}`}
            onClick={() => setCurrentStep('play')}
          >
            🎮 Play
          </button>
          <button 
            className={`step-btn ${currentStep === 'export' ? 'active' : ''}`}
            onClick={() => setCurrentStep('export')}
          >
            📤 Export
          </button>
        </div>

        {/* Overview Step */}
        {currentStep === 'overview' && (
          <div className="step-content">
            <div className="activity-card">
              <h2>🎮 Game Overview</h2>
              <p>Start by giving your game a name and choosing its genre!</p>
              
              <div className="game-overview-form">
                <div className="control-group">
                  <label>Game Title</label>
                  <input
                    type="text"
                    className="game-title-input"
                    value={gameTitle}
                    onChange={(e) => setGameTitle(e.target.value)}
                    placeholder="Enter your game title..."
                  />
                </div>
                
                <div className="control-group">
                  <label>Game Genre</label>
                  <div className="genre-grid">
                    {genres.map(genre => (
                      <button
                        key={genre.id}
                        className={`genre-btn ${gameGenre === genre.id ? 'active' : ''}`}
                        onClick={() => setGameGenre(genre.id)}
                      >
                        <span className="genre-icon">{genre.icon}</span>
                        <span>{genre.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="game-preview-card">
                  <h3>Your Game Preview</h3>
                  <div className="preview-content">
                    <div className="preview-item">
                      <strong>Title:</strong> {gameTitle}
                    </div>
                    <div className="preview-item">
                      <strong>Genre:</strong> {selectedGenre?.icon} {selectedGenre?.name}
                    </div>
                    <div className="preview-item">
                      <strong>Character:</strong> {characterName} {characterFace}
                    </div>
                    <div className="preview-item">
                      <strong>Level:</strong> {levelName} {selectedThemeData?.icon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Character Creation Step */}
        {currentStep === 'character' && (
          <div className="step-content">
            <div className="activity-card">
              <h2>👤 Create Your Character</h2>
              <p>Design your hero with a unique look and special powers!</p>
              
              <div className="character-creator">
                <div className="character-preview">
                  <div 
                    className="character-display"
                    style={{ backgroundColor: characterColor }}
                  >
                    <div className="character-face">{characterFace}</div>
                    <div className="character-name-display">{characterName}</div>
                  </div>
                </div>
                
                <div className="character-controls">
                  <div className="control-group">
                    <label>Character Name</label>
                    <input
                      type="text"
                      className="character-input"
                      value={characterName}
                      onChange={(e) => setCharacterName(e.target.value)}
                      placeholder="Enter character name..."
                    />
                  </div>
                  
                  <div className="control-group">
                    <label>Character Face</label>
                    <div className="face-options">
                      {characterFaces.map(face => (
                        <button
                          key={face}
                          className={`face-option ${characterFace === face ? 'active' : ''}`}
                          onClick={() => setCharacterFace(face)}
                        >
                          {face}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="control-group">
                    <label>Character Color</label>
                    <div className="color-options">
                      {characterColors.map(color => (
                        <div
                          key={color}
                          className={`color-option ${characterColor === color ? 'active' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setCharacterColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="control-group">
                    <label>Special Power</label>
                    <div className="power-grid">
                      {powers.map(power => (
                        <button
                          key={power.id}
                          className={`power-btn ${characterPower === power.id ? 'active' : ''}`}
                          onClick={() => setCharacterPower(power.id)}
                        >
                          <span className="power-icon">{power.icon}</span>
                          <div className="power-info">
                            <div className="power-name">{power.name}</div>
                            <div className="power-desc">{power.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="character-stats">
                    <div className="stat">
                      <span className="stat-label">Power:</span>
                      <span className="stat-value">{selectedPower?.icon} {selectedPower?.name}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Color:</span>
                      <span className="stat-value" style={{ color: characterColor }}>●</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Level Design Step */}
        {currentStep === 'level' && (
          <div className="step-content">
            <div className="activity-card">
              <h2>🗺️ Design Your Level</h2>
              <p>Choose a theme and name for your game level!</p>
              
              <div className="level-builder">
                <div className="control-group">
                  <label>Level Name</label>
                  <input
                    type="text"
                    className="level-input"
                    value={levelName}
                    onChange={(e) => setLevelName(e.target.value)}
                    placeholder="Enter level name..."
                  />
                </div>
                
                <div className="control-group">
                  <label>Level Theme</label>
                  <div className="theme-buttons">
                    {Object.entries(themes).map(([key, theme]) => (
                      <button
                        key={key}
                        type="button"
                        className={`theme-btn ${selectedTheme === key ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedTheme(key);
                        }}
                        style={{ pointerEvents: 'auto' }}
                      >
                        <span className="theme-icon">{theme.icon}</span>
                        <span>{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="level-preview" style={{ background: selectedThemeData.bg }}>
                  <div className="level-content">
                    <div className="theme-icon">{selectedThemeData.icon}</div>
                    <h3>{levelName}</h3>
                    <p className="level-description">{selectedThemeData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enemies & Collectibles Step */}
        {currentStep === 'enemies' && (
          <div className="step-content">
            <div className="activities-container">
              <div className="activity-card">
                <h2>👹 Add Enemies</h2>
                <p>Choose enemies to challenge your character!</p>
                
                <div className="enemy-designer">
                  <div className="enemy-palette">
                    <h3>Enemy Types</h3>
                    <div className="enemy-type-grid">
                      {enemyTypes.map(enemy => (
                        <button
                          key={enemy.id}
                          className="enemy-type-btn"
                          onClick={() => addEnemy(enemy)}
                        >
                          <span className="enemy-icon">{enemy.emoji}</span>
                          <span>{enemy.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="enemy-list-section">
                    <h3>Your Enemies ({enemies.length})</h3>
                    {enemies.length === 0 ? (
                      <div className="empty-state">No enemies added yet. Click above to add some!</div>
                    ) : (
                      <div className="enemy-list">
                        {enemies.map(enemy => (
                          <div key={enemy.id} className="enemy-item">
                            <span className="enemy-icon">{enemy.emoji}</span>
                            <span className="enemy-info">{enemy.name}</span>
                            <button className="remove-btn" onClick={() => removeEnemy(enemy.id)}>
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="activity-card">
                <h2>⭐ Add Collectibles</h2>
                <p>Add items for your character to collect!</p>
                
                <div className="collectible-designer">
                  <div className="collectible-palette">
                    <h3>Collectible Types</h3>
                    <div className="collectible-type-grid">
                      {collectibleTypes.map(collectible => (
                        <button
                          key={collectible.id}
                          className="collectible-type-btn"
                          onClick={() => addCollectible(collectible)}
                        >
                          <span className="collectible-icon">{collectible.emoji}</span>
                          <span>{collectible.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="collectible-list-section">
                    <h3>Your Collectibles ({collectibles.length})</h3>
                    {collectibles.length === 0 ? (
                      <div className="empty-state">No collectibles added yet. Click above to add some!</div>
                    ) : (
                      <div className="collectible-list">
                        {collectibles.map(collectible => (
                          <div key={collectible.id} className="collectible-item">
                            <span className="collectible-icon">{collectible.emoji}</span>
                            <span className="collectible-info">{collectible.name}</span>
                            <button className="collect-btn" onClick={() => removeCollectible(collectible.id)}>
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Play Game Step */}
        {currentStep === 'play' && (
          <div className="step-content">
            <div className="activity-card">
              <h2>🎮 Play Your Game</h2>
              <p>Test out your game design and see how it plays!</p>
              
              <div className="game-playground">
                <div className="game-header">
                  <div className="game-title-display">{gameTitle}</div>
                </div>
                
                <div className="game-screen">
                  <div className="game-ui">
                    <div className="score-display">Score: {score}</div>
                    <div className="game-status">
                      <span>Time: {gameTime}s</span>
                      <span className="lives-display">❤️ Lives: {lives}</span>
                      {highScore > 0 && <span className="high-score">🏆 High: {highScore}</span>}
                    </div>
                    {gameActive && (
                      <div className="controls-indicator">
                        {genreConfig.movementType === 'forward-scroll' ? (
                          <>
                            <div className="arrow-keys-display">
                              <div className="arrow-row">
                                <div className={`arrow-key ${keysPressedDisplay['arrowleft'] || keysPressedDisplay['a'] ? 'pressed' : ''}`}>⬅️</div>
                                <div className={`arrow-key ${keysPressedDisplay['arrowright'] || keysPressedDisplay['d'] ? 'pressed' : ''}`}>➡️</div>
                              </div>
                            </div>
                            <div className="controls-label">Use Left/Right to Steer</div>
                          </>
                        ) : (
                          <>
                            <div className="arrow-keys-display">
                              <div className={`arrow-key ${keysPressedDisplay['arrowup'] || keysPressedDisplay['w'] ? 'pressed' : ''}`}>⬆️</div>
                              <div className="arrow-row">
                                <div className={`arrow-key ${keysPressedDisplay['arrowleft'] || keysPressedDisplay['a'] ? 'pressed' : ''}`}>⬅️</div>
                                <div className={`arrow-key ${keysPressedDisplay['arrowdown'] || keysPressedDisplay['s'] ? 'pressed' : ''}`}>⬇️</div>
                                <div className={`arrow-key ${keysPressedDisplay['arrowright'] || keysPressedDisplay['d'] ? 'pressed' : ''}`}>➡️</div>
                              </div>
                            </div>
                            <div className="controls-label">Use Arrow Keys to Move</div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div 
                    className="game-world"
                    ref={gameWorldRef}
                    style={{ background: selectedThemeData.bg }}
                  >
                    {!gameActive && !gameOver && (
                      <div className="game-start-message">
                        <h3>Ready to Play?</h3>
                        <p>Click "Start Game" to begin!</p>
                        <p className="game-instructions">
                          <strong>🎮 Controls:</strong><br/>
                          {genreConfig.movementType === 'forward-scroll' ? (
                            <>
                              <span className="control-hint">⬅️ ➡️ Left/Right Arrow Keys to Steer</span><br/>
                              <span className="control-hint">or A D keys</span><br/>
                            </>
                          ) : (
                            <>
                              <span className="control-hint">⬅️ ⬆️ ⬇️ ➡️ Arrow Keys to Move</span><br/>
                              <span className="control-hint">or W A S D keys</span><br/>
                            </>
                          )}
                          <br/>
                          <strong>🎯 Objective:</strong> {genreConfig.instructions}<br/>
                          {genreConfig.movementType !== 'forward-scroll' && (
                            <>
                              <strong>⚠️ Danger:</strong> Avoid enemies (👹) - they chase you!<br/>
                            </>
                          )}
                          {genreConfig.obstacles && genreConfig.movementType === 'forward-scroll' && (
                            <>
                              <strong>⚠️ Danger:</strong> Avoid obstacles (🛑) coming at you!<br/>
                            </>
                          )}
                          <strong>⚡ Power:</strong> {selectedPower?.description}<br/>
                          {characterPower === 'invisibility' && genreConfig.movementType !== 'forward-scroll' && '💡 With Invisibility, enemies are destroyed on contact!'}<br/><br/>
                          <strong>💡 Tip:</strong> {genreConfig.movementType === 'forward-scroll' ? 'Stay in your lane and dodge obstacles!' : 'Keep moving! Use arrow keys to navigate and collect items while avoiding enemies!'}
                        </p>
                      </div>
                    )}
                    
                    {gameOver && (
                      <div className="game-over-message">
                        <h3>💀 Game Over!</h3>
                        <p>Final Score: <strong>{score}</strong></p>
                        <p>Time Survived: <strong>{gameTime}</strong> seconds</p>
                        {(score > previousHighScore || (previousHighScore === 0 && score > 0)) && (
                          <p className="game-over-stats">
                            <span className="new-record">🎉 {previousHighScore === 0 ? 'First High Score!' : 'New High Score!'} 🎉</span>
                          </p>
                        )}
                        <button className="play-btn" onClick={resetGame} style={{ marginTop: '1rem' }}>
                          🔄 Play Again
                        </button>
                      </div>
                    )}
                    
                    {gameActive && !gameOver && (
                      <>
                        <div 
                          ref={characterRef}
                          className={`game-character ${genreConfig.movementType === 'forward-scroll' ? 'racing-character' : ''}`}
                          style={{ 
                            backgroundColor: genreConfig.characterIcon ? 'transparent' : characterColor,
                            left: `${characterPositionRef.current.x}px`,
                            top: `${characterPositionRef.current.y}px`
                          }}
                        >
                          {genreConfig.characterIcon || characterFace}
                        </div>
                        
                        {/* Render obstacles (for racing) */}
                        {activeObstacles.map(obstacle => (
                          <div
                            key={obstacle.id}
                            className="game-obstacle"
                            style={{
                              left: `${obstacle.x}px`,
                              top: `${obstacle.y}px`,
                              fontSize: '2.5rem'
                            }}
                          >
                            {obstacle.emoji}
                          </div>
                        ))}
                        
                        {/* Render enemies from state */}
                        {activeEnemies.map(enemy => (
                          <div
                            key={enemy.id}
                            className="game-enemy"
                            style={{
                              left: `${enemy.x}px`,
                              top: `${enemy.y}px`,
                              fontSize: '2.5rem'
                            }}
                          >
                            {enemy.emoji}
                          </div>
                        ))}
                        
                        {/* Render collectibles from state */}
                        {activeCollectibles.map(collectible => (
                          <div
                            key={collectible.id}
                            className="game-collectible"
                            style={{
                              left: `${collectible.x}px`,
                              top: `${collectible.y}px`,
                              fontSize: '2rem'
                            }}
                          >
                            {collectible.emoji}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  
                  <div className="game-controls">
                    {!gameActive && !gameOver ? (
                      <button className="play-btn" onClick={startGame}>
                        ▶️ Start Game
                      </button>
                    ) : gameActive ? (
                      <button className="play-btn" onClick={stopGame}>
                        ⏸️ Pause Game
                      </button>
                    ) : null}
                    {gameActive && (
                      <button className="reset-btn" onClick={resetGame}>
                        🔄 Restart
                      </button>
                    )}
                    {!gameActive && !gameOver && (
                      <button className="reset-btn" onClick={stopGame}>
                        🔄 Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Step */}
        {currentStep === 'export' && (
          <div className="step-content">
            <div className="activity-card">
              <h2>📤 Export Your Game</h2>
              <p>Save your game design and share it with others!</p>
              
              <div className="publish-section">
                <div className="game-summary">
                  <h3>🎮 Your Game Summary</h3>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <div className="summary-label">Game Title</div>
                      <div className="summary-value">{gameTitle}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Genre</div>
                      <div className="summary-value">{selectedGenre?.icon} {selectedGenre?.name}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Character</div>
                      <div className="summary-value">{characterName} {characterFace}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Power</div>
                      <div className="summary-value">{selectedPower?.icon} {selectedPower?.name}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Level</div>
                      <div className="summary-value">{levelName} {selectedThemeData?.icon}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Enemies</div>
                      <div className="summary-value">{enemies.length}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Collectibles</div>
                      <div className="summary-value">{collectibles.length}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">High Score</div>
                      <div className="summary-value">{highScore || score}</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Best Time</div>
                      <div className="summary-value">{gameTime}s</div>
                    </div>
                  </div>
                </div>
                
                <button className="export-btn" onClick={exportGame}>
                  📥 Download Game Design
                </button>
                
                <div className="publish-hint">
                  💡 Tip: Save your game design file and share it with friends! You can also use it as a blueprint to build your game in real game engines like Unity, Scratch, or GameMaker!
                </div>
                
                <div className="certificate">
                  <div className="certificate-content">
                    <h3>🏆 Game Designer Certificate</h3>
                    <p className="certificate-text">
                      This certifies that you have successfully designed<br/>
                      <strong>{gameTitle}</strong><br/>
                      A {selectedGenre?.name} game featuring {characterName} {characterFace}<br/>
                      with {selectedPower?.name} power!
                    </p>
                    <div className="certificate-stamp">🎮</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoGameDesignJunior;

