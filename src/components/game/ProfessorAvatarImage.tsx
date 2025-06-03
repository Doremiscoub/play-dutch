
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface ProfessorAvatarImageProps {
  isHovered: boolean;
}

// Image corrigée qui existe dans public/
const PROFESSOR_IMAGE = '/professor.png';

export default function ProfessorAvatarImage({ isHovered }: ProfessorAvatarImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    console.log("❌ Image du professeur non trouvée, utilisation du fallback icône");
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    console.log("✅ Image du professeur chargée avec succès");
    setIsLoading(false);
  };

  return (
    <div className="h-full w-full relative rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      {!imageError ? (
        <motion.img
          src={PROFESSOR_IMAGE}
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
      ) : (
        // Fallback avec icône stylisée
        <motion.div
          className="h-full w-full flex items-center justify-center bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20"
          animate={isHovered ? { 
            rotate: [0, -2, 2, 0],
            scale: [1, 1.05, 1]
          } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative">
            <User className="w-12 h-12 text-dutch-purple" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-dutch-orange rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Loading indicator */}
      {isLoading && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-dutch-purple border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
