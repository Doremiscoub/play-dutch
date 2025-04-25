
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
        className="bg-dutch-blue/5 rounded-xl p-4 text-sm text-gray-600"
      >
        <p>
          Parfait pour jouer entre amis autour d'une table. 
          Chaque joueur entre son score à son tour sur cet appareil.
        </p>
        <p className="mt-2">
          Les scores sont enregistrés automatiquement et vous pouvez 
          reprendre la partie à tout moment.
        </p>
      </motion.div>
    </CardContent>
  );
};

export default SetupInfo;
