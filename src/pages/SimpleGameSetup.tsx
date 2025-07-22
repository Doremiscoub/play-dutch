
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSimpleGameState } from '@/hooks/useSimpleGameState';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import ModernGameSetup from '@/components/game-setup/ModernGameSetup';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import PageShell from '@/components/layout/PageShell';

const SimpleGameSetup: React.FC = () => {
  const navigate = useNavigate();
  const { createGame } = useSimpleGameState();

  useEffect(() => {
    console.log('🔧 SimpleGameSetup MOUNTED');
    return () => {
      console.log('🔧 SimpleGameSetup UNMOUNTED');
    };
  }, []);

  const handleStartGame = (playerNames: string[]) => {
    console.log('🎮 Starting game with players:', playerNames);
    
    if (playerNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs pour démarrer une partie');
      return;
    }

    const success = createGame(playerNames);
    if (success) {
      console.log('✅ Game created successfully, navigating to /game');
      navigate('/game', { replace: true, state: { fromSetup: true } });
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

      {/* Contenu principal avec z-index simplifié */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
          </motion.div>
        </motion.div>
      </div>
    </PageShell>
  );
};

export default SimpleGameSetup;
