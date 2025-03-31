import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player, Game, PlayerStatistics } from '@/types';
import GameSetup from '@/components/GameSetup';
import ScoreBoard from '@/components/ScoreBoard';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const GamePage: React.FC = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>(() => {
    const savedGames = localStorage.getItem('dutch_games');
    return savedGames ? JSON.parse(savedGames) : [];
  });
  const [roundHistory, setRoundHistory] = useState<{ scores: number[], dutchPlayerId?: string }[]>([]);
  const navigate = useNavigate();

  // Save games to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dutch_games', JSON.stringify(games));
  }, [games]);

  // Calculate player statistics
  const calculatePlayerStats = useCallback((player: Player): PlayerStatistics => {
    const rounds = player.rounds;
    if (rounds.length === 0) {
      return {
        bestRound: null,
        dutchCount: 0,
        averageScore: 0,
        worstRound: null,
        improvementRate: 0,
        consistencyScore: 0,
        winStreak: 0
      };
    }

    const scores = rounds.map(r => r.score);
    const dutchCount = rounds.filter(r => r.isDutch).length;
    const nonZeroScores = scores.filter(s => s > 0);
    
    // Calculate improvement rate (compare last 3 rounds vs first 3)
    let improvementRate = 0;
    if (rounds.length >= 6) {
      const firstThree = scores.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
      const lastThree = scores.slice(-3).reduce((a, b) => a + b, 0) / 3;
      improvementRate = lastThree - firstThree;
    }

    // Calculate consistency (standard deviation)
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / scores.length;
    const consistencyScore = Math.sqrt(variance);

    // Calculate win streak (consecutive rounds with better scores than others)
    let winStreak = 0;
    let currentWinStreak = 0;
    for (let i = 0; i < rounds.length; i++) {
      // If this player's score is the best in this round among all players
      if (players.every(p => p.id === player.id || (p.rounds[i] && rounds[i].score <= p.rounds[i].score))) {
        currentWinStreak++;
        winStreak = Math.max(winStreak, currentWinStreak);
      } else {
        currentWinStreak = 0;
      }
    }

    return {
      bestRound: nonZeroScores.length > 0 ? Math.min(...nonZeroScores) : null,
      dutchCount,
      averageScore: avg,
      worstRound: scores.length > 0 ? Math.max(...scores) : null,
      improvementRate,
      consistencyScore,
      winStreak
    };
  }, [players]);

  const updatePlayerStats = useCallback(() => {
    setPlayers(prevPlayers => {
      return prevPlayers.map(player => ({
        ...player,
        stats: calculatePlayerStats(player)
      }));
    });
  }, [calculatePlayerStats]);

  // Update stats whenever rounds change
  useEffect(() => {
    if (players.length > 0 && players[0].rounds.length > 0) {
      updatePlayerStats();
    }
  }, [players, updatePlayerStats]);

  const handleStartGame = (playerNames: string[]) => {
    const newPlayers = playerNames.map(name => ({
      id: uuidv4(),
      name,
      totalScore: 0,
      rounds: []
    }));
    
    setPlayers(newPlayers);
    setGameState('playing');
    setRoundHistory([]);
    toast.success('La partie commence !');
  };

  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
    // Store the round info for potential undo
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
    
    // Play round sound
    if (window.localStorage.getItem('dutch_sound_enabled') !== 'false') {
      new Audio('/sounds/card-sound.mp3').play().catch(err => console.error("Sound error:", err));
    }
    
    toast.success('Manche ajoutée !');
    
    // Check if game is over
    const gameOver = players.some(player => (player.totalScore + scores[players.indexOf(player)]) >= 100);
    
    if (gameOver) {
      finishGame(scores, dutchPlayerId);
    }
  };
  
  const finishGame = (finalScores: number[], dutchPlayerId?: string) => {
    // Save game to history
    const sortedPlayers = [...players].map((player, index) => ({
      ...player,
      totalScore: player.totalScore + finalScores[index],
      isDutch: player.id === dutchPlayerId
    })).sort((a, b) => a.totalScore - b.totalScore);
    
    const winner = sortedPlayers[0].name;
    
    const newGame: Game = {
      id: uuidv4(),
      date: new Date(),
      rounds: players[0].rounds.length + 1,
      players: sortedPlayers.map(player => ({
        name: player.name,
        score: player.totalScore,
        isDutch: player.id === dutchPlayerId
      })),
      winner
    };
    
    setGames(prev => [...prev, newGame]);
    toast.success(`Partie terminée ! ${winner} gagne !`);
    
    // Launch confetti for the winner
    launchConfetti();
    
    // Play winning sound
    if (window.localStorage.getItem('dutch_sound_enabled') !== 'false') {
      new Audio('/sounds/win-sound.mp3').play().catch(err => console.error("Sound error:", err));
    }
  };
  
  const launchConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall down, start from the top
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#1EAEDB', '#F97316', '#8B5CF6'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#1EAEDB', '#F97316', '#8B5CF6'],
      });
    }, 250);
  };
  
  const handleUndoLastRound = () => {
    if (players.length === 0 || players[0].rounds.length === 0) {
      toast.error('Pas de manche à annuler !');
      return;
    }
    
    // Remove the last round from history
    setRoundHistory(prev => prev.slice(0, -1));
    
    setPlayers(prevPlayers => {
      return prevPlayers.map(player => {
        if (player.rounds.length === 0) return player;
        
        const lastRound = player.rounds[player.rounds.length - 1];
        const newTotalScore = player.totalScore - lastRound.score;
        
        return {
          ...player,
          rounds: player.rounds.slice(0, -1),
          totalScore: newTotalScore
        };
      });
    });
    
    // Play undo sound
    if (window.localStorage.getItem('dutch_sound_enabled') !== 'false') {
      new Audio('/sounds/undo-sound.mp3').play().catch(err => console.error("Sound error:", err));
    }
    
    toast.success('Dernière manche annulée !');
  };

  const handleEndGame = () => {
    setGameState('setup');
    setPlayers([]);
    setRoundHistory([]);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {gameState === 'setup' ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GameSetup onStartGame={handleStartGame} />
          </motion.div>
        ) : (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScoreBoard 
              players={players}
              onAddRound={handleAddRound}
              onEndGame={handleEndGame}
              onUndoLastRound={handleUndoLastRound}
              roundHistory={roundHistory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamePage;
