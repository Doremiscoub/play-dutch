
import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  showSettings?: boolean;
  onSettings?: () => void;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onBack,
  showSettings = false,
  onSettings,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-dutch-purple"
            onClick={onBack}
            aria-label="Retour"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        <motion.h1 
          className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        
        {showSettings ? (
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-dutch-purple"
            onClick={onSettings}
            aria-label="Réglages"
          >
            <Settings className="h-5 w-5" />
          </Button>
        ) : (
          <div className="w-10" /> {/* Spacer pour maintenir l'alignement */}
        )}
      </div>
    </div>
  );
};

export default PageHeader;
