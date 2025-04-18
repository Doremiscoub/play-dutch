import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_MESSAGE = "Bonjour, je suis le Professeur Cartouche !";

interface ProfessorAvatarProps {
  message?: string;
}

const PROFESSOR_IMAGE = 'https://play-dutch.com/images/professor-cartouche.png';
const FALLBACK_IMAGE = '/images/professor-cartouche.png';

const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ message = DEFAULT_MESSAGE }) => {
  const [imageSrc, setImageSrc] = useState<string>(PROFESSOR_IMAGE);
  const [imageError, setImageError] = useState<boolean>(false);
  const [loadAttempt, setLoadAttempt] = useState<number>(0);

  const handleImageError = () => {
    console.error(`Erreur de chargement de l'image: ${imageSrc}, tentative ${loadAttempt+1}`);
    
    if (loadAttempt === 0) {
      setImageSrc(FALLBACK_IMAGE);
      setLoadAttempt(1);
    } else if (loadAttempt === 1) {
      setImageSrc('./images/professor-cartouche.png');
      setLoadAttempt(2);
    } else {
      setImageError(true);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div 
        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-dutch-purple bg-white/10 shadow-lg flex items-center justify-center"
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
        {!imageError ? (
          <img 
            src={imageSrc}
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
