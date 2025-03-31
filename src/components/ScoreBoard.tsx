
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trophy, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, GameRound } from '@/types';
import PlayerScoreCard from './PlayerScoreCard';
import NewRoundModal from './NewRoundModal';

interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[]) => void;
  onEndGame: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ players, onAddRound, onEndGame }) => {
  const [showNewRoundModal, setShowNewRoundModal] = useState(false);
  const [sortBy, setSortBy] = useState<'position' | 'name'>('position');
  
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

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-4"
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
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

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
            <Button 
              onClick={onEndGame}
              className="w-full mt-4 bg-white text-dutch-blue hover:bg-white/90"
            >
              Nouvelle partie
            </Button>
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

      {showNewRoundModal && (
        <NewRoundModal 
          players={players}
          onClose={() => setShowNewRoundModal(false)}
          onSave={(scores) => {
            onAddRound(scores);
            setShowNewRoundModal(false);
          }}
        />
      )}
    </motion.div>
  );
};

export default ScoreBoard;
