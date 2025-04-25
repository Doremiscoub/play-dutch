
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
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm p-4"
    >
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-dutch-purple transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <motion.h1 
          className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Tableau des scores
        </motion.h1>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-dutch-purple transition-colors"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <motion.div 
        className="flex flex-wrap items-center justify-center gap-4 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <span className="text-gray-700 font-medium mr-2">Manche</span>
          <Badge variant="secondary" className="bg-dutch-purple/10 text-dutch-purple font-medium">
            {roundCount}
          </Badge>
        </div>
        
        <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <Trophy className="h-4 w-4 mr-2 text-dutch-orange" />
          <span className="text-gray-700 font-medium mr-2">Limite</span>
          <Badge variant="secondary" className="bg-dutch-orange/10 text-dutch-orange font-medium">
            {scoreLimit} pts
          </Badge>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScoreBoardHeader;
