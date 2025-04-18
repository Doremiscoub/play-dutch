
import { useRef, useEffect } from 'react';

interface UseCanvasProps {
  onResize?: () => void;
}

export const useCanvas = ({ onResize }: UseCanvasProps = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = Math.floor(window.innerWidth);
        const displayHeight = Math.floor(window.innerHeight);
        
        // Définir les dimensions réelles du canvas pour une meilleure netteté
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        
        // Ajuster la taille d'affichage CSS
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        
        // Ajuster l'échelle en fonction du DPR
        ctx.scale(dpr, dpr);
        
        onResize?.();
      }
    };

    resizeCanvas();
    
    // Écouter les événements de redimensionnement de la fenêtre
    window.addEventListener('resize', resizeCanvas);
    
    // Écouter les changements d'orientation sur mobile
    window.addEventListener('orientationchange', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
    };
  }, [onResize]);

  return {
    canvasRef,
    getContext: () => {
      const canvas = canvasRef.current;
      return canvas ? canvas.getContext('2d') : null;
    },
    getCanvas: () => canvasRef.current,
  };
};
