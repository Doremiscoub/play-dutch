
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal';
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  // Configuration selon les variantes
  const config = {
    default: {
      dots: true,
      grid: true,
      waves: true,
      waveColors: ['#E9D5FF', '#FDE68A'] // violet très clair, jaune très clair
    },
    subtle: {
      dots: true,
      grid: true,
      waves: true,
      waveColors: ['#F3E8FF', '#FEF3C7'] // encore plus clair
    },
    minimal: {
      dots: false,
      grid: true,
      waves: false,
      waveColors: []
    }
  };

  const currentConfig = config[variant];

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Fond de base avec dégradé subtil */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-50 to-white"></div>
      
      {/* Grille de fond */}
      {currentConfig.grid && (
        <div className="absolute inset-0 w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, rgba(220, 220, 230, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(220, 220, 230, 0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>
      )}

      {/* Points flottants animés */}
      {currentConfig.dots && (
        <>
          {[...Array(15)].map((_, i) => {
            const colors = ['#A78BFA20', '#FDBA7420', '#6EE7B720', '#60A5FA20'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 6 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: randomColor,
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                animate={{
                  x: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10],
                  y: [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            );
          })}
        </>
      )}

      {/* Vagues fluides en bas d'écran */}
      {currentConfig.waves && (
        <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none" style={{ height: '25vh', zIndex: 5 }}>
          <motion.div 
            className="absolute bottom-0 left-0 right-0 w-full"
            style={{ 
              height: '100%',
              background: `linear-gradient(to bottom right, transparent, ${currentConfig.waveColors[0]})`,
              borderTopLeftRadius: '50%',
              borderTopRightRadius: '50%',
              transformOrigin: 'bottom',
              zIndex: 1
            }}
            animate={{
              y: [0, -5, 0],
              scaleX: [1, 1.02, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 w-full"
            style={{ 
              height: '80%',
              background: `linear-gradient(to bottom right, transparent, ${currentConfig.waveColors[1]})`,
              borderTopLeftRadius: '60%',
              borderTopRightRadius: '40%',
              transformOrigin: 'bottom',
              zIndex: 2
            }}
            animate={{
              y: [0, -8, 0],
              scaleX: [1, 1.03, 1],
            }}
            transition={{
              duration: 12,
              delay: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AnimatedBackground;
