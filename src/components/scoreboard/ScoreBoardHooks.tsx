
import { useState, useCallback, useMemo } from 'react';
import { Player } from '@/types';
import { useSound } from '@/hooks/use-sound';
import { toast } from 'sonner';

interface UseScoreBoardLogicProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  onUndoLastRound: () => void;
  onEndGame: () => void;
  openScoreForm?: () => void;
}

export const useScoreBoardLogic = ({
  players,
  roundHistory,
  onUndoLastRound,
  onEndGame,
  openScoreForm
}: UseScoreBoardLogicProps) => {
  const { playSound } = useSound();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'table'>('list');

  // Memoïser les données triées pour éviter les recalculs
  const sortedPlayers = useMemo(() => {
    console.log('ScoreBoard: Sorting players');
    return [...players].sort((a, b) => a.totalScore - b.totalScore);
  }, [players]);

  const roundCount = useMemo(() => {
    return players[0]?.rounds.length || 0;
  }, [players]);

  // Memoïser les callbacks
  const handleAddRound = useCallback(() => {
    console.log('ScoreBoard: handleAddRound called');
    if (openScoreForm) {
      openScoreForm();
    }
    playSound('buttonClick');
  }, [openScoreForm, playSound]);

  const handleUndo = useCallback(() => {
    console.log('ScoreBoard: handleUndo called');
    if (roundHistory.length === 0) {
      toast.error("Aucune manche à annuler");
      return;
    }
    onUndoLastRound();
    playSound('undo');
    toast.success("Dernière manche annulée");
  }, [roundHistory.length, onUndoLastRound, playSound]);

  const handleEndGame = useCallback(() => {
    console.log('ScoreBoard: handleEndGame called - Calling onEndGame prop');
    onEndGame();
    playSound('gameEnd');
  }, [onEndGame, playSound]);

  const handleViewChange = useCallback((view: 'list' | 'table') => {
    console.log('ScoreBoard: View changed to', view);
    setCurrentView(view);
  }, []);

  const handlePlayerSelect = useCallback((player: Player) => {
    console.log('ScoreBoard: Player selected', player.name);
    setSelectedPlayer(player);
  }, []);

  return {
    selectedPlayer,
    currentView,
    sortedPlayers,
    roundCount,
    handleAddRound,
    handleUndo,
    handleEndGame,
    handleViewChange,
    handlePlayerSelect
  };
};
