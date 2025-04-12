
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ScoreBoardHeaderProps {
  roundCount: number;
  scoreLimit?: number;
}

const ScoreBoardHeader: React.FC<ScoreBoardHeaderProps> = ({ roundCount, scoreLimit = 100 }) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="p-2 bg-white/80 hover:bg-white/90 rounded-full"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </Button>
        
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mx-auto text-center bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent"
        >
          Tableau des Scores
        </motion.h1>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-white/80 text-dutch-purple font-medium">
            {roundCount} manche{roundCount > 1 ? 's' : ''}
          </Badge>
          
          <Badge variant="outline" className="bg-white/80 text-dutch-blue font-medium">
            {scoreLimit} pts
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoardHeader;
