
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
      initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ 
        duration: 1, 
        ease: "easeOut", 
        type: "spring", 
        stiffness: 80,
        damping: 15
      }}
      className="relative perspective-1000"
    >
      {/* Enhanced Container with Advanced Glassmorphism */}
      <div className="relative backdrop-blur-4xl border-2 rounded-[2.5rem] p-10 transition-all duration-700 group overflow-hidden bg-white/90 border-white/70 shadow-glass-xl hover:shadow-glass-xl hover:scale-[1.01] hover:bg-white/95 transform-3d">
        
        {/* Multi-Layer Background Effects */}
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
          {/* Primary Ambient Glow */}
          <motion.div 
            className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-dutch-blue/25 to-transparent rounded-full blur-4xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Secondary Ambient Glow */}
          <motion.div 
            className="absolute -bottom-12 -left-12 w-48 h-48 bg-gradient-to-br from-dutch-purple/25 to-transparent rounded-full blur-4xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.6, 0.2],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Tertiary Accent Glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-dutch-orange/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, 120, 240, 360]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Shimmer Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2
            }}
          />
        </div>
        
        <div className="flex items-start gap-8 relative z-10">
          {/* Enhanced Professor Avatar with Multiple Effects */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotateY: -45, z: -50 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0, z: 0 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.8, 
              type: "spring", 
              stiffness: 120,
              damping: 15
            }}
            className="flex-shrink-0 relative"
          >
            <div className="relative">
              {/* Enhanced Avatar Glow Ring */}
              <motion.div 
                className="absolute -inset-6 bg-gradient-to-r from-dutch-blue/30 via-dutch-purple/30 to-dutch-orange/30 rounded-full blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Pulsing Secondary Ring */}
              <motion.div 
                className="absolute -inset-8 bg-gradient-to-r from-dutch-orange/20 via-dutch-blue/20 to-dutch-purple/20 rounded-full blur-3xl"
                animate={{ 
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [360, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              
              <ProfessorAvatar 
                size="xxl"
                animate={true}
                mood={style.mood}
                showParticles={true}
                className="relative z-10 transform-3d"
              />
            </div>
          </motion.div>
          
          {/* Enhanced Comment Pointer */}
          <motion.div 
            className="flex-shrink-0 mt-16"
            initial={{ opacity: 0, x: -30, rotateZ: -45 }}
            animate={{ opacity: 1, x: 0, rotateZ: 0 }}
            transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
          >
            <CommentPointer />
          </motion.div>
          
          {/* Enhanced Comment Bubble */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7, type: "spring", stiffness: 120 }}
            className="flex-1"
          >
            <CommentBubble 
              displayedText={displayedText}
              isTyping={isTyping}
              style={style}
            />
          </motion.div>
        </div>
        
        {/* Floating Action Indicators */}
        <div className="absolute top-4 right-4 flex gap-2">
          {['💭', '🎯', '✨'].map((emoji, index) => (
            <motion.div
              key={emoji}
              className="w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-sm shadow-lg"
              animate={{
                y: [0, -3, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut"
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedAICommentator;
