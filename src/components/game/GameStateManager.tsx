
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useGameState from '@/hooks/useGameState';
import { useTournamentState } from '@/hooks/useTournamentState';

export const useGameStateManager = () => {
  const navigate = useNavigate();
  const [showScoreForm, setShowScoreForm] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<'quick' | 'tournament'>('quick');
  const [navigationBlocked, setNavigationBlocked] = useState<boolean>(false);

  console.log('GameStateManager: Hook initialized');

  const gameState = useGameState();
  
  const {
    currentTournament,
    createTournament,
    startNextMatch,
    getCurrentMatch,
    getTournamentProgress
  } = useTournamentState();

  // Protection contre les navigations non désirées
  useEffect(() => {
    console.log('GameStateManager: Setting up navigation protection');
    
    sessionStorage.setItem('dutch_in_game', 'true');
    setNavigationBlocked(true);
    
    const timer = setTimeout(() => {
      setNavigationBlocked(false);
      console.log('GameStateManager: Navigation protection lifted');
    }, 2000);

    return () => {
      clearTimeout(timer);
      sessionStorage.removeItem('dutch_in_game');
    };
  }, []);

  // Initialize game configuration
  useEffect(() => {
    console.log('GameStateManager: Configuration effect running');
    
    const shouldReturnToGame = localStorage.getItem('dutch_return_to_game');
    if (shouldReturnToGame) {
      console.log('GameStateManager: Removing return flag');
      localStorage.removeItem('dutch_return_to_game');
    }

    const storedGameMode = localStorage.getItem('dutch_game_mode') as 'quick' | 'tournament' || 'quick';
    console.log('GameStateManager: Setting game mode:', storedGameMode);
    setGameMode(storedGameMode);

    if (storedGameMode === 'tournament') {
      const tournamentConfig = JSON.parse(localStorage.getItem('dutch_tournament_config') || '{}');
      
      if (!currentTournament && tournamentConfig.name) {
        console.log('GameStateManager: Creating tournament from config');
        createTournament(tournamentConfig.name, tournamentConfig.playerNames, tournamentConfig.rounds);
      }
      
      if (currentTournament && !getCurrentMatch()) {
        console.log('GameStateManager: Starting next tournament match');
        startNextMatch();
      }
    }
  }, [currentTournament, createTournament, getCurrentMatch, startNextMatch]);

  // Surveillance de l'état du jeu
  useEffect(() => {
    if (gameState.isInitialized && gameState.players && gameState.players.length > 0) {
      console.log('GameStateManager: Game properly loaded with', gameState.players.length, 'players');
      
      const heartbeat = setInterval(() => {
        const gameActive = localStorage.getItem('dutch_game_active');
        if (gameActive !== 'true') {
          console.log('GameStateManager: Restoring game active flag');
          localStorage.setItem('dutch_game_active', 'true');
        }
      }, 5000);

      return () => clearInterval(heartbeat);
    }
  }, [gameState.isInitialized, gameState.players]);

  const handleGameInitialization = useCallback(async (): Promise<boolean> => {
    console.log('GameStateManager: handleGameInitialization called');
    
    if (navigationBlocked) {
      console.log('GameStateManager: Navigation blocked, preventing initialization redirect');
      return false;
    }
    
    try {
      const success = await gameState.createNewGame();
      console.log('GameStateManager: createNewGame result:', success);
      
      if (!success) {
        console.log('GameStateManager: Initialization failed, but not redirecting automatically');
        return false;
      }
      return true;
    } catch (error) {
      console.error('GameStateManager: Game initialization error:', error);
      return false;
    }
  }, [gameState.createNewGame, navigationBlocked]);

  const handleBackToSetup = useCallback(() => {
    console.log('GameStateManager: Manual back to setup');
    localStorage.removeItem('dutch_game_mode');
    localStorage.removeItem('dutch_tournament_config');
    localStorage.removeItem('dutch_game_active');
    navigate('/game/setup');
  }, [navigate]);

  const openScoreForm = useCallback(() => {
    console.log('GameStateManager: Opening score form');
    setShowScoreForm(true);
  }, []);
  
  const closeScoreForm = useCallback(() => {
    console.log('GameStateManager: Closing score form');
    setShowScoreForm(false);
  }, []);

  const tournamentProgress = useMemo(() => {
    return currentTournament ? getTournamentProgress() : null;
  }, [currentTournament, getTournamentProgress]);

  return {
    ...gameState,
    gameMode,
    showScoreForm,
    currentTournament,
    tournamentProgress,
    handleGameInitialization,
    handleBackToSetup,
    openScoreForm,
    closeScoreForm
  };
};
