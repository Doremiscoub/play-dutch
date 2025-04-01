
import React, { useState, useEffect, useCallback } from 'react';
import { Player } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, Bot, User, MessageCircle } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-mobile';
import { AI_COMMENTATOR_CONFIG } from '@/config/uiConfig';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface AICommentatorProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  className?: string;
}

const AICommentator: React.FC<AICommentatorProps> = ({ 
  players, 
  roundHistory, 
  className = '' 
}) => {
  const [comment, setComment] = useState<string | null>(null);
  const [commentType, setCommentType] = useState<'info' | 'joke' | 'sarcasm' | 'encouragement'>('info');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const generateComment = useCallback(() => {
    if (!players.length) {
      return "La partie vient de commencer ! Qui sera le champion aujourd'hui ?";
    }
    
    const commentTypes = AI_COMMENTATOR_CONFIG.commentTypes as Array<'info' | 'joke' | 'sarcasm' | 'encouragement'>;
    const randomType = commentTypes[Math.floor(Math.random() * commentTypes.length)];
    setCommentType(randomType);
    
    // Récupérer le dernier round
    const lastRound = roundHistory.length > 0 ? roundHistory[roundHistory.length - 1] : null;
    const dutchPlayerId = lastRound?.dutchPlayerId;
    const dutchPlayer = dutchPlayerId ? players.find(p => p.id === dutchPlayerId) : null;
    
    // Trouver le joueur avec le score le plus bas et le plus élevé du dernier tour
    let minScorePlayer = null;
    let maxScorePlayer = null;
    
    if (lastRound) {
      const lastRoundScores = lastRound.scores;
      const minScore = Math.min(...lastRoundScores);
      const maxScore = Math.max(...lastRoundScores);
      const minScoreIndex = lastRoundScores.indexOf(minScore);
      const maxScoreIndex = lastRoundScores.indexOf(maxScore);
      
      minScorePlayer = minScoreIndex >= 0 && minScoreIndex < players.length ? players[minScoreIndex] : null;
      maxScorePlayer = maxScoreIndex >= 0 && maxScoreIndex < players.length ? players[maxScoreIndex] : null;
    }
    
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
        minScorePlayer ? `${minScorePlayer.name} a réalisé un excellent score de ${minScorePlayer.rounds[minScorePlayer.rounds.length - 1]?.score} points ! Continuez comme ça !` : "Excellent score le plus bas de cette manche !",
        `Déjà ${roundHistory.length} manches jouées. La partie bat son plein !`,
        leadingPlayer && lastPlayer ? `L'écart entre le 1er et le dernier est de ${lastPlayer.totalScore - leadingPlayer.totalScore} points.` : "Les scores sont très rapprochés !"
      ],
      joke: [
        dutchPlayer ? `${dutchPlayer.name} a fait Dutch ! C'était prévisible, vu comment il/elle tient ses cartes...` : `Personne n'a fait Dutch ce tour-ci... vous êtes tous trop prudents ou simplement chanceux ?`,
        maxScorePlayer ? `${maxScorePlayer.name} avec ${maxScorePlayer.rounds[maxScorePlayer.rounds.length - 1]?.score} points ? Je dirais que quelqu'un a besoin de lunettes pour mieux lire ses cartes !` : "Quelqu'un a besoin de lunettes pour mieux lire ses cartes !",
        lastPlayer ? `Si ${lastPlayer.name} continue comme ça, il/elle va bientôt pouvoir prendre sa retraite... du jeu !` : "Certains joueurs devraient peut-être envisager une retraite anticipée du jeu !",
        `J'ai vu des escargots distribuer les cartes plus rapidement que vous !`,
        minScorePlayer ? `${minScorePlayer.name} joue comme un pro ! Ou alors c'est juste un coup de chance incroyable...` : "Il y a des pros parmi nous ! Ou juste beaucoup de chance..."
      ],
      sarcasm: [
        maxScorePlayer ? `Wow, ${maxScorePlayer.name}, ${maxScorePlayer.rounds[maxScorePlayer.rounds.length - 1]?.score} points ! Impressionnant... si l'objectif était de marquer le PLUS de points.` : "Des scores impressionnants... si l'objectif était de marquer le PLUS de points.",
        leadingPlayer ? `Je vois que ${leadingPlayer.name} est en tête. Quelqu'un veut lui rappeler que c'est celui qui a le MOINS de points qui gagne ?` : "Quelqu'un veut rappeler aux joueurs que c'est celui qui a le MOINS de points qui gagne ?",
        `À ce stade, je me demande si certains d'entre vous connaissent vraiment les règles du jeu.`,
        lastPlayer ? `${lastPlayer.name} semble avoir une stratégie très... intéressante. On appelle ça "perdre avec style" ?` : "Certains semblent avoir une stratégie très... intéressante. Perdre avec style ?",
        dutchPlayer ? `${dutchPlayer.name} a fait Dutch. Quelle surprise... dit personne jamais.` : `Pas de Dutch ce tour-ci ? Vous commencez enfin à comprendre comment jouer !`
      ],
      encouragement: [
        lastPlayer ? `Ne désespérez pas ${lastPlayer.name} ! Même les plus grands champions ont connu des moments difficiles.` : "Ne désespérez pas ! Même les plus grands champions ont connu des moments difficiles.",
        minScorePlayer ? `${minScorePlayer.name} montre une excellente maîtrise du jeu avec un score de ${minScorePlayer.rounds[minScorePlayer.rounds.length - 1]?.score} !` : "Excellent jeu de la part du meilleur joueur ce tour-ci !",
        `Tout peut encore changer ! Un bon Dutch et les scores seront bouleversés.`,
        `Restez concentrés, la partie est encore longue !`,
        leadingPlayer ? `${leadingPlayer.name} est en tête, mais rien n'est joué ! Gardez votre sang-froid et prenez les bonnes décisions.` : "La tête du classement peut encore changer ! Gardez votre sang-froid."
      ]
    };
    
    // Sélectionner un commentaire aléatoire du type choisi
    const commentsList = comments[randomType];
    const randomComment = commentsList[Math.floor(Math.random() * commentsList.length)];
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    return randomComment;
  }, [players, roundHistory]);
  
  useEffect(() => {
    if (roundHistory.length === 0) {
      setComment("Bienvenue ! La partie vient de commencer. Qui sera le grand gagnant ?");
    } else if (roundHistory.length === 1) {
      // Premier round spécifiquement
      setComment(generateComment());
    }
    
    // Générer un nouveau commentaire toutes les 20 secondes ou après un nouveau round
    const intervalId = setInterval(() => {
      setComment(generateComment());
    }, AI_COMMENTATOR_CONFIG.commentFrequency);
    
    return () => clearInterval(intervalId);
  }, [roundHistory.length, generateComment]);
  
  // Générer un nouveau commentaire quand un round est ajouté
  useEffect(() => {
    if (roundHistory.length > 0) {
      setComment(generateComment());
    }
  }, [roundHistory.length, generateComment]);
  
  // Styles différents selon le type de commentaire
  const getCommentStyle = () => {
    return AI_COMMENTATOR_CONFIG.styles[commentType] || AI_COMMENTATOR_CONFIG.styles.info;
  };
  
  const getCommentIcon = () => {
    switch (commentType) {
      case 'info':
        return <MessageSquare className="h-4 w-4 text-dutch-blue" />;
      case 'joke':
        return <Sparkles className="h-4 w-4 text-dutch-orange" />;
      case 'sarcasm':
        return <Bot className="h-4 w-4 text-dutch-purple" />;
      case 'encouragement':
        return <User className="h-4 w-4 text-dutch-green" />;
      default:
        return <MessageSquare className="h-4 w-4 text-dutch-blue" />;
    }
  };

  return (
    <motion.div 
      className={`${className} rounded-xl overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <Card className={`p-4 border shadow-sm ${getCommentStyle()} backdrop-blur-sm`}>
        <div className="flex flex-col">
          <div 
            className="flex items-start gap-3 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <motion.div 
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                commentType === 'info' ? 'bg-dutch-blue/20' : 
                commentType === 'joke' ? 'bg-dutch-orange/20' : 
                commentType === 'sarcasm' ? 'bg-dutch-purple/20' : 
                'bg-dutch-green/20'
              }`}
              animate={isAnimating ? { 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
              } : {}}
              transition={{ duration: 0.5 }}
            >
              {getCommentIcon()}
            </motion.div>
            
            <div className="flex-grow">
              <div className="flex items-center mb-1">
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  Commentateur IA
                  <Badge className="ml-2 text-xs" variant="outline">
                    {commentType === 'info' && "Info"}
                    {commentType === 'joke' && "Blague"}
                    {commentType === 'sarcasm' && "Sarcasme"}
                    {commentType === 'encouragement' && "Encouragement"}
                  </Badge>
                </h3>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.p 
                  key={comment}
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {comment}
                </motion.p>
              </AnimatePresence>
              
              {isMobile && !isExpanded && (
                <p className="text-xs text-gray-400 mt-1">Appuyez pour voir plus de commentaires</p>
              )}
            </div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-dutch-blue/10 hover:bg-dutch-blue/20 text-dutch-blue border-dutch-blue/30 text-xs"
                    onClick={() => {
                      setCommentType('info');
                      setComment(generateComment());
                    }}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Info
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-dutch-orange/10 hover:bg-dutch-orange/20 text-dutch-orange border-dutch-orange/30 text-xs"
                    onClick={() => {
                      setCommentType('joke');
                      setComment(generateComment());
                    }}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Blague
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-dutch-purple/10 hover:bg-dutch-purple/20 text-dutch-purple border-dutch-purple/30 text-xs"
                    onClick={() => {
                      setCommentType('sarcasm');
                      setComment(generateComment());
                    }}
                  >
                    <Bot className="h-3 w-3 mr-1" />
                    Sarcasme
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-dutch-green/10 hover:bg-dutch-green/20 text-dutch-green border-dutch-green/30 text-xs"
                    onClick={() => {
                      setCommentType('encouragement');
                      setComment(generateComment());
                    }}
                  >
                    <User className="h-3 w-3 mr-1" />
                    Encouragement
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};

export default AICommentator;
