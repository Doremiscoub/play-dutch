
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { animationVariants } from '@/utils/animationUtils';

const SOURCE = '/lovable-uploads/f78df6b3-591c-497c-b2d2-516b2fb7b5a4.png';
const FALLBACK = '/professor.png';

interface ProfessorAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

export default function ProfessorAvatar({ 
  className = '', 
  size = 'md',
  animate = true,
}: ProfessorAvatarProps) {
  const [errored, setErrored] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleError = () => {
    console.log("❌ Image principale non chargée, utilisation du fallback");
    setErrored(true);
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36'
  };

  return (
    <motion.div 
      className={cn(
        'relative group cursor-pointer',
        className
      )}
      variants={animate ? animationVariants.softPulse : undefined}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={cn(
        "rounded-full bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange p-1 gradient-shift shadow-xl",
        isHovered && "scale-105",
        "transition-all duration-300",
        sizeClasses[size]
      )}>
        <div className="h-full w-full bg-white rounded-full flex items-center justify-center overflow-hidden">
          <motion.div 
            className="h-full w-full relative flex items-center justify-center"
            animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {!errored ? (
              <img
                src={SOURCE}
                alt="Professeur Cartouche"
                onError={handleError}
                className={cn(
                  "h-full w-full object-cover rounded-full",
                  isHovered && "wobble-animation"
                )}
              />
            ) : (
              <div 
                className={cn(
                  "text-4xl",
                  isHovered && "wobble-animation"
                )}
              >
                👴🏼
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute -z-10 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-4 bg-dutch-purple/5 rounded-full animate-pulse" />
        <div className="absolute -inset-8 bg-dutch-blue/5 rounded-full animate-pulse delay-150" />
      </div>
    </motion.div>
  );
}
