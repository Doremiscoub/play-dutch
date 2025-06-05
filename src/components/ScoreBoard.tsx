
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, ScoreBoardProps } from '@/types';
import { BarChart3, Table } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { toast } from 'sonner';
import EnhancedScoreBoardHeader from './scoreboard/EnhancedScoreBoardHeader';
import FunPlayerCard from './scoreboard/FunPlayerCard';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';
import DetailedGameStats from './scoreboard/DetailedGameStats';
import ScoreTableView from './ScoreTableView';
import AICommentatorEnhanced from './ai-commentator/AICommentatorEnhanced';
import FloatingActionButtons from './scoreboard/FloatingActionButtons';

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  onAddRound,
  onUndoLastRound,
  onEndGame,
  roundHistory = [],
  showGameEndConfirmation = false,
  onConfirmEndGame,
  onCancelEndGame,
  scoreLimit = 100,
  openScoreForm
}) => {
  const { playSound } = useSound();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'table'>('list');

  // Sort players by score (ascending - lowest wins)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const roundCount = players[0]?.rounds.length || 0;

  const handleAddRound = () => {
    if (openScoreForm) {
      openScoreForm();
    }
    playSound('buttonClick');
  };

  const handleUndo = () => {
    if (roundHistory.length === 0) {
      toast.error("Aucune manche à annuler");
      return;
    }
    onUndoLastRound();
    playSound('undo');
    toast.success("Dernière manche annulée");
  };

  const handleEndGame = () => {
    onEndGame();
    playSound('gameEnd');
  };

  return (
    <div className="min-h-screen p-4 pb-40">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <EnhancedScoreBoardHeader 
          roundCount={roundCount} 
          scoreLimit={scoreLimit} 
        />

        {/* Commentateur IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AICommentatorEnhanced 
            players={players}
            roundCount={roundCount}
            scoreLimit={scoreLimit}
          />
        </motion.div>

        {/* View Toggle Buttons - Plus proéminents */}
        <motion.div 
          className="flex justify-center items-center space-x-3 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.button
            onClick={() => setCurrentView('list')}
            className={`px-8 py-4 rounded-2xl transition-all shadow-lg flex items-center gap-3 font-semibold text-lg ${
              currentView === 'list'
                ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-xl scale-105'
                : 'bg-white/80 backdrop-blur-xl border border-white/60 text-gray-800 hover:bg-white/90 hover:scale-102'
            }`}
            whileHover={{ scale: currentView === 'list' ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BarChart3 className="h-5 w-5" />
            Classement détaillé
          </motion.button>
          
          <motion.button
            onClick={() => setCurrentView('table')}
            className={`px-8 py-4 rounded-2xl transition-all shadow-lg flex items-center gap-3 font-semibold text-lg ${
              currentView === 'table'
                ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-xl scale-105'
                : 'bg-white/80 backdrop-blur-xl border border-white/60 text-gray-800 hover:bg-white/90 hover:scale-102'
            }`}
            whileHover={{ scale: currentView === 'table' ? 1.05 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Table className="h-5 w-5" />
            Tableau des manches
          </motion.button>
        </motion.div>

        {/* Content based on current view */}
        <AnimatePresence mode="wait">
          {currentView === 'list' ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* Players Cards - Améliorées */}
              <AnimatePresence>
                {sortedPlayers.map((player, index) => (
                  <FunPlayerCard
                    key={player.id}
                    player={player}
                    rank={index + 1}
                    totalPlayers={players.length}
                    onSelect={setSelectedPlayer}
                    isSelected={selectedPlayer?.id === player.id}
                  />
                ))}
              </AnimatePresence>

              {/* Detailed Stats - Toujours affichées */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <DetailedGameStats 
                  players={players} 
                  roundCount={roundCount}
                  scoreLimit={scoreLimit}
                  roundHistory={roundHistory}
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="table-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ScoreTableView 
                players={players} 
                roundHistory={roundHistory}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* End Game Confirmation */}
        <EndGameConfirmationDialog
          isOpen={showGameEndConfirmation}
          onConfirm={onConfirmEndGame}
          onCancel={onCancelEndGame}
        />
      </div>

      {/* Floating Action Buttons - Optimisés et fixes */}
      <FloatingActionButtons
        onAddRound={handleAddRound}
        onUndo={handleUndo}
        onEndGame={handleEndGame}
        canUndo={roundHistory.length > 0}
        canEndGame={roundCount > 0}
      />
    </div>
  );
};

export default ScoreBoard;
