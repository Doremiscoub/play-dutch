
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
    <>
      {/* CSS Styles */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes gradientText {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .gradient-bg {
            background: linear-gradient(135deg, 
              rgba(59, 130, 246, 0.4) 0%,
              rgba(147, 51, 234, 0.4) 35%,
              rgba(249, 115, 22, 0.4) 70%,
              rgba(59, 130, 246, 0.4) 100%);
            background-size: 400% 400%;
            animation: gradientShift 8s ease infinite;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, 
              #3b82f6 0%,
              #9333ea 35%,
              #f97316 70%,
              #3b82f6 100%);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientText 6s ease infinite;
          }
          
          .glassmorphic-bg {
            background: linear-gradient(135deg, 
              rgba(255, 255, 255, 0.3) 0%,
              rgba(255, 255, 255, 0.2) 50%,
              rgba(255, 255, 255, 0.3) 100%);
            backdrop-filter: blur(20px) saturate(120%);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.12),
              0 2px 16px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.4);
          }
        `}
      </style>

      <motion.div 
        className="sticky top-0 z-50 glassmorphic-bg gradient-bg px-6 py-8"
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
                  className="glassmorphic-bg hover:bg-white/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl rounded-2xl w-14 h-14 border border-white/40"
                >
                  <ArrowLeft className="h-7 w-7 text-gray-700" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* Center - Title and game info */}
          <div className="flex-1 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-black gradient-text tracking-tight"
              style={{
                textShadow: '0 4px 8px rgba(0,0,0,0.15)',
                letterSpacing: '-0.025em'
              }}
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
                <div className="px-6 py-2 glassmorphic-bg rounded-2xl border border-white/40 shadow-lg">
                  <span className="text-base font-bold text-gray-700">Manche {roundCount}</span>
                </div>
                <div className="px-6 py-2 glassmorphic-bg rounded-2xl border border-white/40 shadow-lg">
                  <span className="text-base font-bold text-gray-700">Objectif : {scoreLimit} pts</span>
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
    </>
  );
};

export default UnifiedTopBar;
