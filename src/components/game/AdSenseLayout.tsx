
import React, { ReactNode } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import AdSenseManager from '@/components/ads/AdSenseManager';
import PremiumUpgradeButton from '@/components/subscription/PremiumUpgradeButton';

interface AdSenseLayoutProps {
  children: ReactNode;
}

const AdSenseLayout: React.FC<AdSenseLayoutProps> = ({ children }) => {
  const { isPremium } = useSubscription();

  // For premium users, use simple layout without ads
  if (isPremium) {
    return (
      <div className="mx-auto max-w-screen-lg w-full min-h-screen px-4">
        {children}
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[250px_1fr_250px] gap-4 w-full overflow-hidden">
      <aside className="hidden lg:flex lg:flex-col lg:justify-start lg:items-start lg:pt-8 lg:pr-4 space-y-6">
        <PremiumUpgradeButton variant="compact" />
        <AdSenseManager placement="game-sidebar" />
      </aside>
      
      <main className="mx-auto max-w-screen-lg w-full min-h-screen px-4">
        {children}
      </main>
      
      <aside className="hidden lg:flex lg:justify-start lg:items-start lg:pt-8 lg:pl-4">
        <AdSenseManager placement="game-sidebar" />
      </aside>
    </div>
  );
};

export default AdSenseLayout;
