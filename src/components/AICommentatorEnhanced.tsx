
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Bot, Sparkles, TrendingUp } from 'lucide-react';
import { Player } from '@/types';

interface AICommentatorEnhancedProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const AICommentatorEnhanced: React.FC<AICommentatorEnhancedProps> = ({ players, roundHistory }) => {
  const [currentComment, setCurrentComment] = useState<{
    message: string;
    type: 'info' | 'joke' | 'sarcasm' | 'encouragement';
  } | null>(null);

  const generateComment = () => {
    if (!players.length) return null;

    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leader = sortedPlayers[0];
    const lastPlace = sortedPlayers[sortedPlayers.length - 1];
    const totalRounds = players[0]?.rounds.length || 0;
    const dutchCount = roundHistory.filter(r => r.dutchPlayerId).length;

    const comments = {
      info: [
        `Nous en sommes à la manche ${totalRounds}. ${leader.name} mène avec ${leader.totalScore} points !`,
        `${dutchCount} Dutch ont été réalisés jusqu'à présent. Impressionnant !`,
        `La partie devient serrée ! Seulement ${lastPlace.totalScore - leader.totalScore} points d'écart.`
      ],
      joke: [
        `${lastPlace.name}, c'est le moment de consulter un manuel de règles peut-être ? 🎯`,
        `${leader.name} semble avoir trouvé la formule secrète... ou a-t-il triché ? 🤔`,
        `À ce rythme, on va finir avant que ${lastPlace.name} ne comprenne le jeu ! 😄`
      ],
      sarcasm: [
        `Bravo ${lastPlace.name}, tu redéfinis les limites du possible ! 🙄`,
        `${leader.name}, laisse un peu de place aux autres, voyons ! 😏`,
        `Cette partie est... comment dire... palpitante ! 🎭`
      ],
      encouragement: [
        `Allez ${lastPlace.name}, le comeback est possible ! 💪`,
        `Excellent jeu ${leader.name}, continue comme ça ! ⭐`,
        `Tout peut encore arriver, la partie n'est pas finie ! 🚀`
      ]
    };

    const types = Object.keys(comments) as Array<keyof typeof comments>;
    const randomType = types[Math.floor(Math.random() * types.length)];
    const typeComments = comments[randomType];
    const randomComment = typeComments[Math.floor(Math.random() * typeComments.length)];

    return {
      message: randomComment,
      type: randomType
    };
  };

  useEffect(() => {
    if (players.length > 0 && roundHistory.length > 0) {
      const timer = setTimeout(() => {
        setCurrentComment(generateComment());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [roundHistory.length]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'info': return <MessageSquare className="h-5 w-5" />;
      case 'joke': return <Sparkles className="h-5 w-5" />;
      case 'sarcasm': return <Bot className="h-5 w-5" />;
      case 'encouragement': return <TrendingUp className="h-5 w-5" />;
      default: return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getStyle = (type: string) => {
    switch (type) {
      case 'info': return 'border-dutch-blue/30 bg-dutch-blue/5 text-dutch-blue';
      case 'joke': return 'border-dutch-orange/30 bg-dutch-orange/5 text-dutch-orange';
      case 'sarcasm': return 'border-dutch-purple/30 bg-dutch-purple/5 text-dutch-purple';
      case 'encouragement': return 'border-green-500/30 bg-green-50 text-green-700';
      default: return 'border-gray-300 bg-gray-50 text-gray-700';
    }
  };

  if (!currentComment) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className={`
          rounded-2xl border-2 backdrop-blur-sm p-4 mb-4 relative overflow-hidden
          ${getStyle(currentComment.type)}
        `}
      >
        {/* 3D Professor Avatar - Much Larger */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-dutch-purple via-dutch-blue to-dutch-orange flex items-center justify-center text-white font-bold text-lg shadow-lg"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🎩
          </motion.div>
        </div>

        <div className="flex items-start gap-3 pr-20">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center shadow-md
            ${currentComment.type === 'info' ? 'bg-dutch-blue/10' : 
              currentComment.type === 'joke' ? 'bg-dutch-orange/10' :
              currentComment.type === 'sarcasm' ? 'bg-dutch-purple/10' : 'bg-green-100'}
          `}>
            {getIcon(currentComment.type)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-sm">Professeur Cartouche</h4>
              <span className="text-xs opacity-70">•</span>
              <span className="text-xs opacity-70 capitalize">{currentComment.type}</span>
            </div>
            <p className="text-sm leading-relaxed">{currentComment.message}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AICommentatorEnhanced;
