
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Bot, Sparkles, BrainCircuit } from 'lucide-react';
import { Player } from '@/types';
import { getRandomComment } from '@/utils/commentGenerator';

interface AICommentatorProps {
  players: Player[];
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  className?: string;
}

const AICommentator: React.FC<AICommentatorProps> = ({ players, roundHistory = [], className = '' }) => {
  const [comment, setComment] = useState('');
  const [commentType, setCommentType] = useState<'info' | 'joke' | 'sarcasm' | 'encouragement'>('info');
  const [isVisible, setIsVisible] = useState(true);

  // Générer un nouveau commentaire selon certains événements
  useEffect(() => {
    if (players.length === 0) return;

    const generateComment = () => {
      const { comment, type } = getRandomComment(players, roundHistory);
      setComment(comment);
      setCommentType(type);
    };

    // Générer un commentaire initial et sur chaque nouvelle manche
    generateComment();

    // Générer un nouveau commentaire toutes les 20 secondes
    const interval = setInterval(() => {
      generateComment();
    }, 20000);

    return () => clearInterval(interval);
  }, [players, roundHistory]);

  // Si pas de commentaire, ne rien afficher
  if (!comment) return null;

  // Styles selon le type de commentaire
  const commentStyles = {
    info: 'border-dutch-blue/30 bg-dutch-blue/5',
    joke: 'border-dutch-orange/30 bg-dutch-orange/5',
    sarcasm: 'border-dutch-purple/30 bg-dutch-purple/5',
    encouragement: 'border-dutch-green/30 bg-dutch-green/5',
  };

  // Icône selon le type de commentaire
  const CommentIcon = () => {
    switch (commentType) {
      case 'info': return <MessageCircle className="h-5 w-5 text-dutch-blue" />;
      case 'joke': return <Sparkles className="h-5 w-5 text-dutch-orange" />;
      case 'sarcasm': return <Bot className="h-5 w-5 text-dutch-purple" />;
      case 'encouragement': return <BrainCircuit className="h-5 w-5 text-green-500" />;
      default: return <MessageCircle className="h-5 w-5" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 15
          }}
          className={`rounded-2xl border p-4 ${commentStyles[commentType]} ${className}`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-1 bg-white/50 backdrop-blur-sm p-2 rounded-full">
              <CommentIcon />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">Professeur Cartouche</h3>
              <p className="text-gray-700">{comment}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AICommentator;
