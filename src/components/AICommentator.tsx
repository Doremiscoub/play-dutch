
import React, { useState, useEffect } from 'react';
import { Player } from '@/types';
import { getAIComment } from '@/utils/aiCommentsGenerator';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, MessageSquare, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface AICommentatorProps {
  players: Player[];
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  className?: string;
  name?: string;
}

const AICommentator: React.FC<AICommentatorProps> = ({
  players,
  roundHistory = [],
  className,
  name = "Professeur Cartouche"
}) => {
  const [comment, setComment] = useState<string>('');
  const [commentType, setCommentType] = useState<'info' | 'joke' | 'sarcasm' | 'encouragement'>('info');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Générer un nouveau commentaire
  const generateComment = () => {
    setIsLoading(true);
    
    // Simuler un délai pour l'effet de "réflexion" de l'IA
    setTimeout(() => {
      const { comment: newComment, type } = getAIComment(players, roundHistory, name);
      setComment(newComment);
      setCommentType(type);
      setIsLoading(false);
    }, 600);
  };
  
  // Générer un commentaire initial au chargement et quand les joueurs ou l'historique changent
  useEffect(() => {
    generateComment();
  }, [players.length, roundHistory.length]);
  
  // Styles conditionnels basés sur le type de commentaire
  const getCommentTypeStyles = () => {
    switch (commentType) {
      case 'joke':
        return 'bg-dutch-orange/10 border-dutch-orange/20 text-dutch-orange';
      case 'sarcasm':
        return 'bg-dutch-purple/10 border-dutch-purple/20 text-dutch-purple';
      case 'encouragement':
        return 'bg-green-500/10 border-green-500/20 text-green-600';
      case 'info':
      default:
        return 'bg-dutch-blue/10 border-dutch-blue/20 text-dutch-blue';
    }
  };
  
  const characterAnimationVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const bubbleAnimationVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        delay: 0.1
      }
    },
    exit: { 
      y: 20, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className={cn("", className)}>
      <Card className="bg-white/70 backdrop-blur-md rounded-xl overflow-hidden border border-white/40 shadow-sm relative">
        <CardContent className="p-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r from-dutch-blue/90 to-dutch-purple/90 flex items-center justify-center text-white shadow-md"
              >
                <Bot className="h-6 w-6" />
              </motion.div>
              
              <div>
                <h3 className="font-semibold text-gray-900">{name}</h3>
                <p className="text-xs text-gray-500">Commentateur IA</p>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                onClick={generateComment}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  variants={bubbleAnimationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="p-3 rounded-xl bg-gray-100/70 backdrop-blur-sm shadow-sm text-gray-500 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span>{name} réfléchit...</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="comment"
                  variants={bubbleAnimationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`p-3 rounded-xl backdrop-blur-sm shadow-sm text-sm ${getCommentTypeStyles()}`}
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{comment}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AICommentator;
