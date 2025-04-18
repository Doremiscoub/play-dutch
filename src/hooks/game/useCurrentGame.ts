
import { useState } from 'react';
import { Player } from '@/types';
import { toast } from 'sonner';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';

export const useCurrentGame = () => {
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);

  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
    try {
      console.info("Ajout d'une nouvelle manche:", scores, "Dutch:", dutchPlayerId);
      
      if (!players || players.length === 0) {
        toast.error("Aucun joueur trouvé");
        return false;
      }

      if (!scores || scores.length !== players.length) {
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

      return true;
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une manche:", error);
      toast.error("Une erreur est survenue lors de l'ajout de la manche");
      return false;
    }
  };

  return {
    players,
    setPlayers,
    showGameOver,
    setShowGameOver,
    handleAddRound
  };
};
