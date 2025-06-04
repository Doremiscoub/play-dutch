
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GameButton } from '@/components/ui/game-button';
import { GameHeader, GameText } from '@/components/ui/game-typography';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';
import UnifiedGameSetup from './game-setup/UnifiedGameSetup';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = (playerNames: string[]) => {
    localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
    navigate('/game');
  };

  return (
    <UnifiedPageLayout
      backgroundVariant="default"
      withAnimation={true}
      className="min-h-screen"
    >
      {/* Header with Back button */}
      <div className="absolute top-4 left-4 z-50">
        <GameButton
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          aria-label="Retour à l'accueil"
        >
          <ArrowLeft className="h-5 w-5" />
        </GameButton>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 pt-20 max-w-4xl">
        <div className="text-center mb-8">
          <GameHeader gameColor="gameGradient" effect="shadow" className="mb-4">
            CRÉER UNE PARTIE
          </GameHeader>
          
          <GameText variant="adventure" gameColor="primary" className="text-lg mb-6">
            Configurez votre partie de Dutch
          </GameText>
          
          {/* Feature badges */}
          <div className="flex justify-center gap-3 flex-wrap">
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100/80 text-green-800 border border-green-200 backdrop-blur-xl">
              ✅ 100% Gratuit
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 border border-blue-200 backdrop-blur-xl">
              📱 Fonctionne hors-ligne
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100/80 text-purple-800 border border-purple-200 backdrop-blur-xl">
              🤖 IA Commentateur
            </div>
          </div>
        </div>

        <UnifiedGameSetup onStartGame={handleStartGame} />
      </div>
    </UnifiedPageLayout>
  );
};

export default GameSetup;
