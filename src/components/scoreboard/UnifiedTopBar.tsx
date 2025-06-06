
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import GameSettings from '@/components/GameSettings';

interface UnifiedTopBarProps {
  title: string;
  roundCount?: number;
  scoreLimit?: number;
  showBackButton?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  showRules?: boolean;
}

const UnifiedTopBar: React.FC<UnifiedTopBarProps> = ({
  title,
  roundCount = 0,
  scoreLimit = 100,
  showBackButton = false,
  onBack,
  showSettings = true,
  showRules = true
}) => {
  return (
    <motion.div 
      data-testid="unified-topbar"
      className="sticky top-0 z-50 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-orange-500/30 backdrop-blur-xl border-b border-white/20 px-6 py-8 shadow-lg"
      initial={{ opacity: 0, y: -30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.23, 1, 0.32, 1],
        delay: 0.1
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Back button */}
        <div className="flex items-center gap-4">
          {showBackButton && onBack && (
            <motion.div
              whileHover={{ scale: 1.08, rotate: -8 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="glass-button bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-2xl w-14 h-14 border border-white/30"
              >
                <ArrowLeft className="h-7 w-7 text-white" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Center - Title and game info */}
        <div className="flex-1 text-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 bg-clip-text text-transparent tracking-tight drop-shadow-lg animate-gradient-x"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.9, 
              delay: 0.3,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            {title}
          </motion.h1>
          {roundCount > 0 && (
            <motion.div 
              className="flex justify-center items-center gap-6 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                <span className="text-base font-bold text-white">Manche {roundCount}</span>
              </div>
              <div className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                <span className="text-base font-bold text-white">Objectif : {scoreLimit} pts</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right side - Settings */}
        <div className="flex items-center gap-4">
          {showSettings && (
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <GameSettings />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UnifiedTopBar;
