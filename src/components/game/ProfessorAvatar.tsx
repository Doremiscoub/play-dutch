
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

      {/* Glow subtil uniquement au hover */}
      {isHovered && (
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-ios-blue/30 via-ios-purple/30 to-ios-orange/30 rounded-full blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Container principal - cercle parfait avec bordure gradient */}
      <motion.div 
        className={cn(
          "relative bg-gradient-to-r from-ios-blue via-ios-purple to-ios-orange p-1 rounded-full",
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
        {/* Avatar Container - parfaitement circulaire sans ombre */}
        <div className="relative rounded-full overflow-hidden bg-white w-full h-full">
          <ProfessorAvatarImage isHovered={isHovered} />
        </div>
      </motion.div>

      {/* Effet hover simplifié - juste un cercle qui s'étend */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full border border-white/30"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}
