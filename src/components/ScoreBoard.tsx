
import React, { useState, useEffect } from 'react';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, LayoutList } from 'lucide-react';
import CustomScoreBoardButtons from './CustomScoreBoardButtons';
import ScoreTableView from './ScoreTableView';
import AICommentator from './AICommentator';
import { Badge } from '@/components/ui/badge';
import PageLayout from './PageLayout';
import { animationVariants } from '@/utils/animationUtils';

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
  roundHistory = [],
  isMultiplayer = false,
  showGameEndConfirmation = false,
  onConfirmEndGame,
  onCancelEndGame
}) => {
  const [view, setView] = useState<'list' | 'table'>('list');
  const [showAICommentator, setShowAICommentator] = useState<boolean>(true);

  // Trier les joueurs par score, du meilleur au pire
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Animation d'apparition des éléments de façon staggered
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <PageLayout backgroundVariant="subtle" className="pb-32">
      <div className="relative z-10 space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
            Tableau des scores
          </h1>
          <p className="text-gray-600">Manche {players[0]?.rounds.length || 0}</p>
        </div>
        
        {/* Onglets pour basculer entre les vues */}
        <div className="flex justify-center mb-4">
          <Tabs defaultValue={view} onValueChange={(value) => setView(value as 'list' | 'table')} className="w-full max-w-md">
            <TabsList className="grid grid-cols-2 mb-2">
              <TabsTrigger value="list" className="flex items-center gap-1">
                <LayoutList className="h-4 w-4" /> Classement
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center gap-1">
                <LayoutGrid className="h-4 w-4" /> Tableau détaillé
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Commentateur IA */}
        {showAICommentator && (
          <div className="mb-4">
            <AICommentator 
              players={players}
              roundHistory={roundHistory}
              className="mb-6"
            />
          </div>
        )}
        
        {/* Vue Liste (classement) */}
        <AnimatePresence mode="wait">
          {view === 'list' && (
            <motion.div
              key="list-view"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="space-y-4 mb-24"
            >
              {sortedPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  variants={item}
                  layoutId={`player-card-${player.id}`}
                >
                  <Card className="relative overflow-hidden rounded-2xl p-4 bg-white/80 backdrop-blur-md border border-white/40 shadow-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-300'}`}>
                          {index + 1}
                        </div>
                        <h3 className="ml-3 font-semibold text-gray-800">{player.name}</h3>
                        
                        {/* Badge Dutch si le joueur a fait Dutch au moins une fois */}
                        {player.rounds.some(round => round.isDutch) && (
                          <Badge className="ml-2 bg-dutch-orange/10 text-dutch-orange">Dutch</Badge>
                        )}
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
                    
                    {/* Statistiques du joueur */}
                    {player.stats && (
                      <div className="mt-2 pt-2 border-t border-gray-100 grid grid-cols-3 gap-2 text-xs text-gray-500">
                        <div className="flex flex-col items-center">
                          <span>Moy.</span>
                          <span className="font-medium text-gray-700">{player.stats.averageScore.toFixed(1)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span>Min</span>
                          <span className="font-medium text-gray-700">{player.stats.bestRound !== null ? player.stats.bestRound : '-'}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span>Dutch</span>
                          <span className="font-medium text-gray-700">{player.stats.dutchCount}</span>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* Vue Tableau (détaillée) */}
          {view === 'table' && (
            <motion.div
              key="table-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-24"
            >
              <ScoreTableView 
                players={players}
                roundHistory={roundHistory || []}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Boutons d'action */}
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
    </PageLayout>
  );
};

export default ScoreBoard;
