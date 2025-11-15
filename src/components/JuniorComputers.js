import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './JuniorComputers.css';

function FinalRound() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "What is the most used button on a mouse?",
      options: ["Left Button", "Right Button", "Scroll Wheel", "Middle Button"],
      correct: 0,
      explanation: "The left button is used most often for clicking, selecting, and opening things!"
    },
    {
      question: "What does the scroll wheel on a mouse do?",
      options: ["Click things", "Scroll up and down", "Right-click", "Turn the computer on"],
      correct: 1,
      explanation: "The scroll wheel lets you move up and down on web pages and documents!"
    },
    {
      question: "Which row on the keyboard is called the 'home row'?",
      options: ["QWERTY", "ASDF JKL;", "ZXCV", "123456"],
      correct: 1,
      explanation: "ASDF JKL; is the home row where your fingers should rest when typing!"
    },
    {
      question: "What key do you press to make letters UPPERCASE?",
      options: ["Enter", "Tab", "Shift", "Space"],
      correct: 2,
      explanation: "Hold Shift and type a letter to make it uppercase!"
    },
    {
      question: "What part of the computer shows everything on the screen?",
      options: ["Keyboard", "Mouse", "Monitor", "CPU"],
      correct: 2,
      explanation: "The monitor (screen) displays everything you see on the computer!"
    },
    {
      question: "What do you call holding down the left mouse button and moving the mouse?",
      options: ["Clicking", "Dragging", "Scrolling", "Typing"],
      correct: 1,
      explanation: "Dragging means holding the button down and moving items around!"
    },
    {
      question: "What does WPM stand for in typing?",
      options: ["Words Per Minute", "Words Per Month", "Wheels Per Minute", "Windows Per Mouse"],
      correct: 0,
      explanation: "WPM means Words Per Minute - it measures how fast you can type!"
    },
    {
      question: "Which tool in Digital Art Studio lets you erase mistakes?",
      options: ["Brush", "Fill", "Eraser", "Color Picker"],
      correct: 2,
      explanation: "The eraser tool helps you fix mistakes by removing what you drew!"
    },
    {
      question: "What happens when you right-click on something?",
      options: ["It opens", "A menu appears", "It deletes", "Nothing"],
      correct: 1,
      explanation: "Right-clicking shows a special menu with extra options!"
    },
    {
      question: "What is the brain of the computer called?",
      options: ["Monitor", "Keyboard", "CPU", "Mouse"],
      correct: 2,
      explanation: "The CPU (Central Processing Unit) is like the brain - it makes everything work!"
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }, 2000);
    } else {
      setQuizComplete(true);
    }
    
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="final-round-results">
        <div className="results-content-final">
          <h3>🎉 Quiz Complete!</h3>
          <div className="score-display">
            <p className="score-text">You got {score} out of {questions.length} correct!</p>
            <div className="score-percentage">{percentage}%</div>
          </div>
          {percentage >= 80 && (
            <div className="excellent-result">
              <p>🌟 Excellent! You're a computer expert!</p>
            </div>
          )}
          {percentage >= 60 && percentage < 80 && (
            <div className="good-result">
              <p>👍 Great job! You know a lot about computers!</p>
            </div>
          )}
          {percentage < 60 && (
            <div className="encourage-result">
              <p>💪 Keep practicing! You're learning every day!</p>
            </div>
          )}
          <button onClick={resetQuiz} className="retry-quiz-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="final-round-quiz">
      <div className="quiz-header">
        <div className="quiz-progress">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="progress-bar-quiz">
            <div 
              className="progress-fill-quiz"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="quiz-score">
          Score: {score} / {questions.length}
        </div>
      </div>

      <div className="question-container">
        <h3 className="question-text">{currentQ.question}</h3>
        <div className="options-grid">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${selectedAnswer === index ? 'selected' : ''} ${
                showResult 
                  ? (index === currentQ.correct ? 'correct' : selectedAnswer === index && index !== currentQ.correct ? 'incorrect' : '')
                  : ''
              }`}
              onClick={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
            >
              {option}
              {showResult && index === currentQ.correct && (
                <span className="check-mark-option">✓</span>
              )}
              {showResult && selectedAnswer === index && index !== currentQ.correct && (
                <span className="x-mark-option">✗</span>
              )}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`explanation-box ${selectedAnswer === currentQ.correct ? 'correct-explanation' : 'incorrect-explanation'}`}>
            <p>
              {selectedAnswer === currentQ.correct ? '🎉 Correct! ' : '❌ Not quite. '}
              {currentQ.explanation}
            </p>
          </div>
        )}

        {!showResult && selectedAnswer !== null && (
          <button onClick={handleSubmit} className="submit-answer-btn">
            Submit Answer
          </button>
        )}
      </div>
    </div>
  );
}

function JuniorComputers() {

  return (
    <div className="junior-computers">
      <div className="page-header">
        <h1>🖥️ Junior Computers</h1>
        <p className="page-subtitle">Ages 6-9 • Fun with Computers!</p>
      </div>

      <div className="activities-container">
        <Link to="/activities/mouse-skills" className="activity-card-link">
          <div className="activity-card">
            <h2>🎯 Mouse Skills Challenge</h2>
            <p>Learn left click, right click, and mouse movement! Test your skills with fun challenges.</p>
            <div className="activity-preview">
              <div className="preview-icon">🖱️</div>
              <p className="preview-text">Click to start the full challenge!</p>
            </div>
            <div className="card-arrow">→</div>
          </div>
        </Link>

        <Link to="/activities/keyboard-adventure" className="activity-card-link">
          <div className="activity-card">
            <h2>⌨️ Keyboard Adventure</h2>
            <p>Master typing with 10 exciting levels! Test your speed and accuracy.</p>
            <div className="activity-preview">
              <div className="preview-icon">⌨️</div>
              <p className="preview-text">Click to start the typing adventure!</p>
            </div>
            <div className="card-arrow">→</div>
          </div>
        </Link>

        <Link to="/activities/digital-art-studio" className="activity-card-link">
          <div className="activity-card">
            <h2>🎨 Digital Art Studio</h2>
            <p>Create amazing art with 10 fun challenges! Draw, color, and express your creativity!</p>
            <div className="activity-preview">
              <div className="preview-icon">🎨</div>
              <p className="preview-text">Click to start creating art!</p>
            </div>
            <div className="card-arrow">→</div>
          </div>
        </Link>

        <Link to="/activities/scavenger-hunt" className="activity-card-link">
          <div className="activity-card">
            <h2>🔍 Scavenger Hunt</h2>
            <p>Find hidden tech items in 10 exciting levels! Test your observation skills!</p>
            <div className="activity-preview">
              <div className="preview-icon">🔍</div>
              <p className="preview-text">Click to start the hunt!</p>
            </div>
            <div className="card-arrow">→</div>
          </div>
        </Link>


        <div className="activity-card">
          <h2>🎯 Final Round</h2>
          <p>Test what you've learned! Answer questions about computers, mouse skills, and keyboard!</p>
          <FinalRound />
        </div>
      </div>
    </div>
  );
}

export default JuniorComputers;

