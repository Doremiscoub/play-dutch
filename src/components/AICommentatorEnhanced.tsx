
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import ProfessorAvatar from './game/ProfessorAvatar';

interface AICommentatorEnhancedProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
}

const AICommentatorEnhanced: React.FC<AICommentatorEnhancedProps> = ({
  players,
  roundCount,
  scoreLimit
}) => {
  const [currentComment, setCurrentComment] = useState<string>('');
  const [commentType, setCommentType] = useState<'info' | 'joke' | 'encouragement' | 'observation'>('info');

  // Generate contextual comments based on game state
  const generateComment = () => {
    if (players.length === 0) return;

    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leader = sortedPlayers[0];
    const lastPlace = sortedPlayers[sortedPlayers.length - 1];
    const dutchCount = players.reduce((total, player) => total + player.rounds.filter(r => r.isDutch).length, 0);
    
    const comments = {
      start: [
        "Bienvenue dans cette nouvelle partie ! Que le meilleur gagne... ou plutôt, que le moins mauvais survive ! 🎲",
        "Ah, des nouveaux adversaires ! J'ai hâte de voir qui sera le premier à craquer sous la pression... 😈",
        "Une nouvelle bataille commence ! Préparez-vous à découvrir vos véritables talents... ou leur absence ! 🎭"
      ],
      
      early: [
        `${leader.name} ${leader.emoji} prend les devants ! Mais attention, c'est souvent les premiers qui chutent le plus dur ! 📉`,
        `Seulement ${roundCount} manche${roundCount > 1 ? 's' : ''} et déjà des surprises ! Continuez comme ça, c'est divertissant ! 🍿`,
        `${dutchCount} Dutch déjà ? Quelqu'un a visiblement besoin de réviser les règles ! 📚`
      ],
      
      midGame: [
        `${leader.name} ${leader.emoji} domine avec ${leader.totalScore} points ! Mais la roue tourne toujours... ⚡`,
        `${lastPlace.name} ${lastPlace.emoji}, il serait peut-être temps de changer de stratégie ? Juste une suggestion... 🤔`,
        `${roundCount} manches déjà ! Le temps passe vite quand on s'amuse... enfin, pour certains ! ⏰`
      ],
      
      endGame: [
        `${leader.name} ${leader.emoji} frôle la victoire avec ${leader.totalScore} points ! Qui va craquer en premier ? 🎯`,
        `La tension monte ! Plus que ${scoreLimit - leader.totalScore} points et c'est fini pour ${leader.name} ! 🔥`,
        `Le suspense est à son comble ! ${leader.name} ${leader.emoji} va-t-il tenir le coup ? 🎬`
      ],
      
      dutch: [
        `Un Dutch ! Quelqu'un vient de sauver sa peau... temporairement ! 🦸‍♂️`,
        `Magnifique Dutch ! Voilà ce qu'on appelle un comeback héroïque ! ⭐`,
        `Dutch parfait ! Si seulement vous pouviez jouer comme ça tout le temps... 🎯`
      ]
    };

    let commentSet: string[];
    let type: 'info' | 'joke' | 'encouragement' | 'observation' = 'info';

    if (roundCount === 0) {
      commentSet = comments.start;
      type = 'encouragement';
    } else if (roundCount <= 3) {
      commentSet = comments.early;
      type = 'observation';
    } else if (leader.totalScore < scoreLimit * 0.7) {
      commentSet = comments.midGame;
      type = 'joke';
    } else {
      commentSet = comments.endGame;
      type = 'info';
    }

    // Check for recent Dutch
    const recentDutch = players.some(player => 
      player.rounds.length > 0 && player.rounds[player.rounds.length - 1]?.isDutch
    );
    
    if (recentDutch && roundCount > 0) {
      commentSet = comments.dutch;
      type = 'encouragement';
    }

    const randomComment = commentSet[Math.floor(Math.random() * commentSet.length)];
    setCurrentComment(randomComment);
    setCommentType(type);
  };

  // Generate new comment when game state changes
  useEffect(() => {
    generateComment();
  }, [players, roundCount]);

  const getCommentStyle = () => {
    switch (commentType) {
      case 'encouragement':
        return 'bg-gradient-to-r from-green-50/90 to-emerald-50/90 border-green-200/60 text-green-800';
      case 'joke':
        return 'bg-gradient-to-r from-amber-50/90 to-orange-50/90 border-amber-200/60 text-amber-800';
      case 'observation':
        return 'bg-gradient-to-r from-blue-50/90 to-cyan-50/90 border-blue-200/60 text-blue-800';
      default:
        return 'bg-gradient-to-r from-purple-50/90 to-indigo-50/90 border-purple-200/60 text-purple-800';
    }
  };

  if (!currentComment) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentComment}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`
          backdrop-blur-xl border rounded-3xl p-6 shadow-lg transition-all duration-300
          ${getCommentStyle()}
        `}
      >
        <div className="flex items-start gap-4">
          {/* Professor Avatar - Larger size */}
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ProfessorAvatar 
              size="xl"
              animate={true}
              className="flex-shrink-0"
            />
          </motion.div>
          
          {/* Comment Bubble */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Speech bubble pointer */}
            <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-current opacity-20" />
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
              <motion.p 
                className="text-sm font-medium leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {currentComment}
              </motion.p>
              
              {/* Typing indicator effect */}
              <motion.div
                className="flex items-center mt-2 text-xs opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="mr-2">Professeur Cartouche</span>
                <div className="flex gap-1">
                  <motion.div 
                    className="w-1 h-1 bg-current rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div 
                    className="w-1 h-1 bg-current rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-1 h-1 bg-current rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AICommentatorEnhanced;
