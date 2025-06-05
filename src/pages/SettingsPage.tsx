
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameSettings from '@/components/GameSettings';
import UnifiedTopBar from '@/components/scoreboard/UnifiedTopBar';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if we have an active game
    const activeGame = localStorage.getItem('current_dutch_game');
    const playerSetup = localStorage.getItem('dutch_player_setup');
    
    if (activeGame || playerSetup) {
      // Return to active game
      navigate('/game');
    } else {
      // Return to home
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Unified Top Bar */}
      <UnifiedTopBar 
        title="Paramètres"
        showBackButton
        onBack={handleBack}
        showSettings={false}
        showRules={false}
      />

      <div className="p-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Settings Content */}
          <GameSettings />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
