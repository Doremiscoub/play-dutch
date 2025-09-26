
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DESIGN_TOKENS } from '@/design';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

interface Brick extends GameObject {
  broken: boolean;
}

const BrickBreaker: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);
  
  // Game state stored in refs to avoid re-renders during animation
  const gameStateRef = useRef({
    paddle: { x: 0, y: 0, width: 100, height: 15, color: 'hsl(var(--dutch-blue))' },
    ball: { x: 0, y: 0, radius: 8, dx: 4, dy: -4, color: 'hsl(var(--dutch-orange))' },
    bricks: [] as Brick[],
    width: 0,
    height: 0,
    animationId: 0,
    keysPressed: { left: false, right: false }
  });
  
  const initializeGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const gameState = gameStateRef.current;
    gameState.width = canvas.width;
    gameState.height = canvas.height;
    
    // Initialize paddle
    gameState.paddle = {
      x: canvas.width / 2 - 50,
      y: canvas.height - 30,
      width: 100,
      height: 15,
      color: 'hsl(var(--dutch-blue))'
    };
    
    // Initialize ball
    gameState.ball = {
      x: canvas.width / 2,
      y: canvas.height - 50,
      radius: 8,
      dx: 4,
      dy: -4,
      color: 'hsl(var(--dutch-orange))'
    };
    
    // Initialize bricks
    const brickRowCount = 4;
    const brickColumnCount = 8;
    const brickWidth = (canvas.width - 60) / brickColumnCount;
    const brickHeight = 25;
    const bricks: Brick[] = [];
    
    const colors = ['hsl(var(--dutch-purple))', 'hsl(var(--dutch-blue))', 'hsl(var(--dutch-orange))', 'hsl(var(--success))']; // Different colors for each row
    
    for (let r = 0; r < brickRowCount; r++) {
      for (let c = 0; c < brickColumnCount; c++) {
        bricks.push({
          x: c * (brickWidth + 5) + 25,
          y: r * (brickHeight + 10) + 50,
          width: brickWidth,
          height: brickHeight,
          broken: false,
          color: colors[r]
        });
      }
    }
    
    gameState.bricks = bricks;
  };
  
  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { paddle, ball, bricks, width, height } = gameStateRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw paddle
    ctx.fillStyle = paddle.color || DESIGN_TOKENS.primitive.dutch.blue[500];
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = `${DESIGN_TOKENS.primitive.neutral[0]}50`;
    ctx.lineWidth = 2;
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color || DESIGN_TOKENS.primitive.dutch.orange[500];
    ctx.fill();
    ctx.closePath();
    
    // Draw bricks
    bricks.forEach(brick => {
      if (!brick.broken) {
        ctx.fillStyle = brick.color || DESIGN_TOKENS.primitive.dutch.purple[500];
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeStyle = `${DESIGN_TOKENS.primitive.neutral[0]}30`;
        ctx.lineWidth = 1;
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
      }
    });
    
    // Draw score
    ctx.font = '16px Inter, sans-serif';
    ctx.fillStyle = DESIGN_TOKENS.primitive.neutral[600];
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 10, 25);
    
    // Draw lives
    ctx.textAlign = 'right';
    ctx.fillText(`Lives: ${lives}`, width - 10, 25);
  };
  
  const updateGame = () => {
    const gameState = gameStateRef.current;
    const { paddle, ball, bricks, width, height, keysPressed } = gameState;
    
    // Move paddle based on key presses
    if (keysPressed.left && paddle.x > 0) {
      paddle.x -= 7;
    }
    
    if (keysPressed.right && paddle.x + paddle.width < width) {
      paddle.x += 7;
    }
    
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Ball collision with walls
    if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }
    
    if (ball.y - ball.radius < 0) {
      ball.dy = -ball.dy;
    }
    
    // Ball collision with paddle
    if (
      ball.y + ball.radius > paddle.y &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width
    ) {
      // Calculate where on the paddle the ball hit (from -1 to 1)
      const hitPosition = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
      
      // Change angle based on where ball hits the paddle
      ball.dx = hitPosition * 5;
      ball.dy = -Math.abs(ball.dy); // Always bounce up
    }
    
    // Ball collision with bottom (lose life)
    if (ball.y + ball.radius > height) {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
          cancelAnimationFrame(gameState.animationId);
        } else {
          // Reset ball position
          ball.x = width / 2;
          ball.y = height - 50;
          ball.dx = 4;
          ball.dy = -4;
          
          // Reset paddle position
          paddle.x = width / 2 - paddle.width / 2;
        }
        return newLives;
      });
    }
    
    // Ball collision with bricks
    let bricksLeft = false;
    
    bricks.forEach(brick => {
      if (!brick.broken) {
        bricksLeft = true;
        
        if (
          ball.x + ball.radius > brick.x &&
          ball.x - ball.radius < brick.x + brick.width &&
          ball.y + ball.radius > brick.y &&
          ball.y - ball.radius < brick.y + brick.height
        ) {
          brick.broken = true;
          setScore(prev => prev + 10);
          
          // Determine which side of the brick was hit
          const ballBottom = ball.y + ball.radius;
          const ballTop = ball.y - ball.radius;
          const ballRight = ball.x + ball.radius;
          const ballLeft = ball.x - ball.radius;
          
          const brickBottom = brick.y + brick.height;
          const brickTop = brick.y;
          const brickRight = brick.x + brick.width;
          const brickLeft = brick.x;
          
          const bottomCollision = ballBottom >= brickTop && ballTop < brickTop;
          const topCollision = ballTop <= brickBottom && ballBottom > brickBottom;
          const rightCollision = ballRight >= brickLeft && ballLeft < brickLeft;
          const leftCollision = ballLeft <= brickRight && ballRight > brickRight;
          
          if (topCollision || bottomCollision) {
            ball.dy = -ball.dy;
          } else if (leftCollision || rightCollision) {
            ball.dx = -ball.dx;
          }
        }
      }
    });
    
    // Check if player has cleared all bricks
    if (!bricksLeft) {
      setGameOver(true);
      cancelAnimationFrame(gameState.animationId);
    }
  };
  
  const gameLoop = () => {
    if (!gameStarted || gameOver) return;
    
    updateGame();
    drawGame();
    
    gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
  };
  
  const startGame = () => {
    initializeGame();
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
  };
  
  const restartGame = () => {
    startGame();
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas dimensions
    canvas.width = 600;
    canvas.height = 400;
    
    // Initialize game
    initializeGame();
    drawGame();
    
    // Set up keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        gameStateRef.current.keysPressed.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        gameStateRef.current.keysPressed.right = true;
      }
      if (e.key === ' ' && !gameStarted) {
        startGame();
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        gameStateRef.current.keysPressed.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd') {
        gameStateRef.current.keysPressed.right = false;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(gameStateRef.current.animationId);
    };
  }, []);
  
  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
    }
    
    return () => {
      cancelAnimationFrame(gameStateRef.current.animationId);
    };
  }, [gameStarted, gameOver]);
  
  // Handle touch controls for mobile
  const handleTouchStart = (direction: 'left' | 'right') => {
    gameStateRef.current.keysPressed[direction] = true;
  };
  
  const handleTouchEnd = (direction: 'left' | 'right') => {
    gameStateRef.current.keysPressed[direction] = false;
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-3xl w-full mx-4 border border-white/30"
        initial={{ scale: 0.9, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/70 hover:bg-white/90 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
          Easter Egg: Brick Breaker!
        </h2>
        
        {gameOver ? (
          <div className="text-center mb-4">
            <p className="text-xl font-semibold mb-2">Game Over!</p>
            <p className="text-gray-600 mb-4">Final Score: {score}</p>
            <Button onClick={restartGame} className="bg-dutch-blue hover:bg-dutch-blue/90 text-white">
              Play Again
            </Button>
          </div>
        ) : !gameStarted ? (
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-4">Use arrow keys or touch controls to move the paddle</p>
            <Button onClick={startGame} className="bg-dutch-blue hover:bg-dutch-blue/90 text-white">
              Start Game
            </Button>
          </div>
        ) : null}
        
        <div className="relative bg-gray-100/80 rounded-xl overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="mx-auto border border-gray-200/60 rounded-xl shadow-inner"
          />
          
          {/* Mobile controls */}
          <div className="flex justify-between mt-4 px-4 md:hidden">
            <Button
              className="bg-dutch-blue/80 backdrop-blur-sm text-white rounded-full w-20 h-20"
              onTouchStart={() => handleTouchStart('left')}
              onTouchEnd={() => handleTouchEnd('left')}
              onMouseDown={() => handleTouchStart('left')}
              onMouseUp={() => handleTouchEnd('left')}
              onMouseLeave={() => handleTouchEnd('left')}
            >
              ←
            </Button>
            
            <Button
              className="bg-dutch-blue/80 backdrop-blur-sm text-white rounded-full w-20 h-20"
              onTouchStart={() => handleTouchStart('right')}
              onTouchEnd={() => handleTouchEnd('right')}
              onMouseDown={() => handleTouchStart('right')}
              onMouseUp={() => handleTouchEnd('right')}
              onMouseLeave={() => handleTouchEnd('right')}
            >
              →
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Controls: Arrow keys or touch buttons to move the paddle</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BrickBreaker;
