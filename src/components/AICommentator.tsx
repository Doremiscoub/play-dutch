
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { getRandomComment } from '@/utils/commentGenerator';
import ProfessorAvatar from './ProfessorAvatar';
import { useElevenLabs } from '@/hooks/use-eleven-labs';
import { useSound } from '@/hooks/use-sound';

interface AICommentatorProps {
  players: Player[];
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
  className?: string;
}

const AICommentator: React.FC<AICommentatorProps> = ({ players, roundHistory = [], className = '' }) => {
  const [comment, setComment] = useState('');
  const [commentType, setCommentType] = useState<'info' | 'joke' | 'sarcasm' | 'encouragement' | 'headline'>('info');
  const [isVisible, setIsVisible] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { speakWithFallback } = useElevenLabs();
  const { isSoundEnabled, playCardSound } = useSound();

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
    headline: 'border-dutch-orange/30 bg-gradient-to-r from-dutch-orange/10 to-dutch-purple/10'
  };
  
  // Fonction de lecture à voix haute avec Eleven Labs
  const speakMessage = async () => {
    if (!isSpeaking && isSoundEnabled) {
      setIsSpeaking(true);
      
      // Jouer un effet sonore pour attirer l'attention
      playCardSound();
      
      // Utiliser Eleven Labs ou le fallback
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
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 15
          }}
          className={`rounded-2xl border p-4 ${commentStyles[commentType]} ${className}`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-1 w-auto">
              <ProfessorAvatar 
                message={comment} 
                onSpeakMessage={speakMessage}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg mb-1">Professeur Cartouche</h3>
              {commentType === 'headline' ? (
                <p className="text-gray-800 font-bold text-lg">{comment}</p>
              ) : (
                <p className="text-gray-700">{comment}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AICommentator;
