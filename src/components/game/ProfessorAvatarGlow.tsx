
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MoodColors } from './ProfessorAvatarTypes';

interface ProfessorAvatarGlowProps {
  mood: keyof MoodColors;
  animate: boolean;
  isHovered: boolean;
}

// Utiliser le gradient de l'app pour tous les moods
const appGradient = 'from-dutch-blue via-dutch-purple to-dutch-orange';

export default function ProfessorAvatarGlow({ mood, animate, isHovered }: ProfessorAvatarGlowProps) {
  return (
    <>
      {/* Outer Glow Ring avec le gradient de l'app */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r opacity-30 blur-lg",
          appGradient
        )}
        animate={animate ? {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ambient Light Effect avec le gradient de l'app */}
      <div className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r rounded-full blur-2xl opacity-20",
          appGradient
        )} />
      </div>
    </>
  );
}
