
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Settings, Plus } from 'lucide-react';
import { GameButton } from '@/components/ui/game-button';
import useGameState from '@/hooks/useGameState';
import ScoreBoardWithAds from '@/components/scoreboard/ScoreBoardWithAds';
import GameOverScreen from '@/components/GameOverScreen';
import NewRoundScoreForm from '@/components/NewRoundScoreForm';
import { toast } from 'sonner';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [showScoreForm, setShowScoreForm] = useState<boolean>(false);
  const [gameInitialized, setGameInitialized] = useState<boolean>(false);

  const {
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    scoreLimit,
    gameStartTime,
    handleAddRound,
    handleUndoLastRound,
    handleRequestEndGame,
    handleConfirmEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart,
    createNewGame
  } = useGameState();

  // Initialize game on component mount
  useEffect(() => {
    const initializeGame = async () => {
      try {
        const shouldReturnToGame = localStorage.getItem('dutch_return_to_game');
        if (shouldReturnToGame) {
          localStorage.removeItem('dutch_return_to_game');
        }

        const success = await createNewGame();
        if (success) {
          setGameInitialized(true);
        } else {
          console.error('Failed to initialize game');
          navigate('/game/setup');
        }
      } catch (error) {
        console.error('Game initialization error:', error);
        navigate('/game/setup');
      }
    };

    if (!gameInitialized) {
      initializeGame();
    }
  }, [createNewGame, navigate, gameInitialized]);

  const openScoreForm = () => {
    setShowScoreForm(true);
  };

  const closeScoreForm = () => {
    setShowScoreForm(false);
  };

  const handleAddNewRound = (scores: number[], dutchPlayerId?: string) => {
    const success = handleAddRound(scores, dutchPlayerId);
    if (success) {
      closeScoreForm();
    }
  };

  // Show loading if game isn't initialized yet
  if (!gameInitialized || !players || players.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-game-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Initialisation de la partie...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-100/80">
      {/* Game-inspired background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-4 h-4 bg-game-red rounded-full animate-float" />
        <div className="absolute top-20 right-20 w-6 h-6 bg-game-blue rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-game-green rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-4 h-4 bg-game-yellow rounded-full animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-game-purple rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-game-orange rounded-full animate-float" style={{ animationDelay: '5s' }} />
      </div>

      {/* Header with Back and Settings buttons */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between">
        <GameButton
          onClick={() => navigate('/game/setup')}
          variant="ghost"
          size="icon"
          aria-label="Retour"
        >
          <ArrowLeft className="h-5 w-5" />
        </GameButton>
        
        <GameButton
          variant="ghost"
          size="icon"
          onClick={() => navigate('/settings')}
          aria-label="Paramètres"
        >
          <Settings className="h-5 w-5" />
        </GameButton>
      </div>

      {/* Floating "New Round" button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <GameButton
          onClick={openScoreForm}
          variant="uno"
          size="icon-lg"
          aria-label="Nouvelle manche"
        >
          <Plus className="h-6 w-6" />
        </GameButton>
      </motion.div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {showGameOver ? (
            <motion.div
              key="game-over"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GameOverScreen
                players={players}
                onRestart={handleRestart}
                onContinueGame={handleContinueGame}
                currentScoreLimit={scoreLimit}
              />
            </motion.div>
          ) : (
            <motion.div
              key="game-board"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-20"
            >
              <ScoreBoardWithAds
                players={players}
                roundHistory={roundHistory}
                onAddRound={handleAddNewRound}
                onUndoLastRound={handleUndoLastRound}
                onEndGame={handleRequestEndGame}
                showGameEndConfirmation={showGameEndConfirmation}
                onConfirmEndGame={handleConfirmEndGame}
                onCancelEndGame={handleCancelEndGame}
                scoreLimit={scoreLimit}
                openScoreForm={openScoreForm}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <NewRoundScoreForm
        players={players}
        open={showScoreForm}
        onClose={closeScoreForm}
        onSubmit={handleAddNewRound}
      />
    </div>
  );
};

export default GamePage;
