
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Globe } from 'lucide-react';

interface GameModeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const GameModeTabs: React.FC<GameModeTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="grid grid-cols-2 mb-6 rounded-full border-2 border-white/20 bg-white/70 backdrop-blur-md shadow-sm overflow-hidden h-12">
      <TabsTrigger 
        value="local" 
        onClick={() => onTabChange("local")}
        className="rounded-full data-[state=active]:bg-dutch-blue/90 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-dutch-blue/70 flex items-center justify-center space-x-2 transition-all duration-300 h-full"
      >
        <User className="w-4 h-4 flex-shrink-0" />
        <span className="font-medium">Local</span>
      </TabsTrigger>
      <TabsTrigger 
        value="online" 
        onClick={() => onTabChange("online")}
        className="rounded-full data-[state=active]:bg-dutch-orange/90 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-dutch-orange/70 flex items-center justify-center space-x-2 transition-all duration-300 h-full"
        disabled
      >
        <Globe className="w-4 h-4 flex-shrink-0" />
        <span className="font-medium">En ligne</span>
        <span className="ml-1 text-xs bg-dutch-orange/20 text-dutch-orange/80 px-1.5 py-0.5 rounded-full">Bientôt</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default GameModeTabs;
