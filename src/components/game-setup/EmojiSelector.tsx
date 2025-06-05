
import React from 'react';
import { motion } from 'framer-motion';

interface EmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ selectedEmoji, onEmojiSelect }) => {
  const emojis = ['🎮', '🎯', '🎲', '🃏', '🏆', '⭐', '🎪', '🎨', '🚀', '⚡'];
  
  return (
    <div className="grid grid-cols-5 gap-2">
      {emojis.map((emoji) => (
        <motion.button
          key={emoji}
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEmojiSelect(emoji)}
          className={`
            p-2 rounded-xl text-lg transition-all duration-200
            ${selectedEmoji === emoji 
              ? 'bg-dutch-orange/20 ring-2 ring-dutch-orange' 
              : 'bg-white/50 hover:bg-white/70'
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
