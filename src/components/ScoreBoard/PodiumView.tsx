
import React from 'react';
import { Player } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import PlayerScoreCard from '@/components/PlayerScoreCard';
import ProfCartouche from '@/components/ProfCartouche';

interface PodiumViewProps {
  players: Player[];
}

/**
 * Affichage des scores sous forme de podium
 */
const PodiumView: React.FC<PodiumViewProps> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  return (
    <div className="space-y-4">
      <ProfCartouche 
        players={players} 
        roundNumber={players.length > 0 ? players[0].rounds.length : 0}
        view="podium"
      />
      
      <AnimatePresence>
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <PlayerScoreCard
              player={player}
              position={index + 1}
              isWinner={index === 0}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PodiumView;
