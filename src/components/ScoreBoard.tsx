/**
 * Tableau des scores principal - Composant refactorisé
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { useMediaQuery } from '@/hooks/use-media-query';
import { toast } from 'sonner';
import PageLayout from '@/components/PageLayout';
import CustomScoreBoardButtons from './CustomScoreBoardButtons';
import ScoreTableView from './ScoreTableView';
import AICommentator from './AICommentator';
import AdSenseSlot from './ads/AdSenseSlot';

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
  openScoreForm?: () => void;
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
  scoreLimit = 100,
  openScoreForm
}) => {
  const [view, setView] = useState<'list' | 'table'>('list');
  const [showAICommentator, setShowAICommentator] = useState<boolean>(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showUndoConfirmation, setShowUndoConfirmation] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  useEffect(() => {
    if (sortedPlayers.length > 0 && !selectedPlayer) {
      setSelectedPlayer(sortedPlayers[0]);
    }
  }, [sortedPlayers, selectedPlayer]);
  
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
  
  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
  };

  return (
    <PageLayout className="pb-12 sm:pb-20">
      <div className="grid grid-cols-[1fr_auto] gap-6">
        <div className="w-full max-w-6xl mx-auto px-1 sm:px-2">
          <ScoreBoardHeader 
            roundCount={players.length > 0 ? players[0]?.rounds.length || 0 : 0}
            scoreLimit={scoreLimit}
          />
          
          {showAICommentator && (
            <div className="mb-4">
              <AICommentator 
                players={players}
                roundHistory={roundHistory}
              />
            </div>
          )}
          
          <ScoreBoardTabs 
            currentView={view}
            onViewChange={(newView) => setView(newView)}
          />
          
          <div className={`mt-4 ${isDesktop ? 'md:flex md:gap-4' : ''}`}>
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
            
            {isDesktop && (
              <div className="md:w-1/4 md:max-h-screen md:sticky md:top-0">
                <GameStatsPanel
                  players={players}
                  roundHistory={roundHistory}
                />
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <CustomScoreBoardButtons
              players={players}
              onAddRound={openScoreForm}
              onRequestUndoLastRound={handleRequestUndo}
              onEndGame={onEndGame}
            />
          </div>
        </div>
        
        <aside className="hidden lg:block w-60 h-fit sticky top-4">
          <AdSenseSlot />
        </aside>
      </div>
      
      {showGameEndConfirmation && onConfirmEndGame && onCancelEndGame && (
        <EndGameConfirmationDialog 
          isOpen={showGameEndConfirmation}
          onConfirm={onConfirmEndGame}
          onCancel={onCancelEndGame}
        />
      )}
      
      <UndoConfirmationDialog 
        isOpen={showUndoConfirmation}
        onConfirm={handleConfirmUndo}
        onCancel={handleCancelUndo}
      />
    </PageLayout>
  );
};

export default ScoreBoard;
