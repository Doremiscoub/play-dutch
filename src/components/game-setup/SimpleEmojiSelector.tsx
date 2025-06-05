
import React from 'react';
import { motion } from 'framer-motion';

interface SimpleEmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

const SimpleEmojiSelector: React.FC<SimpleEmojiSelectorProps> = ({ 
  selectedEmoji, 
  onEmojiSelect 
}) => {
  // Collection d'emojis essentiels et populaires pour les parties
  const essentialEmojis = ['🎮', '🎯', '🃏', '🎲', '🏆', '⭐', '🎊', '🎉', '🔥', '💫'];
  
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
        className="
          relative p-4 rounded-2xl text-2xl transition-all duration-200 min-w-[4rem] h-16
          bg-gradient-to-br from-dutch-orange/20 to-dutch-orange/30 
          hover:from-dutch-orange/30 hover:to-dutch-orange/40
          border-2 border-dutch-orange/40 hover:border-dutch-orange/60
          shadow-lg hover:shadow-xl
          group
        "
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
