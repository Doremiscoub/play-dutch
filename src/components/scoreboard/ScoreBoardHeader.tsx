
/**
 * En-tête du tableau des scores
 */
import React from 'react';
import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ScoreBoardHeaderProps {
  roundCount: number;
  scoreLimit: number;
}

const ScoreBoardHeader: React.FC<ScoreBoardHeaderProps> = ({ 
  roundCount, 
  scoreLimit 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <motion.h1 
          className="text-2xl font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tableau des scores
        </motion.h1>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-dutch-purple"
          onClick={() => navigate('/')}
        >
          Accueil
        </Button>
      </div>
      
      <div className="flex items-center text-gray-600 text-sm space-x-4">
        <div className="flex items-center">
          <span className="font-medium mr-1">Manche actuelle:</span> 
          <span className="bg-dutch-purple/10 text-dutch-purple px-2 py-0.5 rounded-full font-medium">
            {roundCount}
          </span>
        </div>
        
        <div className="flex items-center">
          <Trophy className="h-4 w-4 mr-1 text-dutch-orange" />
          <span className="font-medium mr-1">Limite:</span> 
          <span className="bg-dutch-orange/10 text-dutch-orange px-2 py-0.5 rounded-full font-medium">
            {scoreLimit} pts
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoardHeader;
