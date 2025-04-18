
import React, { useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { useLocation } from 'react-router-dom';

const GamePage: React.FC = () => {
  const location = useLocation();
  const {
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    scoreLimit,
    handleAddRound,
    handleUndoLastRound,
    handleRequestEndGame,
    handleConfirmEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart
  } = useGameState();
  
  // Check for long inactivity
  useEffect(() => {
    const savedGame = localStorage.getItem('current_dutch_game');
    if (savedGame) {
      try {
        const parsedGame = JSON.parse(savedGame);
        const lastUpdated = new Date(parsedGame.lastUpdated);
        const now = new Date();
        const hoursSinceLastUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceLastUpdate > 24) {
          const confirmResume = window.confirm('Une partie non terminée a été trouvée. Voulez-vous la reprendre?');
          if (!confirmResume) {
            localStorage.removeItem('current_dutch_game');
            handleRestart();
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'analyse de la partie sauvegardée:", error);
        localStorage.removeItem('current_dutch_game');
      }
    }
  }, [handleRestart]);
  
  // Apply stats to players
  const playersWithStats = updateAllPlayersStats(players);
  
  // Store current path in localStorage for navigation history
  useEffect(() => {
    localStorage.setItem('dutch_previous_route', location.pathname);
  }, [location]);
  
  return (
    <GameContent
      players={playersWithStats}
      roundHistory={roundHistory}
      showGameOver={showGameOver}
      showGameEndConfirmation={showGameEndConfirmation}
      scoreLimit={scoreLimit}
      onAddRound={handleAddRound}
      onUndoLastRound={handleUndoLastRound}
      onRequestEndGame={handleRequestEndGame}
      onConfirmEndGame={handleConfirmEndGame}
      onCancelEndGame={handleCancelEndGame}
      onContinueGame={handleContinueGame}
      onRestart={handleRestart}
    />
  );
};

export default GamePage;
