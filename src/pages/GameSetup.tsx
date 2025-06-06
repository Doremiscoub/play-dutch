
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import EnhancedLocalGameSetup from '@/components/game-setup/EnhancedLocalGameSetup';
import { useGameState } from '@/hooks/useGameState';
import { toast } from 'sonner';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import PageShell from '@/components/layout/PageShell';
import UnifiedTopBar from '@/components/scoreboard/UnifiedTopBar';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();
  const { createNewGame } = useGameState();

  useSEO({
    title: 'Configuration de partie - Dutch Card Game',
    description: 'Configurez votre partie de Dutch en ajoutant les joueurs et en choisissant les paramètres de jeu.',
    keywords: 'configuration, setup, joueurs, partie dutch'
  });

  const handleStartGame = async (playerNames: string[]) => {
    try {
      console.log('GameSetup: Starting game with players:', playerNames);
      const success = await createNewGame(playerNames);
      if (success) {
        console.log('GameSetup: Game created successfully, navigating to /game');
        navigate('/game');
      } else {
        toast.error('Erreur lors de la création de la partie');
      }
    } catch (error) {
      console.error('GameSetup: Failed to start game:', error);
      toast.error('Erreur lors de la création de la partie');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <PageShell variant="default">
      <UnifiedTopBar 
        title="Créer une partie"
        showBackButton
        onBack={handleBack}
        showSettings={true}
      />

      {/* Contenu principal */}
      <div className="p-6 pt-8">
        <div className="w-full max-w-2xl mx-auto">
          <EnhancedLocalGameSetup onStartGame={handleStartGame} />
        </div>
      </div>
    </PageShell>
  );
};

export default GameSetup;
