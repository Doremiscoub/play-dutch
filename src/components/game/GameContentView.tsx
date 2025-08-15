import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import GameModeHandler from '@/components/game/GameModeHandler';
import ScoreBoard from '@/components/ScoreBoard';
import IntelligentProfessorCartouche from '@/components/ai-commentator/IntelligentProfessorCartouche';

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
        <div className="min-h-screen bg-gradient-to-br from-trinity-blue-50 via-background to-trinity-purple-50 pb-32">
          <div className="max-w-6xl mx-auto">
            {/* Professeur Cartouche - En haut et centré */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 px-4 pt-4"
            >
              <IntelligentProfessorCartouche 
                players={players}
                roundCount={roundHistory.length}
                scoreLimit={scoreLimit}
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