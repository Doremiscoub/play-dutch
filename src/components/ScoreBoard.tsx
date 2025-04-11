
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { useMediaQuery } from '@/hooks/use-media-query';
import { toast } from 'sonner';
import PageLayout from './PageLayout';
import CustomScoreBoardButtons from './CustomScoreBoardButtons';
import ScoreTableView from './ScoreTableView';
import AICommentator from './AICommentator';

// Import the newly created components
import ScoreBoardHeader from './scoreboard/ScoreBoardHeader';
import ScoreBoardTabs from './scoreboard/ScoreBoardTabs';
import PlayerListView from './scoreboard/PlayerListView';
import DesktopSidePanel from './scoreboard/DesktopSidePanel';
import UndoConfirmationDialog from './scoreboard/UndoConfirmationDialog';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';

interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onUndoLastRound: () => void;
  onEndGame: () => void;
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  isMultiplayer?: boolean;
  showGameEndConfirmation?: boolean;
  onConfirmEndGame?: () => void;
  onCancelEndGame?: () => void;
  scoreLimit?: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  onAddRound,
  onUndoLastRound,
  onEndGame,
  roundHistory = [],
  isMultiplayer = false,
  showGameEndConfirmation = false,
  onConfirmEndGame,
  onCancelEndGame,
  scoreLimit = 100
}) => {
  const [view, setView] = useState<'list' | 'table'>('list');
  const [showAICommentator, setShowAICommentator] = useState<boolean>(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showUndoConfirmation, setShowUndoConfirmation] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  // Sort players by score, best to worst
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Auto-select the first player for detailed stats
  useEffect(() => {
    if (sortedPlayers.length > 0 && !selectedPlayer) {
      setSelectedPlayer(sortedPlayers[0]);
    }
  }, [sortedPlayers, selectedPlayer]);
  
  // Handle undo request
  const handleRequestUndo = () => {
    if (players.length === 0 || players[0].rounds.length === 0) {
      toast.error('Pas de manche à annuler !');
      return;
    }
    setShowUndoConfirmation(true);
  };
  
  const handleConfirmUndo = () => {
    onUndoLastRound();
    setShowUndoConfirmation(false);
  };
  
  const handleCancelUndo = () => {
    setShowUndoConfirmation(false);
  };
  
  // Handle player selection for detailed stats
  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
  };

  return (
    <PageLayout backgroundVariant="subtle" className="pb-20 sm:pb-32">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        {/* Header with navigation buttons and title */}
        <ScoreBoardHeader 
          roundCount={players.length > 0 ? players[0]?.rounds.length || 0 : 0}
          scoreLimit={scoreLimit}
        />
        
        {/* AI Commentator - both on mobile and desktop */}
        {showAICommentator && (
          <div className="mb-4">
            <AICommentator 
              players={players}
              roundHistory={roundHistory}
            />
          </div>
        )}
        
        {/* Tabs for switching between views */}
        <ScoreBoardTabs 
          currentView={view}
          onViewChange={(newView) => setView(newView)}
        />
        
        {/* Main content */}
        <div className={`mt-4 ${isDesktop ? 'md:flex md:gap-6' : ''}`}>
          {/* Left column (ranking or table) */}
          <div className={`${isDesktop && view === 'list' ? 'md:w-3/5' : 'w-full'} z-20 relative`}>
            <AnimatePresence mode="wait">
              {view === 'list' && (
                <motion.div
                  key="list-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  {/* Player list view */}
                  <PlayerListView 
                    players={players}
                    isDesktop={isDesktop}
                    scoreLimit={scoreLimit}
                    onPlayerSelect={handlePlayerSelect}
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
                    players={players}
                    roundHistory={roundHistory || []}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Right column (desktop only - player stats) */}
          {isDesktop && view === 'list' && (
            <DesktopSidePanel 
              showAICommentator={false} // AI commentator is shown at the top for all screens
              players={players}
              roundHistory={roundHistory}
              selectedPlayer={selectedPlayer}
            />
          )}
        </div>
        
        {/* Action buttons */}
        <div className="mt-6">
          <CustomScoreBoardButtons
            players={players}
            onAddRound={onAddRound}
            onRequestUndoLastRound={handleRequestUndo}
            onEndGame={onEndGame}
          />
        </div>
      </div>
      
      {/* End game confirmation dialog */}
      {showGameEndConfirmation && onConfirmEndGame && onCancelEndGame && (
        <EndGameConfirmationDialog 
          isOpen={showGameEndConfirmation}
          onConfirm={onConfirmEndGame}
          onCancel={onCancelEndGame}
        />
      )}
      
      {/* Undo confirmation dialog */}
      <UndoConfirmationDialog 
        isOpen={showUndoConfirmation}
        onConfirm={handleConfirmUndo}
        onCancel={handleCancelUndo}
      />
    </PageLayout>
  );
};

export default ScoreBoard;
