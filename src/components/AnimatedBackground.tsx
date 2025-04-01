
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'home';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  const [dotElements, setDotElements] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    // Générer les points colorés aléatoires
    const dots = [];
    const colors = ['bg-dutch-purple/30', 'bg-dutch-orange/30', 'bg-dutch-blue/30', 'bg-green-300/30'];
    
    for (let i = 0; i < 30; i++) {
      const size = Math.floor(Math.random() * 6) + 2; // 2px à 8px
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const delay = Math.random() * 5;
      
      dots.push(
        <motion.div
          key={i}
          className={cn('rounded-full absolute', color)}
          style={{
            width: size,
            height: size,
            left,
            top,
          }}
          animate={{
            y: ['-10px', '10px', '-10px'],
            x: ['0px', '5px', '-5px', '0px'],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            delay,
          }}
        />
      );
    }
    
    setDotElements(dots);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden relative">
      {/* Grille de fond */}
      <div className={cn(
        "absolute inset-0 bg-grid-pattern bg-[length:24px_24px]",
        variant === 'home' ? "bg-white" : "bg-gray-50"
      )}/>
      
      {/* Points colorés flottants */}
      <div className="absolute inset-0 overflow-hidden">
        {dotElements}
      </div>
      
      {/* Vagues de fond */}
      {variant !== 'subtle' && (
        <>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[20vh] bg-dutch-purple/10 rounded-t-[100%] z-0"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[18vh] bg-dutch-orange/10 rounded-t-[90%] z-0"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;
