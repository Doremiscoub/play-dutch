
import React from 'react';
import { UnifiedTabs } from '@/components/ui/unified-tabs';
import { User, Globe } from 'lucide-react';

interface GameModeTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const GameModeTabs: React.FC<GameModeTabsProps> = ({ activeTab, onTabChange }) => {
  const tabOptions = [
    {
      value: "local",
      label: "Local",
      icon: <User className="h-4 w-4" />
    },
    {
      value: "online",
      label: "En ligne",
      icon: <Globe className="h-4 w-4" />,
      disabled: true
    }
  ];

  console.log("🚩 GameModeTabs rendu:", { activeTab, tabOptions });

  return (
    <UnifiedTabs
      value={activeTab}
      onValueChange={onTabChange}
      options={tabOptions}
      variant="orange"
    />
  );
};

export default GameModeTabs;
