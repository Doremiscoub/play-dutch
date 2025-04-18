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

export const drawDots = ({ ctx, canvas, time }: AnimatedDotsProps) => {
  const dots: Dot[] = [];
  
  const colors = [
    { r: 167, g: 139, b: 250 }, // Violet #A78BFA
    { r: 253, g: 186, b: 116 }, // Orange #FDBA74
    { r: 110, g: 231, b: 183 }, // Green #6EE7B7
    { r: 96, g: 165, b: 250 }, // Blue #60A5FA
    { r: 249, g: 115, b: 22 }, // Dutch Orange #F97316
    { r: 139, g: 92, b: 246 }  // Dutch Purple #8B5CF6
  ];

  // Create dots if they don't exist
  if (dots.length === 0) {
    const numDots = Math.min(50, Math.max(20, Math.floor(canvas.width * canvas.height / 30000)));
    
    for (let i = 0; i < numDots; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      const opacity = 0.15 + Math.random() * 0.25;
      
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2 + Math.random() * 6,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`,
        opacity,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  // Draw and update dots
  dots.forEach(dot => {
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
      dot.speedX += (Math.random() - 0.5) * 0.1;
    }
    if (dot.y < 0 || dot.y > canvas.height) {
      dot.speedY *= -1;
      dot.speedY += (Math.random() - 0.5) * 0.1;
    }
    
    // Keep speeds in check
    dot.speedX = Math.max(-0.5, Math.min(0.5, dot.speedX));
    dot.speedY = Math.max(-0.5, Math.min(0.5, dot.speedY));
  });
};
