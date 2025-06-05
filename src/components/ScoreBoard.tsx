
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
  const [showStats, setShowStats] = useState(true); // Changed to true by default
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

        {/* View Toggle Buttons */}
        <div className="flex justify-center items-center space-x-2 mb-4">
          <motion.button
            onClick={() => setCurrentView('list')}
            className={`px-6 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 ${
              currentView === 'list'
                ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white'
                : 'bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BarChart3 className="h-4 w-4" />
            Classement
          </motion.button>
          <motion.button
            onClick={() => setCurrentView('table')}
            className={`px-6 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2 ${
              currentView === 'table'
                ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white'
                : 'bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Table className="h-4 w-4" />
            Tableau détaillé
          </motion.button>
        </div>

        {/* Content based on current view */}
        <AnimatePresence mode="wait">
          {currentView === 'list' ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Players Stack - Vertical Layout */}
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

              {/* Toggle Stats Button */}
              <div className="flex justify-center">
                <motion.button
                  onClick={() => setShowStats(!showStats)}
                  className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl px-6 py-3 text-gray-800 hover:bg-white/80 transition-all shadow-lg flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  {showStats ? 'Masquer les stats' : 'Voir les statistiques'}
                </motion.button>
              </div>

              {/* Detailed Stats */}
              <AnimatePresence>
                {showStats && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DetailedGameStats 
                      players={players} 
                      roundCount={roundCount}
                      scoreLimit={scoreLimit}
                      roundHistory={roundHistory}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
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

      {/* Floating Action Buttons */}
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
