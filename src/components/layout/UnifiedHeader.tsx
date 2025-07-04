import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, BookOpen, Clock, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GameSettings from '@/components/GameSettings';
import { ModernTitle } from '@/components/ui/modern-title';

interface UnifiedHeaderProps {
  title: string;
  roundCount?: number;
  scoreLimit?: number;
  showBackButton?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  showRulesButton?: boolean;
  variant?: 'default' | 'game' | 'simple';
  hideTitle?: boolean;
  gameStartTime?: Date;
}

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  title,
  roundCount = 0,
  scoreLimit = 100,
  showBackButton = false,
  onBack,
  showSettings = true,
  showRulesButton = true,
  variant = 'default',
  hideTitle = false,
  gameStartTime
}) => {
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState<string>('00:00');

  // Chronomètre
  useEffect(() => {
    if (!gameStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - gameStartTime.getTime()) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      setElapsedTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStartTime]);
  return (
    <motion.header 
      data-testid="unified-header"
      className="relative z-10 px-6 py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.23, 1, 0.32, 1],
        delay: 0.1
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Back button */}
        <div className="flex items-center gap-4">
          {showBackButton && onBack && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Button
                variant="liquidHeader"
                size="icon"
                onClick={onBack}
                className="rounded-xl"
                aria-label="Retour"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Center - Title and game info */}
        <div className="flex-1 text-center px-4">
          {!hideTitle && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <div className="relative">
                {/* Fond avec glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-trinity-blue-500/20 via-trinity-purple-500/20 to-trinity-orange-500/20 rounded-2xl blur-xl"></div>
                
                {/* Titre principal */}
                <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/60 shadow-xl">
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center justify-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <span className="bg-gradient-to-r from-trinity-blue-700 via-trinity-purple-700 to-trinity-orange-700 bg-clip-text text-transparent font-extrabold">
                      {variant === 'game' ? 'Partie en cours' : title}
                    </span>
                    <span className="text-2xl">🎯</span>
                  </h1>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Pastilles d'information pour la partie */}
          {variant === 'game' && (
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* Numéro de manche */}
              <motion.div 
                className="flex items-center gap-2 bg-gradient-to-r from-trinity-blue-100/90 to-trinity-blue-50/90 backdrop-blur-xl px-3 py-2 rounded-xl border border-trinity-blue-200/60 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Zap className="h-4 w-4 text-trinity-blue-600" />
                <span className="text-sm font-bold text-trinity-blue-700">
                  Manche {roundCount || 1}
                </span>
              </motion.div>

              {/* Limite de points */}
              <motion.div 
                className="flex items-center gap-2 bg-gradient-to-r from-trinity-purple-100/90 to-trinity-purple-50/90 backdrop-blur-xl px-3 py-2 rounded-xl border border-trinity-purple-200/60 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Target className="h-4 w-4 text-trinity-purple-600" />
                <span className="text-sm font-bold text-trinity-purple-700">
                  Objectif {scoreLimit} pts
                </span>
              </motion.div>

              {/* Chronomètre */}
              {gameStartTime && (
                <motion.div 
                  className="flex items-center gap-2 bg-gradient-to-r from-trinity-orange-100/90 to-trinity-orange-50/90 backdrop-blur-xl px-3 py-2 rounded-xl border border-trinity-orange-200/60 shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  animate={{ 
                    boxShadow: [
                      "0 4px 6px rgba(0, 0, 0, 0.1)",
                      "0 4px 20px rgba(251, 146, 60, 0.3)",
                      "0 4px 6px rgba(0, 0, 0, 0.1)"
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    scale: { type: "spring", stiffness: 300 }
                  }}
                >
                  <Clock className="h-4 w-4 text-trinity-orange-600" />
                  <span className="text-sm font-bold text-trinity-orange-700 font-mono">
                    {elapsedTime}
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Right side - Rules button and Settings */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Bouton Règles */}
          {showRulesButton && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Button
                variant="liquidHeader"
                size="sm"
                onClick={() => navigate('/rules')}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-trinity-purple-100/90 to-trinity-blue-100/90 backdrop-blur-xl border border-trinity-purple-200/60 hover:from-trinity-purple-200/90 hover:to-trinity-blue-200/90 transition-all duration-300"
                aria-label="Consulter les règles"
              >
                <BookOpen className="h-4 w-4 text-trinity-purple-600" />
                <span className="hidden sm:inline text-trinity-purple-700 font-semibold">Règles</span>
              </Button>
            </motion.div>
          )}
          
          {/* Bouton Settings */}
          {showSettings && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <GameSettings />
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default UnifiedHeader;