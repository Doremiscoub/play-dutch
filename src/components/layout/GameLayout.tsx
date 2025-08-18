import React, { ReactNode } from 'react';
import { useAds } from '@/contexts/AdContext';
import EnhancedAdSlot from '@/components/ads/EnhancedAdSlot';
import { cn } from '@/lib/utils';

interface GameLayoutProps {
  children: ReactNode;
  className?: string;
}

const GameLayout: React.FC<GameLayoutProps> = ({ children, className }) => {
  const { shouldShowAds, isMobile } = useAds();

  // Mobile : layout simple avec bannière optionnelle en haut
  if (isMobile) {
    return (
      <div className={cn('w-full', className)}>
        {/* Bannière top mobile */}
        {shouldShowAds && (
          <div className="w-full flex justify-center py-2 mb-4">
            <EnhancedAdSlot placement="game-banner-mobile" refreshable />
          </div>
        )}
        
        {/* Contenu principal */}
        <div className="w-full">
          {children}
        </div>
      </div>
    );
  }

  // Desktop : layout avec sidebars pour le contenu de jeu uniquement
  return (
    <div className={cn('w-full grid grid-cols-[250px_1fr_250px] gap-6 min-h-[80vh]', className)}>
      {/* Sidebar gauche */}
      <aside className="flex flex-col justify-start items-center pt-4">
        {shouldShowAds && (
          <div className="sticky top-4">
            <EnhancedAdSlot placement="game-sidebar-left" sticky refreshable />
          </div>
        )}
      </aside>
      
      {/* Contenu central */}
      <main className="w-full">
        {children}
      </main>
      
      {/* Sidebar droite */}
      <aside className="flex flex-col justify-start items-center pt-4">
        {shouldShowAds && (
          <div className="sticky top-4">
            <EnhancedAdSlot placement="game-sidebar-right" sticky refreshable />
          </div>
        )}
      </aside>
    </div>
  );
};

export default GameLayout;