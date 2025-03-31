
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, Trophy, BarChart3, Flag, Home, RotateCcw, Clock, Award, 
  LineChart, TrendingDown, TrendingUp, Heart, Settings, Table as TableIcon, Medal, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, ScoreBoardProps } from '@/types';
import NewRoundModal from './NewRoundModal';
import PlayerScoreCard from './PlayerScoreCard';
import PodiumView from './PodiumView';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';
import PlayerBadges from './PlayerBadges';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ScoreTableView from './ScoreTableView';
import GameSettings from './GameSettings';
import ThemeSelector from './ThemeSelector';

const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  players, 
  onAddRound, 
  onEndGame, 
  onUndoLastRound,
  roundHistory = [],
  isMultiplayer = false
}) => {
  const [showNewRoundModal, setShowNewRoundModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const savedSetting = localStorage.getItem('dutch_sound_enabled');
    return savedSetting !== 'false'; // default to true if not set
  });
  const [view, setView] = useState<'podium' | 'table'>('podium');
  const navigate = useNavigate();
  
  const totalRounds = players.length > 0 ? players[0].rounds.length : 0;
  
  // Get the current sort order of players (by total score)
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
  
  // Function to close podium view (required by PodiumView component)
  const handleClosePodium = () => {
    // No action needed in this context, but required by the component
  };
  
  // Show the podium only after the first round
  const showPodium = totalRounds > 0;
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 pb-24 md:pb-4">
      <AnimatePresence>
        {showNewRoundModal && (
          <NewRoundModal 
            players={players}
            onClose={handleCloseNewRoundModal}
            onSave={handleAddRound}
          />
        )}
      </AnimatePresence>
      
      {/* Header with navigation and options */}
      <motion.div 
        className="mb-6 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-2 bg-white/70 backdrop-blur-md shadow-sm rounded-xl p-2 border border-white/30">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-sm border border-white/30 shadow-sm"
              onClick={() => navigate('/')}
            >
              <Home className="h-5 w-5 text-dutch-blue" />
            </Button>
            
            <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
              Score
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Theme Selector */}
            <div>
              <ThemeSelector />
            </div>
            
            {/* Settings Button */}
            <GameSettings 
              soundEnabled={soundEnabled} 
              setSoundEnabled={handleToggleSound} 
            />
          </div>
        </div>
        
        {/* Round Information */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-600">
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
                  className="px-2 rounded-full bg-white/50 hover:bg-white/70 backdrop-blur-sm border border-white/30"
                  onClick={handleUndoLastRound}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span className="text-xs text-gray-600">Annuler dernière manche</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <div className="px-2">
            <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as 'podium' | 'table')} className="h-8">
              <ToggleGroupItem value="podium" className="text-xs px-3 py-1">
                <Medal className="h-3 w-3 mr-1" />
                Podium
              </ToggleGroupItem>
              <ToggleGroupItem value="table" className="text-xs px-3 py-1">
                <TableIcon className="h-3 w-3 mr-1" />
                Tableau
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        
        {/* Alert Dialogs */}
        <div className="hidden">
          <AlertDialog>
            <AlertDialogTrigger>
              Open
            </AlertDialogTrigger>
            <AlertDialogContent>Test</AlertDialogContent>
          </AlertDialog>
        </div>
        
        <div className="hidden">
          <Sheet>
            <SheetTrigger>
              Open
            </SheetTrigger>
            <SheetContent>Test</SheetContent>
          </Sheet>
        </div>
      </motion.div>
      
      {/* Game Content */}
      <div>
        {view === 'podium' ? (
          // Podium View
          <div>
            {/* Player Cards */}
            <div className="space-y-4 mb-6">
              {sortedPlayers.map((player, index) => (
                <PlayerScoreCard 
                  key={player.id}
                  player={player}
                  position={index + 1}
                  showRounds={true}
                />
              ))}
            </div>
            
            {/* Podium visualization after first round */}
            {showPodium && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <PodiumView 
                  players={sortedPlayers.slice(0, 3)}
                  onClose={handleClosePodium}
                  isMultiplayer={isMultiplayer}
                />
              </motion.div>
            )}
          </div>
        ) : (
          // Table View
          <ScoreTableView 
            players={players} 
            roundHistory={roundHistory || []}
          />
        )}
      </div>
      
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={() => setShowNewRoundModal(true)}
          size="lg"
          className="rounded-full shadow-lg group relative overflow-hidden w-14 h-14 flex items-center justify-center"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-dutch-orange via-dutch-pink to-dutch-orange"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <Plus className="h-6 w-6 z-10 group-hover:rotate-180 transition-transform duration-300" />
        </Button>
      </motion.div>
    </div>
  );
};

export default ScoreBoard;
