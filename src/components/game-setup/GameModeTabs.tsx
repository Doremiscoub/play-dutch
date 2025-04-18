
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Globe } from 'lucide-react';

interface GameModeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const GameModeTabs: React.FC<GameModeTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="grid grid-cols-2 mb-6 rounded-full border border-white/40 bg-white/70 backdrop-blur-md p-1 shadow-sm w-full max-w-full overflow-hidden">
      <TabsTrigger 
        value="local" 
        className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center justify-center space-x-1 py-2.5 text-dutch-blue data-[state=active]:text-dutch-blue data-[state=inactive]:text-dutch-blue/70 px-2 truncate"
      >
        <User className="w-4 h-4 flex-shrink-0 mr-1" />
        <span className="truncate">Local</span>
      </TabsTrigger>
      <TabsTrigger 
        value="online" 
        className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center justify-center space-x-1 py-2.5 text-dutch-orange data-[state=active]:text-dutch-orange data-[state=inactive]:text-dutch-orange/70 px-2 truncate"
        disabled
      >
        <Globe className="w-4 h-4 flex-shrink-0 mr-1" />
        <span className="truncate">En ligne</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default GameModeTabs;
