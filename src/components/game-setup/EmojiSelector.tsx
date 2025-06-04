
import React from 'react';
import { motion } from 'framer-motion';
import { GameCard } from '@/components/ui/game-card';

interface EmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
  playerIndex: number;
}

const EMOJI_CATEGORIES = {
  faces: ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '😊', '😋'],
  fantasy: ['🤖', '👻', '👽', '🦄', '🐻', '🎮', '🎯', '🎲', '🃏', '♠️'],
  symbols: ['⭐', '🔥', '💎', '🏆', '🎊', '🎉', '💯', '⚡', '🌟', '✨']
};

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  selectedEmoji,
  onEmojiSelect,
  playerIndex
}) => {
  const allEmojis = Object.values(EMOJI_CATEGORIES).flat();

  return (
    <div className="space-y-3">
      <div className="text-center">
        <div className="text-xs font-medium text-gray-600 mb-2">
          Choisissez votre emoji
        </div>
      </div>
      
      <div className="grid grid-cols-8 gap-2">
        {allEmojis.map((emoji, index) => (
          <motion.div
            key={`${playerIndex}-${emoji}-${index}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <GameCard
              variant={selectedEmoji === emoji ? "unoCard" : "playingCard"}
              interactive
              className="w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={() => onEmojiSelect(emoji)}
            >
              <span className="text-sm">{emoji}</span>
            </GameCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmojiSelector;
