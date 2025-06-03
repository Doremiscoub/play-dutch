
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
  happy: { rotate: [0, 2, -2, 0], scale: [1, 1.02, 1] },
  excited: { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] },
  thinking: { rotate: [0, 1, -1, 0], scale: [1, 1.01, 1] },
  surprised: { rotate: [0, 3, -3, 0], scale: [1, 1.08, 1] },
  neutral: { rotate: [0, 1, -1, 0], scale: [1, 1.02, 1] }
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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Floating Particles */}
      <ProfessorAvatarParticles showParticles={showParticles} />

      {/* Glow effects simplifiés */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-ios-blue via-ios-purple to-ios-orange rounded-full opacity-20 blur-lg"
        animate={animate ? {
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Container principal avec gradient corrigé */}
      <motion.div 
        className={cn(
          "relative bg-gradient-to-r from-ios-blue via-ios-purple to-ios-orange p-1 rounded-full shadow-2xl",
          sizeClasses[size]
        )}
        animate={animate ? moodAnimations[mood] : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.6 }
        }}
      >
        {/* Avatar Container - parfaitement circulaire */}
        <div className="relative rounded-full overflow-hidden bg-white w-full h-full">
          <ProfessorAvatarImage isHovered={isHovered} />
        </div>
      </motion.div>

      {/* Effet hover simplifié */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/50"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}
