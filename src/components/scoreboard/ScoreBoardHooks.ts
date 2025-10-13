
import { useState, useCallback, useMemo } from 'react';
import { Player } from '@/types';
import { useSound } from '@/hooks/use-sound';
import { toast } from 'sonner';
import { logger } from '@/utils/logger';

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
  const [currentView, setCurrentView] = useState<'list' | 'table' | 'stats'>('list');

  logger.debug('useScoreBoardLogic: Initializing with', { 
    playersCount: players?.length, 
    roundHistoryLength: roundHistory?.length,
    hasOpenScoreForm: !!openScoreForm
  });

  // Vérification de sécurité pour les données
  const safeRoundHistory = roundHistory || [];
  const safePlayers = players || [];

  if (safePlayers.length === 0) {
    logger.warn('useScoreBoardLogic: No players provided to hook');
  }

  // Memoïser les données triées pour éviter les recalculs
  const sortedPlayers = useMemo(() => {
    if (!safePlayers.length) {
      return [];
    }
    
    return [...safePlayers].sort((a, b) => a.totalScore - b.totalScore);
  }, [safePlayers]);

  const roundCount = useMemo(() => {
    return safePlayers[0]?.rounds?.length || 0;
  }, [safePlayers]);

  // Memoïser les callbacks avec gestion d'erreurs
  const handleAddRound = useCallback(() => {
    try {
      if (openScoreForm) {
        openScoreForm();
        playSound('buttonClick');
      } else {
        logger.error('useScoreBoardLogic: openScoreForm not provided');
        toast.error("Impossible d'ouvrir le formulaire de scores");
      }
    } catch (error) {
      logger.error('useScoreBoardLogic: Error in handleAddRound:', error);
      toast.error("Erreur lors de l'ouverture du formulaire");
    }
  }, [openScoreForm, playSound]);

  const handleUndo = useCallback(() => {
    try {
      if (safeRoundHistory.length === 0) {
        toast.error("Aucune manche à annuler");
        return;
      }
      onUndoLastRound();
      playSound('undo');
      toast.success("Dernière manche annulée");
    } catch (error) {
      logger.error('useScoreBoardLogic: Error in handleUndo:', error);
      toast.error("Erreur lors de l'annulation");
    }
  }, [safeRoundHistory.length, onUndoLastRound, playSound]);

  const handleEndGame = useCallback(() => {
    try {
      onEndGame();
      playSound('gameEnd');
    } catch (error) {
      logger.error('useScoreBoardLogic: Error in handleEndGame:', error);
      toast.error("Erreur lors de la fin de partie");
    }
  }, [onEndGame, playSound]);

  const handleViewChange = useCallback((view: 'list' | 'table' | 'stats') => {
    setCurrentView(view);
    playSound('buttonClick');
  }, [playSound]);

  const handlePlayerSelect = useCallback((player: Player) => {
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
