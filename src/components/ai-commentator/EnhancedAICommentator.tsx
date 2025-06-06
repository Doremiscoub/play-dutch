
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { useAICommentator } from '@/hooks/useAICommentator';
import { AIPersonality } from '@/types/ai-commentator';
import ProfessorAvatar from '../game/ProfessorAvatar';
import { ModernTitle } from '../ui/modern-title';
import { GameBadge } from '../ui/game-badge';
import { Brain, Lightbulb, Settings, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

interface EnhancedAICommentatorProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  className?: string;
}

const EnhancedAICommentator: React.FC<EnhancedAICommentatorProps> = ({
  players,
  roundCount,
  scoreLimit,
  className = ''
}) => {
  const { generateIntelligentComment, personality, setPersonality } = useAICommentator();
  const [currentComment, setCurrentComment] = useState<string>('');
  const [currentAdvice, setCurrentAdvice] = useState<string>('');
  const [displayedText, setDisplayedText] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Effet de frappe pour le texte
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

  // Génération de nouveaux commentaires basés sur les changements de jeu
  useEffect(() => {
    if (players.length === 0) return;

    const { comment, advice } = generateIntelligentComment(players, roundCount, scoreLimit);
    setCurrentComment(comment);
    setCurrentAdvice(advice || '');
  }, [players, roundCount, scoreLimit, generateIntelligentComment]);

  if (!currentComment) return null;

  const personalityConfig = {
    humorous: {
      gradient: 'from-orange-500/10 to-yellow-500/5',
      border: 'border-orange-200/40',
      badge: 'Humoristique',
      mood: 'excited' as const
    },
    analytical: {
      gradient: 'from-blue-500/10 to-indigo-500/5',
      border: 'border-blue-200/40',
      badge: 'Analytique',
      mood: 'thinking' as const
    },
    encouraging: {
      gradient: 'from-green-500/10 to-emerald-500/5',
      border: 'border-green-200/40',
      badge: 'Encourageant',
      mood: 'happy' as const
    },
    sarcastic: {
      gradient: 'from-purple-500/10 to-pink-500/5',
      border: 'border-purple-200/40',
      badge: 'Sarcastique',
      mood: 'neutral' as const
    }
  };

  const config = personalityConfig[personality];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentComment}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative ${className}`}
      >
        {/* Container principal avec glassmorphism */}
        <div className={`
          relative backdrop-blur-xl border-2 rounded-3xl p-6 transition-all duration-500
          bg-gradient-to-br ${config.gradient} ${config.border}
          hover:scale-[1.01] group
        `}>
          
          {/* Glow effect subtil */}
          <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} rounded-3xl blur-xl opacity-20 -z-10`} />
          
          {/* Header avec contrôles */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ProfessorAvatar 
                size="lg"
                animate={true}
                mood={config.mood}
                showParticles={isTyping}
                className="hover:scale-105 transition-transform duration-300"
              />
              <div>
                <ModernTitle variant="h3" className="mb-1">
                  Professeur Cartouche IA
                </ModernTitle>
                <GameBadge
                  text={config.badge}
                  type={personality === 'analytical' ? 'rare' : 
                        personality === 'encouraging' ? 'epic' : 'common'}
                  size="sm"
                  effect="glow"
                />
              </div>
            </div>

            {/* Contrôles */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSpeaking(!isSpeaking)}
                className="opacity-60 hover:opacity-100"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
                className="opacity-60 hover:opacity-100"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Paramètres de personnalité */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 bg-white/50 rounded-xl border border-white/30"
              >
                <div className="flex items-center gap-3">
                  <Brain className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Personnalité :</span>
                  <Select value={personality} onValueChange={(value: AIPersonality) => setPersonality(value)}>
                    <SelectTrigger className="w-40 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="humorous">🎭 Humoristique</SelectItem>
                      <SelectItem value="analytical">🧠 Analytique</SelectItem>
                      <SelectItem value="encouraging">💪 Encourageant</SelectItem>
                      <SelectItem value="sarcastic">😏 Sarcastique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Commentaire principal */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <p className="text-lg leading-relaxed text-gray-800 font-medium">
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-5 bg-gray-600 ml-1"
                />
              )}
            </p>
          </motion.div>

          {/* Conseil stratégique */}
          <AnimatePresence>
            {currentAdvice && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 rounded-xl p-4 border border-dutch-blue/20"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-dutch-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-dutch-blue mb-1">Conseil Stratégique</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{currentAdvice}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EnhancedAICommentator;
