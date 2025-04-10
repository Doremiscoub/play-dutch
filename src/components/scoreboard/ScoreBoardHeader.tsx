
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScoreBoardHeaderProps {
  roundCount: number;
  scoreLimit?: number;
}

const ScoreBoardHeader: React.FC<ScoreBoardHeaderProps> = ({ roundCount, scoreLimit }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Accueil
          </Button>
        </Link>
        
        <div className="flex gap-2">
          <Link to="/rules">
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-gray-600">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Règles</span>
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-gray-600">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Réglages</span>
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
          Tableau des scores
          <span className="ml-2 text-sm">✨</span>
        </h1>
        <p className="text-gray-600">
          Manche {roundCount}
          {scoreLimit ? <span className="ml-2 text-dutch-purple"> | Limite: {scoreLimit} points</span> : ''}
        </p>
      </div>
    </>
  );
};

export default ScoreBoardHeader;
