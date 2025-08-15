import React, { ReactNode } from 'react';
import { useAds } from '@/contexts/AdContext';
import AdSlot from '@/components/ads/AdSlot';
import { cn } from '@/lib/utils';

interface GameLayoutProps {
  children: ReactNode;
  className?: string;
}

const GameLayout: React.FC<GameLayoutProps> = ({ children, className }) => {
  const { shouldShowAds, isMobile } = useAds();

  // Mobile : layout simple avec bannière optionnelle
  if (isMobile) {
    return (
      <div className={cn('min-h-screen flex flex-col', className)}>
        {/* Bannière top mobile */}
        {shouldShowAds && (
          <div className="w-full flex justify-center py-4 px-4">
            <AdSlot placement="game-banner-mobile" />
          </div>
        )}
        
        {/* Contenu principal */}
        <div className="flex-1 px-4">
          {children}
        </div>
      </div>
    );
  }

  // Desktop : layout avec sidebars fixes
  return (
    <div className={cn('min-h-screen grid grid-cols-[250px_1fr_250px] gap-6', className)}>
      {/* Sidebar gauche fixe */}
      <aside className="sticky top-0 h-screen flex flex-col justify-start items-center pt-8">
        {shouldShowAds && (
          <AdSlot placement="game-sidebar-left" />
        )}
      </aside>
      
      {/* Contenu central scrollable */}
      <main className="w-full min-h-screen">
        {children}
      </main>
      
      {/* Sidebar droite fixe */}
      <aside className="sticky top-0 h-screen flex flex-col justify-start items-center pt-8">
        {shouldShowAds && (
          <AdSlot placement="game-sidebar-right" />
        )}
      </aside>
    </div>
  );
};

export default GameLayout;