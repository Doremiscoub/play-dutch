
export const FPS = 60;
export const FRAME_DURATION = 1000 / FPS;

export const requestAnimationFrameWithLimit = (
  callback: (timestamp: number) => void,
  fps: number = FPS
) => {
  let lastFrameTime = 0;
  
  const animate = (timestamp: number) => {
    const elapsed = timestamp - lastFrameTime;
    
    if (elapsed > 1000 / fps) {
      lastFrameTime = timestamp;
      callback(timestamp);
    }
    
    return requestAnimationFrame(animate);
  };
  
  return requestAnimationFrame(animate);
};

export const createAnimationLoop = (
  draw: (time: number) => void,
  cleanup?: () => void
) => {
  let animationId: number;
  let previousTime = 0;
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;
  
  const loop = (timestamp: number) => {
    animationId = requestAnimationFrame(loop);
    
    const elapsed = timestamp - previousTime;
    
    if (elapsed > frameInterval) {
      // Ajuster le temps précédent pour éviter l'accumulation
      previousTime = timestamp - (elapsed % frameInterval);
      
      // Convertir les millisecondes en secondes pour un mouvement plus contrôlé
      // Utiliser une vitesse réduite pour un mouvement plus lent
      draw(timestamp / 2000); // Divisé par 2000 au lieu de 1000 pour ralentir encore plus
    }
  };
  
  const start = () => {
    previousTime = performance.now();
    animationId = requestAnimationFrame(loop);
  };
  
  const stop = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      cleanup?.();
    }
  };
  
  return { start, stop };
};
