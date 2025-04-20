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

    // Ajuster la taille du canvas à la fenêtre
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Paramètres des vagues améliorés
    const waveConfig = {
      baselineHeight: canvas.height * 0.88, // Même hauteur de base pour les deux vagues
      amplitude: variant === 'subtle' ? 24 : 30, // Amplitude augmentée de 20%
      frequency: 0.02, // Fréquence réduite pour moins de creux/bosses
      animationSpeed: 0.015 // Vitesse réduite de 10%
    };
    
    // Configuration des points flottants avec saturation augmentée
    const dots: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];
    
    // Création des points animés avec saturation augmentée
    const createDots = () => {
      const numDots = variant === 'minimal' 
        ? Math.floor(15 * 1.3) 
        : Math.min(Math.floor(30 * 1.3), Math.floor(canvas.width * canvas.height / 30000));
      
      // Palette de couleurs unifiée avec saturation augmentée de +10%
      const colors = [
        // Violet pastel (A18AFF) avec saturation +10%
        { r: 177, g: 145, b: 255, o: variant === 'subtle' ? 0.2 : 0.25 },
        // Jaune doux (FFD56B) avec saturation +10%
        { r: 255, g: 213, b: 107, o: variant === 'subtle' ? 0.2 : 0.25 },
        // Vert très clair avec saturation +10%
        { r: 125, g: 250, b: 200, o: variant === 'subtle' ? 0.15 : 0.2 },
        // Bleu clair avec saturation +10%
        { r: 115, g: 185, b: 255, o: variant === 'subtle' ? 0.15 : 0.2 }
      ];
      
      // Création des points avec des tailles et positions aléatoires
      for (let i = 0; i < numDots; i++) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 2 + Math.random() * 4, // Entre 2px et 6px
          speedX: (Math.random() - 0.5) * 0.3, // Vitesse aléatoire en X
          speedY: (Math.random() - 0.5) * 0.3, // Vitesse aléatoire en Y
          color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.o})`
        });
      }
    };

    createDots();

    // Fonction améliorée pour dessiner les vagues
    const drawWave = (
      baseY: number,
      color: string,
      amplitude: number,
      time: number,
      direction: 'left' | 'right' = 'left'
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      // Dessiner une courbe sinusoïdale plus douce
      for (let x = 0; x <= canvas.width; x += 5) {
        const y = baseY + (Math.sin(x * waveConfig.frequency + (direction === 'left' ? -time : time)) * amplitude);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = color;
      ctx.fill();
    };

    // Boucle de rendu principale
    const draw = () => {
      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Couleur de fond
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner la grille si pas en mode minimal
      if (variant !== 'minimal') {
        ctx.strokeStyle = 'rgba(218, 218, 218, 0.1)'; // Gris très clair à 10%
        ctx.beginPath();

        // Lignes verticales
        for (let x = 0; x <= canvas.width; x += 24) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
        }

        // Lignes horizontales
        for (let y = 0; y <= canvas.height; y += 24) {
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
        }

        ctx.stroke();
      }

      // Dessiner les vagues avec paramètres améliorés
      if (variant !== 'minimal') {
        const now = Date.now() / 1000 * waveConfig.animationSpeed;
        
        // Première vague (violet pastel)
        drawWave(
          waveConfig.baselineHeight,
          'rgba(161, 138, 255, 0.15)', // #A18AFF avec opacité 0.15
          waveConfig.amplitude,
          now,
          'right'
        );
        
        // Deuxième vague (jaune doux)
        drawWave(
          waveConfig.baselineHeight,
          'rgba(255, 213, 107, 0.15)', // #FFD56B avec opacité 0.15
          waveConfig.amplitude,
          now,
          'left'
        );
      }

      // Dessiner les points animés
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();

        // Mettre à jour la position
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        // Rebondir sur les bords
        if (dot.x <= 0 || dot.x >= canvas.width) dot.speedX *= -1;
        if (dot.y <= 0 || dot.y >= canvas.height) dot.speedY *= -1;
      });
    };

    // Boucle d'animation
    let animationId: number;
    
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [variant]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
