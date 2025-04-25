
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const SetupHeader: React.FC = () => {
  return (
    <CardHeader>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-dutch-blue" />
          Un seul appareil suffit
        </CardTitle>
        <CardDescription className="text-gray-600 mt-2 text-base">
          Tous les joueurs partagent le même appareil pour suivre les scores
        </CardDescription>
      </motion.div>
    </CardHeader>
  );
};

export default SetupHeader;
