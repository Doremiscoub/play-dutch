
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { UnifiedTabs } from '@/components/ui/unified-tabs';
import IntroductionTab from './IntroductionTab';
import SetupTab from './SetupTab';
import GameplayTab from './GameplayTab';
import SpecialCardsTab from './SpecialCardsTab';

interface RulesTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const RulesTabs: React.FC<RulesTabsProps> = ({ activeTab, onTabChange }) => {
  const tabOptions = [
    { value: "introduction", label: "Introduction" },
    { value: "setup", label: "Mise en place" },
    { value: "gameplay", label: "Déroulement" },
    { value: "special", label: "Cartes spéciales" },
  ];

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <UnifiedTabs
        value={activeTab}
        onValueChange={onTabChange}
        options={tabOptions}
        variant="purple"
      />
      
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
