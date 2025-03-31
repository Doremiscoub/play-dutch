
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, Flag, BarChart3, Home, RotateCcw, Clock, 
  LineChart, TableIcon, Medal, PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, ScoreBoardProps } from '@/types';
import NewRoundModal from './NewRoundModal';
import PlayerScoreCard from './PlayerScoreCard';
import PodiumView from './PodiumView';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import PlayerBadges from './PlayerBadges';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ScoreTableView from './ScoreTableView';
import GameSettings from './GameSettings';
import { useUser } from '@clerk/clerk-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import AnimatedBackground from './AnimatedBackground';

const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  players, 
  onAddRound, 
  onEndGame, 
  onUndoLastRound,
  roundHistory = [],
  isMultiplayer = false,
  showGameEndConfirmation = false,
  onConfirmEndGame,
  onCancelEndGame
}) => {
  const [showNewRoundModal, setShowNewRoundModal] = useState(false);
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const savedSetting = localStorage.getItem('dutch_sound_enabled');
    return savedSetting !== 'false'; // default to true if not set
  });
  const [view, setView] = useState<'podium' | 'table'>('podium');
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  
  const totalRounds = players.length > 0 ? players[0].rounds.length : 0;
  
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
    onAddRound(scores, dutchPlayerId);
    setShowNewRoundModal(false);
  };
  
  const handleCloseNewRoundModal = () => {
    setShowNewRoundModal(false);
  };
  
  const handleUndoLastRound = () => {
    onUndoLastRound();
  };
  
  const handleToggleSound = () => {
    const newSetting = !soundEnabled;
    setSoundEnabled(newSetting);
    localStorage.setItem('dutch_sound_enabled', newSetting.toString());
    toast.success(newSetting ? 'Sons activés' : 'Sons désactivés');
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 pb-24 md:pb-4 relative">
      {/* Animated background similar to LocalGameSetup */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="subtle" />
      </div>
      
      <AnimatePresence>
        {showNewRoundModal && (
          <NewRoundModal 
            players={players}
            onClose={handleCloseNewRoundModal}
            onSave={handleAddRound}
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        className="mb-6 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-2 bg-white/70 backdrop-blur-md shadow-sm rounded-xl p-3 border border-white/30">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm border border-white/30 shadow-sm mr-3"
              onClick={() => navigate('/')}
            >
              <Home className="h-5 w-5 text-dutch-blue" />
            </Button>
            
            <h1 className="text-xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
              Score
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <GameSettings 
              soundEnabled={soundEnabled} 
              setSoundEnabled={handleToggleSound} 
            />
          </div>
        </div>
        
        <motion.div 
          className="flex items-center justify-between mb-4 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-white/20">
            <Clock className="h-4 w-4 text-dutch-blue mr-2" />
            <span className="text-sm text-gray-700 font-medium">
              {totalRounds} {totalRounds <= 1 ? 'manche' : 'manches'}
            </span>
          </div>
          
          <AnimatePresence>
            {totalRounds > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="px-3 py-1.5 rounded-full bg-white/60 hover:bg-white/70 backdrop-blur-sm border border-white/30 shadow-sm"
                  onClick={handleUndoLastRound}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5 text-dutch-blue" />
                  <span className="text-xs text-gray-700 font-medium">Annuler dernière manche</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="px-2 w-full">
            <ToggleGroup 
              type="single" 
              value={view} 
              onValueChange={(value) => value && setView(value as 'podium' | 'table')} 
              className="w-full bg-white/60 backdrop-blur-sm rounded-xl p-1.5 shadow-sm border border-white/20"
            >
              <ToggleGroupItem 
                value="podium" 
                className={cn(
                  "flex-1 data-[state=on]:bg-white data-[state=on]:shadow-sm rounded-lg text-sm py-2 font-medium",
                  view === "podium" ? "text-dutch-blue" : "text-gray-600"
                )}
              >
                <Medal className="h-4 w-4 mr-1.5" />
                Podium
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="table" 
                className={cn(
                  "flex-1 data-[state=on]:bg-white data-[state=on]:shadow-sm rounded-lg text-sm py-2 font-medium",
                  view === "table" ? "text-dutch-blue" : "text-gray-600"
                )}
              >
                <TableIcon className="h-4 w-4 mr-1.5" />
                Tableau
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="dutch-card backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden p-6">
        {view === 'podium' ? (
          <div>
            <motion.div 
              className="space-y-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {sortedPlayers.map((player, index) => (
                <PlayerScoreCard 
                  key={player.id}
                  player={player}
                  position={index + 1}
                  showRounds={true}
                />
              ))}
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ScoreTableView 
              players={players} 
              roundHistory={roundHistory}
            />
          </motion.div>
        )}
      </div>
      
      {/* Alert Dialog for game end confirmation */}
      <AlertDialog open={showGameEndConfirmation} onOpenChange={onCancelEndGame}>
        <AlertDialogContent className="bg-white/90 backdrop-blur-md rounded-xl border border-white/30">
          <AlertDialogHeader>
            <AlertDialogTitle>Terminer la partie ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir terminer cette partie ? Le podium sera affiché et les résultats seront enregistrés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Annuler</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-dutch-blue text-white hover:bg-dutch-blue/90 rounded-full"
              onClick={onConfirmEndGame}
            >
              Terminer la partie
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Action buttons */}
      <motion.div
        className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        {/* End Game Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={onEndGame}
            size="icon"
            variant="game-control"
            className="shadow-lg"
            aria-label="Terminer la partie"
          >
            <Flag className="h-5 w-5" />
          </Button>
        </motion.div>
        
        {/* Stats Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
            <DialogTrigger asChild>
              <Button 
                size="icon"
                variant="game-control"
                className="shadow-lg"
                aria-label="Statistiques"
              >
                <BarChart3 className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl bg-white/80 backdrop-blur-md border border-white/30">
              <DialogHeader>
                <DialogTitle>Statistiques de la partie</DialogTitle>
                <DialogDescription>
                  Détails et performances des joueurs
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                {sortedPlayers.map((player) => (
                  <div key={player.id} className="bg-white/60 p-4 rounded-xl shadow-sm border border-white/30">
                    <h3 className="font-medium text-lg mb-1">{player.name}</h3>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="text-sm">
                        <p className="text-gray-500">Moyenne</p>
                        <p className="font-medium">{player.stats?.averageScore || '-'} pts</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-500">Dutch</p>
                        <p className="font-medium">{player.stats?.dutchCount || 0} fois</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-500">Meilleur score</p>
                        <p className="font-medium">{player.stats?.bestRound !== null ? `${player.stats?.bestRound} pts` : '-'}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-500">Pire score</p>
                        <p className="font-medium">{player.stats?.worstRound !== null ? `${player.stats?.worstRound} pts` : '-'}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <PlayerBadges player={player} />
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
        
        {/* New Round Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={() => setShowNewRoundModal(true)}
            size="lg"
            variant="game-action"
            className="rounded-full shadow-xl flex items-center justify-center gap-2 px-5 py-3 pr-6"
            aria-label="Nouvelle manche"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-dutch-orange via-dutch-pink to-dutch-orange rounded-full"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <PlusCircle className="h-5 w-5 z-10 mr-1" />
            <span className="text-sm font-medium z-10">Nouvelle manche</span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScoreBoard;
