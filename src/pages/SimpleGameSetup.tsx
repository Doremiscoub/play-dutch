import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimpleGameState } from '@/hooks/useSimpleGameState';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import ModernGameSetup from '@/components/game-setup/ModernGameSetup';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import PageShell from '@/components/layout/PageShell';
import SimpleErrorBoundary from '@/components/ui/simple-error-boundary';

const SimpleGameSetup: React.FC = () => {
  const navigate = useNavigate();
  const { createGame } = useSimpleGameState();

  const handleStartGame = (playerNames: string[]) => {
    if (playerNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs pour démarrer une partie');
      return;
    }

    const success = createGame(playerNames);
    if (success) {
      navigate('/game');
    } else {
      toast.error('Erreur lors de la création de la partie');
    }
  };

  return (
    <PageShell variant="game">
      <UnifiedHeader 
        title="Configuration de partie" 
        showBackButton={true}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div>
          {/* Configuration directe sans redondance */}
          <SimpleErrorBoundary fallbackMessage="Erreur dans la configuration de la partie">
            <ModernGameSetup onStartGame={handleStartGame} />
          </SimpleErrorBoundary>

          {/* Informations sur le jeu */}
          <div className="mt-8">
            <Card className="bg-gradient-to-r from-trinity-blue-50 to-trinity-purple-50 border border-trinity-blue-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-neutral-800 mb-3">🎯 Rappel des règles Dutch</h3>
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
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default SimpleGameSetup;