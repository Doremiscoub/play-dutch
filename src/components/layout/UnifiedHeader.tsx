import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import GameSettings from '@/components/GameSettings';
import { ModernTitle } from '@/components/ui/modern-title';

interface UnifiedHeaderProps {
  title: string;
  roundCount?: number;
  scoreLimit?: number;
  showBackButton?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  variant?: 'default' | 'game' | 'simple';
  hideTitle?: boolean;
}

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  title,
  roundCount = 0,
  scoreLimit = 100,
  showBackButton = false,
  onBack,
  showSettings = true,
  variant = 'default',
  hideTitle = false
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
        <div className="flex-1 text-center">
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
              <ModernTitle
                variant="h3"
                withSparkles
                className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent"
              >
                {title}
              </ModernTitle>
            </motion.div>
          )}
          {variant === 'game' && roundCount > 0 && (
            <motion.div 
              className="flex justify-center items-center gap-4 mt-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="lg-popover lg-tint-primary-50 px-4 py-1.5 rounded-full">
                <span className="text-sm font-semibold">Manche {roundCount}</span>
              </div>
              <div className="lg-popover lg-tint-secondary-50 px-4 py-1.5 rounded-full">
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