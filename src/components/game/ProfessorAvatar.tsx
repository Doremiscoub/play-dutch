
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SOURCE = '/images/professeur-cartouche-avatar.png';

interface ProfessorAvatarProps {
  className?: string;
}

export default function ProfessorAvatar({ className = '' }: ProfessorAvatarProps) {
  const [errored, setErrored] = useState(false);

  if (errored) return null;

  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={SOURCE}
        alt="Professeur Cartouche"
        className="w-16 h-16 rounded-full object-cover shadow-lg"
        onError={() => {
          console.error('ProfessorAvatar: failed to load');
          setErrored(true);
        }}
      />
    </motion.div>
  );
}
