/**
 * AI Commentator - Composant principal consolidé
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { AIPersonality } from '../types';
import ProfessorAvatar from './professor/ProfessorAvatar';
import CommentBubble from './CommentBubble';
import CommentPointer from './CommentPointer';
import { useAICommentator } from '../hooks/useAICommentator';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, Heart, Zap, RotateCcw, Settings, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileAdaptation } from '@/hooks/useMobileAdaptation';

interface AICommentatorProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  recentEvent?: string;
  className?: string;
}

export default function AICommentator({
  players,
  roundCount,
  scoreLimit,
  recentEvent,
  className
}: AICommentatorProps) {
  const { singleColumn, reducedAnimations } = useMobileAdaptation();
  const {
    currentComment,
    isGenerating,
    personality,
    setPersonality,
    generateComment,
    clearHistory,
    commentHistory,
    isMemoryActive
  } = useAICommentator({ players, roundCount, scoreLimit, autoGenerate: true, refreshInterval: 15000 });

  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(false);

  const personalityIcons = {
    humorous: { icon: Sparkles, color: 'text-yellow-500', label: 'Humoristique' },
    analytical: { icon: Brain, color: 'text-blue-500', label: 'Analytique' },
    encouraging: { icon: Heart, color: 'text-green-500', label: 'Encourageant' },
    sarcastic: { icon: Zap, color: 'text-purple-500', label: 'Sarcastique' }
  };

  // Typing animation
  useEffect(() => {
    if (!currentComment?.comment) return;

    if (reducedAnimations) {
      setDisplayedText(currentComment.comment);
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    
    let currentIndex = 0;
    const words = currentComment.comment.split(' ');
    let timeoutId: NodeJS.Timeout;
    
    const typeNextWord = () => {
      if (currentIndex < words.length) {
        setDisplayedText(prev => prev + (currentIndex > 0 ? ' ' : '') + words[currentIndex]);
        currentIndex++;
        timeoutId = setTimeout(typeNextWord, 60 + Math.random() * 30);
      } else {
        setIsTyping(false);
      }
    };

    typeNextWord();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      setIsTyping(false);
    };
  }, [currentComment, reducedAnimations]);

  const handlePersonalityChange = (newPersonality: AIPersonality) => {
    setPersonality(newPersonality);
    setShowPersonalitySelector(false);
  };

  // Loading state
  if (isGenerating || !currentComment) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl",
        singleColumn ? "p-3" : "p-6",
        className
      )}>
        <div className="flex items-center gap-3">
          <ProfessorAvatar size={singleColumn ? "sm" : "sm"} animate mood="thinking" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 animate-spin text-blue-500" />
            <span className={cn("text-gray-600", singleColumn ? "text-xs" : "text-sm")}>
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
          {/* Avatar */}
          <div className={cn("relative", singleColumn ? "mb-2" : "mb-4")}>
            <ProfessorAvatar 
              size={singleColumn ? "md" : "lg"} 
              animate 
              mood={isTyping ? "thinking" : "happy"}
              showParticles={!isTyping}
              className="mx-auto"
            />
            
            {/* Personality Indicator */}
            <motion.button
              onClick={() => setShowPersonalitySelector(!showPersonalitySelector)}
              className={cn(
                "absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center cursor-pointer",
                "border-2 border-gray-300 hover:border-gray-400 transition-colors hover:shadow-2xl"
              )}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              title={`Mode ${personalityIcons[personality].label}`}
            >
              {React.createElement(personalityIcons[personality].icon, {
                className: cn("w-5 h-5", personalityIcons[personality].color)
              })}
            </motion.button>
          </div>

          {/* Comment Bubble */}
          <motion.div
            className={cn(
              "relative bg-white rounded-2xl shadow-xl border bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-blue-200/50",
              singleColumn ? "p-4" : "p-6"
            )}
          >
            <CommentPointer className="absolute -left-4 top-6" />
            
            <div className="relative">
              <p className={cn("leading-relaxed text-gray-800 font-medium", singleColumn ? "text-sm" : "text-lg")}>
                {displayedText}
                {isTyping && (
                  <motion.span
                    className="inline-block w-2 h-5 bg-blue-500 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </p>
              
              {/* Controls */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => setShowPersonalitySelector(!showPersonalitySelector)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-colors cursor-pointer border border-gray-200"
                >
                  {React.createElement(personalityIcons[personality].icon, {
                    className: cn("w-4 h-4", personalityIcons[personality].color)
                  })}
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    {personalityIcons[personality].label}
                  </span>
                  {isMemoryActive && (
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      title="Mémoire active"
                    />
                  )}
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{commentHistory.length} commentaires</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => generateComment('manual_refresh')} disabled={isGenerating} className="text-gray-500 hover:text-blue-600 p-1 h-auto">
                    <RotateCcw className={cn("w-3 h-3", isGenerating && "animate-spin")} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowPersonalitySelector(!showPersonalitySelector)} className="text-gray-500 hover:text-purple-600 p-1 h-auto">
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Personality Selector */}
          <AnimatePresence>
            {showPersonalitySelector && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className={cn("absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 min-w-64")}
              >
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Personnalité du Professeur</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(personalityIcons).map(([key, config]) => (
                    <Button
                      key={key}
                      variant={personality === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePersonalityChange(key as AIPersonality)}
                      className="flex items-center gap-2 justify-start"
                    >
                      {React.createElement(config.icon, { className: cn("w-4 h-4", config.color) })}
                      <span className="text-xs">{config.label}</span>
                    </Button>
                  ))}
                </div>
                
                {isMemoryActive && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { clearHistory(); setShowPersonalitySelector(false); }}
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
