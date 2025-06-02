
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Info } from 'lucide-react';
import LocalGameSetup from './game-setup/LocalGameSetup';
import { ModernTitle } from './ui/modern-title';

interface GameSetupGlassmorphicProps {
  onStartGame: (playerNames: string[]) => void;
}

const GameSetupGlassmorphic: React.FC<GameSetupGlassmorphicProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 left-[15%] w-32 h-32 rounded-full bg-dutch-blue/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute bottom-32 right-[10%] w-40 h-40 rounded-full bg-dutch-orange/10 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="w-full max-w-2xl mx-auto space-y-6 z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <ModernTitle 
            variant="h1" 
            withSparkles 
            className="text-3xl md:text-5xl"
          >
            Nouvelle Partie
          </ModernTitle>
        </motion.div>

        {/* Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-dutch-blue flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                  <Info className="h-5 w-5 text-dutch-blue" />
                </div>
                Un seul appareil suffit !
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-dutch-blue/5 rounded-xl p-4 text-sm text-gray-700">
                <p className="mb-2">
                  <strong>Mode local :</strong> Parfait pour jouer ensemble autour d'une table. 
                  Chaque joueur entre son score à son tour sur cet appareil.
                </p>
                <p className="text-xs text-gray-600">
                  • Idéal pour 2 à 10 joueurs • Aucune connexion requise • Sauvegarde automatique
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Configuration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-dutch-purple flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dutch-purple/10 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-dutch-purple" />
                </div>
                Configuration de la partie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LocalGameSetup onStartGame={onStartGame} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default GameSetupGlassmorphic;
