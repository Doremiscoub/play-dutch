
import React from 'react';
import { Player } from '@/types';
import ScoreBoard from '@/components/ScoreBoard';
import GameOverScreen from '@/components/GameOverScreen';

interface GameContentProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  showGameOver: boolean;
  showGameEndConfirmation: boolean;
  scoreLimit: number;
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onUndoLastRound: () => void;
  onRequestEndGame: () => void;
  onConfirmEndGame: () => void;
  onCancelEndGame: () => void;
  onContinueGame: (newLimit: number) => void;
  onRestart: () => void;
}

const GameContent: React.FC<GameContentProps> = ({
  players,
  roundHistory,
  showGameOver,
  showGameEndConfirmation,
  scoreLimit,
  onAddRound,
  onUndoLastRound,
  onRequestEndGame,
  onConfirmEndGame,
  onCancelEndGame,
  onContinueGame,
  onRestart
}) => {
  // Render game over screen or score board based on game state
  return showGameOver ? (
    <GameOverScreen 
      players={players}
      onRestart={onRestart}
      onContinueGame={onContinueGame}
      currentScoreLimit={scoreLimit}
    />
  ) : (
    <ScoreBoard 
      players={players}
      onAddRound={onAddRound}
      onEndGame={onRequestEndGame}
      onUndoLastRound={onUndoLastRound}
      roundHistory={roundHistory}
      showGameEndConfirmation={showGameEndConfirmation}
      onConfirmEndGame={onConfirmEndGame}
      onCancelEndGame={onCancelEndGame}
      scoreLimit={scoreLimit}
    />
  );
};

export default GameContent;
