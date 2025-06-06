
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScoreBoardProps } from '@/types';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';
import EnhancedAICommentator from './ai-commentator/EnhancedAICommentator';
import StickyActionButtons from './scoreboard/StickyActionButtons';
import ScoreBoardHeader from './scoreboard/ScoreBoardHeader';
import DetailedGameStats from './scoreboard/DetailedGameStats';
import GameStatsPanel from './scoreboard/GameStatsPanel';
import DesktopSidePanel from './scoreboard/DesktopSidePanel';
import ScoreTableView from './ScoreTableView';
import AdSenseLayout from './game/AdSenseLayout';
import { useScoreBoardLogic } from './scoreboard/ScoreBoardHooks';
import FunPlayerCard from './scoreboard/FunPlayerCard';

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
  console.log('ScoreBoard: Component rendered', { 
    playersCount: players?.length, 
    roundHistoryLength: roundHistory?.length,
    scoreLimit,
    showGameEndConfirmation
  });
  
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // Vérification de sécurité des props
  if (!players || players.length === 0) {
    console.warn('ScoreBoard: No players provided');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-xl p-8 shadow-lg">
          <p className="text-gray-700 text-lg">Aucun joueur trouvé</p>
          <p className="text-gray-500 text-sm mt-2">Créez une nouvelle partie pour commencer</p>
        </div>
      </div>
    );
  }

  const {
    currentView,
    sortedPlayers,
    roundCount,
    handleAddRound,
    handleUndo,
    handleEndGame,
    handleViewChange
  } = useScoreBoardLogic({
    players,
    roundHistory,
    onUndoLastRound,
    onEndGame,
    openScoreForm
  });

  const handlePlayerSelect = (player: any) => {
    setSelectedPlayer(player);
  };

  return (
    <AdSenseLayout
      isSignedIn={false}
      adsEnabled={true}
      isLoaded={true}
    >
      <div className="min-h-screen bg-gradient-to-br from-dutch-blue/5 via-white to-dutch-purple/5 pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Professeur Cartouche - En haut et centré */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 px-4 pt-4"
          >
            <EnhancedAICommentator 
              players={players}
              roundCount={roundCount}
              scoreLimit={scoreLimit}
            />
          </motion.div>

          {/* Layout Desktop avec panneau latéral */}
          <div className="flex gap-6 px-4">
            {/* Contenu principal */}
            <div className="flex-1 space-y-6">
              {/* Toggle Liste/Tableau avec style glassmorphisme */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <ScoreBoardHeader
                  currentView={currentView}
                  onViewChange={handleViewChange}
                />
              </motion.div>

              {/* Contenu principal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {currentView === 'list' ? (
                  <div className="space-y-4">
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
                  </div>
                ) : (
                  <ScoreTableView 
                    players={players} 
                    roundHistory={roundHistory}
                  />
                )}
              </motion.div>

              {/* Statistiques détaillées de la partie */}
              <DetailedGameStats
                players={players}
                roundCount={roundCount}
                scoreLimit={scoreLimit}
                roundHistory={roundHistory}
              />
            </div>

            {/* Panneau latéral desktop */}
            <div className="hidden lg:block w-80">
              <DesktopSidePanel
                showAICommentator={false}
                players={players}
                roundHistory={roundHistory}
                selectedPlayer={selectedPlayer}
              />
              
              <div className="mt-6">
                <GameStatsPanel
                  players={players}
                  roundHistory={roundHistory}
                />
              </div>
            </div>
          </div>

          {/* End Game Confirmation */}
          <EndGameConfirmationDialog
            isOpen={showGameEndConfirmation}
            onConfirm={onConfirmEndGame}
            onCancel={onCancelEndGame}
          />
        </div>

        {/* Sticky Action Buttons */}
        <StickyActionButtons
          onAddRound={handleAddRound}
          onUndoLastRound={handleUndo}
          onEndGame={handleEndGame}
          canUndo={roundHistory.length > 0}
        />
      </div>
    </AdSenseLayout>
  );
};

export default React.memo(ScoreBoard);
