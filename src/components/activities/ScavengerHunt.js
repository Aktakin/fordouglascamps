import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ScavengerHunt.css';

function ScavengerHunt() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showMystery, setShowMystery] = useState(false);
  const [mysteryRevealed, setMysteryRevealed] = useState(false);
  const [searchItems, setSearchItems] = useState([]);

  // Interesting and challenging items to search on Google
  const allSearchItems = [
    { name: "Axolotl", hint: "A rare salamander that looks like a Pokemon!", difficulty: "medium", emoji: "🦎" },
    { name: "Bioluminescent Plankton", hint: "Glowing sea creatures that light up at night!", difficulty: "hard", emoji: "✨" },
    { name: "Glass Frog", hint: "A frog you can see through!", difficulty: "medium", emoji: "🐸" },
    { name: "Rainbow Eucalyptus Tree", hint: "A tree with naturally colorful bark!", difficulty: "medium", emoji: "🌳" },
    { name: "Mantis Shrimp Eyes", hint: "The most colorful eyes in nature!", difficulty: "hard", emoji: "👀" },
    { name: "Pangolin", hint: "A scaly mammal that rolls into a ball!", difficulty: "medium", emoji: "🦔" },
    { name: "Narwhal", hint: "The unicorn of the sea!", difficulty: "easy", emoji: "🦄" },
    { name: "Blue Java Banana", hint: "A banana that tastes like ice cream!", difficulty: "hard", emoji: "🍌" },
    { name: "Jumping Spider", hint: "The cutest spider with big eyes!", difficulty: "medium", emoji: "🕷️" },
    { name: "Pink Fairy Armadillo", hint: "The smallest and cutest armadillo!", difficulty: "hard", emoji: "💗" },
    { name: "Octopus Camouflage", hint: "Watch an octopus change colors!", difficulty: "medium", emoji: "🐙" },
    { name: "Peacock Spider Dancing", hint: "A tiny spider that dances!", difficulty: "medium", emoji: "🕺" },
    { name: "Arctic Fox Winter", hint: "A fox that turns white in winter!", difficulty: "easy", emoji: "🦊" },
    { name: "Hummingbird Nest", hint: "The tiniest nest you've ever seen!", difficulty: "hard", emoji: "🪺" },
    { name: "Transparent Butterfly Wings", hint: "A butterfly with see-through wings!", difficulty: "hard", emoji: "🦋" }
  ];

  // Mystery box items (special final challenge)
  const mysteryItems = [
    { name: "Programmer Working at Night", hint: "Find someone coding in the dark!", emoji: "💻" },
    { name: "Kids Learning to Code", hint: "Find happy kids learning programming!", emoji: "👦" },
    { name: "Robot Teaching Class", hint: "Find a robot helping students!", emoji: "🤖" },
    { name: "Computer Lab Classroom", hint: "Find a classroom full of computers!", emoji: "🏫" }
  ];

  useEffect(() => {
    if (gameStarted && searchItems.length === 0) {
      // Randomly select 5 items for the hunt
      const shuffled = [...allSearchItems].sort(() => 0.5 - Math.random());
      setSearchItems(shuffled.slice(0, 5));
    }
  }, [gameStarted]);

  const handleStartGame = () => {
    setGameStarted(true);
    setCurrentItemIndex(0);
    setUploadedImages([]);
    setShowMystery(false);
    setMysteryRevealed(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          itemName: searchItems[currentItemIndex].name,
          imageUrl: reader.result,
          timestamp: new Date().toLocaleTimeString()
        };
        
        setUploadedImages([...uploadedImages, newImage]);
        
        // Move to next item or show mystery box
        if (currentItemIndex < searchItems.length - 1) {
          setCurrentItemIndex(currentItemIndex + 1);
        } else {
          setShowMystery(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMysteryImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const mysteryImage = {
          itemName: "Mystery Item",
          imageUrl: reader.result,
          timestamp: new Date().toLocaleTimeString()
        };
        setUploadedImages([...uploadedImages, mysteryImage]);
        setMysteryRevealed(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return '#4ecdc4';
      case 'medium': return '#ff9a56';
      case 'hard': return '#ff6b6b';
      default: return '#667eea';
    }
  };

  if (!gameStarted) {
    return (
      <div className="scavenger-hunt">
        <div className="hunt-header">
          <Link to="/junior-computers" className="back-btn">← Back</Link>
          <h1>🔍 Google Image Scavenger Hunt</h1>
        </div>

        <div className="welcome-screen">
          <div className="welcome-card">
            <div className="welcome-icon">🕵️‍♂️</div>
            <h2>Ready for an Adventure?</h2>
            <p className="welcome-description">
              Get ready to explore the internet! You'll search for amazing and unusual things on Google, 
              save the images, and upload them here. Can you find them all?
            </p>

            <div className="game-rules">
              <h3>📋 How to Play:</h3>
              <ol>
                <li>Read the item you need to find</li>
                <li>Search for it on <strong>Google Images</strong></li>
                <li>Right-click the image and <strong>"Save image as..."</strong></li>
                <li>Come back here and <strong>upload</strong> the image</li>
                <li>Complete all 5 items to unlock the <strong>Mystery Box</strong>! 🎁</li>
              </ol>
            </div>

            <div className="difficulty-legend">
              <h4>Difficulty Levels:</h4>
              <div className="legend-items">
                <span className="legend-item easy">🟢 Easy</span>
                <span className="legend-item medium">🟡 Medium</span>
                <span className="legend-item hard">🔴 Hard</span>
              </div>
            </div>

            <button onClick={handleStartGame} className="start-hunt-btn">
              🚀 Start Scavenger Hunt
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mysteryRevealed) {
    return (
      <div className="scavenger-hunt">
        <div className="hunt-header">
          <Link to="/junior-computers" className="back-btn">← Back</Link>
          <h1>🎉 Congratulations!</h1>
        </div>

        <div className="victory-screen">
          <div className="victory-card">
            <div className="trophy-animation">🏆</div>
            <h2>You're an Amazing Explorer!</h2>
            <p>You found all {searchItems.length + 1} items including the mystery item!</p>
            
            <div className="final-gallery">
              <h3>Your Collection:</h3>
              <div className="gallery-grid">
                {uploadedImages.map((item, index) => (
                  <div key={index} className="gallery-item">
                    <img src={item.imageUrl} alt={item.itemName} />
                    <p>{item.itemName}</p>
                    <span className="timestamp">{item.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleStartGame} className="play-again-btn">
              🔄 Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showMystery && !mysteryRevealed) {
    const mysteryItem = mysteryItems[Math.floor(Math.random() * mysteryItems.length)];
    
    return (
      <div className="scavenger-hunt">
        <div className="hunt-header">
          <Link to="/junior-computers" className="back-btn">← Back</Link>
          <h1>🎁 Mystery Box!</h1>
        </div>

        <div className="mystery-screen">
          <div className="mystery-card">
            <div className="mystery-box-animation">
              🎁
            </div>
            <h2>You Unlocked the Mystery Box!</h2>
            <p className="mystery-intro">One final challenge awaits...</p>

            <div className="mystery-item-card">
              <div className="mystery-item-header">
                <span className="mystery-emoji">{mysteryItem.emoji}</span>
                <h3>{mysteryItem.name}</h3>
              </div>
              <p className="mystery-hint">💡 {mysteryItem.hint}</p>
            </div>

            <div className="upload-section mystery-upload">
              <h4>Upload Your Mystery Find:</h4>
              <input
                type="file"
                accept="image/*"
                onChange={handleMysteryImageUpload}
                id="mystery-upload"
                className="file-input"
              />
              <label htmlFor="mystery-upload" className="upload-btn mystery">
                📤 Upload Mystery Image
              </label>
            </div>

            <div className="progress-summary">
              <p>Items Found: {uploadedImages.length} / {searchItems.length + 1}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentItem = searchItems[currentItemIndex];

  // Wait for items to load
  if (!currentItem) {
    return (
      <div className="scavenger-hunt">
        <div className="hunt-header">
          <Link to="/junior-computers" className="back-btn">← Back</Link>
          <h1>🔍 Google Image Scavenger Hunt</h1>
        </div>
        <div className="hunt-container">
          <div className="current-item-card">
            <p>Loading items...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scavenger-hunt">
      <div className="hunt-header">
        <Link to="/junior-computers" className="back-btn">← Back</Link>
        <h1>🔍 Google Image Scavenger Hunt</h1>
      </div>

      <div className="hunt-container">
        <div className="progress-bar-hunt">
          <div className="progress-fill-hunt" style={{ width: `${(uploadedImages.length / searchItems.length) * 100}%` }}></div>
          <span className="progress-text-hunt">{uploadedImages.length} / {searchItems.length} Items Found</span>
        </div>

        <div className="current-item-card">
          <div className="item-badge" style={{ background: getDifficultyColor(currentItem.difficulty) }}>
            Item {currentItemIndex + 1} of {searchItems.length}
          </div>
          
          <div className="item-emoji">{currentItem.emoji}</div>
          <h2 className="item-name">{currentItem.name}</h2>
          <p className="item-hint">💡 {currentItem.hint}</p>
          <p className="difficulty-tag" style={{ color: getDifficultyColor(currentItem.difficulty) }}>
            {currentItem.difficulty.toUpperCase()}
          </p>

          <div className="search-instructions">
            <h3>🔎 How to Find:</h3>
            <ol>
              <li>Open Google Images in a new tab</li>
              <li>Search for: <strong>"{currentItem.name}"</strong></li>
              <li>Right-click on an image</li>
              <li>Click "Save image as..."</li>
              <li>Come back and upload it below!</li>
            </ol>
          </div>

          <div className="upload-section">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              className="file-input"
            />
            <label htmlFor="image-upload" className="upload-btn">
              📤 Upload Image
            </label>
          </div>
        </div>

        {uploadedImages.length > 0 && (
          <div className="found-items-section">
            <h3>✅ Items You've Found:</h3>
            <div className="found-items-grid">
              {uploadedImages.map((item, index) => (
                <div key={index} className="found-item">
                  <img src={item.imageUrl} alt={item.itemName} />
                  <p>{item.itemName}</p>
                  <span className="check-mark">✓</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScavengerHunt;
