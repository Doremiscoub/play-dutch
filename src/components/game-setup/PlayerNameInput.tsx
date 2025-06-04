
import React from 'react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { GameCard } from '@/components/ui/game-card';
import { GameText } from '@/components/ui/game-typography';
import { cn } from '@/lib/utils';

interface PlayerNameInputProps {
  index: number;
  name: string;
  onChange: (index: number, name: string) => void;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ index, name, onChange }) => {
  return (
    <motion.div 
      key={index} 
      className="flex items-center gap-3"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
    >
      <GameCard variant="unoCard" className="w-8 h-8 flex items-center justify-center flex-shrink-0">
        <GameText variant="actionButton" gameColor="white" className="text-sm">
          {index + 1}
        </GameText>
      </GameCard>
      
      <div className="relative flex-grow">
        <motion.div 
          className="absolute -inset-0.5 bg-gradient-to-r from-game-primary/10 to-game-secondary/10 rounded-lg blur opacity-30"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Input
          value={name}
          onChange={(e) => onChange(index, e.target.value)}
          placeholder={`Joueur ${index + 1}`}
          className="game-input border border-white/40 shadow-sm relative z-10 backdrop-blur-sm"
          maxLength={20}
        />
      </div>
    </motion.div>
  );
};

export default PlayerNameInput;
