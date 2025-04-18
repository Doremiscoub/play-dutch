
interface Wave {
  height: number;
  color: string;
  speed: number;
  amplitude: number;
  frequency: number;
  opacity: number;
}

export const waves: Wave[] = [
  { 
    height: 0.5, // Augmenté considérablement pour rendre les vagues visibles
    color: '#E9D5FF', // Violet très pâle
    speed: 0.02, // Vitesse modérée
    amplitude: 50, // Amplitude très augmentée pour garantir la visibilité
    frequency: 0.005,
    opacity: 1.0 // Opacité maximale
  },
  { 
    height: 0.55, // Légèrement plus haut que la première vague 
    color: '#FDE68A', // Orange très pâle
    speed: 0.015, // Légèrement différent pour un effet naturel
    amplitude: 40, // Amplitude importante
    frequency: 0.006,
    opacity: 0.9 // Opacité élevée
  }
];

export const drawWaves = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number
) => {
  // Dessiner chaque vague
  waves.forEach((wave) => {
    const yBase = canvas.height - (canvas.height * wave.height);
    
    ctx.beginPath();
    
    // Commencer en bas à gauche pour s'assurer que la vague est bien fermée
    ctx.moveTo(0, canvas.height);
    
    // Dessiner la vague avec une méthode ultra-simplifiée pour garantir la visibilité
    for (let x = 0; x <= canvas.width; x += 5) {
      const dx = x * wave.frequency;
      const y = yBase + Math.sin(dx + time * wave.speed) * wave.amplitude;
      ctx.lineTo(x, y);
    }
    
    // Fermer la forme en bas à droite puis retour en bas à gauche
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    
    // Remplir avec un dégradé pour un effet plus visible
    const gradient = ctx.createLinearGradient(0, yBase - wave.amplitude, 0, canvas.height);
    gradient.addColorStop(0, wave.color); 
    gradient.addColorStop(1, wave.color + '80'); // Semi-transparent en bas
    
    ctx.fillStyle = gradient;
    ctx.fill();
  });
};
