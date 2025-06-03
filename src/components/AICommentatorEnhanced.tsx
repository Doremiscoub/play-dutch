
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import ProfessorAvatar from './game/ProfessorAvatar';
import { MessageCircle, Brain, Lightbulb, Trophy, Target, Smile } from 'lucide-react';

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
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);

  // Typing animation effect
  useEffect(() => {
    if (currentComment) {
      setIsTyping(true);
      setDisplayedText('');
      
      const words = currentComment.split(' ');
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < words.length) {
          setDisplayedText(prev => prev + (currentIndex === 0 ? '' : ' ') + words[currentIndex]);
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [currentComment]);

  // Helper function to safely get player display name - CORRECTION DU BUG "undefined"
  const getPlayerDisplayName = (player: Player) => {
    if (!player || !player.name) return 'Joueur inconnu';
    
    // Vérifier si l'emoji existe et n'est pas vide
    const hasValidEmoji = player.emoji && player.emoji.trim() && player.emoji.trim() !== '';
    const emoji = hasValidEmoji ? ` ${player.emoji.trim()}` : '';
    
    return `${player.name}${emoji}`;
  };

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
        `${getPlayerDisplayName(leader)} prend les devants ! Mais attention, c'est souvent les premiers qui chutent le plus dur ! 📉`,
        `Seulement ${roundCount} manche${roundCount > 1 ? 's' : ''} et déjà des surprises ! Continuez comme ça, c'est divertissant ! 🍿`,
        `${dutchCount} Dutch déjà ? Quelqu'un a visiblement besoin de réviser les règles ! 📚`
      ],
      
      midGame: [
        `${getPlayerDisplayName(leader)} domine avec ${leader.totalScore} points ! Mais la roue tourne toujours... ⚡`,
        `${getPlayerDisplayName(lastPlace)}, il serait peut-être temps de changer de stratégie ? Juste une suggestion... 🤔`,
        `${roundCount} manches déjà ! Le temps passe vite quand on s'amuse... enfin, pour certains ! ⏰`
      ],
      
      endGame: [
        `${getPlayerDisplayName(leader)} frôle la victoire avec ${leader.totalScore} points ! Qui va craquer en premier ? 🎯`,
        `La tension monte ! Plus que ${scoreLimit - leader.totalScore} points et c'est fini pour ${leader.name} ! 🔥`,
        `Le suspense est à son comble ! ${getPlayerDisplayName(leader)} va-t-il tenir le coup ? 🎬`
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
        return {
          gradient: 'from-emerald-500/20 via-green-500/10 to-emerald-600/20',
          border: 'border-emerald-200/40',
          icon: <Trophy className="w-5 h-5 text-emerald-600" />,
          mood: 'happy' as const
        };
      case 'joke':
        return {
          gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-600/20',
          border: 'border-amber-200/40',
          icon: <Smile className="w-5 h-5 text-amber-600" />,
          mood: 'excited' as const
        };
      case 'observation':
        return {
          gradient: 'from-blue-500/20 via-cyan-500/10 to-indigo-600/20',
          border: 'border-blue-200/40',
          icon: <Brain className="w-5 h-5 text-blue-600" />,
          mood: 'thinking' as const
        };
      default:
        return {
          gradient: 'from-purple-500/20 via-indigo-500/10 to-purple-600/20',
          border: 'border-purple-200/40',
          icon: <Lightbulb className="w-5 h-5 text-purple-600" />,
          mood: 'neutral' as const
        };
    }
  };

  if (!currentComment) return null;

  const style = getCommentStyle();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentComment}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.9 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        {/* Main Container with Modern Glassmorphism */}
        <div className={`
          relative backdrop-blur-xl border-2 rounded-[2rem] p-8 shadow-2xl transition-all duration-500
          bg-gradient-to-br ${style.gradient} ${style.border}
          hover:shadow-3xl hover:scale-[1.02]
        `}>
          
          {/* Ambient Background Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} rounded-[2rem] blur-xl opacity-50 -z-10`} />
          
          <div className="flex items-start gap-8">
            {/* Professor Avatar - Enhanced avec le nouveau composant unifié */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 150 }}
              className="flex-shrink-0"
            >
              <ProfessorAvatar 
                size="xxl"
                animate={true}
                mood={style.mood}
                showParticles={true}
                className="shadow-2xl"
              />
            </motion.div>
            
            {/* Enhanced Comment Bubble */}
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Organic Speech Bubble Pointer */}
              <div className="absolute -left-6 top-8 w-0 h-0">
                <div className="border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[24px] border-r-white/90" />
                <div className="absolute -top-[18px] -right-[22px] border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-r-[20px] border-r-white/60" />
              </div>
              
              {/* Modern Glass Speech Bubble */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60 relative overflow-hidden">
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite] skew-x-12" />
                
                {/* Header with Icon */}
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {style.icon}
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Professeur Cartouche
                  </span>
                  <MessageCircle className="w-4 h-4 text-gray-400" />
                </motion.div>
                
                {/* Animated Text Content */}
                <motion.div
                  className="min-h-[4rem]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-lg font-medium leading-relaxed text-gray-800 mb-4">
                    {displayedText}
                    {isTyping && (
                      <motion.span
                        className="inline-block w-0.5 h-5 bg-dutch-purple ml-1"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </p>
                </motion.div>
                
                {/* Footer with Enhanced Signature */}
                <motion.div
                  className="flex items-center justify-between pt-4 border-t border-gray-200/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-full" />
                    <span className="font-bold text-dutch-purple tracking-wider">
                      Prof. Cartouche
                    </span>
                  </div>
                  
                  {/* Enhanced Typing Indicator */}
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div 
                        key={i}
                        className="w-2 h-2 bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-full"
                        animate={{ 
                          scale: [1, 1.3, 1], 
                          opacity: [0.4, 1, 0.4] 
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AICommentatorEnhanced;
