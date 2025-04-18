
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
    height: 0.25, 
    color: '#E9D5FF', // Violet très pâle
    speed: 0.03, // Augmenté pour une animation plus visible
    amplitude: 25, // Augmenté pour des vagues plus prononcées
    frequency: 0.008,
    opacity: 0.9 // Augmenté pour plus de visibilité
  },
  { 
    height: 0.22, 
    color: '#FDE68A', // Orange très pâle
    speed: 0.025, // Augmenté pour une animation plus visible
    amplitude: 20, // Augmenté pour des vagues plus prononcées
    frequency: 0.007,
    opacity: 0.8 // Augmenté pour plus de visibilité
  }
];

export const drawWaves = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number
) => {
  waves.forEach((wave) => {
    const yBase = canvas.height - (canvas.height * wave.height);
  
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    
    // Utilisation de courbes de Bézier plus douces pour des vagues naturelles
    const segments = 10; // Réduction du nombre de segments pour des courbes plus fluides
    const points: { x: number, y: number }[] = [];
    
    // Générer des points pour une animation fluide
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * canvas.width;
      const dx = (x * wave.frequency) + (time * wave.speed);
      
      // Fonction sinusoïdale plus simple pour l'animation
      const y = yBase + Math.sin(dx) * wave.amplitude;
      
      points.push({ x, y });
    }
    
    // Dessiner le chemin avec des courbes
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(points[0].x, points[0].y);
    
    // Utiliser des courbes de Bézier pour connecter les points
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    
    // Fermer le chemin
    ctx.lineTo(canvas.width, canvas.height);
    ctx.closePath();

    // Remplissage avec un dégradé plus visible
    const gradient = ctx.createLinearGradient(0, yBase - wave.amplitude, 0, canvas.height);
    gradient.addColorStop(0, wave.color); // Couleur pleine en haut pour plus de visibilité
    gradient.addColorStop(1, wave.color + '40'); // Plus transparent en bas
  
    ctx.fillStyle = gradient;
    ctx.fill();
  });
};
