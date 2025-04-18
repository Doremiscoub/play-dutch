
import React, { useEffect } from 'react';

interface Dot {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  phase: number;
}

interface AnimatedDotsProps {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  time: number;
}

// Cache des points pour éviter de les recréer à chaque frame
const dotsCache: { dots: Dot[], initialized: boolean } = {
  dots: [],
  initialized: false
};

export const drawDots = ({ ctx, canvas, time }: AnimatedDotsProps) => {
  // Créer les points une seule fois s'ils n'existent pas
  if (!dotsCache.initialized) {
    const numDots = Math.min(30, Math.max(15, Math.floor(canvas.width * canvas.height / 40000)));
    
    const colors = [
      { r: 167, g: 139, b: 250 }, // Violet #A78BFA
      { r: 253, g: 186, b: 116 }, // Orange #FDBA74
      { r: 110, g: 231, b: 183 }, // Green #6EE7B7
      { r: 96, g: 165, b: 250 }  // Blue #60A5FA
    ];
    
    for (let i = 0; i < numDots; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      const opacity = 0.15 + Math.random() * 0.2;
      
      dotsCache.dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.05, // Vitesse considérablement réduite
        speedY: (Math.random() - 0.5) * 0.05, // Vitesse considérablement réduite
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`,
        opacity,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    dotsCache.initialized = true;
  }

  // Adapter les points au redimensionnement de la fenêtre
  if (dotsCache.initialized && dotsCache.dots.length > 0) {
    dotsCache.dots.forEach(dot => {
      if (dot.x > canvas.width) dot.x = Math.random() * canvas.width;
      if (dot.y > canvas.height) dot.y = Math.random() * canvas.height;
    });
  }

  // Dessiner et mettre à jour les points
  dotsCache.dots.forEach(dot => {
    // Mouvement très subtil basé sur des fonctions sinusoïdales lentes
    const offsetX = Math.sin(time * 0.2 + dot.phase) * 0.5;
    const offsetY = Math.cos(time * 0.15 + dot.phase) * 0.5;
    
    ctx.beginPath();
    ctx.arc(dot.x + offsetX, dot.y + offsetY, dot.size, 0, Math.PI * 2);
    ctx.fillStyle = dot.color;
    ctx.fill();

    // Mise à jour très lente de la position
    dot.x += dot.speedX;
    dot.y += dot.speedY;

    // Rebond aux bords avec une transition douce
    if (dot.x < 0 || dot.x > canvas.width) {
      dot.speedX *= -1;
      // Légère variation de vitesse pour éviter le mouvement mécanique
      dot.speedX += (Math.random() - 0.5) * 0.01;
    }
    if (dot.y < 0 || dot.y > canvas.height) {
      dot.speedY *= -1;
      dot.speedY += (Math.random() - 0.5) * 0.01;
    }
    
    // Maintenir des vitesses très faibles
    dot.speedX = Math.max(-0.08, Math.min(0.08, dot.speedX));
    dot.speedY = Math.max(-0.08, Math.min(0.08, dot.speedY));
  });
};
