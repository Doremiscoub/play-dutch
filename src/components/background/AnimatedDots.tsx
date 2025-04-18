
import React from 'react';

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

const dotsCache: { dots: Dot[], initialized: boolean } = {
  dots: [],
  initialized: false
};

export const drawDots = ({ ctx, canvas, time }: AnimatedDotsProps) => {
  if (!dotsCache.initialized) {
    const numDots = Math.min(25, Math.max(15, Math.floor(canvas.width * canvas.height / 50000)));
    
    const colors = [
      { r: 167, g: 139, b: 250 }, // Violet #A78BFA
      { r: 253, g: 186, b: 116 }, // Orange #FDBA74
      { r: 110, g: 231, b: 183 }, // Green #6EE7B7
      { r: 96, g: 165, b: 250 }  // Blue #60A5FA
    ];
    
    for (let i = 0; i < numDots; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      const opacity = 0.5 + Math.random() * 0.3;
      
      dotsCache.dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 3 + Math.random() * 4,
        // Vitesse TRÈS réduite pour un mouvement extrêmement lent et subtil
        speedX: (Math.random() - 0.5) * 0.005, // Réduit drastiquement
        speedY: (Math.random() - 0.5) * 0.005, // Réduit drastiquement
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`,
        opacity,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    dotsCache.initialized = true;
  }

  // Ajustement au redimensionnement
  if (dotsCache.initialized && dotsCache.dots.length > 0) {
    dotsCache.dots.forEach(dot => {
      if (dot.x > canvas.width) dot.x = Math.random() * canvas.width;
      if (dot.y > canvas.height) dot.y = Math.random() * canvas.height;
    });
  }

  // Dessin et mise à jour des points
  dotsCache.dots.forEach(dot => {
    // Mouvement beaucoup plus fluide et extrêmement lent
    // Réduction drastique de la vitesse d'oscillation
    const offsetX = Math.sin(time * 0.02 + dot.phase) * 0.2; // Réduction forte
    const offsetY = Math.cos(time * 0.015 + dot.phase) * 0.2; // Réduction forte
    
    ctx.beginPath();
    ctx.arc(dot.x + offsetX, dot.y + offsetY, dot.size, 0, Math.PI * 2);
    ctx.fillStyle = dot.color;
    ctx.fill();

    // Mise à jour de la position avec vitesse extrêmement réduite
    dot.x += dot.speedX * 0.25; // Réduction drastique
    dot.y += dot.speedY * 0.25; // Réduction drastique

    // Rebond aux bords avec transition douce
    if (dot.x < 0 || dot.x > canvas.width) {
      dot.speedX *= -0.5; // Ralentissement encore plus important
      dot.x = Math.max(0, Math.min(dot.x, canvas.width));
    }
    if (dot.y < 0 || dot.y > canvas.height) {
      dot.speedY *= -0.5;
      dot.y = Math.max(0, Math.min(dot.y, canvas.height));
    }
    
    // Limitation de la vitesse pour éviter les mouvements brusques
    dot.speedX = Math.max(-0.005, Math.min(0.005, dot.speedX)); // Valeur max très faible
    dot.speedY = Math.max(-0.005, Math.min(0.005, dot.speedY)); // Valeur max très faible
  });
};
