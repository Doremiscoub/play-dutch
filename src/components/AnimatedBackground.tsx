import React, { useRef, useEffect } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configuration améliorée des vagues
    const waves = [
      { 
        height: 0.25, 
        color: '#E9D5FF', // Violet clair
        speed: 0.03, 
        amplitude: 25,
        frequency: 0.02
      },
      { 
        height: 0.22, 
        color: '#FDE68A', // Jaune pâle
        speed: 0.04, 
        amplitude: 20,
        frequency: 0.015
      },
      { 
        height: 0.20, 
        color: '#93C5FD', // Bleu clair
        speed: 0.035, 
        amplitude: 30,
        frequency: 0.025
      }
    ];

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
      phase: number;
    }[] = [];

    // Create dots - Augmentation du nombre pour plus d'animation
    const createDots = () => {
      const numDots = Math.min(50, Math.max(20, Math.floor(canvas.width * canvas.height / 30000)));
      
      const colors = [
        { r: 167, g: 139, b: 250 }, // Violet #A78BFA
        { r: 253, g: 186, b: 116 }, // Orange #FDBA74
        { r: 110, g: 231, b: 183 }, // Green #6EE7B7
        { r: 96, g: 165, b: 250 }, // Blue #60A5FA
        { r: 249, g: 115, b: 22 }, // Dutch Orange #F97316
        { r: 139, g: 92, b: 246 }  // Dutch Purple #8B5CF6
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
          opacity,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    createDots();

    // Draw function
    const draw = (timestamp: number = 0) => {
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
      const time = timestamp / 1000;
      
      dots.forEach(dot => {
        // Ajouter une petite oscillation pour un mouvement plus organique
        const offsetX = Math.sin(time * 0.5 + dot.phase) * 1;
        const offsetY = Math.cos(time * 0.3 + dot.phase) * 1;
        
        ctx.beginPath();
        ctx.arc(dot.x + offsetX, dot.y + offsetY, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();

        // Update position with speed
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        // Bounce off the walls with a small random component
        if (dot.x < 0 || dot.x > canvas.width) {
          dot.speedX *= -1;
          dot.speedX += (Math.random() - 0.5) * 0.1; // Add tiny variation
        }
        if (dot.y < 0 || dot.y > canvas.height) {
          dot.speedY *= -1;
          dot.speedY += (Math.random() - 0.5) * 0.1; // Add tiny variation
        }
        
        // Keep speeds in check
        dot.speedX = Math.max(-0.5, Math.min(0.5, dot.speedX));
        dot.speedY = Math.max(-0.5, Math.min(0.5, dot.speedY));
      });

      // Draw stylized waves at the bottom - Animation considérablement améliorée
      const drawWaves = (timestamp: number) => {
        waves.forEach((wave, index) => {
          const yBase = canvas.height - (canvas.height * wave.height);
        
          ctx.beginPath();
          ctx.moveTo(0, canvas.height);
        
          // Utilisation de courbes de Bézier pour des vagues plus naturelles
          for (let x = 0; x <= canvas.width; x += canvas.width / 20) {
            const dx = x + (timestamp * wave.speed * 100);
            const y = yBase + 
              Math.sin(dx * wave.frequency) * wave.amplitude +
              Math.sin(dx * wave.frequency * 2) * (wave.amplitude * 0.5);
          
            if (x === 0) {
              ctx.lineTo(x, y);
            } else {
              const xc = x - (canvas.width / 40);
              const yc = y;
              ctx.quadraticCurveTo(x, y, xc, yc);
            }
          }
        
          ctx.lineTo(canvas.width, canvas.height);
          ctx.closePath();

          // Dégradé pour chaque vague
          const gradient = ctx.createLinearGradient(0, yBase, 0, canvas.height);
          const baseColor = wave.color;
          gradient.addColorStop(0, baseColor + '80'); // Semi-transparent en haut
          gradient.addColorStop(1, baseColor + '20'); // Très transparent en bas
        
          ctx.fillStyle = gradient;
          ctx.fill();
        });
      };

      drawWaves(time);
    };

    // Animation loop
    let animationId: number;
    let lastTimestamp = 0;
    
    const animate = (timestamp: number) => {
      // Limiter le framerate pour les performances
      if (timestamp - lastTimestamp > 16) { // ~60fps
        lastTimestamp = timestamp;
        draw(timestamp);
      }
      animationId = requestAnimationFrame(animate);
    };

    animate(0);
    
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
