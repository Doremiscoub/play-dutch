
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Globe } from 'lucide-react';

interface GameModeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const GameModeTabs: React.FC<GameModeTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="grid grid-cols-2 mb-6 rounded-full border-2 border-white/80 bg-white/90 backdrop-blur-md p-1 shadow-md w-full max-w-full overflow-hidden">
      <TabsTrigger 
        value="local" 
        onClick={() => onTabChange("local")}
        className="rounded-full data-[state=active]:bg-gradient-to-r from-dutch-blue to-dutch-purple data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-transparent flex items-center justify-center space-x-1 py-3 font-medium text-dutch-blue/90 data-[state=inactive]:text-dutch-blue/70 px-4 transition-all duration-300"
      >
        <User className="w-4 h-4 flex-shrink-0 mr-2" />
        <span>Local</span>
      </TabsTrigger>
      <TabsTrigger 
        value="online" 
        onClick={() => onTabChange("online")}
        className="rounded-full data-[state=active]:bg-gradient-to-r from-dutch-orange to-dutch-pink data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:bg-transparent flex items-center justify-center space-x-1 py-3 font-medium text-dutch-orange/90 data-[state=inactive]:text-dutch-orange/70 px-4 transition-all duration-300"
        disabled
      >
        <Globe className="w-4 h-4 flex-shrink-0 mr-2" />
        <span>En ligne</span>
        <span className="ml-1 text-xs bg-dutch-orange/20 text-dutch-orange/80 px-1.5 py-0.5 rounded-full">Bientôt</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default GameModeTabs;
