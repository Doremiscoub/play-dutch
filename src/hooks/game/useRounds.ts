
import { useState } from 'react';
import { Player } from '@/types';
import { toast } from 'sonner';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';

interface RoundHistory {
  scores: number[];
  dutchPlayerId?: string;
}

export const useRounds = (soundEnabled: boolean) => {
  // Initialisation explicite avec un tableau vide pour éviter des problèmes de type
  const [roundHistory, setRoundHistory] = useState<RoundHistory[]>([]);

  const undoLastRound = (players: Player[]): Player[] => {
    try {
      // Vérification que players est un tableau valide avec au moins un élément
      if (!players || !Array.isArray(players) || players.length === 0) {
        console.warn('Aucun joueur disponible pour annuler la manche');
        toast.error('Pas de manche à annuler !');
        return players;
      }

      // Vérification que le premier joueur a au moins une manche
      if (!players[0].rounds || players[0].rounds.length === 0) {
        toast.error('Pas de manche à annuler !');
        return players;
      }

      setRoundHistory(prev => prev.slice(0, -1));

      const updatedPlayers = players.map(player => {
        if (!player.rounds || player.rounds.length === 0) return player;
        
        const lastRound = player.rounds[player.rounds.length - 1];
        return {
          ...player,
          rounds: player.rounds.slice(0, -1),
          totalScore: player.totalScore - lastRound.score
        };
      });

      if (soundEnabled) {
        try {
          new Audio('/sounds/undo-sound.mp3').play().catch(err => {
            console.error("Erreur son:", err);
          });
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
  };

  return {
    roundHistory,
    setRoundHistory,
    undoLastRound
  };
};
