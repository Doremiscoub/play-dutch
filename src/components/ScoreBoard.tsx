
import React, { useState, useEffect } from 'react';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
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
import { LayoutGrid, LayoutList, Info, Settings, ArrowLeft } from 'lucide-react';
import CustomScoreBoardButtons from './CustomScoreBoardButtons';
import ScoreTableView from './ScoreTableView';
import AICommentator from './AICommentator';
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import PlayerDetailedStats from './PlayerDetailedStats';
import PlayerScoreCard from './PlayerScoreCard';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';
import { animationVariants, AnimatedContainer } from '@/utils/animationUtils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { UI_CONFIG, COMMON_STYLES } from '@/config/uiConfig';
import { toast } from 'sonner';

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
  scoreLimit?: number;
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
  onCancelEndGame,
  scoreLimit = 100
}) => {
  const [view, setView] = useState<'list' | 'table'>('list');
  const [showAICommentator, setShowAICommentator] = useState<boolean>(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showUndoConfirmation, setShowUndoConfirmation] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  // Trier les joueurs par score, du meilleur au pire
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Sélectionner automatiquement le premier joueur pour les statistiques détaillées
  useEffect(() => {
    if (sortedPlayers.length > 0 && !selectedPlayer) {
      setSelectedPlayer(sortedPlayers[0]);
    }
  }, [sortedPlayers, selectedPlayer]);
  
  // Gestionnaires pour l'annulation de la dernière manche
  const handleRequestUndo = () => {
    if (players.length === 0 || players[0].rounds.length === 0) {
      toast.error('Pas de manche à annuler !');
      return;
    }
    setShowUndoConfirmation(true);
  };
  
  const handleConfirmUndo = () => {
    onUndoLastRound();
    setShowUndoConfirmation(false);
  };
  
  const handleCancelUndo = () => {
    setShowUndoConfirmation(false);
  };
  
  // Gestionnaire pour les stats détaillées d'un joueur
  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
  };

  return (
    <PageLayout backgroundVariant="subtle" className="pb-32">
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Accueil
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Link to="/rules">
              <Button variant="outline" size="sm" className="flex items-center gap-1 text-gray-600">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Règles</span>
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" size="sm" className="flex items-center gap-1 text-gray-600">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Réglages</span>
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
            Tableau des scores
            <span className="ml-2 text-sm">✨</span>
          </h1>
          <p className="text-gray-600">
            Manche {players.length > 0 ? players[0]?.rounds.length || 0 : 0}
            {scoreLimit ? <span className="ml-2 text-dutch-purple"> | Limite: {scoreLimit} points</span> : ''}
          </p>
        </div>
        
        {/* Onglets pour basculer entre les vues - toujours visible */}
        <div className="flex justify-center mb-6">
          <Tabs 
            defaultValue="list" 
            value={view}
            onValueChange={(value) => setView(value as 'list' | 'table')} 
            className="w-full max-w-md"
          >
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
        
        {/* Layout desktop/mobile avec commentateur IA */}
        <div className={`${isDesktop ? 'md:flex md:gap-6' : ''}`}>
          {/* Colonne gauche (classement ou tableau) */}
          <div className={`${isDesktop && view === 'list' ? 'md:w-2/3' : 'w-full'}`}>
            <AnimatePresence mode="wait">
              {view === 'list' && (
                <motion.div
                  key="list-view"
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  variants={animationVariants.staggerChildren}
                  className="space-y-4"
                >
                  {/* Commentateur IA pour mobile (dans la vue liste) */}
                  {!isDesktop && showAICommentator && (
                    <AICommentator 
                      players={players}
                      roundHistory={roundHistory}
                      className="mb-4"
                    />
                  )}
                
                  {sortedPlayers.map((player, index) => (
                    <motion.div
                      key={player.id}
                      variants={animationVariants.staggerItem}
                      layoutId={`player-card-${player.id}`}
                      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                      className="cursor-pointer"
                      onClick={() => isDesktop ? handlePlayerSelect(player) : null}
                    >
                      <PlayerScoreCard 
                        player={player}
                        position={index + 1}
                        isWinner={index === 0}
                        lastRoundScore={player.rounds.length > 0 ? player.rounds[player.rounds.length - 1].score : undefined}
                        warningThreshold={scoreLimit ? scoreLimit * 0.8 : undefined}
                      />
                    </motion.div>
                  ))}
                  
                  {sortedPlayers.length === 0 && (
                    <div className="text-center p-8 bg-white/70 rounded-2xl shadow-sm border border-white/50">
                      <p className="text-gray-500">Aucun joueur pour le moment</p>
                    </div>
                  )}
                  
                  {/* Drawer pour les stats détaillées sur mobile */}
                  {!isDesktop && (
                    <div className="mt-8 flex justify-center">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button className="bg-white text-dutch-purple border border-dutch-purple/20 hover:bg-dutch-purple/10">
                            Voir les statistiques détaillées
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent className="bg-white rounded-t-3xl p-4 max-h-[85vh]">
                          <div className="space-y-6 overflow-y-auto max-h-[80vh] px-1 py-2">
                            <h3 className="font-bold text-lg text-center text-dutch-purple">Statistiques détaillées</h3>
                            {sortedPlayers.map((player) => (
                              <div key={player.id} className="space-y-2">
                                <h4 className="font-medium text-gray-700">{player.name}</h4>
                                <PlayerDetailedStats player={player} />
                              </div>
                            ))}
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  )}
                </motion.div>
              )}
              
              {view === 'table' && (
                <motion.div
                  key="table-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScoreTableView 
                    players={players}
                    roundHistory={roundHistory || []}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Colonne droite (desktop uniquement - commentateur IA et stats du joueur sélectionné) */}
          {isDesktop && view === 'list' && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="hidden md:block md:w-1/3 space-y-6"
            >
              {/* Commentateur IA */}
              {showAICommentator && (
                <AICommentator 
                  players={players}
                  roundHistory={roundHistory}
                  className="mb-6"
                />
              )}
              
              {/* Section stats détaillées pour le joueur sélectionné */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {selectedPlayer ? `Statistiques de ${selectedPlayer.name}` : 'Sélectionnez un joueur pour voir ses statistiques'}
                </h3>
                
                {selectedPlayer ? (
                  <PlayerDetailedStats player={selectedPlayer} />
                ) : (
                  <div className="text-gray-500 text-sm italic p-4 text-center">
                    Cliquez sur un joueur dans le classement pour afficher ses statistiques détaillées
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Boutons d'action */}
      <CustomScoreBoardButtons
        players={players}
        onAddRound={onAddRound}
        onRequestUndoLastRound={handleRequestUndo}
        onEndGame={onEndGame}
      />
      
      {/* Confirmation de fin de partie */}
      {showGameEndConfirmation && onConfirmEndGame && onCancelEndGame && (
        <AlertDialog open={showGameEndConfirmation}>
          <AlertDialogContent className="bg-white rounded-2xl border-white/50">
            <AlertDialogHeader>
              <AlertDialogTitle>Terminer la partie ?</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir terminer cette partie ? Cette action ne peut pas être annulée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onCancelEndGame} className="bg-gray-100 hover:bg-gray-200 text-gray-700">Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirmEndGame} className="bg-dutch-purple hover:bg-dutch-purple/90 text-white">Terminer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      
      {/* Confirmation d'annulation de manche */}
      <AlertDialog open={showUndoConfirmation}>
        <AlertDialogContent className="bg-white rounded-2xl border-white/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Annuler la dernière manche ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir annuler la dernière manche ? Les scores seront définitivement perdus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelUndo} className="bg-gray-100 hover:bg-gray-200 text-gray-700">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmUndo} className="bg-dutch-orange hover:bg-dutch-orange/90 text-white">Confirmer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default ScoreBoard;
