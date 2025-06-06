
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
      className="sticky top-0 z-50 bg-white/20 backdrop-blur-2xl border-b border-white/30 shadow-2xl px-6 py-6"
      initial={{ opacity: 0, y: -30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.23, 1, 0.32, 1],
        delay: 0.1
      }}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.25) 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Back button */}
        <div className="flex items-center gap-4">
          {showBackButton && onBack && (
            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="bg-white/30 backdrop-blur-xl border-2 border-white/40 shadow-lg hover:bg-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-2xl w-12 h-12"
              >
                <ArrowLeft className="h-6 w-6 text-gray-700" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Center - Title and game info */}
        <div className="flex-1 text-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent"
            style={{
              backgroundSize: '200% auto',
              animation: 'gradientShift 6s ease infinite',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              letterSpacing: '-0.02em'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {title}
          </motion.h1>
          {roundCount > 0 && (
            <motion.div 
              className="flex justify-center items-center gap-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="px-4 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/30 backdrop-blur-md">
                <span className="text-sm font-semibold text-gray-700">Manche {roundCount}</span>
              </div>
              <div className="px-4 py-1 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-full border border-white/30 backdrop-blur-md">
                <span className="text-sm font-semibold text-gray-700">Objectif : {scoreLimit} pts</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right side - Settings */}
        <div className="flex items-center gap-3">
          {showSettings && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <GameSettings />
            </motion.div>
          )}
        </div>
      </div>

      {/* Gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

export default UnifiedTopBar;
