import React, { useRef, useEffect } from 'react';
import { DESIGN_TOKENS } from '@/design';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef<number>(0);
  const fpsRef = useRef<{count: number, lastTime: number, value: number}>({
    count: 0,
    lastTime: 0,
    value: 0
  });
  const isVisibleRef = useRef<boolean>(true);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const waveConfig = {
      baselineHeight: canvas.height * 0.85,
      frequencyViolet: 0.008,
      frequencyYellow: 0.012,
      animationSpeed: 0.05,
      phaseIncrement: 0.0125
    };

    const dots: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    const createDots = () => {
      const numDots = variant === 'minimal' 
        ? Math.floor(15 * 1.3) 
        : Math.min(Math.floor(30 * 1.3), Math.floor(canvas.width * canvas.height / 30000));
      
      // Points noirs comme dans l'image de référence
      const baseOpacity = variant === 'minimal' ? 0.4 : variant === 'subtle' ? 0.6 : 0.8;

      for (let i = 0; i < numDots; i++) {
        const isLargeDot = Math.random() < 0.15;
        const opacity = baseOpacity * (0.7 + Math.random() * 0.3);
        
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: isLargeDot ? 8 + Math.random() * 6 : 3 + Math.random() * 4,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          color: `${DESIGN_TOKENS.primitive.neutral[900]}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`
        });
      }
    };

    createDots();

    const drawWave = (
      baseY: number,
      color: string | CanvasGradient,
      amplitude: number,
      phase: number,
      direction: 'left' | 'right' = 'left',
      frequency: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      const step = 1;
      for (let x = 0; x <= canvas.width; x += step) {
        const wavePhase = direction === 'left' ? phase : -phase;
        const y = baseY + (Math.sin((x * frequency) + wavePhase) * amplitude);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const updateFPS = () => {
      const now = performance.now();
      fpsRef.current.count++;
      
      if (now - fpsRef.current.lastTime >= 1000) {
        fpsRef.current.value = fpsRef.current.count;
        fpsRef.current.count = 0;
        fpsRef.current.lastTime = now;
        // Désactivé en production
        // console.log(`Wave Animation FPS: ${fpsRef.current.value}, Phase: ${phaseRef.current.toFixed(2)}`);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (variant !== 'minimal') {
        // Grille grise subtile comme dans l'image de référence
        ctx.strokeStyle = `${DESIGN_TOKENS.primitive.neutral[400]}20`;
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (let x = 0; x <= canvas.width; x += 24) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
        }

        for (let y = 0; y <= canvas.height; y += 24) {
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
        }

        ctx.stroke();
      }

      if (variant !== 'minimal') {
        const currentPhase = phaseRef.current;
        
        // Vague subtile unique comme dans l'image de référence
        drawWave(
          canvas.height * 0.95, // Plus bas pour être très discrète
          `${DESIGN_TOKENS.primitive.neutral[600]}08`, // Opacité très faible (3%)
          15, // Amplitude réduite
          currentPhase,
          'left',
          waveConfig.frequencyViolet
        );
        
        phaseRef.current += waveConfig.phaseIncrement;
      }

      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();

        dot.x += dot.speedX;
        dot.y += dot.speedY;

        if (dot.x <= 0 || dot.x >= canvas.width) dot.speedX *= -1;
        if (dot.y <= 0 || dot.y >= canvas.height) dot.speedY *= -1;
      });
      
      updateFPS();
    };

    let animationId: number;
    let lastTime = 0;
    const targetFPS = 30; // Réduire de 60 FPS à 30 FPS pour éviter les conflits
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      if (isVisibleRef.current && currentTime - lastTime >= frameInterval) {
        draw();
        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };

    // Gérer la visibilité de la page pour optimiser les performances
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [variant]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
