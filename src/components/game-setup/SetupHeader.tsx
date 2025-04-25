
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const SetupHeader: React.FC = () => {
  return (
    <CardHeader className="pb-2">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CardTitle className="text-xl font-semibold text-dutch-blue flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Un seul appareil suffit
        </CardTitle>
        <CardDescription className="text-gray-600">
          Tous les joueurs partagent le même appareil pour suivre les scores
        </CardDescription>
      </motion.div>
    </CardHeader>
  );
};

export default SetupHeader;
