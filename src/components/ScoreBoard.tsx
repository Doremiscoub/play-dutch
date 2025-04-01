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
  ArrowLeftIcon,
  TrendingUp,
  TrendingDown,
  Star,
  Target,
  Medal,
  Calculator,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-mobile';
import PlayerStatsChart from './PlayerStatsChart';
import ScoreTableView from './ScoreTableView';
import PodiumView from './PodiumView';
import { Switch } from './ui/switch';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'sonner';

const AICommentator: React.FC<{
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  className?: string;
}> = ({ players, roundHistory, className }) => {
  const [comment, setComment] = useState<string | null>(null);
  const [commentType, setCommentType] = useState<'info' | 'joke' | 'sarcasm' | 'encouragement'>('sarcasm');
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const generateComment = () => {
    if (!players.length || !roundHistory.length) {
      return "La partie commence à peine et je sens déjà que certains d'entre vous vont regretter d'avoir accepté de jouer...";
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
      return "En attente des joueurs... J'espère qu'ils savent au moins compter jusqu'à 10.";
    }
    
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leadingPlayer = sortedPlayers[0];
    const lastPlayer = sortedPlayers[sortedPlayers.length - 1];
    
    // Commentaires possibles selon le type - plus piquants et taquins
    const comments = {
      info: [
        leadingPlayer ? `${leadingPlayer.name} est en tête. Si seulement les autres pouvaient comprendre les règles aussi bien...` : "Cette partie est si serrée qu'on dirait que personne ne sait vraiment jouer.",
        "Cette partie est aussi imprévisible que les excuses qu'inventent les perdants.",
        minScorePlayer ? `${minScorePlayer.name} a fait ${minScore} points... Soit c'est un génie, soit les autres sont vraiment mauvais.` : "Quelqu'un a enfin compris que le but est de faire peu de points?",
        `${roundHistory.length} manches déjà? Je n'ai jamais vu une partie traîner autant...`,
        leadingPlayer && lastPlayer ? `${lastPlayer.name} est à ${lastPlayer.totalScore - leadingPlayer.totalScore} points derrière ${leadingPlayer.name}. C'est ce qu'on appelle "creuser sa propre tombe".` : "Les écarts de score sont minimes... comme les compétences des joueurs."
      ],
      joke: [
        dutchPlayer ? `${dutchPlayer.name} a fait Dutch! J'imagine déjà son air faussement surpris, comme si ce n'était pas prévisible.` : `Pas de Dutch ce tour-ci? Vous avez tous peur ou vous êtes juste trop prudents?`,
        maxScorePlayer ? `${maxScorePlayer.name} avec ${maxScore} points, c'est comme apporter une cuillère à une bataille de couteaux.` : "Ces scores sont tellement hauts qu'on pourrait penser que vous jouez à un jeu où il faut marquer beaucoup.",
        lastPlayer ? `Si ${lastPlayer.name} avait autant de talent que de malchance, on aurait une vraie compétition.` : "Certains joueurs ici me rappellent pourquoi les jeux de hasard existent - pour donner une chance à tout le monde.",
        `J'ai vu des escargots distribuer des cartes plus rapidement. Vous avez peur qu'elles s'usent?`,
        minScorePlayer ? `${minScorePlayer.name} a fait un miracle avec ${minScore} points. Dommage que les miracles soient rares dans votre cas.` : "Un bon score dans cette manche... probablement un accident."
      ],
      sarcasm: [
        maxScorePlayer ? `Wow ${maxScorePlayer.name}, ${maxScore} points! Tellement impressionnant... si on joue au golf à l'envers.` : "Ces scores sont vraiment impressionnants... pour un jeu où le but est de perdre.",
        leadingPlayer ? `${leadingPlayer.name} mène le jeu. Quelqu'un pourrait-il lui rappeler que dans ce jeu, on veut avoir MOINS de points?` : "Je me demande si quelqu'un à cette table connait réellement les règles du Dutch.",
        `À voir vos scores, je me demande si vous jouez au Dutch ou si vous inventez les règles au fur et à mesure.`,
        lastPlayer ? `La stratégie de ${lastPlayer.name} est fascinante - accumuler des points comme si c'était de l'or alors que c'est plutôt du plomb ici.` : "Certains d'entre vous semblent jouer avec une stratégie très... originale.",
        dutchPlayer ? `${dutchPlayer.name} a fait Dutch. Quelle surprise... dit absolument personne autour de cette table.` : `Pas de Dutch? C'est comme regarder un film d'action sans explosion.`
      ],
      encouragement: [
        lastPlayer ? `${lastPlayer.name}, ne t'inquiète pas! Même les pires joueurs ont parfois un coup de chance.` : "Ne désespérez pas! Même une horloge cassée donne l'heure juste deux fois par jour.",
        minScorePlayer ? `${minScorePlayer.name} nous démontre qu'on peut être bon même par accident avec ce ${minScore}.` : "Ce n'est pas la chance qui fait le bon joueur, c'est... bon, d'accord, c'est quand même 90% de chance.",
        `Un bon Dutch et tout peut basculer! Ou pas, vu comment certains d'entre vous jouent.`,
        `Restez concentrés! Ou essayez au moins, ce serait déjà un progrès pour certains.`,
        leadingPlayer ? `${leadingPlayer.name} est en tête, mais dans ce jeu, être en tête c'est comme être en tête d'une course vers une falaise.` : "La tête du classement est comme un château de cartes - instable et probablement construit par hasard."
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
      setComment("Bienvenue! Je suis votre commentateur personnel, et je sens déjà que cette partie va être... intéressante.");
    }
    
    // Générer un nouveau commentaire toutes les 15 secondes (plus fréquent) ou après un nouveau round
    const intervalId = setInterval(() => {
      setComment(generateComment());
    }, 15000);
    
    return () => clearInterval(intervalId);
  }, [roundHistory.length]);
  
  // Styles différents selon le type de commentaire
  const getCommentStyle = () => {
    switch (commentType) {
      case 'info':
        return 'border-dutch-blue/40 bg-gradient-to-r from-dutch-blue/10 to-dutch-blue/5';
      case 'joke':
        return 'border-dutch-orange/40 bg-gradient-to-r from-dutch-orange/10 to-dutch-orange/5';
      case 'sarcasm':
        return 'border-dutch-purple/40 bg-gradient-to-r from-dutch-purple/10 to-dutch-purple/5';
      case 'encouragement':
        return 'border-dutch-green/40 bg-gradient-to-r from-dutch-green/10 to-dutch-green/5';
      default:
        return 'border-dutch-blue/40 bg-gradient-to-r from-dutch-blue/10 to-dutch-blue/5';
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
          className={`p-4 border ${getCommentStyle()} backdrop-blur-sm flex items-start gap-3 cursor-pointer rounded-xl hover:shadow-md transition-shadow`}
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
              <span className="text-xs text-gray-600 -mt-1 mb-1">Analyste impitoyable</span>
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
              <p className="text-xs text-gray-400 mt-1 italic">Tapez pour plus de commentaires mordants</p>
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
  
  // Fonction améliorée pour le gradient de couleur basé sur le score
  const getScoreColor = (score: number) => {
    if (score < 0) return 'bg-green-100 text-green-800 ring-2 ring-green-400';
    if (score === 0) return 'bg-green-200 text-green-800 ring-1 ring-green-400';
    if (score <= 3) return 'bg-green-300 text-green-800';
    if (score <= 6) return 'bg-blue-200 text-blue-800';
    if (score <= 10) return 'bg-purple-200 text-purple-800';
    if (score <= 15) return 'bg-orange-200 text-orange-800';
    if (score <= 20) return 'bg-red-200 text-red-800';
    return 'bg-red-300 text-red-800';
  };
  
  return (
    <div className="overflow-x-auto">
      <Table className="w-full bg-white/90 rounded-xl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">
              <div className="flex items-center gap-1">
                <UserIcon className="h-4 w-4 text-gray-500" /> 
                <span>Joueur</span>
              </div>
            </TableHead>
            {rounds.map(round => (
              <TableHead key={round} className="text-center font-medium">
                <div className="flex items-center justify-center gap-1">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span>Manche {round}</span>
                </div>
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
            <TableHead className="w-[150px]">
              <div className="flex items-center gap-1">
                <UserIcon className="h-4 w-4 text-gray-500" /> 
                <span>Joueur</span>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Target className="h-4 w-4 text-gray-500" />
                <span>Score</span>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Calculator className="h-4 w-4 text-gray-500" />
                <span>Moyenne</span>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingDown className="h-4 w-4 text-gray-500" />
                <span>Min</span>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <span>Max</span>
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Flag className="h-4 w-4 text-gray-500" />
                <span>Dutch</span>
              </div>
            </TableHead>
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
    // Validation des scores
    if (scores.some(score => isNaN(Number(score)))) {
      toast.error("Les scores doivent être des nombres valides");
      return;
    }
    
    // Conversion des scores en nombres
    const validatedScores = scores.map(s => Number(s));
    
    onAddRound(validatedScores, dutchPlayerId);
    setIsNewRoundModalOpen(false);
    setScores([]);
    setDutchPlayerId(undefined);
  };

  // Pour les boutons flottants en bas à droite
  const FloatingActionButtons = () => (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Button
          onClick={onAddRoundHandler}
          size="floating"
          variant="game-action"
          className="shadow-lg"
        >
          <PlusIcon className="h-6 w-6" />
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.05 }}
      >
        <Button
          onClick={onUndoLastRound}
          size="floating" 
          variant="game-control"
        >
          <UndoIcon className="h-5 w-5 text-dutch-blue" />
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
      >
        <Button
          onClick={onEndGame}
          size="floating"
          variant="game-control"
          className="text-red-500"
        >
          <XIcon className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );

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
            <Button variant="dutch-glass" size="icon" className="rounded-full shadow-sm hover:shadow">
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
          <Button variant="dutch-glass" size="icon" className="rounded-full">
            <UserIcon className="h-5 w-5 text-dutch-blue" />
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
          
          {/* Boutons d'action flottants remplaçant la barre en bas */}
          <FloatingActionButtons />
          
          <div className="pt-36">
            {/* Spacer pour éviter que le contenu ne soit caché par les boutons flottants */}
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
          
          {/* Boutons d'action flottants sur desktop aussi, pour cohérence */}
          <FloatingActionButtons />
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
  
  const getNegativeScoreClass = (score: number) => {
    return score < 0 ? 'text-green-600 font-bold' : '';
  };
  
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
              <span className={`text-xl font-bold ${getNegativeScoreClass(player.totalScore)}`}>{player.totalScore}</span>
              {lastRoundScore !== undefined && (
                <span className={`ml-2 text-xs text-gray-500 flex items-center ${getNegativeScoreClass(lastRoundScore)}`}>
                  {lastRoundScore >= 0 ? '+' : ''}{lastRoundScore}
                  {player.rounds.length > 1 && player.rounds[player.rounds.length - 1].score < player.rounds[player.rounds.length - 2].score && (
                    <TrendingDown className="h-3 w-3 ml-0.5 text-green-500" aria-hidden="true" />
                  )}
                  {player.rounds.length > 1 && player.rounds[player.rounds.length - 1].score > player.rounds[player.rounds.length - 2].score && (
                    <TrendingUp className="h-3 w-3 ml-0.5 text-red-500" aria-hidden="true" />
                  )}
                </span>
              )}
            </div>
          </div>
          
          {stats && (
            <div className="mt-3 grid grid-cols-3 gap-x-2 gap-y-1">
              <div className="text-center bg-dutch-blue/5 rounded-lg p-1.5">
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <Calculator className="w-3 h-3" /> Moy
                </div>
                <div className="font-bold text-dutch-blue">{stats.averageScore.toFixed(1)}</div>
              </div>
              <div className="text-center bg-dutch-green/5 rounded-lg p-1.5">
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <TrendingDown className="w-3 h-3" /> Min
                </div>
                <div className={`font-bold text-dutch-green ${getNegativeScoreClass(stats.bestRound || 0)}`}>
                  {stats.bestRound || '-'}
                </div>
              </div>
              <div className="text-center bg-dutch-orange/5 rounded-lg p-1.5">
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <Flag className="w-3 h-3" /> Dutch
                </div>
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
            const isNegativeScore = round.score < 0;
            
            return (
              <motion.div 
                key={index} 
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  transition-transform shadow-sm ${
                    round.isDutch ? 'bg-gradient-to-br from-dutch-orange to-dutch-pink text-white' : 
                    isNegativeScore ? 'bg-gradient-to-br from-green-400 to-green-500 text-white ring-2 ring-green-300' :
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
