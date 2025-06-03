
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MoodColors } from './ProfessorAvatarTypes';

interface ProfessorAvatarGlowProps {
  mood: keyof MoodColors;
  animate: boolean;
  isHovered: boolean;
}

export default function ProfessorAvatarGlow({ mood, animate, isHovered }: ProfessorAvatarGlowProps) {
  return (
    <>
      {/* Outer Glow Ring avec les couleurs iOS correctes */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-ios-blue via-ios-purple to-ios-orange opacity-30 blur-lg"
        animate={animate ? {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ambient Light Effect */}
      <div className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-ios-blue via-ios-purple to-ios-orange rounded-full blur-2xl opacity-20" />
      </div>
    </>
  );
}
