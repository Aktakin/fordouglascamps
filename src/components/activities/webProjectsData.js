// Web Projects Data
export const webProjects = [
  {
    id: 1,
    title: 'Personal Portfolio',
    description: 'Build your own portfolio website with HTML and CSS',
    icon: '👤',
    skills: ['HTML', 'CSS', 'Layout'],
    fileName: 'index.html',
    instructions: 'Create a simple personal portfolio page with your name, a brief bio, and styling. Type the code exactly as shown to see your page come to life!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Portfolio</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            max-width: 600px;
            text-align: center;
        }
        h1 {
            color: #667eea;
            font-size: 2.5rem;
            margin: 0 0 10px 0;
        }
        .subtitle {
            color: #666;
            font-size: 1.2rem;
            margin-bottom: 30px;
        }
        .bio {
            color: #333;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            text-decoration: none;
            display: inline-block;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>👋 Hello, I'm Alex!</h1>
        <p class="subtitle">Web Developer & Designer</p>
        <p class="bio">
            I love creating beautiful websites and learning new technologies.
            Welcome to my portfolio where I showcase my projects and skills!
        </p>
        <a href="#" class="button">View My Work</a>
    </div>
</body>
</html>`
  },
  {
    id: 2,
    title: 'To-Do List App',
    description: 'Create an interactive to-do list with JavaScript',
    icon: '📝',
    skills: ['JavaScript', 'DOM', 'Storage'],
    fileName: 'todo.html',
    instructions: 'Build a functional to-do list where you can add tasks. Type the complete code to see your interactive app!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>To-Do List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
            padding: 20px;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .app {
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            width: 100%;
            max-width: 500px;
        }
        h1 {
            color: #4ecdc4;
            text-align: center;
            margin-top: 0;
        }
        .input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        input {
            flex: 1;
            padding: 12px;
            border: 2px solid #4ecdc4;
            border-radius: 10px;
            font-size: 16px;
        }
        button {
            background: #4ecdc4;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
        }
        button:hover {
            background: #44a08d;
        }
        #taskList {
            list-style: none;
            padding: 0;
        }
        .task {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .delete-btn {
            background: #ff6b6b;
            padding: 5px 15px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="app">
        <h1>📝 My To-Do List</h1>
        <div class="input-group">
            <input type="text" id="taskInput" placeholder="Add a new task...">
            <button onclick="addTask()">Add</button>
        </div>
        <ul id="taskList"></ul>
    </div>
    <script>
        function addTask() {
            const input = document.getElementById('taskInput');
            const task = input.value.trim();
            if (task) {
                const li = document.createElement('li');
                li.className = 'task';
                li.innerHTML = task + ' <button class="delete-btn" onclick="this.parentElement.remove()">Delete</button>';
                document.getElementById('taskList').appendChild(li);
                input.value = '';
            }
        }
        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addTask();
        });
    </script>
</body>
</html>`
  },
  {
    id: 3,
    title: 'Color Picker Tool',
    description: 'Build a color palette generator with live preview',
    icon: '🎨',
    skills: ['CSS Colors', 'Events', 'Design'],
    fileName: 'colors.html',
    instructions: 'Create an interactive color picker that shows the selected color in a big preview box. Watch your colors come alive!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Color Picker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #ff6b6b 0%, #764ba2 100%);
            padding: 20px;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            color: #ff6b6b;
            margin-top: 0;
        }
        .color-display {
            width: 100%;
            height: 200px;
            border-radius: 15px;
            margin: 20px 0;
            transition: background-color 0.3s;
            border: 3px solid #ddd;
        }
        .color-input {
            width: 100%;
            height: 60px;
            border: 3px solid #ff6b6b;
            border-radius: 10px;
            cursor: pointer;
        }
        .color-code {
            font-size: 2rem;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 Color Picker</h1>
        <p>Choose your favorite color!</p>
        <div class="color-display" id="display"></div>
        <div class="color-code" id="colorCode">#ff6b6b</div>
        <input type="color" class="color-input" id="colorPicker" value="#ff6b6b">
    </div>
    <script>
        const picker = document.getElementById('colorPicker');
        const display = document.getElementById('display');
        const code = document.getElementById('colorCode');
        
        display.style.backgroundColor = picker.value;
        
        picker.addEventListener('input', function() {
            display.style.backgroundColor = this.value;
            code.textContent = this.value;
        });
    </script>
</body>
</html>`
  },
  {
    id: 4,
    title: 'Web Calculator',
    description: 'Design a fully functional calculator app',
    icon: '🧮',
    skills: ['JavaScript', 'Math', 'UI Design'],
    fileName: 'calculator.html',
    instructions: 'Build a working calculator that can add, subtract, multiply, and divide. Type the complete code to create your calculator!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .calculator {
            background: white;
            padding: 20px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            width: 300px;
        }
        h1 {
            text-align: center;
            color: #667eea;
            margin-top: 0;
        }
        .display {
            background: #1e1e1e;
            color: #4ecdc4;
            padding: 20px;
            border-radius: 10px;
            text-align: right;
            font-size: 2rem;
            margin-bottom: 20px;
            min-height: 60px;
            font-family: monospace;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        button {
            padding: 20px;
            font-size: 1.2rem;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }
        button:hover {
            transform: scale(1.05);
        }
        .num-btn {
            background: #f0f0f0;
            color: #333;
        }
        .op-btn {
            background: #667eea;
            color: white;
        }
        .eq-btn {
            background: #4ecdc4;
            color: white;
            grid-column: span 2;
        }
        .clear-btn {
            background: #ff6b6b;
            color: white;
            grid-column: span 2;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <h1>🧮 Calculator</h1>
        <div class="display" id="display">0</div>
        <div class="buttons">
            <button class="clear-btn" onclick="clearDisplay()">C</button>
            <button class="op-btn" onclick="appendValue('/')">/</button>
            <button class="op-btn" onclick="appendValue('*')">*</button>
            <button class="num-btn" onclick="appendValue('7')">7</button>
            <button class="num-btn" onclick="appendValue('8')">8</button>
            <button class="num-btn" onclick="appendValue('9')">9</button>
            <button class="op-btn" onclick="appendValue('-')">-</button>
            <button class="num-btn" onclick="appendValue('4')">4</button>
            <button class="num-btn" onclick="appendValue('5')">5</button>
            <button class="num-btn" onclick="appendValue('6')">6</button>
            <button class="op-btn" onclick="appendValue('+')">+</button>
            <button class="num-btn" onclick="appendValue('1')">1</button>
            <button class="num-btn" onclick="appendValue('2')">2</button>
            <button class="num-btn" onclick="appendValue('3')">3</button>
            <button class="num-btn" onclick="appendValue('0')">0</button>
            <button class="num-btn" onclick="appendValue('.')">.</button>
            <button class="eq-btn" onclick="calculate()">=</button>
        </div>
    </div>
    <script>
        let currentValue = '0';
        function updateDisplay() {
            document.getElementById('display').textContent = currentValue;
        }
        function appendValue(val) {
            if (currentValue === '0') currentValue = val;
            else currentValue += val;
            updateDisplay();
        }
        function clearDisplay() {
            currentValue = '0';
            updateDisplay();
        }
        function calculate() {
            try {
                currentValue = eval(currentValue).toString();
            } catch(e) {
                currentValue = 'Error';
            }
            updateDisplay();
        }
    </script>
</body>
</html>`
  },
  {
    id: 5,
    title: 'Weather Dashboard',
    description: 'Create a weather app with dynamic data',
    icon: '🌤️',
    skills: ['APIs', 'Fetch', 'JSON'],
    fileName: 'weather.html',
    instructions: 'Build a weather dashboard that displays weather information for different cities. Type the code to create your weather app!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Weather Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
            padding: 20px;
            margin: 0;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
            color: white;
            font-size: 2.5rem;
            margin-bottom: 30px;
        }
        .weather-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        .weather-card {
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            transition: all 0.3s;
        }
        .weather-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }
        .city-name {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 10px;
        }
        .weather-icon {
            font-size: 4rem;
            margin: 10px 0;
        }
        .temperature {
            font-size: 2.5rem;
            color: #3a7bd5;
            font-weight: bold;
        }
        .condition {
            color: #666;
            font-size: 1.1rem;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌤️ Weather Dashboard</h1>
        <div class="weather-grid" id="weatherGrid"></div>
    </div>
    <script>
        const cities = [
            { name: 'New York', temp: 72, icon: '☀️', condition: 'Sunny' },
            { name: 'London', temp: 58, icon: '☁️', condition: 'Cloudy' },
            { name: 'Tokyo', temp: 68, icon: '🌤️', condition: 'Partly Cloudy' },
            { name: 'Paris', temp: 65, icon: '🌧️', condition: 'Rainy' }
        ];
        const grid = document.getElementById('weatherGrid');
        cities.forEach(city => {
            const card = document.createElement('div');
            card.className = 'weather-card';
            card.innerHTML = \`
                <div class="city-name">\${city.name}</div>
                <div class="weather-icon">\${city.icon}</div>
                <div class="temperature">\${city.temp}°F</div>
                <div class="condition">\${city.condition}</div>
            \`;
            grid.appendChild(card);
        });
    </script>
</body>
</html>`
  },
  {
    id: 6,
    title: 'Music Player',
    description: 'Build a custom audio player interface',
    icon: '🎵',
    skills: ['Audio API', 'Controls', 'UI/UX'],
    fileName: 'music-player.html',
    instructions: 'Create a beautiful music player interface with play, pause, and track controls. Type the code to build your player!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Music Player</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .player {
            background: white;
            padding: 40px;
            border-radius: 30px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            width: 400px;
            text-align: center;
        }
        h1 {
            color: #667eea;
            margin-top: 0;
        }
        .album-art {
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            margin: 20px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 5rem;
        }
        .track-info {
            margin: 20px 0;
        }
        .track-title {
            font-size: 1.5rem;
            color: #333;
            font-weight: bold;
        }
        .track-artist {
            color: #666;
            margin-top: 5px;
        }
        .controls {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
        }
        .control-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s;
            background: #667eea;
            color: white;
        }
        .control-btn:hover {
            transform: scale(1.1);
            background: #764ba2;
        }
        .play-btn {
            width: 80px;
            height: 80px;
            font-size: 2rem;
        }
        .progress-bar {
            width: 100%;
            height: 10px;
            background: #f0f0f0;
            border-radius: 5px;
            margin: 20px 0;
            overflow: hidden;
        }
        .progress {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            width: 30%;
            transition: width 0.3s;
        }
    </style>
</head>
<body>
    <div class="player">
        <h1>🎵 Music Player</h1>
        <div class="album-art">🎸</div>
        <div class="track-info">
            <div class="track-title" id="title">Summer Vibes</div>
            <div class="track-artist" id="artist">The Cool Band</div>
        </div>
        <div class="progress-bar">
            <div class="progress" id="progress"></div>
        </div>
        <div class="controls">
            <button class="control-btn" onclick="prevTrack()">⏮</button>
            <button class="control-btn play-btn" onclick="togglePlay()" id="playBtn">▶️</button>
            <button class="control-btn" onclick="nextTrack()">⏭</button>
        </div>
    </div>
    <script>
        let isPlaying = false;
        let currentProgress = 30;
        const tracks = [
            { title: 'Summer Vibes', artist: 'The Cool Band' },
            { title: 'Night Dreams', artist: 'DJ Awesome' },
            { title: 'City Lights', artist: 'Urban Beats' }
        ];
        let currentTrack = 0;
        function togglePlay() {
            isPlaying = !isPlaying;
            document.getElementById('playBtn').textContent = isPlaying ? '⏸️' : '▶️';
            if (isPlaying) {
                const interval = setInterval(() => {
                    if (!isPlaying) clearInterval(interval);
                    currentProgress = Math.min(100, currentProgress + 1);
                    document.getElementById('progress').style.width = currentProgress + '%';
                }, 100);
            }
        }
        function nextTrack() {
            currentTrack = (currentTrack + 1) % tracks.length;
            updateTrackInfo();
        }
        function prevTrack() {
            currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
            updateTrackInfo();
        }
        function updateTrackInfo() {
            document.getElementById('title').textContent = tracks[currentTrack].title;
            document.getElementById('artist').textContent = tracks[currentTrack].artist;
            currentProgress = 0;
            document.getElementById('progress').style.width = '0%';
        }
    </script>
</body>
</html>`
  },
  {
    id: 7,
    title: 'Image Gallery',
    description: 'Create a responsive image gallery with lightbox',
    icon: '🖼️',
    skills: ['Grid Layout', 'Responsive', 'Modal'],
    fileName: 'gallery.html',
    instructions: 'Build a beautiful image gallery that opens images in a lightbox when clicked. Type the code to create your gallery!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Image Gallery</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            padding: 20px;
            margin: 0;
            min-height: 100vh;
        }
        h1 {
            text-align: center;
            color: white;
            font-size: 2.5rem;
            margin-bottom: 30px;
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .gallery-item {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            cursor: pointer;
            transition: all 0.3s;
        }
        .gallery-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }
        .gallery-item-content {
            height: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .gallery-item-title {
            padding: 15px;
            text-align: center;
            color: #333;
            font-weight: bold;
        }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal.active {
            display: flex;
        }
        .modal-content {
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
        }
        .modal-icon {
            font-size: 8rem;
            margin-bottom: 20px;
        }
        .close-btn {
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: bold;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>🖼️ Image Gallery</h1>
    <div class="gallery" id="gallery"></div>
    <div class="modal" id="modal">
        <div class="modal-content">
            <div class="modal-icon" id="modalIcon"></div>
            <h2 id="modalTitle"></h2>
            <button class="close-btn" onclick="closeModal()">Close</button>
        </div>
    </div>
    <script>
        const images = [
            { icon: '🌅', title: 'Sunset' },
            { icon: '🏔️', title: 'Mountains' },
            { icon: '🌊', title: 'Ocean' },
            { icon: '🌲', title: 'Forest' },
            { icon: '🏖️', title: 'Beach' },
            { icon: '🌃', title: 'City Night' }
        ];
        const gallery = document.getElementById('gallery');
        images.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.onclick = () => openModal(index);
            item.innerHTML = \`
                <div class="gallery-item-content">\${img.icon}</div>
                <div class="gallery-item-title">\${img.title}</div>
            \`;
            gallery.appendChild(item);
        });
        function openModal(index) {
            document.getElementById('modalIcon').textContent = images[index].icon;
            document.getElementById('modalTitle').textContent = images[index].title;
            document.getElementById('modal').classList.add('active');
        }
        function closeModal() {
            document.getElementById('modal').classList.remove('active');
        }
    </script>
</body>
</html>`
  },
  {
    id: 8,
    title: 'Chat Interface',
    description: 'Design a modern chat application UI',
    icon: '📱',
    skills: ['Flexbox', 'Messages', 'Real-time'],
    fileName: 'chat.html',
    instructions: 'Create a chat interface where you can send and receive messages. Type the code to build your chat app!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Chat App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .chat-container {
            background: white;
            width: 400px;
            height: 600px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
        }
        .chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 20px 20px 0 0;
            text-align: center;
        }
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .message {
            padding: 12px 16px;
            border-radius: 15px;
            max-width: 70%;
            word-wrap: break-word;
        }
        .message-received {
            background: #f0f0f0;
            align-self: flex-start;
            color: #333;
        }
        .message-sent {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            align-self: flex-end;
            color: white;
        }
        .chat-input {
            display: flex;
            padding: 15px;
            border-top: 2px solid #f0f0f0;
            gap: 10px;
        }
        input {
            flex: 1;
            padding: 12px;
            border: 2px solid #667eea;
            border-radius: 25px;
            font-size: 1rem;
        }
        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
        }
        button:hover {
            background: #764ba2;
        }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">
            <h2>💬 Chat App</h2>
        </div>
        <div class="chat-messages" id="messages">
            <div class="message message-received">Hey! How are you?</div>
            <div class="message message-sent">I'm great! Thanks for asking!</div>
            <div class="message message-received">That's awesome!</div>
        </div>
        <div class="chat-input">
            <input type="text" id="messageInput" placeholder="Type a message...">
            <button onclick="sendMessage()">Send</button>
        </div>
    </div>
    <script>
        function sendMessage() {
            const input = document.getElementById('messageInput');
            const text = input.value.trim();
            if (text) {
                const msg = document.createElement('div');
                msg.className = 'message message-sent';
                msg.textContent = text;
                document.getElementById('messages').appendChild(msg);
                input.value = '';
                document.getElementById('messages').scrollTop = 999999;
            }
        }
        document.getElementById('messageInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
    </script>
</body>
</html>`
  },
  {
    id: 9,
    title: 'Shopping Cart',
    description: 'Build an e-commerce shopping cart system',
    icon: '🛒',
    skills: ['State', 'Cart Logic', 'Total'],
    fileName: 'cart.html',
    instructions: 'Create a shopping cart where you can add items and see the total price. Type the code to build your cart!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Shopping Cart</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
            padding: 20px;
            margin: 0;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
            color: white;
            font-size: 2.5rem;
        }
        .products {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .product {
            background: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .product-icon {
            font-size: 3rem;
            margin-bottom: 10px;
        }
        .product-name {
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .product-price {
            color: #4ecdc4;
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .add-btn {
            background: #4ecdc4;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
        }
        .cart {
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .cart h2 {
            color: #333;
            margin-top: 0;
        }
        .cart-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .cart-total {
            font-size: 1.5rem;
            font-weight: bold;
            color: #4ecdc4;
            text-align: right;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🛒 Shopping Cart</h1>
        <div class="products">
            <div class="product">
                <div class="product-icon">👕</div>
                <div class="product-name">T-Shirt</div>
                <div class="product-price">$20</div>
                <button class="add-btn" onclick="addToCart('T-Shirt', 20)">Add to Cart</button>
            </div>
            <div class="product">
                <div class="product-icon">👟</div>
                <div class="product-name">Sneakers</div>
                <div class="product-price">$50</div>
                <button class="add-btn" onclick="addToCart('Sneakers', 50)">Add to Cart</button>
            </div>
            <div class="product">
                <div class="product-icon">🎒</div>
                <div class="product-name">Backpack</div>
                <div class="product-price">$30</div>
                <button class="add-btn" onclick="addToCart('Backpack', 30)">Add to Cart</button>
            </div>
        </div>
        <div class="cart">
            <h2>Your Cart</h2>
            <div id="cartItems"></div>
            <div class="cart-total">Total: $<span id="total">0</span></div>
        </div>
    </div>
    <script>
        let cart = [];
        let total = 0;
        function addToCart(name, price) {
            cart.push({ name, price });
            total += price;
            updateCart();
        }
        function updateCart() {
            const cartEl = document.getElementById('cartItems');
            cartEl.innerHTML = '';
            cart.forEach(item => {
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = \`<span>\${item.name}</span><span>$\${item.price}</span>\`;
                cartEl.appendChild(div);
            });
            document.getElementById('total').textContent = total;
        }
    </script>
</body>
</html>`
  },
  {
    id: 10,
    title: 'Personal Website',
    description: 'Combine everything: Build your complete personal website!',
    icon: '🌟',
    skills: ['Full Stack', 'All Skills', 'Portfolio'],
    fileName: 'website.html',
    instructions: 'Create your complete personal website with multiple sections! This is your final project combining all your skills!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Personal Website</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
        }
        .navbar {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            text-align: center;
        }
        .navbar a {
            color: white;
            text-decoration: none;
            margin: 0 15px;
            font-weight: bold;
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 100px 20px;
            text-align: center;
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        .section {
            padding: 60px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .section h2 {
            color: #667eea;
            font-size: 2rem;
            margin-bottom: 30px;
            text-align: center;
        }
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .skill-card {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            transition: all 0.3s;
        }
        .skill-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .skill-icon {
            font-size: 3rem;
            margin-bottom: 10px;
        }
        .footer {
            background: #333;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            text-decoration: none;
            display: inline-block;
            font-weight: bold;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
    </nav>
    <section class="hero" id="home">
        <h1>👋 Welcome to My Website!</h1>
        <p>I'm a Web Developer & Designer</p>
        <a href="#skills" class="btn">View My Skills</a>
    </section>
    <section class="section" id="about">
        <h2>About Me</h2>
        <p style="text-align: center; font-size: 1.1rem; line-height: 1.6;">
            I'm passionate about creating beautiful and functional websites.
            I love learning new technologies and building amazing projects!
        </p>
    </section>
    <section class="section" id="skills">
        <h2>My Skills</h2>
        <div class="skills-grid">
            <div class="skill-card">
                <div class="skill-icon">🌐</div>
                <h3>HTML & CSS</h3>
                <p>Building beautiful layouts</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon">⚡</div>
                <h3>JavaScript</h3>
                <p>Making sites interactive</p>
            </div>
            <div class="skill-card">
                <div class="skill-icon">🎨</div>
                <h3>UI Design</h3>
                <p>Creating great experiences</p>
            </div>
        </div>
    </section>
    <footer class="footer" id="contact">
        <h3>Get In Touch</h3>
        <p>email@example.com</p>
        <p style="margin-top: 20px;">© 2025 My Personal Website</p>
    </footer>
</body>
</html>`
  }
];

