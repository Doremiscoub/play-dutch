
import React from 'react';
import GameInitializer from '@/components/game/GameInitializer';
import GamePageContainer from '@/components/game/GamePageContainer';
import GameProtection from '@/components/game/GameProtection';
import { useGameStateManager } from '@/components/game/GameStateManager';

const GamePage: React.FC = () => {
  console.log('GamePage: Component rendered');

  const gameStateManager = useGameStateManager();

  console.log('GamePage: Rendering with state', {
    playersCount: gameStateManager.players?.length || 0,
    showGameOver: gameStateManager.showGameOver,
    gameMode: gameStateManager.gameMode,
    isInitialized: gameStateManager.isInitialized
  });

  return (
    <GameProtection>
      <GameInitializer 
        onInitialize={gameStateManager.handleGameInitialization} 
        gameMode={gameStateManager.gameMode}
      >
        <GamePageContainer
          players={gameStateManager.players || []}
          roundHistory={gameStateManager.roundHistory}
          showGameOver={gameStateManager.showGameOver}
          showGameEndConfirmation={gameStateManager.showGameEndConfirmation}
          scoreLimit={gameStateManager.scoreLimit}
          gameMode={gameStateManager.gameMode}
          currentTournament={gameStateManager.currentTournament}
          tournamentProgress={gameStateManager.tournamentProgress}
          showScoreForm={gameStateManager.showScoreForm}
          onAddRound={gameStateManager.handleAddRound}
          onUndoLastRound={gameStateManager.handleUndoLastRound}
          onRequestEndGame={gameStateManager.handleRequestEndGame}
          onConfirmEndGame={gameStateManager.handleConfirmEndGame}
          onCancelEndGame={gameStateManager.handleCancelEndGame}
          onContinueGame={gameStateManager.handleContinueGame}
          onRestart={gameStateManager.handleRestart}
          onOpenScoreForm={gameStateManager.openScoreForm}
          onCloseScoreForm={gameStateManager.closeScoreForm}
          onBackToSetup={gameStateManager.handleBackToSetup}
        />
      </GameInitializer>
    </GameProtection>
  );
};

export default GamePage;
