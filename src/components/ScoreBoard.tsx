
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trophy, BarChart3, History, Home, Crown, Trash2, Music, Bell, VolumeX, ArrowRight, RotateCcw, Clock, Award, LineChart, TrendingDown, TrendingUp, Heart, Medal, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, GameRound, PlayerStatistics } from '@/types';
import PlayerScoreCard from './PlayerScoreCard';
import NewRoundModal from './NewRoundModal';
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
import ThemeSelector from './ThemeSelector';
import PlayerBadges from './PlayerBadges';
import QuickGuide from './QuickGuide';

interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onEndGame: () => void;
  onUndoLastRound: () => void;
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  players, 
  onAddRound, 
  onEndGame, 
  onUndoLastRound,
  roundHistory = [] 
}) => {
  const [showNewRoundModal, setShowNewRoundModal] = useState(false);
  const [sortBy, setSortBy] = useState<'position' | 'name'>('position');
  const [showRounds, setShowRounds] = useState<boolean>(true);
  const [lastRoundScores, setLastRoundScores] = useState<{[key: string]: number}>({});
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('dutch_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showRoundDetails, setShowRoundDetails] = useState<number | null>(null);
  const [showPodium, setShowPodium] = useState(false);
  const [showEndGameDialog, setShowEndGameDialog] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.setItem('dutch_sound_enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);
  
  // Calculate the round count based on the first player (all players have the same number of rounds)
  const roundCount = players.length > 0 ? players[0].rounds.length : 0;
  
  // Update last round scores whenever players change
  useEffect(() => {
    if (roundCount > 0) {
      const newLastRoundScores: {[key: string]: number} = {};
      players.forEach(player => {
        if (player.rounds.length > 0) {
          newLastRoundScores[player.id] = player.rounds[player.rounds.length - 1].score;
        }
      });
      setLastRoundScores(newLastRoundScores);
    }
  }, [players, roundCount]);

  const sortedPlayers = [...players].sort((a, b) => {
    if (sortBy === 'position') {
      return a.totalScore - b.totalScore;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const gameOver = players.some(player => player.totalScore >= 100);
  
  const winner = gameOver 
    ? sortedPlayers[0] 
    : null;

  const playSound = (soundName: 'add' | 'undo' | 'win') => {
    if (!soundEnabled) return;
    
    const sounds = {
      add: new Audio('/sounds/card-sound.mp3'),
      undo: new Audio('/sounds/undo-sound.mp3'),
      win: new Audio('/sounds/win-sound.mp3')
    };
    
    try {
      sounds[soundName].play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  
  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
    onAddRound(scores, dutchPlayerId);
    if (players.some(player => (player.totalScore + scores[players.indexOf(player)]) >= 100)) {
      playSound('win');
    } else {
      playSound('add');
    }
  };
  
  const handleUndoLastRound = () => {
    onUndoLastRound();
    playSound('undo');
  };

  const handleEndGame = () => {
    setShowEndGameDialog(false);
    setShowPodium(true);
  };

  const handleFinishGame = () => {
    setShowPodium(false);
    onEndGame();
  };

  // Get round details for a specific round index
  const getRoundDetails = (roundIndex: number) => {
    if (roundIndex < 0 || roundIndex >= roundCount) return null;
    
    return players.map(player => ({
      playerName: player.name,
      score: player.rounds[roundIndex].score,
      isDutch: player.rounds[roundIndex].isDutch,
      totalScoreAfter: player.rounds.slice(0, roundIndex + 1).reduce((sum, r) => sum + r.score, 0)
    }));
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-4 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dutch-blue">Tableau des scores</h1>
        <div className="flex gap-2">
          <ThemeSelector />
          <QuickGuide />
          <Button 
            variant="outline" 
            size="icon"
            rounded="full"
            className="bg-white/80 backdrop-blur border-white/30 shadow-md hover:shadow-lg"
            onClick={() => setSortBy(sortBy === 'position' ? 'name' : 'position')}
            aria-label={sortBy === 'position' ? 'Trier par nom' : 'Trier par score'}
          >
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            rounded="full"
            className="bg-white/80 backdrop-blur border-white/30 shadow-md hover:shadow-lg"
            onClick={() => setShowRounds(!showRounds)}
            aria-label={showRounds ? 'Masquer les manches' : 'Afficher les manches'}
          >
            <History className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            rounded="full"
            className="bg-white/80 backdrop-blur border-white/30 shadow-md hover:shadow-lg"
            onClick={() => navigate('/')}
            aria-label="Retour à l'accueil"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {roundCount > 0 && (
        <div className="mb-4 flex items-center justify-between">
          <span className="bg-dutch-blue/80 backdrop-blur text-white text-sm font-medium px-4 py-1 rounded-full 
                         flex items-center shadow-md">
            <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
            Manche {roundCount}
          </span>
          
          {roundCount > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              rounded="full"
              className="text-dutch-orange border-dutch-orange/30 text-xs bg-dutch-orange/5 hover:bg-dutch-orange/10 shadow-sm"
              onClick={handleUndoLastRound}
            >
              <RotateCcw className="h-3 w-3 mr-1" aria-hidden="true" />
              Annuler dernière manche
            </Button>
          )}
        </div>
      )}

      <AnimatePresence>
        {gameOver && (
          <motion.div 
            className="mb-6 rounded-3xl bg-gradient-to-r from-dutch-purple/80 to-dutch-blue/80 backdrop-blur-md border border-white/20 p-6 text-white shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex items-center gap-3">
              <Trophy className="h-10 w-10 text-dutch-yellow" aria-hidden="true" />
              <div>
                <h2 className="text-xl font-bold">Partie terminée !</h2>
                <p className="text-white/90">
                  {winner ? `${winner.name} gagne avec ${winner.totalScore} points !` : 'Match nul !'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button 
                onClick={() => setShowPodium(true)}
                className="bg-white text-dutch-blue hover:bg-white/90 shadow-md"
                rounded="full"
              >
                Voir le podium
              </Button>
              <Button 
                onClick={onEndGame}
                className="bg-dutch-orange text-white hover:bg-dutch-orange/90 shadow-md"
                rounded="full"
              >
                Nouvelle partie
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3 mb-6">
        {sortedPlayers.map((player, index) => (
          <PlayerScoreCard 
            key={player.id}
            player={player}
            position={index + 1}
            isWinner={gameOver && index === 0}
            showRounds={showRounds}
            lastRoundScore={lastRoundScores[player.id]}
            onRoundClick={(roundIndex) => setShowRoundDetails(roundIndex)}
          />
        ))}
      </div>

      {/* Round details dialog */}
      <Dialog open={showRoundDetails !== null} onOpenChange={() => setShowRoundDetails(null)}>
        <DialogContent className="sm:max-w-md rounded-3xl bg-white/80 backdrop-blur-md border border-white/30 shadow-xl">
          <DialogHeader>
            <DialogTitle>Détails de la manche {showRoundDetails !== null ? showRoundDetails + 1 : ''}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {showRoundDetails !== null && getRoundDetails(showRoundDetails)?.map((detail, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2">
                  <Avatar className={`h-8 w-8 ${detail.isDutch ? 'bg-dutch-orange' : 'bg-gray-200'}`}>
                    <AvatarFallback>{detail.playerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{detail.playerName}</span>
                  {detail.isDutch && <span className="text-xs bg-dutch-orange/20 text-dutch-orange px-2 py-0.5 rounded-full">Dutch</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{detail.score}</span>
                  <span className="text-xs text-gray-500">Total: {detail.totalScoreAfter}</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* End game confirmation dialog */}
      <AlertDialog open={showEndGameDialog} onOpenChange={setShowEndGameDialog}>
        <AlertDialogContent className="rounded-3xl bg-white/80 backdrop-blur-md border border-white/30 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Terminer la partie</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir terminer cette partie avant la fin naturelle ? Vous pourrez voir le podium et les statistiques finales.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleEndGame}
              className="rounded-full bg-dutch-blue hover:bg-dutch-blue/90 shadow-md"
            >
              Voir le podium
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Podium view */}
      <AnimatePresence>
        {showPodium && (
          <PodiumView 
            players={players} 
            onClose={handleFinishGame}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center">
        <Button 
          onClick={() => setShowNewRoundModal(true)}
          disabled={gameOver}
          className="dutch-button bg-gradient-to-r from-dutch-orange to-dutch-pink hover:bg-dutch-orange/90 px-6 py-6 backdrop-blur-md shadow-lg rounded-full"
        >
          <Plus className="mr-2 h-5 w-5" aria-hidden="true" /> Nouvelle manche
        </Button>
      </div>

      <AnimatePresence>
        {showNewRoundModal && (
          <NewRoundModal 
            players={players}
            onClose={() => setShowNewRoundModal(false)}
            onSave={(scores, dutchPlayerId) => {
              handleAddRound(scores, dutchPlayerId);
              setShowNewRoundModal(false);
            }}
          />
        )}
      </AnimatePresence>
      
      <div className="fixed right-4 bottom-20 flex flex-col gap-2">
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogTrigger asChild>
            <Button 
              className="w-12 h-12 rounded-full shadow-lg bg-dutch-pink text-white hover:bg-dutch-pink/90 flex items-center justify-center backdrop-blur-md"
              aria-label="Paramètres"
            >
              {soundEnabled ? <Bell className="h-5 w-5" aria-hidden="true" /> : <VolumeX className="h-5 w-5" aria-hidden="true" />}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-3xl bg-white/80 backdrop-blur-md border border-white/30 shadow-xl">
            <DialogHeader>
              <DialogTitle>Paramètres de la partie</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sound-toggle">Sons activés</Label>
                <Switch 
                  id="sound-toggle" 
                  checked={soundEnabled} 
                  onCheckedChange={setSoundEnabled} 
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Wrap the AlertDialogTrigger with AlertDialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              className="w-12 h-12 rounded-full shadow-lg bg-dutch-blue/90 text-white hover:bg-dutch-blue flex items-center justify-center backdrop-blur-md"
              aria-label="Terminer la partie"
            >
              <Flag className="h-5 w-5" aria-hidden="true" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-3xl bg-white/80 backdrop-blur-md border border-white/30 shadow-xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Terminer la partie</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir terminer cette partie avant la fin naturelle ? Vous pourrez voir le podium et les statistiques finales.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-full">Annuler</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleEndGame}
                className="rounded-full bg-dutch-blue hover:bg-dutch-blue/90 shadow-md"
              >
                Voir le podium
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              className="w-12 h-12 rounded-full shadow-lg bg-dutch-purple/90 text-white hover:bg-dutch-purple flex items-center justify-center backdrop-blur-md"
              aria-label="Statistiques"
            >
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto rounded-l-3xl bg-white/80 backdrop-blur-md border border-white/30 shadow-xl">
            <SheetHeader>
              <SheetTitle>Statistiques de la partie</SheetTitle>
            </SheetHeader>
            <Tabs defaultValue="stats" className="mt-6">
              <TabsList className="grid w-full grid-cols-2 bg-white/20 backdrop-blur-sm rounded-full">
                <TabsTrigger value="stats" className="rounded-full data-[state=active]:bg-white/80">Joueurs</TabsTrigger>
                <TabsTrigger value="trends" className="rounded-full data-[state=active]:bg-white/80">Tendances</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stats" className="space-y-4 mt-4">
                <div className="dutch-card bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm rounded-2xl">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-1 text-dutch-blue" aria-hidden="true" />
                    Meilleur score par manche
                  </h3>
                  {players.map(player => {
                    const bestRound = player.stats?.bestRound || (player.rounds.length > 0 
                      ? Math.min(...player.rounds.map(r => r.score).filter(s => s > 0))
                      : null);
                    return (
                      <div key={player.id} className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{player.name}</span>
                          <PlayerBadges player={player} />
                        </div>
                        <span className="font-medium">
                          {bestRound !== null ? bestRound : '-'}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="dutch-card bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm rounded-2xl">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <TrendingDown className="h-4 w-4 mr-1 text-dutch-orange" aria-hidden="true" />
                    Nombre de fois "Dutch"
                  </h3>
                  {players.map(player => {
                    const dutchCount = player.stats?.dutchCount || player.rounds.filter(r => r.isDutch).length;
                    return (
                      <div key={player.id} className="flex justify-between items-center mb-1">
                        <span className="text-sm">{player.name}</span>
                        <span className="font-medium">{dutchCount}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="dutch-card bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm rounded-2xl">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-dutch-purple" aria-hidden="true" />
                    Pire score par manche
                  </h3>
                  {players.map(player => {
                    const worstRound = player.stats?.worstRound || (player.rounds.length > 0 
                      ? Math.max(...player.rounds.map(r => r.score))
                      : null);
                    return (
                      <div key={player.id} className="flex justify-between items-center mb-1">
                        <span className="text-sm">{player.name}</span>
                        <span className="font-medium">
                          {worstRound !== null ? worstRound : '-'}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="dutch-card bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm rounded-2xl">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <LineChart className="h-4 w-4 mr-1 text-dutch-blue" aria-hidden="true" />
                    Score moyen par manche
                  </h3>
                  {players.map(player => {
                    const avgScore = player.stats?.averageScore || (player.rounds.length > 0 
                      ? Math.round(player.rounds.reduce((sum, r) => sum + r.score, 0) / player.rounds.length * 10) / 10
                      : 0);
                    return (
                      <div key={player.id} className="flex justify-between items-center mb-1">
                        <span className="text-sm">{player.name}</span>
                        <span className="font-medium">
                          {player.rounds.length > 0 ? avgScore.toFixed(1) : '-'}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                {players.some(p => p.stats?.improvementRate !== undefined) && (
                  <div className="dutch-card bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm rounded-2xl">
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Heart className="h-4 w-4 mr-1 text-dutch-pink" aria-hidden="true" />
                      Tendance d'amélioration
                    </h3>
                    {players.map(player => {
                      if (!player.stats?.improvementRate) return null;
                      
                      return (
                        <div key={player.id} className="flex justify-between items-center mb-1">
                          <span className="text-sm">{player.name}</span>
                          <div className="flex items-center gap-1">
                            {player.stats.improvementRate < 0 ? (
                              <TrendingDown className="h-3 w-3 text-green-500" />
                            ) : player.stats.improvementRate > 0 ? (
                              <TrendingUp className="h-3 w-3 text-red-500" />
                            ) : (
                              <span>-</span>
                            )}
                            <span className={`font-medium ${player.stats.improvementRate < 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {player.stats.improvementRate !== 0 ? Math.abs(Math.round(player.stats.improvementRate * 10) / 10).toFixed(1) : '-'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="trends" className="mt-4">
                <div className="dutch-card bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm rounded-2xl">
                  <h3 className="text-sm font-medium mb-2">Progression des scores</h3>
                  <div className="h-40 overflow-hidden">
                    {players.length > 0 && (
                      <PlayerScoreProgress players={players} />
                    )}
                  </div>
                </div>
                
                <div className="dutch-card mt-4 bg-white/60 backdrop-blur-sm border border-white/30 shadow-sm rounded-2xl">
                  <h3 className="text-sm font-medium mb-2">Historique des manches</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {Array.from({length: roundCount}).map((_, roundIndex) => {
                      const roundNumber = roundIndex + 1;
                      const roundDetails = getRoundDetails(roundIndex);
                      const bestScore = roundDetails ? Math.min(...roundDetails.map(d => d.score)) : 0;
                      const worstScore = roundDetails ? Math.max(...roundDetails.map(d => d.score)) : 0;
                      
                      return (
                        <div 
                          key={roundIndex} 
                          className="p-2 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => setShowRoundDetails(roundIndex)}
                        >
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-500">Manche {roundNumber}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-5 w-5 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowRoundDetails(roundIndex);
                              }}
                            >
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            {roundDetails?.map((detail, i) => (
                              <div 
                                key={i} 
                                className={`
                                  w-6 h-6 rounded-full flex items-center justify-center text-xs
                                  ${detail.isDutch ? 'bg-dutch-orange text-white' : 
                                    detail.score === bestScore ? 'bg-green-100 text-green-800 ring-1 ring-green-400' :
                                    detail.score === worstScore ? 'bg-red-100 text-red-800' : 'bg-gray-100'}
                                `}
                                title={`${detail.playerName}: ${detail.score}`}
                              >
                                {detail.score}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>
      </div>
    </motion.div>
  );
};

const PlayerScoreProgress: React.FC<{ players: Player[] }> = ({ players }) => {
  const colors = ['#1EAEDB', '#F97316', '#8B5CF6', '#D946EF', '#10B981', '#FBBF24'];
  
  const roundData = [];
  const maxRounds = Math.max(...players.map(p => p.rounds.length));
  
  for (let i = 0; i < maxRounds; i++) {
    const roundScores: {[key: string]: number} = {};
    
    players.forEach((player, playerIndex) => {
      let cumulativeScore = 0;
      for (let j = 0; j <= i; j++) {
        if (player.rounds[j]) {
          cumulativeScore += player.rounds[j].score;
        }
      }
      roundScores[player.name] = cumulativeScore;
    });
    
    roundData.push({ round: i + 1, ...roundScores });
  }
  
  if (roundData.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400">Pas encore de manches jouées</div>;
  }
  
  return (
    <div className="relative h-full">
      <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500">
        {roundData.map((data, i) => (
          <div key={i} className="text-center">{data.round}</div>
        ))}
      </div>
      
      <div className="absolute top-0 left-0 h-full w-full">
        {[0, 25, 50, 75, 100].map((value, i) => (
          <div 
            key={i} 
            className="absolute w-full border-t border-gray-200" 
            style={{ bottom: `${(value/100) * 90}%` }}
          >
            <span className="absolute -left-5 -top-2 text-xs text-gray-500">{value}</span>
          </div>
        ))}
      </div>
      
      <svg className="w-full h-[90%]" viewBox={`0 0 ${roundData.length - 1} 100`} preserveAspectRatio="none">
        {players.map((player, playerIndex) => {
          let path = `M 0 ${100 - Math.min((roundData[0]?.[player.name] || 0), 100)}`;
          
          for (let i = 1; i < roundData.length; i++) {
            const score = Math.min((roundData[i]?.[player.name] || 0), 100);
            path += ` L ${i} ${100 - score}`;
          }
          
          return (
            <g key={player.id}>
              <path 
                d={path} 
                fill="none" 
                stroke={colors[playerIndex % colors.length]} 
                strokeWidth="2"
              />
              {roundData.map((data, i) => (
                <circle 
                  key={i}
                  cx={i} 
                  cy={100 - Math.min((data[player.name] || 0), 100)} 
                  r="0.5"
                  fill={colors[playerIndex % colors.length]}
                />
              ))}
            </g>
          );
        })}
      </svg>
      
      <div className="absolute top-0 right-0 flex flex-col gap-1">
        {players.map((player, index) => (
          <div key={player.id} className="flex items-center gap-1 text-xs">
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: colors[index % colors.length] }}
            ></span>
            <span>{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
