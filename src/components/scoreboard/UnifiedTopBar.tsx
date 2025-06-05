
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
      <div className="max-w-4xl mx-auto px-4 py-4">
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
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent mb-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {title}
            </motion.h1>
            
            {/* Game info badges */}
            {(roundCount !== undefined || scoreLimit !== undefined) && (
              <motion.div 
                className="flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {roundCount !== undefined && (
                  <Badge variant="secondary" className="bg-dutch-blue/10 text-dutch-blue border-dutch-blue/20 text-xs font-medium">
                    Manche {roundCount}
                  </Badge>
                )}
                
                {scoreLimit !== undefined && (
                  <Badge variant="secondary" className="bg-dutch-orange/10 text-dutch-orange border-dutch-orange/20 text-xs font-medium">
                    Limite {scoreLimit} pts
                  </Badge>
                )}
              </motion.div>
            )}
          </div>
          
          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2 w-16 justify-end">
            {showRules && (
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-dutch-purple transition-colors hover:bg-dutch-purple/10 rounded-full"
                onClick={() => handleNavigation('/rules')}
              >
                <BookOpen className="h-4 w-4" />
              </Button>
            )}
            {showSettings && (
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-dutch-purple transition-colors hover:bg-dutch-purple/10 rounded-full"
                onClick={() => handleNavigation('/settings')}
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UnifiedTopBar;
