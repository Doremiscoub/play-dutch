
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player, Game } from '@/types';
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
  const navigate = useNavigate();

  // Save games to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dutch_games', JSON.stringify(games));
  }, [games]);

  const handleStartGame = (playerNames: string[]) => {
    const newPlayers = playerNames.map(name => ({
      id: uuidv4(),
      name,
      totalScore: 0,
      rounds: []
    }));
    
    setPlayers(newPlayers);
    setGameState('playing');
    toast.success('La partie commence !');
  };

  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
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
    
    toast.success('Manche ajoutée !');
    
    // Check if game is over
    const gameOver = players.some(player => (player.totalScore + scores[players.indexOf(player)]) >= 100);
    
    if (gameOver) {
      // Save game to history
      const sortedPlayers = [...players].map((player, index) => ({
        ...player,
        totalScore: player.totalScore + scores[index],
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
    
    toast.success('Dernière manche annulée !');
  };

  const handleEndGame = () => {
    setGameState('setup');
    setPlayers([]);
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
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamePage;
