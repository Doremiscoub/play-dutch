import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Zap, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import GameSettings from '@/components/GameSettings';
import { cn } from '@/lib/utils';

interface MobileGameHeaderProps {
  title: string;
  roundCount?: number;
  scoreLimit?: number;
  onBack?: () => void;
  gameStartTime?: Date;
  className?: string;
}

export const MobileGameHeader: React.FC<MobileGameHeaderProps> = ({
  title,
  roundCount = 0,
  scoreLimit = 100,
  onBack,
  gameStartTime,
  className
}) => {
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
      className={cn(
        "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-dutch-border/20 shadow-sm",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Navigation principale */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Bouton retour */}
        <motion.div
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-10 w-10 rounded-xl hover:bg-dutch-accent/10 transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Titre */}
        <motion.h1 
          className="text-lg font-bold text-dutch-text bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent"
          layoutId="game-title"
        >
          {title}
        </motion.h1>

        {/* Settings */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <GameSettings />
        </motion.div>
      </div>

      {/* Badges d'informations */}
      <motion.div 
        className="flex items-center justify-center gap-2 px-4 pb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {/* Manche */}
        <motion.div 
          className="flex items-center gap-1.5 px-3 py-1.5 bg-dutch-blue/10 rounded-full border border-dutch-blue/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Zap className="h-3.5 w-3.5 text-dutch-blue" />
          <span className="text-xs font-semibold text-dutch-blue">
            M{roundCount || 1}
          </span>
        </motion.div>

        {/* Limite */}
        <motion.div 
          className="flex items-center gap-1.5 px-3 py-1.5 bg-dutch-purple/10 rounded-full border border-dutch-purple/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Target className="h-3.5 w-3.5 text-dutch-purple" />
          <span className="text-xs font-semibold text-dutch-purple">
            {scoreLimit}pts
          </span>
        </motion.div>

        {/* Chronomètre */}
        {gameStartTime && (
          <motion.div 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-dutch-orange/10 rounded-full border border-dutch-orange/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              borderColor: ["hsl(var(--dutch-orange))/20", "hsl(var(--dutch-orange))/40", "hsl(var(--dutch-orange))/20"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="h-3.5 w-3.5 text-dutch-orange" />
            <span className="text-xs font-semibold text-dutch-orange font-mono">
              {elapsedTime}
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.header>
  );
};