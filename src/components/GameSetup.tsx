
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedPageLayout } from './ui/unified-page-layout';
import { UnifiedCard } from './ui/unified-card';
import LocalGameSetupContainer from './game-setup/LocalGameSetupContainer';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = (playerNames: string[]) => {
    // Save player names to localStorage before navigating
    localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
    navigate('/game');
  };

  return (
    <UnifiedPageLayout
      title="Nouvelle Partie"
      showBackButton
      onBack={() => navigate('/')}
    >
      <UnifiedCard variant="light" padding="lg">
        <LocalGameSetupContainer onStartGame={handleStartGame} />
      </UnifiedCard>
    </UnifiedPageLayout>
  );
};

export default GameSetup;
