
/**
 * Vue de la liste des joueurs avec leurs scores
 */
import React, { useState, useEffect } from 'react';
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
  const [isReady, setIsReady] = useState(false);
  
  // Protection contre les données invalides
  const validPlayers = Array.isArray(players) ? players.filter(p => p && p.id) : [];
  
  // S'assurer que les données sont prêtes avant d'afficher
  useEffect(() => {
    // Court délai pour s'assurer que les calculs sont terminés
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [players]);
  
  // Trier les joueurs par score (croissant)
  const sortedPlayers = [...validPlayers].sort((a, b) => 
    (a.totalScore !== undefined && b.totalScore !== undefined) 
      ? a.totalScore - b.totalScore
      : 0
  );
  
  // Calcul du seuil d'avertissement (80% de la limite)
  const warningThreshold = scoreLimit * 0.8;
  
  // Gestion du clic sur une carte joueur
  const handlePlayerClick = (player: Player) => {
    if (!player) return;
    
    try {
      onPlayerSelect(player);
      
      // Si le joueur est déjà développé, on replie sa carte
      if (expandedPlayerId === player.id) {
        setExpandedPlayerId(null);
      } else {
        // Sinon, on développe sa carte (et replie l'autre)
        setExpandedPlayerId(player.id);
      }
    } catch (error) {
      console.error("Erreur lors de la gestion du clic sur un joueur:", error);
    }
  };
  
  if (!isReady) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-dutch-blue border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="space-y-3 md:space-y-4 pb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {sortedPlayers.map((player, index) => (
        <motion.div 
          key={player.id || `player-${index}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="cursor-pointer"
          onClick={() => handlePlayerClick(player)}
        >
          <PlayerScoreCard
            player={player}
            position={index + 1}
            isWinner={index === 0 && player.totalScore >= scoreLimit}
            lastRoundScore={
              player.rounds && player.rounds.length > 0 
                ? player.rounds[player.rounds.length - 1].score 
                : undefined
            }
            warningThreshold={warningThreshold}
            isExpanded={expandedPlayerId === player.id}
            expandedContent={
              expandedPlayerId === player.id ? (
                <PlayerDetailedStats 
                  player={player} 
                  className="mt-3 px-2"
                />
              ) : null
            }
          />
        </motion.div>
      ))}
      
      {validPlayers.length === 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center text-gray-500 border border-gray-100">
          <p>Aucun joueur disponible</p>
        </div>
      )}
    </motion.div>
  );
};

export default PlayerListView;
