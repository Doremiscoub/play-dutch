
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player, Game } from '@/types';
import GameSetup from '@/components/GameSetup';
import ScoreBoard from '@/components/ScoreBoard';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

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

  const handleAddRound = (scores: number[]) => {
    setPlayers(prevPlayers => {
      return prevPlayers.map((player, index) => {
        const newRound = { score: scores[index] };
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
        totalScore: player.totalScore + scores[index]
      })).sort((a, b) => a.totalScore - b.totalScore);
      
      const newGame: Game = {
        id: uuidv4(),
        date: new Date(),
        rounds: players[0].rounds.length + 1,
        players: sortedPlayers.map(player => ({
          name: player.name,
          score: player.totalScore
        }))
      };
      
      setGames(prev => [...prev, newGame]);
      toast.success('Partie terminée !');
    }
  };

  const handleEndGame = () => {
    setGameState('setup');
    setPlayers([]);
  };

  return (
    <div className="min-h-screen">
      {gameState === 'setup' ? (
        <GameSetup onStartGame={handleStartGame} />
      ) : (
        <ScoreBoard 
          players={players}
          onAddRound={handleAddRound}
          onEndGame={handleEndGame}
        />
      )}
    </div>
  );
};

export default GamePage;
