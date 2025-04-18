
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProfessorAvatarProps {
  message?: string;
  size?: number;
}

const SOURCES = ['/images/professeur-cartouche-avatar.png'];

const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ 
  message,
  size = 96
}) => {
  const [imageError, setImageError] = useState<boolean>(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  // Si l'image a échoué au chargement, ne rien afficher
  if (imageError) {
    return null;
  }

  const avatarSrc = SOURCES[0];
  const sizeClass = `w-[${size}px] h-[${size}px]`;

  return (
    <div className="flex items-center gap-3">
      <motion.div 
        className={`relative rounded-full overflow-hidden border-2 border-dutch-purple bg-white/10 shadow-lg flex items-center justify-center ${sizeClass}`}
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 1, -1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        whileHover={{ scale: 1.1, rotate: [-2, 2, -2] }}
      >
        <img 
          src={avatarSrc}
          alt="Professeur Cartouche"
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </motion.div>
      
      {message && (
        <div className="text-sm text-gray-700 bg-white/80 rounded-lg px-3 py-2 shadow-sm">
          {message}
        </div>
      )}
    </div>
  );
};

export default ProfessorAvatar;
