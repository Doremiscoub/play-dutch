
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { animationVariants } from '@/utils/animationUtils';

// URL corrigée de l'image du professeur
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
  animate = true 
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
    lg: 'w-20 h-20'
  };

  return (
    <motion.div 
      className={cn('relative', className)}
      variants={animate ? animationVariants.softPulse : undefined}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Avatar className={cn(
        sizeClasses[size],
        'shadow-lg transition-all duration-300',
        isHovered && 'shadow-dutch-purple/30'
      )}>
        {!errored && (
          <AvatarImage
            src={SOURCE}
            alt="Professeur Cartouche"
            onError={handleError}
            className={cn(
              'transition-transform duration-300',
              isHovered && 'scale-110'
            )}
          />
        )}
        {errored && (
          <AvatarImage
            src={FALLBACK}
            alt="Professeur Cartouche"
            className={cn(
              'transition-transform duration-300',
              isHovered && 'scale-110'
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
    </motion.div>
  );
}

