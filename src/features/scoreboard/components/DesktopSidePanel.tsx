
/**
 * Panneau latéral pour affichage des statistiques sur desktop
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { AICommentator } from '@/features/ai-commentator';
import PlayerStatsCard from '@/features/scoreboard/components/PlayerStatsCard';

interface DesktopSidePanelProps {
  showAICommentator: boolean;
  players: Player[];
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  selectedPlayer: Player | null;
}

const DesktopSidePanel: React.FC<DesktopSidePanelProps> = ({ 
  showAICommentator, 
  players, 
  roundHistory = [],
  selectedPlayer 
}) => {
  return (
    <div className="md:w-1/5 ml-4 space-y-4">
      {/* Afficher l'AI Commentator si activé */}
      {showAICommentator && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AICommentator 
            players={players}
            roundCount={roundHistory.length}
            scoreLimit={100}
          />
        </motion.div>
      )}
      
      {/* Statistiques détaillées du joueur sélectionné */}
      {selectedPlayer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <PlayerStatsCard player={selectedPlayer} />
        </motion.div>
      )}
    </div>
  );
};

export default DesktopSidePanel;
