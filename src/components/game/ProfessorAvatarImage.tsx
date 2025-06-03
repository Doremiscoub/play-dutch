
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PROFESSOR_SOURCE, PROFESSOR_FALLBACK } from './ProfessorAvatarTypes';

interface ProfessorAvatarImageProps {
  isHovered: boolean;
}

export default function ProfessorAvatarImage({ isHovered }: ProfessorAvatarImageProps) {
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    console.log("❌ Image principale non chargée, utilisation du fallback");
    setErrored(true);
  };

  return (
    <motion.div 
      className="h-full w-full relative flex items-center justify-center rounded-full overflow-hidden"
      animate={isHovered ? { 
        rotate: [0, -5, 5, 0],
        scale: [1, 1.02, 1]
      } : {}}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {!errored ? (
        <motion.img
          src={PROFESSOR_SOURCE}
          alt="Professeur Cartouche"
          onError={handleError}
          className={cn(
            "h-full w-full object-cover scale-110",
            isHovered && "scale-125"
          )}
          style={{ 
            filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)'
          }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <motion.div 
          className={cn(
            "text-6xl",
            isHovered && "scale-110"
          )}
          animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          👴🏼
        </motion.div>
      )}
    </motion.div>
  );
}
