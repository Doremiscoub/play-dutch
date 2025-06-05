
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedLocalGameSetup from './game-setup/EnhancedLocalGameSetup';
import TournamentMode from './TournamentMode';
import { UnifiedTabs } from '@/components/ui/unified-tabs';
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex justify-center">
          <UnifiedTabs
            value={activeTab}
            onValueChange={setActiveTab}
            options={tabOptions}
            variant="orange"
          />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'quick' && (
            <motion.div
              key="quick-game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EnhancedLocalGameSetup onStartGame={onStartGame} />
            </motion.div>
          )}

          {activeTab === 'tournament' && onStartTournament && (
            <motion.div
              key="tournament"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TournamentMode onStartTournament={onStartTournament} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameSetupGlassmorphic;
