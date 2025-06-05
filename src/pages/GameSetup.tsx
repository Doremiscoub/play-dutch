
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedLocalGameSetup from '@/components/game-setup/EnhancedLocalGameSetup';
import { useGameState } from '@/hooks/useGameState';
import { toast } from 'sonner';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import PageShell from '@/components/layout/PageShell';
import { DESIGN_COLORS, DESIGN_SPACING } from '@/design/tokens';

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
    // Vérifier s'il y a une partie active
    const activeGame = localStorage.getItem(STORAGE_KEYS.CURRENT_GAME);
    const gameActive = localStorage.getItem(STORAGE_KEYS.GAME_ACTIVE);
    
    if (activeGame && gameActive === 'true') {
      // Retourner à la partie active
      navigate('/game');
    } else {
      // Retourner à l'accueil
      navigate('/');
    }
  };

  return (
    <PageShell variant="default">
      {/* Header avec navigation */}
      <header 
        className="absolute z-50 flex justify-between items-center"
        style={{ 
          top: DESIGN_SPACING[4], 
          left: DESIGN_SPACING[4], 
          right: DESIGN_SPACING[4] 
        }}
      >
        <Button
          variant="dutch-glass"
          size="icon"
          onClick={handleBack}
          className="rounded-full"
          aria-label="Retour"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Button
          variant="dutch-glass"
          size="icon"
          onClick={() => navigate('/settings')}
          className="rounded-full"
          aria-label="Paramètres"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      {/* Contenu principal centré */}
      <div 
        className="flex items-center justify-center min-h-screen"
        style={{ 
          padding: `${DESIGN_SPACING[20]} ${DESIGN_SPACING[4]}`
        }}
      >
        <div className="w-full max-w-2xl">
          <EnhancedLocalGameSetup onStartGame={handleStartGame} />
        </div>
      </div>
    </PageShell>
  );
};

export default GameSetup;
