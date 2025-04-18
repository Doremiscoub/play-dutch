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
      phase: number;
    }[] = [];

    // Waves params - Animation améliorée avec plusieurs niveaux de vagues
    const waves = [
      { height: 0.25, color: '#E9D5FF', speed: 0.04, amplitude: 22, offset: 0 },
      { height: 0.20, color: '#FDE68A', speed: 0.03, amplitude: 26, offset: Math.PI / 3 },
      { height: 0.22, color: '#BFDBFE', speed: 0.035, amplitude: 20, offset: Math.PI / 2.5 },
      { height: 0.15, color: '#A7F3D0', speed: 0.045, amplitude: 18, offset: Math.PI / 4 }
    ];

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
      const drawWaves = (time: number) => {
        waves.forEach((wave, index) => {
          // Ajuster l'opacité selon la profondeur de la vague
          const opacity = 0.85 - (index * 0.15);
          const waveHeight = canvas.height * wave.height;
          const yPos = canvas.height - waveHeight;
          
          ctx.beginPath();
          ctx.moveTo(0, canvas.height);
          
          // Augmentation de la résolution pour des vagues plus fluides
          const step = 3; // Réduction du pas pour plus de détails
          
          for (let x = 0; x < canvas.width; x += step) {
            // Animation plus complexe avec des variations de fréquence
            // Première fréquence - ondulation principale
            const distortY = Math.sin(x / 100 + time * wave.speed + wave.offset) * wave.amplitude;
            // Deuxième fréquence - ondulation secondaire pour plus de naturel
            const distortY2 = Math.sin(x / 220 + time * (wave.speed * 0.7) + wave.offset * 1.5) * (wave.amplitude * 0.5);
            // Troisième fréquence - micro ondulation pour l'effet "eau"
            const distortY3 = Math.sin(x / 30 + time * (wave.speed * 1.3) + wave.offset * 2) * (wave.amplitude * 0.2);
            
            // Mouvement de translation horizontal lent
            const horizontalShift = (time * 15) % canvas.width;
            const xPos = (x + horizontalShift) % canvas.width;
            
            // Combiner toutes les fréquences
            const y = yPos + distortY + distortY2 + distortY3;
            
            ctx.lineTo(x, y);
          }
          
          ctx.lineTo(canvas.width, canvas.height);
          ctx.closePath();
          
          // Créer un dégradé pour chaque vague avec plus d'effet de transparence
          const gradient = ctx.createLinearGradient(0, yPos - 30, 0, canvas.height);
          gradient.addColorStop(0, wave.color + 'CC'); // Plus opaque en haut
          gradient.addColorStop(1, wave.color + '44'); // Plus transparent en bas
          
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
