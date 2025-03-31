
import React, { useState, useEffect, useRef } from 'react';
import { Player, ScoreBoardProps } from '@/types';
import NewRoundModal from './NewRoundModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from 'framer-motion';
import { Flag, BarChart2, List, Award, Activity, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-mobile';
import PlayerStatsChart from './PlayerStatsChart';
import ScoreTableView from './ScoreTableView';
import PodiumView from './PodiumView';
import AICommentator from './AICommentator';

const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  players, 
  onAddRound, 
  onEndGame, 
  onUndoLastRound, 
  roundHistory,
  showGameEndConfirmation,
  onConfirmEndGame,
  onCancelEndGame,
  isMultiplayer = false
}) => {
  const [isNewRoundModalOpen, setIsNewRoundModalOpen] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [dutchPlayerId, setDutchPlayerId] = useState<string | undefined>(undefined);
  const newRoundModalRef = useRef<HTMLDialogElement>(null);

  const handleClosePodium = () => {
    console.log('Close podium requested');
  };

  const onAddRoundHandler = () => {
    setIsNewRoundModalOpen(true);
    setScores(Array(players.length).fill(0));
  };

  const handleCloseModal = () => {
    setIsNewRoundModalOpen(false);
  };

  const handleAddRound = () => {
    onAddRound(scores, dutchPlayerId);
    setIsNewRoundModalOpen(false);
    setScores([]);
    setDutchPlayerId(undefined);
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="p-4 md:p-6 container max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        
        <AlertDialog open={showGameEndConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr(e) ?</AlertDialogTitle>
              <AlertDialogDescription>
                Terminer la partie maintenant réinitialisera le jeu. Êtes-vous sûr de vouloir continuer ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onCancelEndGame}>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirmEndGame}>Oui, terminer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        {isMobile ? (
          <div className="flex flex-col gap-6">
            <Tabs defaultValue="scores" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="scores" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  Scores
                </TabsTrigger>
                <TabsTrigger value="podium" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Podium
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="scores" className="mt-0">
                <ScoreTableView players={players} roundHistory={roundHistory} />
              </TabsContent>
              
              <TabsContent value="podium" className="mt-0">
                <PodiumView players={players} onClose={handleClosePodium} isMultiplayer={isMultiplayer} />
              </TabsContent>
            </Tabs>
            
            {players && players.length > 0 && (
              <AICommentator players={players} roundHistory={roundHistory} className="mb-4" />
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="default" 
                className="w-full bg-dutch-blue text-white hover:bg-dutch-blue/90" 
                onClick={onAddRoundHandler}
              >
                Nouvelle Manche
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-dutch-orange text-dutch-orange hover:bg-dutch-orange/10" 
                onClick={onUndoLastRound}
              >
                Annuler Dernière
              </Button>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="relative overflow-hidden border-dutch-purple text-dutch-purple hover:bg-dutch-purple/10 w-full"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <BarChart2 className="h-4 w-4" />
                    Statistiques
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-dutch-purple">
                    <BarChart2 className="h-5 w-5" />
                    Statistiques Détaillées
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="overview" className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Aperçu
                      </TabsTrigger>
                      <TabsTrigger value="charts" className="flex items-center gap-2">
                        <BarChart2 className="h-4 w-4" />
                        Graphiques
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="mt-0 space-y-4">
                      <FifaStyleStats players={players} />
                    </TabsContent>
                    
                    <TabsContent value="charts" className="mt-0">
                      <PlayerStatsChart players={players} />
                    </TabsContent>
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={onEndGame}
            >
              Terminer la Partie
            </Button>
            
            <div className="mt-2 p-3 bg-gray-100 rounded-xl border border-gray-200 opacity-80 flex items-center justify-center">
              <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                <Clock className="h-3.5 w-3.5" />
                <span>Mode multijoueur bientôt disponible</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <Tabs defaultValue="scores" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4 max-w-md mx-auto">
                  <TabsTrigger value="scores" className="flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Tableau de Score
                  </TabsTrigger>
                  <TabsTrigger value="podium" className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Podium
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="scores" className="mt-0">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12">
                      <ScoreTableView players={players} roundHistory={roundHistory} />
                    </div>
                    <div className="col-span-6">
                      {players && players.length > 0 && (
                        <AICommentator players={players} roundHistory={roundHistory} className="h-full" />
                      )}
                    </div>
                    <div className="col-span-6">
                      <FifaStyleStats players={players} />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="podium" className="mt-0">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-7">
                      <PodiumView players={players} onClose={handleClosePodium} isMultiplayer={isMultiplayer} />
                    </div>
                    <div className="col-span-5">
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid grid-cols-2 mb-4">
                          <TabsTrigger value="overview" className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Aperçu
                          </TabsTrigger>
                          <TabsTrigger value="charts" className="flex items-center gap-2">
                            <BarChart2 className="h-4 w-4" />
                            Graphiques
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="mt-0">
                          <FifaStyleStats players={players} />
                        </TabsContent>
                        
                        <TabsContent value="charts" className="mt-0">
                          <PlayerStatsChart players={players} />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="col-span-12 flex justify-between gap-4">
              <Button 
                variant="default" 
                className="bg-dutch-blue text-white hover:bg-dutch-blue/90 px-8" 
                onClick={onAddRoundHandler}
              >
                Nouvelle Manche
              </Button>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="border-dutch-orange text-dutch-orange hover:bg-dutch-orange/10" 
                  onClick={onUndoLastRound}
                >
                  Annuler Dernière
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={onEndGame}
                >
                  Terminer la Partie
                </Button>
              </div>
            </div>
            
            <div className="col-span-12 mt-2 p-3 bg-gray-100 rounded-xl border border-gray-200 opacity-80 flex items-center justify-center">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Mode multijoueur bientôt disponible</span>
              </div>
            </div>
          </div>
        )}
        
        {isNewRoundModalOpen && (
          <NewRoundModal
            players={players}
            onClose={handleCloseModal}
            onAddRound={handleAddRound}
            setScores={setScores}
            setDutchPlayerId={setDutchPlayerId}
            scores={scores}
            dutchPlayerId={dutchPlayerId}
            modalRef={newRoundModalRef}
          />
        )}
      </div>
    </div>
  );
};

interface FifaStyleStatsProps {
  players: Player[];
}

const FifaStyleStats: React.FC<FifaStyleStatsProps> = ({ players }) => {
  if (!players || players.length === 0) {
    return <div className="p-4 text-center">Aucune donnée disponible</div>;
  }
  
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  const bestPlayer = sortedPlayers[0];
  const worstPlayer = sortedPlayers[sortedPlayers.length - 1];
  
  if (!bestPlayer || !worstPlayer) return null;
  
  const allStats = players.map(player => {
    const avgScore = player.rounds.length 
      ? (player.rounds.reduce((sum, r) => sum + r.score, 0) / player.rounds.length)
      : 0;
    
    const bestRound = player.rounds.length 
      ? Math.min(...player.rounds.map(r => r.score).filter(s => s > 0))
      : null;
    
    const worstRound = player.rounds.length 
      ? Math.max(...player.rounds.map(r => r.score))
      : null;
    
    const dutchCount = player.rounds.filter(r => r.isDutch).length;
    
    return {
      id: player.id,
      name: player.name,
      avgScore,
      bestRound,
      worstRound,
      dutchCount,
      totalScore: player.totalScore
    };
  });
  
  const bestAvg = [...allStats].sort((a, b) => a.avgScore - b.avgScore)[0];
  const bestBestRound = [...allStats]
    .filter(s => s.bestRound !== null)
    .sort((a, b) => (a.bestRound || Infinity) - (b.bestRound || Infinity))[0];
  const mostDutch = [...allStats].sort((a, b) => b.dutchCount - a.dutchCount)[0];
  
  const leaderGap = sortedPlayers.length > 1 
    ? sortedPlayers[1].totalScore - sortedPlayers[0].totalScore 
    : 0;
  
  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-md p-4 overflow-hidden">
      <h3 className="text-lg font-semibold mb-4 text-dutch-purple">Statistiques du Match</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard 
          title="Meilleur Joueur" 
          value={bestPlayer.name} 
          subvalue={`${bestPlayer.totalScore} points`}
          icon={<Award className="h-5 w-5 text-dutch-green" />}
          color="bg-dutch-green/10 text-dutch-green"
        />
        
        <StatCard 
          title="Meilleure Moyenne" 
          value={bestAvg.name} 
          subvalue={`${bestAvg.avgScore.toFixed(1)} pts/manche`}
          icon={<Activity className="h-5 w-5 text-dutch-blue" />}
          color="bg-dutch-blue/10 text-dutch-blue"
        />
        
        {bestBestRound && (
          <StatCard 
            title="Meilleur Score" 
            value={bestBestRound.name} 
            subvalue={`${bestBestRound.bestRound} points`}
            icon={<BarChart2 className="h-5 w-5 text-dutch-purple" />}
            color="bg-dutch-purple/10 text-dutch-purple"
          />
        )}
        
        <StatCard 
          title="Plus de Dutch" 
          value={mostDutch.name} 
          subvalue={`${mostDutch.dutchCount} fois`}
          icon={<Flag className="h-5 w-5 text-dutch-orange" />}
          color="bg-dutch-orange/10 text-dutch-orange"
        />
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500 mb-3">Comparaison Joueurs</h4>
        <div className="space-y-3">
          {allStats.map((stat, index) => (
            <div key={stat.id} className="relative">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className={`flex items-center justify-center h-5 w-5 rounded-full text-xs font-bold ${index === 0 ? 'bg-dutch-green/20 text-dutch-green' : index === 1 ? 'bg-dutch-blue/20 text-dutch-blue' : index === 2 ? 'bg-dutch-purple/20 text-dutch-purple' : 'bg-gray-200 text-gray-700'}`}>
                    {index + 1}
                  </span>
                  <span className="ml-2 font-medium">
                    {stat.name}
                  </span>
                </div>
                <span className="font-bold">
                  {stat.totalScore}
                </span>
              </div>
              
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${index === 0 ? 'bg-dutch-green' : index === 1 ? 'bg-dutch-blue' : index === 2 ? 'bg-dutch-purple' : 'bg-gray-400'}`}
                  style={{ 
                    width: `${Math.max(5, 100 - (stat.totalScore / (worstPlayer.totalScore || 1)) * 100)}%` 
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{stat.dutchCount} Dutch</span>
                <span>{stat.avgScore.toFixed(1)} moy.</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {leaderGap > 0 && (
        <div className="mt-6 p-3 bg-dutch-green/10 rounded-lg">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-dutch-green" />
            <span className="text-sm font-medium text-dutch-green">
              {bestPlayer.name} mène par {leaderGap} points !
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  subvalue: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subvalue, icon, color }) => {
  return (
    <div className="p-3 border border-white/50 rounded-xl bg-white/80 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center h-10 w-10 rounded-full ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-600">{subvalue}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
