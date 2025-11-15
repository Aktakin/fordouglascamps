import React, { useState } from 'react';
import './PlayfulProgramming.css';

function PlayfulProgramming() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [animationActive, setAnimationActive] = useState(false);
  const [storyParts, setStoryParts] = useState([]);
  const [currentProject, setCurrentProject] = useState('turtle');

  const runCode = () => {
    const lines = code.split('\n');
    let result = '';
    
    lines.forEach((line) => {
      const trimmed = line.trim().toLowerCase();
      if (trimmed.startsWith('print(') || trimmed.startsWith('say(')) {
        const text = trimmed.match(/['"](.*?)['"]/)?.[1] || 'Hello!';
        result += text + '\n';
      } else if (trimmed.includes('hello')) {
        result += '👋 Hello, Programmer!\n';
      } else if (trimmed.includes('name')) {
        result += 'My name is CodeBot! 🤖\n';
      } else if (trimmed.includes('age')) {
        result += 'I am 1 year old in computer years! 🎂\n';
      }
    });
    
    setOutput(result || 'Try typing: print("Hello World!")');
  };

  const startAnimation = () => {
    setAnimationActive(true);
    setTimeout(() => setAnimationActive(false), 3000);
  };

  const addStoryPart = (part) => {
    setStoryParts([...storyParts, part]);
  };

  const clearStory = () => {
    setStoryParts([]);
  };

  return (
    <div className="playful-programming">
      <div className="page-header">
        <h1>💡 Playful Programming</h1>
        <p className="page-subtitle">Ages 9-13 • Code Your First Programs!</p>
      </div>

      <div className="activities-container">
        <div className="activity-card">
          <h2>🐍 Python Playground</h2>
          <p>Write your first Python code! Try simple commands and see what happens.</p>
          <div className="code-editor">
            <div className="editor-header">
              <span>📝 Code Editor</span>
              <button onClick={runCode} className="run-btn">▶️ Run Code</button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Try typing:&#10;print('Hello World!')&#10;print('I love coding!')"
              className="code-input"
            />
            <div className="code-output">
              <div className="output-header">📺 Output</div>
              <pre className="output-text">{output || 'Your output will appear here...'}</pre>
            </div>
            <div className="code-hints">
              <h4>💡 Try These Commands:</h4>
              <div className="hint-buttons">
                <button onClick={() => setCode('print("Hello World!")')} className="hint-btn">
                  Hello World
                </button>
                <button onClick={() => setCode('print("I am a programmer!")')} className="hint-btn">
                  I am a programmer
                </button>
                <button onClick={() => setCode('print("Coding is fun!")')} className="hint-btn">
                  Coding is fun
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h2>🎭 Animation Studio</h2>
          <p>Create cool animations with code! Watch your characters come to life.</p>
          <div className="animation-studio">
            <div className="animation-canvas">
              <div className={`animated-emoji ${animationActive ? 'active' : ''}`}>
                {animationActive ? '🚀' : '⭐'}
              </div>
              {animationActive && (
                <>
                  <div className="sparkle sparkle-1">✨</div>
                  <div className="sparkle sparkle-2">✨</div>
                  <div className="sparkle sparkle-3">✨</div>
                </>
              )}
            </div>
            <div className="animation-controls">
              <button onClick={startAnimation} className="animate-btn">
                🎬 Start Animation
              </button>
              <div className="animation-code">
                <pre>{`function animate() {
  moveUp();
  addSparkles();
  celebrate();
}`}</pre>
              </div>
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h2>📚 Interactive Story Creator</h2>
          <p>Build your own story by choosing what happens next! Create amazing adventures.</p>
          <div className="story-creator">
            <div className="story-display">
              {storyParts.length === 0 ? (
                <div className="story-start">
                  <p>Once upon a time...</p>
                  <p>Choose how your story begins!</p>
                </div>
              ) : (
                <div className="story-content">
                  {storyParts.map((part, index) => (
                    <p key={index} className="story-part">{part}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="story-choices">
              <h4>Add to Your Story:</h4>
              <div className="choice-buttons">
                <button onClick={() => addStoryPart('...there was a brave programmer who loved coding!')} className="choice-btn">
                  🦸 Brave Programmer
                </button>
                <button onClick={() => addStoryPart('...they discovered a magical computer that could do anything!')} className="choice-btn">
                  🪄 Magical Computer
                </button>
                <button onClick={() => addStoryPart('...they built an amazing robot friend!')} className="choice-btn">
                  🤖 Robot Friend
                </button>
                <button onClick={() => addStoryPart('...they created the coolest video game ever!')} className="choice-btn">
                  🎮 Cool Game
                </button>
                <button onClick={() => addStoryPart('...they saved the day with their coding skills!')} className="choice-btn">
                  🏆 Save the Day
                </button>
                <button onClick={() => addStoryPart('...and they lived happily ever after! THE END 🎉')} className="choice-btn">
                  🎉 The End
                </button>
              </div>
              <button onClick={clearStory} className="clear-btn">
                🗑️ Clear Story
              </button>
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h2>🎨 Turtle Graphics</h2>
          <p>Draw shapes and patterns using code! The turtle follows your commands.</p>
          <div className="turtle-graphics">
            <div className="project-selector">
              <button 
                className={currentProject === 'turtle' ? 'project-btn active' : 'project-btn'}
                onClick={() => setCurrentProject('turtle')}
              >
                🐢 Turtle
              </button>
              <button 
                className={currentProject === 'spiral' ? 'project-btn active' : 'project-btn'}
                onClick={() => setCurrentProject('spiral')}
              >
                🌀 Spiral
              </button>
              <button 
                className={currentProject === 'star' ? 'project-btn active' : 'project-btn'}
                onClick={() => setCurrentProject('star')}
              >
                ⭐ Star
              </button>
            </div>
            <TurtleCanvas project={currentProject} />
            <div className="turtle-code">
              <pre>{getTurtleCode(currentProject)}</pre>
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h2>🎪 Variable Explorer</h2>
          <p>Learn about variables! They store information like boxes with labels.</p>
          <div className="variable-explorer">
            <VariableDemo name="myName" value="CodeMaster" type="text" />
            <VariableDemo name="myAge" value="10" type="number" />
            <VariableDemo name="isHappy" value="true" type="boolean" />
            <VariableDemo name="myColors" value="['red', 'blue', 'green']" type="array" />
          </div>
          <div className="variable-explanation">
            <p>💡 Variables are like labeled boxes that store information!</p>
            <p>You can change what's inside them anytime.</p>
          </div>
        </div>

        <div className="activity-card">
          <h2>🔢 Calculator Builder</h2>
          <p>Build your own calculator! Practice math operations with code.</p>
          <Calculator />
        </div>

        <div className="activity-card">
          <h2>🌟 Programming Certificate</h2>
          <p>Congratulations! You've learned the basics of programming!</p>
          <div className="certificate">
            <div className="certificate-content">
              <h3>🏆 Certificate of Programming</h3>
              <p className="certificate-text">
                This certifies that you have completed the<br />
                <strong>Playful Programming</strong> course<br />
                and are now a certified junior programmer!
              </p>
              <div className="certificate-stamp">⭐</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TurtleCanvas({ project }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    if (project === 'turtle') {
      // Draw a simple square
      ctx.moveTo(50, 50);
      ctx.lineTo(150, 50);
      ctx.lineTo(150, 150);
      ctx.lineTo(50, 150);
      ctx.closePath();
      ctx.stroke();
    } else if (project === 'spiral') {
      // Draw a spiral
      let x = 150, y = 150;
      ctx.moveTo(x, y);
      for (let i = 0; i < 20; i++) {
        const angle = i * 0.5;
        const radius = i * 5;
        x = 150 + Math.cos(angle) * radius;
        y = 150 + Math.sin(angle) * radius;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    } else if (project === 'star') {
      // Draw a star
      const centerX = 150, centerY = 150, radius = 80;
      ctx.moveTo(centerX, centerY - radius);
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }, [project]);

  return (
    <div className="turtle-canvas-container">
      <canvas ref={canvasRef} width="300" height="300" className="turtle-canvas" />
    </div>
  );
}

function getTurtleCode(project) {
  const codes = {
    turtle: `import turtle
t = turtle.Turtle()
for i in range(4):
    t.forward(100)
    t.right(90)`,
    spiral: `import turtle
t = turtle.Turtle()
for i in range(20):
    t.forward(i * 5)
    t.right(18)`,
    star: `import turtle
t = turtle.Turtle()
for i in range(5):
    t.forward(100)
    t.right(144)`
  };
  return codes[project] || codes.turtle;
}

function VariableDemo({ name, value, type }) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="variable-card">
      <div className="variable-header">
        <span className="variable-name">{name}</span>
        <span className="variable-type">{type}</span>
      </div>
      <div className="variable-value-container">
        {isEditing ? (
          <input
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
            className="variable-input"
            autoFocus
          />
        ) : (
          <div className="variable-value" onClick={() => setIsEditing(true)}>
            {currentValue}
          </div>
        )}
      </div>
    </div>
  );
}

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleNumber = (num) => {
    if (display === '0') {
      setDisplay(num.toString());
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperation = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      let result;
      const current = parseFloat(display);
      switch (operation) {
        case '+':
          result = previousValue + current;
          break;
        case '-':
          result = previousValue - current;
          break;
        case '*':
          result = previousValue * current;
          break;
        case '/':
          result = previousValue / current;
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
  };

  return (
    <div className="calculator">
      <div className="calc-display">{display}</div>
      <div className="calc-buttons">
        <button onClick={handleClear} className="calc-btn clear">C</button>
        <button onClick={() => handleOperation('/')} className="calc-btn op">÷</button>
        <button onClick={() => handleOperation('*')} className="calc-btn op">×</button>
        <button onClick={() => handleOperation('-')} className="calc-btn op">-</button>
        
        <button onClick={() => handleNumber(7)} className="calc-btn">7</button>
        <button onClick={() => handleNumber(8)} className="calc-btn">8</button>
        <button onClick={() => handleNumber(9)} className="calc-btn">9</button>
        <button onClick={() => handleOperation('+')} className="calc-btn op">+</button>
        
        <button onClick={() => handleNumber(4)} className="calc-btn">4</button>
        <button onClick={() => handleNumber(5)} className="calc-btn">5</button>
        <button onClick={() => handleNumber(6)} className="calc-btn">6</button>
        <button onClick={handleEquals} className="calc-btn equals">=</button>
        
        <button onClick={() => handleNumber(1)} className="calc-btn">1</button>
        <button onClick={() => handleNumber(2)} className="calc-btn">2</button>
        <button onClick={() => handleNumber(3)} className="calc-btn">3</button>
        <button onClick={() => handleNumber(0)} className="calc-btn zero">0</button>
      </div>
    </div>
  );
}

export default PlayfulProgramming;

