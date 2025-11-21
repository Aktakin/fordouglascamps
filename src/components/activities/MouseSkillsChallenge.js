import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MouseSkillsChallenge.css';
import { completeLevel as markLevelComplete } from '../../utils/levelProgress';

function MouseSkillsChallenge() {
  const navigate = useNavigate();
  const [currentTest, setCurrentTest] = useState('intro'); // intro, leftClick, rightClick, movement, scrollWheel, dragDrop
  const [leftClickScore, setLeftClickScore] = useState(0);
  const [rightClickScore, setRightClickScore] = useState(0);
  const [movementDistance, setMovementDistance] = useState(0);
  const [movementScore, setMovementScore] = useState(0);
  const [showTip, setShowTip] = useState(null);
  const [currentFact, setCurrentFact] = useState(null);
  const [usedFacts, setUsedFacts] = useState([]);
  const [carPosition, setCarPosition] = useState(0);
  const [raceDistance, setRaceDistance] = useState(0);
  const [raceTime, setRaceTime] = useState(0);
  const [raceActive, setRaceActive] = useState(false);
  const [dragItems, setDragItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropZones, setDropZones] = useState([]);
  const [dragScore, setDragScore] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [matchedItems, setMatchedItems] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelComplete, setLevelComplete] = useState(false);
  const [targets, setTargets] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [currentZone, setCurrentZone] = useState(null);
  const [isInZone, setIsInZone] = useState(false);
  const [zoneTimer, setZoneTimer] = useState(5);
  const [timeInZone, setTimeInZone] = useState(0);
  const [timeOutside, setTimeOutside] = useState(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const movementAreaRef = useRef(null);
  const zoneIntervalRef = useRef(null);
  const scoreIntervalRef = useRef(null);
  const isInZoneRef = useRef(false);
  const raceTrackRef = useRef(null);

  const mouseTips = {
    leftButton: {
      title: "Left Mouse Button",
      icon: "🖱️",
      description: "The left button is the most used button! Click it to select items, open programs, and interact with things on your screen.",
      funFact: "Most people click the left button millions of times in their life!"
    },
    rightButton: {
      title: "Right Mouse Button",
      icon: "🖱️",
      description: "The right button shows you special menus with extra options! Right-click to see what you can do with files, folders, and more.",
      funFact: "Right-clicking is like asking 'What can I do with this?'"
    },
    scrollWheel: {
      title: "Scroll Wheel",
      icon: "⚙️",
      description: "The wheel in the middle lets you scroll up and down on web pages and documents. Roll it to move through long pages!",
      funFact: "You can also click the scroll wheel like a button!"
    },
    mouseBody: {
      title: "Mouse Body",
      icon: "🖱️",
      description: "The main body of the mouse fits in your hand. Move it around on your mousepad to move the cursor on your screen!",
      funFact: "The first computer mouse was made of wood!"
    }
  };

  const computerFacts = [
    {
      icon: "🖥️",
      fact: "The first computer was so big it filled an entire room! Today, computers can fit in your pocket!",
      fun: "Imagine a computer as big as your bedroom!"
    },
    {
      icon: "🐭",
      fact: "The first computer mouse was made of wood in 1964! It had only one button and was called a 'mouse' because of its tail-like cord.",
      fun: "It looked nothing like the mice we use today!"
    },
    {
      icon: "🌐",
      fact: "The internet is like a huge library that connects computers all around the world! You can talk to people on the other side of the planet!",
      fun: "There are billions of websites on the internet!"
    },
    {
      icon: "⌨️",
      fact: "The QWERTY keyboard layout was designed in 1873 for typewriters! It's still used today because people got used to it.",
      fun: "The name 'QWERTY' comes from the first 6 letters on the top row!"
    },
    {
      icon: "💾",
      fact: "A single USB stick can hold more information than a whole library of books! Technology is amazing!",
      fun: "Some USB sticks can store over 1 million photos!"
    },
    {
      icon: "🎮",
      fact: "The first video game was created in 1958 and was called 'Tennis for Two'! It was played on a huge computer screen.",
      fun: "It was so simple, but people loved it!"
    },
    {
      icon: "📱",
      fact: "Your smartphone is more powerful than the computers that sent humans to the moon! Technology has come a long way!",
      fun: "The Apollo 11 computer had less power than a calculator!"
    },
    {
      icon: "🤖",
      fact: "Robots use computers to think and move! Some robots can even learn new things by themselves!",
      fun: "There are robots on Mars right now, controlled by computers on Earth!"
    },
    {
      icon: "☁️",
      fact: "Cloud computing means your files are stored on computers far away, but you can access them from anywhere!",
      fun: "It's like having a magic backpack that you can reach into from anywhere!"
    },
    {
      icon: "🔒",
      fact: "Passwords protect your computer like a secret code! Always use strong passwords that are hard to guess.",
      fun: "Some passwords are so strong, it would take computers millions of years to guess them!"
    },
    {
      icon: "💡",
      fact: "Computers use electricity to think! When you press a key, electricity flows through tiny pathways called circuits.",
      fun: "Your computer makes millions of calculations every second!"
    },
    {
      icon: "🎨",
      fact: "You can create amazing art, music, and videos using computers! Many movies use computers to create special effects.",
      fun: "Some animated movies take years to make because computers need to create every single frame!"
    },
    {
      icon: "🚀",
      fact: "Computers help scientists explore space! They control rockets, analyze stars, and help us learn about the universe.",
      fun: "The James Webb Space Telescope uses computers to take pictures of stars billions of light-years away!"
    },
    {
      icon: "🏥",
      fact: "Computers help doctors save lives! They can see inside your body, help diagnose illnesses, and even assist in surgeries.",
      fun: "Some robots can help doctors perform surgery with super precision!"
    },
    {
      icon: "🌍",
      fact: "Computers help us understand climate change! They analyze weather patterns and help scientists predict the future.",
      fun: "Supercomputers can simulate the entire Earth's climate!"
    },
    {
      icon: "🎵",
      fact: "You can make music with computers! Many songs you hear on the radio were created using computer programs.",
      fun: "Some musicians create entire orchestras using just a computer!"
    },
    {
      icon: "📚",
      fact: "E-books are books stored on computers! You can carry thousands of books in one small device.",
      fun: "You could read a different book every day for years and never run out!"
    },
    {
      icon: "🛸",
      fact: "Computers help us search for aliens! Scientists use computers to analyze signals from space.",
      fun: "SETI (Search for Extraterrestrial Intelligence) uses computers to listen to the universe!"
    },
    {
      icon: "🎬",
      fact: "Video games are made entirely with computers! Game designers use special programs to create characters and worlds.",
      fun: "Some video games have more code than the software that runs space shuttles!"
    },
    {
      icon: "🧠",
      fact: "Artificial Intelligence (AI) is when computers learn to think like humans! Some AIs can recognize faces, play games, and even create art!",
      fun: "AI can learn to play video games better than humans!"
    },
    {
      icon: "🔋",
      fact: "Laptops have batteries so you can use them anywhere! The first laptops were very heavy, but now they're super light!",
      fun: "Some laptops can run for over 20 hours on a single charge!"
    },
    {
      icon: "📸",
      fact: "Digital cameras use computers to take pictures! Instead of film, they store photos as digital files.",
      fun: "You can take thousands of photos and delete the ones you don't like - no waste!"
    },
    {
      icon: "🎯",
      fact: "GPS uses computers and satellites to tell you exactly where you are on Earth! It's like having a map that always knows where you are.",
      fun: "GPS can find your location anywhere on Earth, even in the middle of the ocean!"
    },
    {
      icon: "🏠",
      fact: "Smart homes use computers to control lights, temperature, and even your door! You can control your house with your phone!",
      fun: "Some people can turn on their lights from the other side of the world!"
    },
    {
      icon: "🌱",
      fact: "Computers help farmers grow better crops! They can monitor soil, water plants, and even drive tractors automatically.",
      fun: "Some farms use drones controlled by computers to check on crops from the sky!"
    }
  ];

  useEffect(() => {
    if (currentTest === 'leftClick' && gameActive) {
      generateTargets();
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentTest, gameActive]);

  useEffect(() => {
    if (currentTest === 'scrollWheel' && raceActive) {
      const timer = setInterval(() => {
        setRaceTime(prev => prev + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [currentTest, raceActive]);

  useEffect(() => {
    if (currentTest === 'scrollWheel') {
      // Prevent page scrolling when in scroll wheel challenge
      const handleWheel = (e) => {
        // Check if the event is on the race track - if so, let React handle it
        // Otherwise prevent default to stop page scrolling
        if (raceTrackRef.current && raceTrackRef.current.contains(e.target)) {
          // Let the race track's onWheel handler process it
          // But still prevent page scroll
          e.preventDefault();
        } else {
          // Prevent scrolling anywhere else on the page
          e.preventDefault();
          e.stopPropagation();
        }
      };
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
          resetTest();
        }
      };

      // Prevent scroll on the entire document
      document.body.style.overflow = 'hidden';
      document.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentTest]);

  useEffect(() => {
    if (currentTest === 'dragDrop' && draggedItem) {
      const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };
      const handleMouseUp = () => {
        setDraggedItem(null);
      };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [currentTest, draggedItem]);

  const generateNewZone = () => {
    if (!movementAreaRef.current) return null;
    
    const area = movementAreaRef.current;
    const rect = area.getBoundingClientRect();
    const areaWidth = rect.width;
    const areaHeight = rect.height;
    
    // Create a random zone (circle or rectangle)
    const zoneSize = Math.min(areaWidth, areaHeight) * 0.3; // 30% of smaller dimension
    const x = Math.random() * (areaWidth - zoneSize);
    const y = Math.random() * (areaHeight - zoneSize);
    
    return {
      id: Date.now(),
      x: x,
      y: y,
      width: zoneSize,
      height: zoneSize,
      type: Math.random() > 0.5 ? 'circle' : 'rectangle'
    };
  };

  const checkMouseInZone = (mouseX, mouseY, zone) => {
    if (!zone || !movementAreaRef.current) return false;
    
    const area = movementAreaRef.current;
    const rect = area.getBoundingClientRect();
    const relativeX = mouseX - rect.left;
    const relativeY = mouseY - rect.top;
    
    if (zone.type === 'circle') {
      const centerX = zone.x + zone.width / 2;
      const centerY = zone.y + zone.height / 2;
      const radius = zone.width / 2;
      const distance = Math.sqrt(
        Math.pow(relativeX - centerX, 2) + 
        Math.pow(relativeY - centerY, 2)
      );
      return distance <= radius;
    } else {
      // Rectangle
      return (
        relativeX >= zone.x &&
        relativeX <= zone.x + zone.width &&
        relativeY >= zone.y &&
        relativeY <= zone.y + zone.height
      );
    }
  };

  useEffect(() => {
    if (currentTest === 'movement' && gameActive) {
      // Small delay to ensure ref is set
      setTimeout(() => {
        const initialZone = generateNewZone();
        if (initialZone) {
          setCurrentZone(initialZone);
        }
      }, 100);
      
      setZoneTimer(5);
      
      // Change zone every 5 seconds
      zoneIntervalRef.current = setInterval(() => {
        const newZone = generateNewZone();
        if (newZone) {
          isInZoneRef.current = false;
          setIsInZone(false);
          setCurrentZone(newZone);
          setZoneTimer(5);
        }
      }, 5000);
      
      // Update zone timer
      const timerInterval = setInterval(() => {
        setZoneTimer(prev => {
          if (prev <= 0.1) {
            return 5;
          }
          return prev - 0.1;
        });
      }, 100);
      
      // Score calculation interval (every 0.1 seconds)
      scoreIntervalRef.current = setInterval(() => {
        if (isInZoneRef.current) {
          setTimeInZone(prev => prev + 0.1);
          setMovementScore(prev => prev + 2); // +2 points per 0.1s in zone
        } else {
          setTimeOutside(prev => prev + 0.1);
          setMovementScore(prev => Math.max(0, prev - 1)); // -1 point per 0.1s outside
        }
      }, 100);
      
      const handleMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        setCurrentZone(prevZone => {
          if (prevZone) {
            const inZone = checkMouseInZone(mouseX, mouseY, prevZone);
            isInZoneRef.current = inZone;
            setIsInZone(inZone);
          }
          return prevZone;
        });
        
        // Still track distance
        if (lastPositionRef.current.x !== 0 || lastPositionRef.current.y !== 0) {
          const distance = Math.sqrt(
            Math.pow(mouseX - lastPositionRef.current.x, 2) + 
            Math.pow(mouseY - lastPositionRef.current.y, 2)
          );
          setMovementDistance(prev => prev + distance);
        }
        
        lastPositionRef.current = { x: mouseX, y: mouseY };
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (zoneIntervalRef.current) clearInterval(zoneIntervalRef.current);
        if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
        clearInterval(timerInterval);
      };
    } else {
      lastPositionRef.current = { x: 0, y: 0 };
      isInZoneRef.current = false;
      setCurrentZone(null);
      setIsInZone(false);
      setTimeInZone(0);
      setTimeOutside(0);
      setZoneTimer(5);
    }
  }, [currentTest, gameActive]);

  const generateTargets = () => {
    const newTargets = [];
    for (let i = 0; i < 5; i++) {
      newTargets.push({
        id: Date.now() + i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        clicked: false
      });
    }
    setTargets(newTargets);
  };

  const handleLeftClick = (e, targetId) => {
    if (!gameActive) return;
    e.preventDefault();
    const target = targets.find(t => t.id === targetId);
    if (target && !target.clicked) {
      setTargets(targets.map(t => 
        t.id === targetId ? { ...t, clicked: true } : t
      ));
      setLeftClickScore(leftClickScore + 10);
      setTimeout(() => {
        generateTargets();
      }, 500);
    }
  };

  const getRandomFact = () => {
    // If we've used all facts, reset the used list
    if (usedFacts.length >= computerFacts.length) {
      setUsedFacts([]);
    }
    
    // Get available facts (not yet used)
    const availableFacts = computerFacts.filter((_, index) => !usedFacts.includes(index));
    
    // If all facts have been used, use any random fact
    const factIndex = availableFacts.length > 0
      ? computerFacts.indexOf(availableFacts[Math.floor(Math.random() * availableFacts.length)])
      : Math.floor(Math.random() * computerFacts.length);
    
    // Add to used facts
    setUsedFacts([...usedFacts, factIndex]);
    
    return computerFacts[factIndex];
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setRightClickScore(rightClickScore + 10);
    
    // Show a random computer fact
    const fact = getRandomFact();
    setCurrentFact(fact);
    
    // Auto-hide after 6 seconds
    setTimeout(() => {
      setCurrentFact(null);
    }, 6000);
  };

  const startTest = (testType) => {
    setCurrentTest(testType);
    if (testType === 'leftClick') {
      setGameActive(true);
      setTimeLeft(30);
      setLeftClickScore(0);
      generateTargets();
    } else if (testType === 'rightClick') {
      setRightClickScore(0);
      setUsedFacts([]);
      setCurrentFact(null);
    } else if (testType === 'movement') {
      setMovementDistance(0);
      setMovementScore(0);
      setTimeInZone(0);
      setTimeOutside(0);
      setGameActive(true);
      lastPositionRef.current = { x: 0, y: 0 };
    } else if (testType === 'scrollWheel') {
      setCarPosition(0);
      setRaceDistance(0);
      setRaceTime(0);
      setRaceActive(true);
    } else if (testType === 'dragDrop') {
      setCurrentLevel(1);
      setDragScore(0);
      setMatchedItems([]);
      setLevelComplete(false);
      initializeDragDrop(1);
    }
  };


  const computerParts = [
    { id: 1, emoji: '🖥️', name: 'Monitor', color: '#3b88f5', targetZone: 'monitor', description: 'Shows everything on screen!' },
    { id: 2, emoji: '⌨️', name: 'Keyboard', color: '#4ecdc4', targetZone: 'keyboard', description: 'Type letters and numbers!' },
    { id: 3, emoji: '🖱️', name: 'Mouse', color: '#ffe66d', targetZone: 'mouse', description: 'Click and move things!' },
    { id: 4, emoji: '💻', name: 'Computer', color: '#ff6b6b', targetZone: 'computer', description: 'The brain of your PC!' },
    { id: 5, emoji: '🔊', name: 'Speakers', color: '#aa96da', targetZone: 'speakers', description: 'Makes sounds and music!' },
    { id: 6, emoji: '📷', name: 'Webcam', color: '#a8e6cf', targetZone: 'webcam', description: 'Takes pictures and videos!' },
    { id: 7, emoji: '📱', name: 'Tablet', color: '#ff8b94', targetZone: 'tablet', description: 'Touch screen device!' },
    { id: 8, emoji: '⌚', name: 'Smartwatch', color: '#95e1d3', targetZone: 'watch', description: 'Wearable computer!' },
    { id: 9, emoji: '🎧', name: 'Headphones', color: '#f38181', targetZone: 'headphones', description: 'Listen to audio!' },
    { id: 10, emoji: '📀', name: 'CD Drive', color: '#c7ceea', targetZone: 'cd', description: 'Reads discs!' },
  ];

  const initializeDragDrop = (level = currentLevel) => {
    // Level difficulty increases: more items, smaller zones, etc.
    const itemsPerLevel = Math.min(3 + level, 10); // Start with 3, increase up to 10
    const selectedParts = computerParts.slice(0, itemsPerLevel);
    
    // Create zones for selected parts
    const zones = selectedParts.map(part => ({
      id: part.targetZone,
      color: part.color,
      label: part.name,
      description: part.description
    }));
    
    // Create items with matching zones
    const items = selectedParts.map(part => ({
      id: part.id,
      emoji: part.emoji,
      color: part.color,
      targetZone: part.targetZone,
      name: part.name
    }));
    
    // Shuffle items for challenge
    const shuffledItems = items.sort(() => Math.random() - 0.5);
    setDragItems(shuffledItems);
    setDropZones(zones);
    setMatchedItems([]);
    setLevelComplete(false);
  };

  const resetTest = () => {
    setCurrentTest('intro');
    setGameActive(false);
    setLeftClickScore(0);
    setRightClickScore(0);
    setMovementDistance(0);
    setMovementScore(0);
    setTimeLeft(30);
    setTargets([]);
    setCurrentZone(null);
    isInZoneRef.current = false;
    setIsInZone(false);
    setTimeInZone(0);
    setTimeOutside(0);
    setZoneTimer(5);
    setCarPosition(0);
    setRaceDistance(0);
    setRaceTime(0);
    setRaceActive(false);
    setDragItems([]);
    setDropZones([]);
    setDragScore(0);
    setDraggedItem(null);
    setMatchedItems([]);
    setCurrentLevel(1);
    setLevelComplete(false);
    if (zoneIntervalRef.current) clearInterval(zoneIntervalRef.current);
    if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
  };

  return (
    <div className="mouse-skills-challenge">
      <div className="activity-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1>🎯 Mouse Skills Challenge</h1>
        <p className="activity-subtitle">Learn and practice using your mouse like a pro!</p>
      </div>

      {currentTest === 'intro' && (
        <div className="intro-screen">
          <div className="intro-content">
            <div className="intro-icon">🖱️</div>
            <h2>Welcome to Mouse Skills!</h2>
            <p>Let's learn about your mouse and practice using it. The mouse helps you control your computer!</p>
            
            <div className="test-selection">
              <div className="test-card" onClick={() => startTest('leftClick')}>
                <div className="test-icon">👆</div>
                <h3>Left Click Test</h3>
                <p>Practice clicking with your left mouse button</p>
                <div className="test-badge">Click to Start</div>
              </div>

              <div className="test-card" onClick={() => startTest('rightClick')}>
                <div className="test-icon">👉</div>
                <h3>Right Click Test</h3>
                <p>Learn about the right mouse button</p>
                <div className="test-badge">Click to Start</div>
              </div>

              <div className="test-card" onClick={() => startTest('movement')}>
                <div className="test-icon">↔️</div>
                <h3>Mouse Movement</h3>
                <p>Practice moving your mouse smoothly</p>
                <div className="test-badge">Click to Start</div>
              </div>

              <div className="test-card" onClick={() => startTest('scrollWheel')}>
                <div className="test-icon">🏎️</div>
                <h3>Scroll Wheel Race</h3>
                <p>Race a car using your scroll wheel!</p>
                <div className="test-badge">Click to Start</div>
              </div>

              <div className="test-card" onClick={() => startTest('dragDrop')}>
                <div className="test-icon">🖱️</div>
                <h3>Drag & Drop Challenge</h3>
                <p>Hold click and move items around</p>
                <div className="test-badge">Click to Start</div>
              </div>
            </div>

            <div className="mouse-parts-info">
              <h3>🖱️ Parts of a Mouse</h3>
              <div className="parts-grid">
                {Object.entries(mouseTips).map(([key, tip]) => (
                  <div 
                    key={key} 
                    className="part-card"
                    onClick={() => setShowTip(tip)}
                  >
                    <div className="part-icon">{tip.icon}</div>
                    <div className="part-name">{tip.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentTest === 'leftClick' && (
        <div className="test-screen">
          <div className="test-header">
            <h2>👆 Left Click Challenge</h2>
            <div className="test-stats">
              <div className="stat">
                <span className="stat-label">Score:</span>
                <span className="stat-value">{leftClickScore}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Time:</span>
                <span className="stat-value">{timeLeft}s</span>
              </div>
            </div>
          </div>

          <div className="tip-box">
            <p>💡 Click on the targets that appear! Use your LEFT mouse button.</p>
            <p className="tip-detail">The left button is your main button for clicking and selecting things!</p>
          </div>

          <div className="click-game-area" onClick={(e) => {
            if (targets.some(t => !t.clicked)) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              
              targets.forEach(target => {
                if (!target.clicked && 
                    Math.abs(x - target.x) < 5 && 
                    Math.abs(y - target.y) < 5) {
                  handleLeftClick(e, target.id);
                }
              });
            }
          }}>
            {targets.map(target => (
              <div
                key={target.id}
                className={`click-target ${target.clicked ? 'clicked' : ''}`}
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                }}
                onClick={(e) => handleLeftClick(e, target.id)}
              >
                {target.clicked ? '✓' : '🎯'}
              </div>
            ))}
          </div>

          {!gameActive && timeLeft === 0 && (
            <div className="game-over">
              <h3>🎉 Great Job!</h3>
              <p>Your final score: <strong>{leftClickScore}</strong> points!</p>
              <div className="game-buttons">
                <button onClick={() => startTest('leftClick')} className="retry-btn">
                  Try Again
                </button>
                <button onClick={resetTest} className="back-btn">
                  Back to Menu
                </button>
              </div>
            </div>
          )}

          <div className="did-you-know">
            <h4>💡 Did You Know?</h4>
            <p>{mouseTips.leftButton.description}</p>
            <p className="fun-fact">✨ {mouseTips.leftButton.funFact}</p>
          </div>
        </div>
      )}

      {currentTest === 'rightClick' && (
        <div className="test-screen">
          <div className="test-header">
            <h2>👉 Right Click Challenge</h2>
            <div className="test-stats">
              <div className="stat">
                <span className="stat-label">Right Clicks:</span>
                <span className="stat-value">{rightClickScore}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Facts Discovered:</span>
                <span className="stat-value">{usedFacts.length}</span>
              </div>
            </div>
          </div>

          <div className="tip-box">
            <p>💡 Right-click anywhere in the box below to discover fun computer facts!</p>
            <p className="tip-detail">Each right-click reveals a new amazing fact about computers! The more you click, the more you learn!</p>
          </div>

          <div 
            className="right-click-area"
            onContextMenu={handleRightClick}
          >
            <div className="right-click-hint">
              {rightClickScore === 0 ? (
                <p>👉 Right-click here to discover your first fact!</p>
              ) : (
                <p>Awesome! You've discovered {usedFacts.length} fact{usedFacts.length !== 1 ? 's' : ''}! Keep right-clicking for more! 🎉</p>
              )}
            </div>
            <div className="click-indicator">
              {rightClickScore > 0 && '✨'}
            </div>
          </div>

          {currentFact && (
            <div className="fact-popup">
              <div className="fact-content">
                <div className="fact-icon">{currentFact.icon}</div>
                <h3>💡 Did You Know?</h3>
                <p className="fact-text">{currentFact.fact}</p>
                <p className="fact-fun">✨ {currentFact.fun}</p>
                <div className="fact-counter">
                  Fact #{usedFacts.length} of {computerFacts.length}
                </div>
              </div>
            </div>
          )}

          <div className="did-you-know">
            <h4>🎓 Keep Learning!</h4>
            <p>Right-clicking is a super useful skill! It shows you special menus and options.</p>
            <p className="fun-fact">✨ {mouseTips.rightButton.funFact}</p>
            {usedFacts.length > 0 && (
              <p className="progress-text">
                You've learned {usedFacts.length} amazing fact{usedFacts.length !== 1 ? 's' : ''} about computers! 
                {usedFacts.length < computerFacts.length && ` Keep right-clicking to discover all ${computerFacts.length} facts!`}
                {usedFacts.length >= computerFacts.length && " 🎉 You've discovered all the facts! You're a computer expert!"}
              </p>
            )}
          </div>

          <div className="game-buttons">
            <button onClick={resetTest} className="back-btn">
              Back to Menu
            </button>
          </div>
        </div>
      )}

      {currentTest === 'movement' && (
        <div className="test-screen">
          <div className="test-header">
            <h2>↔️ Mouse Movement Challenge</h2>
            <div className="test-stats">
              <div className="stat">
                <span className="stat-label">Score:</span>
                <span className="stat-value">{Math.max(0, Math.round(movementScore))}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Next Zone:</span>
                <span className="stat-value">{Math.ceil(zoneTimer)}s</span>
              </div>
              <div className={`stat ${isInZone ? 'in-zone' : 'out-zone'}`}>
                <span className="stat-label">Status:</span>
                <span className="stat-value">{isInZone ? '✅ In Zone' : '❌ Outside'}</span>
              </div>
            </div>
          </div>

          <div className="tip-box">
            <p>💡 Move your mouse into the highlighted zones! Stay inside to earn points!</p>
            <p className="tip-detail">Zones change every 5 seconds. The longer you stay inside, the more points you get!</p>
          </div>

          <div 
            className="movement-area"
            ref={movementAreaRef}
          >
            {currentZone && (
              <div
                className={`highlight-zone ${isInZone ? 'active' : ''} ${currentZone.type}`}
                style={{
                  left: `${currentZone.x}px`,
                  top: `${currentZone.y}px`,
                  width: `${currentZone.width}px`,
                  height: `${currentZone.height}px`,
                  borderRadius: currentZone.type === 'circle' ? '50%' : '15px',
                }}
              >
                <div className="zone-indicator">
                  {isInZone ? '🎯' : '📍'}
                </div>
              </div>
            )}
            <div className="movement-instructions">
              <div className="movement-icon">🖱️</div>
              <p className="zone-instruction">
                {currentZone 
                  ? (isInZone ? 'Great! Stay in the zone! 🎉' : 'Move your mouse into the highlighted zone!')
                  : 'Get ready...'
                }
              </p>
              <div className="score-breakdown">
                <div className="breakdown-item">
                  <span>Time in Zone:</span>
                  <strong>{Math.round(timeInZone)}s</strong>
                </div>
                <div className="breakdown-item">
                  <span>Time Outside:</span>
                  <strong>{Math.round(timeOutside)}s</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="did-you-know">
            <h4>💡 Did You Know?</h4>
            <p>{mouseTips.mouseBody.description}</p>
            <p className="fun-fact">✨ {mouseTips.mouseBody.funFact}</p>
          </div>

          <div className="game-buttons">
            <button onClick={() => {
              setGameActive(false);
              setCurrentZone(null);
              setIsInZone(false);
              setTimeout(() => startTest('movement'), 100);
            }} className="reset-btn">
              Restart Challenge
            </button>
            <button onClick={resetTest} className="back-btn">
              Back to Menu
            </button>
          </div>
        </div>
      )}

      {currentTest === 'scrollWheel' && (
        <div className="test-screen">
          <div className="test-header">
            <h2>🏎️ Scroll Wheel Race</h2>
            <div className="test-stats">
              <div className="stat">
                <span className="stat-label">Distance:</span>
                <span className="stat-value">{Math.round(raceDistance)}m</span>
              </div>
              <div className="stat">
                <span className="stat-label">Time:</span>
                <span className="stat-value">{Math.round(raceTime)}s</span>
              </div>
            </div>
          </div>

          <div className="tip-box">
            <p>💡 Scroll UP to race forward, scroll DOWN to go backward!</p>
            <p className="tip-detail">Use your scroll wheel to control the car. Race as far as you can!</p>
          </div>

          <div className="esc-message">
            <div className="esc-badge">
              ⌨️ Press <strong>ESC</strong> to leave
            </div>
          </div>

          <div 
            ref={raceTrackRef}
            className="race-track"
            onWheel={(e) => {
              if (!raceActive) return;
              e.preventDefault();
              e.stopPropagation();
              const delta = e.deltaY > 0 ? -5 : 5; // Scroll down = backward, scroll up = forward
              const newPosition = Math.max(0, Math.min(100, carPosition + delta));
              setCarPosition(newPosition);
              setRaceDistance(prev => Math.max(0, prev + (delta > 0 ? delta : 0)));
            }}
          >
            <div className="race-road">
              <div className="road-lines"></div>
              <div className="road-lines"></div>
              <div className="road-lines"></div>
            </div>
            <div 
              className="race-car"
              style={{ left: `${carPosition}%` }}
            >
              🏎️
            </div>
            <div className="finish-line" style={{ left: '95%' }}>
              🏁
            </div>
          </div>

          {raceDistance >= 95 && (
            <div className="race-complete">
              <h3>🎉 Race Complete!</h3>
              <p>You finished the race in {Math.round(raceTime)} seconds!</p>
              <button onClick={() => {
                setCarPosition(0);
                setRaceDistance(0);
                setRaceTime(0);
              }} className="retry-btn">
                Race Again
              </button>
            </div>
          )}

          <div className="did-you-know">
            <h4>💡 Did You Know?</h4>
            <p>{mouseTips.scrollWheel.description}</p>
            <p className="fun-fact">✨ {mouseTips.scrollWheel.funFact}</p>
          </div>

          <div className="game-buttons">
            <button onClick={() => {
              setRaceActive(!raceActive);
            }} className={raceActive ? "reset-btn" : "play-btn"}>
              {raceActive ? '⏸️ Pause' : '▶️ Resume'}
            </button>
            <button onClick={() => {
              setCarPosition(0);
              setRaceDistance(0);
              setRaceTime(0);
              setRaceActive(true);
            }} className="retry-btn">
              🔄 Restart Race
            </button>
            <button onClick={resetTest} className="back-btn">
              Back to Menu
            </button>
          </div>
        </div>
      )}

      {currentTest === 'dragDrop' && (
        <div className="test-screen">
          <div className="test-header">
            <h2>🖱️ Drag & Drop Challenge</h2>
            <div className="test-stats">
              <div className="stat">
                <span className="stat-label">Level:</span>
                <span className="stat-value">{currentLevel}/10</span>
              </div>
              <div className="stat">
                <span className="stat-label">Score:</span>
                <span className="stat-value">{dragScore}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Remaining:</span>
                <span className="stat-value">{dragItems.length}</span>
              </div>
            </div>
          </div>

          <div className="level-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${dropZones.length > 0 ? ((dropZones.length - dragItems.length) / dropZones.length) * 100 : 0}%` 
                }}
              ></div>
            </div>
            <p className="level-text">Level {currentLevel} - Match {dropZones.length} computer parts to their zones!</p>
          </div>

          <div className="tip-box">
            <p>💡 Hold down LEFT CLICK on a computer part and drag it to its matching zone!</p>
            <p className="tip-detail">Each level gets harder with more parts to match! Complete all 10 levels!</p>
          </div>

          <div className="drag-drop-container">
            {draggedItem && (
              <div 
                className="dragged-item-follow"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  backgroundColor: draggedItem.color
                }}
              >
                <div className="item-emoji">{draggedItem.emoji}</div>
                <div className="item-name">{draggedItem.name}</div>
              </div>
            )}
            <div className="drag-items-area">
              <h3>Drag These Items:</h3>
              <div className="items-grid">
                {dragItems.map(item => (
                  <div
                    key={item.id}
                    className={`drag-item ${draggedItem?.id === item.id ? 'dragging' : ''}`}
                    style={{ backgroundColor: item.color, opacity: draggedItem?.id === item.id ? 0.5 : 1 }}
                    onMouseDown={(e) => {
                      setDraggedItem(item);
                      setMousePos({ x: e.clientX, y: e.clientY });
                      e.preventDefault();
                    }}
                    draggable={false}
                    title={item.name}
                  >
                    <div className="item-emoji">{item.emoji}</div>
                    <div className="item-name">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="drop-zones-area">
              <h3>Drop Zones:</h3>
              <div className="zones-grid">
                {dropZones.map(zone => {
                  const matchedItem = matchedItems.find(m => m.zoneId === zone.id);
                  return (
                    <div
                      key={zone.id}
                      className={`drop-zone ${draggedItem && draggedItem.targetZone === zone.id ? 'valid-drop' : ''} ${matchedItem ? 'matched' : ''}`}
                      style={{ backgroundColor: zone.color }}
                      onMouseUp={(e) => {
                        if (draggedItem && draggedItem.targetZone === zone.id) {
                          const points = 10 * currentLevel; // More points for higher levels
                          setDragScore(prev => prev + points);
                          setMatchedItems(prev => [...prev, { itemId: draggedItem.id, zoneId: zone.id, emoji: draggedItem.emoji }]);
                          const remainingItems = dragItems.filter(item => item.id !== draggedItem.id);
                          setDragItems(remainingItems);
                          setDraggedItem(null);
                          
                          // Check if level is complete
                          if (remainingItems.length === 0) {
                            setLevelComplete(true);
                            // Mark level as completed in localStorage
                            markLevelComplete('mouse-skills-challenge', currentLevel);
                            if (currentLevel < 10) {
                              setTimeout(() => {
                                const nextLevel = currentLevel + 1;
                                setCurrentLevel(nextLevel);
                                initializeDragDrop(nextLevel);
                              }, 2000);
                            }
                          }
                        } else if (draggedItem) {
                          setDraggedItem(null);
                        }
                      }}
                    >
                      {matchedItem ? (
                        <div className="matched-item">
                          <div className="matched-emoji">{matchedItem.emoji}</div>
                          <div className="matched-check">✓</div>
                        </div>
                      ) : (
                        <div className="zone-content">
                          <div className="zone-label">{zone.label}</div>
                          {zone.description && (
                            <div className="zone-description">{zone.description}</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {levelComplete && (
            <div className="level-complete-popup">
              <div className="level-complete-content">
                <h3>🎉 Level {currentLevel} Complete!</h3>
                {currentLevel < 10 ? (
                  <>
                    <p>Great job! Get ready for Level {currentLevel + 1}!</p>
                    <p className="level-hint">It's going to be harder! 💪</p>
                  </>
                ) : (
                  <>
                    <p>🏆 Congratulations! You completed all 10 levels!</p>
                    <p className="level-hint">You're a drag & drop master! 🌟</p>
                    <button onClick={() => {
                      setCurrentLevel(1);
                      setDragScore(0);
                      setMatchedItems([]);
                      initializeDragDrop(1);
                    }} className="retry-btn">
                      Play Again
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {dragItems.length === 0 && currentLevel === 10 && !levelComplete && (
            <div className="drag-complete">
              <h3>🎉 All Levels Complete!</h3>
              <p>You've mastered drag and drop! Final Score: {dragScore} points!</p>
              <button onClick={() => {
                setCurrentLevel(1);
                setDragScore(0);
                setMatchedItems([]);
                initializeDragDrop(1);
              }} className="retry-btn">
                Play Again
              </button>
            </div>
          )}

          <div className="did-you-know">
            <h4>💡 Did You Know?</h4>
            <p>Dragging and dropping is a super useful skill! You can move files, organize folders, and arrange items on your screen!</p>
            <p className="fun-fact">✨ Many apps use drag and drop to make things easier and more fun!</p>
          </div>

          <div className="game-buttons">
            <button onClick={resetTest} className="back-btn">
              Back to Menu
            </button>
          </div>
        </div>
      )}

      {showTip && (
        <div className="tip-popup" onClick={() => setShowTip(null)}>
          <div className="tip-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-tip" onClick={() => setShowTip(null)}>×</button>
            <div className="tip-icon">{showTip.icon}</div>
            <h3>{showTip.title}</h3>
            <p>{showTip.description}</p>
            <p className="tip-fun-fact">✨ {showTip.funFact}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MouseSkillsChallenge;

