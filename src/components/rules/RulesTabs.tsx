
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import IntroductionTab from './IntroductionTab';
import SetupTab from './SetupTab';
import GameplayTab from './GameplayTab';
import SpecialCardsTab from './SpecialCardsTab';

interface RulesTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const RulesTabs: React.FC<RulesTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs defaultValue="introduction" onValueChange={onTabChange} value={activeTab}>
      <TabsList className="w-full max-w-md mx-auto flex justify-center mb-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-full p-1 shadow-sm">
        <TabsTrigger value="introduction" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Introduction</TabsTrigger>
        <TabsTrigger value="setup" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Mise en place</TabsTrigger>
        <TabsTrigger value="gameplay" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Déroulement</TabsTrigger>
        <TabsTrigger value="special" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Cartes spéciales</TabsTrigger>
      </TabsList>
      
      <TabsContent value="introduction">
        <IntroductionTab />
      </TabsContent>
      
      <TabsContent value="setup">
        <SetupTab />
      </TabsContent>
      
      <TabsContent value="gameplay">
        <GameplayTab />
      </TabsContent>
      
      <TabsContent value="special">
        <SpecialCardsTab />
      </TabsContent>
    </Tabs>
  );
};

export default RulesTabs;
