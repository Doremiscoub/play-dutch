
/**
 * En-tête du tableau des scores
 */
import React from 'react';
import { Trophy, Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

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
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-dutch-purple"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
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
          size="icon"
          className="text-gray-600 hover:text-dutch-purple"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex items-center justify-center gap-4 text-gray-600 text-sm mt-3 bg-white/60 backdrop-blur-sm p-2 rounded-xl border border-white/50">
        <div className="flex items-center">
          <span className="font-medium mr-1">Manche actuelle:</span> 
          <Badge variant="outline" className="bg-dutch-purple/10 text-dutch-purple font-medium">
            {roundCount}
          </Badge>
        </div>
        
        <div className="flex items-center">
          <Trophy className="h-4 w-4 mr-1 text-dutch-orange" />
          <span className="font-medium mr-1">Limite:</span> 
          <Badge variant="outline" className="bg-dutch-orange/10 text-dutch-orange font-medium">
            {scoreLimit} pts
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoardHeader;
