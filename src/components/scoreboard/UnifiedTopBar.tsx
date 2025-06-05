
import React from 'react';
import { ArrowLeft, Settings, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface UnifiedTopBarProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  showRules?: boolean;
  roundCount?: number;
  scoreLimit?: number;
  className?: string;
}

const UnifiedTopBar: React.FC<UnifiedTopBarProps> = ({ 
  title,
  showBackButton = true,
  onBack,
  showSettings = true,
  showRules = true,
  roundCount,
  scoreLimit,
  className = ''
}) => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    localStorage.setItem('dutch_return_to_game', 'true');
    navigate(path);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      const shouldReturnToGame = localStorage.getItem('dutch_return_to_game');
      if (shouldReturnToGame) {
        localStorage.removeItem('dutch_return_to_game');
      }
      navigate('/');
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Left side - Back button */}
          <div className="flex items-center w-16">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-dutch-blue transition-colors hover:bg-dutch-blue/10 rounded-full"
                onClick={handleBack}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          {/* Center - Title and info */}
          <div className="flex-1 text-center">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2"
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1,
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{
                background: 'linear-gradient(270deg, #0A84FF, #8B5CF6, #FF9F0A, #0A84FF)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            >
              {title}
            </motion.h1>
            
            {/* Game info badges */}
            {(roundCount !== undefined || scoreLimit !== undefined) && (
              <motion.div 
                className="flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {roundCount !== undefined && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge variant="secondary" className="bg-dutch-blue/10 text-dutch-blue border-dutch-blue/20 text-sm font-medium px-3 py-1">
                      Manche {roundCount}
                    </Badge>
                  </motion.div>
                )}
                
                {scoreLimit !== undefined && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge variant="secondary" className="bg-dutch-orange/10 text-dutch-orange border-dutch-orange/20 text-sm font-medium px-3 py-1">
                      Limite {scoreLimit} pts
                    </Badge>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
          
          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2 w-16 justify-end">
            {showRules && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-dutch-purple transition-colors hover:bg-dutch-purple/10 rounded-full"
                  onClick={() => handleNavigation('/rules')}
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
            {showSettings && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-dutch-purple transition-colors hover:bg-dutch-purple/10 rounded-full"
                  onClick={() => handleNavigation('/settings')}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UnifiedTopBar;
