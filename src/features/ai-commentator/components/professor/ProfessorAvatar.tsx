/**
 * Professor Avatar - Composant consolidé
 * Intègre avatar, effets, glow et image en un seul fichier
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProfessorAvatarProps, ProfessorMood } from '../../types';
import ProfessorAvatarParticles from './ProfessorAvatarParticles';

const PROFESSOR_IMAGE = '/lovable-uploads/4374ea3c-9e56-4f21-8c9c-cd399f89300d.png';

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24', 
  lg: 'w-32 h-32',
  xl: 'w-40 h-40',
  xxl: 'w-48 h-48'
};

const moodAnimations: Record<ProfessorMood, { rotate: number[]; scale: number[] }> = {
  happy: { rotate: [0, 3, -3, 0], scale: [1, 1.05, 1] },
  excited: { rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] },
  thinking: { rotate: [0, 2, -2, 0], scale: [1, 1.03, 1] },
  surprised: { rotate: [0, 5, -5, 0], scale: [1, 1.15, 1] },
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
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div 
      className={cn('relative group cursor-pointer', className)}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Particles */}
      <ProfessorAvatarParticles showParticles={showParticles || isHovered} />

      {/* Glow Effects */}
      {(isHovered || animate) && (
        <>
          <motion.div
            className="absolute -inset-3 bg-gradient-to-r from-trinity-blue-500/30 via-trinity-purple-500/30 to-trinity-orange-500/30 rounded-full blur-lg"
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.9, 1.1, 0.9], rotate: [0, 180, 360] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -inset-5 bg-gradient-to-r from-trinity-orange-500/15 via-trinity-blue-500/15 to-trinity-purple-500/15 rounded-full blur-xl"
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.7, 1.3, 0.7], rotate: [360, 180, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </>
      )}

      {/* Avatar Container */}
      <motion.div 
        className={cn(
          "relative bg-gradient-to-r from-trinity-blue-500 via-trinity-purple-500 to-trinity-orange-500 p-0.5 rounded-full shadow-lg",
          sizeClasses[size]
        )}
        animate={animate ? { ...moodAnimations[mood], y: [0, -3, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1, y: -4, boxShadow: "0 8px 32px hsl(var(--dutch-blue) / 0.3)", transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 15 } }}
        whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      >
        {/* Image Container */}
        <div className="relative rounded-full overflow-hidden bg-white/90 backdrop-blur-sm w-full h-full border border-white/30">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-trinity-blue-100 to-trinity-purple-100">
              👨‍🏫
            </div>
          ) : (
            <motion.img
              src={PROFESSOR_IMAGE}
              alt="Professeur Cartouche"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          
          {/* Glass Overlay on Hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-trinity-blue-500/10 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        {/* Pulse Ring for Excited Mood */}
        {mood === 'excited' && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-trinity-orange-500/60"
            animate={{ scale: [1, 1.2, 1.4], opacity: [0.8, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.div>

      {/* Hover Rings */}
      {isHovered && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-trinity-blue-500/40"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-trinity-purple-500/30"
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-trinity-orange-500/20"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />
        </>
      )}
    </motion.div>
  );
}
