
import React, { useEffect, useState } from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { MessageSquare, Bot } from 'lucide-react';
import { getAIComment } from '@/utils/aiCommentsGenerator';

interface AICommentatorProps {
  players: Player[];
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  className?: string;
  name?: string;
}

/**
 * Composant pour le commentateur IA qui analyse la partie et fait des remarques
 */
const AICommentator: React.FC<AICommentatorProps> = ({ 
  players, 
  roundHistory = [],
  className = '',
  name = 'Professeur Cartouche'
}) => {
  const [comment, setComment] = useState<string>('');
  const [commentType, setCommentType] = useState<'info' | 'joke' | 'sarcasm' | 'encouragement'>('info');
  
  // Générer un commentaire basé sur l'état actuel de la partie
  useEffect(() => {
    if (players.length === 0) return;
    
    const generateComment = () => {
      const { comment, type } = getAIComment(players, roundHistory, name);
      setComment(comment);
      setCommentType(type);
    };
    
    // Générer un commentaire initial
    generateComment();
    
    // Mettre à jour le commentaire périodiquement
    const interval = setInterval(generateComment, 20000); // Toutes les 20 secondes
    
    return () => clearInterval(interval);
  }, [players, roundHistory, name]);
  
  // Styles basés sur le type de commentaire
  const getCommentStyles = () => {
    switch (commentType) {
      case 'info':
        return 'border-dutch-blue/30 bg-dutch-blue/5';
      case 'joke':
        return 'border-dutch-orange/30 bg-dutch-orange/5';
      case 'sarcasm':
        return 'border-dutch-purple/30 bg-dutch-purple/5';
      case 'encouragement':
        return 'border-dutch-green/30 bg-dutch-green/5';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };
  
  // Animations
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className={`rounded-2xl border p-4 shadow-sm backdrop-blur-sm ${getCommentStyles()} ${className}`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm">
          <Bot className="h-4 w-4 text-dutch-purple" />
        </div>
        <div>
          <h3 className="font-medium text-gray-800 mb-1">{name}</h3>
          <p className="text-gray-600 text-sm">
            {comment || `Bienvenue dans cette partie de Dutch ! Je suis ${name}, votre commentateur.`}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AICommentator;
