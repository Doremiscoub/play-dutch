
/**
 * Utilitaire pour gérer les animations et leur timing
 */

// Type de fonction de dessin pour le canvas
type DrawFn = (time: number) => void;

// Interface pour le contrôleur d'animation
interface AnimationController {
  start: () => void;
  stop: () => void;
  isPaused: () => boolean;
  toggle: () => void;
}

/**
 * Crée une boucle d'animation optimisée avec contrôle de FPS
 * Gère automatiquement requestAnimationFrame et sa suppression
 */
export const createAnimationLoop = (
  drawFn: DrawFn, 
  targetFps: number = 60
): AnimationController => {
  let animationId: number | null = null;
  let lastTime: number = 0;
  let paused: boolean = true;
  const interval: number = 1000 / targetFps;
  
  // Fonction de boucle principale
  const loop = (timestamp: number) => {
    if (paused) return;
    
    animationId = requestAnimationFrame(loop);
    
    const elapsed = timestamp - lastTime;
    
    // Limiter le FPS pour optimiser les performances
    if (elapsed > interval) {
      // Ajuster le timestamp pour maintenir la synchronisation
      lastTime = timestamp - (elapsed % interval);
      
      try {
        drawFn(timestamp);
      } catch (error) {
        console.error('Erreur dans la fonction de dessin:', error);
        // Ne pas arrêter l'animation en cas d'erreur pour que l'affichage continue
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
