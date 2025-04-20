
import React, { useRef, useEffect } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal';
}

/**
 * Composant global de fond animé unifié pour toute l'application
 */
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

    // Paramètres
    const gridSize = variant === 'minimal' ? 32 : 24; // Taille de la grille
    
    // Configuration des points flottants - Augmentation de 30% du nombre de points
    const dots: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];
    
    // Création des points animés - Nombre augmenté de 30%
    const createDots = () => {
      // Augmenter le nombre de points de 30%
      const numDots = variant === 'minimal' 
        ? Math.floor(15 * 1.3) 
        : Math.min(Math.floor(30 * 1.3), Math.floor(canvas.width * canvas.height / 30000)); 
      
      // Palette de couleurs unifiée avec saturation augmentée de 10%
      const colors = [
        // Violet clair - saturation augmentée de 10%
        { r: 177, g: 145, b: 255, o: variant === 'subtle' ? 0.17 : 0.22 }, 
        // Orange clair - saturation augmentée de 10%
        { r: 255, g: 186, b: 116, o: variant === 'subtle' ? 0.17 : 0.22 }, 
        // Vert très clair - saturation augmentée de 10%
        { r: 115, g: 240, b: 190, o: variant === 'subtle' ? 0.12 : 0.17 }, 
        // Bleu clair - saturation augmentée de 10%
        { r: 105, g: 175, b: 255, o: variant === 'subtle' ? 0.12 : 0.17 }  
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

    // Fonction de rendu principal
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
        for (let x = 0; x <= canvas.width; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
        }

        // Lignes horizontales
        for (let y = 0; y <= canvas.height; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
        }

        ctx.stroke();
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

      // Dessiner les vagues en bas pour les variants default et subtle
      if (variant !== 'minimal') {
        const now = Date.now() / 1000;
        
        // Première vague (violet clair) - déplace de gauche à droite
        drawWave(
          canvas.height * 0.85,
          'rgba(233, 213, 255, 0.5)',
          variant === 'subtle' ? 15 : 20,
          0.03,
          now
        );
        
        // Deuxième vague (orange pâle) - déplace de droite à gauche (sens opposé)
        drawWave(
          canvas.height * 0.9,
          'rgba(253, 230, 138, 0.4)',
          variant === 'subtle' ? 20 : 25,
          0.025,
          -now + Math.PI // Direction opposée
        );
      }
    };

    // Fonction pour dessiner une vague
    const drawWave = (
      baseY: number,
      color: string,
      amplitude: number,
      frequency: number,
      time: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      // Dessiner une courbe sinusoïdale
      for (let x = 0; x <= canvas.width; x += 5) {
        const y = baseY + Math.sin(x * frequency + time) * amplitude;
        ctx.lineTo(x, y);
      }

      // Fermer le chemin
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = color;
      ctx.fill();
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
