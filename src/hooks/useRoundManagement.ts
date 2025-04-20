
/**
 * Hook pour la gestion des rounds du jeu
 */
import { useState, useCallback } from 'react';
import { Player } from '@/types';
import { toast } from 'sonner';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { isGameOver } from '@/utils/gameUtils';

/**
 * Hook pour gérer les rounds du jeu
 */
export const useRoundManagement = (scoreLimit: number, soundEnabled: boolean) => {
  const [roundHistory, setRoundHistory] = useState<{ scores: number[], dutchPlayerId?: string }[]>([]);
  
  /**
   * Ajoute un nouveau round
   */
  const addRound = useCallback((
    players: Player[], 
    scores: number[], 
    dutchPlayerId?: string
  ): {
    updatedPlayers: Player[];
    isGameOver: boolean;
  } | null => {
    try {
      // Validations
      if (!players || players.length === 0) {
        toast.error('Erreur: aucun joueur trouvé');
        return null;
      }
      
      if (!scores || scores.length !== players.length) {
        toast.error('Erreur: nombre de scores incorrect');
        return null;
      }
      
      if (scores.some(score => isNaN(score))) {
        toast.error('Erreur: les scores doivent être des nombres valides');
        return null;
      }
      
      if (dutchPlayerId && scores.every(score => score === 0)) {
        toast.error('Un Dutch doit avoir au moins un joueur avec des points');
        return null;
      }
      
      // Mise à jour des scores des joueurs de façon synchrone d'abord
      let updatedPlayers = players.map((player, index) => {
        const isDutch = player.id === dutchPlayerId;
        const newRound = { 
          score: scores[index],
          isDutch 
        };
        const newTotalScore = player.totalScore + scores[index];
        
        return {
          ...player,
          rounds: [...player.rounds, newRound],
          totalScore: newTotalScore
        };
      });
      
      // Vérification si le jeu est terminé et mise à jour des stats
      const playersWithStats = updateAllPlayersStats(updatedPlayers);
      const gameIsOver = isGameOver(playersWithStats, scoreLimit);
      
      // Mise à jour de l'historique des rounds APRÈS avoir calculé les statistiques des joueurs
      setRoundHistory(prev => [...prev, { scores, dutchPlayerId }]);
      
      // Son si activé
      if (soundEnabled) {
        try {
          new Audio('/sounds/card-sound.mp3').play();
        } catch (err) {
          console.error("Erreur son:", err);
        }
      }
      
      toast.success('Manche ajoutée !');
      
      return {
        updatedPlayers: playersWithStats,
        isGameOver: gameIsOver
      };
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une manche:", error);
      toast.error("Une erreur est survenue lors de l'ajout de la manche");
      return null;
    }
  }, [scoreLimit, soundEnabled]);

  /**
   * Annule le dernier round
   */
  const undoLastRound = useCallback((players: Player[], soundEnabled: boolean): Player[] => {
    try {
      if (!players || players.length === 0 || !players[0].rounds || players[0].rounds.length === 0) {
        toast.error('Pas de manche à annuler !');
        return players;
      }
      
      setRoundHistory(prev => prev.slice(0, -1));
      
      const updatedPlayers = players.map(player => {
        if (!player.rounds || player.rounds.length === 0) return player;
        
        const lastRound = player.rounds[player.rounds.length - 1];
        const newTotalScore = player.totalScore - lastRound.score;
        
        return {
          ...player,
          rounds: player.rounds.slice(0, -1),
          totalScore: newTotalScore
        };
      });
      
      if (soundEnabled) {
        try {
          new Audio('/sounds/undo-sound.mp3').play();
        } catch (err) {
          console.error("Erreur son:", err);
        }
      }
      
      toast.success('Dernière manche annulée !');
      
      return updateAllPlayersStats(updatedPlayers);
    } catch (error) {
      console.error("Erreur lors de l'annulation du dernier round:", error);
      toast.error("Une erreur est survenue lors de l'annulation");
      return players;
    }
  }, []);

  return {
    roundHistory,
    setRoundHistory,
    addRound,
    undoLastRound
  };
};
