
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { animationVariants } from '@/utils/animationUtils';

const SOURCE = '/lovable-uploads/1dc0ac6d-dc08-4029-a06a-eec0c5a6ce7f.png';
const FALLBACK = '/lovable-uploads/a2234ca1-7b29-4c32-8167-2ff6be271875.png';

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
        isHovered && 'shadow-dutch-purple/20'
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
        <AvatarFallback 
          className={cn(
            "text-2xl bg-gradient-to-r from-dutch-blue to-dutch-purple text-white",
            isHovered && 'bg-gradient-to-r from-dutch-purple to-dutch-blue'
          )}
        >
          👨‍🏫
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
