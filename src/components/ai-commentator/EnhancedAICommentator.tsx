
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [commentKey, setCommentKey] = useState(0);

  // Enhanced typing animation effect
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
      }, 60); // Faster typing

      return () => clearInterval(typeInterval);
    }
  }, [currentComment]);

  // Generate new comment when game state changes
  useEffect(() => {
    const { comment, type } = generateComment(players, roundCount, scoreLimit);
    setCurrentComment(comment);
    setCommentType(type);
    setCommentKey(prev => prev + 1);
  }, [players, roundCount, scoreLimit]);

  if (!currentComment) return null;

  const style = getCommentStyle(commentType);

  return (
    <motion.div
      key={commentKey}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut"
      }}
      className="relative perspective-1000"
    >
      {/* Simplified Glass Container */}
      <div className="glass-card rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 bg-white/80 backdrop-blur-md">
        
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-50">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-dutch-blue/20 to-transparent rounded-full blur-2xl" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-dutch-purple/20 to-transparent rounded-full blur-2xl" />
        </div>
        
        <div className="flex items-start gap-8 relative z-10">
          {/* Simplified Professor Avatar */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.2, 
              duration: 0.6, 
              ease: "easeOut"
            }}
            className="flex-shrink-0 relative"
          >
            <ProfessorAvatar 
              size="lg"
              animate={true}
              mood={style.mood}
              showParticles={false}
              className="relative z-10"
            />
          </motion.div>
          
          {/* Simplified Comment Bubble */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="flex-1 ml-4"
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
  );
};

export default EnhancedAICommentator;
