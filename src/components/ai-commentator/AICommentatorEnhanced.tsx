
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AICommentatorEnhancedProps } from './types';
import { generateComment, getCommentStyle } from './commentUtils';
import ProfessorAvatar from '../game/ProfessorAvatar';
import CommentBubble from './CommentBubble';
import CommentPointer from './CommentPointer';

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
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.9 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        {/* Main Container avec glassmorphism moderne - sans ombre excessive */}
        <div className={`
          relative backdrop-blur-xl border-2 rounded-[2rem] p-8 transition-all duration-500
          bg-gradient-to-br ${style.gradient} ${style.border}
          hover:scale-[1.02]
        `}>
          
          {/* Ambient Background Glow - plus subtil */}
          <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} rounded-[2rem] blur-xl opacity-30 -z-10`} />
          
          <div className="flex items-start gap-4">
            {/* Professor Avatar - sans ombre */}
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
                className=""
              />
            </motion.div>
            
            {/* Comment Pointer - double flèche */}
            <CommentPointer className="flex-shrink-0 mt-12" />
            
            {/* Comment Bubble */}
            <CommentBubble 
              displayedText={displayedText}
              isTyping={isTyping}
              style={style}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AICommentatorEnhanced;
