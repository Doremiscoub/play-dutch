
interface Wave {
  height: number;
  color: string;
  speed: number;
  amplitude: number;
  frequency: number;
  opacity: number;
  direction: 'left' | 'right';
  yOffset: number;
}

export const waves: Wave[] = [
  { 
    height: 0.5, // Première vague (dessus) - violette
    color: '#E9D5FF', // Violet très pâle
    speed: 0.004, 
    amplitude: 30,
    frequency: 0.005,
    opacity: 0.95,
    direction: 'right',
    yOffset: 0
  },
  { 
    height: 0.6, // Deuxième vague (dessous)
    color: '#FDE68A', // Orange très pâle
    speed: 0.003,
    amplitude: 25,
    frequency: 0.006,
    opacity: 0.85,
    direction: 'left',
    yOffset: 20
  }
];

export const drawWaves = (
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null,
  time: number
) => {
  if (!ctx || !canvas) return;
  
  try {
    if (!canvas.isConnected || canvas.width === 0 || canvas.height === 0) {
      return;
    }
    
    if (typeof ctx.clearRect !== 'function') {
      return;
    }
    
    for (let i = waves.length - 1; i >= 0; i--) {
      const wave = waves[i];
      const yBase = canvas.height - (canvas.height * wave.height) + wave.yOffset;
      
      try {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        const adjustedAmplitude = Math.min(wave.amplitude, canvas.height * 0.1);
        
        const step = 1;
        for (let x = 0; x <= canvas.width; x += step) {
          const dx = x * wave.frequency;
          const timeOffset = wave.direction === 'right' ? time * wave.speed : -time * wave.speed;
          const y = yBase + Math.sin(dx + timeOffset) * adjustedAmplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        
        const gradient = ctx.createLinearGradient(0, yBase - adjustedAmplitude, 0, canvas.height);
        gradient.addColorStop(0, wave.color);
        const colorWithAlpha = wave.color + Math.floor(wave.opacity * 255).toString(16).padStart(2, '0');
        gradient.addColorStop(1, colorWithAlpha);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      } catch (drawError) {
        console.error("Erreur lors du dessin d'une vague:", drawError);
      }
    }
  } catch (error) {
    console.error("Erreur lors du dessin des vagues:", error);
  }
};
