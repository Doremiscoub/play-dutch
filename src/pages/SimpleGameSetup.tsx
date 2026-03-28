
import React, { useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '@/hooks/game/unified/useGameState';
import { useTutorial } from '@/hooks/useTutorial';
import { InteractiveTutorialV2 } from '@/components/tutorial/InteractiveTutorialV2';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ModernGameSetup from '@/components/game-setup/ModernGameSetup';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import { useUnifiedHeader } from '@/hooks/useUnifiedHeader';
import PageShell from '@/components/layout/PageShell';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import { HelpCircle } from 'lucide-react';
import { logger } from '@/utils/logger';

const SimpleGameSetup: React.FC = () => {
  const navigate = useNavigate();
  const { createGame, availableGames: _availableGames, loadGameFromCloud, hasGame: _hasGame, resetGame } = useGameState();
  const { showTutorial, closeTutorial, startTutorial, isLoading } = useTutorial();
  const headerConfig = useUnifiedHeader();

  useEffect(() => {
    logger.debug('SimpleGameSetup MOUNTED');
    return () => {
      logger.debug('SimpleGameSetup UNMOUNTED');
    };
  }, []);

  const handleStartGame = async (playerNames: string[]) => {
    logger.debug('Starting game with players:', playerNames);

    if (playerNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs pour démarrer une partie');
      return;
    }

    const success = await createGame(playerNames);
    if (success) {
      logger.debug('Game created successfully, navigating to /game');
      navigate('/game', { replace: true, state: { fromSetup: true } });
    } else {
      toast.error('Erreur lors de la création de la partie');
    }
  };

  const _handleLoadGame = async (_gameId: string) => {
    const success = await loadGameFromCloud();
    if (success) {
      navigate('/game', { replace: true });
    }
  };

  const _handleResetCurrentGame = () => {
    resetGame();
    toast.success('Partie réinitialisée');
  };

  return (
    <PageShell variant="game">
      <MobileOptimizer pageType="setup" className="min-h-screen">
        <UnifiedHeader {...headerConfig} />

        <div className="container mx-auto px-4 py-6 sm:py-10 max-w-4xl relative z-20 animate-in fade-in duration-300">
          <ModernGameSetup onStartGame={handleStartGame} />

          <Card className="mt-8 bg-blue-50 border border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-semibold text-neutral-800">
                  Rappel des règles Dutch
                </h3>
                <Button
                  onClick={startTutorial}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <HelpCircle className="h-3 w-3 mr-1" />
                  Guide interactif
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-600">
                <div className="space-y-2">
                  <p><strong>Objectif :</strong> Avoir le score le plus bas</p>
                  <p><strong>Dutch :</strong> Joueur avec le score le plus bas de la manche</p>
                </div>
                <div className="space-y-2">
                  <p><strong>Fin de partie :</strong> Premier à atteindre 100 points</p>
                  <p><strong>Gagnant :</strong> Score total le plus bas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MobileOptimizer>

      {!isLoading && (
        <Suspense fallback={null}>
          <InteractiveTutorialV2
            isOpen={showTutorial}
            onClose={closeTutorial}
          />
        </Suspense>
      )}
    </PageShell>
  );
};

export default SimpleGameSetup;
