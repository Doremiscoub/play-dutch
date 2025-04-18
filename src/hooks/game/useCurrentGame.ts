
import { useState, useCallback } from 'react';
import { Player } from '@/types';
import { toast } from 'sonner';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';

export const useCurrentGame = () => {
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);

  const handleAddRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    try {
      console.info("Ajout d'une nouvelle manche:", scores, "Dutch:", dutchPlayerId);
      
      if (!players || players.length === 0) {
        console.error("Tentative d'ajout de manche sans joueurs");
        toast.error("Aucun joueur trouvé");
        return false;
      }

      if (!scores || scores.length !== players.length) {
        console.error("Scores invalides pour la manche");
        toast.error("Scores invalides");
        return false;
      }

      // Mise à jour des scores des joueurs
      const updatedPlayers = players.map((player, index) => {
        const isDutch = player.id === dutchPlayerId;
        const newRound = { 
          score: scores[index],
          isDutch 
        };
        
        return {
          ...player,
          rounds: [...player.rounds, newRound],
          totalScore: player.totalScore + scores[index]
        };
      });

      // Mise à jour des statistiques
      const playersWithStats = updateAllPlayersStats(updatedPlayers);
      setPlayers(playersWithStats);
      
      console.info("Manche ajoutée avec succès");
      toast.success("Manche ajoutée");
      return true;
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une manche:", error);
      toast.error("Une erreur est survenue lors de l'ajout de la manche");
      return false;
    }
  }, [players]);

  return {
    players,
    setPlayers,
    showGameOver,
    setShowGameOver,
    handleAddRound
  };
};
