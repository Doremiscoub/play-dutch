
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
    <PageLayout backgroundVariant="subtle" className="pb-32 min-h-screen w-full">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-5xl">
        <div className="relative z-10">
          {/* Header with navigation buttons and title */}
          <ScoreBoardHeader 
            roundCount={players.length > 0 ? players[0]?.rounds.length || 0 : 0}
            scoreLimit={scoreLimit}
          />
          
          {/* Tabs for switching between views */}
          <ScoreBoardTabs 
            currentView={view}
            onViewChange={(newView) => setView(newView)}
          />
          
          {/* Main content container with elevated z-index */}
          <div className={`${isDesktop ? 'md:flex md:gap-6' : ''} relative z-20`}>
            {/* Left column (ranking or table) */}
            <div className={`${isDesktop && view === 'list' ? 'md:w-3/5' : 'w-full'}`}>
              <AnimatePresence mode="wait">
                {view === 'list' && (
                  <>
                    {/* Mobile AI commentator */}
                    {!isDesktop && showAICommentator && (
                      <AICommentator 
                        players={players}
                        roundHistory={roundHistory}
                        className="mb-4"
                      />
                    )}
                    
                    {/* Player list view */}
                    <PlayerListView 
                      players={players}
                      isDesktop={isDesktop}
                      scoreLimit={scoreLimit}
                      onPlayerSelect={handlePlayerSelect}
                    />
                  </>
                )}
                
                {view === 'table' && (
                  <motion.div
                    key="table-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-20"
                  >
                    <ScoreTableView 
                      players={players}
                      roundHistory={roundHistory || []}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Right column (desktop only - AI commentator and player stats) */}
            {isDesktop && view === 'list' && (
              <DesktopSidePanel 
                showAICommentator={showAICommentator}
                players={players}
                roundHistory={roundHistory}
                selectedPlayer={selectedPlayer}
              />
            )}
          </div>
        </div>
        
        {/* Action buttons - elevated above background */}
        <div className="relative z-20 mt-6">
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
