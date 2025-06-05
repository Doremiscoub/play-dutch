
import React from 'react';
import UnifiedGameSetup from './game-setup/UnifiedGameSetup';

interface GameSetupProps {
  onStartGame: (playerNames: string[], isMultiplayer?: boolean) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  return <UnifiedGameSetup onStartGame={onStartGame} />;
};

export default GameSetup;
