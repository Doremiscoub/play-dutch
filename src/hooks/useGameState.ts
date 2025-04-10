
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player, Game } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { useLocalStorage } from './use-local-storage';
import { updateAllPlayersStats, isGameOver } from '@/utils/playerStatsCalculator';

export const useGameState = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [roundHistory, setRoundHistory] = useState<{ scores: number[], dutchPlayerId?: string }[]>([]);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [showGameEndConfirmation, setShowGameEndConfirmation] = useState<boolean>(false);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const [games, setGames] = useLocalStorage<Game[]>('dutch_games', []);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  
  // Initialize game from localStorage
  useEffect(() => {
    const initializeGame = () => {
      const savedGame = localStorage.getItem('current_dutch_game');
      
      if (savedGame) {
        try {
          const parsedGame = JSON.parse(savedGame);
          setPlayers(parsedGame.players);
          setRoundHistory(parsedGame.roundHistory || []);
          setScoreLimit(parsedGame.scoreLimit || 100);
          
          if (parsedGame.gameStartTime) {
            setGameStartTime(new Date(parsedGame.gameStartTime));
          }
          
          if (parsedGame.isGameOver) {
            setShowGameOver(true);
          }
        } catch (error) {
          console.error('Erreur lors du chargement de la partie :', error);
          createNewGame();
        }
      } else {
        createNewGame();
      }
    };
    
    initializeGame();
  }, []);
  
  // Save game state to localStorage when it changes
  useEffect(() => {
    if (players.length > 0) {
      const gameState = {
        players,
        roundHistory,
        isGameOver: showGameOver,
        scoreLimit,
        gameStartTime,
        lastUpdated: new Date()
      };
      
      localStorage.setItem('current_dutch_game', JSON.stringify(gameState));
    }
  }, [players, roundHistory, showGameOver, scoreLimit, gameStartTime]);
  
  // Create a new game with player names from setup
  const createNewGame = useCallback(() => {
    const playerSetup = localStorage.getItem('dutch_player_setup');
    
    if (!playerSetup) {
      toast.error('Aucune configuration de joueurs trouvée');
      navigate('/game/setup');
      return;
    }
    
    try {
      const playerNames = JSON.parse(playerSetup);
      
      if (!Array.isArray(playerNames) || playerNames.length < 2) {
        throw new Error('Configuration de joueurs invalide');
      }
      
      const newPlayers: Player[] = playerNames.map(name => ({
        id: uuidv4(),
        name,
        totalScore: 0,
        rounds: []
      }));
      
      setPlayers(newPlayers);
      setRoundHistory([]);
      setShowGameOver(false);
      setGameStartTime(new Date());
    } catch (error) {
      console.error('Erreur lors de la création de la partie :', error);
      toast.error('Erreur lors de la création de la partie');
      navigate('/game/setup');
    }
  }, [navigate]);

  // Calculate game duration
  const getGameDuration = (startTime: Date): string => {
    const endTime = new Date();
    const diffMs = endTime.getTime() - startTime.getTime();
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const remainingMins = diffMins % 60;
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${remainingMins}min`;
    } else {
      return `${diffMins} minutes`;
    }
  };
  
  // Save game to history
  const saveGameToHistory = useCallback(() => {
    try {
      const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
      const winner = sortedPlayers[0].name;
      const gameDuration = gameStartTime ? getGameDuration(gameStartTime) : '';
      
      const game: Game = {
        id: uuidv4(),
        date: new Date(),
        rounds: players[0]?.rounds.length || 0,
        players: players.map(p => ({ 
          name: p.name, 
          score: p.totalScore, 
          isDutch: p.rounds.some(r => r.isDutch) 
        })),
        winner,
        duration: gameDuration
      };
      
      setGames(prev => [...prev, game]);
      toast.success('Partie sauvegardée dans l\'historique');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la partie :', error);
      toast.error('Erreur lors de la sauvegarde de la partie');
    }
  }, [players, setGames, gameStartTime]);
  
  // Add a new round
  const handleAddRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    if (!players || players.length === 0) {
      toast.error('Erreur: aucun joueur trouvé');
      return;
    }
    
    if (!scores || scores.length !== players.length) {
      toast.error('Erreur: nombre de scores incorrect');
      return;
    }
    
    if (scores.some(score => isNaN(score))) {
      toast.error('Erreur: les scores doivent être des nombres valides');
      return;
    }
    
    if (dutchPlayerId && scores.every(score => score === 0)) {
      toast.error('Un Dutch doit avoir au moins un joueur avec des points');
      return;
    }
    
    setRoundHistory(prev => [...prev, { scores, dutchPlayerId }]);
    
    setPlayers(prevPlayers => {
      const updatedPlayers = prevPlayers.map((player, index) => {
        const isDutch = player.id === dutchPlayerId;
        const newRound = { 
          score: scores[index],
          isDutch 
        };
        const newTotalScore = player.totalScore + scores[index];
        
        return {
          ...player,
          rounds: [...player.rounds, newRound],
          totalScore: newTotalScore
        };
      });
      
      // Check if game is over
      const playersWithStats = updateAllPlayersStats(updatedPlayers);
      if (isGameOver(playersWithStats, scoreLimit)) {
        setTimeout(() => {
          setShowGameOver(true);
        }, 500);
      }
      
      return updateAllPlayersStats(updatedPlayers);
    });
    
    if (soundEnabled) {
      new Audio('/sounds/card-sound.mp3').play().catch(err => console.error("Sound error:", err));
    }
    
    toast.success('Manche ajoutée !');
  }, [players, scoreLimit, soundEnabled]);
  
  // Undo the last round
  const handleUndoLastRound = useCallback(() => {
    if (!players || players.length === 0 || !players[0].rounds || players[0].rounds.length === 0) {
      toast.error('Pas de manche à annuler !');
      return;
    }
    
    setRoundHistory(prev => prev.slice(0, -1));
    
    setPlayers(prevPlayers => {
      const updatedPlayers = prevPlayers.map(player => {
        if (!player.rounds || player.rounds.length === 0) return player;
        
        const lastRound = player.rounds[player.rounds.length - 1];
        const newTotalScore = player.totalScore - lastRound.score;
        
        return {
          ...player,
          rounds: player.rounds.slice(0, -1),
          totalScore: newTotalScore
        };
      });
      
      return updateAllPlayersStats(updatedPlayers);
    });
    
    if (soundEnabled) {
      new Audio('/sounds/undo-sound.mp3').play().catch(err => console.error("Sound error:", err));
    }
    
    // If game over screen was shown, hide it
    if (showGameOver) {
      setShowGameOver(false);
    }
    
    toast.success('Dernière manche annulée !');
  }, [players, soundEnabled, showGameOver]);
  
  // Request to end the game
  const handleRequestEndGame = useCallback(() => {
    setShowGameEndConfirmation(true);
  }, []);
  
  // Confirm ending the game
  const handleConfirmEndGame = useCallback(() => {
    saveGameToHistory();
    setShowGameOver(true);
    setShowGameEndConfirmation(false);
  }, [saveGameToHistory]);
  
  // Cancel ending the game
  const handleCancelEndGame = useCallback(() => {
    setShowGameEndConfirmation(false);
  }, []);
  
  // Continue game with a new score limit
  const handleContinueGame = useCallback((newLimit: number) => {
    setScoreLimit(newLimit);
    setShowGameOver(false);
  }, []);
  
  // Restart with a new game
  const handleRestart = useCallback(() => {
    localStorage.removeItem('current_dutch_game');
    navigate('/game/setup');
  }, [navigate]);
  
  return {
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
    handleRestart
  };
};
