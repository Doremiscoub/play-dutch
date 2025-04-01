
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { colors, composedClasses } from '@/config/uiConfig';
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw, Share2, Volume2, VolumeX, X } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  lives: number;
  color: string;
  points: number;
  hit: boolean;
}

interface PowerUp {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'extraLife' | 'widePaddle' | 'slowBall' | 'multiBall';
  active: boolean;
  collected: boolean;
}

interface GameState {
  score: number;
  lives: number;
  level: number;
  paused: boolean;
  gameStarted: boolean;
  gameOver: boolean;
  soundEnabled: boolean;
}

const COLORS = [
  colors.dutchBlue,
  colors.dutchOrange,
  colors.dutchPurple,
  colors.dutchGreen,
  colors.dutchRed,
  colors.dutchYellow,
];

const BrickBreaker: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const navigate = useNavigate();
  
  // Game elements
  const [paddle, setPaddle] = useState({ x: 0, y: 0, width: 80, height: 12, dx: 8 });
  const [ball, setBall] = useState({ 
    x: 0, y: 0, radius: 8, dx: 4, dy: -4, 
    originalDx: 4, originalDy: -4 
  });
  const [bricks, setBricks] = useState<Brick[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [balls, setBalls] = useState<{ x: number, y: number, radius: number, dx: number, dy: number }[]>([]);
  
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    level: 1,
    paused: false,
    gameStarted: false,
    gameOver: false,
    soundEnabled: localStorage.getItem('dutch_sound_enabled') !== 'false'
  });
  
  // Game settings
  const brickRowCount = 5;
  const brickColumnCount = 9;
  const brickPadding = 10;
  const brickWidth = 60;
  const brickHeight = 20;
  const brickOffsetTop = 60;
  const brickOffsetLeft = 30;
  
  // Keyboard controls
  const [keys, setKeys] = useState({ left: false, right: false });
  
  // Touch controls
  const [touchX, setTouchX] = useState<number | null>(null);
  
  // Sounds
  const hitSound = useRef(new Audio('/sounds/brick-hit.mp3')).current;
  const paddleSound = useRef(new Audio('/sounds/paddle-hit.mp3')).current;
  const powerUpSound = useRef(new Audio('/sounds/powerup.mp3')).current;
  const gameOverSound = useRef(new Audio('/sounds/game-over.mp3')).current;
  const levelUpSound = useRef(new Audio('/sounds/level-up.mp3')).current;
  
  // Initialize the game
  useEffect(() => {
    hitSound.volume = 0.3;
    paddleSound.volume = 0.3;
    powerUpSound.volume = 0.4;
    gameOverSound.volume = 0.5;
    levelUpSound.volume = 0.5;
    
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Set canvas dimensions
        canvas.width = Math.min(window.innerWidth - 40, 600);
        canvas.height = Math.min(window.innerHeight - 200, 800);
        
        // Initialize paddle
        const paddleX = (canvas.width - paddle.width) / 2;
        const paddleY = canvas.height - paddle.height - 10;
        setPaddle(prev => ({ ...prev, x: paddleX, y: paddleY }));
        
        // Initialize ball
        const ballX = paddleX + paddle.width / 2;
        const ballY = paddleY - ball.radius;
        setBall(prev => ({ ...prev, x: ballX, y: ballY }));
        
        // Initialize bricks
        createBricks();
      }
    }
    
    // Keyboard event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  // Create bricks for the current level
  const createBricks = () => {
    const { level } = gameState;
    const newBricks: Brick[] = [];
    
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        
        // Add complexity based on level
        const lives = Math.min(Math.ceil(Math.random() * level), 3);
        const points = lives * 10;
        
        // Skip some bricks in higher levels for more complex patterns
        if (level > 1 && Math.random() > 0.8) continue;
        
        newBricks.push({
          x: brickX,
          y: brickY,
          width: brickWidth,
          height: brickHeight,
          lives,
          color: COLORS[(lives - 1) % COLORS.length],
          points,
          hit: false
        });
      }
    }
    
    setBricks(newBricks);
  };
  
  // Handle keyboard controls
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      setKeys(prev => ({ ...prev, left: true }));
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      setKeys(prev => ({ ...prev, right: true }));
    } else if (e.key === ' ' || e.key === 'Enter') {
      if (!gameState.gameStarted) {
        setGameState(prev => ({ ...prev, gameStarted: true }));
      } else if (!gameState.gameOver) {
        setGameState(prev => ({ ...prev, paused: !prev.paused }));
      } else {
        resetGame();
      }
    }
  };
  
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      setKeys(prev => ({ ...prev, left: false }));
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      setKeys(prev => ({ ...prev, right: false }));
    }
  };
  
  // Handle touch controls
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchX(touch.clientX);
    
    if (!gameState.gameStarted) {
      setGameState(prev => ({ ...prev, gameStarted: true }));
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchX === null || gameState.paused || !gameState.gameStarted || gameState.gameOver) return;
    
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const relativeX = touch.clientX - rect.left;
      
      if (relativeX > 0 && relativeX < canvas.width) {
        const newPaddleX = relativeX - paddle.width / 2;
        setPaddle(prev => ({ 
          ...prev, 
          x: Math.max(0, Math.min(canvas.width - paddle.width, newPaddleX)) 
        }));
      }
    }
    
    setTouchX(touch.clientX);
  };
  
  const handleTouchEnd = () => {
    setTouchX(null);
  };
  
  // Toggle sound
  const toggleSound = () => {
    setGameState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
    localStorage.setItem('dutch_sound_enabled', (!gameState.soundEnabled).toString());
  };
  
  // Share score
  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Dutch Breaker',
        text: `J'ai fait ${gameState.score} points au Dutch Breaker ! Niveau ${gameState.level}. Peux-tu faire mieux ?`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(
        `J'ai fait ${gameState.score} points au Dutch Breaker ! Niveau ${gameState.level}. Peux-tu faire mieux ?`
      ).then(() => {
        toast.success('Score copié dans le presse-papier !', { duration: 2000 });
      });
    }
  };
  
  // Reset game
  const resetGame = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      
      // Reset paddle
      const paddleX = (canvas.width - paddle.width) / 2;
      const paddleY = canvas.height - paddle.height - 10;
      setPaddle(prev => ({ ...prev, x: paddleX, y: paddleY }));
      
      // Reset ball
      const ballX = paddleX + paddle.width / 2;
      const ballY = paddleY - ball.radius;
      setBall(prev => ({ 
        ...prev, 
        x: ballX, 
        y: ballY, 
        dx: prev.originalDx, 
        dy: prev.originalDy 
      }));
      
      // Reset game state
      setGameState({
        score: 0,
        lives: 3,
        level: 1,
        paused: false,
        gameStarted: false,
        gameOver: false,
        soundEnabled: gameState.soundEnabled
      });
      
      // Reset bricks
      createBricks();
      
      // Reset power-ups
      setPowerUps([]);
      
      // Reset multi-balls
      setBalls([]);
    }
  };
  
  // Main game loop
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    const renderGame = () => {
      if (!gameState.gameStarted || gameState.paused || gameState.gameOver) {
        drawUI();
        requestRef.current = requestAnimationFrame(renderGame);
        return;
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Move paddle
      if (keys.left && !keys.right) {
        setPaddle(prev => ({
          ...prev,
          x: Math.max(0, prev.x - prev.dx)
        }));
      } else if (keys.right && !keys.left) {
        setPaddle(prev => ({
          ...prev,
          x: Math.min(canvas.width - prev.width, prev.x + prev.dx)
        }));
      }
      
      // Move the main ball if game is started
      if (gameState.gameStarted && !gameState.paused) {
        // Update ball position
        setBall(prev => ({
          ...prev,
          x: prev.x + prev.dx,
          y: prev.y + prev.dy
        }));
        
        // Move any additional balls
        if (balls.length > 0) {
          setBalls(prev => prev.map(b => ({
            ...b,
            x: b.x + b.dx,
            y: b.y + b.dy
          })));
        }
      }
      
      // Move power-ups
      setPowerUps(prev => 
        prev.map(p => {
          if (!p.collected && p.active) {
            return { ...p, y: p.y + 2 };
          }
          return p;
        })
      );
      
      // Check wall collisions for main ball
      checkWallCollision();
      
      // Check wall collisions for multi-balls
      if (balls.length > 0) {
        checkMultiBallsWallCollision();
      }
      
      // Check paddle collisions for main ball
      checkPaddleCollision();
      
      // Check paddle collisions for multi-balls
      if (balls.length > 0) {
        checkMultiBallsPaddleCollision();
      }
      
      // Check brick collisions for main ball
      checkBrickCollision();
      
      // Check brick collisions for multi-balls
      if (balls.length > 0) {
        checkMultiBallsBrickCollision();
      }
      
      // Check power-up collisions
      checkPowerUpCollision();
      
      // Draw game elements
      drawBricks();
      drawPaddle();
      drawBall();
      drawMultiBalls();
      drawPowerUps();
      drawUI();
      
      // Continue the game loop
      requestRef.current = requestAnimationFrame(renderGame);
    };
    
    // Draw the paddle
    const drawPaddle = () => {
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 6);
      ctx.fillStyle = colors.dutchBlue;
      ctx.fill();
      ctx.closePath();
      
      // Add a glossy effect
      const gradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x, paddle.y + paddle.height);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height / 2, 6);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.closePath();
    };
    
    // Draw the ball
    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = colors.dutchOrange;
      ctx.fill();
      ctx.closePath();
      
      // Add a shiny effect
      ctx.beginPath();
      ctx.arc(ball.x - ball.radius / 3, ball.y - ball.radius / 3, ball.radius / 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
      ctx.closePath();
    };
    
    // Draw multiple balls
    const drawMultiBalls = () => {
      balls.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.dutchPurple;
        ctx.fill();
        ctx.closePath();
        
        // Add a shiny effect
        ctx.beginPath();
        ctx.arc(b.x - b.radius / 3, b.y - b.radius / 3, b.radius / 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
        ctx.closePath();
      });
    };
    
    // Draw the bricks
    const drawBricks = () => {
      bricks.forEach(brick => {
        if (brick.lives <= 0) return;
        
        ctx.beginPath();
        ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 4);
        ctx.fillStyle = brick.color;
        ctx.fill();
        ctx.closePath();
        
        // Add a glossy effect for the bricks
        const gradient = ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + brick.height);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.roundRect(brick.x, brick.y, brick.width, brick.height / 2, 4);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
        
        // Display lives on the brick if greater than 1
        if (brick.lives > 1) {
          ctx.font = 'bold 10px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText(brick.lives.toString(), brick.x + brick.width / 2, brick.y + brick.height / 2 + 3);
        }
      });
    };
    
    // Draw power-ups
    const drawPowerUps = () => {
      powerUps.forEach(powerUp => {
        if (powerUp.collected || !powerUp.active) return;
        
        let color = colors.dutchGreen;
        let text = '+';
        
        switch (powerUp.type) {
          case 'extraLife':
            color = colors.dutchRed;
            text = '❤️';
            break;
          case 'widePaddle':
            color = colors.dutchBlue;
            text = '↔️';
            break;
          case 'slowBall':
            color = colors.dutchYellow;
            text = '🐢';
            break;
          case 'multiBall':
            color = colors.dutchPurple;
            text = '🔄';
            break;
        }
        
        ctx.beginPath();
        ctx.roundRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height, 4);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(text, powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2 + 5);
      });
    };
    
    // Draw UI elements
    const drawUI = () => {
      // Draw score
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = colors.dutchBlue;
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${gameState.score}`, 10, 25);
      
      // Draw lives
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = colors.dutchRed;
      ctx.textAlign = 'right';
      ctx.fillText(`♥ ${gameState.lives}`, canvas.width - 10, 25);
      
      // Draw level
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = colors.dutchPurple;
      ctx.textAlign = 'center';
      ctx.fillText(`Niveau ${gameState.level}`, canvas.width / 2, 25);
      
      // Draw start message
      if (!gameState.gameStarted) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = colors.dutchYellow;
        ctx.textAlign = 'center';
        ctx.fillText('DUTCH BREAKER', canvas.width / 2, canvas.height / 2 - 40);
        
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Touchez l\'écran ou appuyez sur ESPACE pour commencer', canvas.width / 2, canvas.height / 2);
        
        ctx.font = '14px Arial';
        ctx.fillStyle = colors.dutchOrange;
        ctx.fillText('Utilisez les flèches ou le tactile pour déplacer', canvas.width / 2, canvas.height / 2 + 30);
      }
      
      // Draw pause message
      if (gameState.paused && gameState.gameStarted) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = colors.dutchYellow;
        ctx.textAlign = 'center';
        ctx.fillText('PAUSE', canvas.width / 2, canvas.height / 2);
        
        ctx.font = '16px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Appuyez sur ESPACE pour continuer', canvas.width / 2, canvas.height / 2 + 30);
      }
      
      // Draw game over message
      if (gameState.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = colors.dutchRed;
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 50);
        
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = colors.dutchYellow;
        ctx.fillText(`Score final: ${gameState.score}`, canvas.width / 2, canvas.height / 2);
        
        ctx.font = '16px Arial';
        ctx.fillStyle = colors.dutchBlue;
        ctx.fillText(`Niveau atteint: ${gameState.level}`, canvas.width / 2, canvas.height / 2 + 30);
        
        ctx.font = '14px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Appuyez sur ESPACE pour rejouer', canvas.width / 2, canvas.height / 2 + 60);
      }
    };
    
    // Check wall collisions for the main ball
    const checkWallCollision = () => {
      // Horizontal walls
      if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        setBall(prev => ({ ...prev, dx: -prev.dx }));
        if (gameState.soundEnabled) {
          hitSound.play().catch(e => console.error(e));
        }
      }
      
      // Top wall
      if (ball.y + ball.dy < ball.radius) {
        setBall(prev => ({ ...prev, dy: -prev.dy }));
        if (gameState.soundEnabled) {
          hitSound.play().catch(e => console.error(e));
        }
      }
      
      // Bottom wall (lose a life)
      if (ball.y + ball.dy > canvas.height - ball.radius) {
        // Lose a life
        setGameState(prev => {
          const newLives = prev.lives - 1;
          
          // Check if game over
          if (newLives <= 0) {
            if (gameState.soundEnabled) {
              gameOverSound.play().catch(e => console.error(e));
            }
            return { ...prev, lives: 0, gameOver: true };
          }
          
          return { ...prev, lives: newLives };
        });
        
        // Reset ball position
        const paddleX = paddle.x + paddle.width / 2;
        setBall(prev => ({ 
          ...prev, 
          x: paddleX, 
          y: paddle.y - ball.radius,
          dx: prev.originalDx * (Math.random() > 0.5 ? 1 : -1),
          dy: prev.originalDy
        }));
        
        // Reset paddle on life loss
        setPaddle(prev => ({
          ...prev,
          width: 80 // Reset to default width
        }));
        
        // Clear power-ups
        setPowerUps([]);
        
        // Clear multi-balls
        setBalls([]);
      }
    };
    
    // Check wall collisions for multi-balls
    const checkMultiBallsWallCollision = () => {
      setBalls(prev => prev.filter(b => {
        // Horizontal walls
        if (b.x + b.dx > canvas.width - b.radius || b.x + b.dx < b.radius) {
          b.dx = -b.dx;
          if (gameState.soundEnabled) {
            hitSound.play().catch(e => console.error(e));
          }
        }
        
        // Top wall
        if (b.y + b.dy < b.radius) {
          b.dy = -b.dy;
          if (gameState.soundEnabled) {
            hitSound.play().catch(e => console.error(e));
          }
        }
        
        // Bottom wall (remove the ball)
        if (b.y + b.dy > canvas.height - b.radius) {
          return false; // Remove this ball
        }
        
        return true; // Keep this ball
      }));
    };
    
    // Check paddle collision for the main ball
    const checkPaddleCollision = () => {
      if (
        ball.y + ball.radius > paddle.y &&
        ball.y - ball.radius < paddle.y + paddle.height &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
      ) {
        // Calculate bounce angle based on where the ball hit the paddle
        const hitPoint = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
        const angle = hitPoint * (Math.PI / 3); // Max 60 degrees
        
        const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
        setBall(prev => ({ 
          ...prev, 
          dy: -Math.abs(prev.dy), // Always bounce up
          dx: speed * Math.sin(angle) // Angle based on hit position
        }));
        
        if (gameState.soundEnabled) {
          paddleSound.play().catch(e => console.error(e));
        }
      }
    };
    
    // Check paddle collision for multi-balls
    const checkMultiBallsPaddleCollision = () => {
      setBalls(prev => prev.map(b => {
        if (
          b.y + b.radius > paddle.y &&
          b.y - b.radius < paddle.y + paddle.height &&
          b.x > paddle.x &&
          b.x < paddle.x + paddle.width
        ) {
          // Calculate bounce angle based on where the ball hit the paddle
          const hitPoint = (b.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
          const angle = hitPoint * (Math.PI / 3); // Max 60 degrees
          
          const speed = Math.sqrt(b.dx * b.dx + b.dy * b.dy);
          b.dy = -Math.abs(b.dy); // Always bounce up
          b.dx = speed * Math.sin(angle); // Angle based on hit position
          
          if (gameState.soundEnabled) {
            paddleSound.play().catch(e => console.error(e));
          }
        }
        
        return b;
      }));
    };
    
    // Check brick collision for the main ball
    const checkBrickCollision = () => {
      let hitBrick = false;
      
      setBricks(prev => prev.map(brick => {
        if (brick.lives <= 0) return brick;
        
        if (
          ball.x + ball.radius > brick.x &&
          ball.x - ball.radius < brick.x + brick.width &&
          ball.y + ball.radius > brick.y &&
          ball.y - ball.radius < brick.y + brick.height
        ) {
          // Determine which side of the brick was hit
          const ballBottom = ball.y + ball.radius;
          const ballTop = ball.y - ball.radius;
          const ballLeft = ball.x - ball.radius;
          const ballRight = ball.x + ball.radius;
          
          const brickBottom = brick.y + brick.height;
          const brickTop = brick.y;
          const brickLeft = brick.x;
          const brickRight = brick.x + brick.width;
          
          // Calculate overlap on each side
          const bottomOverlap = ballBottom - brickTop;
          const topOverlap = brickBottom - ballTop;
          const leftOverlap = brickRight - ballLeft;
          const rightOverlap = ballRight - brickLeft;
          
          // Find the smallest overlap to determine collision side
          const min = Math.min(bottomOverlap, topOverlap, leftOverlap, rightOverlap);
          
          if (min === bottomOverlap || min === topOverlap) {
            // Top or bottom collision, reverse vertical direction
            setBall(prev => ({ ...prev, dy: -prev.dy }));
          } else {
            // Left or right collision, reverse horizontal direction
            setBall(prev => ({ ...prev, dx: -prev.dx }));
          }
          
          // Mark the brick as hit
          hitBrick = true;
          const newLives = brick.lives - 1;
          
          // Update score
          setGameState(prev => ({ ...prev, score: prev.score + brick.points }));
          
          // Check for power-up generation (15% chance on brick destroy)
          if (newLives <= 0 && Math.random() < 0.15) {
            generatePowerUp(brick);
          }
          
          // Play sound
          if (gameState.soundEnabled) {
            hitSound.play().catch(e => console.error(e));
          }
          
          return {
            ...brick,
            lives: newLives,
            hit: true,
            color: newLives > 0 ? COLORS[(newLives - 1) % COLORS.length] : brick.color
          };
        }
        
        return brick;
      }));
      
      // Check if all bricks are destroyed
      if (hitBrick && bricks.filter(b => b.lives > 0).length <= 1) {
        // Level completed!
        setGameState(prev => ({ ...prev, level: prev.level + 1 }));
        
        // Reset ball position
        const paddleX = paddle.x + paddle.width / 2;
        setBall(prev => ({ 
          ...prev, 
          x: paddleX, 
          y: paddle.y - ball.radius,
          // Increase ball speed slightly for higher levels
          dx: prev.originalDx * (1 + gameState.level * 0.05) * (Math.random() > 0.5 ? 1 : -1),
          dy: prev.originalDy * (1 + gameState.level * 0.05)
        }));
        
        // Create new bricks for the next level
        createBricks();
        
        // Reset paddle on new level
        setPaddle(prev => ({
          ...prev,
          width: 80 // Reset to default width
        }));
        
        // Clear power-ups
        setPowerUps([]);
        
        // Clear multi-balls
        setBalls([]);
        
        // Play level up sound
        if (gameState.soundEnabled) {
          levelUpSound.play().catch(e => console.error(e));
        }
        
        // Give an extra life every 3 levels
        if (gameState.level % 3 === 0) {
          setGameState(prev => ({ ...prev, lives: prev.lives + 1 }));
          toast.success('Vie bonus !', { duration: 2000 });
        }
      }
    };
    
    // Check brick collision for multi-balls
    const checkMultiBallsBrickCollision = () => {
      setBalls(prev => prev.map(b => {
        setBricks(bricks.map(brick => {
          if (brick.lives <= 0) return brick;
          
          if (
            b.x + b.radius > brick.x &&
            b.x - b.radius < brick.x + brick.width &&
            b.y + b.radius > brick.y &&
            b.y - b.radius < brick.y + brick.height
          ) {
            // Determine which side of the brick was hit
            const ballBottom = b.y + b.radius;
            const ballTop = b.y - b.radius;
            const ballLeft = b.x - b.radius;
            const ballRight = b.x + b.radius;
            
            const brickBottom = brick.y + brick.height;
            const brickTop = brick.y;
            const brickLeft = brick.x;
            const brickRight = brick.x + brick.width;
            
            // Calculate overlap on each side
            const bottomOverlap = ballBottom - brickTop;
            const topOverlap = brickBottom - ballTop;
            const leftOverlap = brickRight - ballLeft;
            const rightOverlap = ballRight - brickLeft;
            
            // Find the smallest overlap to determine collision side
            const min = Math.min(bottomOverlap, topOverlap, leftOverlap, rightOverlap);
            
            if (min === bottomOverlap || min === topOverlap) {
              // Top or bottom collision, reverse vertical direction
              b.dy = -b.dy;
            } else {
              // Left or right collision, reverse horizontal direction
              b.dx = -b.dx;
            }
            
            // Update score
            setGameState(prev => ({ ...prev, score: prev.score + brick.points }));
            
            // Update brick lives
            const newLives = brick.lives - 1;
            
            // Check for power-up generation (15% chance on brick destroy)
            if (newLives <= 0 && Math.random() < 0.15) {
              generatePowerUp(brick);
            }
            
            // Play sound
            if (gameState.soundEnabled) {
              hitSound.play().catch(e => console.error(e));
            }
            
            return {
              ...brick,
              lives: newLives,
              hit: true,
              color: newLives > 0 ? COLORS[(newLives - 1) % COLORS.length] : brick.color
            };
          }
          
          return brick;
        }));
        
        return b;
      }));
    };
    
    // Generate a power-up
    const generatePowerUp = (brick: Brick) => {
      const types: ('extraLife' | 'widePaddle' | 'slowBall' | 'multiBall')[] = [
        'extraLife', 'widePaddle', 'slowBall', 'multiBall'
      ];
      
      const type = types[Math.floor(Math.random() * types.length)];
      
      setPowerUps(prev => [
        ...prev,
        {
          x: brick.x + brick.width / 2 - 10,
          y: brick.y,
          width: 20,
          height: 20,
          type,
          active: true,
          collected: false
        }
      ]);
    };
    
    // Check power-up collision with paddle
    const checkPowerUpCollision = () => {
      setPowerUps(prev => prev.map(p => {
        if (p.collected || !p.active) return p;
        
        // Check if power-up is off-screen
        if (p.y > canvas.height) {
          return { ...p, active: false };
        }
        
        // Check if power-up collides with paddle
        if (
          p.y + p.height > paddle.y &&
          p.y < paddle.y + paddle.height &&
          p.x + p.width > paddle.x &&
          p.x < paddle.x + paddle.width
        ) {
          // Apply power-up effect
          applyPowerUp(p.type);
          
          // Play power-up sound
          if (gameState.soundEnabled) {
            powerUpSound.play().catch(e => console.error(e));
          }
          
          return { ...p, collected: true, active: false };
        }
        
        return p;
      }));
    };
    
    // Apply power-up effects
    const applyPowerUp = (type: PowerUp['type']) => {
      switch (type) {
        case 'extraLife':
          setGameState(prev => ({ ...prev, lives: prev.lives + 1 }));
          toast.success('Vie bonus !', { duration: 2000 });
          break;
        case 'widePaddle':
          setPaddle(prev => ({ ...prev, width: prev.width + 30 }));
          toast.success('Raquette élargie !', { duration: 2000 });
          break;
        case 'slowBall':
          setBall(prev => ({ 
            ...prev, 
            dx: prev.dx * 0.7, 
            dy: prev.dy * 0.7 
          }));
          toast.success('Balle ralentie !', { duration: 2000 });
          break;
        case 'multiBall':
          // Add two new balls
          const angle1 = Math.PI / 4; // 45 degrees
          const angle2 = -Math.PI / 4; // -45 degrees
          const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
          
          setBalls(prev => [
            ...prev,
            {
              x: ball.x,
              y: ball.y,
              radius: ball.radius,
              dx: speed * Math.sin(angle1),
              dy: -speed * Math.cos(angle1)
            },
            {
              x: ball.x,
              y: ball.y,
              radius: ball.radius,
              dx: speed * Math.sin(angle2),
              dy: -speed * Math.cos(angle2)
            }
          ]);
          
          toast.success('Multi balles !', { duration: 2000 });
          break;
      }
    };
    
    // Start the game loop
    renderGame();
    
    // Cleanup on unmount
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameState.gameStarted, gameState.paused, gameState.gameOver, keys]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 relative pt-6 pb-16">
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md mx-auto px-4 mb-4 flex items-center justify-between"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <X className="h-5 w-5" />
        </Button>
        
        <h1 className="text-xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-orange bg-clip-text text-transparent">
          Dutch Breaker
        </h1>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSound}
          className="rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          {gameState.soundEnabled ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </Button>
      </motion.div>
      
      {/* Game canvas */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-2xl overflow-hidden border-2 border-dutch-blue/30 shadow-2xl"
      >
        <canvas
          ref={canvasRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="bg-gray-800 rounded-xl"
        ></canvas>
      </motion.div>
      
      {/* Controls */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-4 mt-6 items-center justify-center w-full max-w-md mx-auto px-4"
      >
        <Button
          variant="dutch-glass" 
          size="icon"
          className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 w-14 h-14"
          onTouchStart={() => setKeys(prev => ({ ...prev, left: true }))}
          onTouchEnd={() => setKeys(prev => ({ ...prev, left: false }))}
          onClick={() => {}}
        >
          <ArrowLeft className="h-6 w-6 text-white" />
        </Button>
        
        <Button
          variant="dutch-glass" 
          size="icon"
          className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 w-14 h-14"
          onClick={() => {
            if (!gameState.gameStarted) {
              setGameState(prev => ({ ...prev, gameStarted: true }));
            } else if (!gameState.gameOver) {
              setGameState(prev => ({ ...prev, paused: !prev.paused }));
            } else {
              resetGame();
            }
          }}
        >
          {gameState.paused || !gameState.gameStarted || gameState.gameOver ? (
            <Play className="h-6 w-6 text-white" />
          ) : (
            <Pause className="h-6 w-6 text-white" />
          )}
        </Button>
        
        <Button
          variant="dutch-glass" 
          size="icon"
          className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 w-14 h-14"
          onTouchStart={() => setKeys(prev => ({ ...prev, right: true }))}
          onTouchEnd={() => setKeys(prev => ({ ...prev, right: false }))}
          onClick={() => {}}
        >
          <ArrowRight className="h-6 w-6 text-white" />
        </Button>
      </motion.div>
      
      {/* Game over actions */}
      {gameState.gameOver && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 mt-4 items-center justify-center w-full max-w-md mx-auto px-4"
        >
          <Button
            variant="dutch-glass" 
            className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            onClick={shareScore}
          >
            <Share2 className="h-4 w-4 mr-2 text-white" />
            Partager
          </Button>
          
          <Button
            variant="dutch-glass" 
            className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            onClick={resetGame}
          >
            <RotateCcw className="h-4 w-4 mr-2 text-white" />
            Rejouer
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default BrickBreaker;
