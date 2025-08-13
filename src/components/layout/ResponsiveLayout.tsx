import React, { ReactNode } from 'react';
import { useAds } from '@/contexts/AdContext';
import AdSlot from '@/components/ads/AdSlot';
import PremiumUpgradeButton from '@/components/subscription/PremiumUpgradeButton';

interface ResponsiveLayoutProps {
  children: ReactNode;
  showPremiumCTA?: boolean;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ 
  children, 
  showPremiumCTA = true 
}) => {
  const { isPremium, isMobile } = useAds();

  // Layout premium : simple et propre
  if (isPremium) {
    return (
      <div className="mx-auto max-w-screen-lg w-full min-h-screen px-4">
        {children}
      </div>
    );
  }

  // Layout gratuit : avec publicités intelligemment placées
  return (
    <div className="grid lg:grid-cols-[250px_1fr_250px] gap-6 w-full">
      {/* Sidebar gauche - Desktop uniquement */}
      <aside className="hidden lg:flex flex-col justify-start items-center pt-8 space-y-6">
        <AdSlot placement="sidebar" />
      </aside>
      
      {/* Contenu principal */}
      <main className="w-full px-4">
        {children}
        
        {/* Banner mobile après contenu */}
        {isMobile && (
          <div className="mt-8 space-y-4">
            <AdSlot placement="banner" />
            {showPremiumCTA && (
              <PremiumUpgradeButton variant="banner" />
            )}
          </div>
        )}
      </main>
      
      {/* Sidebar droite - Desktop uniquement */}
      <aside className="hidden lg:flex flex-col justify-start items-center pt-8 space-y-6">
        {showPremiumCTA && (
          <PremiumUpgradeButton variant="compact" />
        )}
        <AdSlot placement="sidebar" />
      </aside>
    </div>
  );
};

export default ResponsiveLayout;