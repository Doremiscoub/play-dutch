
interface GridConfig {
  size: number;
  color: string;
  opacity: number;
}

export const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, config: GridConfig) => {
  ctx.strokeStyle = `rgba(218, 218, 218, ${config.opacity})`;
  ctx.lineWidth = 1;
  ctx.beginPath();

  // Draw vertical lines
  for (let x = 0; x <= canvas.width; x += config.size) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
  }

  // Draw horizontal lines
  for (let y = 0; y <= canvas.height; y += config.size) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }

  ctx.stroke();
};
