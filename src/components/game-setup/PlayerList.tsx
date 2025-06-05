
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayerCard from './PlayerCard';

interface Player {
  name: string;
  emoji: string;
}

interface PlayerListProps {
  players: Player[];
  onUpdatePlayerName: (index: number, name: string) => void;
  onRandomizePlayerEmoji: (index: number) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  onUpdatePlayerName,
  onRandomizePlayerEmoji
}) => {
  return (
    <motion.div 
      className="space-y-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <AnimatePresence mode="popLayout">
        {players.map((player, index) => (
          <PlayerCard
            key={`${player.name}-${index}`}
            player={player}
            index={index}
            onUpdateName={onUpdatePlayerName}
            onRandomizeEmoji={onRandomizePlayerEmoji}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlayerList;
