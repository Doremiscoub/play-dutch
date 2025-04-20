
import React from 'react';
import { ToggleTabs } from '@/components/ui/toggle-tabs';
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
      icon: <User className="w-4 h-4" />
    },
    {
      value: "online",
      label: "En ligne",
      icon: <Globe className="w-4 h-4" />,
    }
  ];

  return (
    <ToggleTabs
      value={activeTab}
      onValueChange={onTabChange}
      options={tabOptions}
      variant="orange"
      size="full"
    />
  );
};

export default GameModeTabs;
