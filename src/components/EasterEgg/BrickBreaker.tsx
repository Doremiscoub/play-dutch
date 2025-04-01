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
  
  const initGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const game = gameRef.current;
    game.canvas = canvas;
    game.ctx = ctx;
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        const { width } = container.getBoundingClientRect();
        canvas.width = width;
        canvas.height = Math.min(600, window.innerHeight * 0.7);
        
        game.paddleX = (canvas.width - game.paddleWidth) / 2;
        game.x = canvas.width / 2;
        game.y = canvas.height - 30;
        game.brickWidth = (canvas.width - (game.brickOffsetLeft * 2) - (game.brickPadding * (game.brickColumnCount - 1))) / game.brickColumnCount;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    createBricks();
    
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('touchmove', touchMoveHandler, { passive: false });
    
    game.paddleX = (canvas.width - game.paddleWidth) / 2;
    game.x = canvas.width / 2;
    game.y = canvas.height - 30;
    
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
  
  const createBricks = () => {
    const game = gameRef.current;
    game.bricks = [];
    
    const colors = [
      getComputedStyle(document.documentElement).getPropertyValue('--dutch-blue').trim() || '#1EAEDB',
      getComputedStyle(document.documentElement).getPropertyValue('--dutch-purple').trim() || '#8B5CF6',
      getComputedStyle(document.documentElement).getPropertyValue('--dutch-orange').trim() || '#F97316',
      getComputedStyle(document.documentElement).getPropertyValue('--dutch-green').trim() || '#10B981',
    ];
    
    const rows = Math.min(4 + Math.floor(level / 2), 7);
    const columns = Math.min(5 + Math.floor(level / 3), 8);
    
    game.brickRowCount = rows;
    game.brickColumnCount = columns;
    
    for (let c = 0; c < columns; c++) {
      for (let r = 0; r < rows; r++) {
        const colorIndex = (r + c) % colors.length;
        const health = 1 + Math.floor(level / 5);
        const points = (r + 1) * 10;
        
        game.bricks.push({
          x: 0,
          y: 0,
          status: health,
          color: colors[colorIndex],
          points
        });
      }
    }
    
    calculateBrickPositions();
  };
  
  const calculateBrickPositions = () => {
    const game = gameRef.current;
    if (!game.canvas) return;
    
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
      
      if (game.paddleX < 0) {
        game.paddleX = 0;
      } else if (game.paddleX + game.paddleWidth > game.canvas.width) {
        game.paddleX = game.canvas.width - game.paddleWidth;
      }
    }
  };
  
  const drawBall = (x: number, y: number, radius: number) => {
    const game = gameRef.current;
    if (!game.ctx) return;
    
    game.ctx.beginPath();
    game.ctx.arc(x, y, radius, 0, Math.PI * 2);
    game.ctx.fillStyle = colors.primary || '#1EAEDB';
    game.ctx.fill();
    game.ctx.closePath();
    
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
    
    game.ctx.beginPath();
    game.ctx.roundRect(
      game.paddleX, 
      game.canvas.height - game.paddleHeight, 
      game.paddleWidth, 
      game.paddleHeight,
      [6, 6, 6, 6]
    );
    
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
        game.ctx.beginPath();
        game.ctx.roundRect(brick.x, brick.y, game.brickWidth, game.brickHeight, 4);
        
        const gradient = game.ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + game.brickHeight);
        const baseColor = brick.color;
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, adjustColorBrightness(baseColor, -20));
        
        game.ctx.fillStyle = gradient;
        game.ctx.fill();
        
        game.ctx.beginPath();
        game.ctx.roundRect(brick.x + 2, brick.y + 2, game.brickWidth - 4, 4, [4, 4, 0, 0]);
        game.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        game.ctx.fill();
        
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
      
      particle.x += particle.dx;
      particle.y += particle.dy;
      particle.dy += 0.1;
      particle.life -= 1;
      particle.alpha = particle.life / 20;
    });
  };
  
  const drawUI = () => {
    const game = gameRef.current;
    if (!game.ctx || !game.canvas) return;
    
    game.ctx.font = "16px 'Segoe UI', Arial, sans-serif";
    game.ctx.fillStyle = "#333";
    game.ctx.textAlign = "left";
    game.ctx.fillText(`Score: ${score}`, 10, 20);
    
    game.ctx.textAlign = "center";
    game.ctx.fillText(`Level ${level}`, game.canvas.width / 2, 20);
    
    game.ctx.textAlign = "right";
    game.ctx.fillText(`Lives: ${lives}`, game.canvas.width - 10, 20);
    
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
    
    if (gameState === 'ready' || gameState === 'paused') {
      const message = gameState === 'ready' ? 'Appuyez sur JOUER pour démarrer' : 'PAUSE';
      
      game.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
      
      game.ctx.font = "24px 'Segoe UI', Arial, sans-serif";
      game.ctx.fillStyle = "#fff";
      game.ctx.textAlign = "center";
      game.ctx.textBaseline = "middle";
      game.ctx.fillText(message, game.canvas.width / 2, game.canvas.height / 2);
      
      if (gameState === 'ready') {
        game.ctx.font = "16px 'Segoe UI', Arial, sans-serif";
        game.ctx.fillText("Utilisez les flèches ou la souris pour déplacer", game.canvas.width / 2, game.canvas.height / 2 + 40);
        game.ctx.fillText("Détruisez tous les blocs pour gagner", game.canvas.width / 2, game.canvas.height / 2 + 70);
      }
    }
    
    if (gameState === 'gameOver') {
      game.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
      
      game.ctx.font = "30px 'Segoe UI', Arial, sans-serif";
      game.ctx.fillStyle = "#fff";
      game.ctx.textAlign = "center";
      game.ctx.textBaseline = "middle";
      game.ctx.fillText("Game Over", game.canvas.width / 2, game.canvas.height / 2 - 40);
      
      game.ctx.font = "20px 'Segoe UI', Arial, sans-serif";
      game.ctx.fillText(`Score Final: ${score}`, game.canvas.width / 2, game.canvas.height / 2);
      
      if (score > 0) {
        const highScoreText = score > highScore ? "Nouveau Record!" : `Record: ${highScore}`;
        game.ctx.fillText(highScoreText, game.canvas.width / 2, game.canvas.height / 2 + 30);
      }
      
      game.ctx.font = "16px 'Segoe UI', Arial, sans-serif";
      game.ctx.fillText("Appuyez sur REJOUER pour recommencer", game.canvas.width / 2, game.canvas.height / 2 + 70);
    }
  };
  
  const checkCollision = (ball: typeof gameRef.current.balls[0]) => {
    const game = gameRef.current;
    if (!game.canvas) return;
    
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
          const newScore = score + brick.points;
          setScore(newScore);
          
          createExplosion(brick.x + game.brickWidth / 2, brick.y + game.brickHeight / 2, brick.color);
          
          if (Math.random() < 0.1) {
            spawnPowerUp(brick.x + game.brickWidth / 2, brick.y + game.brickHeight / 2);
          }
          
          if (game.bricks.every(b => b.status <= 0)) {
            setLevel(prevLevel => prevLevel + 1);
            resetGame(false);
            playSound(880, 'sine', 0.5);
            toast.success(`Niveau ${level} terminé !`);
            return true;
          }
        }
        
        if (brick.status <= 0) {
          playSound(440, 'square', 0.1);
        } else {
          playSound(330, 'sine', 0.1);
        }
        
        return false;
      }
    }
    
    if (ball.x + ball.dx > game.canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
      ball.dx = -ball.dx;
      playSound(220, 'sine', 0.05);
    }
    
    if (ball.y + ball.dy < ball.radius) {
      ball.dy = -ball.dy;
      playSound(220, 'sine', 0.05);
    }
    
    if (
      ball.y + ball.dy > game.canvas.height - ball.radius - game.paddleHeight && 
      ball.x > game.paddleX && 
      ball.x < game.paddleX + game.paddleWidth
    ) {
      const hitPos = (ball.x - game.paddleX) / game.paddleWidth;
      const angle = (hitPos * 2 - 1) * Math.PI / 3;
      
      const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
      ball.dx = Math.sin(angle) * speed;
      ball.dy = -Math.abs(Math.cos(angle) * speed);
      
      playSound(440, 'triangle', 0.1);
    }
    
    if (ball.y + ball.dy > game.canvas.height - ball.radius) {
      if (game.balls.length === 1) {
        loseLife();
        return true;
      } else {
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
        game.balls = [{
          x: game.canvas!.width / 2,
          y: game.canvas!.height - 30,
          dx: game.dx,
          dy: game.dy,
          radius: game.ballRadius
        }];
        
        game.paddleX = (game.canvas!.width - game.paddleWidth) / 2;
        
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
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('dutch_brickbreaker_highscore', score.toString());
      toast.success('Nouveau record !');
    }
  };
  
  const createExplosion = (x: number, y: number, color: string) => {
    const game = gameRef.current;
    
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
    setPowerUpTimer(600);
    
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
        game.balls.push(
          { ...game.balls[0], dx: game.balls[0].dx * 1.2, dy: -Math.abs(game.balls[0].dy) },
          { ...game.balls[0], dx: game.balls[0].dx * -1.2, dy: -Math.abs(game.balls[0].dy) }
        );
        toast.success('Multi-balles !');
        break;
      case 'slowBall':
        game.balls.forEach(ball => {
          ball.dx *= 0.7;
          ball.dy *= 0.7;
        });
        toast.success('Balles ralenties !');
        break;
    }
    
    playSound(660, 'sine', 0.3);
  };
  
  const draw = (timestamp: number) => {
    const game = gameRef.current;
    if (!game.ctx || !game.canvas || gameState !== 'playing') return;
    
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    
    const deltaTime = timestamp - game.lastTime;
    game.lastTime = timestamp;
    
    drawBricks();
    
    game.balls = game.balls.filter((ball, index) => {
      drawBall(ball.x, ball.y, ball.radius);
      
      ball.x += ball.dx;
      ball.y += ball.dy;
      
      const removeThisBall = checkCollision(ball);
      
      if (removeThisBall && game.balls.length === 1) {
        return false;
      }
      
      return !removeThisBall;
    });
    
    drawPaddle();
    drawParticles();
    drawUI();
    
    if (game.rightPressed && game.paddleX < game.canvas.width - game.paddleWidth) {
      game.paddleX += 7;
    } else if (game.leftPressed && game.paddleX > 0) {
      game.paddleX -= 7;
    }
    
    if (powerUp) {
      setPowerUpTimer(prev => {
        const newTimer = prev - 1;
        if (newTimer <= 0) {
          setPowerUp(null);
          
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
    
    if (game.balls.length > 0) {
      game.animationFrameId = requestAnimationFrame(draw);
    }
  };
  
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
    
    cancelAnimationFrame(game.animationFrameId);
    
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
    
    game.dx = 4 * (1 + (level - 1) * 0.1);
    game.dy = -4 * (1 + (level - 1) * 0.1);
    
    if (game.canvas) {
      game.paddleX = (game.canvas.width - game.paddleWidth) / 2;
      game.x = game.canvas.width / 2;
      game.y = game.canvas.height - 30;
      
      game.balls = [{
        x: game.canvas.width / 2,
        y: game.canvas.height - 30,
        dx: game.dx,
        dy: game.dy,
        radius: game.ballRadius
      }];
      
      game.paddleWidth = 80;
      
      createBricks();
    }
  };
  
  const toggleSound = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    localStorage.setItem('dutch_brickbreaker_sound', newSoundState.toString());
    toast.success(newSoundState ? 'Son activé' : 'Son désactivé');
  };
  
  const adjustColorBrightness = (hex: string, percent: number) => {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.min(255, Math.max(0, r + (r * percent / 100)));
    g = Math.min(255, Math.max(0, g + (g * percent / 100)));
    b = Math.min(255, Math.max(0, b + (b * percent / 100)));

    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  };
  
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };
  
  useEffect(() => {
    const cleanup = initGame();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 relative">
      <AnimatedBackground />
      
      <div className="z-10 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
            <Home size={18} /> Accueil
          </Button>
          
          <div className="flex gap-2">
            <Button variant="ghost" onClick={toggleSound} className="flex items-center gap-1">
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              {soundEnabled ? 'Son On' : 'Son Off'}
            </Button>
          </div>
        </div>
        
        <motion.div 
          className="relative bg-card rounded-lg shadow-lg overflow-hidden border border-border"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-4 bg-card border-b border-border">
            <h1 className="text-xl font-bold text-center">Dutch Brick Breaker</h1>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm font-medium">Score: {score}</div>
              <div className="text-sm font-medium">Niveau: {level}</div>
              <div className="text-sm font-medium">Vies: {lives}</div>
            </div>
          </div>
          
          <div className="relative bg-muted">
            <canvas 
              ref={canvasRef} 
              className="block w-full" 
              height="500"
            />
          </div>
          
          <div className="p-4 flex justify-between gap-2">
            <Button 
              variant="outline" 
              onClick={() => resetGame(true)} 
              className="flex items-center gap-2"
              disabled={gameState === 'playing'}
            >
              <RefreshCw size={18} /> Réinitialiser
            </Button>
            
            <Button 
              onClick={toggleGameState} 
              className="flex-1 flex items-center justify-center gap-2"
            >
              {gameState === 'playing' ? (
                <>
                  <PauseCircle size={18} /> Pause
                </>
              ) : (
                <>
                  <Play size={18} /> {gameState === 'paused' ? 'Reprendre' : 'Jouer'}
                </>
              )}
            </Button>
          </div>
        </motion.div>
        
        <div className="mt-6 text-center text-muted-foreground text-sm">
          <p>Record: {highScore}</p>
          <p className="mt-2">
            Utilisez les flèches ← → ou déplacez la souris pour contrôler le paddle.
          </p>
          <p className="mt-1">
            Appuyez sur ESPACE pour mettre en pause/reprendre le jeu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrickBreaker;
