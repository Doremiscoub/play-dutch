
import React from 'react';
import SimpleGameInitializer from '@/components/game/SimpleGameInitializer';
import { useGameInitialization } from '@/hooks/useGameInitialization';
import ScoreBoard from '@/components/ScoreBoard';

const SimpleGamePage: React.FC = () => {
  const {
    players,
    gameStartTime,
    scoreLimit,
    isInitialized
  } = useGameInitialization();

  const handleAddRound = async (scores: number[], dutchPlayerId?: string) => {
    // TODO: Implement round management
    console.log('Add round:', scores, dutchPlayerId);
    return true;
  };

  const handleUndoLastRound = async () => {
    // TODO: Implement undo functionality
    console.log('Undo last round');
    return true;
  };

  const handleRequestEndGame = () => {
    // TODO: Implement end game request
    console.log('Request end game');
  };

  const handleConfirmEndGame = () => {
    // TODO: Implement end game confirmation
    console.log('Confirm end game');
    return true;
  };

  const handleCancelEndGame = () => {
    // TODO: Implement cancel end game
    console.log('Cancel end game');
  };

  const openScoreForm = () => {
    // TODO: Implement score form opening
    console.log('Open score form');
  };

  if (!isInitialized || !players || players.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <SimpleGameInitializer>
      <ScoreBoard
        players={players}
        onAddRound={handleAddRound}
        onUndoLastRound={handleUndoLastRound}
        onEndGame={handleRequestEndGame}
        onConfirmEndGame={handleConfirmEndGame}
        onCancelEndGame={handleCancelEndGame}
        roundHistory={[]}
        scoreLimit={scoreLimit}
        openScoreForm={openScoreForm}
      />
    </SimpleGameInitializer>
  );
};

export default SimpleGamePage;
