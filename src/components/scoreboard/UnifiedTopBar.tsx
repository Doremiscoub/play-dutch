
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
      className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm px-4 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Back button */}
        <div className="flex items-center gap-3">
          {showBackButton && onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-sm hover:bg-white/90 transition-all hover:-translate-y-0.5 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Center - Title and game info */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          {roundCount > 0 && (
            <p className="text-sm text-gray-600">
              Manche {roundCount} • Objectif : {scoreLimit} points
            </p>
          )}
        </div>

        {/* Right side - Settings */}
        <div className="flex items-center gap-2">
          {showSettings && (
            <GameSettings />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UnifiedTopBar;
