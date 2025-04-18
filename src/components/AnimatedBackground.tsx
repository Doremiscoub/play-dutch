
import React from 'react';
import { drawWaves } from '@/utils/waveAnimations';
import { drawDots } from '@/components/background/AnimatedDots';
import { drawGrid } from '@/utils/gridUtils';
import { createAnimationLoop } from '@/utils/animationTimingUtils';
import { useCanvas } from '@/hooks/useCanvas';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  const { canvasRef, getContext, getCanvas } = useCanvas();
  
  React.useEffect(() => {
    const ctx = getContext();
    const canvas = getCanvas();
    if (!ctx || !canvas) return;
    
    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Grid (if not minimal)
      if (variant !== 'minimal') {
        drawGrid(ctx, canvas, {
          size: 24,
          color: '#DADADA',
          opacity: 0.1
        });
      }

      // Animated elements
      drawDots({ ctx, canvas, time });
      drawWaves(ctx, canvas, time);
    };

    const animation = createAnimationLoop(draw);
    animation.start();
    
    return () => {
      animation.stop();
    };
  }, [variant, getContext, getCanvas]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
