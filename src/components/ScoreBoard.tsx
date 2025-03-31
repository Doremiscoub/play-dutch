
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
import { 
  Flag, 
  BarChart2, 
  List, 
  Award, 
  Activity, 
  Clock, 
  Table2, 
  Sparkles, 
  LightbulbIcon, 
  BrainIcon, 
  HomeIcon, 
  PlusIcon, 
  UndoIcon, 
  XIcon,
  UserIcon,
  ArrowLeftIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-mobile';
import PlayerStatsChart from './PlayerStatsChart';
import ScoreTableView from './ScoreTableView';
import PodiumView from './PodiumView';
import { Switch } from './ui/switch';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const AICommentator: React.FC<{
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  className?: string;
}> = ({ players, roundHistory, className }) => {
  const [comment, setComment] = useState<string | null>(null);
  const [commentType, setCommentType] = useState<'info' | 'joke' | 'sarcasm' | 'encouragement'>('info');
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const generateComment = () => {
    if (!players.length || !roundHistory.length) {
      return "La partie vient de commencer ! Qui sera le champion aujourd'hui ?";
    }
    
    const commentTypes: Array<'info' | 'joke' | 'sarcasm' | 'encouragement'> = ['info', 'joke', 'sarcasm', 'encouragement'];
    const randomType = commentTypes[Math.floor(Math.random() * commentTypes.length)];
    setCommentType(randomType);
    
    // Récupérer le dernier round
    const lastRound = roundHistory[roundHistory.length - 1];
    const dutchPlayerId = lastRound.dutchPlayerId;
    const dutchPlayer = dutchPlayerId ? players.find(p => p.id === dutchPlayerId) : null;
    
    // Trouver le joueur avec le score le plus bas et le plus élevé du dernier tour
    const lastRoundScores = lastRound.scores;
    const minScore = Math.min(...lastRoundScores);
    const maxScore = Math.max(...lastRoundScores);
    const minScoreIndex = lastRoundScores.indexOf(minScore);
    const maxScoreIndex = lastRoundScores.indexOf(maxScore);
    
    const minScorePlayer = minScoreIndex >= 0 && minScoreIndex < players.length ? players[minScoreIndex] : null;
    const maxScorePlayer = maxScoreIndex >= 0 && maxScoreIndex < players.length ? players[maxScoreIndex] : null;
    
    // Trouver le joueur en tête au classement général
    if (players.length === 0) {
      return "En attente des joueurs...";
    }
    
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leadingPlayer = sortedPlayers[0];
    const lastPlayer = sortedPlayers[sortedPlayers.length - 1];
    
    // Commentaires possibles selon le type
    const comments = {
      info: [
        leadingPlayer ? `${leadingPlayer.name} est en tête avec ${leadingPlayer.totalScore} points. La tension monte !` : "La partie est très serrée !",
        "Cette partie est très serrée, tout peut encore changer !",
        minScorePlayer ? `${minScorePlayer.name} a réalisé un excellent score de ${minScore} points ! Continuez comme ça !` : "Excellent score le plus bas de cette manche !",
        `Déjà ${roundHistory.length} manches jouées. La partie bat son plein !`,
        leadingPlayer && lastPlayer ? `L'écart entre le 1er et le dernier est de ${lastPlayer.totalScore - leadingPlayer.totalScore} points.` : "Les scores sont très rapprochés !"
      ],
      joke: [
        dutchPlayer ? `${dutchPlayer.name} a fait Dutch ! C'était prévisible, vu comment il/elle tient ses cartes...` : `Personne n'a fait Dutch ce tour-ci... vous êtes tous trop prudents ou simplement chanceux ?`,
        maxScorePlayer ? `${maxScorePlayer.name} avec ${maxScore} points ? Je dirais que quelqu'un a besoin de lunettes pour mieux lire ses cartes !` : "Quelqu'un a besoin de lunettes pour mieux lire ses cartes !",
        lastPlayer ? `Si ${lastPlayer.name} continue comme ça, il/elle va bientôt pouvoir prendre sa retraite... du jeu !` : "Certains joueurs devraient peut-être envisager une retraite anticipée du jeu !",
        `J'ai vu des escargots distribuer les cartes plus rapidement que vous !`,
        minScorePlayer ? `${minScorePlayer.name} joue comme un pro ! Ou alors c'est juste un coup de chance incroyable...` : "Il y a des pros parmi nous ! Ou juste beaucoup de chance..."
      ],
      sarcasm: [
        maxScorePlayer ? `Wow, ${maxScorePlayer.name}, ${maxScore} points ! Impressionnant... si l'objectif était de marquer le PLUS de points.` : "Des scores impressionnants... si l'objectif était de marquer le PLUS de points.",
        leadingPlayer ? `Je vois que ${leadingPlayer.name} est en tête. Quelqu'un veut lui rappeler que c'est celui qui a le MOINS de points qui gagne ?` : "Quelqu'un veut rappeler aux joueurs que c'est celui qui a le MOINS de points qui gagne ?",
        `À ce stade, je me demande si certains d'entre vous connaissent vraiment les règles du jeu.`,
        lastPlayer ? `${lastPlayer.name} semble avoir une stratégie très... intéressante. On appelle ça "perdre avec style" ?` : "Certains semblent avoir une stratégie très... intéressante. Perdre avec style ?",
        dutchPlayer ? `${dutchPlayer.name} a fait Dutch. Quelle surprise... dit personne jamais.` : `Pas de Dutch ce tour-ci ? Vous commencez enfin à comprendre comment jouer !`
      ],
      encouragement: [
        lastPlayer ? `Ne désespérez pas ${lastPlayer.name} ! Même les plus grands champions ont connu des moments difficiles.` : "Ne désespérez pas ! Même les plus grands champions ont connu des moments difficiles.",
        minScorePlayer ? `${minScorePlayer.name} montre une excellente maîtrise du jeu avec un score de ${minScore} !` : "Excellent jeu de la part du meilleur joueur ce tour-ci !",
        `Tout peut encore changer ! Un bon Dutch et les scores seront bouleversés.`,
        `Restez concentrés, la partie est encore longue !`,
        leadingPlayer ? `${leadingPlayer.name} est en tête, mais rien n'est joué ! Gardez votre sang-froid et prenez les bonnes décisions.` : "La tête du classement peut encore changer ! Gardez votre sang-froid."
      ]
    };
    
    // Sélectionner un commentaire aléatoire du type choisi
    const commentsList = comments[randomType];
    const randomComment = commentsList[Math.floor(Math.random() * commentsList.length)];
    return randomComment;
  };
  
  useEffect(() => {
    if (roundHistory.length > 0) {
      setComment(generateComment());
    } else {
      setComment("Bienvenue ! La partie n'a pas encore commencé. Prêts à jouer ?");
    }
    
    // Générer un nouveau commentaire toutes les 20 secondes ou après un nouveau round
    const intervalId = setInterval(() => {
      setComment(generateComment());
    }, 20000);
    
    return () => clearInterval(intervalId);
  }, [roundHistory.length]);
  
  // Styles différents selon le type de commentaire
  const getCommentStyle = () => {
    switch (commentType) {
      case 'info':
        return 'border-dutch-blue/30 bg-dutch-blue/10';
      case 'joke':
        return 'border-dutch-orange/30 bg-dutch-orange/10';
      case 'sarcasm':
        return 'border-dutch-purple/30 bg-dutch-purple/10';
      case 'encouragement':
        return 'border-dutch-green/30 bg-dutch-green/10';
      default:
        return 'border-dutch-blue/30 bg-dutch-blue/10';
    }
  };
  
  const getCommentIcon = () => {
    switch (commentType) {
      case 'info':
        return <LightbulbIcon className="h-5 w-5 text-dutch-blue" />;
      case 'joke':
        return <Sparkles className="h-5 w-5 text-dutch-orange" />;
      case 'sarcasm':
        return <BrainIcon className="h-5 w-5 text-dutch-purple" />;
      case 'encouragement':
        return <Award className="h-5 w-5 text-dutch-green" />;
      default:
        return <LightbulbIcon className="h-5 w-5 text-dutch-blue" />;
    }
  };

  return (
    <motion.div 
      className={cn(`rounded-xl overflow-hidden shadow-lg ${className}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <div className="flex flex-col">
        <div 
          className={`p-4 border ${getCommentStyle()} backdrop-blur-sm flex items-start gap-3 cursor-pointer rounded-xl`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${commentType === 'info' ? 'bg-dutch-blue/20' : commentType === 'joke' ? 'bg-dutch-orange/20' : commentType === 'sarcasm' ? 'bg-dutch-purple/20' : 'bg-dutch-green/20'} shadow-md`}>
            {getCommentIcon()}
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col">
              <h3 className="text-base font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                Prof. Cartouche
              </h3>
              <span className="text-xs text-gray-600 -mt-1 mb-1">Analyste de jeu</span>
            </div>
            
            <motion.p 
              className="text-gray-700 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={comment}
            >
              {comment}
            </motion.p>
            
            {isMobile && !isExpanded && (
              <p className="text-xs text-gray-400 mt-1 italic">Appuyez pour d'autres commentaires</p>
            )}
          </div>
        </div>
        
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white/80 border-t border-x border-b rounded-b-xl shadow-sm space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  className="py-2 px-3 text-sm bg-dutch-blue/10 hover:bg-dutch-blue/20 text-dutch-blue rounded-lg transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    setCommentType('info');
                    setComment(generateComment());
                  }}
                >
                  <LightbulbIcon className="h-4 w-4" /> Analyse
                </button>
                
                <button 
                  className="py-2 px-3 text-sm bg-dutch-orange/10 hover:bg-dutch-orange/20 text-dutch-orange rounded-lg transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    setCommentType('joke');
                    setComment(generateComment());
                  }}
                >
                  <Sparkles className="h-4 w-4" /> Humour
                </button>
                
                <button 
                  className="py-2 px-3 text-sm bg-dutch-purple/10 hover:bg-dutch-purple/20 text-dutch-purple rounded-lg transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    setCommentType('sarcasm');
                    setComment(generateComment());
                  }}
                >
                  <BrainIcon className="h-4 w-4" /> Piquant
                </button>
                
                <button 
                  className="py-2 px-3 text-sm bg-dutch-green/10 hover:bg-dutch-green/20 text-dutch-green rounded-lg transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    setCommentType('encouragement');
                    setComment(generateComment());
                  }}
                >
                  <Award className="h-4 w-4" /> Motivation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ScoreHeatmapTable: React.FC<{
  players: Player[];
}> = ({ players }) => {
  if (!players.length || !players[0].rounds.length) {
    return (
      <div className="bg-white/90 rounded-xl p-4 border border-gray-200 text-center py-8">
        <p className="text-gray-500">Aucune manche enregistrée</p>
      </div>
    );
  }
  
  const roundCount = players[0].rounds.length;
  const rounds = Array.from({ length: roundCount }, (_, i) => i + 1);
  
  const getScoreColor = (score: number) => {
    if (score === 0) return 'bg-green-100 text-green-800';
    if (score <= 5) return 'bg-green-200 text-green-800';
    if (score <= 10) return 'bg-blue-200 text-blue-800';
    if (score <= 15) return 'bg-purple-200 text-purple-800';
    if (score <= 20) return 'bg-orange-200 text-orange-800';
    return 'bg-red-200 text-red-800';
  };
  
  return (
    <div className="overflow-x-auto">
      <Table className="w-full bg-white/90 rounded-xl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Joueur</TableHead>
            {rounds.map(round => (
              <TableHead key={round} className="text-center font-medium">
                Manche {round}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map(player => (
            <TableRow key={player.id}>
              <TableCell className="font-medium">{player.name}</TableCell>
              {player.rounds.map((round, idx) => (
                <TableCell key={idx} className="text-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-medium ${getScoreColor(round.score)}`}>
                    {round.score}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const StatsTable: React.FC<{
  players: Player[];
}> = ({ players }) => {
  if (!players.length) {
    return null;
  }
  
  return (
    <div className="overflow-x-auto mt-4">
      <Table className="w-full bg-white/90 rounded-xl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Joueur</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead className="text-center">Moyenne</TableHead>
            <TableHead className="text-center">Min</TableHead>
            <TableHead className="text-center">Max</TableHead>
            <TableHead className="text-center">Dutch</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map(player => (
            <TableRow key={player.id}>
              <TableCell className="font-medium">{player.name}</TableCell>
              <TableCell className="text-center font-bold">{player.totalScore}</TableCell>
              <TableCell className="text-center">{player.stats?.averageScore.toFixed(1) || '-'}</TableCell>
              <TableCell className="text-center text-green-600 font-medium">{player.stats?.bestRound || '-'}</TableCell>
              <TableCell className="text-center text-red-600 font-medium">{player.stats?.worstRound || '-'}</TableCell>
              <TableCell className="text-center">
                <span className="inline-flex h-6 items-center justify-center rounded-full bg-dutch-orange/10 px-2 text-xs font-medium text-dutch-orange">
                  {player.stats?.dutchCount || 0}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const FunStats: React.FC<{
  players: Player[];
  showExtended?: boolean;
}> = ({ players, showExtended = false }) => {
  if (!players || players.length === 0) {
    return null;
  }
  
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Get various fun statistics
  const bestPlayer = sortedPlayers[0];
  const worstPlayer = sortedPlayers[sortedPlayers.length - 1];
  
  const mostDutchs = [...players].sort((a, b) => 
    (b.rounds.filter(r => r.isDutch).length) - 
    (a.rounds.filter(r => r.isDutch).length)
  )[0];
  
  const mostConsistent = [...players].sort((a, b) => {
    if (!a.stats?.consistencyScore || !b.stats?.consistencyScore) return 0;
    return a.stats.consistencyScore - b.stats.consistencyScore;
  })[0];
  
  const bestImprovement = [...players].sort((a, b) => {
    if (!a.stats?.improvementRate || !b.stats?.improvementRate) return 0;
    return a.stats.improvementRate - b.stats.improvementRate;
  })[0];
  
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-md p-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
        Stats du match
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 border border-white/50 rounded-xl bg-gradient-to-br from-dutch-blue/5 to-dutch-purple/5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-dutch-blue/20 text-dutch-blue shadow-sm">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">En tête</p>
              <p className="font-bold text-gray-900">{bestPlayer.name}</p>
              <p className="text-xs text-green-600">{bestPlayer.totalScore} points</p>
            </div>
          </div>
        </div>
        
        <div className="p-3 border border-white/50 rounded-xl bg-gradient-to-br from-dutch-orange/5 to-dutch-pink/5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-dutch-orange/20 text-dutch-orange shadow-sm">
              <Flag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Le plus de Dutch</p>
              <p className="font-bold text-gray-900">{mostDutchs.name}</p>
              <p className="text-xs text-orange-600">{mostDutchs.rounds.filter(r => r.isDutch).length} fois</p>
            </div>
          </div>
        </div>
        
        {showExtended && (
          <>
            <div className="p-3 border border-white/50 rounded-xl bg-gradient-to-br from-dutch-green/5 to-dutch-blue/5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-dutch-green/20 text-dutch-green shadow-sm">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plus constant</p>
                  <p className="font-bold text-gray-900">{mostConsistent?.name || "N/A"}</p>
                  <p className="text-xs text-blue-600">{mostConsistent?.stats?.consistencyScore?.toFixed(1) || "N/A"}</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 border border-white/50 rounded-xl bg-gradient-to-br from-dutch-purple/5 to-dutch-pink/5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-dutch-purple/20 text-dutch-purple shadow-sm">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Meilleure progression</p>
                  <p className="font-bold text-gray-900">{bestImprovement?.name || "N/A"}</p>
                  <p className="text-xs text-purple-600">{bestImprovement?.stats?.improvementRate?.toFixed(1) || "N/A"}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {players.length > 1 && (
        <div className="mt-4 p-3 bg-dutch-blue/10 rounded-xl border border-dutch-blue/20">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-dutch-blue" />
            <span className="text-sm text-dutch-blue font-medium">
              {bestPlayer.name} mène de {worstPlayer.totalScore - bestPlayer.totalScore} pts !
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

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
  const [showTableView, setShowTableView] = useState(false);
  const newRoundModalRef = useRef<HTMLDialogElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  return (
    <div className="p-4 md:p-6 container max-w-7xl mx-auto">
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
      
      <motion.div
        className="mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="flex-shrink-0">
            <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:shadow">
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink text-transparent bg-clip-text">
            Tableau des scores
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden md:inline">Classement</span>
            <Switch 
              checked={showTableView} 
              onCheckedChange={setShowTableView}
            />
            <span className="text-sm text-gray-500 hidden md:inline">Tableau</span>
          </div>
          <Button variant="outline" size="icon" className="rounded-full opacity-70">
            <UserIcon className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
      
      {isMobile ? (
        // Mobile layout
        <div className="flex flex-col gap-6">
          <div className="mb-4">
            {players && players.length > 0 && (
              <AICommentator players={players} roundHistory={roundHistory} className="w-full" />
            )}
          </div>
          
          <div className="flex-1">
            {showTableView ? (
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50">
                  <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                    <Table2 className="h-4 w-4 text-dutch-purple" /> Historique des manches
                  </h3>
                  <ScoreHeatmapTable players={players} />
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50">
                  <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-dutch-blue" /> Statistiques des joueurs
                  </h3>
                  <StatsTable players={players} />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {players.sort((a, b) => a.totalScore - b.totalScore).map((player, index) => (
                  <PlayerScoreCard 
                    key={player.id} 
                    player={player} 
                    position={index + 1} 
                    isWinner={index === 0}
                    lastRoundScore={player.rounds.length > 0 ? player.rounds[player.rounds.length - 1].score : undefined}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="fixed bottom-6 left-0 right-0 px-4 z-10">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 p-4">
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  className="h-14 rounded-xl border-dutch-orange text-dutch-orange hover:bg-dutch-orange/10 flex flex-col items-center justify-center px-1" 
                  onClick={onUndoLastRound}
                >
                  <UndoIcon className="h-5 w-5 mb-1" />
                  <span className="text-xs">Annuler</span>
                </Button>
                
                <Button 
                  variant="dutch-blue" 
                  className="h-14 rounded-xl shadow-md flex flex-col items-center justify-center px-1"
                  onClick={onAddRoundHandler}
                >
                  <PlusIcon className="h-6 w-6 mb-1" />
                  <span className="text-xs">Nouvelle manche</span>
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="h-14 rounded-xl border-dutch-purple text-dutch-purple hover:bg-dutch-purple/10 flex flex-col items-center justify-center px-1"
                    >
                      <BarChart2 className="h-5 w-5 mb-1" />
                      <span className="text-xs">Stats</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Statistiques du jeu</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold">Performance par joueur</h3>
                        <PlayerStatsChart players={players} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-4">Points forts</h3>
                        <FunStats players={players} showExtended={true} />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-3 border-red-300 text-red-500 hover:bg-red-50" 
                onClick={onEndGame}
              >
                <XIcon className="h-4 w-4 mr-2" /> Terminer la partie
              </Button>
            </div>
          </div>
          
          <div className="pt-36">
            {/* Spacer to ensure content isn't hidden behind fixed bottom bar */}
          </div>
        </div>
      ) : (
        // Desktop layout
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            {showTableView ? (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-9">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50 mb-4">
                    <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                      <Table2 className="h-4 w-4 text-dutch-purple" /> Historique des manches
                    </h3>
                    <ScoreHeatmapTable players={players} />
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50">
                    <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-dutch-blue" /> Statistiques des joueurs
                    </h3>
                    <StatsTable players={players} />
                  </div>
                </div>
                
                <div className="col-span-3 space-y-4">
                  {players && players.length > 0 && (
                    <AICommentator players={players} roundHistory={roundHistory} className="h-auto" />
                  )}
                  <FunStats players={players} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                  <div className="space-y-3 pr-4">
                    {players.sort((a, b) => a.totalScore - b.totalScore).map((player, index) => (
                      <PlayerScoreCard 
                        key={player.id} 
                        player={player} 
                        position={index + 1} 
                        isWinner={index === 0}
                        lastRoundScore={player.rounds.length > 0 ? player.rounds[player.rounds.length - 1].score : undefined}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-span-4 flex flex-col gap-4">
                  {players && players.length > 0 && (
                    <AICommentator players={players} roundHistory={roundHistory} className="h-auto bg-white/90 shadow-md" />
                  )}
                  <FunStats players={players} />
                </div>
              </div>
            )}
          </div>
          
          <div className="col-span-12 mt-4">
            <div className="flex justify-between items-center">
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="rounded-xl border-dutch-purple text-dutch-purple hover:bg-dutch-purple/10 gap-2"
                    >
                      <BarChart2 className="h-4 w-4" /> Statistiques détaillées
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Statistiques détaillées</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-semibold mb-4">Performance par joueur</h3>
                        <PlayerStatsChart players={players} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-4">Points forts</h3>
                        <FunStats players={players} showExtended={true} />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="rounded-xl border-dutch-orange text-dutch-orange hover:bg-dutch-orange/10 gap-2" 
                  onClick={onUndoLastRound}
                >
                  <UndoIcon className="h-4 w-4" /> Annuler dernière
                </Button>
                
                <Button 
                  variant="dutch-blue" 
                  className="rounded-xl shadow-md gap-2" 
                  onClick={onAddRoundHandler}
                >
                  <PlusIcon className="h-4 w-4" /> Nouvelle manche
                </Button>
                
                <Button 
                  variant="outline"
                  className="rounded-xl border-red-300 text-red-500 hover:bg-red-50 gap-2"
                  onClick={onEndGame}
                >
                  <XIcon className="h-4 w-4" /> Terminer
                </Button>
              </div>
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
  );
};

// Let's create an updated player score card component inline
const PlayerScoreCard: React.FC<{
  player: Player;
  position: number;
  isWinner?: boolean;
  lastRoundScore?: number;
}> = ({ player, position, isWinner = false, lastRoundScore }) => {
  const progressPercentage = Math.min(player.totalScore, 100);
  
  const getPositionStyles = () => {
    switch(position) {
      case 1:
        return {
          card: 'border-2 border-dutch-yellow shadow-md shadow-dutch-yellow/10 bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10',
          badge: 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white',
          progress: 'from-dutch-blue to-dutch-purple'
        };
      case 2:
        return {
          card: 'border border-dutch-purple/30 shadow-sm bg-dutch-purple/5',
          badge: 'bg-gradient-to-r from-dutch-purple to-dutch-pink text-white',
          progress: 'from-dutch-purple to-dutch-pink'
        };
      case 3:
        return {
          card: 'border border-dutch-orange/30 shadow-sm bg-dutch-orange/5',
          badge: 'bg-gradient-to-r from-dutch-orange to-dutch-pink text-white',
          progress: 'from-dutch-orange to-dutch-pink'
        };
      default:
        return {
          card: 'bg-white/60 backdrop-blur-sm border border-white/20',
          badge: 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700',
          progress: 'from-gray-300 to-gray-400'
        };
    }
  };
  
  const styles = getPositionStyles();
  const stats = player.stats;
  
  return (
    <motion.div 
      className={`rounded-2xl p-5 transition-all backdrop-blur-sm ${styles.card}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: position * 0.05 }}
      layout
      whileHover={{ y: -3, boxShadow: "0 12px 25px -5px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${styles.badge} shadow-md`}>
          {isWinner || position === 1 ? <Award className="h-5 w-5" aria-hidden="true" /> : position}
        </div>
        
        <div className="flex-grow overflow-hidden">
          <div className="flex items-center">
            <h3 className="font-semibold truncate text-lg">{player.name}</h3>
            {player.rounds.some(round => round.isDutch) && (
              <div className="ml-2 flex-shrink-0">
                <motion.div 
                  className="px-2 py-0.5 bg-dutch-orange/20 text-dutch-orange text-xs font-medium rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  Dutch
                </motion.div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-1.5">
            <div className="relative w-full">
              <div className="h-3 bg-gray-100/50 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full rounded-full bg-gradient-to-r ${styles.progress}`}
                  style={{ width: `${progressPercentage}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </div>
              <motion.div 
                className={`absolute bottom-0 h-3 rounded-full bg-gradient-to-r ${styles.progress} blur-sm w-full opacity-30`}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex items-center">
              <span className="text-xl font-bold">{player.totalScore}</span>
              {lastRoundScore !== undefined && (
                <span className="ml-2 text-xs text-gray-500 flex items-center">
                  +{lastRoundScore}
                </span>
              )}
            </div>
          </div>
          
          {stats && (
            <div className="mt-3 grid grid-cols-3 gap-x-2 gap-y-1">
              <div className="text-center bg-dutch-blue/5 rounded-lg p-1.5">
                <div className="text-xs text-gray-500">Moy</div>
                <div className="font-bold text-dutch-blue">{stats.averageScore.toFixed(1)}</div>
              </div>
              <div className="text-center bg-dutch-green/5 rounded-lg p-1.5">
                <div className="text-xs text-gray-500">Min</div>
                <div className="font-bold text-dutch-green">{stats.bestRound || '-'}</div>
              </div>
              <div className="text-center bg-dutch-orange/5 rounded-lg p-1.5">
                <div className="text-xs text-gray-500">Dutch</div>
                <div className="font-bold text-dutch-orange">{stats.dutchCount}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {player.rounds.length > 0 && (
        <div className="mt-3 flex gap-2 overflow-x-auto py-1 scrollbar-none">
          {player.rounds.map((round, index) => {
            const isPlayerBestScore = stats?.bestRound === round.score;
            
            return (
              <motion.div 
                key={index} 
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  transition-transform shadow-sm ${
                    round.isDutch ? 'bg-gradient-to-br from-dutch-orange to-dutch-pink text-white' : 
                    isPlayerBestScore ? 'bg-gradient-to-br from-dutch-green to-dutch-blue/50 text-white' : 'bg-gray-100'
                  }`}
                whileHover={{ scale: 1.15, rotate: [-1, 1, -1, 0] }}
                transition={{ scale: { duration: 0.2 }, rotate: { duration: 0.3 } }}
              >
                {round.score}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default ScoreBoard;
