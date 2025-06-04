
import React from 'react';
import { motion } from 'framer-motion';

interface EmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
  playerIndex: number;
}

const availableEmojis = [
  '😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '😊', '😋',
  '🤔', '😴', '🤯', '🥸', '🤠', '👻', '🤖', '👽', '🦄', '🐻',
  '🐸', '🦊', '🐱', '🐶', '🐰', '🐼', '🦁', '🐯', '🐷', '🐮',
  '🎭', '🎪', '🎨', '🎯', '🎲', '🎮', '🏆', '⭐', '🔥', '⚡'
];

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ 
  selectedEmoji, 
  onEmojiSelect, 
  playerIndex 
}) => {
  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * availableEmojis.length);
    return availableEmojis[randomIndex];
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Emoji du joueur {playerIndex + 1}
      </label>
      
      {/* Emoji sélectionné */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 flex items-center justify-center text-2xl shadow-sm">
          {selectedEmoji || '🎮'}
        </div>
        <button
          type="button"
          onClick={() => onEmojiSelect(getRandomEmoji())}
          className="px-3 py-1 text-xs bg-white/70 backdrop-blur-sm border border-white/50 rounded-full text-gray-600 hover:bg-white/80 transition-all"
        >
          Aléatoire
        </button>
      </div>
      
      {/* Grille d'emojis */}
      <div className="grid grid-cols-8 gap-1 max-h-32 overflow-y-auto bg-white/50 backdrop-blur-sm rounded-xl p-2 border border-white/30">
        {availableEmojis.map((emoji, index) => (
          <motion.button
            key={emoji}
            type="button"
            onClick={() => onEmojiSelect(emoji)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all hover:bg-white/70 ${
              selectedEmoji === emoji ? 'bg-dutch-blue/20 ring-2 ring-dutch-blue/30' : 'hover:scale-110'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.01 }}
          >
            {emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default EmojiSelector;
