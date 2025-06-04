
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PROFESSOR_SOURCE } from './ProfessorAvatarTypes';

interface ProfessorAvatarImageProps {
  isHovered: boolean;
}

export default function ProfessorAvatarImage({ isHovered }: ProfessorAvatarImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    console.log("❌ Image du professeur non trouvée, utilisation du fallback emoji");
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    console.log("✅ Image du professeur chargée avec succès");
    setIsLoading(false);
  };

  if (imageError) {
    // Fallback élégant avec le bon emoji professeur
    return (
      <motion.div
        className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100"
        animate={isHovered ? { 
          rotate: [0, -2, 2, 0],
          scale: [1, 1.05, 1]
        } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <span className="text-4xl">👴🏼</span>
      </motion.div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <motion.img
        src={PROFESSOR_SOURCE}
        alt="Professeur Cartouche"
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          "h-full w-full object-cover transition-all duration-300",
          isHovered && "scale-110 brightness-110",
          isLoading && "opacity-0"
        )}
        animate={isHovered ? { 
          rotate: [0, -2, 2, 0],
          scale: [1, 1.05, 1]
        } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      {/* Loading indicator simplifié */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
