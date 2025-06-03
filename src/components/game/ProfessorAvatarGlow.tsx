
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MoodColors } from './ProfessorAvatarTypes';

interface ProfessorAvatarGlowProps {
  mood: keyof MoodColors;
  animate: boolean;
  isHovered: boolean;
}

const moodColors: MoodColors = {
  happy: 'from-green-400 via-emerald-500 to-green-600',
  excited: 'from-orange-400 via-red-500 to-pink-600',
  thinking: 'from-blue-400 via-indigo-500 to-purple-600',
  surprised: 'from-yellow-400 via-orange-500 to-red-600',
  neutral: 'from-dutch-blue via-dutch-purple to-dutch-orange'
};

export default function ProfessorAvatarGlow({ mood, animate, isHovered }: ProfessorAvatarGlowProps) {
  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r opacity-30 blur-lg",
          moodColors[mood]
        )}
        animate={animate ? {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ambient Light Effect */}
      <div className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r rounded-full blur-2xl opacity-20",
          moodColors[mood]
        )} />
      </div>
    </>
  );
}
