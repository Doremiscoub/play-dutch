
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Home, List, Medal, BarChartBig } from 'lucide-react';
import { composedClasses } from '@/config/uiConfig';

interface ScoreHeaderProps {
  viewMode: 'podium' | 'table';
  setViewMode: (mode: 'podium' | 'table') => void;
  setShowStats: (show: boolean) => void;
}

/**
 * En-tête de la page des scores avec navigation et options d'affichage
 */
const ScoreHeader: React.FC<ScoreHeaderProps> = ({ 
  viewMode, 
  setViewMode,
  setShowStats
}) => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  return (
    <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoHome}
            className="rounded-full hover:bg-gray-100/70"
          >
            <Home className="h-5 w-5" />
          </Button>
          
          <h1 className={composedClasses.title}>
            Scores
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="view-mode"
              checked={viewMode === 'table'}
              onCheckedChange={(checked) => setViewMode(checked ? 'table' : 'podium')}
              className="data-[state=checked]:bg-dutch-blue"
            />
            <Label htmlFor="view-mode" className="text-sm font-medium">
              {viewMode === 'podium' ? (
                <Medal className="h-4 w-4 text-dutch-blue" />
              ) : (
                <List className="h-4 w-4 text-dutch-blue" />
              )}
            </Label>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowStats(true)}
            className="rounded-full hover:bg-gray-100/70"
          >
            <BarChartBig className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScoreHeader;
