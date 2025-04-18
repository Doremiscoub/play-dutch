
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Globe } from 'lucide-react';

interface GameModeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const GameModeTabs: React.FC<GameModeTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="grid grid-cols-2 mb-6 rounded-full border-2 border-white/60 bg-white/90 backdrop-blur-md p-1 shadow-md w-full max-w-full overflow-hidden">
      <TabsTrigger 
        value="local" 
        className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-dutch-blue/20 data-[state=active]:border flex items-center justify-center space-x-1 py-2.5 text-dutch-blue data-[state=active]:text-dutch-blue data-[state=inactive]:text-dutch-blue/70 px-2 truncate"
      >
        <User className="w-4 h-4 flex-shrink-0 mr-1" />
        <span className="truncate">Local</span>
      </TabsTrigger>
      <TabsTrigger 
        value="online" 
        className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:border-dutch-orange/20 data-[state=active]:border flex items-center justify-center space-x-1 py-2.5 text-dutch-orange data-[state=active]:text-dutch-orange data-[state=inactive]:text-dutch-orange/70 px-2 truncate"
        disabled
      >
        <Globe className="w-4 h-4 flex-shrink-0 mr-1" />
        <span className="truncate">En ligne</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default GameModeTabs;
