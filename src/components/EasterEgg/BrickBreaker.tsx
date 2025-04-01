import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, Play, PauseCircle, RefreshCw, ArrowUp, VolumeX, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import { toast } from 'sonner';
import AnimatedBackground from '@/components/AnimatedBackground';

const BrickBreaker: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'paused' | 'gameOver'>('ready');
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('dutch_brickbreaker_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('dutch_brickbreaker_sound') !== 'false';
  });
  const [level, setLevel] = useState(1);
  const [powerUp, setPowerUp] = useState<string | null>(null);
  const [powerUpTimer, setPowerUpTimer] = useState(0);
  
  const navigate = useNavigate();
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();
  
  // Game variables stored in refs to maintain state between renders
  const gameRef = useRef({
    canvas: null as HTMLCanvasElement | null,
    ctx: null as CanvasRenderingContext2D | null,
    ballRadius: 8,
    x: 0,
    y: 0,
    dx: 4,
    dy: -4,
    paddleHeight: 12,
    paddleWidth: 80,
    paddleX: 0,
    brickRowCount: 4,
    brickColumnCount: 5,
    brickWidth: 0,
    brickHeight: 25,
    brickPadding: 10,
    brickOffsetTop: 40,
    brickOffsetLeft: 30,
    bricks: [] as { x: number, y: number, status: number, color: string, points: number }[],
    rightPressed: false,
    leftPressed: false,
    animationFrameId: 0,
    lastTime: 0,
    powerUpTypes: ['extraLife', 'bigPaddle', 'multiball', 'slowBall'],
    balls: [] as { x: number, y: number, dx: number, dy: number, radius: number }[],
    particles: [] as { x: number, y: number, radius: number, color: string, dx: number, dy: number, alpha: number, life: number }[],
    ready: false,
  });
  
  // Set up play sound function
  const playSound = (frequency: number, type: 'sine' | 'square' | 'sawtooth' | 'triangle' = 'sine', duration = 0.1) => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.error('Audio error:', e);
    }
  };
  
  // Initialize game
  const initGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const game = gameRef.current;
    game.canvas = canvas;
    game.ctx = ctx;
    
    // Adjust canvas size to fit container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        const { width } = container.getBoundingClientRect();
        canvas.width = width;
        canvas.height = Math.min(600, window.innerHeight * 0.7);
        
        // Recalculate dimensions based on canvas size
        game.paddleX = (canvas.width - game.paddleWidth) / 2;
        game.x = canvas.width / 2;
        game.y = canvas.height - 30;
        game.brickWidth = (canvas.width - (game.brickOffsetLeft * 2) - (game.brickPadding * (game.brickColumnCount - 1))) / game.brickColumnCount;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create bricks
    createBricks();
    
    // Set up controls
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('touchmove', touchMoveHandler, { passive: false });
    
    // Set starting position
    game.paddleX = (canvas.width - game.paddleWidth) / 2;
    game.x = canvas.width / 2;
    game.y = canvas.height - 30;
    
    // Add the main ball to the balls array
    game.balls = [{ x: game.x, y: game.y, dx: game.dx, dy: game.dy, radius: game.ballRadius }];
    game.ready = true;
    
    return () => {
      cancelAnimationFrame(game.animationFrameId);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('touchmove', touchMoveHandler);
      window.removeEventListener('resize', resizeCanvas);
    };
  };
  
  // Create bricks with varying colors and points
  const createBricks = () => {
    const game = gameRef.current;
    game.bricks = [];
    
    const colors = [
      getComputedStyle(document.documentElement).getPropertyValue('--dutch-blue').trim() || '#1EAEDB',
      getComputedStyle(document.documentElement).getPropertyValue('--dutch-purple').trim() || '#8B5CF6',
      getComputedStyle(document.documentElement).getPropertyValue('--dutch-orange').trim() || '#F97316',
      getComputedStyle(document.documentElement).getPropertyValue('--dutch-green').trim() || '#10B981',
    ];
    
    const rows = Math.min(4 + Math.floor(level / 2), 7); // Increase rows with level
    const columns = Math.min(5 + Math.floor(level / 3), 8); // Increase columns with level
    
    game.brickRowCount = rows;
    game.brickColumnCount = columns;
    
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows; r++) {
        const colorIndex = (r + c) % colors.length;
        const health = 1 + Math.floor(level / 5); // Some bricks get tougher at higher levels
        const points = (r + 1) * 10; // Higher rows worth more points
        
        game.bricks.push({
          x: 0,
          y: 0,
          status: health,
          color: colors[colorIndex],
          points
        });
      }
    }
    
    // Calculate positions
    calculateBrickPositions();
  };
  
  const calculateBrickPositions = () => {
    const game = gameRef.current;
    if (!game.canvas) return;
    
    // Recalculate brick width based on canvas size and column count
    game.brickWidth = (game.canvas.width - (game.brickOffsetLeft * 2) - (game.brickPadding * (game.brickColumnCount - 1))) / game.brickColumnCount;
    
    let index = 0;
    for (let c = 0; c < game.brickColumnCount; c++) {
      for (let r = 0; r < game.brickRowCount; r++) {
        if (index < game.bricks.length) {
          const brickX = (c * (game.brickWidth + game.brickPadding)) + game.brickOffsetLeft;
          const brickY = (r * (game.brickHeight + game.brickPadding)) + game.brickOffsetTop;
          game.bricks[index].x = brickX;
          game.bricks[index].y = brickY;
          index++;
        }
      }
    }
  };
  
  // Event handlers for keyboard, mouse, and touch controls
  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      gameRef.current.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      gameRef.current.leftPressed = true;
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      toggleGameState();
    }
  };
  
  const keyUpHandler = (e: KeyboardEvent) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      gameRef.current.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      gameRef.current.leftPressed = false;
    }
  };
  
  const mouseMoveHandler = (e: MouseEvent) => {
    const game = gameRef.current;
    if (!game.canvas) return;
    
    const relativeX = e.clientX - game.canvas.getBoundingClientRect().left;
    if (relativeX > 0 && relativeX < game.canvas.width) {
      game.paddleX = relativeX - game.paddleWidth / 2;
      
      // Keep paddle within canvas boundaries
      if (game.paddleX < 0) {
        game.paddleX = 0;
      } else if (game.paddleX + game.paddleWidth > game.canvas.width) {
        game.paddleX = game.canvas.width - game.paddleWidth;
      }
    }
  };
  
  const touchMoveHandler = (e: TouchEvent) => {
    e.preventDefault();
    const game = gameRef.current;
    if (!game.canvas || e.touches.length === 0) return;
    
    const touch = e.touches[0];
    const relativeX = touch.clientX - game.canvas.getBoundingClientRect().left;
    if (relativeX > 0 && relativeX < game.canvas.width) {
      game.paddleX = relativeX - game.paddleWidth / 2;
      
      // Keep paddle within canvas boundaries
      if (game.paddleX < 0) {
        game.paddleX = 0;
      } else if (game.paddleX + game.paddleWidth > game.canvas.width) {
        game.paddleX = game.canvas.width - game.paddleWidth;
      }
    }
  };
  
  // Draw functions
  const drawBall = (x: number, y: number, radius: number) => {
    const game = gameRef.current;
    if (!game.ctx) return;
    
    game.ctx.beginPath();
    game.ctx.arc(x, y, radius, 0, Math.PI * 2);
    game.ctx.fillStyle = colors.primary || '#1EAEDB';
    game.ctx.fill();
    game.ctx.closePath();
    
    // Add a subtle gradient effect
    const gradient = game.ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    game.ctx.beginPath();
    game.ctx.arc(x, y, radius * 0.8, 0, Math.PI * 2);
    game.ctx.fillStyle = gradient;
    game.ctx.fill();
    game.ctx.closePath();
  };
  
  const drawPaddle = () => {
    const game = gameRef.current;
    if (!game.ctx || !game.canvas) return;
    
    // Main paddle body
    game.ctx.beginPath();
    game.ctx.roundRect(
      game.paddleX, 
      game.canvas.height - game.paddleHeight, 
      game.paddleWidth, 
      game.paddleHeight,
      [6, 6, 6, 6]
    );
    
    // Create gradient
    const gradient = game.ctx.createLinearGradient(
      game.paddleX, 
      game.canvas.height - game.paddleHeight, 
      game.paddleX, 
      game.canvas.height
    );
    gradient.addColorStop(0, colors.secondary || '#F97316');
    gradient.addColorStop(1, colors.accent || '#8B5CF6');
    
    game.ctx.fillStyle = gradient;
    game.ctx.fill();
    game.ctx.closePath();
    
    // Add a highlight
    game.ctx.beginPath();
    game.ctx.roundRect(
      game.paddleX + 2, 
      game.canvas.height - game.paddleHeight + 2, 
      game.paddleWidth - 4, 
      4,
      [4, 4, 0, 0]
    );
    game.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    game.ctx.fill();
    game.ctx.closePath();
  };
  
  const drawBricks = () => {
    const game = gameRef.current;
    if (!game.ctx) return;
    
    game.bricks.forEach(brick => {
      if (brick.status > 0) {
        // Draw brick with rounded corners
        game.ctx.beginPath();
        game.ctx.roundRect(brick.x, brick.y, game.brickWidth, game.brickHeight, 4);
        
        // Create gradient based on brick color
        const gradient = game.ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + game.brickHeight);
        const baseColor = brick.color;
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, adjustColorBrightness(baseColor, -20));
        
        game.ctx.fillStyle = gradient;
        game.ctx.fill();
        
        // Add a highlight
        game.ctx.beginPath();
        game.ctx.roundRect(brick.x + 2, brick.y + 2, game.brickWidth - 4, 4, [4, 4, 0, 0]);
        game.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        game.ctx.fill();
        
        // For bricks with more than 1 health, add an indicator
        if (brick.status > 1) {
          game.ctx.beginPath();
          game.ctx.arc(brick.x + game.brickWidth / 2, brick.y + game.brickHeight / 2, 4, 0, Math.PI * 2);
          game.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          game.ctx.fill();
        }
      }
    });
  };
  
  const drawParticles = () => {
    const game = gameRef.current;
    if (!game.ctx) return;
    
    game.particles = game.particles.filter(particle => particle.life > 0);
    
    game.particles.forEach(particle => {
      game.ctx!.beginPath();
      game.ctx!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      game.ctx!.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.alpha})`;
      game.ctx!.fill();
      game.ctx!.closePath();
      
      // Update particle position and properties
      particle.x += particle.dx;
      particle.y += particle.dy;
      particle.dy += 0.1; // Gravity
      particle.life -= 1;
      particle.alpha = particle.life / 20;
    });
  };
  
  const drawUI = () => {
    const game = gameRef.current;
    if (!game.ctx || !game.canvas) return;
    
    // Draw score
    game.ctx.font = "16px 'Segoe UI', Arial, sans-serif";
    game.ctx.fillStyle = "#333";
    game.ctx.textAlign = "left";
    game.ctx.fillText(`Score: ${score}`, 10, 20);
    
    // Draw level
    game.ctx.textAlign = "center";
    game.ctx.fillText(`Level ${level}`, game.canvas.width / 2, 20);
    
    // Draw lives
    game.ctx.textAlign = "right";
    game.ctx.fillText(`Lives: ${lives}`, game.canvas.width - 10, 20);
    
    // Draw power-up indicator if active
    if (powerUp) {
      const powerUpText = {
        'extraLife': '❤️ Extra Life',
        'bigPaddle': '📏 Big Paddle',
        'multiball': '🔄 Multi-Ball',
        'slowBall': '⏱️ Slow Ball'
      }[powerUp] || '';
      
      const timeLeft = Math.ceil(powerUpTimer / 60);
      
      game.ctx.textAlign = "center";
      game.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      game.ctx.fillRect(game.canvas.width / 2 - 80, 30, 160, 24);
      game.ctx.fillStyle = "#fff";
      game.ctx.fillText(`${powerUpText} (${timeLeft}s)`, game.canvas.width / 2, 45);
    }
    
    // Draw game state overlay
    if (gameState === 'ready' || gameState === 'paused') {
      const message = gameState === 'ready' ? 'Appuyez sur JOUER pour démarrer' : 'PAUSE';
      
      // Semi-transparent overlay
      game.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
      
      // Message
      game.ctx.font = "24px 'Segoe UI', Arial, sans-serif";
      game.ctx.fillStyle = "#fff";
      game.ctx.textAlign = "center";
      game.ctx.textBaseline = "middle";
      game.ctx.fillText(message, game.canvas.width / 2, game.canvas.height / 2);
      
      // Instructions
      if (gameState === 'ready') {
        game.ctx.font = "16px 'Segoe UI', Arial, sans-serif";
        game.ctx.fillText("Utilisez les flèches ou la souris pour déplacer", game.canvas.width / 2, game.canvas.height / 2 + 40);
        game.ctx.fillText("Détruisez tous les blocs pour gagner", game.canvas.width / 2, game.canvas.height / 2 + 70);
      }
    }
    
    // Game over screen
    if (gameState === 'gameOver') {
      // Semi-transparent overlay
      game.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
      
      // Game over message
      game.ctx.font = "30px 'Segoe UI', Arial, sans-serif";
      game.ctx.fillStyle = "#fff";
      game.ctx.textAlign = "center";
      game.ctx.textBaseline = "middle";
      game.ctx.fillText("Game Over", game.canvas.width / 2, game.canvas.height / 2 - 40);
      
      // Final score
      game.ctx.font = "20px 'Segoe UI', Arial, sans-serif";
      game.ctx.fillText(`Score Final: ${score}`, game.canvas.width / 2, game.canvas.height / 2);
      
      // High score
      if (score > 0) {
        const highScoreText = score > highScore ? "Nouveau Record!" : `Record: ${highScore}`;
        game.ctx.fillText(highScoreText, game.canvas.width / 2, game.canvas.height / 2 + 30);
      }
      
      // Restart prompt
      game.ctx.font = "16px 'Segoe UI', Arial, sans-serif";
      game.ctx.fillText("Appuyez sur REJOUER pour recommencer", game.canvas.width / 2, game.canvas.height / 2 + 70);
    }
  };
  
  // Game logic
  const checkCollision = (ball: typeof gameRef.current.balls[0]) => {
    const game = gameRef.current;
    if (!game.canvas) return;
    
    // Brick collision
    for (let i = 0; i < game.bricks.length; i++) {
      const brick = game.bricks[i];
      if (brick.status <= 0) continue;
      
      if (
        ball.x > brick.x && 
        ball.x < brick.x + game.brickWidth && 
        ball.y > brick.y && 
        ball.y < brick.y + game.brickHeight
      ) {
        ball.dy = -ball.dy;
        brick.status--;
        
        if (brick.status <= 0) {
          // Add score
          const newScore = score + brick.points;
          setScore(newScore);
          
          // Create explosion particles
          createExplosion(brick.x + game.brickWidth / 2, brick.y + game.brickHeight / 2, brick.color);
          
          // Randomly spawn power-up (10% chance)
          if (Math.random() < 0.1) {
            spawnPowerUp(brick.x + game.brickWidth / 2, brick.y + game.brickHeight / 2);
          }
          
          // Check if all bricks are gone
          if (game.bricks.every(b => b.status <= 0)) {
            // Level complete
            setLevel(prevLevel => prevLevel + 1);
            resetGame(false);
            playSound(880, 'sine', 0.5);
            toast.success(`Niveau ${level} terminé !`);
            return true;
          }
        }
        
        // Play different sounds based on brick status
        if (brick.status <= 0) {
          playSound(440, 'square', 0.1);
        } else {
          playSound(330, 'sine', 0.1);
        }
        
        return false;
      }
    }
    
    // Wall collision
    if (ball.x + ball.dx > game.canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
      ball.dx = -ball.dx;
      playSound(220, 'sine', 0.05);
    }
    
    // Top wall collision
    if (ball.y + ball.dy < ball.radius) {
      ball.dy = -ball.dy;
      playSound(220, 'sine', 0.05);
    }
    
    // Paddle collision
    if (
      ball.y + ball.dy > game.canvas.height - ball.radius - game.paddleHeight && 
      ball.x > game.paddleX && 
      ball.x < game.paddleX + game.paddleWidth
    ) {
      // Calculate angle based on where ball hits paddle
      const hitPos = (ball.x - game.paddleX) / game.paddleWidth;
      const angle = (hitPos * 2 - 1) * Math.PI / 3; // -60 to 60 degrees
      
      const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
      ball.dx = Math.sin(angle) * speed;
      ball.dy = -Math.abs(Math.cos(angle) * speed);
      
      playSound(440, 'triangle', 0.1);
    }
    
    // Bottom wall collision (lose a life)
    if (ball.y + ball.dy > game.canvas.height - ball.radius) {
      // Only lose a life if this is the last ball
      if (game.balls.length === 1) {
        loseLife();
        return true;
      } else {
        // Otherwise just remove this ball
        return true;
      }
    }
    
    return false;
  };
  
  const loseLife = () => {
    const game = gameRef.current;
    setLives(prevLives => {
      const newLives = prevLives - 1;
      
      if (newLives <= 0) {
        gameOver();
      } else {
        // Reset ball position
        game.balls = [{
          x: game.canvas!.width / 2,
          y: game.canvas!.height - 30,
          dx: game.dx,
          dy: game.dy,
          radius: game.ballRadius
        }];
        
        // Reset paddle position
        game.paddleX = (game.canvas!.width - game.paddleWidth) / 2;
        
        // Cancel any active power-ups
        setPowerUp(null);
        setPowerUpTimer(0);
        game.paddleWidth = 80;
        
        playSound(110, 'sawtooth', 0.3);
        setGameState('ready');
      }
      
      return newLives;
    });
  };
  
  const gameOver = () => {
    setGameState('gameOver');
    playSound(110, 'sawtooth', 1);
    
    // Update high score if needed
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('dutch_brickbreaker_highscore', score.toString());
      toast.success('Nouveau record !');
    }
  };
  
  const createExplosion = (x: number, y: number, color: string) => {
    const game = gameRef.current;
    
    // Create 8-12 particles
    const particleCount = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2) * (i / particleCount);
      const speed = 1 + Math.random() * 2;
      
      game.particles.push({
        x,
        y,
        radius: 1 + Math.random() * 3,
        color,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        alpha: 1,
        life: 10 + Math.random() * 10
      });
    }
  };
  
  const spawnPowerUp = (x: number, y: number) => {
    const game = gameRef.current;
    const powerUpType = game.powerUpTypes[Math.floor(Math.random() * game.powerUpTypes.length)];
    
    setPowerUp(powerUpType);
    setPowerUpTimer(600); // 10 seconds at 60 updates per second
    
    // Apply power-up effect
    switch (powerUpType) {
      case 'extraLife':
        setLives(prev => prev + 1);
        toast.success('Vie supplémentaire !');
        break;
      case 'bigPaddle':
        game.paddleWidth = 120;
        toast.success('Paddle agrandi !');
        break;
      case 'multiball':
        // Spawn 2 additional balls
        const mainBall = game.balls[0];
        game.balls.push(
          { ...mainBall, dx: mainBall.dx * 1.2, dy: -Math.abs(mainBall.dy) },
          { ...mainBall, dx: mainBall.dx * -1.2, dy: -Math.abs(mainBall.dy) }
        );
        toast.success('Multi-balles !');
        break;
      case 'slowBall':
        // Slow down all balls
        game.balls.forEach(ball => {
          ball.dx *= 0.7;
          ball.dy *= 0.7;
        });
        toast.success('Balles ralenties !');
        break;
    }
    
    // Play power-up sound
    playSound(660, 'sine', 0.3);
  };
  
  // Animation loop
  const draw = (timestamp: number) => {
    const game = gameRef.current;
    if (!game.ctx || !game.canvas || gameState !== 'playing') return;
    
    // Clear canvas
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    
    // Calculate delta time for smooth animation
    const deltaTime = timestamp - game.lastTime;
    game.lastTime = timestamp;
    
    // Draw elements
    drawBricks();
    
    // Draw and update all balls
    game.balls = game.balls.filter((ball, index) => {
      drawBall(ball.x, ball.y, ball.radius);
      
      // Update ball position
      ball.x += ball.dx;
      ball.y += ball.dy;
      
      // Check collision for this ball
      const removeThisBall = checkCollision(ball);
      
      // Only lose a life if this is the last ball AND it's removed
      if (removeThisBall && game.balls.length === 1) {
        return false;
      }
      
      return !removeThisBall;
    });
    
    drawPaddle();
    drawParticles();
    drawUI();
    
    // Move paddle based on key state
    if (game.rightPressed && game.paddleX < game.canvas.width - game.paddleWidth) {
      game.paddleX += 7;
    } else if (game.leftPressed && game.paddleX > 0) {
      game.paddleX -= 7;
    }
    
    // Update power-up timer
    if (powerUp) {
      setPowerUpTimer(prev => {
        const newTimer = prev - 1;
        if (newTimer <= 0) {
          // Power-up expired
          setPowerUp(null);
          
          // Reset affected properties
          if (powerUp === 'bigPaddle') {
            game.paddleWidth = 80;
          } else if (powerUp === 'slowBall') {
            game.balls.forEach(ball => {
              ball.dx *= 1.5;
              ball.dy *= 1.5;
            });
          }
          
          return 0;
        }
        return newTimer;
      });
    }
    
    // Request next frame if still playing
    if (game.balls.length > 0) {
      game.animationFrameId = requestAnimationFrame(draw);
    }
  };
  
  // Game state management
  const startGame = () => {
    const game = gameRef.current;
    setGameState('playing');
    game.lastTime = performance.now();
    game.animationFrameId = requestAnimationFrame(draw);
    playSound(330, 'sine', 0.2);
  };
  
  const pauseGame = () => {
    const game = gameRef.current;
    setGameState('paused');
    cancelAnimationFrame(game.animationFrameId);
    playSound(220, 'sine', 0.2);
  };
  
  const toggleGameState = () => {
    if (gameState === 'ready') {
      startGame();
    } else if (gameState === 'playing') {
      pauseGame();
    } else if (gameState === 'paused') {
      startGame();
    }
  };
  
  const resetGame = (fullReset = true) => {
    const game = gameRef.current;
    
    // Cancel animation frame
    cancelAnimationFrame(game.animationFrameId);
    
    // Reset game state
    if (fullReset) {
      setScore(0);
      setLives(3);
      setLevel(1);
      setGameState('ready');
      setPowerUp(null);
      setPowerUpTimer(0);
    } else {
      setGameState('ready');
    }
    
    // Reset ball and paddle
    game.dx = 4 * (1 + (level - 1) * 0.1); // Increase speed with level
    game.dy = -4 * (1 + (level - 1) * 0.1);
    
    if (game.canvas) {
      game.paddleX = (game.canvas.width - game.paddleWidth) / 2;
      game.x = game.canvas.width / 2;
      game.y = game.canvas.height - 30;
