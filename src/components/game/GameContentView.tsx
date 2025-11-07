import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import GameModeHandler from '@/components/game/GameModeHandler';
import ScoreBoard from '@/features/scoreboard/ScoreBoard';
import { AICommentator } from '@/features/ai-commentator';
import { useMobileAdaptation } from '@/hooks/useMobileAdaptation';
import { cn } from '@/lib/utils';

interface GameContentViewProps {
  gameMode: 'quick' | 'tournament';
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  scoreLimit: number;
  onGameEnd: () => void;
  onRestart: () => void;
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onUndoLastRound: () => void;
  onRequestEndGame: () => void;
  showGameEndConfirmation: boolean;
  onConfirmEndGame: () => void;
  onCancelEndGame: () => void;
  onOpenScoreForm: () => void;
}

const GameContentView: React.FC<GameContentViewProps> = ({
  gameMode,
  players,
  roundHistory,
  scoreLimit,
  onGameEnd,
  onRestart,
  onAddRound,
  onUndoLastRound,
  onRequestEndGame,
  showGameEndConfirmation,
  onConfirmEndGame,
  onCancelEndGame,
  onOpenScoreForm
}) => {
  const { singleColumn } = useMobileAdaptation();
  return (
    <motion.div
      key="game-board"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={gameMode === 'tournament' ? "pt-4" : ""}
    >
      <GameModeHandler
        gameMode={gameMode}
        players={players}
        onGameEnd={onGameEnd}
        onRestart={onRestart}
      >
        <div className={cn(
          "bg-gradient-to-br from-trinity-blue-50 via-background to-trinity-purple-50",
          singleColumn ? "min-h-[calc(100vh-8rem)] pb-4" : "min-h-screen pb-32"
        )}>
          <div className={cn(
            "mx-auto",
            singleColumn ? "w-full" : "max-w-6xl"
          )}>
            {/* Professeur Cartouche - En haut et centré */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={cn(
                singleColumn ? "mb-3 px-3 pt-2" : "mb-8 px-4 pt-4"
              )}
            >
              <AICommentator 
                players={players}
                roundCount={roundHistory.length}
                scoreLimit={scoreLimit}
                className={singleColumn ? "mobile-compact" : ""}
              />
            </motion.div>

            <ScoreBoard
              players={players}
              roundHistory={roundHistory}
              onAddRound={onAddRound}
              onUndoLastRound={onUndoLastRound}
              onEndGame={onRequestEndGame}
              showGameEndConfirmation={showGameEndConfirmation}
              onConfirmEndGame={onConfirmEndGame}
              onCancelEndGame={onCancelEndGame}
              scoreLimit={scoreLimit}
              openScoreForm={onOpenScoreForm}
            />
          </div>
        </div>
      </GameModeHandler>
    </motion.div>
  );
};

export default GameContentView;