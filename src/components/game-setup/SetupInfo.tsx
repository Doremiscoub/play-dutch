
import React from 'react';
import { motion } from 'framer-motion';
import { CardContent } from '@/components/ui/card';

const SetupInfo: React.FC = () => {
  return (
    <CardContent>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-xl p-4 text-base space-y-3"
      >
        <p className="text-gray-600 bg-dutch-blue/5 rounded-lg p-3">
          Parfait pour jouer entre amis autour d'une table. 
          Chaque joueur entre son score à son tour sur cet appareil.
        </p>
        <p className="text-gray-600 bg-dutch-purple/5 rounded-lg p-3">
          Les scores sont enregistrés automatiquement et vous pouvez 
          reprendre la partie à tout moment.
        </p>
      </motion.div>
    </CardContent>
  );
};

export default SetupInfo;
