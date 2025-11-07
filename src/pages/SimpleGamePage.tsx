
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '@/hooks/game/unified/useGameState';
import ScoreBoard from '@/features/scoreboard/ScoreBoard';
import NewRoundModal from '@/components/NewRoundModal';
import { useUnifiedHeader } from '@/hooks/useUnifiedHeader';
import { AICommentator } from '@/features/ai-commentator';
import { toast } from 'sonner';
import GamePageLayout from '@/components/layout/GamePageLayout';
import VideoAdOverlay from '@/components/ads/VideoAdOverlay';
import GameErrorFallback from '@/components/errors/GameErrorFallback';
import { logger } from '@/utils/logger';
import * as Sentry from '@sentry/react';

const { ErrorBoundary } = Sentry;

const SimpleGamePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    players,
    roundHistory,
    scoreLimit,
    gameStartTime,
    isGameOver,
    hasGame,
    addRound,
    undoLastRound,
    resetGame,
    syncStatus,
    isConnected,
    availableGames,
    loadGameFromCloud,
    migrateLocalToCloud
  } = useGameState();
  const [isScoreFormOpen, setIsScoreFormOpen] = useState(false);
  const [showGameEndConfirmation, setShowGameEndConfirmation] = useState(false);
  const [scores, setScores] = useState<{ [playerId: string]: number }>({});
  const [dutchPlayerId, setDutchPlayerId] = useState<string | undefined>();
  const [showVideoAd, setShowVideoAd] = useState(false);
  const [adTrigger, setAdTrigger] = useState<'round-added' | 'game-ended'>('round-added');
  
  // Configuration du header - DOIT être appelé avant tout return conditionnel
  const headerConfig = useUnifiedHeader(
    hasGame
      ? {
          title: `Manche ${roundHistory.length + 1}`,
          variant: "game",
          roundCount: roundHistory.length + 1,
          scoreLimit: scoreLimit,
          gameStartTime: gameStartTime || new Date(),
          showRulesButton: true,
          onBack: () => navigate('/setup')
        }
      : {
          title: "Aucune partie en cours",
          showBackButton: true,
          onBack: () => navigate('/setup')
        }
  );

  useEffect(() => {
    logger.debug('🎮 SimpleGamePage MOUNTED - Optimized version');
    
    return () => {
      logger.debug('🎮 SimpleGamePage UNMOUNTED');
    };
  }, []);

  // Effect séparé pour l'initialisation des scores
  useEffect(() => {
    if (players.length > 0) {
      const initialScores: { [playerId: string]: number } = {};
      players.forEach(player => {
        initialScores[player.id] = 0;
      });
      setScores(initialScores);
      logger.debug('🎯 Scores initialized for', players.length, 'players');
    }
  }, [players.length]);

  // Guard: si pas de partie, afficher un message sans redirection automatique
  if (!hasGame) {
    logger.debug('🚫 No game available, showing setup prompt');
    return (
      <GamePageLayout variant="game" headerConfig={headerConfig}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Aucune partie en cours
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Vous devez d'abord créer une partie pour jouer.
          </p>
          <button 
            onClick={() => navigate('/setup')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Créer une partie
          </button>
        </div>
      </GamePageLayout>
    );
  }

  const handleAddRound = () => {
    // Convertir l'objet scores en array dans l'ordre des joueurs
    const scoresArray = players.map(player => scores[player.id] || 0);
    addRound(scoresArray, dutchPlayerId);
    setIsScoreFormOpen(false);
    
    // Réinitialiser les scores
    const initialScores: { [playerId: string]: number } = {};
    players.forEach(player => {
      initialScores[player.id] = 0;
    });
    setScores(initialScores);
    setDutchPlayerId(undefined);
  };

  const handleEndGame = () => {
    setShowGameEndConfirmation(true);
  };

  const handleConfirmEndGame = () => {
    setAdTrigger('game-ended');
    setShowVideoAd(true);
    resetGame();
    navigate('/setup');
    setShowGameEndConfirmation(false);
  };

  const handleVideoAdShown = () => {
    setAdTrigger('round-added');
    setShowVideoAd(true);
  };

  const handleCancelEndGame = () => {
    setShowGameEndConfirmation(false);
  };

  const openScoreForm = () => {
    setIsScoreFormOpen(true);
  };

  logger.debug('🎮 SimpleGamePage rendering with', players.length, 'players');

  return (
    <ErrorBoundary fallback={<GameErrorFallback error={new Error('GamePage Error')} resetErrorBoundary={() => window.location.reload()} />}>
      <GamePageLayout variant="game" headerConfig={headerConfig}>
        {/* Professeur Cartouche - En haut */}
        <ErrorBoundary fallback={<div className="p-4 bg-red-50 rounded-lg">Erreur du commentateur</div>}>
          <AICommentator 
            players={players}
            roundCount={roundHistory.length}
            scoreLimit={scoreLimit}
            className="mb-6"
          />
        </ErrorBoundary>
        
        {/* ScoreBoard */}
        <ErrorBoundary fallback={<div className="p-4 bg-red-50 rounded-lg">Erreur du tableau</div>}>
          <ScoreBoard
            players={players}
            onAddRound={() => {}}
            onUndoLastRound={undoLastRound}
            onEndGame={handleEndGame}
            roundHistory={roundHistory}
            showGameEndConfirmation={showGameEndConfirmation}
            onConfirmEndGame={handleConfirmEndGame}
            onCancelEndGame={handleCancelEndGame}
            scoreLimit={scoreLimit}
            openScoreForm={openScoreForm}
            hideFloatingActionsWhenModalOpen={isScoreFormOpen}
          />
        </ErrorBoundary>
      </GamePageLayout>

      {/* Modal pour ajouter une nouvelle manche */}
      <NewRoundModal
        open={isScoreFormOpen}
        onClose={() => setIsScoreFormOpen(false)}
        players={players}
        scores={scores}
        setScores={setScores}
        dutchPlayerId={dutchPlayerId}
        setDutchPlayerId={setDutchPlayerId}
        onAddRound={handleAddRound}
        onVideoAdShown={handleVideoAdShown}
      />

      {/* Overlay de publicité vidéo */}
      <VideoAdOverlay
        isVisible={showVideoAd}
        onClose={() => setShowVideoAd(false)}
        trigger={adTrigger}
      />
    </ErrorBoundary>
  );
};

export default SimpleGamePage;
