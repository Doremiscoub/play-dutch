
/**
 * Vue de la liste des joueurs avec leurs scores
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import PlayerScoreCard from '../PlayerScoreCard';

interface PlayerListViewProps {
  players: Player[];
  isDesktop: boolean;
  scoreLimit: number;
  onPlayerSelect: (player: Player) => void;
}

const PlayerListView: React.FC<PlayerListViewProps> = ({ 
  players, 
  isDesktop, 
  scoreLimit,
  onPlayerSelect
}) => {
  // Trier les joueurs par score (croissant)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Calcul du seuil d'avertissement (80% de la limite)
  const warningThreshold = scoreLimit * 0.8;
  
  return (
    <motion.div 
      className="space-y-3 md:space-y-4 pb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {sortedPlayers.map((player, index) => (
        <motion.div 
          key={player.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => onPlayerSelect(player)}
          className="cursor-pointer"
        >
          <PlayerScoreCard
            player={player}
            position={index + 1}
            isWinner={index === 0 && player.totalScore >= scoreLimit}
            lastRoundScore={player.rounds.length > 0 ? player.rounds[player.rounds.length - 1].score : undefined}
            warningThreshold={warningThreshold}
          />
        </motion.div>
      ))}
      
      {players.length === 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center text-gray-500 border border-gray-100">
          <p>Aucun joueur disponible</p>
        </div>
      )}
    </motion.div>
  );
};

export default PlayerListView;
