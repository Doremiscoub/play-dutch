
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
      className={`bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Back button */}
          <div className="w-10">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-dutch-blue transition-colors hover:bg-dutch-blue/10"
                onClick={handleBack}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          {/* Center - Title */}
          <motion.div 
            className="flex-1 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
              {title}
            </h1>
          </motion.div>
          
          {/* Right side - Action buttons */}
          <div className="flex items-center gap-2 w-10 justify-end">
            {showRules && (
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-dutch-purple transition-colors hover:bg-dutch-purple/10"
                onClick={() => handleNavigation('/rules')}
              >
                <BookOpen className="h-4 w-4" />
              </Button>
            )}
            {showSettings && (
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-dutch-purple transition-colors hover:bg-dutch-purple/10"
                onClick={() => handleNavigation('/settings')}
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Game info badges */}
        {(roundCount !== undefined || scoreLimit !== undefined) && (
          <motion.div 
            className="flex items-center justify-center gap-4 mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {roundCount !== undefined && (
              <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <span className="text-gray-700 font-medium text-sm mr-2">Manche</span>
                <Badge variant="secondary" className="bg-dutch-purple/15 text-dutch-purple font-medium text-sm">
                  {roundCount}
                </Badge>
              </div>
            )}
            
            {scoreLimit !== undefined && (
              <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <span className="text-gray-700 font-medium text-sm mr-2">Limite</span>
                <Badge variant="secondary" className="bg-dutch-orange/15 text-dutch-orange font-medium text-sm">
                  {scoreLimit} pts
                </Badge>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default UnifiedTopBar;
