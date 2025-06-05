
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnifiedGameSetup from './game-setup/UnifiedGameSetup';
import PageHeaderWithNav from './ui/page-header-with-nav';

interface GameSetupProps {
  onStartGame: (playerNames: string[], isMultiplayer?: boolean) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <PageHeaderWithNav 
          title="Configuration de la partie"
          showBackButton={true}
          showHomeButton={true}
          backLabel="Accueil"
          onBack={handleBackToHome}
        />
        
        <UnifiedGameSetup onStartGame={onStartGame} />
      </div>
    </div>
  );
};

export default GameSetup;
