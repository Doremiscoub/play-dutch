
import React, { useState, useEffect } from 'react';
import { Player } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AICommentatorProps {
  players: Player[];
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  className?: string;
}

const AICommentator: React.FC<AICommentatorProps> = ({ 
  players, 
  roundHistory = [],
  className = ''
}) => {
  const [comment, setComment] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  
  // Génère un commentaire aléatoire et fun basé sur l'état actuel du jeu
  useEffect(() => {
    if (!players || players.length === 0) return;
    
    setIsThinking(true);
    
    // Simulation d'un délai de "réflexion" pour l'IA
    const timer = setTimeout(() => {
      const newComment = generateComment(players, roundHistory);
      setComment(newComment);
      setIsThinking(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [players, roundHistory]);
  
  // Fonction pour générer des commentaires fun et taquins
  const generateComment = (players: Player[], roundHistory: { scores: number[], dutchPlayerId?: string }[]): string => {
    const roundCount = players[0]?.rounds?.length || 0;
    const lastRound = roundHistory[roundHistory.length - 1];
    
    // Pas de manche jouée
    if (roundCount === 0) {
      const funStartComments = [
        "🎮 Qui sera le maître du Dutch aujourd'hui ? Que la partie commence !",
        "🃏 Les cartes sont prêtes, les joueurs aussi ? C'est parti !",
        "⚡ Préparez-vous à vivre une partie de légende ! Ou pas... 😏",
        "🔥 Dutch Time ! Qui va se planter en premier ?",
        "👀 J'ai parié sur toi en secret. Ne me déçois pas !",
        "🎭 Prêts à bluffer comme jamais ? Montrez-moi ce que vous avez dans le ventre !",
        "🚀 C'est l'heure de sortir vos meilleurs coups ! Et vos pires excuses..."
      ];
      return funStartComments[Math.floor(Math.random() * funStartComments.length)];
    }
    
    // Commentaires sur la dernière manche
    if (lastRound) {
      // Trouver le meilleur et le pire joueur de la dernière manche
      const bestPlayerIndex = lastRound.scores.indexOf(Math.min(...lastRound.scores));
      const worstPlayerIndex = lastRound.scores.indexOf(Math.max(...lastRound.scores));
      const bestPlayer = players[bestPlayerIndex];
      const worstPlayer = players[worstPlayerIndex];
      const dutchPlayer = players.find(p => p.id === lastRound.dutchPlayerId);
      
      // Différents types de commentaires selon la situation
      const commentTypes = [];
      
      // Commentaire sur le Dutch
      if (dutchPlayer) {
        commentTypes.push([
          `🎯 ${dutchPlayer.name} a crié "Dutch" ! Le stress est à son comble !`,
          `😱 Wow, ${dutchPlayer.name} a osé annoncer Dutch ! Courageux ou suicidaire ?`,
          `🔥 ${dutchPlayer.name} joue avec le feu en annonçant Dutch. Stratégie ou panique ?`,
          `🃏 Dutch annoncé par ${dutchPlayer.name} ! Les autres joueurs transpirent...`,
          `⚡ ${dutchPlayer.name} a lâché le fameux "Dutch" ! Les cartes vont voler !`
        ]);
      }
      
      // Commentaire sur le meilleur joueur
      commentTypes.push([
        `✨ ${bestPlayer.name} assure grave avec seulement ${lastRound.scores[bestPlayerIndex]} points !`,
        `🏆 ${bestPlayer.name} nous fait une démonstration de skill ! Les autres peuvent prendre des notes.`,
        `🔥 ${bestPlayer.name} est en feu ! ${lastRound.scores[bestPlayerIndex]} points, c'est propre !`,
        `👑 Chapeau bas ${bestPlayer.name} ! Tu joues comme un pro, ou t'as juste de la chance ?`,
        `🚀 ${bestPlayer.name} décolle ! À ce rythme, la victoire est proche !`
      ]);
      
      // Commentaire sur le pire joueur (mais de façon amusante)
      commentTypes.push([
        `😅 ${lastRound.scores[worstPlayerIndex]} points pour ${worstPlayer.name}... Aïe aïe aïe !`,
        `🙈 ${worstPlayer.name} collectionne ${lastRound.scores[worstPlayerIndex]} points. Collectionneur de points ou stratège incompris ?`,
        `💩 Oof, ${worstPlayer.name} prend ${lastRound.scores[worstPlayerIndex]} points. Tu joues avec les pieds ?`,
        `🤦‍♂️ ${worstPlayer.name}, c'était quoi ce tour ? ${lastRound.scores[worstPlayerIndex]} points, sérieux ?!`,
        `🎭 ${worstPlayer.name} prend ${lastRound.scores[worstPlayerIndex]} points. Tu fais exprès ou... ?`
      ]);
      
      // Commentaire sur l'évolution globale de la partie
      const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
      const leader = sortedPlayers[0];
      const lastPlace = sortedPlayers[sortedPlayers.length - 1];
      
      commentTypes.push([
        `📊 ${leader.name} mène la danse avec ${leader.totalScore} points au total. ${lastPlace.name} traîne derrière avec ${lastPlace.totalScore}.`,
        `🔮 À ce stade, je prédis une victoire de ${leader.name}. Sauf si les cartes en décident autrement !`,
        `🎢 Quelle partie ! Les scores font le grand huit et mon cœur aussi !`,
        `🍿 Je kiffe cette partie ! Continuez comme ça, vous me régalez !`,
        `🤪 Cette manche était folle ! Qui dit mieux pour la suivante ?`
      ]);
      
      // Sélectionner un type de commentaire aléatoire
      const selectedType = commentTypes[Math.floor(Math.random() * commentTypes.length)];
      return selectedType[Math.floor(Math.random() * selectedType.length)];
    }
    
    // Commentaire par défaut
    return "👀 Hmm, intéressant... Continuez à jouer, je vous observe !";
  };

  return (
    <div className={`rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm p-4 shadow-sm ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium flex items-center gap-1 text-dutch-purple">
          <Sparkles className="h-4 w-4" />
          Professeur Cartouche
          <Badge className="ml-1 text-xs bg-dutch-purple/20 text-dutch-purple hover:bg-dutch-purple/30 border-none">IA</Badge>
        </h3>
      </div>
      <div className="min-h-[60px] flex items-center">
        <AnimatePresence mode="wait">
          {isThinking ? (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-gray-500"
            >
              <div className="flex space-x-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-dutch-purple/60"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-dutch-purple/60"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-dutch-purple/60"
                />
              </div>
              <span className="text-sm">Le Prof réfléchit...</span>
            </motion.div>
          ) : (
            <motion.div
              key="comment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-2"
            >
              <MessageSquare className="h-5 w-5 text-dutch-purple flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-sm">
                {comment}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AICommentator;
