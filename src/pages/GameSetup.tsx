
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedLocalGameSetup from '@/components/game-setup/EnhancedLocalGameSetup';
import { useGameInitialization } from '@/hooks/useGameInitialization';
import { toast } from 'sonner';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();
  const { createNewGame } = useGameInitialization();

  useSEO({
    title: 'Configuration de partie - Dutch Card Game',
    description: 'Configurez votre partie de Dutch en ajoutant les joueurs et en choisissant les paramètres de jeu.',
    keywords: 'configuration, setup, joueurs, partie dutch'
  });

  const handleStartGame = async (playerNames: string[]) => {
    try {
      const success = await createNewGame(playerNames);
      if (success) {
        navigate('/game');
      }
    } catch (error) {
      console.error('Failed to start game:', error);
      toast.error('Erreur lors de la création de la partie');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header avec navigation */}
      <header className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80 rounded-full"
          aria-label="Retour à l'accueil"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/settings')}
          className="bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80 rounded-full"
          aria-label="Paramètres"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      {/* Contenu principal centré */}
      <div className="flex items-center justify-center min-h-screen px-4 py-20">
        <div className="w-full max-w-2xl">
          <EnhancedLocalGameSetup onStartGame={handleStartGame} />
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
