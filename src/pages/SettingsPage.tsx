
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameSettings from '@/components/GameSettings';
import UnifiedTopBar from '@/components/scoreboard/UnifiedTopBar';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import PageShell from '@/components/layout/PageShell';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Vérifier d'abord s'il y a une partie active
    const activeGame = localStorage.getItem(STORAGE_KEYS.CURRENT_GAME);
    const gameActive = localStorage.getItem(STORAGE_KEYS.GAME_ACTIVE);
    
    console.log('SettingsPage: Navigation check', { activeGame: !!activeGame, gameActive });
    
    if (activeGame && gameActive === 'true') {
      // Retourner à la partie active
      console.log('SettingsPage: Returning to active game');
      navigate('/game');
    } else {
      // Vérifier s'il y a une configuration de joueurs en cours
      const playerSetup = localStorage.getItem(STORAGE_KEYS.PLAYER_SETUP);
      if (playerSetup) {
        console.log('SettingsPage: Returning to game setup');
        navigate('/setup');
      } else {
        // Retourner à l'accueil
        console.log('SettingsPage: Returning to home');
        navigate('/');
      }
    }
  };

  return (
    <PageShell variant="minimal">
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
          {/* Breadcrumb pour indiquer où on se trouve */}
          <div className="mb-6 text-sm text-gray-600">
            <span className="opacity-70">Dutch</span>
            <span className="mx-2">›</span>
            <span>Paramètres</span>
          </div>
          
          {/* Settings Content */}
          <GameSettings />
        </div>
      </div>
    </PageShell>
  );
};

export default SettingsPage;
