
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

  // Load existing game - logique simplifiée et unifiée
  useEffect(() => {
    console.log('🎮 GAME_PAGE: Initialization check, attempt:', loadingAttempts);
    console.log('🔍 GAME_PAGE: isInitialized:', gameState.isInitialized);
    console.log('🔍 GAME_PAGE: players count:', gameState.players?.length);
    
    // Si déjà initialisé avec des joueurs, on est bon
    if (gameState.isInitialized && gameState.players && gameState.players.length >= 2) {
      console.log('✅ GAME_PAGE: Game ready with players');
      setIsInTransition(false);
      setLoadingAttempts(0);
      return;
    }
    
    // VÉRIFICATION DIRECTE des données sauvegardées
    const savedData = localStorage.getItem('current_dutch_game');
    console.log('🔍 GAME_PAGE: Checking localStorage:', !!savedData);
    
    if (savedData) {
      try {
        const gameData = JSON.parse(savedData);
        console.log('📊 GAME_PAGE: Found saved game with', gameData.players?.length, 'players');
        
        if (gameData.players && gameData.players.length >= 2) {
          console.log('🔄 GAME_PAGE: Loading saved game...');
          const loaded = gameState.loadExistingGame();
          
          if (loaded) {
            console.log('✅ GAME_PAGE: Game loaded successfully');
            setIsInTransition(false);
            setLoadingAttempts(0);
            return;
          } else {
            console.warn('⚠️ GAME_PAGE: Load function failed despite data presence');
          }
        } else {
          console.warn('⚠️ GAME_PAGE: Invalid player data in saved game');
          localStorage.removeItem('current_dutch_game');
        }
      } catch (error) {
        console.error('❌ GAME_PAGE: Corrupted save data:', error);
        localStorage.removeItem('current_dutch_game');
      }
    }
    
    // Pas de données valides trouvées
    if (loadingAttempts < 1) {
      console.log('🔄 GAME_PAGE: No valid data, retrying once...');
      setLoadingAttempts(1);
      setIsInTransition(true);
      
      setTimeout(() => {
        setIsInTransition(false);
        setLoadingAttempts(2);
      }, 1000);
    } else {
      console.log('❌ GAME_PAGE: No game found, redirecting to setup');
      navigate('/setup', { replace: true });
    }
  }, [gameState.isInitialized, gameState.players, gameState.loadExistingGame, navigate, loadingAttempts]);

  // Show loading ou error states
  if (!gameState.isInitialized || !gameState.players || gameState.players.length === 0 || isInTransition) {
    console.log('⏳ GAME_PAGE: Showing loading/error state');
    console.log('🔍 GAME_PAGE: isInitialized:', gameState.isInitialized);
    console.log('🔍 GAME_PAGE: players count:', gameState.players?.length);
    console.log('🔍 GAME_PAGE: isInTransition:', isInTransition);
    console.log('🔍 GAME_PAGE: loadingAttempts:', loadingAttempts);
    
    const showError = loadingAttempts >= 2 && !isInTransition;
    
    return (
      <PageShell variant="game">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center lg-card lg-tint-primary-50 rounded-xl p-8 lg-elevation-02 animate-lg-reveal">
            {showError ? (
              <>
                <div className="text-red-400 text-xl mb-4">⚠️</div>
                <p className="text-white mb-4">Aucune partie en cours trouvée</p>
                <button 
                  onClick={() => navigate('/setup')}
                  className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
                >
                  Créer une nouvelle partie
                </button>
              </>
            ) : (
              <>
                <div className="animate-spin rounded-full border-b-2 mx-auto mb-4 h-8 w-8 border-white"></div>
                <p className="text-white">
                  {isInTransition 
                    ? 'Chargement de la partie...' 
                    : 'Recherche de partie en cours...'
                  }
                </p>
              </>
            )}
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
