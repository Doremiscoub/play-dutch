
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphicPlayerSetup from './game-setup/GlassmorphicPlayerSetup';
import TournamentMode from './TournamentMode';
import { UnifiedTabs } from '@/components/ui/unified-tabs';
import { UnifiedCard } from '@/components/ui/unified-card';
import { Play, Trophy, Sparkles, Users, Crown } from 'lucide-react';

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <UnifiedCard variant="light" padding="none" className="overflow-hidden shadow-2xl border-white/60">
        <div className="space-y-0">
          {/* En-tête avec sélecteur de mode amélioré */}
          <motion.div 
            variants={itemVariants}
            className="relative bg-gradient-to-br from-dutch-blue/8 via-dutch-purple/6 to-dutch-orange/8 p-8 border-b border-white/40"
          >
            {/* Éléments décoratifs animés */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-6 right-8 opacity-20"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-8 w-8 text-dutch-purple" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-6 left-8 opacity-15"
                animate={{ 
                  rotate: [360, 0],
                  x: [0, 10, 0],
                  y: [0, -5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Crown className="h-10 w-10 text-dutch-orange" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5"
                animate={{ 
                  scale: [1, 1.5, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Users className="h-32 w-32 text-dutch-blue" />
              </motion.div>
            </div>

            <div className="relative z-10 space-y-6">
              <motion.div
                variants={itemVariants}
                className="text-center space-y-3"
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
                  Mode de jeu
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Choisissez entre une partie rapide ou un tournoi complet avec plusieurs manches
                </p>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="flex justify-center"
              >
                <div className="relative">
                  {/* Effet de lueur autour des onglets */}
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-dutch-blue/20 via-dutch-purple/20 to-dutch-orange/20 rounded-2xl blur-lg opacity-50"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <UnifiedTabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    options={tabOptions}
                    variant="orange"
                    className="relative z-10 bg-white/80 backdrop-blur-xl border-white/60 shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contenu des onglets avec animations fluides */}
          <div className="relative min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === 'quick' && (
                <motion.div
                  key="quick-game"
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.95 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  className="absolute inset-0"
                >
                  <GlassmorphicPlayerSetup onStartGame={onStartGame} />
                </motion.div>
              )}

              {activeTab === 'tournament' && onStartTournament && (
                <motion.div
                  key="tournament"
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.95 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeInOut",
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  className="absolute inset-0"
                >
                  <div className="p-8">
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
