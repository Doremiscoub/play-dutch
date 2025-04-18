
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import AnimatedBackground from '../AnimatedBackground';
import AICommentator from '../AICommentator';
import ScoreBoardTabs from './ScoreBoardTabs';
import ScoreBoardContent from './ScoreBoardContent';
import CustomScoreBoardButtons from '../CustomScoreBoardButtons';
import { useMediaQuery } from '@/hooks/use-media-query';
import EndGameConfirmationDialog from './EndGameConfirmationDialog';
import UndoConfirmationDialog from './UndoConfirmationDialog';
import ScoreBoardHeader from './ScoreBoardHeader';

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
  const [showUndoConfirmation, setShowUndoConfirmation] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleRequestUndo = () => {
    if (players.length === 0 || players[0].rounds.length === 0) {
      return;
    }
    setShowUndoConfirmation(true);
  };

  const handleConfirmUndo = () => {
    onUndoLastRound();
    setShowUndoConfirmation(false);
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="default" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="mb-8 mt-4">
          <ScoreBoardHeader 
            roundCount={players.length > 0 ? players[0]?.rounds.length || 0 : 0}
            scoreLimit={scoreLimit}
          />
        </div>

        {showAICommentator && (
          <div className="mb-8">
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

        <ScoreBoardContent 
          view={view}
          players={players}
          roundHistory={roundHistory}
          isDesktop={isDesktop}
          scoreLimit={scoreLimit}
        />

        <div className="mt-4 pb-24">
          <CustomScoreBoardButtons
            players={players}
            onAddRound={onAddRound}
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
        onCancel={() => setShowUndoConfirmation(false)}
      />
    </div>
  );
};

export default ScoreBoard;
