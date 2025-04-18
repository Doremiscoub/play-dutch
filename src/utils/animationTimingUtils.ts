
type DrawFn = (time: number) => void;

interface AnimationController {
  start: () => void;
  stop: () => void;
  isPaused: () => boolean;
  toggle: () => void;
}

export const createAnimationLoop = (
  drawFn: DrawFn, 
  targetFps: number = 60
): AnimationController => {
  let animationId: number | null = null;
  let lastTime: number = 0;
  let paused: boolean = true;
  const interval: number = 1000 / targetFps;
  
  const loop = (timestamp: number) => {
    if (paused) return;
    
    animationId = requestAnimationFrame(loop);
    
    const elapsed = timestamp - lastTime;
    
    if (elapsed > interval) {
      lastTime = timestamp - (elapsed % interval);
      
      try {
        drawFn(timestamp);
      } catch (error) {
        console.error('Erreur dans la fonction de dessin:', error);
      }
    }
  };
  
  return {
    start: () => {
      if (paused) {
        paused = false;
        lastTime = 0;
        animationId = requestAnimationFrame(loop);
      }
    },
    
    stop: () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      paused = true;
    },
    
    isPaused: () => paused,
    
    toggle: () => {
      if (paused) {
        paused = false;
        lastTime = 0;
        animationId = requestAnimationFrame(loop);
      } else {
        if (animationId !== null) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
        paused = true;
      }
    }
  };
};
