
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location = useLocation();
  
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

    // Waves params - Améliorées avec plus de vagues et d'animation
    const waves = [
      { height: 0.25, color: '#E9D5FF', speed: 0.02, amplitude: 15, offset: 0 },
      { height: 0.3, color: '#FDE68A', speed: 0.03, amplitude: 20, offset: Math.PI / 3 },
      { height: 0.2, color: '#BFDBFE', speed: 0.025, amplitude: 12, offset: Math.PI / 5 },
      { height: 0.28, color: '#A7F3D0', speed: 0.015, amplitude: 18, offset: Math.PI / 4 }
    ];

    // Create dots - Augmentation du nombre pour plus d'animation
    const createDots = () => {
      const numDots = Math.min(50, Math.max(20, Math.floor(canvas.width * canvas.height / 35000)));
      
      const colors = [
        { r: 167, g: 139, b: 250 }, // Violet
        { r: 253, g: 186, b: 116 }, // Orange
        { r: 110, g: 231, b: 183 }, // Green
        { r: 96, g: 165, b: 250 }, // Blue
        { r: 249, g: 115, b: 22 }, // Dutch Orange
        { r: 139, g: 92, b: 246 }  // Dutch Purple
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
      const bgColor = '#FFFFFF';
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

      // Draw animated dots - Toujours visible sur tous les écrans
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

      // Draw stylized waves at the bottom - Améliorées et présentes sur tous les écrans
      const drawWaves = () => {
        const now = Date.now() / 1000;
        
        waves.forEach((wave, index) => {
          // Ajuster l'opacité selon la profondeur de la vague
          const opacity = 0.8 - (index * 0.15);
          const waveHeight = canvas.height * wave.height;
          const yPos = canvas.height - waveHeight;
          
          ctx.beginPath();
          ctx.moveTo(0, canvas.height);
          
          for (let x = 0; x < canvas.width; x += 5) {
            // Animation plus complexe avec des variations de fréquence
            const distortY = Math.sin(x / 100 + now * wave.speed + wave.offset) * wave.amplitude;
            // Ajouter une seconde fréquence pour plus de naturel
            const distortY2 = Math.sin(x / 200 + now * (wave.speed * 0.7) + wave.offset * 1.5) * (wave.amplitude * 0.5);
            const y = yPos + distortY + distortY2;
            ctx.lineTo(x, y);
          }
          
          ctx.lineTo(canvas.width, canvas.height);
          ctx.closePath();
          
          // Créer un dégradé pour chaque vague
          const gradient = ctx.createLinearGradient(0, yPos, 0, canvas.height);
          gradient.addColorStop(0, wave.color + '88'); // Semi-transparent at top
          gradient.addColorStop(1, wave.color + '44'); // More transparent at bottom
          
          ctx.fillStyle = gradient;
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
  }, [variant]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
