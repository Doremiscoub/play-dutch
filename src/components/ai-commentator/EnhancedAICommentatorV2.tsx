import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { AIPersonality } from '@/types/ai-commentator';
import ProfessorAvatar from '@/components/game/ProfessorAvatar';
import CommentPointer from './CommentPointer';
import { useEnhancedAICommentator } from '@/hooks/useEnhancedAICommentator';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, Heart, Zap, RotateCcw, Settings, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedAICommentatorV2Props {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  recentEvent?: string;
  className?: string;
}

export default function EnhancedAICommentatorV2({
  players,
  roundCount,
  scoreLimit,
  recentEvent,
  className
}: EnhancedAICommentatorV2Props) {
  const {
    currentComment,
    isGenerating,
    personality,
    setPersonality,
    generateComment,
    clearHistory,
    getPlayerMemory,
    commentHistory,
    isMemoryActive
  } = useEnhancedAICommentator({
    players,
    roundCount,
    scoreLimit,
    autoGenerate: true,
    refreshInterval: 15000
  });

  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(false);
  const [showMemoryStats, setShowMemoryStats] = useState(false);

  // Animation de frappe de texte
  useEffect(() => {
    if (!currentComment?.comment) return;

    setIsTyping(true);
    setDisplayedText('');
    
    let currentIndex = 0;
    const words = currentComment.comment.split(' ');
    
    const typeNextWord = () => {
      if (currentIndex < words.length) {
        setDisplayedText(prev => prev + (currentIndex > 0 ? ' ' : '') + words[currentIndex]);
        currentIndex++;
        setTimeout(typeNextWord, 100 + Math.random() * 50); // Vitesse variable
      } else {
        setIsTyping(false);
      }
    };

    typeNextWord();
  }, [currentComment]);

  const handlePersonalityChange = (newPersonality: AIPersonality) => {
    setPersonality(newPersonality);
    setShowPersonalitySelector(false);
  };

  const handleManualRefresh = () => {
    generateComment('manual_refresh');
  };

  const personalityIcons = {
    humorous: { icon: Sparkles, color: 'text-yellow-500', label: 'Humoristique' },
    analytical: { icon: Brain, color: 'text-blue-500', label: 'Analytique' },
    encouraging: { icon: Heart, color: 'text-green-500', label: 'Encourageant' },
    sarcastic: { icon: Zap, color: 'text-purple-500', label: 'Sarcastique' }
  };

  // État de chargement ou génération
  if (isGenerating || !currentComment) {
    return (
      <div className={cn(
        "flex items-center justify-center p-6 bg-gradient-to-r from-blue-50 to-purple-50",
        "border border-blue-200 rounded-xl",
        className
      )}>
        <div className="flex items-center gap-3">
          <ProfessorAvatar size="sm" animate mood="thinking" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 animate-spin text-blue-500" />
            <span className="text-sm text-gray-600">
              {isGenerating ? "Le Professeur réfléchit..." : "Analyse en cours..."}
            </span>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className={cn("relative", className)}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Avatar du Professeur avec effets */}
          <div className="relative mb-4">
            <ProfessorAvatar 
              size="lg" 
              animate 
              mood={isTyping ? "thinking" : "happy"}
              showParticles={!isTyping}
              className="mx-auto"
            />
            
            {/* Indicateur de personnalité */}
            <motion.div
              className={cn(
                "absolute -top-2 -right-2 w-8 h-8 rounded-full",
                "bg-white shadow-lg flex items-center justify-center",
                "border-2 border-gray-200"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {React.createElement(personalityIcons[personality].icon, {
                className: cn("w-4 h-4", personalityIcons[personality].color)
              })}
            </motion.div>
          </div>

          {/* Bulle de commentaire */}
          <motion.div
            className={cn(
              "relative bg-white rounded-2xl shadow-xl p-6 border",
              "bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30",
              "border-blue-200/50"
            )}
            animate={isTyping ? { 
              boxShadow: [
                "0 10px 30px rgba(59, 130, 246, 0.1)",
                "0 10px 30px rgba(147, 51, 234, 0.2)",
                "0 10px 30px rgba(59, 130, 246, 0.1)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: isTyping ? Infinity : 0 }}
          >
            <CommentPointer className="absolute -left-4 top-6" />
            
            {/* Texte du commentaire */}
            <div className="relative">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                {displayedText}
                {isTyping && (
                  <motion.span
                    className="inline-block w-2 h-5 bg-blue-500 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </p>
              
              {/* Badge de personnalité */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Mode {personalityIcons[personality].label}
                  </span>
                  {isMemoryActive && (
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      title="Mémoire active"
                    />
                  )}
                  <span className="text-xs text-gray-400">
                    {commentHistory.length} commentaires
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleManualRefresh}
                    disabled={isGenerating}
                    className="text-gray-500 hover:text-blue-600 p-1 h-auto"
                  >
                    <RotateCcw className={cn("w-3 h-3", isGenerating && "animate-spin")} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPersonalitySelector(!showPersonalitySelector)}
                    className="text-gray-500 hover:text-purple-600 p-1 h-auto"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sélecteur de personnalité */}
          <AnimatePresence>
            {showPersonalitySelector && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className={cn(
                  "absolute top-full mt-2 left-1/2 transform -translate-x-1/2",
                  "bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50",
                  "min-w-64"
                )}
              >
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Personnalité du Professeur
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(personalityIcons).map(([key, config]) => (
                    <Button
                      key={key}
                      variant={personality === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePersonalityChange(key as AIPersonality)}
                      className="flex items-center gap-2 justify-start"
                    >
                      {React.createElement(config.icon, {
                        className: cn("w-4 h-4", config.color)
                      })}
                      <span className="text-xs">{config.label}</span>
                    </Button>
                  ))}
                </div>
                
                {/* Bouton pour nettoyer la mémoire */}
                {isMemoryActive && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        clearHistory();
                        setShowPersonalitySelector(false);
                      }}
                      className="w-full text-xs text-red-600 hover:text-red-700"
                    >
                      Effacer la mémoire du Professeur
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}