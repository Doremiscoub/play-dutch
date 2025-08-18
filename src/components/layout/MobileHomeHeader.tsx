import React from 'react';
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import GameSettings from '@/components/GameSettings';
import { cn } from '@/lib/utils';

interface MobileHomeHeaderProps {
  title: string;
  showSettings?: boolean;
  className?: string;
}

export const MobileHomeHeader: React.FC<MobileHomeHeaderProps> = ({
  title,
  showSettings = true,
  className
}) => {
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
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo/Titre */}
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <motion.span 
            className="text-2xl"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎯
          </motion.span>
          <h1 className="text-xl font-bold text-dutch-text bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
            {title}
          </h1>
        </motion.div>

        {/* Settings */}
        {showSettings && (
          <motion.div whileTap={{ scale: 0.95 }}>
            <GameSettings />
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};