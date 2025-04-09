
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

type AnimatedBackgroundVariant = 'default' | 'subtle' | 'minimal';

interface AnimatedBackgroundProps {
  variant?: AnimatedBackgroundVariant;
  className?: string;
  hideWaves?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'default',
  hideWaves = false,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentTheme } = useTheme();
  
  // Configuration des points flottants
  const dotsConfig = {
    default: {
      count: 30,
      colors: ['#A78BFA', '#FDBA74', '#6EE7B7', '#60A5FA'],
      sizes: [2, 4, 6, 8],
      speed: 0.4
    },
    subtle: {
      count: 20,
      colors: ['#A78BFA', '#FDBA74', '#6EE7B7', '#60A5FA'],
      sizes: [2, 4],
      speed: 0.3
    },
    minimal: {
      count: 10,
      colors: ['#A78BFA', '#60A5FA'],
      sizes: [2],
      speed: 0.2
    }
  };
  
  // Animation des points flottants sur canvas - Style VisionOS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const config = dotsConfig[variant];
    
    // Ajuster la taille du canvas à la fenêtre
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Créer les points
    const dots = Array.from({ length: config.count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: config.sizes[Math.floor(Math.random() * config.sizes.length)],
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      speedX: (Math.random() - 0.5) * config.speed,
      speedY: (Math.random() - 0.5) * config.speed,
      opacity: 0.1 + Math.random() * 0.5
    }));
    
    // Animation
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner les points
      dots.forEach(dot => {
        ctx.globalAlpha = dot.opacity;
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Déplacer les points
        dot.x += dot.speedX;
        dot.y += dot.speedY;
        
        // Rebondissement aux bords
        if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);
  
  // Fond avec quadrillage léger
  const gridStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L 24 0 M 0 0 L 0 24' stroke='%23DADADA' stroke-opacity='0.1' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
    backgroundSize: '24px 24px',
    position: 'absolute',
    inset: 0,
    zIndex: -1
  } as React.CSSProperties;
  
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Fond de couleur légère */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"
        style={{ zIndex: -3 }}
      />
      
      {/* Quadrillage léger */}
      <div style={gridStyle} />
      
      {/* Canvas pour les points flottants */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ zIndex: -2 }}
      />
      
      {/* Vagues en bas */}
      {!hideWaves && (
        <>
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-0"
            style={{ 
              height: '20%',
              background: 'linear-gradient(to top left, rgba(233, 213, 255, 0.6), rgba(233, 213, 255, 0.2))',
              borderTopLeftRadius: '100%',
              borderTopRightRadius: '100%',
              zIndex: -1
            }}
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-0"
            style={{ 
              height: '15%',
              background: 'linear-gradient(to top left, rgba(253, 230, 138, 0.4), rgba(253, 230, 138, 0.1))',
              borderTopLeftRadius: '100%',
              borderTopRightRadius: '100%',
              zIndex: -1
            }}
            animate={{
              y: [0, -8, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 0.5
            }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;
