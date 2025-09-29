
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import PlayerRankBadge from './PlayerRankBadge';
import { DESIGN_TOKENS } from '@/design';

interface OtherPlayersRankingProps {
  players: Player[];
}

const OtherPlayersRanking: React.FC<OtherPlayersRankingProps> = ({ players }) => {
  // Sort players by score (lowest = best)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Skip the top 3 players (already shown in the podium)
  const otherPlayers = sortedPlayers.slice(3);
  
  // If no other players, don't render this component
  if (otherPlayers.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Autres joueurs</h3>
      
      <div className="space-y-2">
        {otherPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01, backgroundColor: DESIGN_TOKENS.primitive.neutral[50] + 'E6' }}
          >
            <PlayerRankBadge position={index + 4} size="sm" />
            
            <div className="flex-1">
              <p className="font-medium">{player.name}</p>
            </div>
            
            <div className="text-right">
              <span className="bg-gray-100 px-2 py-1 rounded-md text-sm font-semibold">
                {player.totalScore} pts
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OtherPlayersRanking;
