
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { generateComment, getCommentStyle } from './commentUtils';
import ProfessorAvatar from '../game/ProfessorAvatar';
import CommentBubble from './CommentBubble';
import CommentPointer from './CommentPointer';

interface EnhancedAICommentatorProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
}

const EnhancedAICommentator: React.FC<EnhancedAICommentatorProps> = ({
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
      }, 80);

      return () => clearInterval(typeInterval);
    }
  }, [currentComment]);

  // Generate new comment when game state changes
  useEffect(() => {
    const { comment, type } = generateComment(players, roundCount, scoreLimit);
    setCurrentComment(comment);
    setCommentType(type);
  }, [players, roundCount, scoreLimit]);

  if (!currentComment) return null;

  const style = getCommentStyle(commentType);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentComment}
        initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: -40, scale: 0.9, rotateX: 15 }}
        transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 }}
        className="relative"
      >
        {/* Main Container avec glassmorphisme amélioré */}
        <div className={`
          relative backdrop-blur-2xl border-2 rounded-3xl p-8 transition-all duration-700 group overflow-hidden
          bg-white/85 border-white/70 shadow-2xl hover:shadow-3xl
          hover:scale-[1.02] hover:bg-white/90
        `}>
          
          {/* Effets de fond animés */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-dutch-blue/20 to-transparent rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-dutch-purple/20 to-transparent rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 3
              }}
            />
          </div>
          
          <div className="flex items-start gap-6 relative z-10">
            {/* Professor Avatar avec effets améliorés */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 150 }}
              className="flex-shrink-0"
            >
              <div className="relative">
                {/* Effet de lueur autour de l'avatar */}
                <div className="absolute inset-0 bg-gradient-to-r from-dutch-blue/20 via-dutch-purple/20 to-dutch-orange/20 rounded-full blur-xl animate-pulse"></div>
                <ProfessorAvatar 
                  size="xxl"
                  animate={true}
                  mood={style.mood}
                  showParticles={true}
                  className="relative z-10"
                />
              </div>
            </motion.div>
            
            {/* Comment Pointer - double flèche améliorée */}
            <motion.div 
              className="flex-shrink-0 mt-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CommentPointer />
            </motion.div>
            
            {/* Comment Bubble avec effets */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1"
            >
              <CommentBubble 
                displayedText={displayedText}
                isTyping={isTyping}
                style={style}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedAICommentator;
