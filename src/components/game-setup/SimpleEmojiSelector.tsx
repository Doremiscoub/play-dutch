
import React from 'react';
import { motion } from 'framer-motion';

interface SimpleEmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
  playerIndex?: number;
}

const SimpleEmojiSelector: React.FC<SimpleEmojiSelectorProps> = ({ 
  selectedEmoji, 
  onEmojiSelect,
  playerIndex = 0
}) => {
  // Collection d'emojis essentiels et populaires pour les parties
  const essentialEmojis = ['🎮', '🎯', '🃏', '🎲', '🏆', '⭐', '🎊', '🎉', '🔥', '💫'];
  
  // Couleurs différentes pour chaque joueur
  const playerColors = [
    'from-blue-400/20 to-blue-500/30 border-blue-400/40 hover:border-blue-500/60 hover:from-blue-400/30 hover:to-blue-500/40',
    'from-purple-400/20 to-purple-500/30 border-purple-400/40 hover:border-purple-500/60 hover:from-purple-400/30 hover:to-purple-500/40',
    'from-green-400/20 to-green-500/30 border-green-400/40 hover:border-green-500/60 hover:from-green-400/30 hover:to-green-500/40',
    'from-orange-400/20 to-orange-500/30 border-orange-400/40 hover:border-orange-500/60 hover:from-orange-400/30 hover:to-orange-500/40',
    'from-pink-400/20 to-pink-500/30 border-pink-400/40 hover:border-pink-500/60 hover:from-pink-400/30 hover:to-pink-500/40',
    'from-cyan-400/20 to-cyan-500/30 border-cyan-400/40 hover:border-cyan-500/60 hover:from-cyan-400/30 hover:to-cyan-500/40',
    'from-red-400/20 to-red-500/30 border-red-400/40 hover:border-red-500/60 hover:from-red-400/30 hover:to-red-500/40',
    'from-yellow-400/20 to-yellow-500/30 border-yellow-400/40 hover:border-yellow-500/60 hover:from-yellow-400/30 hover:to-yellow-500/40',
    'from-indigo-400/20 to-indigo-500/30 border-indigo-400/40 hover:border-indigo-500/60 hover:from-indigo-400/30 hover:to-indigo-500/40',
    'from-teal-400/20 to-teal-500/30 border-teal-400/40 hover:border-teal-500/60 hover:from-teal-400/30 hover:to-teal-500/40'
  ];
  
  const currentColor = playerColors[playerIndex % playerColors.length];
  
  const handleRandomize = () => {
    const currentIndex = essentialEmojis.indexOf(selectedEmoji);
    const availableEmojis = essentialEmojis.filter((_, index) => index !== currentIndex);
    const randomEmoji = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
    onEmojiSelect(randomEmoji);
  };
  
  return (
    <div className="flex justify-center">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: [0, -5, 5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        onClick={handleRandomize}
        className={`
          relative p-4 rounded-2xl text-2xl transition-all duration-200 min-w-[4rem] h-16
          bg-gradient-to-br ${currentColor}
          border-2 
          shadow-lg hover:shadow-xl
          group
        `}
      >
        <motion.span
          key={selectedEmoji}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className="block"
        >
          {selectedEmoji}
        </motion.span>
        
        {/* Indicateur visuel pour le clic */}
        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        {/* Texte d'aide */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Cliquer pour changer
        </div>
      </motion.button>
    </div>
  );
};

export default SimpleEmojiSelector;
