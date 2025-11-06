
import React, { useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameState } from '@/hooks/game/unified/useGameState';
import { useTutorial } from '@/hooks/useTutorial';
import { InteractiveTutorialV2 } from '@/components/tutorial/InteractiveTutorialV2';
import { GameSyncManager } from '@/components/sync/GameSyncManager';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ModernGameSetup from '@/components/game-setup/ModernGameSetup';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import { useUnifiedHeader } from '@/hooks/useUnifiedHeader';
import PageShell from '@/components/layout/PageShell';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import { HelpCircle } from 'lucide-react';

const SimpleGameSetup: React.FC = () => {
  const navigate = useNavigate();
  const { createGame, availableGames, loadGameFromCloud, hasGame, resetGame } = useGameState();
  const { showTutorial, closeTutorial, startTutorial, isLoading } = useTutorial();
  const headerConfig = useUnifiedHeader();

  useEffect(() => {
    console.log('🔧 SimpleGameSetup MOUNTED');
    return () => {
      console.log('🔧 SimpleGameSetup UNMOUNTED');
    };
  }, []);

  const handleStartGame = async (playerNames: string[]) => {
    console.log('🎮 Starting game with players:', playerNames);
    
    if (playerNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs pour démarrer une partie');
      return;
    }

    const success = await createGame(playerNames);
    if (success) {
      console.log('✅ Game created successfully, navigating to /game');
      navigate('/game', { replace: true, state: { fromSetup: true } });
    } else {
      toast.error('Erreur lors de la création de la partie');
    }
  };

  const handleLoadGame = async (gameId: string) => {
    const success = await loadGameFromCloud(gameId);
    if (success) {
      navigate('/game', { replace: true });
    }
  };

  const handleResetCurrentGame = () => {
    resetGame();
    toast.success('Partie réinitialisée');
  };

  return (
    <PageShell variant="game">
      <MobileOptimizer pageType="setup" className="min-h-screen">
        <UnifiedHeader {...headerConfig} />
        
        {/* Gestionnaire de synchronisation - simplifié */}
        {/* <GameSyncManager /> */}

        {/* Contenu principal stabilisé */}
        <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Configuration directe - wizard 3 étapes */}
          <ModernGameSetup onStartGame={handleStartGame} />

          {/* Informations sur le jeu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-neutral-800">🎯 Rappel des règles Dutch</h3>
                  <Button
                    onClick={startTutorial}
                    variant="outline"
                    size="sm"
                    className="text-xs hover:scale-105 transition-transform"
                  >
                    <HelpCircle className="h-3 w-3 mr-1" />
                    Guide interactif
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-700">
                  <div className="space-y-2">
                    <p><strong>• Objectif :</strong> Avoir le score le plus bas</p>
                    <p><strong>• Dutch :</strong> Joueur avec le score le plus bas de la manche</p>
                  </div>
                  <div className="space-y-2">
                    <p><strong>• Fin de partie :</strong> Premier à atteindre 100 points</p>
                    <p><strong>• Gagnant :</strong> Score total le plus bas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        </div>
      </MobileOptimizer>

      {/* Tutorial interactif */}
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
