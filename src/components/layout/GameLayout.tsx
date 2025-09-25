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

  // Mobile : layout simple sans bannière statique (bannières contextuelles uniquement)
  if (isMobile) {
    return (
      <div className={cn('w-full', className)}>
        {/* Contenu principal - pas de bannière statique */}
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
            <AdSlot placement="game-sidebar-left" />
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
            <AdSlot placement="game-sidebar-right" />
          </div>
        )}
      </aside>
    </div>
  );
};

export default GameLayout;