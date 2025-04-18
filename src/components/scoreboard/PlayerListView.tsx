
/**
 * Vue de la liste des joueurs avec leurs scores - version optimisée
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
  const [isMounted, setIsMounted] = useState(false);
  
  // Protection contre les données invalides
  const validPlayers = Array.isArray(players) ? players.filter(p => p && p.id) : [];
  
  // Effet de montage/démontage avec protection optimisée
  useEffect(() => {
    console.info("PlayerListView: Montage du composant");
    setIsMounted(true);
    
    // Court délai pour s'assurer que les calculs sont terminés
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 150);
    
    return () => {
      console.info("PlayerListView: Démontage du composant");
      clearTimeout(readyTimer);
      setIsMounted(false);
      setIsReady(false);
      setExpandedPlayerId(null); // Réinitialiser l'état lors du démontage
    };
  }, []);
  
  // Effet de réinitialisation lorsque les joueurs changent
  useEffect(() => {
    if (isMounted && expandedPlayerId) {
      // Vérifier si le joueur développé existe toujours
      const playerExists = validPlayers.some(p => p.id === expandedPlayerId);
      if (!playerExists) {
        setExpandedPlayerId(null);
      }
    }
  }, [validPlayers, expandedPlayerId, isMounted]);
  
  // Trier les joueurs par score (croissant)
  const sortedPlayers = [...validPlayers].sort((a, b) => 
    (typeof a.totalScore === 'number' && typeof b.totalScore === 'number') 
      ? a.totalScore - b.totalScore
      : 0
  );
  
  // Calcul du seuil d'avertissement (80% de la limite)
  const warningThreshold = scoreLimit * 0.8;
  
  // Gestion du clic sur une carte joueur avec protection d'erreur
  const handlePlayerClick = (player: Player) => {
    if (!player || !player.id) return;
    
    try {
      // Notifier le conteneur de la sélection
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
      setExpandedPlayerId(null); // Réinitialiser en cas d'erreur
    }
  };
  
  // Afficher un indicateur de chargement si les données ne sont pas encore prêtes
  if (!isReady) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-dutch-blue border-t-transparent"></div>
      </div>
    );
  }
  
  // Si aucun joueur valide n'est trouvé
  if (validPlayers.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center text-gray-500 border border-gray-100">
        <p>Aucun joueur disponible</p>
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
            isWinner={index === 0 && typeof player.totalScore === 'number' && player.totalScore >= scoreLimit}
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
    </motion.div>
  );
};

export default PlayerListView;
