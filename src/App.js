import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import JuniorComputers from './components/JuniorComputers';
import PlayfulProgramming from './components/PlayfulProgramming';
import VideoGameDesign from './components/VideoGameDesign';
import MouseSkillsChallenge from './components/activities/MouseSkillsChallenge';
import KeyboardAdventure from './components/activities/KeyboardAdventure';
import DigitalArtStudio from './components/activities/DigitalArtStudio';
import ScavengerHunt from './components/activities/ScavengerHunt';
import ProgrammingAdventure from './components/activities/ProgrammingAdventure';
import FinalRoundMaze from './components/activities/FinalRoundMaze';
import './App.css';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🎮</span>
          <span className="logo-text">Douglas Kids Camps</span>
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
          <Link 
            to="/junior-computers" 
            className={location.pathname === '/junior-computers' ? 'nav-link active' : 'nav-link'}
          >
            Junior Computers
          </Link>
          <Link 
            to="/playful-programming" 
            className={location.pathname === '/playful-programming' ? 'nav-link active' : 'nav-link'}
          >
            Playful Programming
          </Link>
          <Link 
            to="/video-game-design" 
            className={location.pathname === '/video-game-design' ? 'nav-link active' : 'nav-link'}
          >
            Video Game Design
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/junior-computers" element={<JuniorComputers />} />
          <Route path="/playful-programming" element={<PlayfulProgramming />} />
          <Route path="/video-game-design" element={<VideoGameDesign />} />
          <Route path="/activities/mouse-skills" element={<MouseSkillsChallenge />} />
          <Route path="/activities/keyboard-adventure" element={<KeyboardAdventure />} />
          <Route path="/activities/digital-art-studio" element={<DigitalArtStudio />} />
          <Route path="/activities/scavenger-hunt" element={<ScavengerHunt />} />
          <Route path="/activities/programming-adventure" element={<ProgrammingAdventure />} />
          <Route path="/activities/final-round-maze" element={<FinalRoundMaze />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

