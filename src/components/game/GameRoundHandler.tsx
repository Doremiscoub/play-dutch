import { useCallback } from 'react';
import { logger } from '@/utils/logger';

interface GameRoundHandlerProps {
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onCloseScoreForm: () => void;
}

export const useGameRoundHandler = ({ onAddRound, onCloseScoreForm }: GameRoundHandlerProps) => {
  const handleAddNewRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    logger.debug('GamePageContainer: Adding new round');
    onAddRound(scores, dutchPlayerId);
    onCloseScoreForm();
  }, [onAddRound, onCloseScoreForm]);

  return { handleAddNewRound };
};