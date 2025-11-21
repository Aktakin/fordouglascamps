import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FinalRoundMaze.css';
import { completeLevel as markLevelComplete } from '../../utils/levelProgress';

const themes = {
  roblox: {
    name: 'Roblox',
    icon: '🎮',
    color: '#e60012',
    character: '🧱',
    wall: '⬛',
    path: '⬜',
    goal: '🏆',
    bg: 'linear-gradient(135deg, #e60012 0%, #ff4757 100%)'
  },
  minecraft: {
    name: 'Minecraft',
    icon: '⛏️',
    color: '#62b74a',
    character: '🧱',
    wall: '🟫',
    path: '🟩',
    goal: '💎',
    bg: 'linear-gradient(135deg, #62b74a 0%, #7ed321 100%)'
  },
  avengers: {
    name: 'Avengers',
    icon: '🦸',
    color: '#1e3a8a',
    character: '🦸',
    wall: '🟦',
    path: '⭐',
    goal: '🛡️',
    bg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
  },
  movies: {
    name: 'Movie Heroes',
    icon: '🎬',
    color: '#f59e0b',
    character: '🎭',
    wall: '🎪',
    path: '✨',
    goal: '🎬',
    bg: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
  }
};

function FinalRoundMaze() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [characterName, setCharacterName] = useState('');
  const [characterColor, setCharacterColor] = useState('#3b88f5');
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [codeMode, setCodeMode] = useState('blocks'); // 'blocks' or 'code'
  const [blocks, setBlocks] = useState([]); // Array of block objects
  const [gameState, setGameState] = useState('theme-selection'); // theme-selection, character-creation, playing, level-complete
  const [maze, setMaze] = useState([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [goalPos, setGoalPos] = useState({ x: 0, y: 0 });
  const [showTip, setShowTip] = useState(false);
  const [moves, setMoves] = useState(0);
  const [maxMoves, setMaxMoves] = useState(50);

  const levelData = [
    {
      level: 1,
      title: "Your First Step",
      description: "Just move forward to reach the goal! Super easy!",
      maze: [
        ['W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Just move forward 2 times!
moveForward();
moveForward();`,
      tip: "💡 Click the \"Move Forward\" block twice, or type moveForward(); two times!",
      maxMoves: 5,
      concepts: ['basics']
    },
    {
      level: 2,
      title: "A Little Further",
      description: "Move forward a bit more to reach the goal!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Move forward 3 times
moveForward();
moveForward();
moveForward();`,
      tip: "💡 Try using a \"Repeat\" block set to 3! Or just add more moveForward() blocks.",
      maxMoves: 8,
      concepts: ['basics', 'loops']
    },
    {
      level: 3,
      title: "Turn Around",
      description: "Move forward, then turn right, then move to the goal!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'W', 'G', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Move forward, turn right, then move forward
moveForward();
moveForward();
turnRight();
moveForward();
moveForward();`,
      tip: "💡 First move forward 2 times, then turn right, then move forward 2 more times!",
      maxMoves: 10,
      concepts: ['basics', 'turns']
    },
    {
      level: 4,
      title: "Using Loops",
      description: "Use a loop to repeat movements!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Use a loop to move forward 4 times
for (let i = 0; i < 4; i++) {
  moveForward();
}`,
      tip: "💡 Use a \"Repeat\" block set to 4! Loops help you repeat actions without writing the same code many times.",
      maxMoves: 8,
      concepts: ['loops']
    },
    {
      level: 5,
      title: "Loops and Turns",
      description: "Use loops with turns to navigate!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'W', 'G', 'W'],
        ['W', 'P', 'W', 'P', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Move forward in a loop, then turn
for (let i = 0; i < 3; i++) {
  moveForward();
}
turnRight();
for (let i = 0; i < 2; i++) {
  moveForward();
}`,
      tip: "💡 Use a loop to move forward, then turn, then use another loop! This helps you navigate corners.",
      maxMoves: 12,
      concepts: ['loops', 'turns']
    },
    {
      level: 6,
      title: "Check for Walls",
      description: "Use if/else to check if you can move forward!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'G', 'W'],
        ['W', 'P', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Use if/else to check for walls
for (let i = 0; i < 8; i++) {
  if (canMoveForward()) {
    moveForward();
  } else {
    turnRight();
    moveForward();
  }
}`,
      tip: "💡 Use an \"If/Else\" block with \"Can Move Forward\"! If you can move, go forward. Otherwise, turn and move.",
      maxMoves: 15,
      concepts: ['if-else', 'loops']
    },
    {
      level: 7,
      title: "More Turns",
      description: "Navigate with multiple turns!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'W', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'P', 'W', 'P', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Move, turn, move, turn, move
for (let i = 0; i < 3; i++) {
  moveForward();
}
turnRight();
for (let i = 0; i < 2; i++) {
  moveForward();
}
turnRight();
for (let i = 0; i < 3; i++) {
  moveForward();
}`,
      tip: "💡 Combine loops with turns! Move in a loop, turn, move in another loop, turn again, and move!",
      maxMoves: 18,
      concepts: ['loops', 'turns']
    },
    {
      level: 8,
      title: "Smart Navigation",
      description: "Use if/else to check multiple directions!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'W', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'P', 'W', 'P', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'P', 'W', 'P', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'W', 'W', 'W', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Check multiple directions
function findPath() {
  if (canMoveForward()) {
    moveForward();
  } else if (canMoveRight()) {
    turnRight();
    moveForward();
  } else if (canMoveLeft()) {
    turnLeft();
    moveForward();
  } else {
    turnRight();
    turnRight();
    moveForward();
  }
}

// Keep moving
for (let i = 0; i < 20; i++) {
  findPath();
}`,
      tip: "💡 Create a function to check all directions! Use if/else to try forward, right, left, or turn around.",
      maxMoves: 30,
      concepts: ['functions', 'if-else', 'loops']
    },
    {
      level: 9,
      title: "Master Navigator",
      description: "Use all your skills!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'P', 'W', 'P', 'W', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'P', 'W', 'W', 'W', 'W', 'W', 'P', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Advanced navigation with backtracking
let path = [];
let x = 0;
let y = 0;

function moveAndRecord() {
  if (canMoveForward()) {
    moveForward();
    path.push("forward");
    return true;
  }
  return false;
}

function backtrack() {
  if (path.length > 0) {
    let lastMove = path.pop();
    if (lastMove === "forward") {
      turnRight();
      turnRight();
      moveForward();
      turnRight();
      turnRight();
    }
  }
}

// Main algorithm
for (let i = 0; i < 50; i++) {
  if (!moveAndRecord()) {
    turnRight();
    if (!moveAndRecord()) {
      turnLeft();
      turnLeft();
      if (!moveAndRecord()) {
        backtrack();
      }
    }
  }
}`,
      tip: "💡 Use arrays (lists) to remember your path! This is called backtracking - a powerful algorithm technique!",
      maxMoves: 60,
      concepts: ['arrays', 'functions', 'loops', 'if-else', 'variables']
    },
    {
      level: 10,
      title: "Final Challenge",
      description: "The ultimate maze! Use everything you've learned!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'P', 'W', 'P', 'W', 'W', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'P', 'W', 'W', 'W', 'W', 'W', 'P', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// ULTIMATE CHALLENGE: Create your own solution!
// Use everything: variables, loops, if/else, functions, arrays

// Your code here - be creative!
let name = "Hero";
let moves = 0;

function smartMove() {
  // Your navigation logic here
}

// Your main loop here
`,
      tip: "💡 This is your final test! Combine all concepts: variables for your character, loops for repetition, if/else for decisions, and functions for organization. You've got this!",
      maxMoves: 70,
      concepts: ['all']
    }
  ];

  useEffect(() => {
    if (gameState === 'playing') {
      initializeMaze();
      setDirection('right');
      // Reset blocks and code when level changes
      setBlocks([]);
      setUserCode('');
      setOutput('');
    }
  }, [currentLevel, gameState]);
  
  useEffect(() => {
    if (gameState === 'character-creation' && selectedTheme) {
      // Theme selected, ready for character creation
    }
  }, [selectedTheme]);

  const initializeMaze = () => {
    const level = levelData[currentLevel - 1];
    const newMaze = level.maze.map(row => [...row]);
    
    // Find start position (first 'P')
    let startFound = false;
    for (let y = 0; y < newMaze.length; y++) {
      for (let x = 0; x < newMaze[y].length; x++) {
        if (newMaze[y][x] === 'P' && !startFound) {
          setPlayerPos({ x, y });
          newMaze[y][x] = 'C'; // Character
          startFound = true;
        }
        if (newMaze[y][x] === 'G') {
          setGoalPos({ x, y });
        }
      }
    }
    
    setMaze(newMaze);
    setMoves(0);
    setMaxMoves(level.maxMoves);
  };

  // Game API functions that users can call
  const moveForward = () => {
    const newPos = { ...playerPos };
    const dir = getDirection();
    
    if (dir === 'right') newPos.x += 1;
    else if (dir === 'left') newPos.x -= 1;
    else if (dir === 'up') newPos.y -= 1;
    else if (dir === 'down') newPos.y += 1;
    
    if (isValidMove(newPos)) {
      updatePlayerPosition(newPos);
      setMoves(prev => prev + 1);
      return true;
    }
    return false;
  };
  
  const turnRight = () => {
    const dirMap = { 'right': 'down', 'down': 'left', 'left': 'up', 'up': 'right' };
    setDirection(dirMap[getDirection()]);
    return true;
  };
  
  const turnLeft = () => {
    const dirMap = { 'right': 'up', 'up': 'left', 'left': 'down', 'down': 'right' };
    setDirection(dirMap[getDirection()]);
    return true;
  };
  
  const canMoveForward = () => {
    const newPos = { ...playerPos };
    const dir = getDirection();
    
    if (dir === 'right') newPos.x += 1;
    else if (dir === 'left') newPos.x -= 1;
    else if (dir === 'up') newPos.y -= 1;
    else if (dir === 'down') newPos.y += 1;
    
    return isValidMove(newPos);
  };
  
  const canMoveRight = () => {
    const newPos = { ...playerPos };
    const dir = getDirection();
    
    if (dir === 'right') newPos.y += 1;
    else if (dir === 'left') newPos.y -= 1;
    else if (dir === 'up') newPos.x += 1;
    else if (dir === 'down') newPos.x -= 1;
    
    return isValidMove(newPos);
  };
  
  const canMoveLeft = () => {
    const newPos = { ...playerPos };
    const dir = getDirection();
    
    if (dir === 'right') newPos.y -= 1;
    else if (dir === 'left') newPos.y += 1;
    else if (dir === 'up') newPos.x -= 1;
    else if (dir === 'down') newPos.x += 1;
    
    return isValidMove(newPos);
  };

  const directionRef = useRef('right'); // right, left, up, down

  const getDirection = () => directionRef.current;
  
  const setDirection = (newDir) => {
    directionRef.current = newDir;
  };

  const isValidMove = (pos) => {
    if (pos.y < 0 || pos.y >= maze.length || pos.x < 0 || pos.x >= maze[0].length) {
      return false;
    }
    const cell = maze[pos.y][pos.x];
    return cell === 'P' || cell === 'G' || cell === 'C';
  };

  const updatePlayerPosition = (newPos) => {
    const newMaze = maze.map(row => [...row]);
    newMaze[playerPos.y][playerPos.x] = 'P';
    newMaze[newPos.y][newPos.x] = 'C';
    setMaze(newMaze);
    setPlayerPos(newPos);
    
    // Check if reached goal
    if (newPos.x === goalPos.x && newPos.y === goalPos.y) {
      setGameState('level-complete');
      // Mark level as completed in localStorage
      markLevelComplete('final-round-maze', currentLevel);
    }
  };

  // Convert blocks to code
  const blocksToCode = (blockArray) => {
    let code = '';
    blockArray.forEach(block => {
      if (block.type === 'moveForward') {
        code += 'moveForward();\n';
      } else if (block.type === 'turnRight') {
        code += 'turnRight();\n';
      } else if (block.type === 'turnLeft') {
        code += 'turnLeft();\n';
      } else if (block.type === 'loop') {
        code += `for (let i = 0; i < ${block.count || 1}; i++) {\n`;
        if (block.children && block.children.length > 0) {
          const childCode = blocksToCode(block.children);
          code += childCode.split('\n').map(line => '  ' + line).join('\n');
        }
        code += '}\n';
      } else if (block.type === 'if') {
        code += `if (${block.condition || 'canMoveForward()'}) {\n`;
        if (block.children && block.children.length > 0) {
          const childCode = blocksToCode(block.children);
          code += childCode.split('\n').map(line => '  ' + line).join('\n');
        }
        code += '} else {\n';
        if (block.elseChildren && block.elseChildren.length > 0) {
          const childCode = blocksToCode(block.elseChildren);
          code += childCode.split('\n').map(line => '  ' + line).join('\n');
        }
        code += '}\n';
      } else if (block.type === 'variable') {
        code += `let ${block.name || 'name'} = "${block.value || ''}";\n`;
      }
    });
    return code;
  };

  const runCode = () => {
    try {
      let code;
      if (codeMode === 'blocks') {
        code = blocksToCode(blocks);
        if (!code.trim()) {
          setOutput('⚠️ Add some blocks to your program first!');
          return;
        }
      } else {
        code = userCode || levelData[currentLevel - 1].startingCode;
      }
      
      // Reset direction
      setDirection('right');
      
      // Create a safe execution environment
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(' '));
      };
      
      // Inject game API into execution context
      const executeCode = new Function(
        'moveForward', 'turnRight', 'turnLeft', 'canMoveForward', 'canMoveRight', 'canMoveLeft', 'console',
        code
      );
      
      executeCode(
        moveForward,
        turnRight,
        turnLeft,
        canMoveForward,
        canMoveRight,
        canMoveLeft,
        console
      );
      
      console.log = originalLog;
      setOutput(logs.length > 0 ? logs.join('\n') : 'Code executed!');
      
      // Check win condition after a short delay to allow state updates
      setTimeout(() => {
        if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
          setGameState('level-complete');
          // Mark level as completed in localStorage
          markLevelComplete('final-round-maze', currentLevel);
        }
      }, 100);
    } catch (error) {
      setOutput(`Error: ${error.message}\n💡 Tip: Check your code syntax!`);
    }
  };

  if (gameState === 'theme-selection') {
    return (
      <div className="final-round-maze">
        <div className="activity-header">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Back
          </button>
          <h1>🎯 Final Round - Maze Adventure</h1>
          <p className="activity-subtitle">Use all your programming skills to navigate mazes!</p>
        </div>
        
        <div className="theme-selection">
          <h2>Choose Your Theme</h2>
          <div className="themes-grid">
            {Object.entries(themes).map(([key, theme]) => (
              <div
                key={key}
                className="theme-card"
                onClick={() => {
                  setSelectedTheme(key);
                  setGameState('character-creation');
                }}
                style={{ background: theme.bg }}
              >
                <div className="theme-icon">{theme.icon}</div>
                <h3>{theme.name}</h3>
                <div className="theme-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'character-creation') {
    return (
      <div className="final-round-maze">
        <div className="activity-header">
          <button onClick={() => setGameState('theme-selection')} className="back-button">
            ← Back to Themes
          </button>
          <h1>🎯 Create Your Character</h1>
          <p className="activity-subtitle">Use variables to create your character!</p>
        </div>
        
        <div className="character-creation">
          <div className="character-form">
            <div className="form-group">
              <label>Character Name (variable: name)</label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter your character's name"
                className="character-input"
              />
            </div>
            <div className="form-group">
              <label>Character Color (variable: color)</label>
              <input
                type="color"
                value={characterColor}
                onChange={(e) => setCharacterColor(e.target.value)}
                className="color-input"
              />
            </div>
            <div className="character-preview">
              <h3>Your Character:</h3>
              <div className="preview-character" style={{ color: characterColor }}>
                {themes[selectedTheme].character} {characterName || 'Hero'}
              </div>
            </div>
            <button
              onClick={() => {
                setGameState('playing');
                setDirection('right');
                setTimeout(() => initializeMaze(), 100);
              }}
              className="start-game-btn"
              disabled={!characterName}
            >
              Start Maze Adventure! 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'level-complete') {
    return (
      <div className="level-complete-screen">
        <div className="complete-content">
          <h2>🎉 Level {currentLevel} Complete!</h2>
          <p>Great job, {characterName}!</p>
          <p>Moves used: {moves} / {maxMoves}</p>
          {currentLevel < 10 ? (
            <button
              onClick={() => {
                setCurrentLevel(currentLevel + 1);
                setGameState('playing');
                setUserCode('');
                setOutput('');
                setBlocks([]);
                setMoves(0);
              }}
              className="next-level-btn"
            >
              Continue to Level {currentLevel + 1} →
            </button>
          ) : (
            <div className="final-complete">
              <h3>🏆 Congratulations!</h3>
              <p>You've completed all 10 levels!</p>
              <button
                onClick={() => {
                  setCurrentLevel(1);
                  setGameState('theme-selection');
                  setCharacterName('');
                  setCharacterColor('#3b88f5');
                }}
                className="restart-btn"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentLevelData = levelData[currentLevel - 1];
  const theme = themes[selectedTheme];

  return (
    <div className="final-round-maze" style={{ background: theme.bg }}>
      <div className="activity-header">
        <button onClick={() => setGameState('character-creation')} className="back-button">
          ← Back
        </button>
        <h1>{theme.icon} {theme.name} Maze - Level {currentLevel}</h1>
        <div className="game-stats">
          <span>Moves: {moves} / {maxMoves}</span>
          <button onClick={() => setShowTip(!showTip)} className="tip-btn">
            {showTip ? '🙈 Hide Tip' : '💡 Show Tip'}
          </button>
        </div>
      </div>

      <div className="maze-game-container">
        <div className="code-section">
          <div className="code-header">
            <h3>Your Code</h3>
            <div className="code-mode-toggle">
              <button
                className={`mode-btn ${codeMode === 'blocks' ? 'active' : ''}`}
                onClick={() => setCodeMode('blocks')}
              >
                🧱 Blocks
              </button>
              <button
                className={`mode-btn ${codeMode === 'code' ? 'active' : ''}`}
                onClick={() => setCodeMode('code')}
              >
                💻 Code
              </button>
            </div>
            <div className="code-actions">
              <button 
                onClick={() => {
                  if (codeMode === 'blocks') {
                    setBlocks([]);
                  } else {
                    setUserCode(currentLevelData.startingCode);
                  }
                }} 
                className="reset-btn"
              >
                🔄 Reset
              </button>
              <button onClick={runCode} className="run-btn">
                ▶️ Run Code
              </button>
            </div>
          </div>
          
          {showTip && (
            <div className="tip-box">
              <p>{currentLevelData.tip}</p>
              <div className="concepts-used">
                <strong>Concepts used:</strong> {currentLevelData.concepts.join(', ')}
              </div>
            </div>
          )}

          {codeMode === 'blocks' ? (
            <BlockEditor blocks={blocks} setBlocks={setBlocks} />
          ) : (
            <textarea
              value={userCode || currentLevelData.startingCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="code-editor-maze"
              placeholder="Write your code here..."
              spellCheck={false}
            />
          )}

          <div className="output-section">
            <h4>Output</h4>
            <div className="output-display-maze">
              {output || 'Run your code to see output...'}
            </div>
          </div>
        </div>

        <div className="maze-section">
          <div className="maze-info">
            <h3>{currentLevelData.title}</h3>
            <p>{currentLevelData.description}</p>
            <div className="legend">
              <div className="legend-item">
                <span className="legend-cell" style={{ background: theme.color }}>{theme.character}</span>
                <span>Your Character ({characterName})</span>
              </div>
              <div className="legend-item">
                <span className="legend-cell">{theme.wall}</span>
                <span>Wall (can't pass)</span>
              </div>
              <div className="legend-item">
                <span className="legend-cell">{theme.path}</span>
                <span>Path (can walk)</span>
              </div>
              <div className="legend-item">
                <span className="legend-cell">{theme.goal}</span>
                <span>Goal (reach here!)</span>
              </div>
            </div>
          </div>
          
          <div className="maze-display">
            {maze.map((row, y) => (
              <div key={y} className="maze-row">
                {row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`maze-cell ${
                      cell === 'W' ? 'wall' :
                      cell === 'C' ? 'character' :
                      cell === 'G' ? 'goal' :
                      'path'
                    }`}
                  >
                    {cell === 'W' ? theme.wall :
                     cell === 'C' ? <span style={{ color: characterColor }}>{theme.character}</span> :
                     cell === 'G' ? theme.goal :
                     theme.path}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Block Editor Component
function BlockEditor({ blocks, setBlocks }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const blockTypes = [
    { type: 'moveForward', label: 'Move Forward', icon: '⬆️', color: '#3b88f5' },
    { type: 'turnRight', label: 'Turn Right', icon: '↪️', color: '#4ecdc4' },
    { type: 'turnLeft', label: 'Turn Left', icon: '↩️', color: '#ffe66d' },
    { type: 'loop', label: 'Repeat', icon: '🔄', color: '#a78bfa', hasInput: true },
    { type: 'if', label: 'If/Else', icon: '🔀', color: '#ff6b6b', hasChildren: true },
    { type: 'variable', label: 'Variable', icon: '📦', color: '#ff8787', hasInput: true, hasValue: true }
  ];

  const addBlock = (blockType) => {
    const newBlock = {
      id: Date.now(),
      type: blockType.type,
      ...(blockType.hasInput && { count: 1 }),
      ...(blockType.hasValue && { name: 'name', value: '' }),
      ...(blockType.hasChildren && { children: [], elseChildren: [] })
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const updateBlock = (index, updates) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    setBlocks(newBlocks);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    
    const newBlocks = [...blocks];
    const [removed] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(dropIndex, 0, removed);
    setBlocks(newBlocks);
    setDraggedIndex(null);
  };

  return (
    <div className="block-editor">
      <div className="block-palette">
        <h4>Drag Blocks Here:</h4>
        <div className="block-palette-grid">
          {blockTypes.map(blockType => (
            <div
              key={blockType.type}
              className="block-palette-item"
              onClick={() => addBlock(blockType)}
              style={{ borderColor: blockType.color }}
            >
              <span className="block-icon">{blockType.icon}</span>
              <span className="block-label">{blockType.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="block-workspace">
        <h4>Your Program:</h4>
        {blocks.length === 0 ? (
          <div className="empty-workspace">
            <p>👆 Click blocks above to add them to your program!</p>
            <p>Drag blocks to reorder them</p>
          </div>
        ) : (
          <div className="blocks-container">
            {blocks.map((block, index) => {
              const blockType = blockTypes.find(bt => bt.type === block.type);
              return (
                <div
                  key={block.id}
                  className="code-block"
                  style={{ borderColor: blockType.color }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <div className="block-header">
                    <span className="block-icon">{blockType.icon}</span>
                    <span className="block-title">{blockType.label}</span>
                    <button
                      className="remove-block-btn"
                      onClick={() => removeBlock(index)}
                      title="Remove block"
                    >
                      ×
                    </button>
                  </div>
                  
                  {block.type === 'loop' && (
                    <div className="block-input">
                      <label>Repeat:</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={block.count || 1}
                        onChange={(e) => updateBlock(index, { count: parseInt(e.target.value) || 1 })}
                        className="block-number-input"
                      />
                      <span>times</span>
                    </div>
                  )}

                  {block.type === 'variable' && (
                    <div className="block-inputs">
                      <div className="block-input">
                        <label>Name:</label>
                        <input
                          type="text"
                          value={block.name || 'name'}
                          onChange={(e) => updateBlock(index, { name: e.target.value })}
                          className="block-text-input"
                          placeholder="name"
                        />
                      </div>
                      <div className="block-input">
                        <label>Value:</label>
                        <input
                          type="text"
                          value={block.value || ''}
                          onChange={(e) => updateBlock(index, { value: e.target.value })}
                          className="block-text-input"
                          placeholder="value"
                        />
                      </div>
                    </div>
                  )}

                  {block.type === 'if' && (
                    <div className="block-input">
                      <label>Condition:</label>
                      <select
                        value={block.condition || 'canMoveForward()'}
                        onChange={(e) => updateBlock(index, { condition: e.target.value })}
                        className="block-select"
                      >
                        <option value="canMoveForward()">Can Move Forward</option>
                        <option value="canMoveRight()">Can Move Right</option>
                        <option value="canMoveLeft()">Can Move Left</option>
                      </select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default FinalRoundMaze;

