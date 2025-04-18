
import { useRef, useCallback, useState, useEffect } from 'react';

interface CanvasHook {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  getContext: () => CanvasRenderingContext2D | null;
  getCanvas: () => HTMLCanvasElement | null;
  setDimensions: () => void;
  dimensions: { width: number; height: number };
}

export const useCanvas = (): CanvasHook => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensionsState] = useState({ width: 0, height: 0 });

  const getContext = useCallback((): CanvasRenderingContext2D | null => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext('2d') : null;
  }, []);

  const getCanvas = useCallback((): HTMLCanvasElement | null => {
    return canvasRef.current;
  }, []);

  const setDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    const ctx = getContext();
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    setDimensionsState({ width, height });
  }, [getContext]);

  useEffect(() => {
    setDimensions();
    
    const handleResize = () => {
      setDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setDimensions]);

  return {
    canvasRef,
    getContext,
    getCanvas,
    setDimensions,
    dimensions
  };
};
