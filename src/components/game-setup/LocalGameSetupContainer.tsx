
import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import LocalGameSetup from './LocalGameSetup';
import SetupHeader from './SetupHeader';
import SetupInfo from './SetupInfo';
import { motion } from 'framer-motion';

interface LocalGameSetupContainerProps {
  onStartGame: (playerNames: string[]) => void;
}

const LocalGameSetupContainer: React.FC<LocalGameSetupContainerProps> = memo(({ onStartGame }) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-md shadow-md">
        <SetupHeader />
        <SetupInfo />
      </Card>

      <Card className="rounded-3xl border border-white/50 bg-white/90 backdrop-blur-md shadow-md">
        <LocalGameSetup onStartGame={onStartGame} />
      </Card>
    </motion.div>
  );
});

LocalGameSetupContainer.displayName = 'LocalGameSetupContainer';

export default LocalGameSetupContainer;
