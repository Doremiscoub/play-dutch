
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '@/hooks/useGameState';
import GamePageContainer from '@/components/game/GamePageContainer';
import PageShell from '@/components/layout/PageShell';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const gameState = useGameState();
  const [loadingAttempts, setLoadingAttempts] = useState(0);
  const [isInTransition, setIsInTransition] = useState(false);

  // Load existing game on mount avec retry et délai de grâce
  useEffect(() => {
    console.log('🎮 GamePage: useEffect triggered, attempt:', loadingAttempts);
    console.log('🔍 GamePage: isInitialized:', gameState.isInitialized);
    console.log('🔍 GamePage: players:', gameState.players);
    console.log('🔍 GamePage: players length:', gameState.players?.length);
    
    // Premier check: si on a déjà des joueurs en React state, pas besoin de charger
    if (gameState.isInitialized && gameState.players && gameState.players.length > 0) {
      console.log('✅ GamePage: Game already initialized with players in React state');
      setIsInTransition(false);
      return;
    }
    
    // Check du transfert sessionStorage (nouveau)
    const gameTransfer = sessionStorage.getItem('game_transfer');
    if (gameTransfer) {
      try {
        const transferData = JSON.parse(gameTransfer);
        const age = Date.now() - transferData.transferTimestamp;
        
        if (age < 10000) { // 10 secondes max
          console.log('🔄 GamePage: Found fresh game transfer data');
          // Les données de transfert sont fraîches, attendre que l'état React se synchronise
          setIsInTransition(true);
          sessionStorage.removeItem('game_transfer');
          
          // Délai de grâce pour la synchronisation
          setTimeout(() => {
            if (!gameState.isInitialized) {
              console.log('🔄 GamePage: Transfer timeout, trying localStorage fallback');
              setLoadingAttempts(prev => prev + 1);
            }
          }, 1500);
          return;
        } else {
          console.log('🗑️ GamePage: Transfer data too old, removing');
          sessionStorage.removeItem('game_transfer');
        }
      } catch (error) {
        console.error('❌ GamePage: Invalid transfer data:', error);
        sessionStorage.removeItem('game_transfer');
      }
    }
    
    // Deuxième check: essayer de charger depuis localStorage avec retry
    console.log('🔄 GamePage: Game not fully initialized, trying to load existing game...');
    const loaded = gameState.loadExistingGame();
    console.log('📂 GamePage: Load existing game result:', loaded);
    
    if (!loaded) {
      if (loadingAttempts < 2) {
        console.log(`🔄 GamePage: Load failed, retrying in 1s (attempt ${loadingAttempts + 1}/3)`);
        setTimeout(() => {
          setLoadingAttempts(prev => prev + 1);
        }, 1000);
      } else {
        console.log('❌ GamePage: No existing game found after retries, redirecting to setup');
        // Délai plus long pour éviter les redirections en boucle
        setTimeout(() => navigate('/setup'), 2000);
      }
    } else {
      console.log('✅ GamePage: Existing game loaded successfully');
      setIsInTransition(false);
      setLoadingAttempts(0);
    }
  }, [gameState.isInitialized, gameState.players, gameState.loadExistingGame, navigate, loadingAttempts]);

  // Show loading if not initialized ou en transition
  if (!gameState.isInitialized || !gameState.players || gameState.players.length === 0 || isInTransition) {
    console.log('⏳ GamePage: Showing loading screen');
    console.log('🔍 GamePage: isInitialized:', gameState.isInitialized);
    console.log('🔍 GamePage: players exist:', !!gameState.players);
    console.log('🔍 GamePage: players length:', gameState.players?.length);
    console.log('🔍 GamePage: isInTransition:', isInTransition);
    console.log('🔍 GamePage: loadingAttempts:', loadingAttempts);
    
    return (
      <PageShell variant="game">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center lg-card lg-tint-primary-50 rounded-xl p-8 lg-elevation-02 animate-lg-reveal">
            <div className="animate-spin rounded-full border-b-2 mx-auto mb-4 h-8 w-8 border-white"></div>
            <p className="text-white">
              {isInTransition 
                ? 'Synchronisation de la partie...' 
                : loadingAttempts > 0 
                  ? `Tentative de chargement ${loadingAttempts + 1}/3...`
                  : 'Chargement de la partie...'
              }
            </p>
          </div>
        </div>
      </PageShell>
    );
  }

  const handleBackToSetup = () => {
    navigate('/setup');
  };

  return (
    <PageShell variant="game">
      <GamePageContainer
        players={gameState.players}
        roundHistory={gameState.roundHistory}
        showGameOver={gameState.showGameOver}
        showGameEndConfirmation={gameState.showGameEndConfirmation}
        scoreLimit={gameState.scoreLimit}
        gameMode="quick"
        currentTournament={null}
        tournamentProgress={null}
        showScoreForm={gameState.showScoreForm}
        onAddRound={gameState.handleAddRound}
        onUndoLastRound={gameState.handleUndoLastRound}
        onRequestEndGame={gameState.handleRequestEndGame}
        onConfirmEndGame={gameState.handleConfirmEndGame}
        onCancelEndGame={gameState.handleCancelEndGame}
        onContinueGame={gameState.handleContinueGame}
        onRestart={gameState.handleRestart}
        onOpenScoreForm={gameState.handleOpenScoreForm}
        onCloseScoreForm={gameState.handleCloseScoreForm}
        onBackToSetup={handleBackToSetup}
      />
    </PageShell>
  );
};

export default GamePage;
