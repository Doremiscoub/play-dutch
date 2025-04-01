
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player, Game, PlayerStatistics } from '@/types';
import GameSetup from '@/components/GameSetup';
import ScoreBoard from '@/components/ScoreBoard';
import GamePodium from '@/components/GamePodium';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { calculatePlayerStats, updateAllPlayersStats, isGameOver } from '@/utils/playerStatsCalculator';

const GamePage: React.FC = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'completed'>(() => {
    const savedGame = localStorage.getItem('current_dutch_game');
    return savedGame ? 'playing' : 'setup';
  });
  
  const [players, setPlayers] = useState<Player[]>(() => {
    const savedGame = localStorage.getItem('current_dutch_game');
    return savedGame ? JSON.parse(savedGame).players : [];
  });
  
  const [games, setGames] = useLocalStorage<Game[]>('dutch_games', []);
  
  const [roundHistory, setRoundHistory] = useState<{ scores: number[], dutchPlayerId?: string }[]>(() => {
    const savedGame = localStorage.getItem('current_dutch_game');
    return savedGame ? JSON.parse(savedGame).roundHistory : [];
  });
  
  const [showGameEndConfirmation, setShowGameEndConfirmation] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const navigate = useNavigate();
  
  const playersWithStats = useMemo(() => {
    return updateAllPlayersStats(players);
  }, [players]);
  
  useEffect(() => {
    if (gameState === 'playing' && players.length > 0) {
      try {
        const currentGame = {
          players: playersWithStats,
          roundHistory,
          lastUpdated: new Date(),
          gameStartTime: gameStartTime || new Date()
        };
        localStorage.setItem('current_dutch_game', JSON.stringify(currentGame));
      } catch (error) {
        console.error("Erreur lors de la sauvegarde du jeu:", error);
        toast.error("Erreur lors de la sauvegarde de la partie");
      }
    }
  }, [gameState, playersWithStats, roundHistory, gameStartTime]);

  useEffect(() => {
    const savedGame = localStorage.getItem('current_dutch_game');
    if (savedGame) {
      const parsed = JSON.parse(savedGame);
      if (parsed.gameStartTime) {
        setGameStartTime(new Date(parsed.gameStartTime));
      }
    }
  }, []);

  const handleStartGame = (playerNames: string[]) => {
    if (!playerNames || playerNames.length === 0 || playerNames.some(name => !name.trim())) {
      toast.error('Veuillez entrer le nom de tous les joueurs');
      return;
    }
    
    const newPlayers = playerNames.map(name => ({
      id: uuidv4(),
      name: name.trim(),
      totalScore: 0,
      rounds: []
    }));
    
    setPlayers(newPlayers);
    setGameState('playing');
    setRoundHistory([]);
    setGameStartTime(new Date());
    
    localStorage.removeItem('current_dutch_game');
    
    toast.success('La partie commence !');
  };

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
      return prevPlayers.map((player, index) => {
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
    });
    
    if (soundEnabled) {
      new Audio('/sounds/card-sound.mp3').play().catch(err => console.error("Sound error:", err));
    }
    
    toast.success('Manche ajoutée !');
    
    const updatedPlayers = players.map((player, index) => ({
      ...player,
      totalScore: player.totalScore + scores[index]
    }));
    
    if (isGameOver(updatedPlayers)) {
      finishGame(scores, dutchPlayerId);
    }
  }, [players, setGames, soundEnabled, gameStartTime]);
  
  const finishGame = useCallback((finalScores?: number[], dutchPlayerId?: string) => {
    const updatedPlayers = finalScores 
      ? players.map((player, index) => ({
          ...player,
          totalScore: player.totalScore + finalScores[index],
          isDutch: player.id === dutchPlayerId
        }))
      : players;
    
    const sortedPlayers = [...updatedPlayers].sort((a, b) => a.totalScore - b.totalScore);
    const winner = sortedPlayers[0].name;
    
    const gameDuration = gameStartTime ? getGameDuration(gameStartTime) : '';
    
    const newGame: Game = {
      id: uuidv4(),
      date: new Date(),
      rounds: players[0].rounds.length + (finalScores ? 1 : 0),
      players: sortedPlayers.map(player => ({
        name: player.name,
        score: player.totalScore,
        isDutch: finalScores 
          ? player.id === dutchPlayerId 
          : player.rounds.some(r => r.isDutch)
      })),
      winner,
      duration: gameDuration
    } as Game;
    
    setGames(prev => [...prev, newGame]);
    
    setGameState('completed');
    
    if (soundEnabled) {
      new Audio('/sounds/win-sound.mp3').play().catch(err => console.error("Sound error:", err));
    }
  }, [players, setGames, soundEnabled, gameStartTime]);
  
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
  
  const handleUndoLastRound = useCallback(() => {
    if (!players || players.length === 0 || !players[0].rounds || players[0].rounds.length === 0) {
      toast.error('Pas de manche à annuler !');
      return;
    }
    
    setRoundHistory(prev => prev.slice(0, -1));
    
    setPlayers(prevPlayers => {
      return prevPlayers.map(player => {
        if (!player.rounds || player.rounds.length === 0) return player;
        
        const lastRound = player.rounds[player.rounds.length - 1];
        const newTotalScore = player.totalScore - lastRound.score;
        
        return {
          ...player,
          rounds: player.rounds.slice(0, -1),
          totalScore: newTotalScore
        };
      });
    });
    
    if (soundEnabled) {
      new Audio('/sounds/undo-sound.mp3').play().catch(err => console.error("Sound error:", err));
    }
    
    toast.success('Dernière manche annulée !');
  }, [players, soundEnabled]);

  const handleEndGame = useCallback(() => {
    setShowGameEndConfirmation(true);
  }, []);

  const handleConfirmEndGame = useCallback(() => {
    if (players.length > 0 && players[0].rounds && players[0].rounds.length > 0) {
      finishGame();
    } else {
      setGameState('setup');
      setPlayers([]);
      setRoundHistory([]);
      localStorage.removeItem('current_dutch_game');
    }
    
    setShowGameEndConfirmation(false);
  }, [players, finishGame]);

  const handleCancelEndGame = useCallback(() => {
    setShowGameEndConfirmation(false);
  }, []);

  const handleNewGame = useCallback(() => {
    localStorage.removeItem('current_dutch_game');
    
    setGameState('setup');
    setPlayers([]);
    setRoundHistory([]);
  }, []);

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
            setGameState('setup');
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'analyse de la partie sauvegardée:", error);
        localStorage.removeItem('current_dutch_game');
      }
    }
  }, []);

  const gameDuration = gameStartTime ? getGameDuration(gameStartTime) : '';

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {gameState === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GameSetup onStartGame={handleStartGame} />
          </motion.div>
        )}
        
        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScoreBoard 
              players={playersWithStats}
              onAddRound={handleAddRound}
              onEndGame={handleEndGame}
              onUndoLastRound={handleUndoLastRound}
              roundHistory={roundHistory}
              showGameEndConfirmation={showGameEndConfirmation}
              onConfirmEndGame={handleConfirmEndGame}
              onCancelEndGame={handleCancelEndGame}
              isMultiplayer={false}
            />
          </motion.div>
        )}
        
        {gameState === 'completed' && (
          <motion.div
            key="completed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GamePodium 
              players={playersWithStats}
              onNewGame={handleNewGame}
              gameDuration={gameDuration}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamePage;
