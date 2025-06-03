
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProfessorAvatarImageProps {
  isHovered: boolean;
}

// URLs unifiées pour l'image du professeur
const PROFESSOR_PRIMARY = '/lovable-uploads/f78df6b3-591c-497c-b2d2-516b2fb7b5a4.png';
const PROFESSOR_FALLBACK = '/lovable-uploads/a2234ca1-7b29-4c32-8167-2ff6be271875.png';

export default function ProfessorAvatarImage({ isHovered }: ProfessorAvatarImageProps) {
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    console.log("❌ Image principale du professeur non chargée, utilisation du fallback");
    setErrored(true);
  };

  return (
    <div className="h-full w-full relative rounded-full overflow-hidden bg-white flex items-center justify-center">
      {!errored ? (
        <motion.img
          src={PROFESSOR_PRIMARY}
          alt="Professeur Cartouche"
          onError={handleError}
          className={cn(
            "h-full w-full object-cover transition-all duration-300",
            isHovered && "scale-110 brightness-110"
          )}
          animate={isHovered ? { 
            rotate: [0, -2, 2, 0],
            scale: [1, 1.05, 1]
          } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      ) : (
        <motion.img
          src={PROFESSOR_FALLBACK}
          alt="Professeur Cartouche (Fallback)"
          className={cn(
            "h-full w-full object-cover transition-all duration-300",
            isHovered && "scale-110 brightness-110"
          )}
          animate={isHovered ? { 
            rotate: [0, -2, 2, 0],
            scale: [1, 1.05, 1]
          } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onError={() => console.log("❌ Fallback image aussi en erreur")}
        />
      )}
    </div>
  );
}
