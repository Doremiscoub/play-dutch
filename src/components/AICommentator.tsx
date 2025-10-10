/**
 * Composant de commentaires du Professeur Cartouche
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { getRandomComment } from '@/utils/commentGenerator';
import ProfessorAvatar from './game/ProfessorAvatar';
import { useElevenLabs } from '@/hooks/use-eleven-labs';
import { useSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';
import { ModernTitle } from './ui/modern-title';

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
  const [comment, setComment] = useState('');
  const [commentType, setCommentType] = useState<'info' | 'joke' | 'sarcasm' | 'encouragement' | 'headline'>('info');
  const [isVisible, setIsVisible] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { speakWithFallback } = useElevenLabs();
  const { isSoundEnabled, playCardSound } = useSound();

  useEffect(() => {
    if (players.length === 0) return;

    const generateComment = () => {
      const { comment, type } = getRandomComment(players, roundHistory);
      setComment(comment);
      setCommentType(type);
    };

    generateComment();

    const interval = setInterval(() => {
      generateComment();
    }, 20000);

    return () => clearInterval(interval);
  }, [players, roundHistory]);

  if (!comment) return null;

  const commentStyles = {
    info: 'border-trinity-blue-300/20 bg-gradient-to-br from-trinity-blue-50/80 to-trinity-purple-50/80',
    joke: 'border-trinity-orange-300/20 bg-gradient-to-br from-trinity-orange-50/80 to-trinity-purple-50/80',
    sarcasm: 'border-trinity-purple-300/20 bg-gradient-to-br from-trinity-purple-50/80 to-trinity-blue-50/80',
    encouragement: 'border-success/20 bg-gradient-to-br from-success-light/20 to-trinity-blue-50/80',
    headline: 'border-trinity-orange-300/20 bg-gradient-to-r from-trinity-orange-100/60 to-trinity-purple-100/60'
  };

  const speakMessage = async () => {
    if (!isSpeaking && isSoundEnabled) {
      setIsSpeaking(true);
      
      playCardSound();
      
      await speakWithFallback(comment);
      
      setIsSpeaking(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className={cn(
            'rounded-3xl border p-6 md:p-8',
            commentStyles[commentType],
            'backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-500',
            'hover:-translate-y-1',
            'relative overflow-hidden',
            className
          )}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-gradient-to-br from-trinity-purple-200/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-trinity-blue-200/30 to-transparent rounded-full blur-3xl" />
          </div>

          {/* Mobile Layout: Column */}
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 relative z-10">
            {/* Avatar - Centered on mobile */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <ProfessorAvatar 
                size="lg"
                animate={true}
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Content - Full width on mobile */}
            <div className="flex-1 w-full space-y-3 md:space-y-4">
              {/* Title - Always centered on mobile, left on desktop */}
              <motion.div 
                className="text-center md:text-left"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <motion.h1 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent flex items-center justify-center md:justify-start gap-2 sm:gap-3 hover-scale flex-wrap"
                  whileHover={{
                    rotate: [-0.5, 0.5, -0.5, 0],
                    backgroundPosition: "200% center"
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                  transition={{ 
                    duration: 0.5,
                    rotate: { duration: 0.6, ease: "easeInOut" }
                  }}
                >
                  <motion.span
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🎓
                  </motion.span>
                  <span className="text-trinity-blue-700 font-bold">Professeur</span>
                  <motion.span 
                    className="text-trinity-orange-600 font-extrabold"
                    animate={{
                      textShadow: [
                        "0 0 0px hsl(var(--dutch-orange) / 0)",
                        "0 0 10px hsl(var(--dutch-orange) / 0.5)",
                        "0 0 0px hsl(var(--dutch-orange) / 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    Cartouche
                  </motion.span>
                  <motion.span
                    animate={{
                      rotate: [0, -5, 5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  >
                    🃏
                  </motion.span>
                </motion.h1>
              </motion.div>
              
              {commentType === 'headline' ? (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-bold leading-relaxed tracking-wide text-trinity"
                >
                  {comment}
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-amber-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-blue-200/50 shadow-lg"
                  whileHover={{ 
                    scale: 1.01,
                    boxShadow: "0 10px 30px hsl(var(--dutch-blue) / 0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] animate-[shimmer_3s_infinite]" />
                  
                  <motion.p 
                    className="text-base sm:text-lg font-medium leading-relaxed text-gray-800 relative z-10 text-center sm:text-left"
                    whileHover={{
                      scale: 1.01
                    }}
                  >
                    <motion.span
                      className="inline-block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      💬
                    </motion.span>
                    {" "}
                    <span className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                      {comment}
                    </span>
                  </motion.p>
                  
                  {/* Points de décoration */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AICommentator;
