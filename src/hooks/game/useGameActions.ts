import { useCallback } from 'react';
import { toast } from 'sonner';
import { Player, RoundHistoryEntry } from '@/types';

interface UseGameActionsProps {
  players: Player[];
  roundHistory: RoundHistoryEntry[];
  scoreLimit: number;
  gameStartTime: Date | null;
  showGameOver: boolean;
  soundEnabled: boolean;
  addRound: (players: Player[], scores: number[], dutchPlayerId?: string) => any;
  undoLastRound: (players: Player[], soundEnabled: boolean) => Player[];
  finalizeGame: (players: Player[], gameStartTime: Date | null) => Promise<boolean>;
  saveCurrentGame: (players: Player[], roundHistory: RoundHistoryEntry[], scoreLimit: number, gameStartTime: Date | null, isGameOver?: boolean) => Promise<boolean>;
  setPlayers: (players: Player[]) => void;
  setShowGameOver: (show: boolean) => void;
  setShowScoreForm: (show: boolean) => void;
}

export const useGameActions = ({
  players,
  roundHistory,
  scoreLimit,
  gameStartTime,
  showGameOver,
  soundEnabled,
  addRound,
  undoLastRound,
  finalizeGame,
  saveCurrentGame,
  setPlayers,
  setShowGameOver,
  setShowScoreForm
}: UseGameActionsProps) => {

  const handleAddRound = useCallback(async (scores: number[], dutchPlayerId?: string) => {
    try {
      const result = addRound(players, scores, dutchPlayerId);
      
      if (result) {
        const { updatedPlayers, isGameOver } = result;
        setPlayers(updatedPlayers);
        
        await saveCurrentGame(updatedPlayers, [...roundHistory, { scores, dutchPlayerId }], scoreLimit, gameStartTime);
        
        if (isGameOver) {
          setTimeout(() => setShowGameOver(true), 500);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error in handleAddRound:', error);
      toast.error('Erreur lors de l\'ajout de la manche');
      return false;
    }
  }, [players, addRound, setPlayers, roundHistory, scoreLimit, gameStartTime, saveCurrentGame, setShowGameOver]);

  const handleUndoLastRound = useCallback(async () => {
    try {
      const updatedPlayers = undoLastRound(players, soundEnabled);
      setPlayers(updatedPlayers);
      
      if (showGameOver) {
        setShowGameOver(false);
      }
      
      await saveCurrentGame(updatedPlayers, roundHistory.slice(0, -1), scoreLimit, gameStartTime);
      return true;
    } catch (error) {
      console.error('Error in handleUndoLastRound:', error);
      toast.error('Erreur lors de l\'annulation');
      return false;
    }
  }, [players, undoLastRound, setPlayers, showGameOver, soundEnabled, roundHistory, scoreLimit, gameStartTime, saveCurrentGame, setShowGameOver]);

  const handleConfirmEndGame = useCallback(async () => {
    try {
      await finalizeGame(players, gameStartTime);
      setShowGameOver(true);
      return true;
    } catch (error) {
      console.error('Error in handleConfirmEndGame:', error);
      return false;
    }
  }, [players, gameStartTime, finalizeGame, setShowGameOver]);

  const handleOpenScoreForm = useCallback(() => {
    setShowScoreForm(true);
  }, [setShowScoreForm]);

  const handleCloseScoreForm = useCallback(() => {
    setShowScoreForm(false);
  }, [setShowScoreForm]);

  return {
    handleAddRound,
    handleUndoLastRound,
    handleConfirmEndGame,
    handleOpenScoreForm,
    handleCloseScoreForm
  };
};