
import React from 'react';
import { Play, Users, LockIcon, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const GameModeSelector: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Mode local */}
      <motion.div 
        className="p-3 bg-dutch-blue/10 rounded-xl border border-dutch-blue/30 flex items-center justify-between"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2">
          <div className="bg-dutch-blue/20 p-2 rounded-lg">
            <Play className="h-5 w-5 text-dutch-blue" />
          </div>
          <div>
            <p className="font-medium text-dutch-blue">Local</p>
            <p className="text-xs text-gray-600">Sur cet appareil</p>
          </div>
        </div>
        <div className="bg-dutch-blue/20 px-2 py-1 rounded text-xs font-medium text-dutch-blue">
          Actif
        </div>
      </motion.div>
      
      {/* Mode multijoueur (grisé) */}
      <motion.div 
        className="p-3 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-between opacity-60"
      >
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 p-2 rounded-lg">
            <Users className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p className="font-medium text-gray-500">Multijoueur</p>
              <div className="bg-gray-200 px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-0.5" />
                À venir
              </div>
            </div>
            <p className="text-xs text-gray-500">Sur plusieurs appareils</p>
          </div>
        </div>
        <div>
          <LockIcon className="h-4 w-4 text-gray-400" />
        </div>
      </motion.div>
    </div>
  );
};

export default GameModeSelector;
