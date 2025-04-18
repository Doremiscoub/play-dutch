
import { useRef, useEffect } from 'react';

interface UseCanvasProps {
  onResize?: () => void;
}

export const useCanvas = ({ onResize }: UseCanvasProps = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        onResize?.();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [onResize]);

  return {
    canvasRef,
    getContext: () => canvasRef.current?.getContext('2d'),
    getCanvas: () => canvasRef.current,
  };
};
