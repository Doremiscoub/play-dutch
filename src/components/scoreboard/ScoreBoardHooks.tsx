
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

  console.log('useScoreBoardLogic: Initializing with', { 
    playersCount: players?.length, 
    roundHistoryLength: roundHistory?.length 
  });

  // Vérification de sécurité pour les données
  const safeRoundHistory = roundHistory || [];
  const safePlayers = players || [];

  // Memoïser les données triées pour éviter les recalculs
  const sortedPlayers = useMemo(() => {
    if (!safePlayers.length) {
      console.log('useScoreBoardLogic: No players to sort');
      return [];
    }
    console.log('useScoreBoardLogic: Sorting players');
    return [...safePlayers].sort((a, b) => a.totalScore - b.totalScore);
  }, [safePlayers]);

  const roundCount = useMemo(() => {
    const count = safePlayers[0]?.rounds?.length || 0;
    console.log('useScoreBoardLogic: Round count:', count);
    return count;
  }, [safePlayers]);

  // Memoïser les callbacks
  const handleAddRound = useCallback(() => {
    console.log('useScoreBoardLogic: handleAddRound called');
    if (openScoreForm) {
      openScoreForm();
    } else {
      console.warn('useScoreBoardLogic: openScoreForm not provided');
    }
    playSound('buttonClick');
  }, [openScoreForm, playSound]);

  const handleUndo = useCallback(() => {
    console.log('useScoreBoardLogic: handleUndo called, history length:', safeRoundHistory.length);
    if (safeRoundHistory.length === 0) {
      toast.error("Aucune manche à annuler");
      return;
    }
    onUndoLastRound();
    playSound('undo');
    toast.success("Dernière manche annulée");
  }, [safeRoundHistory.length, onUndoLastRound, playSound]);

  const handleEndGame = useCallback(() => {
    console.log('useScoreBoardLogic: handleEndGame called - Calling onEndGame prop');
    onEndGame();
    playSound('gameEnd');
  }, [onEndGame, playSound]);

  const handleViewChange = useCallback((view: 'list' | 'table') => {
    console.log('useScoreBoardLogic: View changed to', view);
    setCurrentView(view);
  }, []);

  const handlePlayerSelect = useCallback((player: Player) => {
    console.log('useScoreBoardLogic: Player selected', player.name);
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
