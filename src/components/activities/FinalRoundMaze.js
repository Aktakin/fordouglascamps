import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './FinalRoundMaze.css';

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
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [characterName, setCharacterName] = useState('');
  const [characterColor, setCharacterColor] = useState('#3b88f5');
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
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
      title: "First Steps",
      description: "Create your character and move to the goal!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Step 1: Create your character using variables
let name = "";
let color = "";

// Step 2: Use a loop to move forward
for (let i = 0; i < 4; i++) {
  moveForward();
}

// Step 3: Turn right and move
turnRight();
moveForward();
moveForward();`,
      tip: "💡 Use variables to store your character's name and color! Then use a loop to repeat movements.",
      maxMoves: 20,
      concepts: ['variables', 'loops']
    },
    {
      level: 2,
      title: "Turn and Move",
      description: "Navigate around corners using turns!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'W', 'P', 'W'],
        ['W', 'P', 'W', 'P', 'W', 'P', 'W'],
        ['W', 'P', 'W', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'W', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Use loops and turns to navigate
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
      tip: "💡 Combine loops with turnRight() and turnLeft() to navigate corners!",
      maxMoves: 25,
      concepts: ['loops', 'functions']
    },
    {
      level: 3,
      title: "If Walls Ahead",
      description: "Use if/else to check for walls!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Use if/else to check for walls
for (let i = 0; i < 6; i++) {
  if (canMoveForward()) {
    moveForward();
  } else {
    turnRight();
    moveForward();
  }
}`,
      tip: "💡 Use if/else with canMoveForward() to check if there's a wall before moving!",
      maxMoves: 30,
      concepts: ['loops', 'if-else']
    },
    {
      level: 4,
      title: "Smart Navigation",
      description: "Combine all concepts to navigate!",
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
      startingCode: `// Create a function to move smartly
function moveSmart() {
  if (canMoveForward()) {
    moveForward();
  } else {
    turnRight();
    if (canMoveForward()) {
      moveForward();
    } else {
      turnLeft();
      turnLeft();
      moveForward();
    }
  }
}

// Use a loop to keep moving
for (let i = 0; i < 15; i++) {
  moveSmart();
}`,
      tip: "💡 Create functions to make your code reusable! Functions help organize your movement logic.",
      maxMoves: 35,
      concepts: ['functions', 'if-else', 'loops']
    },
    {
      level: 5,
      title: "Complex Maze",
      description: "Navigate a more complex path!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'W', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'P', 'W', 'P', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'P', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Use variables to track direction
let steps = 0;
let direction = "forward";

// Create a navigation function
function navigate() {
  if (canMoveForward()) {
    moveForward();
    steps = steps + 1;
  } else {
    turnRight();
    if (canMoveForward()) {
      moveForward();
      steps = steps + 1;
    }
  }
}

// Loop until you reach the goal
while (steps < 20) {
  navigate();
}`,
      tip: "💡 Use variables to track your progress! Combine while loops with if/else for smart navigation.",
      maxMoves: 40,
      concepts: ['variables', 'loops', 'if-else', 'functions']
    },
    {
      level: 6,
      title: "Dead Ends",
      description: "Handle dead ends with smart logic!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'W', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'P', 'W', 'P', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'P', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Function to check all directions
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
for (let i = 0; i < 25; i++) {
  findPath();
}`,
      tip: "💡 Check multiple directions using else if! This helps you find the right path when you hit a dead end.",
      maxMoves: 45,
      concepts: ['functions', 'if-else', 'loops']
    },
    {
      level: 7,
      title: "Spiral Challenge",
      description: "Navigate a spiral pattern!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'P', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Use nested loops for complex patterns
let distance = 10;

for (let side = 0; side < 4; side++) {
  for (let step = 0; step < distance; step++) {
    if (canMoveForward()) {
      moveForward();
    } else {
      break;
    }
  }
  turnRight();
  distance = distance - 2;
}`,
      tip: "💡 Nested loops (loops inside loops) help you create patterns! Use variables to control the pattern size.",
      maxMoves: 50,
      concepts: ['nested-loops', 'variables', 'if-else']
    },
    {
      level: 8,
      title: "Multi-Path Maze",
      description: "Choose the right path!",
      maze: [
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'W', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'P', 'W', 'P', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'P', 'W', 'W', 'W', 'W', 'W', 'P', 'W', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'P', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'P', 'W'],
        ['W', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'G', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
      ],
      startingCode: `// Smart pathfinding function
function explore() {
  let tried = 0;
  
  while (tried < 4) {
    if (canMoveForward()) {
      moveForward();
      return true;
    } else {
      turnRight();
      tried = tried + 1;
    }
  }
  return false;
}

// Main navigation loop
let attempts = 0;
while (attempts < 40) {
  if (explore()) {
    attempts = attempts + 1;
  } else {
    turnRight();
    turnRight();
    moveForward();
  }
}`,
      tip: "💡 Create functions that return true/false! This helps you track whether your moves are successful.",
      maxMoves: 55,
      concepts: ['functions', 'while-loops', 'if-else', 'variables']
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
    }
  };

  const runCode = () => {
    try {
      const code = userCode || levelData[currentLevel - 1].startingCode;
      
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
          <Link to="/junior-computers" className="back-button">
            ← Back to Activities
          </Link>
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
            <div className="code-actions">
              <button onClick={() => setUserCode(currentLevelData.startingCode)} className="reset-btn">
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

          <textarea
            value={userCode || currentLevelData.startingCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="code-editor-maze"
            placeholder="Write your code here..."
            spellCheck={false}
          />

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

export default FinalRoundMaze;

