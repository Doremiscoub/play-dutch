
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameSetupGlassmorphic from './GameSetupGlassmorphic';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = (playerNames: string[]) => {
    // Save player names to localStorage before navigating
    localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
    navigate('/game');
  };

  return <GameSetupGlassmorphic onStartGame={handleStartGame} />;
};

export default GameSetup;
