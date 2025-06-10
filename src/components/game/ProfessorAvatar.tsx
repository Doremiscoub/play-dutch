
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProfessorAvatarProps, MoodAnimations, SizeClasses } from './ProfessorAvatarTypes';
import ProfessorAvatarParticles from './ProfessorAvatarParticles';
import ProfessorAvatarImage from './ProfessorAvatarImage';

const sizeClasses: SizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24', 
  lg: 'w-32 h-32',
  xl: 'w-40 h-40',
  xxl: 'w-48 h-48'
};

const moodAnimations: MoodAnimations = {
  happy: { 
    rotate: [0, 3, -3, 0], 
    scale: [1, 1.05, 1]
  },
  excited: { 
    rotate: [0, 8, -8, 0], 
    scale: [1, 1.1, 1]
  },
  thinking: { 
    rotate: [0, 2, -2, 0], 
    scale: [1, 1.03, 1]
  },
  surprised: { 
    rotate: [0, 5, -5, 0], 
    scale: [1, 1.15, 1]
  },
  neutral: { 
    rotate: [0, 1, -1, 0], 
    scale: [1, 1.02, 1]
  }
};

export default function ProfessorAvatar({ 
  className = '', 
  size = 'xl',
  animate = true,
  mood = 'neutral',
  showParticles = true
}: ProfessorAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={cn(
        'relative group cursor-pointer',
        className
      )}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Enhanced Floating Particles - plus nombreuses et colorées */}
      <ProfessorAvatarParticles showParticles={showParticles || isHovered} />

      {/* Double Glow Effect - plus prononcé */}
      {(isHovered || animate) && (
        <>
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-dutch-blue/40 via-dutch-purple/40 to-dutch-orange/40 rounded-full blur-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3], 
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -inset-6 bg-gradient-to-r from-dutch-orange/20 via-dutch-blue/20 to-dutch-purple/20 rounded-full blur-xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2], 
              scale: [0.6, 1.4, 0.6],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}

      {/* Container principal - cercle parfait avec bordure gradient animée */}
      <motion.div 
        className={cn(
          "relative bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange p-1.5 rounded-full",
          sizeClasses[size]
        )}
        animate={animate ? {
          ...moodAnimations[mood],
          y: [0, -5, 0]
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          type: "spring",
          stiffness: 50,
          damping: 20
        }}
        whileHover={{ 
          scale: 1.15,
          rotate: [0, -10, 10, 0],
          y: [0, -8, 0],
          boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
          transition: { 
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 10
          }
        }}
        whileTap={{
          scale: 0.95,
          rotate: 5,
          transition: { duration: 0.1 }
        }}
      >
        {/* Avatar Container - parfaitement circulaire avec shadow interne */}
        <div className="relative rounded-full overflow-hidden bg-white w-full h-full shadow-inner">
          <ProfessorAvatarImage isHovered={isHovered} />
          
          {/* Overlay effet glass au hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-dutch-blue/20 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        {/* Pulse ring effect pour mood excited */}
        {mood === 'excited' && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dutch-orange/60"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ 
              scale: [1, 1.3, 1.6], 
              opacity: [0.8, 0.4, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
          />
        )}
      </motion.div>

      {/* Enhanced Hover Effects - multiple rings qui s'étendent */}
      {isHovered && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dutch-blue/40"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-dutch-purple/30"
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-dutch-orange/20"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
          />
        </>
      )}
    </motion.div>
  );
}
