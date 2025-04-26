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
    info: 'border-dutch-blue/20 bg-gradient-to-br from-dutch-blue/5 to-dutch-purple/5',
    joke: 'border-dutch-orange/20 bg-gradient-to-br from-dutch-orange/5 to-dutch-purple/5',
    sarcasm: 'border-dutch-purple/20 bg-gradient-to-br from-dutch-purple/5 to-dutch-blue/5',
    encouragement: 'border-dutch-green/20 bg-gradient-to-br from-dutch-green/5 to-dutch-blue/5',
    headline: 'border-dutch-orange/20 bg-gradient-to-r from-dutch-orange/10 to-dutch-purple/10'
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
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-gradient-to-br from-dutch-purple/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-dutch-blue/20 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="flex items-start gap-6 relative z-10">
            <div className="mt-1">
              <ProfessorAvatar 
                size="lg"
                animate={true}
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="flex-1 space-y-3">
              <ModernTitle variant="h3">
                Professeur Cartouche
              </ModernTitle>
              
              {commentType === 'headline' ? (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-bold leading-relaxed tracking-wide bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent"
                >
                  {comment}
                </motion.p>
              ) : (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg leading-relaxed tracking-wide text-gray-700"
                >
                  {comment}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AICommentator;
