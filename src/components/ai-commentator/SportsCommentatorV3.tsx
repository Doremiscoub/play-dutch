/**
 * Commentateur sportif Professor Cartouche V3
 * Style speaker radio + gros titres sportifs
 * Compatible avec l'interface existante
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import ProfessorAvatar from '@/components/game/ProfessorAvatar';
import { useSportsCommentator } from '@/hooks/useSportsCommentator';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RotateCcw, Zap, Clock } from 'lucide-react';

interface SportsCommentatorV3Props {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  recentEvent?: string;
  className?: string;
  isGameActive?: boolean;
}

export default function SportsCommentatorV3({
  players,
  roundCount,
  scoreLimit,
  recentEvent,
  className,
  isGameActive = true
}: SportsCommentatorV3Props) {
  const {
    currentComment,
    isVisible,
    commentType,
    priority,
    forceComment,
    isRotating
  } = useSportsCommentator({
    players,
    roundCount,
    isGameActive,
    rotationInterval: 15 // 15 secondes entre les commentaires
  });

  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDebugControls, setShowDebugControls] = useState(false);

  // Animation de frappe rapide style "breaking news"
  useEffect(() => {
    if (!currentComment || !isVisible) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    
    let currentIndex = 0;
    const text = currentComment;
    
    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
        
        // Vitesse variable selon le type de commentaire
        const delay = commentType === 'post_round' ? 30 : 50; // Plus rapide pour les post-manche
        setTimeout(typeNextChar, delay + Math.random() * 20);
      } else {
        setIsTyping(false);
      }
    };

    // Petit délai initial pour l'effet dramatique
    setTimeout(typeNextChar, 200);
  }, [currentComment, isVisible, commentType]);

  // Styles selon le type et la priorité
  const getCommentStyles = () => {
    const baseClasses = "relative bg-gradient-to-r border-2 rounded-2xl p-4 shadow-lg backdrop-blur-sm";
    
    if (commentType === 'post_round') {
      if (priority === 'high') {
        return cn(baseClasses, 
          "from-red-500/20 via-orange-500/20 to-yellow-500/20",
          "border-orange-400/50",
          "animate-pulse"
        );
      }
      return cn(baseClasses,
        "from-blue-500/20 via-purple-500/20 to-blue-600/20",
        "border-blue-400/50"
      );
    }
    
    // between_rounds
    return cn(baseClasses,
      "from-gray-100/80 via-white/90 to-gray-100/80",
      "border-gray-300/50",
      "text-gray-700"
    );
  };

  const getTextStyles = () => {
    if (commentType === 'post_round' && priority === 'high') {
      return "text-lg font-black text-orange-900 tracking-wide";
    }
    if (commentType === 'post_round') {
      return "text-base font-bold text-blue-900";
    }
    return "text-sm font-medium text-gray-700";
  };

  const getMoodFromPriority = () => {
    if (commentType === 'post_round' && priority === 'high') return 'excited';
    if (commentType === 'post_round') return 'happy';
    return 'neutral';
  };

  // Debug controls (only in development)
  const isDevMode = import.meta.env.DEV;

  if (!isVisible && !isDevMode) {
    return null;
  }

  return (
    <div className={cn("relative z-10", className)}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={`${commentType}-${currentComment}`}
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 20,
              rotate: -2
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotate: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              y: -10,
              transition: { duration: 0.3 }
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.5
            }}
            className="flex items-start gap-4"
          >
            {/* Avatar du professeur */}
            <div className="flex-shrink-0">
              <ProfessorAvatar 
                size="lg" 
                animate={true}
                mood={getMoodFromPriority()}
                showParticles={priority === 'high'}
              />
            </div>

            {/* Bulle de commentaire */}
            <motion.div
              className={getCommentStyles()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
            >
              {/* Indicateur de type de commentaire */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {commentType === 'post_round' ? (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                        LIVE
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {isRotating ? 'AUTO' : 'PAUSE'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Debug controls en dev */}
                {isDevMode && (
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => setShowDebugControls(!showDebugControls)}
                    >
                      <Zap className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Texte du commentaire */}
              <div className={getTextStyles()}>
                {displayedText}
                {isTyping && (
                  <motion.span
                    className="inline-block w-1 h-4 bg-current ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Ligne de fond style breaking news pour les commentaires important */}
              {commentType === 'post_round' && priority === 'high' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-b-2xl"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls de debug (dev uniquement) */}
      {isDevMode && showDebugControls && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 mt-2 p-3 bg-white border rounded-lg shadow-lg z-20"
        >
          <div className="text-xs text-gray-600 mb-2">Debug Controls</div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => forceComment('post_round')}
              className="text-xs"
            >
              Post-Manche
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => forceComment('between_rounds')}
              className="text-xs"
            >
              Entre-Manches
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Rotation: {isRotating ? 'ON' : 'OFF'} | 
            Type: {commentType} | 
            Priority: {priority}
          </div>
        </motion.div>
      )}

      {/* Affichage persistant en dev quand rien n'est visible */}
      {isDevMode && !isVisible && (
        <div className="opacity-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <ProfessorAvatar size="sm" animate={false} mood="neutral" />
            <div className="text-sm text-gray-500">
              Commentateur en attente... 
              <Button
                size="sm"
                variant="ghost"
                onClick={() => forceComment('between_rounds')}
                className="ml-2"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Test
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}