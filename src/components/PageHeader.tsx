
import React, { ReactNode } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { UnifiedButton } from '@/components/ui/unified-button';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: ReactNode;
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
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        {onBack && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <UnifiedButton
              variant="glass"
              size="icon"
              onClick={onBack}
              aria-label="Retour"
            >
              <ArrowLeft className="h-5 w-5 text-dutch-blue" />
            </UnifiedButton>
          </motion.div>
        )}
        
        <div className="flex-grow text-center">
          {title}
        </div>
        
        {showSettings ? (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <UnifiedButton
              variant="glass"
              size="icon"
              onClick={onSettings}
              aria-label="Réglages"
            >
              <Settings className="h-5 w-5 text-dutch-purple" />
            </UnifiedButton>
          </motion.div>
        ) : (
          <div className="w-10">{/* Spacer pour maintenir l'alignement */}</div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
