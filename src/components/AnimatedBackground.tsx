
import React, { useRef, useEffect } from 'react';
import { drawWaves } from '@/utils/waveAnimations';
import { drawDots } from '@/components/background/AnimatedDots';

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

    // Animation loop
    let animationId: number;
    let lastTimestamp = 0;
    
    const draw = (timestamp: number = 0) => {
      const time = timestamp / 1000;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background color based on variant
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid (if not minimal)
      if (variant !== 'minimal') {
        ctx.strokeStyle = 'rgba(218, 218, 218, 0.1)';
        ctx.beginPath();

        for (let x = 0; x <= canvas.width; x += 24) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
        }

        for (let y = 0; y <= canvas.height; y += 24) {
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
        }

        ctx.stroke();
      }

      // Draw animated elements
      drawDots({ ctx, canvas, time });
      drawWaves(ctx, canvas, time);
    };

    const animate = (timestamp: number) => {
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
