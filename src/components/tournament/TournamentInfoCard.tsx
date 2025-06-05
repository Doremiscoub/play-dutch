
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const TournamentInfoCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 rounded-xl p-4 border border-white/40"
    >
      <div className="flex items-start gap-3">
        <Trophy className="h-5 w-5 text-dutch-orange mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <p className="font-medium text-sm text-gray-800">Mode tournoi avancé</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Créez un tournoi complet avec suivi des performances, classements détaillés et génération automatique de certificats. Parfait pour vos soirées jeux entre amis !
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TournamentInfoCard;
