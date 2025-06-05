
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Settings, Plus } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
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
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-dutch-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Initialisation de la partie...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Header with enhanced Back and Settings buttons */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between">
        <EnhancedButton
          onClick={() => navigate('/game/setup')}
          variant="glass"
          size="icon"
          effect="glow"
          aria-label="Retour"
        >
          <ArrowLeft className="h-5 w-5" />
        </EnhancedButton>
        
        <EnhancedButton
          variant="glass"
          size="icon"
          effect="glow"
          aria-label="Paramètres"
        >
          <Settings className="h-5 w-5" />
        </EnhancedButton>
      </div>

      {/* Enhanced floating "New Round" button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <EnhancedButton
          onClick={openScoreForm}
          variant="power"
          size="icon-lg"
          effect="glow"
          rarity="epic"
          withSparkles
          aria-label="Nouvelle manche"
        >
          <Plus className="h-6 w-6" />
        </EnhancedButton>
      </motion.div>

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
