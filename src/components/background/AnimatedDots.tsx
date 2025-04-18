
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
  if (!ctx || !canvas) return;
  
  if (!dotsCache.initialized) {
    const numDots = Math.min(25, Math.max(15, Math.floor(canvas.width * canvas.height / 50000)));
    
    const colors = [
      { r: 167, g: 139, b: 250 }, // Violet #A78BFA
      { r: 253, g: 186, b: 116 }, // Orange #FDBA74
      { r: 110, g: 231, b: 183 }, // Green #6EE7B7
      { r: 96, g: 165, b: 250 }  // Blue #60A5FA
    ];
    
    dotsCache.dots = [];
    
    for (let i = 0; i < numDots; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      const opacity = 0.5 + Math.random() * 0.3;
      
      dotsCache.dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 3 + Math.random() * 4,
        speedX: (Math.random() - 0.5) * 0.003,
        speedY: (Math.random() - 0.5) * 0.003,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`,
        opacity,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    dotsCache.initialized = true;
  }

  if (dotsCache.initialized && dotsCache.dots.length > 0) {
    dotsCache.dots.forEach(dot => {
      if (dot.x > canvas.width) dot.x = Math.random() * canvas.width;
      if (dot.y > canvas.height) dot.y = Math.random() * canvas.height;
    });
  }

  dotsCache.dots.forEach(dot => {
    const offsetX = Math.sin(time * 0.01 + dot.phase) * 0.2;
    const offsetY = Math.cos(time * 0.0075 + dot.phase) * 0.2;
    
    ctx.beginPath();
    ctx.arc(dot.x + offsetX, dot.y + offsetY, dot.size, 0, Math.PI * 2);
    ctx.fillStyle = dot.color;
    ctx.fill();

    dot.x += dot.speedX * 0.15;
    dot.y += dot.speedY * 0.15;

    if (dot.x < 0 || dot.x > canvas.width) {
      dot.speedX *= -0.5;
      dot.x = Math.max(0, Math.min(dot.x, canvas.width));
    }
    if (dot.y < 0 || dot.y > canvas.height) {
      dot.speedY *= -0.5;
      dot.y = Math.max(0, Math.min(dot.y, canvas.height));
    }
    
    dot.speedX = Math.max(-0.003, Math.min(0.003, dot.speedX));
    dot.speedY = Math.max(-0.003, Math.min(0.003, dot.speedY));
  });
};
