
interface Wave {
  height: number;
  color: string;
  speed: number;
  amplitude: number;
  frequency: number;
  opacity: number;
  direction: 'left' | 'right';
}

export const waves: Wave[] = [
  { 
    height: 0.5,
    color: '#E9D5FF', // Violet très pâle (vague du dessus)
    speed: 0.015,
    amplitude: 50,
    frequency: 0.005,
    opacity: 1.0,
    direction: 'right'
  },
  { 
    height: 0.55, // Légèrement plus haute que la première
    color: '#FDE68A', // Orange très pâle (vague du dessous)
    speed: 0.012, // Légèrement plus lente
    amplitude: 40,
    frequency: 0.006,
    opacity: 0.9,
    direction: 'left'
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
    
    // Dessin de la vague avec une courbe naturelle
    for (let x = 0; x <= canvas.width; x += 2) {
      const dx = x * wave.frequency;
      const timeOffset = wave.direction === 'right' ? time * wave.speed : -time * wave.speed;
      const y = yBase + Math.sin(dx + timeOffset) * wave.amplitude;
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    
    // Dégradé pour un effet plus naturel
    const gradient = ctx.createLinearGradient(0, yBase - wave.amplitude, 0, canvas.height);
    gradient.addColorStop(0, wave.color);
    gradient.addColorStop(1, wave.color + '80'); // Semi-transparent en bas
    
    ctx.fillStyle = gradient;
    ctx.fill();
  });
};
