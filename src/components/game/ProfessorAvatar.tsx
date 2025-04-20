
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SOURCE = '/images/professeur-cartouche-avatar.png';

interface ProfessorAvatarProps {
  className?: string;
}

export default function ProfessorAvatar({ className = '' }: ProfessorAvatarProps) {
  const [errored, setErrored] = useState(false);

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
            onError={() => setErrored(true)}
          />
        )}
        <AvatarFallback className="text-2xl bg-gradient-to-r from-dutch-blue to-dutch-purple text-white">
          👴
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
}
