
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial size
    resizeCanvas();

    // Resize event
    window.addEventListener('resize', resizeCanvas);

    // Grid params
    const gridSize = 24;

    // Dots params
    const dots: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }[] = [];

    // Waves params
    const waves = [
      { height: 0.2, color: isHome ? '#E9D5FF' : '#E9E9FF', speed: 0.02, amplitude: 15, offset: 0 },
      { height: 0.25, color: isHome ? '#FDE68A' : '#FDECB4', speed: 0.03, amplitude: 20, offset: Math.PI / 3 }
    ];

    // Create dots
    const createDots = () => {
      const numDots = Math.min(30, Math.max(10, Math.floor(canvas.width * canvas.height / 40000)));
      
      const colors = [
        { r: 167, g: 139, b: 250 }, // Violet
        { r: 253, g: 186, b: 116 }, // Orange
        { r: 110, g: 231, b: 183 }, // Green
        { r: 96, g: 165, b: 250 } // Blue
      ];
      
      for (let i = 0; i < numDots; i++) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        const opacity = 0.15 + Math.random() * 0.25;
        
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 2 + Math.random() * 6, // Size between 2px and 8px
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`,
          opacity
        });
      }
    };

    createDots();

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background color based on variant
      const bgColor = isHome ? '#FFFFFF' : '#F8F9FA';
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid (if not minimal)
      if (variant !== 'minimal') {
        ctx.strokeStyle = 'rgba(218, 218, 218, 0.1)'; // Light gray, 10% opacity
        ctx.beginPath();

        // Vertical lines
        for (let x = 0; x <= canvas.width; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
        }

        // Horizontal lines
        for (let y = 0; y <= canvas.height; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
        }

        ctx.stroke();
      }

      // Draw animated dots
      if (variant === 'default') {
        dots.forEach(dot => {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = dot.color;
          ctx.fill();

          // Update position with speed
          dot.x += dot.speedX;
          dot.y += dot.speedY;

          // Bounce off the walls
          if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
          if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;
        });
      }

      // Draw stylized waves at the bottom
      const drawWaves = () => {
        const now = Date.now() / 1000;
        
        waves.forEach(wave => {
          const waveHeight = canvas.height * wave.height;
          const yPos = canvas.height - waveHeight;
          
          ctx.beginPath();
          ctx.moveTo(0, canvas.height);
          
          for (let x = 0; x < canvas.width; x += 5) {
            const distortY = Math.sin(x / 100 + now * wave.speed + wave.offset) * wave.amplitude;
            const y = yPos + distortY;
            ctx.lineTo(x, y);
          }
          
          ctx.lineTo(canvas.width, canvas.height);
          ctx.closePath();
          
          ctx.fillStyle = wave.color;
          ctx.fill();
        });
      };

      drawWaves();
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [variant, isHome]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
