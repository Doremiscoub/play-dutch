
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphicPlayerSetup from './game-setup/GlassmorphicPlayerSetup';
import TournamentMode from './TournamentMode';
import { UnifiedTabs } from '@/components/ui/unified-tabs';
import { UnifiedCard } from '@/components/ui/unified-card';
import { Play, Trophy, Sparkles } from 'lucide-react';

interface GameSetupGlassmorphicProps {
  onStartGame: (playerNames: string[]) => void;
  onStartTournament?: (tournamentName: string, playerNames: string[], rounds: number) => void;
}

const GameSetupGlassmorphic: React.FC<GameSetupGlassmorphicProps> = ({ 
  onStartGame, 
  onStartTournament 
}) => {
  const [activeTab, setActiveTab] = useState<string>('quick');

  const tabOptions = [
    {
      value: "quick",
      label: "Partie rapide",
      icon: <Play className="h-4 w-4" />
    },
    {
      value: "tournament",
      label: "Tournoi",
      icon: <Trophy className="h-4 w-4" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <UnifiedCard variant="light" padding="none" className="overflow-hidden shadow-xl">
        <div className="space-y-0">
          {/* En-tête avec sélecteur de mode */}
          <div className="relative bg-gradient-to-br from-dutch-blue/5 via-dutch-purple/5 to-dutch-orange/5 p-6 border-b border-white/30">
            {/* Éléments décoratifs */}
            <div className="absolute top-4 right-4 opacity-20">
              <Sparkles className="h-6 w-6 text-dutch-purple" />
            </div>
            <div className="absolute bottom-4 left-4 opacity-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-dutch-blue to-dutch-orange"
              />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Choisissez votre mode de jeu
                </h3>
                <p className="text-sm text-gray-600">
                  Partie rapide ou tournoi complet
                </p>
              </motion.div>
              
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <UnifiedTabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    options={tabOptions}
                    variant="orange"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Contenu des onglets */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {activeTab === 'quick' && (
                <motion.div
                  key="quick-game"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <GlassmorphicPlayerSetup onStartGame={onStartGame} />
                </motion.div>
              )}

              {activeTab === 'tournament' && onStartTournament && (
                <motion.div
                  key="tournament"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="p-6">
                    <TournamentMode onStartTournament={onStartTournament} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </UnifiedCard>
    </motion.div>
  );
};

export default GameSetupGlassmorphic;
