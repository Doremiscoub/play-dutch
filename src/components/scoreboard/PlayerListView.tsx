
/**
 * Vue de la liste des joueurs avec leurs scores
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import PlayerScoreCard from '../PlayerScoreCard';
import PlayerDetailedStats from '../PlayerDetailedStats';

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
  // État pour suivre le joueur dont la carte est développée
  const [expandedPlayerId, setExpandedPlayerId] = useState<string | null>(null);
  
  // Trier les joueurs par score (croissant)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Calcul du seuil d'avertissement (80% de la limite)
  const warningThreshold = scoreLimit * 0.8;
  
  // Gestion du clic sur une carte joueur
  const handlePlayerClick = (player: Player) => {
    onPlayerSelect(player);
    
    // Si le joueur est déjà développé, on replie sa carte
    if (expandedPlayerId === player.id) {
      setExpandedPlayerId(null);
    } else {
      // Sinon, on développe sa carte (et replie l'autre)
      setExpandedPlayerId(player.id);
    }
  };
  
  return (
    <motion.div 
      className="space-y-3 md:space-y-4 pb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {sortedPlayers.map((player, index) => (
        <div key={player.id} className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handlePlayerClick(player)}
            className="cursor-pointer"
          >
            <PlayerScoreCard
              player={player}
              position={index + 1}
              isWinner={index === 0 && player.totalScore >= scoreLimit}
              lastRoundScore={player.rounds.length > 0 ? player.rounds[player.rounds.length - 1].score : undefined}
              warningThreshold={warningThreshold}
              isExpanded={expandedPlayerId === player.id}
            />
          </motion.div>
          
          <AnimatePresence>
            {expandedPlayerId === player.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden px-2"
              >
                <PlayerDetailedStats 
                  player={player} 
                  className="ml-8"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
