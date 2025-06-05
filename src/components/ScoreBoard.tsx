
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, ScoreBoardProps } from '@/types';
import { BarChart3, Table } from 'lucide-react';
import { useSound } from '@/hooks/use-sound';
import { toast } from 'sonner';
import UnifiedTopBar from './scoreboard/UnifiedTopBar';
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
  console.log('ScoreBoard: Component rendered', { playersCount: players?.length, roundHistoryLength: roundHistory.length });
  
  const { playSound } = useSound();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'table'>('list');

  // Memoïser les données triées pour éviter les recalculs
  const sortedPlayers = useMemo(() => {
    console.log('ScoreBoard: Sorting players');
    return [...players].sort((a, b) => a.totalScore - b.totalScore);
  }, [players]);

  const roundCount = useMemo(() => {
    return players[0]?.rounds.length || 0;
  }, [players]);

  // Memoïser les callbacks
  const handleAddRound = useCallback(() => {
    console.log('ScoreBoard: handleAddRound called');
    if (openScoreForm) {
      openScoreForm();
    }
    playSound('buttonClick');
  }, [openScoreForm, playSound]);

  const handleUndo = useCallback(() => {
    console.log('ScoreBoard: handleUndo called');
    if (roundHistory.length === 0) {
      toast.error("Aucune manche à annuler");
      return;
    }
    onUndoLastRound();
    playSound('undo');
    toast.success("Dernière manche annulée");
  }, [roundHistory.length, onUndoLastRound, playSound]);

  const handleEndGame = useCallback(() => {
    console.log('ScoreBoard: handleEndGame called');
    onEndGame();
    playSound('gameEnd');
  }, [onEndGame, playSound]);

  const handleViewChange = useCallback((view: 'list' | 'table') => {
    console.log('ScoreBoard: View changed to', view);
    setCurrentView(view);
  }, []);

  const handlePlayerSelect = useCallback((player: Player) => {
    console.log('ScoreBoard: Player selected', player.name);
    setSelectedPlayer(player);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Top Bar Unifiée */}
      <UnifiedTopBar 
        title="Tableau des scores"
        roundCount={roundCount}
        scoreLimit={scoreLimit}
      />

      <div className="p-4 pb-32">
        <div className="max-w-4xl mx-auto space-y-6">
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
          <motion.div 
            className="flex justify-center items-center space-x-3 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.button
              onClick={() => handleViewChange('list')}
              className={`px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium ${
                currentView === 'list'
                  ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur-xl border border-white/60 text-gray-800 hover:bg-white/90 hover:scale-102'
              }`}
              whileHover={{ scale: currentView === 'list' ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BarChart3 className="h-4 w-4" />
              Classement détaillé
            </motion.button>
            
            <motion.button
              onClick={() => handleViewChange('table')}
              className={`px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium ${
                currentView === 'table'
                  ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur-xl border border-white/60 text-gray-800 hover:bg-white/90 hover:scale-102'
              }`}
              whileHover={{ scale: currentView === 'table' ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Table className="h-4 w-4" />
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
                {/* Players Cards */}
                <AnimatePresence>
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
                </AnimatePresence>

                {/* Detailed Stats */}
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
      </div>

      {/* Floating Action Buttons - Maintenant vraiment fixes */}
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

export default React.memo(ScoreBoard);
