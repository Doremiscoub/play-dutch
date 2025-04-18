
export const FPS = 60;
export const FRAME_DURATION = 1000 / FPS;

export const requestAnimationFrameWithLimit = (
  callback: (timestamp: number) => void,
  fps: number = FPS
) => {
  let lastFrameTime = 0;
  
  const animate = (timestamp: number) => {
    const elapsed = timestamp - lastFrameTime;
    
    if (elapsed > FRAME_DURATION) {
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
  
  const start = () => {
    animationId = requestAnimationFrameWithLimit((timestamp) => {
      draw(timestamp / 1000); // Convert to seconds
    });
  };
  
  const stop = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      cleanup?.();
    }
  };
  
  return { start, stop };
};
