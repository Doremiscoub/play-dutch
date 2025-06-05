
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedPlayerBadge from './AnimatedPlayerBadge';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Player {
  name: string;
  emoji: string;
}

interface PlayerCardProps {
  player: Player;
  index: number;
  onUpdateName: (index: number, name: string) => void;
  onRandomizeEmoji: (index: number) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  index,
  onUpdateName,
  onRandomizeEmoji
}) => {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.4 }
    }
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="group"
    >
      <Card className="bg-white/70 hover:bg-white/85 border border-white/50 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <AnimatedPlayerBadge 
              position={index + 1} 
              isFirst={index === 0}
            />

            <button
              onClick={() => onRandomizeEmoji(index)}
              className="text-2xl hover:scale-110 transition-transform duration-200"
              title="Cliquer pour changer l'emoji"
            >
              {player.emoji}
            </button>

            <input
              type="text"
              value={player.name}
              onChange={(e) => onUpdateName(index, e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-dutch-blue/30 rounded-lg px-2 py-1 font-semibold text-gray-800"
              maxLength={15}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlayerCard;
