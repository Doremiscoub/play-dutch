
import React, { useState, useEffect } from 'react';
import GameHistory from '@/components/GameHistory';
import { Game } from '@/types';
import { useNavigate } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedGames = localStorage.getItem('dutch_games');
    if (savedGames) {
      try {
        // Parse JSON and convert date strings back to Date objects
        const parsedGames = JSON.parse(savedGames).map((game: any) => ({
          ...game,
          date: new Date(game.date)
        }));
        setGames(parsedGames);
      } catch (error) {
        console.error('Error loading games history:', error);
        setGames([]);
      }
    }
  }, []);

  return (
    <GameHistory 
      games={games} 
      onBack={() => navigate('/')} 
    />
  );
};

export default HistoryPage;
