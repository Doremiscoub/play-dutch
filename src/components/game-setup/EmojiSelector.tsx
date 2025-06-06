
import React from 'react';
import { motion } from 'framer-motion';

interface EmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ selectedEmoji, onEmojiSelect }) => {
  // Collection réduite d'emojis thématiques
  const themeEmojis = ['🎮', '🎯', '🃏', '🎲', '🏆', '⭐'];
  
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {themeEmojis.map((emoji) => (
        <motion.button
          key={emoji}
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onEmojiSelect(emoji)}
          className={`
            p-3 rounded-2xl text-xl transition-all duration-200 min-w-[3rem] h-12
            ${selectedEmoji === emoji 
              ? 'bg-dutch-orange/30 ring-2 ring-dutch-orange shadow-lg' 
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

export default EmojiSelector;
