
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
    roundHistoryLength: roundHistory?.length,
    hasOpenScoreForm: !!openScoreForm
  });

  // Vérification de sécurité pour les données avec logs détaillés
  const safeRoundHistory = roundHistory || [];
  const safePlayers = players || [];

  if (safePlayers.length === 0) {
    console.warn('useScoreBoardLogic: No players provided to hook');
  }

  // Memoïser les données triées pour éviter les recalculs
  const sortedPlayers = useMemo(() => {
    if (!safePlayers.length) {
      console.log('useScoreBoardLogic: No players to sort');
      return [];
    }
    
    const sorted = [...safePlayers].sort((a, b) => a.totalScore - b.totalScore);
    console.log('useScoreBoardLogic: Players sorted', sorted.map(p => ({ name: p.name, score: p.totalScore })));
    return sorted;
  }, [safePlayers]);

  const roundCount = useMemo(() => {
    const count = safePlayers[0]?.rounds?.length || 0;
    console.log('useScoreBoardLogic: Round count calculated:', count);
    return count;
  }, [safePlayers]);

  // Memoïser les callbacks avec gestion d'erreurs
  const handleAddRound = useCallback(() => {
    console.log('useScoreBoardLogic: handleAddRound called');
    try {
      if (openScoreForm) {
        openScoreForm();
        playSound('buttonClick');
        toast.success("Formulaire de scores ouvert");
      } else {
        console.error('useScoreBoardLogic: openScoreForm not provided');
        toast.error("Impossible d'ouvrir le formulaire de scores");
      }
    } catch (error) {
      console.error('useScoreBoardLogic: Error in handleAddRound:', error);
      toast.error("Erreur lors de l'ouverture du formulaire");
    }
  }, [openScoreForm, playSound]);

  const handleUndo = useCallback(() => {
    console.log('useScoreBoardLogic: handleUndo called, history length:', safeRoundHistory.length);
    try {
      if (safeRoundHistory.length === 0) {
        toast.error("Aucune manche à annuler");
        return;
      }
      onUndoLastRound();
      playSound('undo');
      toast.success("Dernière manche annulée");
    } catch (error) {
      console.error('useScoreBoardLogic: Error in handleUndo:', error);
      toast.error("Erreur lors de l'annulation");
    }
  }, [safeRoundHistory.length, onUndoLastRound, playSound]);

  const handleEndGame = useCallback(() => {
    console.log('useScoreBoardLogic: handleEndGame called');
    try {
      onEndGame();
      playSound('gameEnd');
      toast.success("Fin de partie déclenchée");
    } catch (error) {
      console.error('useScoreBoardLogic: Error in handleEndGame:', error);
      toast.error("Erreur lors de la fin de partie");
    }
  }, [onEndGame, playSound]);

  const handleViewChange = useCallback((view: 'list' | 'table') => {
    console.log('useScoreBoardLogic: View changed to', view);
    setCurrentView(view);
    playSound('buttonClick');
  }, [playSound]);

  const handlePlayerSelect = useCallback((player: Player) => {
    console.log('useScoreBoardLogic: Player selected', player.name);
    setSelectedPlayer(prevSelected => 
      prevSelected?.id === player.id ? null : player
    );
    playSound('cardFlip');
  }, [playSound]);

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
