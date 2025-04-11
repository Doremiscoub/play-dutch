
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Bot, Sparkles, BrainCircuit, Megaphone } from 'lucide-react';
import { Player } from '@/types';
import { getRandomComment } from '@/utils/commentGenerator';
import ProfessorAvatar from './ProfessorAvatar';

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

  // Icône selon le type de commentaire
  const CommentIcon = () => {
    switch (commentType) {
      case 'info': return <MessageCircle className="h-5 w-5 text-dutch-blue" />;
      case 'joke': return <Sparkles className="h-5 w-5 text-dutch-orange" />;
      case 'sarcasm': return <Bot className="h-5 w-5 text-dutch-purple" />;
      case 'encouragement': return <BrainCircuit className="h-5 w-5 text-green-500" />;
      case 'headline': return <Megaphone className="h-5 w-5 text-dutch-orange" />;
      default: return <MessageCircle className="h-5 w-5" />;
    }
  };
  
  // Fonction de lecture à voix haute
  const speakMessage = () => {
    if (!isSpeaking && 'speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(comment);
      
      // Trouver une voix française si disponible
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(voice => voice.lang.includes('fr'));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }
      
      utterance.pitch = 1.1; // Légèrement plus aigu
      utterance.rate = 1.05; // Légèrement plus rapide
      utterance.volume = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
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
