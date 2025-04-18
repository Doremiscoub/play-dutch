
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProfessorAvatarProps {
  message?: string;
  size?: number;
}

const SOURCES = [
  '/assets/professeur-cartouche-avatar.png',  // chemin public absolu
  './assets/professeur-cartouche-avatar.png', // chemin relatif fallback
];

const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ 
  message,
  size = 96
}) => {
  const [srcIndex, setSrcIndex] = useState(0);
  
  const handleImageError = () => {
    if (srcIndex < SOURCES.length - 1) {
      setSrcIndex(i => i + 1);
    } else {
      setSrcIndex(-1); // Affichera l'emoji
    }
  };

  const avatarSrc = srcIndex >= 0 ? SOURCES[srcIndex] : null;
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
        {avatarSrc ? (
          <img 
            src={avatarSrc}
            alt="Professeur Cartouche"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🧠
          </div>
        )}
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
