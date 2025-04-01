
import React from 'react';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import CustomScoreBoardButtons from './CustomScoreBoardButtons';

interface ScoreBoardProps {
  players: Player[];
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onUndoLastRound: () => void;
  onEndGame: () => void;
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  isMultiplayer?: boolean;
  showGameEndConfirmation?: boolean;
  onConfirmEndGame?: () => void;
  onCancelEndGame?: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  onAddRound,
  onUndoLastRound,
  onEndGame,
  roundHistory,
  isMultiplayer,
  showGameEndConfirmation,
  onConfirmEndGame,
  onCancelEndGame
}) => {
  // Trier les joueurs par score, du meilleur au pire
  const sortedPlayers = [...players].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="min-h-screen p-4 pb-32">
      {/* Fond avec quadrillage */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L 24 0 M 0 0 L 0 24' stroke='%23DADADA' stroke-opacity='0.1' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
            Tableau des scores
          </h1>
          <p className="text-gray-600">Manche {players[0]?.rounds.length || 0}</p>
        </div>
        
        <div className="space-y-4 mb-24">
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden rounded-2xl p-4 bg-white/80 backdrop-blur-md border border-white/40 shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-300'}`}>
                      {index + 1}
                    </div>
                    <h3 className="ml-3 font-semibold text-gray-800">{player.name}</h3>
                  </div>
                  <div className="font-bold text-2xl bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                    {player.totalScore}
                  </div>
                </div>
                
                {/* Historique des scores du joueur */}
                {player.rounds && player.rounds.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                      {player.rounds.map((round, idx) => (
                        <div 
                          key={idx} 
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${round.isDutch ? 'bg-dutch-orange/20 text-dutch-orange border border-dutch-orange/30' : (round.score > 0 ? 'bg-dutch-blue/10 text-dutch-blue border border-dutch-blue/30' : 'bg-gray-100 text-gray-500 border border-gray-200')}`}
                        >
                          {round.score}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <CustomScoreBoardButtons
        players={players}
        onAddRound={onAddRound}
        onUndoLastRound={onUndoLastRound}
        onEndGame={onEndGame}
      />
      
      {/* Confirmation de fin de partie */}
      {showGameEndConfirmation && onConfirmEndGame && onCancelEndGame && (
        <AlertDialog open={showGameEndConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Terminer la partie ?</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir terminer cette partie ? Cette action ne peut pas être annulée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onCancelEndGame}>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirmEndGame}>Terminer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default ScoreBoard;
