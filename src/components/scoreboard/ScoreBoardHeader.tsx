
/**
 * En-tête du tableau des scores
 */
import React from 'react';
import { Trophy, Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import ProfessorAvatar from '../game/ProfessorAvatar';

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
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-dutch-purple"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <motion.h1 
          className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tableau des scores
        </motion.h1>
        
        <div className="flex items-center gap-2">
          <ProfessorAvatar />
          
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-dutch-purple"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <motion.div 
        className="flex items-center justify-center gap-4 text-gray-700 text-sm mt-4 bg-white/70 backdrop-blur-sm p-3 rounded-2xl border border-white/50 shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center">
          <span className="font-medium mr-2">Manche actuelle:</span> 
          <Badge variant="outline" className="bg-dutch-purple/10 text-dutch-purple font-medium px-3 py-1">
            {roundCount}
          </Badge>
        </div>
        
        <div className="flex items-center">
          <Trophy className="h-4 w-4 mr-2 text-dutch-orange" />
          <span className="font-medium mr-2">Jusqu'à:</span> 
          <Badge variant="outline" className="bg-dutch-orange/10 text-dutch-orange font-medium px-3 py-1">
            {scoreLimit} pts
          </Badge>
        </div>
      </motion.div>
    </div>
  );
};

export default ScoreBoardHeader;
