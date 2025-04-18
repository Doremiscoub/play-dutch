
import { useState, useCallback } from 'react';
import { Player } from '@/types';
import { toast } from 'sonner';
import { useRounds } from './useRounds';
import { useSound } from '@/hooks/use-sound';

export const useCurrentGame = () => {
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const { isSoundEnabled } = useSound();
  const { roundHistory, addRound: addRoundToHistory, undoLastRound: undoRoundFromHistory } = useRounds(isSoundEnabled);

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

      // Utiliser la fonction addRound de useRounds pour mettre à jour les joueurs
      const updatedPlayers = addRoundToHistory(players, scores, dutchPlayerId);
      setPlayers(updatedPlayers);
      
      console.info("Manche ajoutée avec succès");
      toast.success("Manche ajoutée");
      return true;
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une manche:", error);
      toast.error("Une erreur est survenue lors de l'ajout de la manche");
      return false;
    }
  }, [players, addRoundToHistory]);

  const handleUndoLastRound = useCallback(() => {
    const updatedPlayers = undoRoundFromHistory(players);
    setPlayers(updatedPlayers);
  }, [players, undoRoundFromHistory]);

  return {
    players,
    setPlayers,
    showGameOver,
    setShowGameOver,
    handleAddRound,
    handleUndoLastRound,
    roundHistory
  };
};

// Réexporter useRounds pour une source de vérité unique
export { useRounds };
