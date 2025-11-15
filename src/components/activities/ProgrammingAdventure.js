import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProgrammingAdventure.css';

function ProgrammingAdventure() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);

  const topics = [
    {
      id: 'variables',
      name: 'Variables',
      icon: '📦',
      description: 'Learn to store and use data with variables!',
      color: '#ff6b6b'
    },
    {
      id: 'conditionals',
      name: 'If & Else',
      icon: '🔀',
      description: 'Make decisions in your code!',
      color: '#4ecdc4'
    },
    {
      id: 'functions',
      name: 'Functions',
      icon: '⚙️',
      description: 'Create reusable code blocks!',
      color: '#ffe66d'
    },
    {
      id: 'loops',
      name: 'Loops',
      icon: '🔄',
      description: 'Repeat actions with loops!',
      color: '#a78bfa'
    }
  ];

  if (!selectedLanguage) {
    return (
      <div className="programming-adventure">
        <div className="activity-header">
          <Link to="/playful-programming" className="back-button">
            ← Back to Playful Programming
          </Link>
          <h1>💻 Programming Adventure</h1>
          <p className="activity-subtitle">Choose your programming language!</p>
        </div>

        <div className="language-selection">
          <div className="language-cards">
            <div 
              className="language-card"
              onClick={() => setSelectedLanguage('javascript')}
            >
              <div className="language-icon">🟨</div>
              <h2>JavaScript</h2>
              <p>Learn to code with JavaScript! Perfect for web development and interactive programs.</p>
              <div className="language-features">
                <span>✨ Easy to learn</span>
                <span>🌐 Web ready</span>
                <span>🎮 Interactive</span>
              </div>
              <div className="select-language-btn">Choose JavaScript →</div>
            </div>

            <div 
              className="language-card"
              onClick={() => setSelectedLanguage('python')}
            >
              <div className="language-icon">🐍</div>
              <h2>Python</h2>
              <p>Learn Python programming! Great for beginners and used by professionals worldwide.</p>
              <div className="language-features">
                <span>📚 Beginner friendly</span>
                <span>🔬 Science & data</span>
                <span>🤖 AI & automation</span>
              </div>
              <div className="select-language-btn">Choose Python →</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentTopic) {
    return (
      <div className="programming-adventure">
        <div className="activity-header">
          <Link to="/playful-programming" className="back-button">
            ← Back to Playful Programming
          </Link>
          <h1>💻 Programming Adventure</h1>
          <p className="activity-subtitle">Learning {selectedLanguage === 'javascript' ? 'JavaScript' : 'Python'}!</p>
          <button 
            onClick={() => setSelectedLanguage(null)}
            className="change-language-btn"
          >
            Change Language
          </button>
        </div>

        <div className="topics-selection">
          <h2>Choose a Topic to Learn</h2>
          <div className="topics-grid">
            {topics.map(topic => (
              <div
                key={topic.id}
                className="topic-card"
                style={{ borderColor: topic.color }}
                onClick={() => setCurrentTopic(topic.id)}
              >
                <div className="topic-icon" style={{ color: topic.color }}>
                  {topic.icon}
                </div>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
                <div className="topic-badge">10 Levels</div>
                <div className="topic-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <TopicLearning
      language={selectedLanguage}
      topic={currentTopic}
      currentLevel={currentLevel}
      setCurrentLevel={setCurrentLevel}
      setCurrentTopic={setCurrentTopic}
    />
  );
}

function TopicLearning({ language, topic, currentLevel, setCurrentLevel, setCurrentTopic }) {
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [showConceptDemo, setShowConceptDemo] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [variables, setVariables] = useState({});
  const [showTeaching, setShowTeaching] = useState(true);

  const topicData = {
    variables: {
      name: 'Variables',
      icon: '📦',
      color: '#ff6b6b',
      levels: getVariableLevels(language)
    },
    conditionals: {
      name: 'If & Else',
      icon: '🔀',
      color: '#4ecdc4',
      levels: getConditionalLevels(language)
    },
    functions: {
      name: 'Functions',
      icon: '⚙️',
      color: '#ffe66d',
      levels: getFunctionLevels(language)
    },
    loops: {
      name: 'Loops',
      icon: '🔄',
      color: '#a78bfa',
      levels: getLoopLevels(language)
    }
  };

  const currentTopicData = topicData[topic];
  const levelData = currentTopicData.levels[currentLevel - 1];

  // Initialize code when level changes
  useEffect(() => {
    setUserCode(levelData.startingCode || '');
    setOutput('');
    setLevelComplete(false);
    setShowHint(false);
    setShowExample(false);
    setShowConceptDemo(false);
    setVariables({});
    // Show teaching screen when topic changes or level 1 is selected
    if (currentLevel === 1) {
      setShowTeaching(true);
    }
  }, [currentLevel, topic, language]);

  const extractVariables = (code) => {
    const vars = {};
    const lines = code.split('\n');
    const isJS = language === 'javascript';
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (isJS) {
        // JavaScript: let name = "value" or let name = 5
        const letMatch = trimmed.match(/let\s+(\w+)\s*=\s*(.+?)(?:;|$)/);
        if (letMatch) {
          let value = letMatch[2].trim();
          // Remove quotes if string
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          vars[letMatch[1]] = value;
        }
        // Also handle reassignment: name = "value"
        const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+?)(?:;|$)/);
        if (assignMatch && !trimmed.includes('let') && !trimmed.includes('if') && !trimmed.includes('function')) {
          let value = assignMatch[2].trim();
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          vars[assignMatch[1]] = value;
        }
      } else {
        // Python: name = "value" or name = 5
        const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+?)(?:#|$)/);
        if (assignMatch && !trimmed.startsWith('#') && !trimmed.startsWith('if') && !trimmed.startsWith('def')) {
          let value = assignMatch[2].trim();
          // Remove quotes if string
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          vars[assignMatch[1]] = value;
        }
      }
    });
    
    return vars;
  };

  const runCode = () => {
    try {
      let result = '';
      const code = userCode || levelData.startingCode || '';
      
      // Extract and display variables
      const extractedVars = extractVariables(code);
      setVariables(extractedVars);
      
      if (language === 'javascript') {
        // Capture console.log output
        const logs = [];
        const warnings = [];
        const originalLog = console.log;
        
        // Check for common mistakes before execution
        const lines = code.split('\n');
        lines.forEach((line, lineNum) => {
          const trimmed = line.trim();
          // Check for expressions without assignment (like "score + 10" without "score =")
          if (trimmed.match(/^\w+\s*[+\-*/]\s*/) && !trimmed.includes('=') && 
              !trimmed.startsWith('console') && !trimmed.startsWith('if') && 
              !trimmed.startsWith('function') && !trimmed.startsWith('return') &&
              !trimmed.startsWith('//') && !trimmed.startsWith('let') && !trimmed.startsWith('const') &&
              !trimmed.startsWith('var') && trimmed !== '') {
            const exprMatch = trimmed.match(/^(\w+)\s*([+\-*/])\s*(.+?)(?:;|$)/);
            if (exprMatch) {
              warnings.push(`Line ${lineNum + 1}: Expression "${trimmed}" doesn't assign to a variable. Did you mean "${exprMatch[1]} = ${exprMatch[1]} ${exprMatch[2]} ${exprMatch[3]}"?`);
            }
          }
          // Check for missing semicolons (optional but helpful)
          if (trimmed && !trimmed.endsWith(';') && !trimmed.endsWith('{') && 
              !trimmed.endsWith('}') && !trimmed.startsWith('//') && 
              !trimmed.startsWith('if') && !trimmed.startsWith('function') &&
              !trimmed.startsWith('else') && !trimmed.includes('console.log')) {
            // This is just informational, not an error
          }
        });
        
        // Override console.log to capture output
        console.log = (...args) => {
          const processed = args.map(arg => {
            if (typeof arg === 'string') return arg;
            if (typeof arg === 'number') return String(arg);
            if (typeof arg === 'boolean') return String(arg);
            return String(arg);
          });
          logs.push(processed.join(' '));
        };
        
        try {
          // Execute JavaScript code
          eval(code);
          
          // Combine warnings and output
          if (warnings.length > 0) {
            result = '⚠️ Warning:\n' + warnings.join('\n') + '\n\n';
          }
          
          if (logs.length > 0) {
            result += logs.join('\n');
          } else {
            result += warnings.length > 0 ? '' : 'Code executed!';
          }
        } catch (e) {
          // Provide helpful error messages
          let errorMsg = `Error: ${e.message}`;
          
          // Check for common syntax errors and provide helpful hints
          if (e.message.includes('Unexpected token')) {
            errorMsg += '\n💡 Tip: Check for missing quotes, brackets, or operators.';
          } else if (e.message.includes('is not defined')) {
            errorMsg += '\n💡 Tip: Make sure you created the variable before using it.';
          } else if (e.message.includes('Unexpected end')) {
            errorMsg += '\n💡 Tip: Check for missing closing brackets, braces, or quotes.';
          }
          
          result = errorMsg;
        } finally {
          console.log = originalLog;
        }
      } else {
        // Python-like execution simulation
        result = executePythonCode(code, levelData);
      }
      
      setOutput(result);
      checkCompletion(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const executePythonCode = (code, level) => {
    const lines = code.split('\n');
    const output = [];
    const vars = {};
    const warnings = [];
    
    // First pass: collect all variable assignments
    lines.forEach((line, lineNum) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      
      // Handle variable assignments
      if (trimmed.includes('=') && !trimmed.includes('==') && !trimmed.includes('!=') && 
          !trimmed.startsWith('if') && !trimmed.startsWith('def') && !trimmed.startsWith('elif') && 
          !trimmed.startsWith('else') && !trimmed.startsWith('return')) {
        const match = trimmed.match(/^(\w+)\s*=\s*(.+?)(?:#|$)/);
        if (match) {
          let varName = match[1];
          let value = match[2].trim();
          
          try {
            // Handle string literals
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
              vars[varName] = value.slice(1, -1);
            } 
            // Handle booleans
            else if (value === 'True' || value === 'False') {
              vars[varName] = value === 'True';
            } 
            // Handle numbers
            else if (!isNaN(value) && value.trim() !== '') {
              vars[varName] = Number(value);
            } 
            // Handle expressions
            else {
              let evalValue = value;
              // Replace variable references with their values
              Object.keys(vars).forEach(v => {
                const regex = new RegExp(`\\b${v}\\b`, 'g');
                const varValue = vars[v];
                if (typeof varValue === 'string') {
                  evalValue = evalValue.replace(regex, `"${varValue}"`);
                } else {
                  evalValue = evalValue.replace(regex, varValue);
                }
              });
              
              try {
                vars[varName] = eval(evalValue);
              } catch (e) {
                vars[varName] = value;
              }
            }
          } catch (e) {
            vars[varName] = value;
          }
        }
      }
      // Check for expressions without assignment (potential errors)
      else if (trimmed.match(/^\w+\s*[+\-*/]\s*/) && !trimmed.startsWith('print') && 
               !trimmed.startsWith('if') && !trimmed.startsWith('def') && !trimmed.startsWith('return')) {
        // This looks like an expression that's not being assigned - might be a mistake
        const exprMatch = trimmed.match(/^(\w+)\s*([+\-*/])\s*(.+)/);
        if (exprMatch) {
          warnings.push(`Line ${lineNum + 1}: Expression "${trimmed}" doesn't assign to a variable. Did you mean "${exprMatch[1]} = ${exprMatch[1]} ${exprMatch[2]} ${exprMatch[3]}"?`);
        }
      }
    });
    
    // Second pass: execute print statements and other code
    lines.forEach((line, lineNum) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      
      // Handle print statements
      if (trimmed.startsWith('print(')) {
        const match = trimmed.match(/print\((.+)\)/);
        if (match) {
          let content = match[1].trim();
          
          // Handle multiple arguments
          const args = content.split(',').map(arg => arg.trim());
          const printValues = [];
          
          args.forEach(arg => {
            // Handle string literals
            if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
              printValues.push(arg.slice(1, -1));
            } 
            // Handle booleans
            else if (arg === 'True' || arg === 'False') {
              printValues.push(arg);
            } 
            // Handle numbers
            else if (!isNaN(arg) && arg.trim() !== '') {
              printValues.push(arg);
            } 
            // Handle variables and expressions
            else {
              try {
                let evalArg = arg;
                // Replace variable references
                Object.keys(vars).forEach(v => {
                  const regex = new RegExp(`\\b${v}\\b`, 'g');
                  const varValue = vars[v];
                  if (typeof varValue === 'string') {
                    evalArg = evalArg.replace(regex, `"${varValue}"`);
                  } else {
                    evalArg = evalArg.replace(regex, varValue);
                  }
                });
                
                // Try to evaluate
                const result = eval(evalArg);
                printValues.push(String(result));
              } catch (e) {
                // If it's a variable name, try to get its value
                if (vars[arg]) {
                  printValues.push(String(vars[arg]));
                } else {
                  printValues.push(arg);
                }
              }
            }
          });
          
          output.push(printValues.join(' '));
        }
      }
      // Handle if statements
      else if (trimmed.startsWith('if ')) {
        // Extract condition
        const ifMatch = trimmed.match(/if\s+(.+?):/);
        if (ifMatch) {
          let condition = ifMatch[1].trim();
          // Replace variables in condition
          Object.keys(vars).forEach(v => {
            const regex = new RegExp(`\\b${v}\\b`, 'g');
            const varValue = vars[v];
            if (typeof varValue === 'string') {
              condition = condition.replace(regex, `"${varValue}"`);
            } else {
              condition = condition.replace(regex, varValue);
            }
          });
          
          // Replace Python operators with JavaScript equivalents
          condition = condition.replace(/\band\b/g, '&&');
          condition = condition.replace(/\bor\b/g, '||');
          condition = condition.replace(/==/g, '===');
          
          try {
            const result = eval(condition);
            // Store condition result for else handling (simplified)
            vars['__if_result__'] = result;
          } catch (e) {
            // Condition evaluation failed
          }
        }
      }
      // Handle else/elif
      else if (trimmed.startsWith('else:') || trimmed.startsWith('elif ')) {
        // Simplified handling - just note that else/elif exists
      }
      // Handle return statements
      else if (trimmed.startsWith('return ')) {
        const returnMatch = trimmed.match(/return\s+(.+)/);
        if (returnMatch) {
          let returnValue = returnMatch[1].trim();
          // Evaluate return value
          Object.keys(vars).forEach(v => {
            const regex = new RegExp(`\\b${v}\\b`, 'g');
            const varValue = vars[v];
            if (typeof varValue === 'string') {
              returnValue = returnValue.replace(regex, `"${varValue}"`);
            } else {
              returnValue = returnValue.replace(regex, varValue);
            }
          });
          try {
            const result = eval(returnValue);
            output.push(String(result));
          } catch (e) {
            output.push(returnValue);
          }
        }
      }
    });
    
    // Combine output and warnings
    let result = '';
    if (warnings.length > 0) {
      result += '⚠️ Warning:\n' + warnings.join('\n') + '\n\n';
    }
    
    if (output.length > 0) {
      result += output.join('\n');
    } else {
      result += 'Code executed!';
    }
    
    return result;
  };

  const checkCompletion = (result) => {
    const code = userCode || levelData.startingCode || '';
    if (levelData.expectedOutput && result && result.includes(levelData.expectedOutput)) {
      setLevelComplete(true);
    } else if (levelData.checkFunction && levelData.checkFunction(code, result)) {
      setLevelComplete(true);
    }
  };

  const nextLevel = () => {
    if (currentLevel < 10) {
      setCurrentLevel(currentLevel + 1);
      setUserCode('');
      setOutput('');
      setLevelComplete(false);
      setShowHint(false);
      setShowExample(false);
    }
  };

  const resetLevel = () => {
    setUserCode(levelData.startingCode || '');
    setOutput('');
    setLevelComplete(false);
    setShowHint(false);
    setShowExample(false);
  };

  // Show teaching screen first
  if (showTeaching && currentLevel === 1) {
    return (
      <TopicTeaching
        topic={topic}
        language={language}
        topicData={currentTopicData}
        onStart={() => setShowTeaching(false)}
        onBack={() => setCurrentTopic(null)}
      />
    );
  }

  return (
    <div className="programming-adventure">
      <div className="activity-header">
        <button 
          onClick={() => setCurrentTopic(null)}
          className="back-button"
        >
          ← Back to Topics
        </button>
        <h1>{currentTopicData.icon} {currentTopicData.name}</h1>
        <p className="activity-subtitle">
          Level {currentLevel} of 10 • {language === 'javascript' ? 'JavaScript' : 'Python'}
        </p>
        {currentLevel === 1 && (
          <button 
            onClick={() => setShowTeaching(true)}
            className="review-teaching-btn"
          >
            📚 Review Concept
          </button>
        )}
      </div>

      <div className="programming-container">
        <div className="programming-sidebar">
          <div className="level-info-programming">
            <div className="level-badge-programming" style={{ backgroundColor: currentTopicData.color }}>
              <h2>Level {currentLevel}</h2>
              <p>{levelData.title}</p>
            </div>
            <div className="level-description-programming">
              <p>{levelData.description}</p>
            </div>
          </div>

          <div className="instructions-box">
            <h3>🎯 What to Do</h3>
            <div className="instructions-content">
              {levelData.instructions.map((instruction, index) => (
                <div key={index} className="instruction-item">
                  <span className="instruction-number">{index + 1}</span>
                  <span>{instruction}</span>
                </div>
              ))}
            </div>
            {topic === 'variables' && (
              <div className="naming-tip">
                <strong>💡 Tip:</strong> Use simple names like "name" not "myName" - it works for everyone!
              </div>
            )}
          </div>

          <div className="hint-section">
            <button 
              onClick={() => {
                setShowHint(!showHint);
                setShowExample(!showExample);
              }}
              className="hint-toggle-btn"
            >
              {showHint ? '🙈 Hide Hint & Example' : '💡 Show Hint & Example'}
            </button>
            {showHint && levelData.hint && (
              <div className="hint-box">
                <p>{levelData.hint}</p>
              </div>
            )}
            {showExample && levelData.example && (
              <div className="example-box">
                <h3>💡 Example</h3>
                <pre className="code-example">{levelData.example}</pre>
              </div>
            )}
          </div>

          <div className="level-progress-programming">
            <h4>Progress</h4>
            <div className="levels-grid-programming">
              {Array.from({ length: 10 }, (_, i) => i + 1).map(level => (
                <div
                  key={level}
                  className={`level-dot-programming ${level === currentLevel ? 'active' : ''} ${level < currentLevel ? 'completed' : ''}`}
                  style={{ 
                    backgroundColor: level <= currentLevel ? currentTopicData.color : '#ccc'
                  }}
                  onClick={() => {
                    setCurrentLevel(level);
                    resetLevel();
                  }}
                  title={`Level ${level}`}
                >
                  {level < currentLevel ? '✓' : level === currentLevel ? currentTopicData.icon : level}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="code-editor-area">
          <div className="editor-header">
            <h3>Code Editor</h3>
            <div className="editor-actions">
              <button onClick={resetLevel} className="reset-code-btn">
                🔄 Reset
              </button>
              <button onClick={runCode} className="run-code-btn">
                ▶️ Run Code
              </button>
            </div>
          </div>

          {topic === 'variables' && Object.keys(variables).length > 0 && (
            <div className="variables-visual-area">
              <h3>📦 Your Variables</h3>
              <div className="variables-boxes">
                {Object.entries(variables).map(([varName, varValue]) => (
                  <div key={varName} className="variable-box">
                    <div className="variable-label">{varName}</div>
                    <div className="variable-value-box">
                      {varValue}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="code-editor">
            <textarea
              value={userCode || levelData.startingCode || ''}
              onChange={(e) => {
                setUserCode(e.target.value);
                // Update variables in real-time as they type
                const extractedVars = extractVariables(e.target.value);
                setVariables(extractedVars);
              }}
              className="code-input"
              placeholder="Write your code here..."
              spellCheck={false}
            />
          </div>

          <div className="output-area">
            <h3>Output</h3>
            <div className={`output-display ${output.includes('⚠️') ? 'warning' : output.includes('Error:') ? 'error' : ''}`}>
              {output || <span className="output-placeholder">Run your code to see output here...</span>}
            </div>
          </div>

          {levelComplete && (
            <div className="level-complete-programming">
              <h3>🎉 Level Complete!</h3>
              <p>{levelData.successMessage || 'Great job! You completed this level!'}</p>
              {currentLevel < 10 ? (
                <button onClick={nextLevel} className="next-level-programming-btn">
                  Continue to Level {currentLevel + 1} →
                </button>
              ) : (
                <div className="topic-complete">
                  <h4>🏆 Topic Complete!</h4>
                  <p>You've mastered {currentTopicData.name}!</p>
                  <button 
                    onClick={() => {
                      setCurrentTopic(null);
                      setCurrentLevel(1);
                    }}
                    className="back-to-topics-btn"
                  >
                    Choose Another Topic
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getVariableLevels(language) {
  const isJS = language === 'javascript';
  
  return [
    {
      level: 1,
      title: "Your First Variable",
      description: "Create a variable box to store your name!",
      instructions: [
        `Use the name "name" (not "myName" or "yourName") so it works for everyone!`,
        `Type: ${isJS ? 'let name = "Your Name";' : 'name = "Your Name"'}`
      ],
      startingCode: isJS ? 'let name = "";\nconsole.log(name);' : 'name = ""\nprint(name)',
      example: isJS ? 'let name = "Alex";\nconsole.log(name);' : 'name = "Alex"\nprint(name)',
      hint: `Use "name" as the variable name! Put your name in quotes. See the variable box appear above!`,
      expectedOutput: "",
      checkFunction: (code, output) => {
        const hasName = code.includes('name') && !code.includes('myName') && !code.includes('yourName');
        const hasValue = code.match(/name\s*=\s*["'](.+?)["']/);
        return hasName && hasValue;
      },
      successMessage: "Perfect! You created a variable box called 'name'!"
    },
    {
      level: 2,
      title: "Numbers in Variables",
      description: "Store numbers in variable boxes!",
      instructions: [
        "Create variable boxes: age and year",
        "Set age to your age, year to 2025",
        "Watch the boxes fill with numbers!"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let age = 10;\nlet year = 2025;\nconsole.log(age, year);' : 'age = 10\nyear = 2025\nprint(age, year)',
      hint: "Numbers don't need quotes! Just write the number.",
      checkFunction: (code, output) => {
        return code.includes('age') && code.includes('year') && output.includes('2025');
      },
      successMessage: "Perfect! You can store numbers too!"
    },
    {
      level: 3,
      title: "Adding Variables",
      description: "Add numbers from variable boxes!",
      instructions: [
        "Create num1 = 5 and num2 = 3",
        "Create sum = num1 + num2",
        "See the sum box calculate automatically!"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let num1 = 5;\nlet num2 = 3;\nlet sum = num1 + num2;\nconsole.log(sum);' : 'num1 = 5\nnum2 = 3\nsum = num1 + num2\nprint(sum)',
      hint: "Use the + sign to add numbers together!",
      expectedOutput: "8",
      successMessage: "Excellent! You're doing math with variables!"
    },
    {
      level: 4,
      title: "Text Concatenation",
      description: "Combine text from variable boxes!",
      instructions: [
        "Create firstName and lastName boxes",
        "Create fullName = firstName + ' ' + lastName",
        "Watch the boxes combine!"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let firstName = "Alex";\nlet lastName = "Smith";\nlet fullName = firstName + " " + lastName;\nconsole.log(fullName);' : 'firstName = "Alex"\nlastName = "Smith"\nfullName = firstName + " " + lastName\nprint(fullName)',
      hint: "Use + to combine text! Don't forget a space between names.",
      successMessage: "Great! You're combining text like a pro!"
    },
    {
      level: 5,
      title: "Changing Variables",
      description: "Update the value of a variable!",
      instructions: [
        "Create a variable called score and set it to 0",
        "Add 10 to the score",
        "Add 5 more to the score",
        "Print the final score"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let score = 0;\nscore = score + 10;\nscore = score + 5;\nconsole.log(score);' : 'score = 0\nscore = score + 10\nscore = score + 5\nprint(score)',
      hint: "You can change a variable by setting it to a new value!",
      expectedOutput: "15",
      successMessage: "Perfect! Variables can change their values!"
    },
    {
      level: 6,
      title: "Multiple Variables",
      description: "Work with many variables at once!",
      instructions: [
        "Create variables: apples = 3, bananas = 5, oranges = 2",
        "Create a variable called totalFruits that adds them all",
        "Print the total"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let apples = 3;\nlet bananas = 5;\nlet oranges = 2;\nlet totalFruits = apples + bananas + oranges;\nconsole.log(totalFruits);' : 'apples = 3\nbananas = 5\noranges = 2\ntotalFruits = apples + bananas + oranges\nprint(totalFruits)',
      hint: "Add all three variables together!",
      expectedOutput: "10",
      successMessage: "Awesome! You're managing multiple variables!"
    },
    {
      level: 7,
      title: "Variable Types",
      description: "Different types go in different boxes!",
      instructions: [
        "Create name (text), age (number), isStudent (true/false)",
        "Use 'name' not 'myName' - it works for everyone!",
        "Watch the boxes show different types!"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let name = "Sam";\nlet age = 12;\nlet isStudent = true;\nconsole.log(name, age, isStudent);' : 'name = "Sam"\nage = 12\nisStudent = True\nprint(name, age, isStudent)',
      hint: "Text needs quotes, numbers don't, and true/false are special values!",
      successMessage: "Excellent! You know about different data types!"
    },
    {
      level: 8,
      title: "Calculations with Variables",
      description: "Do math operations with variables!",
      instructions: [
        "Create price = 10 and quantity = 3",
        "Calculate total = price × quantity",
        "Calculate discount = total × 0.1 (10%)",
        "Calculate finalPrice = total - discount",
        "Print finalPrice"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let price = 10;\nlet quantity = 3;\nlet total = price * quantity;\nlet discount = total * 0.1;\nlet finalPrice = total - discount;\nconsole.log(finalPrice);' : 'price = 10\nquantity = 3\ntotal = price * quantity\ndiscount = total * 0.1\nfinalPrice = total - discount\nprint(finalPrice)',
      hint: "Use * for multiply and - for subtract!",
      expectedOutput: "27",
      successMessage: "Fantastic! You're doing complex calculations!"
    },
    {
      level: 9,
      title: "String Operations",
      description: "Manipulate text with variables!",
      instructions: [
        "Create word1 = 'Hello' and word2 = 'World'",
        "Combine them with a space in between",
        "Create a variable called greeting that adds '!' at the end",
        "Print greeting"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let word1 = "Hello";\nlet word2 = "World";\nlet greeting = word1 + " " + word2 + "!";\nconsole.log(greeting);' : 'word1 = "Hello"\nword2 = "World"\ngreeting = word1 + " " + word2 + "!"\nprint(greeting)',
      hint: "Combine text with + and add '!' at the end!",
      expectedOutput: "Hello World!",
      successMessage: "Perfect! You're a text manipulation expert!"
    },
    {
      level: 10,
      title: "Variable Master Challenge",
      description: "Use everything you've learned!",
      instructions: [
        "Create name, age, and city boxes (use simple names!)",
        "Create message = 'My name is ' + name + ', I am ' + age + ' years old, and I live in ' + city",
        "See all your boxes work together!"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let name = "Jordan";\nlet age = 11;\nlet city = "Vancouver";\nlet message = "My name is " + name + ", I am " + age + " years old, and I live in " + city;\nconsole.log(message);' : 'name = "Jordan"\nage = 11\ncity = "Vancouver"\nmessage = "My name is " + name + ", I am " + age + " years old, and I live in " + city\nprint(message)',
      hint: "Combine text and variables to create a complete sentence!",
      checkFunction: (code, output) => {
        return code.includes('name') && code.includes('age') && code.includes('city') && output.includes('My name is');
      },
      successMessage: "🎉 Congratulations! You've mastered variables!"
    }
  ];
}

function getConditionalLevels(language) {
  const isJS = language === 'javascript';
  
  return [
    {
      level: 1,
      title: "Your First If Statement",
      description: "Learn to make decisions in code!",
      instructions: [
        "Create a variable called age and set it to 12",
        `Write an if statement: ${isJS ? 'if (age >= 10)' : 'if age >= 10:'}`,
        "Inside the if, print 'You are 10 or older!'"
      ],
      startingCode: isJS ? 'let age = 12;\n// Write your if statement here' : 'age = 12\n# Write your if statement here',
      example: isJS ? 'let age = 12;\nif (age >= 10) {\n  console.log("You are 10 or older!");\n}' : 'age = 12\nif age >= 10:\n    print("You are 10 or older!")',
      hint: `Use ${isJS ? 'if (condition) { }' : 'if condition:'} to check if something is true!`,
      expectedOutput: "You are 10 or older!",
      successMessage: "Great! You wrote your first if statement!"
    },
    {
      level: 2,
      title: "If and Else",
      description: "Handle both true and false cases!",
      instructions: [
        "Create a variable called score = 8",
        "If score is 10 or more, print 'You passed!'",
        "Otherwise (else), print 'Try again!'"
      ],
      startingCode: isJS ? 'let score = 8;\n// Write your if-else here' : 'score = 8\n# Write your if-else here',
      example: isJS ? 'let score = 8;\nif (score >= 10) {\n  console.log("You passed!");\n} else {\n  console.log("Try again!");\n}' : 'score = 8\nif score >= 10:\n    print("You passed!")\nelse:\n    print("Try again!")',
      hint: "Use else to handle when the condition is false!",
      expectedOutput: "Try again!",
      successMessage: "Perfect! You're using if and else!"
    },
    {
      level: 3,
      title: "Comparing Numbers",
      description: "Use comparison operators!",
      instructions: [
        "Create num1 = 5 and num2 = 3",
        "If num1 is greater than num2, print 'First is bigger'",
        "Otherwise, print 'Second is bigger'"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let num1 = 5;\nlet num2 = 3;\nif (num1 > num2) {\n  console.log("First is bigger");\n} else {\n  console.log("Second is bigger");\n}' : 'num1 = 5\nnum2 = 3\nif num1 > num2:\n    print("First is bigger")\nelse:\n    print("Second is bigger")',
      hint: "Use > for greater than and < for less than!",
      expectedOutput: "First is bigger",
      successMessage: "Excellent! You're comparing values!"
    },
    {
      level: 4,
      title: "Checking Equality",
      description: "Check if values are equal!",
      instructions: [
        "Create password = 'secret123'",
        "If password equals 'secret123', print 'Access granted'",
        "Otherwise, print 'Access denied'"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let password = "secret123";\nif (password === "secret123") {\n  console.log("Access granted");\n} else {\n  console.log("Access denied");\n}' : 'password = "secret123"\nif password == "secret123":\n    print("Access granted")\nelse:\n    print("Access denied")',
      hint: `Use ${isJS ? '===' : '=='} to check if two values are equal!`,
      expectedOutput: "Access granted",
      successMessage: "Great! You're checking for equality!"
    },
    {
      level: 5,
      title: "Multiple Conditions",
      description: "Check multiple things at once!",
      instructions: [
        "Create age = 12",
        "If age is 10 or more AND age is less than 18, print 'You are a kid!'",
        "Otherwise, print 'You are not a kid'"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let age = 12;\nif (age >= 10 && age < 18) {\n  console.log("You are a kid!");\n} else {\n  console.log("You are not a kid");\n}' : 'age = 12\nif age >= 10 and age < 18:\n    print("You are a kid!")\nelse:\n    print("You are not a kid")',
      hint: `Use ${isJS ? '&&' : 'and'} to check if both conditions are true!`,
      expectedOutput: "You are a kid!",
      successMessage: "Perfect! You're using multiple conditions!"
    },
    {
      level: 6,
      title: "Else If",
      description: "Handle multiple cases!",
      instructions: [
        "Create grade = 85",
        "If grade is 90 or more, print 'A'",
        "Else if grade is 80 or more, print 'B'",
        "Else, print 'Keep trying!'"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let grade = 85;\nif (grade >= 90) {\n  console.log("A");\n} else if (grade >= 80) {\n  console.log("B");\n} else {\n  console.log("Keep trying!");\n}' : 'grade = 85\nif grade >= 90:\n    print("A")\nelif grade >= 80:\n    print("B")\nelse:\n    print("Keep trying!")',
      hint: `Use ${isJS ? 'else if' : 'elif'} to check another condition!`,
      expectedOutput: "B",
      successMessage: "Awesome! You're using else if!"
    },
    {
      level: 7,
      title: "Nested If Statements",
      description: "Put if statements inside other if statements!",
      instructions: [
        "Create age = 12 and hasPermission = true",
        "If age is 10 or more, check if hasPermission is true",
        "If both are true, print 'You can proceed!'",
        "Otherwise, print 'You need permission'"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let age = 12;\nlet hasPermission = true;\nif (age >= 10) {\n  if (hasPermission) {\n    console.log("You can proceed!");\n  } else {\n    console.log("You need permission");\n  }\n}' : 'age = 12\nhasPermission = True\nif age >= 10:\n    if hasPermission:\n        print("You can proceed!")\n    else:\n        print("You need permission")',
      hint: "Put one if statement inside another!",
      expectedOutput: "You can proceed!",
      successMessage: "Excellent! You're using nested if statements!"
    },
    {
      level: 8,
      title: "Complex Conditions",
      description: "Use OR to check multiple options!",
      instructions: [
        "Create day = 'Saturday'",
        "If day is 'Saturday' OR day is 'Sunday', print 'Weekend!'",
        "Otherwise, print 'Weekday'"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let day = "Saturday";\nif (day === "Saturday" || day === "Sunday") {\n  console.log("Weekend!");\n} else {\n  console.log("Weekday");\n}' : 'day = "Saturday"\nif day == "Saturday" or day == "Sunday":\n    print("Weekend!")\nelse:\n    print("Weekday")',
      hint: `Use ${isJS ? '||' : 'or'} to check if either condition is true!`,
      expectedOutput: "Weekend!",
      successMessage: "Perfect! You're using OR conditions!"
    },
    {
      level: 9,
      title: "Multiple Else If",
      description: "Handle many different cases!",
      instructions: [
        "Create temperature = 25",
        "If temp < 0, print 'Freezing'",
        "Else if temp < 15, print 'Cold'",
        "Else if temp < 25, print 'Cool'",
        "Else if temp < 35, print 'Warm'",
        "Else, print 'Hot'"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let temperature = 25;\nif (temperature < 0) {\n  console.log("Freezing");\n} else if (temperature < 15) {\n  console.log("Cold");\n} else if (temperature < 25) {\n  console.log("Cool");\n} else if (temperature < 35) {\n  console.log("Warm");\n} else {\n  console.log("Hot");\n}' : 'temperature = 25\nif temperature < 0:\n    print("Freezing")\nelif temperature < 15:\n    print("Cold")\nelif temperature < 25:\n    print("Cool")\nelif temperature < 35:\n    print("Warm")\nelse:\n    print("Hot")',
      hint: "Use multiple else if statements to check different ranges!",
      expectedOutput: "Cool",
      successMessage: "Fantastic! You're handling many cases!"
    },
    {
      level: 10,
      title: "Conditional Master Challenge",
      description: "Use everything you've learned!",
      instructions: [
        "Create age = 12, score = 85, and isMember = true",
        "If age >= 10 AND score >= 80, check if isMember is true",
        "If all true, print 'You win the prize!'",
        "Else if age >= 10 AND score >= 80, print 'Join to get prize!'",
        "Else, print 'Keep practicing!'"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let age = 12;\nlet score = 85;\nlet isMember = true;\nif (age >= 10 && score >= 80) {\n  if (isMember) {\n    console.log("You win the prize!");\n  } else {\n    console.log("Join to get prize!");\n  }\n} else {\n  console.log("Keep practicing!");\n}' : 'age = 12\nscore = 85\nisMember = True\nif age >= 10 and score >= 80:\n    if isMember:\n        print("You win the prize!")\n    else:\n        print("Join to get prize!")\nelse:\n    print("Keep practicing!")',
      hint: "Combine everything: AND, nested if, and else if!",
      expectedOutput: "You win the prize!",
      successMessage: "🎉 Congratulations! You've mastered if/else statements!"
    }
  ];
}

function getFunctionLevels(language) {
  const isJS = language === 'javascript';
  
  return [
    {
      level: 1,
      title: "Your First Function",
      description: "Create a reusable block of code!",
      instructions: [
        `Create a function called ${isJS ? 'greet' : 'greet'} that prints 'Hello!'`,
        `Call the function to run it`
      ],
      startingCode: isJS ? '// Write your function here' : '# Write your function here',
      example: isJS ? 'function greet() {\n  console.log("Hello!");\n}\n\ngreet();' : 'def greet():\n    print("Hello!")\n\ngreet()',
      hint: `Use ${isJS ? 'function name() { }' : 'def name():'} to create a function!`,
      expectedOutput: "Hello!",
      successMessage: "Awesome! You created your first function!"
    },
    {
      level: 2,
      title: "Functions with Parameters",
      description: "Pass data into functions!",
      instructions: [
        "Create a function called sayHello that takes a name parameter",
        "Inside the function, print 'Hello, [name]!'",
        "Call the function with your name"
      ],
      startingCode: isJS ? '// Write your function here' : '# Write your function here',
      example: isJS ? 'function sayHello(name) {\n  console.log("Hello, " + name + "!");\n}\n\nsayHello("Alex");' : 'def sayHello(name):\n    print("Hello, " + name + "!")\n\nsayHello("Alex")',
      hint: "Put the parameter name inside the parentheses!",
      checkFunction: (code, output) => {
        return code.includes('sayHello') && code.includes('name') && output.includes('Hello');
      },
      successMessage: "Perfect! Functions can receive data!"
    },
    {
      level: 3,
      title: "Functions That Calculate",
      description: "Make functions do math!",
      instructions: [
        "Create a function called add that takes two numbers",
        "Inside, add them together and print the result",
        "Call add(5, 3)"
      ],
      startingCode: isJS ? '// Write your function here' : '# Write your function here',
      example: isJS ? 'function add(a, b) {\n  console.log(a + b);\n}\n\nadd(5, 3);' : 'def add(a, b):\n    print(a + b)\n\nadd(5, 3)',
      hint: "Functions can take multiple parameters separated by commas!",
      expectedOutput: "8",
      successMessage: "Great! Functions can do calculations!"
    },
    {
      level: 4,
      title: "Return Values",
      description: "Get results back from functions!",
      instructions: [
        "Create a function called multiply that takes two numbers",
        "Return the result of multiplying them",
        "Call multiply(4, 5) and print the result"
      ],
      startingCode: isJS ? '// Write your function here' : '# Write your code here',
      example: isJS ? 'function multiply(a, b) {\n  return a * b;\n}\n\nlet result = multiply(4, 5);\nconsole.log(result);' : 'def multiply(a, b):\n    return a * b\n\nresult = multiply(4, 5)\nprint(result)',
      hint: `Use ${isJS ? 'return' : 'return'} to send a value back from the function!`,
      expectedOutput: "20",
      successMessage: "Excellent! Functions can return values!"
    },
    {
      level: 5,
      title: "Multiple Functions",
      description: "Create and use multiple functions!",
      instructions: [
        "Create a function called greet that takes a name and prints 'Hello, [name]'",
        "Create a function called goodbye that takes a name and prints 'Goodbye, [name]'",
        "Call both functions with your name"
      ],
      startingCode: isJS ? '// Write your functions here' : '# Write your functions here',
      example: isJS ? 'function greet(name) {\n  console.log("Hello, " + name);\n}\n\nfunction goodbye(name) {\n  console.log("Goodbye, " + name);\n}\n\ngreet("Sam");\ngoodbye("Sam");' : 'def greet(name):\n    print("Hello, " + name)\n\ndef goodbye(name):\n    print("Goodbye, " + name)\n\ngreet("Sam")\ngoodbye("Sam")',
      hint: "You can create as many functions as you want!",
      checkFunction: (code, output) => {
        return code.includes('greet') && code.includes('goodbye') && output.includes('Hello') && output.includes('Goodbye');
      },
      successMessage: "Perfect! You're creating multiple functions!"
    },
    {
      level: 6,
      title: "Functions with If Statements",
      description: "Combine functions and conditionals!",
      instructions: [
        "Create a function called checkAge that takes an age",
        "If age >= 13, print 'You are a teenager'",
        "Else, print 'You are a kid'",
        "Call checkAge(12)"
      ],
      startingCode: isJS ? '// Write your function here' : '# Write your function here',
      example: isJS ? 'function checkAge(age) {\n  if (age >= 13) {\n    console.log("You are a teenager");\n  } else {\n    console.log("You are a kid");\n  }\n}\n\ncheckAge(12);' : 'def checkAge(age):\n    if age >= 13:\n        print("You are a teenager")\n    else:\n        print("You are a kid")\n\ncheckAge(12)',
      hint: "You can use if statements inside functions!",
      expectedOutput: "You are a kid",
      successMessage: "Great! Functions can make decisions!"
    },
    {
      level: 7,
      title: "Calculating with Return",
      description: "Use returned values in calculations!",
      instructions: [
        "Create a function called square that takes a number and returns it multiplied by itself",
        "Create a function called add that takes two numbers and returns their sum",
        "Calculate: square(5) + add(3, 2) and print the result"
      ],
      startingCode: isJS ? '// Write your functions here' : '# Write your functions here',
      example: isJS ? 'function square(num) {\n  return num * num;\n}\n\nfunction add(a, b) {\n  return a + b;\n}\n\nlet result = square(5) + add(3, 2);\nconsole.log(result);' : 'def square(num):\n    return num * num\n\ndef add(a, b):\n    return a + b\n\nresult = square(5) + add(3, 2)\nprint(result)',
      hint: "You can use function calls in calculations!",
      expectedOutput: "30",
      successMessage: "Excellent! You're combining functions!"
    },
    {
      level: 8,
      title: "Functions Calling Functions",
      description: "Functions can call other functions!",
      instructions: [
        "Create a function called double that takes a number and returns it × 2",
        "Create a function called triple that takes a number and returns it × 3",
        "Create a function called calculate that takes a number, doubles it, then triples the result",
        "Call calculate(5) and print the result"
      ],
      startingCode: isJS ? '// Write your functions here' : '# Write your functions here',
      example: isJS ? 'function double(num) {\n  return num * 2;\n}\n\nfunction triple(num) {\n  return num * 3;\n}\n\nfunction calculate(num) {\n  return triple(double(num));\n}\n\nconsole.log(calculate(5));' : 'def double(num):\n    return num * 2\n\ndef triple(num):\n    return num * 3\n\ndef calculate(num):\n    return triple(double(num))\n\nprint(calculate(5))',
      hint: "Call one function inside another!",
      expectedOutput: "30",
      successMessage: "Perfect! Functions can work together!"
    },
    {
      level: 9,
      title: "Complex Functions",
      description: "Create a function that does multiple things!",
      instructions: [
        "Create a function called processNumber that takes a number",
        "If the number is even, return it divided by 2",
        "If the number is odd, return it multiplied by 3 plus 1",
        "Call processNumber(8) and print the result"
      ],
      startingCode: isJS ? '// Write your function here' : '# Write your function here',
      example: isJS ? 'function processNumber(num) {\n  if (num % 2 === 0) {\n    return num / 2;\n  } else {\n    return num * 3 + 1;\n  }\n}\n\nconsole.log(processNumber(8));' : 'def processNumber(num):\n    if num % 2 == 0:\n        return num / 2\n    else:\n        return num * 3 + 1\n\nprint(processNumber(8))',
      hint: "Use % to check if a number is even (num % 2 === 0)!",
      expectedOutput: "4",
      successMessage: "Fantastic! You're creating complex functions!"
    },
    {
      level: 10,
      title: "Function Master Challenge",
      description: "Use everything you've learned!",
      instructions: [
        "Create a function called calculateGrade that takes a score",
        "If score >= 90, return 'A'",
        "Else if score >= 80, return 'B'",
        "Else if score >= 70, return 'C'",
        "Else, return 'Keep trying!'",
        "Create a function called displayResult that takes a score, calls calculateGrade, and prints 'Your grade is [grade]'",
        "Call displayResult(85)"
      ],
      startingCode: isJS ? '// Write your functions here' : '# Write your functions here',
      example: isJS ? 'function calculateGrade(score) {\n  if (score >= 90) {\n    return "A";\n  } else if (score >= 80) {\n    return "B";\n  } else if (score >= 70) {\n    return "C";\n  } else {\n    return "Keep trying!";\n  }\n}\n\nfunction displayResult(score) {\n  let grade = calculateGrade(score);\n  console.log("Your grade is " + grade);\n}\n\ndisplayResult(85);' : 'def calculateGrade(score):\n    if score >= 90:\n        return "A"\n    elif score >= 80:\n        return "B"\n    elif score >= 70:\n        return "C"\n    else:\n        return "Keep trying!"\n\ndef displayResult(score):\n    grade = calculateGrade(score)\n    print("Your grade is " + grade)\n\ndisplayResult(85)',
      hint: "Combine functions, conditionals, and return values!",
      expectedOutput: "Your grade is B",
      successMessage: "🎉 Congratulations! You've mastered functions!"
    }
  ];
}

function getLoopLevels(language) {
  const isJS = language === 'javascript';
  
  return [
    {
      level: 1,
      title: "Your First Loop",
      description: "Repeat an action multiple times!",
      instructions: [
        `Create a ${isJS ? 'for' : 'for'} loop that prints "Hello!" 3 times`,
        `${isJS ? 'for (let i = 0; i < 3; i++)' : 'for i in range(3):'}`,
        "Print 'Hello!' inside the loop"
      ],
      startingCode: isJS ? '// Write your loop here' : '# Write your loop here',
      example: isJS ? 'for (let i = 0; i < 3; i++) {\n  console.log("Hello!");\n}' : 'for i in range(3):\n    print("Hello!")',
      hint: `Use ${isJS ? 'for (let i = 0; i < 3; i++) { }' : 'for i in range(3):'} to repeat 3 times!`,
      expectedOutput: "Hello!\nHello!\nHello!",
      successMessage: "Awesome! You created your first loop!"
    },
    {
      level: 2,
      title: "Counting with Loops",
      description: "Count numbers using loops!",
      instructions: [
        "Create a loop that counts from 1 to 5",
        "Print each number"
      ],
      startingCode: isJS ? '// Write your loop here' : '# Write your loop here',
      example: isJS ? 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}' : 'for i in range(1, 6):\n    print(i)',
      hint: "Use the loop variable to count!",
      checkFunction: (code, output) => {
        return output.includes('1') && output.includes('5');
      },
      successMessage: "Perfect! Loops can count!"
    },
    {
      level: 3,
      title: "Loop with Variables",
      description: "Use variables in loops!",
      instructions: [
        "Create a variable called count = 5",
        "Create a loop that runs 'count' times",
        "Print 'Loop!' each time"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let count = 5;\nfor (let i = 0; i < count; i++) {\n  console.log("Loop!");\n}' : 'count = 5\nfor i in range(count):\n    print("Loop!")',
      hint: "Use the variable in the loop condition!",
      expectedOutput: "Loop!\nLoop!\nLoop!\nLoop!\nLoop!",
      successMessage: "Great! Variables work in loops!"
    },
    {
      level: 4,
      title: "Sum with Loops",
      description: "Add numbers using loops!",
      instructions: [
        "Create a variable called sum = 0",
        "Create a loop from 1 to 5",
        "Add each number to sum",
        "Print the final sum"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'let sum = 0;\nfor (let i = 1; i <= 5; i++) {\n  sum = sum + i;\n}\nconsole.log(sum);' : 'sum = 0\nfor i in range(1, 6):\n    sum = sum + i\nprint(sum)',
      hint: "Add the loop variable to sum inside the loop!",
      expectedOutput: "15",
      successMessage: "Excellent! Loops can do calculations!"
    },
    {
      level: 5,
      title: "Nested Loops",
      description: "Loops inside loops!",
      instructions: [
        "Create an outer loop that runs 2 times",
        "Create an inner loop that runs 3 times",
        "Print 'Hi!' inside the inner loop",
        "See how many times it prints!"
      ],
      startingCode: isJS ? '// Write your nested loops here' : '# Write your nested loops here',
      example: isJS ? 'for (let i = 0; i < 2; i++) {\n  for (let j = 0; j < 3; j++) {\n    console.log("Hi!");\n  }\n}' : 'for i in range(2):\n    for j in range(3):\n        print("Hi!")',
      hint: "Put one loop inside another!",
      expectedOutput: "Hi!\nHi!\nHi!\nHi!\nHi!\nHi!",
      successMessage: "Perfect! Nested loops repeat more!"
    },
    {
      level: 6,
      title: "While Loops",
      description: "Loop until a condition is met!",
      instructions: [
        "Create a variable called num = 1",
        "Create a while loop: while num < 5",
        "Print num, then add 1 to num"
      ],
      startingCode: isJS ? '// Write your while loop here' : '# Write your while loop here',
      example: isJS ? 'let num = 1;\nwhile (num < 5) {\n  console.log(num);\n  num = num + 1;\n}' : 'num = 1\nwhile num < 5:\n    print(num)\n    num = num + 1',
      hint: "While loops keep going until the condition is false!",
      expectedOutput: "1\n2\n3\n4",
      successMessage: "Great! While loops repeat until a condition!"
    },
    {
      level: 7,
      title: "Loop with If",
      description: "Make decisions inside loops!",
      instructions: [
        "Create a loop from 1 to 10",
        "If the number is even, print 'Even'",
        "Otherwise, print 'Odd'"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'for (let i = 1; i <= 10; i++) {\n  if (i % 2 === 0) {\n    console.log("Even");\n  } else {\n    console.log("Odd");\n  }\n}' : 'for i in range(1, 11):\n    if i % 2 == 0:\n        print("Even")\n    else:\n        print("Odd")',
      hint: "Use % to check if a number is even (i % 2 === 0)!",
      checkFunction: (code, output) => {
        return output.includes('Even') && output.includes('Odd');
      },
      successMessage: "Perfect! Loops and if statements work together!"
    },
    {
      level: 8,
      title: "Break in Loops",
      description: "Stop a loop early!",
      instructions: [
        "Create a loop from 1 to 10",
        "If the number equals 5, break out of the loop",
        "Print each number"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'for (let i = 1; i <= 10; i++) {\n  if (i === 5) {\n    break;\n  }\n  console.log(i);\n}' : 'for i in range(1, 11):\n    if i == 5:\n        break\n    print(i)',
      hint: "Use break to stop the loop early!",
      expectedOutput: "1\n2\n3\n4",
      successMessage: "Excellent! Break stops loops early!"
    },
    {
      level: 9,
      title: "Continue in Loops",
      description: "Skip to the next iteration!",
      instructions: [
        "Create a loop from 1 to 5",
        "If the number is 3, continue (skip it)",
        "Print each number"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'for (let i = 1; i <= 5; i++) {\n  if (i === 3) {\n    continue;\n  }\n  console.log(i);\n}' : 'for i in range(1, 6):\n    if i == 3:\n        continue\n    print(i)',
      hint: "Use continue to skip to the next iteration!",
      expectedOutput: "1\n2\n4\n5",
      successMessage: "Perfect! Continue skips iterations!"
    },
    {
      level: 10,
      title: "Loop Master Challenge",
      description: "Use everything you've learned!",
      instructions: [
        "Create a loop from 1 to 10",
        "If the number is divisible by 3, print 'Fizz'",
        "If the number is divisible by 5, print 'Buzz'",
        "If divisible by both, print 'FizzBuzz'",
        "Otherwise, print the number"
      ],
      startingCode: isJS ? '// Write your code here' : '# Write your code here',
      example: isJS ? 'for (let i = 1; i <= 10; i++) {\n  if (i % 3 === 0 && i % 5 === 0) {\n    console.log("FizzBuzz");\n  } else if (i % 3 === 0) {\n    console.log("Fizz");\n  } else if (i % 5 === 0) {\n    console.log("Buzz");\n  } else {\n    console.log(i);\n  }\n}' : 'for i in range(1, 11):\n    if i % 3 == 0 and i % 5 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
      hint: "Check for both conditions first, then individual ones!",
      checkFunction: (code, output) => {
        return output.includes('Fizz') && output.includes('Buzz') && output.includes('FizzBuzz');
      },
      successMessage: "🎉 Congratulations! You've mastered loops!"
    }
  ];
}

function TopicTeaching({ topic, language, topicData, onStart, onBack }) {
  const isJS = language === 'javascript';

  if (topic === 'variables') {
    return (
      <div className="programming-adventure">
        <div className="activity-header">
          <button onClick={onBack} className="back-button">
            ← Back to Topics
          </button>
          <h1>{topicData.icon} {topicData.name}</h1>
          <p className="activity-subtitle">Learn the concept first!</p>
        </div>

        <div className="teaching-container">
          <div className="teaching-content">
            <div className="teaching-header">
              <h2>📦 What are Variables?</h2>
              <p className="teaching-description">
                Variables are like labeled boxes that store information! 
                Use simple names like "name" (not "myName") so it works for everyone.
              </p>
            </div>

            <div className="variable-explorer-teaching">
              <div className="variable-card-teaching">
                <div className="variable-label-teaching">name</div>
                <div className="variable-value-teaching">Tunde</div>
                <div className="variable-type-teaching">text</div>
              </div>
              <div className="variable-card-teaching">
                <div className="variable-label-teaching">age</div>
                <div className="variable-value-teaching">10</div>
                <div className="variable-type-teaching">number</div>
              </div>
              <div className="variable-card-teaching">
                <div className="variable-label-teaching">isHappy</div>
                <div className="variable-value-teaching">true</div>
                <div className="variable-type-teaching">boolean</div>
              </div>
              <div className="variable-card-teaching">
                <div className="variable-label-teaching">colors</div>
                <div className="variable-value-teaching">['red', 'blue']</div>
                <div className="variable-type-teaching">array</div>
              </div>
            </div>

            <div className="teaching-explanation">
              <h3>💡 Key Points:</h3>
              <ul className="teaching-points">
                <li>Variables are containers that hold information</li>
                <li>Use simple names: "name" not "myName" or "yourName"</li>
                <li>Text goes in quotes: <code>"Hello"</code></li>
                <li>Numbers don't need quotes: <code>10</code></li>
                <li>You can change what's inside anytime!</li>
              </ul>
            </div>

            <div className="teaching-example-code">
              <h3>📝 Example Code:</h3>
              <pre className="teaching-code">
{isJS ? `let name = "Tunde";
let age = 10;
console.log(name);` : `name = "Tunde"
age = 10
print(name)`}
              </pre>
            </div>

            <button onClick={onStart} className="start-coding-btn">
              🚀 Start Coding Levels →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (topic === 'conditionals') {
    return (
      <div className="programming-adventure">
        <div className="activity-header">
          <button onClick={onBack} className="back-button">
            ← Back to Topics
          </button>
          <h1>{topicData.icon} {topicData.name}</h1>
          <p className="activity-subtitle">Learn the concept first!</p>
        </div>

        <div className="teaching-container">
          <div className="teaching-content">
            <div className="teaching-header">
              <h2>🔀 What are If & Else?</h2>
              <p className="teaching-description">
                If/Else statements help your code make decisions! 
                Think of them like choosing between two paths.
              </p>
            </div>

            <div className="conditional-visual">
              <div className="decision-flow">
                <div className="decision-box">
                  <div className="decision-question">Is it raining?</div>
                </div>
                <div className="decision-arrows">
                  <div className="arrow-path true-path">
                    <div className="arrow-label">YES</div>
                    <div className="arrow-line"></div>
                    <div className="action-box true-action">
                      Bring umbrella ☂️
                    </div>
                  </div>
                  <div className="arrow-path false-path">
                    <div className="arrow-label">NO</div>
                    <div className="arrow-line"></div>
                    <div className="action-box false-action">
                      No umbrella needed! ☀️
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="teaching-explanation">
              <h3>💡 Key Points:</h3>
              <ul className="teaching-points">
                <li>If checks a condition (like "is age >= 10?")</li>
                <li>If true → do the first action</li>
                <li>Else → do the second action</li>
                <li>Your code chooses the right path automatically!</li>
              </ul>
            </div>

            <div className="teaching-example-code">
              <h3>📝 Example Code:</h3>
              <pre className="teaching-code">
{isJS ? `let age = 12;
if (age >= 10) {
  console.log("You are 10 or older!");
} else {
  console.log("You are younger than 10!");
}` : `age = 12
if age >= 10:
    print("You are 10 or older!")
else:
    print("You are younger than 10!")`}
              </pre>
            </div>

            <button onClick={onStart} className="start-coding-btn">
              🚀 Start Coding Levels →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (topic === 'functions') {
    return (
      <div className="programming-adventure">
        <div className="activity-header">
          <button onClick={onBack} className="back-button">
            ← Back to Topics
          </button>
          <h1>{topicData.icon} {topicData.name}</h1>
          <p className="activity-subtitle">Learn the concept first!</p>
        </div>

        <div className="teaching-container">
          <div className="teaching-content">
            <div className="teaching-header">
              <h2>⚙️ What are Functions?</h2>
              <p className="teaching-description">
                Functions are reusable blocks of code! 
                They take inputs, do something, and give you an output.
              </p>
            </div>

            <div className="function-visual">
              <div className="function-box">
                <div className="function-name">greet</div>
                <div className="function-inputs">
                  <div className="input-box">name</div>
                </div>
                <div className="function-arrow">→</div>
                <div className="function-output">
                  <div className="output-box">"Hello, Tunde!"</div>
                </div>
              </div>
              <div className="function-box">
                <div className="function-name">add</div>
                <div className="function-inputs">
                  <div className="input-box">5</div>
                  <div className="input-box">3</div>
                </div>
                <div className="function-arrow">→</div>
                <div className="function-output">
                  <div className="output-box">8</div>
                </div>
              </div>
            </div>

            <div className="teaching-explanation">
              <h3>💡 Key Points:</h3>
              <ul className="teaching-points">
                <li>Functions are like machines: put something in, get something out</li>
                <li>You can use the same function many times</li>
                <li>Functions make your code organized and reusable</li>
                <li>Inputs go in parentheses: <code>greet("Tunde")</code></li>
              </ul>
            </div>

            <div className="teaching-example-code">
              <h3>📝 Example Code:</h3>
              <pre className="teaching-code">
{isJS ? `function greet(name) {
  return "Hello, " + name + "!";
}

greet("Tunde");` : `def greet(name):
    return "Hello, " + name + "!"

greet("Tunde")`}
              </pre>
            </div>

            <button onClick={onStart} className="start-coding-btn">
              🚀 Start Coding Levels →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (topic === 'loops') {
    return (
      <div className="programming-adventure">
        <div className="activity-header">
          <button onClick={onBack} className="back-button">
            ← Back to Topics
          </button>
          <h1>{topicData.icon} {topicData.name}</h1>
          <p className="activity-subtitle">Learn the concept first!</p>
        </div>

        <div className="teaching-container">
          <div className="teaching-content">
            <div className="teaching-header">
              <h2>🔄 What are Loops?</h2>
              <p className="teaching-description">
                Loops repeat actions! Instead of writing the same code many times, 
                loops do it automatically.
              </p>
            </div>

            <div className="loop-visual-teaching">
              <div className="loop-example">
                <div className="loop-item">1️⃣</div>
                <div className="loop-item">2️⃣</div>
                <div className="loop-item">3️⃣</div>
                <div className="loop-arrow">→</div>
                <div className="loop-result">Done!</div>
              </div>
            </div>

            <div className="teaching-explanation">
              <h3>💡 Key Points:</h3>
              <ul className="teaching-points">
                <li>Loops repeat code multiple times</li>
                <li>For loops: repeat a specific number of times</li>
                <li>While loops: repeat until a condition is met</li>
                <li>Loops save you from writing the same code over and over!</li>
              </ul>
            </div>

            <div className="teaching-example-code">
              <h3>📝 Example Code:</h3>
              <pre className="teaching-code">
{isJS ? `for (let i = 0; i < 3; i++) {
  console.log("Hello!");
}` : `for i in range(3):
    print("Hello!")`}
              </pre>
            </div>

            <button onClick={onStart} className="start-coding-btn">
              🚀 Start Coding Levels →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default ProgrammingAdventure;

