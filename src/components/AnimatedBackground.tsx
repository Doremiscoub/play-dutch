
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { UI_CONFIG } from '@/config/uiConfig';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation des points
  useEffect(() => {
    if (variant === 'minimal') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Configuration des points
    const dots = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 2 + Math.random() * 6,
      color: UI_CONFIG.floatingDots.colors[Math.floor(Math.random() * UI_CONFIG.floatingDots.colors.length)],
      vx: Math.random() * 0.2 - 0.1,
      vy: Math.random() * 0.2 - 0.1,
      opacity: 0.1 + Math.random() * 0.4
    }));
    
    // Ajuster la taille du canvas lors du redimensionnement
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Animation
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dessiner les points
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color + Math.floor(dot.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Mettre à jour la position
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        // Rebondir sur les bords
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [variant]);
  
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Fond de base avec grille */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 to-gray-200/80 bg-fixed" />
      
      {/* Grille de fond */}
      <div className="absolute inset-0 bg-grid opacity-10" style={{ backgroundSize: '24px 24px' }} />
      
      {/* Points animés */}
      {variant !== 'minimal' && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      )}
      
      {/* Vagues en bas de l'écran */}
      {variant !== 'minimal' && (
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
          <motion.svg
            width="100%"
            height="200"
            preserveAspectRatio="none"
            className="w-full h-auto"
            viewBox="0 0 1440 320"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.path
              fill="#E9D5FF" 
              fillOpacity="0.3"
              d="M0,160 C320,220 640,280 960,240 C1280,200 1440,160 1440,160 L1440,320 L0,320 Z"
              animate={{
                d: [
                  "M0,160 C320,220 640,280 960,240 C1280,200 1440,160 1440,160 L1440,320 L0,320 Z",
                  "M0,180 C320,240 640,260 960,220 C1280,180 1440,180 1440,180 L1440,320 L0,320 Z",
                  "M0,160 C320,220 640,280 960,240 C1280,200 1440,160 1440,160 L1440,320 L0,320 Z",
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.path
              fill="#FDE68A" 
              fillOpacity="0.3"
              d="M0,200 C180,240 320,280 640,260 C960,240 1260,180 1440,200 L1440,320 L0,320 Z"
              animate={{
                d: [
                  "M0,200 C180,240 320,280 640,260 C960,240 1260,180 1440,200 L1440,320 L0,320 Z",
                  "M0,220 C180,260 320,300 640,280 C960,260 1260,200 1440,220 L1440,320 L0,320 Z",
                  "M0,200 C180,240 320,280 640,260 C960,240 1260,180 1440,200 L1440,320 L0,320 Z",
                ]
              }}
              transition={{
                duration: 8,
                delay: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.svg>
        </div>
      )}
    </div>
  );
};

export default AnimatedBackground;
