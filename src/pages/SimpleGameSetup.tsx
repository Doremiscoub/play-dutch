import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSimpleGameState } from '@/hooks/useSimpleGameState';
import { toast } from 'sonner';
import { Users, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import LocalGameSetup from '@/components/game-setup/LocalGameSetup';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import PageShell from '@/components/layout/PageShell';

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
      navigate('/simple-game');
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* En-tête principale */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-600 rounded-full flex items-center justify-center">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-trinity-blue-600 to-trinity-purple-600 bg-clip-text text-transparent mb-3">
                Nouvelle partie Dutch
              </h1>
              <p className="text-lg text-neutral-600 font-medium">
                Configurez votre partie pour commencer l'aventure !
              </p>
            </motion.div>
          </div>

          {/* Carte principale de configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-trinity-blue-50 to-trinity-purple-50 border-b border-trinity-blue-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-600 rounded-full flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-neutral-800">Configuration des joueurs</h2>
                    <p className="text-neutral-600">Ajoutez les participants à votre partie</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <LocalGameSetup onStartGame={handleStartGame} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Informations sur le jeu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </PageShell>
  );
};

export default SimpleGameSetup;