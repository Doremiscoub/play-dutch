import React from 'react';
import { ArrowLeft, Settings, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GameSettings from '@/components/GameSettings';
import { cn } from '@/lib/utils';

interface MobilePageHeaderProps {
  title: string;
  onBack?: () => void;
  showSettings?: boolean;
  showRulesButton?: boolean;
  className?: string;
  variant?: 'default' | 'simple';
}

export const MobilePageHeader: React.FC<MobilePageHeaderProps> = ({
  title,
  onBack,
  showSettings = true,
  showRulesButton = false,
  className,
  variant = 'default'
}) => {
  const navigate = useNavigate();

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
      <div className="flex items-center justify-between px-4 py-3">
        {/* Bouton retour */}
        {onBack && (
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-10 w-10 rounded-xl hover:bg-dutch-accent/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </motion.div>
        )}

        {/* Titre */}
        <motion.h1 
          className={cn(
            "font-bold text-dutch-text bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent",
            onBack ? "text-lg" : "text-xl"
          )}
          layoutId="page-title"
        >
          {title}
        </motion.h1>

        {/* Actions droite */}
        <div className="flex items-center gap-2">
          {/* Bouton Règles */}
          {showRulesButton && (
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/rules')}
                className="h-10 w-10 rounded-xl hover:bg-dutch-purple/10"
              >
                <BookOpen className="h-4 w-4 text-dutch-purple" />
              </Button>
            </motion.div>
          )}

          {/* Settings */}
          {showSettings && (
            <motion.div whileTap={{ scale: 0.95 }}>
              <GameSettings />
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};