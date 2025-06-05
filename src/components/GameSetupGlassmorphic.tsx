
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphicPlayerSetup from './game-setup/GlassmorphicPlayerSetup';
import TournamentMode from './TournamentMode';
import { UnifiedTabs } from '@/components/ui/unified-tabs';
import { UnifiedCard } from '@/components/ui/unified-card';
import { Play, Trophy } from 'lucide-react';

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
    <UnifiedCard variant="light" padding="none" className="overflow-hidden">
      <div className="space-y-6">
        {/* Sélecteur de mode avec style moderne */}
        <div className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 p-6 border-b border-white/30">
          <div className="flex justify-center">
            <UnifiedTabs
              value={activeTab}
              onValueChange={setActiveTab}
              options={tabOptions}
              variant="orange"
            />
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="px-2 pb-6">
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
                <TournamentMode onStartTournament={onStartTournament} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </UnifiedCard>
  );
};

export default GameSetupGlassmorphic;
