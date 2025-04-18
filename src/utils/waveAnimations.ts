
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
    speed: 0.008, 
    amplitude: 15,
    frequency: 0.008,
    opacity: 0.8
  },
  { 
    height: 0.22, 
    color: '#FDE68A', // Orange très pâle
    speed: 0.006, 
    amplitude: 12,
    frequency: 0.007,
    opacity: 0.6
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
    const segments = 40; // Plus de segments pour une courbe plus douce
    const points: { x: number, y: number }[] = [];
    
    // Générer des points de contrôle pour une animation plus fluide
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * canvas.width;
      const dx = x + (time * wave.speed * 100);
      
      // Fonction sinusoïdale plus douce pour l'animation
      const y = yBase + 
        Math.sin(dx * wave.frequency) * wave.amplitude +
        Math.sin(dx * wave.frequency * 1.5) * (wave.amplitude * 0.3);
      
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

    // Dégradé pour chaque vague avec une meilleure transparence
    const gradient = ctx.createLinearGradient(0, yBase - 10, 0, canvas.height);
    gradient.addColorStop(0, wave.color + (Math.floor(wave.opacity * 255).toString(16).padStart(2, '0'))); // Partie supérieure
    gradient.addColorStop(1, wave.color + '20'); // Très transparent en bas
  
    ctx.fillStyle = gradient;
    ctx.fill();
  });
};
