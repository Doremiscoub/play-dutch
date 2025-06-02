
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
import AICommentatorEnhanced from './AICommentatorEnhanced';
import { ModernTitle } from './ui/modern-title';
import EnhancedScoreBoardHeader from './scoreboard/EnhancedScoreBoardHeader';
import ScoreBoardTabs from './scoreboard/ScoreBoardTabs';
import FunPlayerCard from './scoreboard/FunPlayerCard';
import DetailedGameStats from './scoreboard/DetailedGameStats';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';
import UndoConfirmationDialog from './scoreboard/UndoConfirmationDialog';

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
      <div className="w-full max-w-6xl mx-auto px-1 sm:px-2">
        <EnhancedScoreBoardHeader roundCount={players[0]?.rounds.length || 0} scoreLimit={scoreLimit} />

        {showAICommentator && (
          <div className="mb-4">
            <AICommentatorEnhanced 
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
          <div className={`${isDesktop ? 'md:w-full' : 'w-full'} z-20 relative`}>
            <AnimatePresence mode="wait">
              {view === 'list' && (
                <motion.div
                  key="list-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full space-y-3"
                >
                  {sortedPlayers.map((player, index) => (
                    <FunPlayerCard
                      key={player.id}
                      player={player}
                      rank={index + 1}
                      totalPlayers={players.length}
                      onSelect={handlePlayerSelect}
                      isSelected={selectedPlayer?.id === player.id}
                    />
                  ))}
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
        </div>

        <DetailedGameStats
          players={players}
          roundHistory={roundHistory}
        />

        <div className="mt-4">
          <CustomScoreBoardButtons
            players={players}
            onAddRound={openScoreForm}
            onRequestUndoLastRound={handleRequestUndo}
            onEndGame={onEndGame}
          />
        </div>
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
