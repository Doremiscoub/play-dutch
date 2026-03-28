/**
 * AI Commentator - Composant principal consolidé
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import { AIPersonality } from '../types';
import ProfessorAvatar from './professor/ProfessorAvatar';
import CommentPointer from './CommentPointer';
import { useAICommentator } from '../hooks/useAICommentator';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, Heart, Zap, RotateCcw, Settings, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobileAdaptation } from '@/hooks/useMobileAdaptation';

const PERSONALITY_ICONS = {
  humorous: { icon: Sparkles, color: 'text-yellow-500', label: 'Humoristique' },
  analytical: { icon: Brain, color: 'text-blue-500', label: 'Analytique' },
  encouraging: { icon: Heart, color: 'text-green-500', label: 'Encourageant' },
  sarcastic: { icon: Zap, color: 'text-purple-500', label: 'Sarcastique' }
} as const;

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
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Persist personality selection to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dutch_ai_personality');
    if (saved && (saved === 'humorous' || saved === 'analytical' || saved === 'encouraging' || saved === 'sarcastic')) {
      setPersonality(saved as AIPersonality);
    }
  }, [setPersonality]);

  // Typing animation
  useEffect(() => {
    // Clear any in-progress typing animation
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = undefined;
    }

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

    const typeNextWord = () => {
      if (currentIndex < words.length) {
        setDisplayedText(prev => prev + (currentIndex > 0 ? ' ' : '') + words[currentIndex]);
        currentIndex++;
        typingTimeoutRef.current = setTimeout(typeNextWord, 60 + Math.random() * 30);
      } else {
        setIsTyping(false);
      }
    };

    typeNextWord();
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = undefined;
      }
      setIsTyping(false);
    };
  }, [currentComment, reducedAnimations]);

  const handlePersonalityChange = (newPersonality: AIPersonality) => {
    setPersonality(newPersonality);
    localStorage.setItem('dutch_ai_personality', newPersonality);
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
            <span className={cn("text-muted-foreground", singleColumn ? "text-xs" : "text-sm")}>
              {isGenerating ? "Le Professeur réfléchit..." : "Analyse en cours..."}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "flex items-start",
            singleColumn ? "flex-row gap-3" : "flex-col items-center gap-4"
          )}
        >
          {/* Avatar avec dimensions fixes pour éviter débordement */}
          <div className={cn(
            "relative flex-shrink-0",
            singleColumn ? "w-16 h-16" : "w-20 h-20"
          )}>
            <div className="relative w-full h-full overflow-hidden rounded-full">
              <ProfessorAvatar 
                size={singleColumn ? "sm" : "md"} 
                animate={!singleColumn}
                mood={isTyping ? "thinking" : "happy"}
                showParticles={false}
                className="w-full h-full"
              />
            </div>
            
            {/* Personality Badge - Inside le conteneur pour éviter débordement */}
            <motion.button
              onClick={() => setShowPersonalitySelector(!showPersonalitySelector)}
              className={cn(
                "absolute bottom-0 right-0 z-10",
                singleColumn ? "w-6 h-6" : "w-8 h-8",
                "rounded-full bg-white shadow-lg flex items-center justify-center",
                "border-2 border-gray-300 hover:border-gray-400 transition-colors"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={`Mode ${PERSONALITY_ICONS[personality].label}`}
            >
              {React.createElement(PERSONALITY_ICONS[personality].icon, {
                className: cn(singleColumn ? "w-3 h-3" : "w-4 h-4", PERSONALITY_ICONS[personality].color)
              })}
            </motion.button>
          </div>

          {/* Comment Bubble */}
          <motion.div
            className={cn(
              "relative bg-white rounded-2xl shadow-xl border bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-blue-200/50 overflow-hidden",
              singleColumn ? "flex-1 p-3" : "w-full p-5"
            )}
          >
            {/* CommentPointer masqué sur mobile pour éviter débordement */}
            {!singleColumn && <CommentPointer className="absolute -left-4 top-6" />}
            
            <div className="relative">
              <p className={cn(
                "leading-relaxed text-foreground font-medium break-words",
                singleColumn ? "text-sm" : "text-lg"
              )}>
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
                  {React.createElement(PERSONALITY_ICONS[personality].icon, {
                    className: cn("w-4 h-4", PERSONALITY_ICONS[personality].color)
                  })}
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                    {PERSONALITY_ICONS[personality].label}
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
                  <Button variant="ghost" size="sm" onClick={() => generateComment('manual_refresh')} disabled={isGenerating} className="text-muted-foreground hover:text-blue-600 p-1 h-auto">
                    <RotateCcw className={cn("w-3 h-3", isGenerating && "animate-spin")} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowPersonalitySelector(!showPersonalitySelector)} className="text-muted-foreground hover:text-purple-600 p-1 h-auto">
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
                className={cn(
                  "absolute top-full mt-2 z-50",
                  "left-0 right-0 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2",
                  "bg-white rounded-xl shadow-xl border border-gray-200 p-3 sm:p-4",
                  "sm:min-w-64 max-w-[95vw] sm:max-w-[90vw] mx-auto"
                )}
              >
                <h4 className="text-sm font-semibold text-foreground mb-3">Personnalité du Professeur</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(PERSONALITY_ICONS).map(([key, config]) => (
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
