
import React, { useRef, useEffect } from 'react';

/**
 * Composant global de fond animé unifié pour toute l'application
 */
const AnimatedBackground: React.FC = () => {
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
    const gridSize = 24; // Taille de la grille
    
    // Configuration des points flottants
    const dots: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];
    
    // Création des points animés
    const createDots = () => {
      const numDots = Math.min(30, Math.floor(canvas.width * canvas.height / 40000)); // Adapte le nombre de points à la taille de l'écran
      
      // Palette de couleurs unifiée
      const colors = [
        { r: 167, g: 139, b: 250, o: 0.2 }, // Violet clair
        { r: 253, g: 186, b: 116, o: 0.2 }, // Orange clair
        { r: 110, g: 231, b: 183, o: 0.15 }, // Vert très clair
        { r: 96, g: 165, b: 250, o: 0.15 }  // Bleu clair
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
      
      // Dessiner la grille
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

      // Dessiner les vagues en bas
      const now = Date.now() / 1000;
      
      // Première vague (violet clair)
      drawWave(
        canvas.height * 0.85,
        'rgba(233, 213, 255, 0.5)',
        20,
        0.03,
        now
      );
      
      // Deuxième vague (orange pâle)
      drawWave(
        canvas.height * 0.9,
        'rgba(253, 230, 138, 0.4)',
        25,
        0.025,
        now + Math.PI
      );
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
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
