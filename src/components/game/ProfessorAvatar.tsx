import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { animationVariants } from '@/utils/animationUtils';

const SOURCE = '/lovable-uploads/f78df6b3-591c-497c-b2d2-516b2fb7b5a4.png';
const FALLBACK = '/professor.png';

interface ProfessorAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
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
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
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
      <Avatar className={cn(
        sizeClasses[size],
        'shadow-lg transition-all duration-300 backdrop-blur-sm',
        isHovered && 'shadow-xl shadow-dutch-purple/30',
        'ring-2 ring-offset-2 ring-offset-white ring-dutch-purple/20'
      )}>
        {!errored && (
          <AvatarImage
            src={SOURCE}
            alt="Professeur Cartouche"
            onError={handleError}
            className={cn(
              'transition-all duration-300 scale-105',
              isHovered && 'scale-110 rotate-3'
            )}
          />
        )}
        <AvatarFallback 
          className={cn(
            "text-4xl bg-gradient-to-r from-dutch-blue to-dutch-purple text-white",
            isHovered && 'bg-gradient-to-r from-dutch-purple to-dutch-blue'
          )}
        >
          👴🏼
        </AvatarFallback>
      </Avatar>

      {/* Effet de brillance sur hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 100, opacity: 1 }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}

      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute -z-10 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-4 bg-dutch-purple/5 rounded-full animate-pulse" />
        <div className="absolute -inset-8 bg-dutch-blue/5 rounded-full animate-pulse delay-150" />
      </div>
    </motion.div>
  );
}
