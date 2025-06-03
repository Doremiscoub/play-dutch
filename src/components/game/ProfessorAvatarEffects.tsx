
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfessorAvatarEffectsProps {
  isHovered: boolean;
}

export default function ProfessorAvatarEffects({ isHovered }: ProfessorAvatarEffectsProps) {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/50"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.3, opacity: 0 }}
          exit={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}
