
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Temporairement changé pour une URL invalide pour tester le fallback
// const SOURCE = '/images/professeur-cartouche-avatar.png';
const SOURCE = '/invalid-image-path.png';

interface ProfessorAvatarProps {
  className?: string;
}

export default function ProfessorAvatar({ className = '' }: ProfessorAvatarProps) {
  const [errored, setErrored] = useState(false);

  console.log("❗ ProfessorAvatar rendu, SOURCE:", SOURCE, "errored:", errored);

  const handleError = () => {
    console.log("❌ Image error triggered");
    setErrored(true);
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <Avatar className="w-16 h-16 shadow-lg">
        {!errored && (
          <AvatarImage
            src={SOURCE}
            alt="Professeur Cartouche"
            onError={handleError}
          />
        )}
        <AvatarFallback className="text-2xl bg-gradient-to-r from-dutch-blue to-dutch-purple text-white">
          👴
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
}
