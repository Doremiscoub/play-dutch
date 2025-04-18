
interface Wave {
  height: number;
  color: string;
  speed: number;
  amplitude: number;
  frequency: number;
  opacity: number;
  direction: 'left' | 'right';
  yOffset: number; // Attribut pour décaler verticalement
}

export const waves: Wave[] = [
  { 
    height: 0.5, // Première vague (dessus)
    color: '#E9D5FF', // Violet très pâle
    speed: 0.015,
    amplitude: 50,
    frequency: 0.005,
    opacity: 1.0,
    direction: 'right',
    yOffset: 0 // Pas de décalage
  },
  { 
    height: 0.65, // Deuxième vague (dessous), plus haute pour être bien visible
    color: '#FDE68A', // Orange très pâle
    speed: 0.012, // Plus lente
    amplitude: 40,
    frequency: 0.006,
    opacity: 0.9,
    direction: 'left', // Direction opposée
    yOffset: 20 // Décalée vers le bas pour mieux la voir
  }
];

export const drawWaves = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number
) => {
  // D'abord dessiner la vague d'arrière-plan (orange), puis celle du premier plan (violette)
  // Ceci assure un ordre de superposition correct
  for (let i = waves.length - 1; i >= 0; i--) {
    const wave = waves[i];
    const yBase = canvas.height - (canvas.height * wave.height) + wave.yOffset;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    
    // Ajuster l'amplitude en fonction de la hauteur du canvas pour garantir un aspect cohérent
    const adjustedAmplitude = Math.min(wave.amplitude, canvas.height * 0.1);
    
    // Dessin de la vague avec une courbe naturelle
    for (let x = 0; x <= canvas.width; x += 2) {
      const dx = x * wave.frequency;
      // La direction influence la direction de l'animation
      const timeOffset = wave.direction === 'right' ? time * wave.speed : -time * wave.speed;
      const y = yBase + Math.sin(dx + timeOffset) * adjustedAmplitude;
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    
    // Dégradé pour un effet plus naturel
    const gradient = ctx.createLinearGradient(0, yBase - adjustedAmplitude, 0, canvas.height);
    gradient.addColorStop(0, wave.color);
    const colorWithAlpha = wave.color + Math.floor(wave.opacity * 128).toString(16).padStart(2, '0');
    gradient.addColorStop(1, colorWithAlpha);
    
    ctx.fillStyle = gradient;
    ctx.fill();
  }
};
