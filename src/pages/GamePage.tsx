
import React, { useMemo } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useGameInitializer } from '@/hooks/useGameInitializer';
import GameContent from '@/components/GameContent';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { isInitializing, initError } = useGameInitializer();
  
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
    handleRestart,
  } = useGameState();
  
  // Mémoisation des statistiques des joueurs
  const playersWithStats = useMemo(() => 
    updateAllPlayersStats(players),
    [players]
  );
  
  // État de chargement
  if (isInitializing) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-screen p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-dutch-blue/20 border-t-dutch-blue rounded-full mx-auto animate-spin" />
          <p className="text-gray-600 font-medium">Chargement de la partie...</p>
        </div>
      </motion.div>
    );
  }
  
  // Gestion d'erreur
  if (initError) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-screen p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-md w-full bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-600 mb-3">
            Échec du chargement
          </h2>
          <p className="text-gray-700 mb-4">{initError}</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => navigate('/game/setup')}
              className="px-4 py-2 bg-dutch-blue text-white rounded-lg hover:bg-dutch-blue/90 transition-colors"
            >
              Configurer une partie
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

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
