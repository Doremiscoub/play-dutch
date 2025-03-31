
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trophy, BarChart3, History, Home, Crown, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, GameRound } from '@/types';
import PlayerScoreCard from './PlayerScoreCard';
import NewRoundModal from './NewRoundModal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onEndGame: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ players, onAddRound, onEndGame }) => {
  const [showNewRoundModal, setShowNewRoundModal] = useState(false);
  const [sortBy, setSortBy] = useState<'position' | 'name'>('position');
  const [showRounds, setShowRounds] = useState<boolean>(true);
  const [lastRoundScores, setLastRoundScores] = useState<{[key: string]: number}>({});
  const navigate = useNavigate();
  
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
    
  const handleUndoLastRound = () => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler la dernière manche ?")) {
      // This is just a stub - the actual functionality would need to be implemented in the parent component
      toast.error("Cette fonctionnalité n'est pas encore implémentée");
    }
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
              onAddRound(scores, dutchPlayerId);
              setShowNewRoundModal(false);
              toast.success('Manche ajoutée !');
            }}
          />
        )}
      </AnimatePresence>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            className="fixed right-4 bottom-20 w-12 h-12 rounded-full shadow-lg bg-dutch-blue text-white hover:bg-dutch-blue/90 flex items-center justify-center"
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
          </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
};

export default ScoreBoard;
