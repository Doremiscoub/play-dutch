
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Player } from '@/types';

interface OtherPlayersRankingProps {
  players: Player[];
}

const OtherPlayersRanking: React.FC<OtherPlayersRankingProps> = ({ players }) => {
  // Sort players by score and take players beyond the podium (4th place and beyond)
  const otherPlayers = [...players]
    .sort((a, b) => a.totalScore - b.totalScore)
    .slice(3);
  
  if (otherPlayers.length === 0) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-md mb-8"
    >
      <p className="text-sm text-gray-500 mb-2 text-center">Autres participants</p>
      <Card className="p-4 bg-white/80 backdrop-blur-sm border border-white shadow-xl">
        {otherPlayers.map((player, index) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + (index * 0.1) }}
            key={player.id}
            className="flex justify-between items-center mb-2 last:mb-0 p-2 hover:bg-gray-50/50 rounded-lg"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 shadow-sm">
                <span>{index + 4}</span>
              </div>
              <span>{player.name}</span>
            </div>
            <span className="font-medium bg-gray-100 px-2 py-0.5 rounded-full">{player.totalScore} pts</span>
          </motion.div>
        ))}
      </Card>
    </motion.div>
  );
};

export default OtherPlayersRanking;
