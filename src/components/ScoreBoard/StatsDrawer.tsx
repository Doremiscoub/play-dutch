
import React from 'react';
import { Player } from '@/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import DetailedPlayerStats from '@/components/DetailedPlayerStats';
import { composedClasses } from '@/config/uiConfig';

interface StatsDrawerProps {
  players: Player[];
  open: boolean;
  onClose: () => void;
}

/**
 * Drawer latéral pour afficher des statistiques détaillées des joueurs
 */
const StatsDrawer: React.FC<StatsDrawerProps> = ({ players, open, onClose }) => {
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        className="bg-white/90 backdrop-blur-md border-l border-white/30 w-full max-w-md"
        side="right"
      >
        <SheetHeader className="mb-4">
          <SheetTitle className={composedClasses.title}>
            Stats du match
          </SheetTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 rounded-full hover:bg-gray-100/50" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        
        <div className="space-y-4 pr-2 max-h-[85vh] overflow-y-auto pb-6">
          {sortedPlayers.map((player, index) => (
            <DetailedPlayerStats
              key={player.id}
              player={player}
              isExpanded={true}
              onToggle={() => {}}
              isFirst={index === 0}
              isLast={index === sortedPlayers.length - 1}
              allPlayers={players}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StatsDrawer;
