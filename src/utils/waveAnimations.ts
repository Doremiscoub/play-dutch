
interface Wave {
  height: number;
  color: string;
  speed: number;
  amplitude: number;
  frequency: number;
}

export const waves: Wave[] = [
  { 
    height: 0.25, 
    color: '#E9D5FF', // Violet clair
    speed: 0.03, 
    amplitude: 25,
    frequency: 0.02
  },
  { 
    height: 0.22, 
    color: '#FDE68A', // Jaune pâle
    speed: 0.04, 
    amplitude: 20,
    frequency: 0.015
  },
  { 
    height: 0.20, 
    color: '#93C5FD', // Bleu clair
    speed: 0.035, 
    amplitude: 30,
    frequency: 0.025
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
  
    // Utilisation de courbes de Bézier pour des vagues plus naturelles
    for (let x = 0; x <= canvas.width; x += canvas.width / 20) {
      const dx = x + (time * wave.speed * 100);
      const y = yBase + 
        Math.sin(dx * wave.frequency) * wave.amplitude +
        Math.sin(dx * wave.frequency * 2) * (wave.amplitude * 0.5);
    
      if (x === 0) {
        ctx.lineTo(x, y);
      } else {
        const xc = x - (canvas.width / 40);
        const yc = y;
        ctx.quadraticCurveTo(x, y, xc, yc);
      }
    }
  
    ctx.lineTo(canvas.width, canvas.height);
    ctx.closePath();

    // Dégradé pour chaque vague
    const gradient = ctx.createLinearGradient(0, yBase, 0, canvas.height);
    gradient.addColorStop(0, wave.color + '80'); // Semi-transparent en haut
    gradient.addColorStop(1, wave.color + '20'); // Très transparent en bas
  
    ctx.fillStyle = gradient;
    ctx.fill();
  });
};
