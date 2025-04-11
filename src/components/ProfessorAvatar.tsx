
import React from 'react';
import { motion } from 'framer-motion';
import { Headphones } from 'lucide-react';
import { Button } from './ui/button';

interface ProfessorAvatarProps {
  message: string;
  onSpeakMessage?: () => void;
}

const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ message, onSpeakMessage }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <motion.div 
          className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg border-2 border-dutch-purple flex items-center justify-center overflow-hidden"
          initial={{ scale: 0.9 }}
          animate={{ 
            scale: [0.95, 1.02, 0.98, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {/* Professeur Cartouche stylisé */}
          <img 
            src="/professor.png" 
            alt="Professeur Cartouche" 
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIyMCIgdGV4dD1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzhCNUNGNiI+UEM8L3RleHQ+PC9zdmc+';
            }}
          />
        </motion.div>
        
        {/* Bulle d'animation pour donner vie à l'avatar */}
        <motion.div 
          className="absolute -top-1 -right-1 bg-dutch-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          !
        </motion.div>
      </div>
      
      {onSpeakMessage && (
        <Button
          variant="outline"
          size="sm"
          className="bg-white/80 hover:bg-white border border-dutch-purple/30 text-dutch-purple hover:text-dutch-purple/80 rounded-full"
          onClick={onSpeakMessage}
        >
          <Headphones className="w-4 h-4 mr-1" />
          <span className="text-xs">Lire à voix haute</span>
        </Button>
      )}
    </div>
  );
};

export default ProfessorAvatar;
