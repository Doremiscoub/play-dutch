
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
      <Card 
        variant={
          index === 0 ? 'kidsBlue' : 
          index === 1 ? 'kidsPurple' : 
          index === 2 ? 'kidsOrange' : 
          index === 3 ? 'kidsPink' : 
          index === 4 ? 'kidsLime' : 
          'kidsTurquoise'
        }
        className="hover:shadow-glow-rainbow hover:scale-[1.02] transition-all duration-300"
      >
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
              className="flex-1 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-white/30 rounded-lg px-2 py-1 font-bold text-white placeholder-white/70"
              maxLength={15}
              placeholder="Nom du joueur"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlayerCard;
