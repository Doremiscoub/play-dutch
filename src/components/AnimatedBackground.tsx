
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { UI_CONFIG } from '@/config/uiConfig';

type AnimatedBackgroundVariant = 'default' | 'subtle' | 'minimal';

interface AnimatedBackgroundProps {
  variant?: AnimatedBackgroundVariant;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Configuration des points flottants
  const dotsConfig = {
    default: {
      count: 40,
      colors: UI_CONFIG.floatingDots.colors,
      sizes: UI_CONFIG.floatingDots.sizes,
      speed: 0.5
    },
    subtle: {
      count: 25,
      colors: UI_CONFIG.floatingDots.colors,
      sizes: UI_CONFIG.floatingDots.sizes.slice(0, 2), // Tailles plus petites
      speed: 0.3
    },
    minimal: {
      count: 15,
      colors: UI_CONFIG.floatingDots.colors.slice(0, 2), // Moins de couleurs
      sizes: [UI_CONFIG.floatingDots.sizes[0]], // Une seule taille
      speed: 0.2
    }
  };
  
  // Animation des points flottants sur canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajuster la taille du canvas à la fenêtre
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Créer les points
    const config = dotsConfig[variant];
    const dots: { 
      x: number; 
      y: number; 
      color: string; 
      size: number; 
      speedX: number;
      speedY: number;
    }[] = [];
    
    for (let i = 0; i < config.count; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        size: parseFloat(config.sizes[Math.floor(Math.random() * config.sizes.length)]),
        speedX: (Math.random() - 0.5) * config.speed,
        speedY: (Math.random() - 0.5) * config.speed
      });
    }
    
    // Animer les points
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
        
        // Mouvement
        dot.x += dot.speedX;
        dot.y += dot.speedY;
        
        // Rebonds sur les bords
        if (dot.x > canvas.width || dot.x < 0) dot.speedX *= -1;
        if (dot.y > canvas.height || dot.y < 0) dot.speedY *= -1;
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [variant]);
  
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Fond dégradé */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      
      {/* Grille */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='${UI_CONFIG.grid.size}' height='${UI_CONFIG.grid.size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L ${UI_CONFIG.grid.size} 0 M 0 0 L 0 ${UI_CONFIG.grid.size}' stroke='%23${UI_CONFIG.grid.color.substring(1)}' stroke-opacity='${UI_CONFIG.grid.opacity}' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
          backgroundSize: UI_CONFIG.grid.size
        }}
      />
      
      {/* Points flottants */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Vagues en bas (conditionnelles selon la variante) */}
      {variant !== 'minimal' && (
        <>
          <motion.div 
            className="absolute bottom-0 left-0 right-0 z-0"
            style={{
              height: '20vh',
              background: UI_CONFIG.waves.primaryColor,
              borderTopLeftRadius: '50%',
              borderTopRightRadius: '50%',
              opacity: 0.4
            }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.02, 1]
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
              height: '15vh',
              background: UI_CONFIG.waves.secondaryColor,
              borderTopLeftRadius: '50%',
              borderTopRightRadius: '50%',
              opacity: 0.4,
              transform: 'translateY(30%)'
            }}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.03, 1]
            }}
            transition={{
              duration: 10,
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
