import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import GameSettings from '@/components/GameSettings';

interface UnifiedHeaderProps {
  title: string;
  roundCount?: number;
  scoreLimit?: number;
  showBackButton?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  variant?: 'default' | 'game' | 'simple';
}

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  title,
  roundCount = 0,
  scoreLimit = 100,
  showBackButton = false,
  onBack,
  showSettings = true,
  variant = 'default'
}) => {
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
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="glass-button rounded-xl"
                aria-label="Retour"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Center - Title and game info */}
        <div className="flex-1 text-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            {title}
          </motion.h1>
          {variant === 'game' && roundCount > 0 && (
            <motion.div 
              className="flex justify-center items-center gap-4 mt-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="glass-button px-4 py-1.5 rounded-full">
                <span className="text-sm font-semibold">Manche {roundCount}</span>
              </div>
              <div className="glass-button px-4 py-1.5 rounded-full">
                <span className="text-sm font-semibold">Objectif : {scoreLimit} pts</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right side - Settings */}
        <div className="flex items-center gap-4">
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