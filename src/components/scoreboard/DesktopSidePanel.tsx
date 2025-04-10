
import React from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import AICommentator from '@/components/AICommentator';
import PlayerDetailedStats from '@/components/PlayerDetailedStats';

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
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="hidden md:block md:w-2/5 space-y-6"
    >
      {/* Commentateur IA */}
      {showAICommentator && (
        <AICommentator 
          players={players}
          roundHistory={roundHistory}
          className="mb-6"
        />
      )}
      
      {/* Section stats détaillées pour le joueur sélectionné */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">
          {selectedPlayer ? `Statistiques de ${selectedPlayer.name}` : 'Sélectionnez un joueur pour voir ses statistiques'}
        </h3>
        
        {selectedPlayer ? (
          <PlayerDetailedStats player={selectedPlayer} />
        ) : (
          <div className="text-gray-500 text-sm italic p-4 text-center">
            Cliquez sur un joueur dans le classement pour afficher ses statistiques détaillées
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DesktopSidePanel;
