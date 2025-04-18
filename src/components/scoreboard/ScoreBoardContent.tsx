
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import PlayerListView from './PlayerListView';
import ScoreTableView from '../ScoreTableView';
import GameStatsPanel from './GameStatsPanel';

interface ScoreBoardContentProps {
  view: 'list' | 'table';
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  isDesktop: boolean;
  scoreLimit: number;
}

const ScoreBoardContent: React.FC<ScoreBoardContentProps> = ({
  view,
  players,
  roundHistory,
  isDesktop,
  scoreLimit
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Effet pour simuler un chargement initial et éviter les problèmes de rendu
  useEffect(() => {
    console.info("ScoreBoardContent: Montage du composant");
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      console.info("ScoreBoardContent: Démontage du composant");
    };
  }, []);
  
  // Protection contre les valeurs null/undefined
  const safeRoundHistory = Array.isArray(roundHistory) ? roundHistory : [];
  const safePlayers = Array.isArray(players) ? players : [];
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-dutch-blue border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className={`mt-8 ${isDesktop ? 'md:flex md:gap-6' : ''}`}>
      <div className={`${isDesktop ? 'md:w-3/4' : 'w-full'} z-20 relative`}>
        <AnimatePresence mode="wait">
          {view === 'list' && (
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <PlayerListView 
                players={safePlayers}
                isDesktop={isDesktop}
                scoreLimit={scoreLimit}
                onPlayerSelect={setSelectedPlayer}
              />
            </motion.div>
          )}
          
          {view === 'table' && (
            <motion.div
              key="table-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white"
            >
              <ScoreTableView 
                players={safePlayers}
                roundHistory={safeRoundHistory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {isDesktop && (
        <div className="md:w-1/4 md:max-h-screen md:sticky md:top-0">
          <GameStatsPanel
            players={safePlayers}
            roundHistory={safeRoundHistory}
          />
        </div>
      )}
    </div>
  );
};

export default ScoreBoardContent;
