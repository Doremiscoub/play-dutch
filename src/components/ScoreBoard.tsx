
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import NewRoundModal from './NewRoundModal';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, List, Medal, BarChartBig, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PlayerScoreCard from './PlayerScoreCard';
import ProfCartouche from './ProfCartouche';
import GameActionButtons from './GameActionButtons';
import ScoreHistoryTable from './ScoreHistoryTable';
import PlayerStatsTable from './PlayerStatsTable';
import DetailedPlayerStats from './DetailedPlayerStats';

interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onEndGame: () => void;
  onUndoLastRound: () => void;
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  showGameEndConfirmation: boolean;
  onConfirmEndGame: () => void;
  onCancelEndGame: () => void;
  isMultiplayer: boolean;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  onAddRound,
  onEndGame,
  onUndoLastRound,
  roundHistory,
  showGameEndConfirmation,
  onConfirmEndGame,
  onCancelEndGame,
  isMultiplayer
}) => {
  const [showStats, setShowStats] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [scores, setScores] = useState<number[]>(Array(players.length).fill(0));
  const [dutchPlayerId, setDutchPlayerId] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'podium' | 'table'>('podium');
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/');
  };

  const handleAddRound = () => {
    onAddRound(scores, dutchPlayerId);
    setShowModal(false);
    setScores(Array(players.length).fill(0));
    setDutchPlayerId(undefined);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handleTogglePlayerStats = (playerId: string) => {
    setExpandedPlayer(expandedPlayer === playerId ? null : playerId);
  };

  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  return (
    <div className="min-h-screen pb-20">
      {/* En-tête */}
      <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="container px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoHome}
              className="rounded-full hover:bg-gray-100/70"
            >
              <Home className="h-5 w-5" />
            </Button>
            
            <h1 className="text-xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
              Scores
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-2">
              <Switch
                id="view-mode"
                checked={viewMode === 'table'}
                onCheckedChange={(checked) => setViewMode(checked ? 'table' : 'podium')}
                className="data-[state=checked]:bg-dutch-blue"
              />
              <Label htmlFor="view-mode" className="text-sm font-medium">
                {viewMode === 'podium' ? (
                  <Medal className="h-4 w-4 text-dutch-blue" />
                ) : (
                  <List className="h-4 w-4 text-dutch-blue" />
                )}
              </Label>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowStats(true)}
              className="rounded-full hover:bg-gray-100/70"
            >
              <BarChartBig className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container px-4 py-4">
        {viewMode === 'podium' ? (
          <div className="space-y-4">
            <ProfCartouche 
              players={players} 
              roundNumber={players.length > 0 ? players[0].rounds.length : 0}
              view="podium"
            />
            
            <AnimatePresence>
              {sortedPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <PlayerScoreCard
                    player={player}
                    position={index + 1}
                    isLeader={index === 0}
                    totalPlayers={players.length}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-4">
            <ProfCartouche 
              players={players} 
              roundNumber={players.length > 0 ? players[0].rounds.length : 0}
              view="table"
            />
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2 bg-gradient-to-r from-dutch-blue to-dutch-orange bg-clip-text text-transparent">
                  Historique des manches
                </h2>
                <ScoreHistoryTable 
                  players={players}
                  roundHistory={roundHistory}
                />
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-2 bg-gradient-to-r from-dutch-blue to-dutch-orange bg-clip-text text-transparent">
                  Statistiques des joueurs
                </h2>
                <PlayerStatsTable players={players} />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-lg font-semibold mb-2 bg-gradient-to-r from-dutch-blue to-dutch-orange bg-clip-text text-transparent">
                  Détails par joueur
                </h2>
                
                {sortedPlayers.map((player, index) => (
                  <DetailedPlayerStats
                    key={player.id}
                    player={player}
                    isExpanded={expandedPlayer === player.id}
                    onToggle={() => handleTogglePlayerStats(player.id)}
                    isFirst={index === 0}
                    isLast={index === sortedPlayers.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Boutons d'action fixes */}
      <GameActionButtons
        onUndoLastRound={onUndoLastRound}
        onEndGame={onEndGame}
        onAddRound={handleOpenModal}
      />
      
      {/* Modal nouvelle manche */}
      <AnimatePresence>
        {showModal && (
          <NewRoundModal
            players={players}
            onClose={handleCloseModal}
            onAddRound={handleAddRound}
            setScores={setScores}
            setDutchPlayerId={setDutchPlayerId}
            scores={scores}
            dutchPlayerId={dutchPlayerId}
            modalRef={modalRef}
          />
        )}
      </AnimatePresence>
      
      {/* Dialog de confirmation de fin de partie */}
      <Dialog open={showGameEndConfirmation} onOpenChange={onCancelEndGame}>
        <DialogContent className="bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
              Terminer la partie ?
            </DialogTitle>
            <DialogDescription className="text-gray-700">
              Cette action terminera la partie actuelle et affichera les résultats finaux.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex gap-3 sm:justify-end mt-4">
            <Button
              variant="dutch-outline"
              onClick={onCancelEndGame}
              className="flex-1 sm:flex-initial"
            >
              Annuler
            </Button>
            <Button
              variant="dutch-orange"
              onClick={onConfirmEndGame}
              className="flex-1 sm:flex-initial"
            >
              Terminer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Sidebar des statistiques */}
      <Sheet open={showStats} onOpenChange={setShowStats}>
        <SheetContent 
          className="bg-white/90 backdrop-blur-md border-l border-white/30 w-full max-w-md"
          side="right"
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent text-xl">
              Stats du match
            </SheetTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4 rounded-full hover:bg-gray-100/50" 
              onClick={() => setShowStats(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetHeader>
          
          <div className="space-y-4 pr-2 max-h-[85vh] overflow-y-auto pb-6">
            {sortedPlayers.map((player, index) => (
              <DetailedPlayerStats
                key={player.id}
                player={player}
                isExpanded={true}
                onToggle={() => {}}
                isFirst={index === 0}
                isLast={index === sortedPlayers.length - 1}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ScoreBoard;
