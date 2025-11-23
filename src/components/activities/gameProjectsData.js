// Game Development Projects Data
export const gameProjects = [
  {
    id: 1,
    title: 'Click the Target',
    description: 'Build a reaction-time game with moving targets',
    icon: '🎯',
    skills: ['Events', 'Timing', 'Score'],
    fileName: 'target-game.html',
    instructions: 'Create a fast-paced clicking game where targets appear randomly on screen. Click them before they disappear!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Click the Target</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .game-container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            color: white;
            font-size: 2.5rem;
        }
        .stats {
            background: white;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-around;
        }
        .stat {
            font-size: 1.5rem;
            font-weight: bold;
            color: #ff6b6b;
        }
        .game-area {
            background: white;
            height: 500px;
            border-radius: 20px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .target {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
            border-radius: 50%;
            position: absolute;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            transition: all 0.2s;
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }
        .target:hover {
            transform: scale(1.1);
        }
        .start-btn {
            background: white;
            color: #ff6b6b;
            border: none;
            padding: 15px 40px;
            border-radius: 25px;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>🎯 Click the Target</h1>
        <div class="stats">
            <div>Score: <span class="stat" id="score">0</span></div>
            <div>Time: <span class="stat" id="time">30</span>s</div>
        </div>
        <div class="game-area" id="gameArea"></div>
        <button class="start-btn" onclick="startGame()" id="startBtn">Start Game</button>
    </div>
    <script>
        let score = 0;
        let timeLeft = 30;
        let gameInterval;
        let targetInterval;
        function startGame() {
            score = 0;
            timeLeft = 30;
            document.getElementById('score').textContent = score;
            document.getElementById('time').textContent = timeLeft;
            document.getElementById('startBtn').style.display = 'none';
            document.getElementById('gameArea').innerHTML = '';
            gameInterval = setInterval(() => {
                timeLeft--;
                document.getElementById('time').textContent = timeLeft;
                if (timeLeft <= 0) {
                    endGame();
                }
            }, 1000);
            targetInterval = setInterval(spawnTarget, 1000);
        }
        function spawnTarget() {
            const gameArea = document.getElementById('gameArea');
            const target = document.createElement('div');
            target.className = 'target';
            target.textContent = '🎯';
            target.style.left = Math.random() * (gameArea.offsetWidth - 60) + 'px';
            target.style.top = Math.random() * (gameArea.offsetHeight - 60) + 'px';
            target.onclick = () => {
                score++;
                document.getElementById('score').textContent = score;
                target.remove();
            };
            gameArea.appendChild(target);
            setTimeout(() => target.remove(), 1500);
        }
        function endGame() {
            clearInterval(gameInterval);
            clearInterval(targetInterval);
            document.getElementById('gameArea').innerHTML = '<h2 style="padding: 200px 0; color: #ff6b6b;">Game Over! Final Score: ' + score + '</h2>';
            document.getElementById('startBtn').style.display = 'inline-block';
        }
    </script>
</body>
</html>`
  },
  {
    id: 2,
    title: 'Snake Game',
    description: 'Create the classic snake game with collision detection',
    icon: '🐍',
    skills: ['Movement', 'Collision', 'Arrays'],
    fileName: 'snake-game.html',
    instructions: 'Build the classic snake game! Use arrow keys to move, eat food to grow, and avoid hitting yourself!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Snake Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        h1 {
            color: white;
            font-size: 2.5rem;
            margin-bottom: 20px;
        }
        .score {
            background: white;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.5rem;
            font-weight: bold;
            color: #4ecdc4;
            margin-bottom: 20px;
        }
        canvas {
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .controls {
            margin-top: 20px;
            color: white;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>🐍 Snake Game</h1>
    <div class="score">Score: <span id="score">0</span></div>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <div class="controls">Use Arrow Keys to Move</div>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const box = 20;
        let snake = [{ x: 10 * box, y: 10 * box }];
        let food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
        let score = 0;
        let direction = 'RIGHT';
        document.addEventListener('keydown', changeDirection);
        function changeDirection(event) {
            if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
            else if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
            else if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
            else if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
        }
        function draw() {
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = i === 0 ? '#4ecdc4' : '#44a08d';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
            }
            ctx.fillStyle = '#ff6b6b';
            ctx.fillRect(food.x, food.y, box, box);
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;
            if (direction === 'LEFT') snakeX -= box;
            if (direction === 'UP') snakeY -= box;
            if (direction === 'RIGHT') snakeX += box;
            if (direction === 'DOWN') snakeY += box;
            if (snakeX === food.x && snakeY === food.y) {
                score++;
                document.getElementById('score').textContent = score;
                food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
            } else {
                snake.pop();
            }
            let newHead = { x: snakeX, y: snakeY };
            if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
                clearInterval(game);
                alert('Game Over! Score: ' + score);
                location.reload();
            }
            snake.unshift(newHead);
        }
        function collision(head, array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x === array[i].x && head.y === array[i].y) return true;
            }
            return false;
        }
        let game = setInterval(draw, 180);
    </script>
</body>
</html>`
  },
  {
    id: 3,
    title: 'Pong Game',
    description: 'Build a two-player pong game with physics',
    icon: '🎾',
    skills: ['Physics', 'Collision', '2-Player'],
    fileName: 'pong-game.html',
    instructions: 'Create the classic Pong game! Use W/S keys for left paddle and arrow keys for right paddle!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pong Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        h1 {
            color: white;
            font-size: 2.5rem;
            margin-bottom: 20px;
        }
        .scores {
            display: flex;
            gap: 100px;
            margin-bottom: 20px;
        }
        .player-score {
            background: white;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.5rem;
            font-weight: bold;
            color: #667eea;
        }
        canvas {
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .controls {
            margin-top: 20px;
            color: white;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>🎾 Pong Game</h1>
    <div class="scores">
        <div class="player-score">Player 1: <span id="score1">0</span></div>
        <div class="player-score">Player 2: <span id="score2">0</span></div>
    </div>
    <canvas id="pongCanvas" width="600" height="400"></canvas>
    <div class="controls">Player 1: W/S | Player 2: ↑/↓</div>
    <script>
        const canvas = document.getElementById('pongCanvas');
        const ctx = canvas.getContext('2d');
        const paddleWidth = 10, paddleHeight = 80;
        let player1Y = canvas.height / 2 - paddleHeight / 2;
        let player2Y = canvas.height / 2 - paddleHeight / 2;
        let ballX = canvas.width / 2, ballY = canvas.height / 2;
        let ballSpeedX = 5, ballSpeedY = 3;
        let score1 = 0, score2 = 0;
        let keys = {};
        document.addEventListener('keydown', (e) => keys[e.key] = true);
        document.addEventListener('keyup', (e) => keys[e.key] = false);
        function draw() {
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#667eea';
            ctx.fillRect(10, player1Y, paddleWidth, paddleHeight);
            ctx.fillRect(canvas.width - 20, player2Y, paddleWidth, paddleHeight);
            ctx.fillStyle = '#ff6b6b';
            ctx.beginPath();
            ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
            ctx.fill();
            if (keys['w'] && player1Y > 0) player1Y -= 5;
            if (keys['s'] && player1Y < canvas.height - paddleHeight) player1Y += 5;
            if (keys['ArrowUp'] && player2Y > 0) player2Y -= 5;
            if (keys['ArrowDown'] && player2Y < canvas.height - paddleHeight) player2Y += 5;
            ballX += ballSpeedX;
            ballY += ballSpeedY;
            if (ballY <= 10 || ballY >= canvas.height - 10) ballSpeedY = -ballSpeedY;
            if (ballX <= 20 && ballY > player1Y && ballY < player1Y + paddleHeight) ballSpeedX = -ballSpeedX;
            if (ballX >= canvas.width - 20 && ballY > player2Y && ballY < player2Y + paddleHeight) ballSpeedX = -ballSpeedX;
            if (ballX < 0) {
                score2++;
                document.getElementById('score2').textContent = score2;
                resetBall();
            }
            if (ballX > canvas.width) {
                score1++;
                document.getElementById('score1').textContent = score1;
                resetBall();
            }
        }
        function resetBall() {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            ballSpeedX = -ballSpeedX;
        }
        setInterval(draw, 1000 / 60);
    </script>
</body>
</html>`
  },
  {
    id: 4,
    title: 'Memory Match',
    description: 'Create a memory card matching game',
    icon: '🧩',
    skills: ['Logic', 'Animation', 'Pairs'],
    fileName: 'memory-game.html',
    instructions: 'Build a memory matching game! Click cards to flip them and find matching pairs!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Memory Match</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            color: #667eea;
            font-size: 2.5rem;
        }
        .stats {
            background: white;
            padding: 15px;
            border-radius: 15px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-around;
        }
        .stat {
            font-size: 1.2rem;
            font-weight: bold;
            color: #667eea;
        }
        .game-board {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }
        .card {
            aspect-ratio: 1;
            background: white;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .card:hover {
            transform: translateY(-5px);
        }
        .card.flipped {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card.matched {
            opacity: 0.5;
            pointer-events: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧩 Memory Match</h1>
        <div class="stats">
            <div>Moves: <span class="stat" id="moves">0</span></div>
            <div>Matches: <span class="stat" id="matches">0</span></div>
        </div>
        <div class="game-board" id="board"></div>
    </div>
    <script>
        const emojis = ['🎮', '🎨', '🎭', '🎪', '🎯', '🎸', '🎺', '🎻'];
        const cards = [...emojis, ...emojis];
        let flippedCards = [];
        let matchedPairs = 0;
        let moves = 0;
        cards.sort(() => Math.random() - 0.5);
        const board = document.getElementById('board');
        cards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.emoji = emoji;
            card.dataset.index = index;
            card.textContent = '?';
            card.onclick = () => flipCard(card);
            board.appendChild(card);
        });
        function flipCard(card) {
            if (flippedCards.length === 2 || card.classList.contains('flipped')) return;
            card.classList.add('flipped');
            card.textContent = card.dataset.emoji;
            flippedCards.push(card);
            if (flippedCards.length === 2) {
                moves++;
                document.getElementById('moves').textContent = moves;
                setTimeout(checkMatch, 1000);
            }
        }
        function checkMatch() {
            const [card1, card2] = flippedCards;
            if (card1.dataset.emoji === card2.dataset.emoji) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                document.getElementById('matches').textContent = matchedPairs;
                if (matchedPairs === emojis.length) {
                    setTimeout(() => alert('You won in ' + moves + ' moves!'), 500);
                }
            } else {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?';
                card2.textContent = '?';
            }
            flippedCards = [];
        }
    </script>
</body>
</html>`
  },
  {
    id: 5,
    title: 'Space Shooter',
    description: 'Build a space shooter with enemies and power-ups',
    icon: '🚀',
    skills: ['Sprites', 'Bullets', 'Enemies'],
    fileName: 'space-shooter.html',
    instructions: 'Create a space shooter game! Use arrow keys to move and spacebar to shoot. Destroy all enemies!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Space Shooter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #000;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        h1 {
            color: white;
            font-size: 2.5rem;
        }
        .score {
            background: white;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.5rem;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 20px;
        }
        canvas {
            border: 3px solid #667eea;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }
    </style>
</head>
<body>
    <h1>🚀 Space Shooter</h1>
    <div class="score">Score: <span id="score">0</span></div>
    <canvas id="gameCanvas" width="600" height="400"></canvas>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        let player = { x: 280, y: 350, width: 40, height: 40 };
        let bullets = [];
        let enemies = [];
        let score = 0;
        let keys = {};
        document.addEventListener('keydown', (e) => {
            keys[e.key] = true;
            if (e.key === ' ') {
                bullets.push({ x: player.x + 15, y: player.y, width: 10, height: 20 });
            }
        });
        document.addEventListener('keyup', (e) => keys[e.key] = false);
        function spawnEnemy() {
            enemies.push({ x: Math.random() * (canvas.width - 40), y: -40, width: 40, height: 40 });
        }
        setInterval(spawnEnemy, 2000);
        function draw() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = '30px Arial';
            ctx.fillText('🚀', player.x, player.y + 30);
            if (keys['ArrowLeft'] && player.x > 0) player.x -= 5;
            if (keys['ArrowRight'] && player.x < canvas.width - 40) player.x += 5;
            ctx.fillStyle = '#4ecdc4';
            bullets.forEach((bullet, i) => {
                bullet.y -= 8;
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                if (bullet.y < 0) bullets.splice(i, 1);
            });
            ctx.font = '35px Arial';
            enemies.forEach((enemy, i) => {
                enemy.y += 2;
                ctx.fillText('👾', enemy.x, enemy.y + 30);
                if (enemy.y > canvas.height) {
                    enemies.splice(i, 1);
                    score = Math.max(0, score - 10);
                    document.getElementById('score').textContent = score;
                }
                bullets.forEach((bullet, j) => {
                    if (bullet.x < enemy.x + enemy.width && bullet.x + bullet.width > enemy.x &&
                        bullet.y < enemy.y + enemy.height && bullet.y + bullet.height > enemy.y) {
                        enemies.splice(i, 1);
                        bullets.splice(j, 1);
                        score += 10;
                        document.getElementById('score').textContent = score;
                    }
                });
            });
        }
        setInterval(draw, 1000 / 60);
    </script>
</body>
</html>`
  },
  {
    id: 6,
    title: 'Endless Runner',
    description: 'Create an infinite runner with obstacles',
    icon: '🏃',
    skills: ['Scrolling', 'Jump', 'Obstacles'],
    fileName: 'runner-game.html',
    instructions: 'Build an endless runner game! Press spacebar to jump over obstacles. How far can you go?',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Endless Runner</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #ff9a56 0%, #ff6b95 100%);
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        h1 {
            color: white;
            font-size: 2.5rem;
        }
        .score {
            background: white;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.5rem;
            font-weight: bold;
            color: #ff6b95;
            margin-bottom: 20px;
        }
        canvas {
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .instructions {
            color: white;
            margin-top: 15px;
            font-size: 1.1rem;
        }
    </style>
</head>
<body>
    <h1>🏃 Endless Runner</h1>
    <div class="score">Score: <span id="score">0</span></div>
    <canvas id="gameCanvas" width="600" height="300"></canvas>
    <div class="instructions">Press SPACEBAR to Jump</div>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        let player = { x: 50, y: 200, width: 40, height: 40, velocityY: 0, jumping: false };
        let obstacles = [];
        let score = 0;
        let gameSpeed = 5;
        let gravity = 0.6;
        let gameOver = false;
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !player.jumping) {
                player.velocityY = -12;
                player.jumping = true;
            }
            if (gameOver && e.code === 'Space') location.reload();
        });
        function spawnObstacle() {
            if (!gameOver) {
                obstacles.push({ x: canvas.width, y: 220, width: 30, height: 50 });
                setTimeout(spawnObstacle, Math.random() * 2000 + 1500);
            }
        }
        setTimeout(spawnObstacle, 2000);
        function draw() {
            if (gameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'white';
                ctx.font = '40px Arial';
                ctx.fillText('Game Over!', 200, 120);
                ctx.font = '25px Arial';
                ctx.fillText('Score: ' + score, 240, 160);
                ctx.fillText('Press SPACE to Restart', 160, 200);
                return;
            }
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, canvas.width, 200);
            ctx.fillStyle = '#90EE90';
            ctx.fillRect(0, 240, canvas.width, 60);
            player.velocityY += gravity;
            player.y += player.velocityY;
            if (player.y >= 200) {
                player.y = 200;
                player.velocityY = 0;
                player.jumping = false;
            }
            ctx.font = '35px Arial';
            ctx.fillText('🏃', player.x, player.y + 35);
            ctx.fillStyle = '#ff6b6b';
            obstacles.forEach((obs, i) => {
                obs.x -= gameSpeed;
                ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                if (obs.x + obs.width < 0) {
                    obstacles.splice(i, 1);
                    score += 10;
                    document.getElementById('score').textContent = score;
                }
                if (player.x < obs.x + obs.width && player.x + player.width > obs.x &&
                    player.y < obs.y + obs.height && player.y + player.height > obs.y) {
                    gameOver = true;
                }
            });
        }
        setInterval(draw, 1000 / 60);
    </script>
</body>
</html>`
  },
  {
    id: 7,
    title: 'Puzzle Platformer',
    description: 'Build a puzzle-based platform game',
    icon: '🎲',
    skills: ['Platforms', 'Puzzles', 'Gravity'],
    fileName: 'platformer.html',
    instructions: 'Create a platformer game! Use arrow keys to move and spacebar to jump. Collect all stars to win!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Puzzle Platformer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        h1 {
            color: white;
            font-size: 2.5rem;
        }
        .stats {
            background: white;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.2rem;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 20px;
        }
        canvas {
            background: #87CEEB;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .controls {
            color: white;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <h1>🎲 Puzzle Platformer</h1>
    <div class="stats">Stars: <span id="stars">0</span> / 3</div>
    <canvas id="gameCanvas" width="600" height="400"></canvas>
    <div class="controls">Arrow Keys: Move | Space: Jump</div>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        let player = { x: 50, y: 300, width: 30, height: 30, velocityY: 0, onGround: false };
        let platforms = [
            { x: 0, y: 370, width: 200, height: 30 },
            { x: 250, y: 320, width: 150, height: 30 },
            { x: 450, y: 270, width: 150, height: 30 },
            { x: 0, y: 200, width: 100, height: 30 }
        ];
        let stars = [
            { x: 300, y: 280, collected: false },
            { x: 500, y: 230, collected: false },
            { x: 40, y: 160, collected: false }
        ];
        let keys = {};
        let gravity = 0.5;
        let starsCollected = 0;
        document.addEventListener('keydown', (e) => {
            keys[e.key] = true;
            if (e.code === 'Space' && player.onGround) {
                player.velocityY = -12;
            }
        });
        document.addEventListener('keyup', (e) => keys[e.key] = false);
        function draw() {
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#8B4513';
            platforms.forEach(platform => {
                ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            });
            ctx.font = '25px Arial';
            stars.forEach(star => {
                if (!star.collected) {
                    ctx.fillText('⭐', star.x, star.y + 20);
                }
            });
            if (keys['ArrowLeft']) player.x -= 4;
            if (keys['ArrowRight']) player.x += 4;
            player.velocityY += gravity;
            player.y += player.velocityY;
            player.onGround = false;
            platforms.forEach(platform => {
                if (player.x < platform.x + platform.width && player.x + player.width > platform.x &&
                    player.y + player.height >= platform.y && player.y + player.height <= platform.y + 15) {
                    player.y = platform.y - player.height;
                    player.velocityY = 0;
                    player.onGround = true;
                }
            });
            if (player.y > canvas.height) {
                player.x = 50;
                player.y = 300;
                player.velocityY = 0;
            }
            ctx.fillStyle = '#ff6b6b';
            ctx.fillRect(player.x, player.y, player.width, player.height);
            stars.forEach(star => {
                if (!star.collected && player.x < star.x + 20 && player.x + player.width > star.x &&
                    player.y < star.y + 20 && player.y + player.height > star.y) {
                    star.collected = true;
                    starsCollected++;
                    document.getElementById('stars').textContent = starsCollected;
                    if (starsCollected === 3) {
                        setTimeout(() => alert('You won! All stars collected!'), 100);
                    }
                }
            });
        }
        setInterval(draw, 1000 / 60);
    </script>
</body>
</html>`
  },
  {
    id: 8,
    title: 'Battle Arena',
    description: 'Create a simple battle game with health and attacks',
    icon: '⚔️',
    skills: ['Combat', 'Health', 'AI'],
    fileName: 'battle-game.html',
    instructions: 'Build a turn-based battle game! Choose your attack and defeat the enemy!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Battle Arena</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .arena {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            text-align: center;
            color: #ff6b6b;
            font-size: 2.5rem;
        }
        .fighters {
            display: flex;
            justify-content: space-around;
            margin: 40px 0;
        }
        .fighter {
            text-align: center;
        }
        .fighter-icon {
            font-size: 5rem;
            margin-bottom: 10px;
        }
        .health-bar {
            width: 200px;
            height: 30px;
            background: #f0f0f0;
            border-radius: 15px;
            overflow: hidden;
            margin: 10px auto;
        }
        .health {
            height: 100%;
            background: linear-gradient(90deg, #4ecdc4, #44a08d);
            transition: width 0.3s;
        }
        .health-text {
            font-weight: bold;
            color: #333;
        }
        .actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
        }
        .action-btn {
            background: linear-gradient(135deg, #ff6b6b, #c92a2a);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        .action-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
        }
        .log {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
            margin-top: 30px;
            min-height: 100px;
            max-height: 150px;
            overflow-y: auto;
        }
        .log-entry {
            margin: 5px 0;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="arena">
        <h1>⚔️ Battle Arena</h1>
        <div class="fighters">
            <div class="fighter">
                <div class="fighter-icon">🛡️</div>
                <h3>You</h3>
                <div class="health-bar">
                    <div class="health" id="playerHealth" style="width: 100%"></div>
                </div>
                <div class="health-text"><span id="playerHP">100</span> / 100 HP</div>
            </div>
            <div class="fighter">
                <div class="fighter-icon">👹</div>
                <h3>Enemy</h3>
                <div class="health-bar">
                    <div class="health" id="enemyHealth" style="width: 100%"></div>
                </div>
                <div class="health-text"><span id="enemyHP">100</span> / 100 HP</div>
            </div>
        </div>
        <div class="actions">
            <button class="action-btn" onclick="attack('light')">⚔️ Light Attack (15-25)</button>
            <button class="action-btn" onclick="attack('heavy')">💥 Heavy Attack (25-40)</button>
            <button class="action-btn" onclick="heal()">💚 Heal (20-30)</button>
        </div>
        <div class="log" id="log"></div>
    </div>
    <script>
        let playerHP = 100;
        let enemyHP = 100;
        function log(message) {
            const logDiv = document.getElementById('log');
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.textContent = message;
            logDiv.insertBefore(entry, logDiv.firstChild);
        }
        function attack(type) {
            const damage = type === 'light' ? Math.floor(Math.random() * 11) + 15 : Math.floor(Math.random() * 16) + 25;
            enemyHP = Math.max(0, enemyHP - damage);
            updateHealth();
            log('You dealt ' + damage + ' damage!');
            if (enemyHP === 0) {
                setTimeout(() => alert('You won!'), 100);
                return;
            }
            setTimeout(enemyTurn, 1000);
        }
        function heal() {
            const healAmount = Math.floor(Math.random() * 11) + 20;
            playerHP = Math.min(100, playerHP + healAmount);
            updateHealth();
            log('You healed for ' + healAmount + ' HP!');
            setTimeout(enemyTurn, 1000);
        }
        function enemyTurn() {
            const damage = Math.floor(Math.random() * 16) + 15;
            playerHP = Math.max(0, playerHP - damage);
            updateHealth();
            log('Enemy dealt ' + damage + ' damage!');
            if (playerHP === 0) {
                setTimeout(() => alert('Game Over!'), 100);
            }
        }
        function updateHealth() {
            document.getElementById('playerHP').textContent = playerHP;
            document.getElementById('enemyHP').textContent = enemyHP;
            document.getElementById('playerHealth').style.width = playerHP + '%';
            document.getElementById('enemyHealth').style.width = enemyHP + '%';
        }
    </script>
</body>
</html>`
  },
  {
    id: 9,
    title: 'Racing Game',
    description: 'Build a top-down racing game with tracks',
    icon: '🏆',
    skills: ['Racing', 'Laps', 'Time Trial'],
    fileName: 'racing-game.html',
    instructions: 'Create a racing game! Use arrow keys to drive your car. Complete laps as fast as possible!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Racing Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        h1 {
            color: white;
            font-size: 2.5rem;
        }
        .stats {
            display: flex;
            gap: 30px;
            margin-bottom: 20px;
        }
        .stat {
            background: white;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.2rem;
            font-weight: bold;
            color: #19547b;
        }
        canvas {
            background: #90EE90;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .controls {
            color: white;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <h1>🏆 Racing Game</h1>
    <div class="stats">
        <div class="stat">Lap: <span id="lap">1</span> / 3</div>
        <div class="stat">Time: <span id="time">0</span>s</div>
    </div>
    <canvas id="gameCanvas" width="600" height="400"></canvas>
    <div class="controls">Arrow Keys to Drive</div>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        let car = { x: 100, y: 200, width: 30, height: 40, angle: 0, speed: 0 };
        let keys = {};
        let lap = 1;
        let startTime = Date.now();
        let checkpointPassed = false;
        document.addEventListener('keydown', (e) => keys[e.key] = true);
        document.addEventListener('keyup', (e) => keys[e.key] = false);
        function draw() {
            ctx.fillStyle = '#90EE90';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#808080';
            ctx.fillRect(50, 50, 500, 300);
            ctx.fillStyle = '#90EE90';
            ctx.fillRect(100, 100, 400, 200);
            ctx.fillStyle = 'white';
            ctx.fillRect(50, 180, 100, 40);
            ctx.fillStyle = 'red';
            ctx.fillRect(50, 180, 10, 40);
            ctx.fillStyle = 'yellow';
            ctx.fillRect(300, 50, 10, 100);
            if (keys['ArrowUp']) car.speed = Math.min(5, car.speed + 0.2);
            if (keys['ArrowDown']) car.speed = Math.max(-3, car.speed - 0.2);
            if (keys['ArrowLeft']) car.angle -= 0.05;
            if (keys['ArrowRight']) car.angle += 0.05;
            car.speed *= 0.98;
            car.x += Math.sin(car.angle) * car.speed;
            car.y -= Math.cos(car.angle) * car.speed;
            if (car.x < 50 || car.x > 550 || car.y < 50 || car.y > 350) {
                if (!(car.x > 100 && car.x < 500 && car.y > 100 && car.y < 300)) {
                    car.speed *= 0.5;
                }
            }
            ctx.save();
            ctx.translate(car.x, car.y);
            ctx.rotate(car.angle);
            ctx.fillStyle = '#ff6b6b';
            ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
            ctx.restore();
            if (car.x > 300 && car.x < 310 && car.y < 150) {
                checkpointPassed = true;
            }
            if (car.x < 150 && car.y > 180 && car.y < 220 && checkpointPassed) {
                lap++;
                checkpointPassed = false;
                document.getElementById('lap').textContent = lap;
                if (lap > 3) {
                    const finalTime = Math.floor((Date.now() - startTime) / 1000);
                    alert('Race Complete! Time: ' + finalTime + 's');
                    lap = 1;
                    startTime = Date.now();
                }
            }
            document.getElementById('time').textContent = Math.floor((Date.now() - startTime) / 1000);
        }
        setInterval(draw, 1000 / 60);
    </script>
</body>
</html>`
  },
  {
    id: 10,
    title: 'Your Dream Game',
    description: 'Combine everything: Create your own original game!',
    icon: '🌟',
    skills: ['Full Game', 'All Skills', 'Original'],
    fileName: 'dream-game.html',
    instructions: 'Your final project! Create a unique game combining all your skills. This example shows a multi-game arcade!',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Game Arcade</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
            color: white;
            font-size: 3rem;
            margin-bottom: 30px;
            text-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .games-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        .game-card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            transition: all 0.3s;
            cursor: pointer;
        }
        .game-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 50px rgba(0,0,0,0.3);
        }
        .game-icon {
            font-size: 5rem;
            margin-bottom: 20px;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
        }
        .game-card h2 {
            color: #667eea;
            font-size: 1.8rem;
            margin-bottom: 10px;
        }
        .game-card p {
            color: #666;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        .play-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: bold;
            margin-top: 20px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .play-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
        .stats {
            background: white;
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            text-align: center;
        }
        .stats h2 {
            color: #667eea;
            margin-bottom: 20px;
        }
        .score-display {
            font-size: 3rem;
            font-weight: bold;
            color: #764ba2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎮 Game Arcade</h1>
        <div class="stats">
            <h2>Total Score</h2>
            <div class="score-display" id="totalScore">0</div>
        </div>
        <div class="games-grid">
            <div class="game-card" onclick="playGame('puzzle')">
                <div class="game-icon">🧩</div>
                <h2>Puzzle Master</h2>
                <p>Test your brain with puzzles</p>
                <button class="play-btn">Play Now</button>
            </div>
            <div class="game-card" onclick="playGame('action')">
                <div class="game-icon">⚡</div>
                <h2>Action Hero</h2>
                <p>Fast-paced action game</p>
                <button class="play-btn">Play Now</button>
            </div>
            <div class="game-card" onclick="playGame('strategy')">
                <div class="game-icon">🎯</div>
                <h2>Strategy King</h2>
                <p>Plan your moves wisely</p>
                <button class="play-btn">Play Now</button>
            </div>
            <div class="game-card" onclick="playGame('adventure')">
                <div class="game-icon">🗺️</div>
                <h2>Adventure Quest</h2>
                <p>Explore new worlds</p>
                <button class="play-btn">Play Now</button>
            </div>
        </div>
    </div>
    <script>
        let totalScore = 0;
        function playGame(type) {
            const scores = {
                puzzle: Math.floor(Math.random() * 100) + 50,
                action: Math.floor(Math.random() * 150) + 100,
                strategy: Math.floor(Math.random() * 120) + 80,
                adventure: Math.floor(Math.random() * 200) + 150
            };
            const gameNames = {
                puzzle: 'Puzzle Master',
                action: 'Action Hero',
                strategy: 'Strategy King',
                adventure: 'Adventure Quest'
            };
            const earned = scores[type];
            totalScore += earned;
            document.getElementById('totalScore').textContent = totalScore;
            alert('You played ' + gameNames[type] + ' and earned ' + earned + ' points!');
        }
    </script>
</body>
</html>`
  }
];

