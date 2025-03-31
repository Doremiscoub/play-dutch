
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trophy, BarChart3, History, Home, Crown, Trash2, Music, Bell, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, GameRound } from '@/types';
import PlayerScoreCard from './PlayerScoreCard';
import NewRoundModal from './NewRoundModal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onEndGame: () => void;
  onUndoLastRound: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ players, onAddRound, onEndGame, onUndoLastRound }) => {
  const [showNewRoundModal, setShowNewRoundModal] = useState(false);
  const [sortBy, setSortBy] = useState<'position' | 'name'>('position');
  const [showRounds, setShowRounds] = useState<boolean>(true);
  const [lastRoundScores, setLastRoundScores] = useState<{[key: string]: number}>({});
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('dutch_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
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
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={() => setSortBy(sortBy === 'position' ? 'name' : 'position')}
            title={sortBy === 'position' ? 'Trier par nom' : 'Trier par score'}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={() => setShowRounds(!showRounds)}
            title={showRounds ? 'Masquer les manches' : 'Afficher les manches'}
          >
            <History className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={() => navigate('/')}
            title="Retour à l'accueil"
          >
            <Home className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {roundCount > 0 && (
        <div className="mb-4 flex items-center justify-between">
          <span className="bg-dutch-blue text-white text-sm font-medium px-4 py-1 rounded-full">
            Manche {roundCount}
          </span>
          
          {roundCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-dutch-orange border-dutch-orange/30 text-xs hover:bg-dutch-orange/10"
              onClick={handleUndoLastRound}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Annuler dernière manche
            </Button>
          )}
        </div>
      )}

      <AnimatePresence>
        {gameOver && (
          <motion.div 
            className="dutch-card mb-6 bg-gradient-to-r from-dutch-purple to-dutch-blue text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex items-center gap-3">
              <Trophy className="h-10 w-10 text-dutch-yellow" />
              <div>
                <h2 className="text-xl font-bold">Partie terminée !</h2>
                <p className="text-white/90">
                  {winner ? `${winner.name} gagne avec ${winner.totalScore} points !` : 'Match nul !'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button 
                onClick={onEndGame}
                className="bg-white text-dutch-blue hover:bg-white/90"
              >
                Nouvelle partie
              </Button>
              <Button 
                onClick={() => navigate('/history')}
                className="bg-dutch-orange text-white hover:bg-dutch-orange/90"
              >
                Historique
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
          />
        ))}
      </div>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center">
        <Button 
          onClick={() => setShowNewRoundModal(true)}
          disabled={gameOver}
          className="dutch-button bg-dutch-orange hover:bg-dutch-orange/90 px-6 py-6"
        >
          <Plus className="mr-2 h-5 w-5" /> Nouvelle manche
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
              className="w-12 h-12 rounded-full shadow-lg bg-dutch-pink text-white hover:bg-dutch-pink/90 flex items-center justify-center"
              title="Paramètres"
            >
              {soundEnabled ? <Bell className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
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
        
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              className="w-12 h-12 rounded-full shadow-lg bg-dutch-blue text-white hover:bg-dutch-blue/90 flex items-center justify-center"
              title="Statistiques"
            >
              <BarChart3 className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Statistiques de la partie</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="dutch-card">
                <h3 className="text-sm font-medium mb-2">Meilleur score par manche</h3>
                {players.map(player => {
                  const bestRound = player.rounds.length > 0 
                    ? Math.min(...player.rounds.map(r => r.score).filter(s => s > 0))
                    : null;
                  return (
                    <div key={player.id} className="flex justify-between items-center mb-1">
                      <span className="text-sm">{player.name}</span>
                      <span className="font-medium">
                        {bestRound !== null ? bestRound : '-'}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className="dutch-card">
                <h3 className="text-sm font-medium mb-2">Nombre de fois "Dutch"</h3>
                {players.map(player => {
                  const dutchCount = player.rounds.filter(r => r.isDutch).length;
                  return (
                    <div key={player.id} className="flex justify-between items-center mb-1">
                      <span className="text-sm">{player.name}</span>
                      <span className="font-medium">{dutchCount}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="dutch-card">
                <h3 className="text-sm font-medium mb-2">Progression des scores</h3>
                <div className="h-40 overflow-hidden">
                  {players.length > 0 && (
                    <PlayerScoreProgress players={players} />
                  )}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.div>
  );
};

// Create a new PlayerScoreProgress component to show the progression of scores
const PlayerScoreProgress: React.FC<{ players: Player[] }> = ({ players }) => {
  const colors = ['#1EAEDB', '#F97316', '#8B5CF6', '#D946EF', '#10B981', '#FBBF24'];
  
  // Calculate cumulative scores for each player at each round
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
  
  // If no rounds, display a message
  if (roundData.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400">Pas encore de manches jouées</div>;
  }
  
  return (
    <div className="relative h-full">
      {/* X-axis (rounds) */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500">
        {roundData.map((data, i) => (
          <div key={i} className="text-center">{data.round}</div>
        ))}
      </div>
      
      {/* Y-axis lines */}
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
      
      {/* Players lines */}
      <svg className="w-full h-[90%]" viewBox={`0 0 ${roundData.length - 1} 100`} preserveAspectRatio="none">
        {players.map((player, playerIndex) => {
          // Create the path
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
      
      {/* Legend */}
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
