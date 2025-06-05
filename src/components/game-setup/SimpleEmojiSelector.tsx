
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
  const essentialEmojis = ['🎮', '🎯', '🃏', '🎲', '🏆', '⭐'];
  
  return (
    <div className="flex gap-2 justify-center">
      {essentialEmojis.map((emoji) => (
        <motion.button
          key={emoji}
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onEmojiSelect(emoji)}
          className={`
            p-3 rounded-2xl text-xl transition-all duration-200 min-w-[3rem] h-12
            ${selectedEmoji === emoji 
              ? 'bg-dutch-orange/30 ring-2 ring-dutch-orange shadow-lg transform scale-110' 
              : 'bg-white/60 hover:bg-white/80 border border-white/60'
            }
          `}
        >
          {emoji}
        </motion.button>
      ))}
    </div>
  );
};

export default SimpleEmojiSelector;
