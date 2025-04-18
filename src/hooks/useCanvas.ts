
import { useRef, useCallback, useState, useEffect } from 'react';

interface CanvasHook {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  getContext: () => CanvasRenderingContext2D | null;
  getCanvas: () => HTMLCanvasElement | null;
  setDimensions: () => void;
  dimensions: { width: number; height: number };
}

/**
 * Hook pour gérer un canvas et son contexte avec redimensionnement automatique
 */
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

  /**
   * Ajuste les dimensions du canvas pour qu'il corresponde à sa taille affichée
   */
  const setDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Obtenir la taille affichée du canvas
    const { width, height } = canvas.getBoundingClientRect();
    
    // DPI support pour éviter le flou sur les écrans haute résolution
    const dpr = window.devicePixelRatio || 1;
    
    // Définir les dimensions du canvas en tenant compte du DPI
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    // Ajuster le style pour maintenir la taille visuelle
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // Adapter le contexte au DPI
    const ctx = getContext();
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    setDimensionsState({ width, height });
  }, [getContext]);

  // Définir les dimensions initiales et les mettre à jour lors des redimensionnements
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
