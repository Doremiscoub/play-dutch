import React, { ReactNode } from 'react';
import { useAds } from '@/contexts/EnhancedAdContext';
import EnhancedAdSlot from '@/components/ads/EnhancedAdSlot';
import { cn } from '@/lib/utils';
import useIsMobile from '@/hooks/use-mobile';
import PageShell from './PageShell';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import UnifiedHeader from './UnifiedHeader';
import type { UnifiedHeaderConfig } from '@/hooks/useUnifiedHeader';

// Placeholder pour les emplacements publicitaires
const AdPlaceholder: React.FC<{ position: 'left' | 'right' }> = ({ position }) => (
  <div className="w-[250px] h-[600px] rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 flex flex-col items-center justify-center p-4 text-center">
    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3">
      <span className="text-3xl">📢</span>
    </div>
    <p className="text-sm font-semibold text-gray-600 mb-1">Emplacement publicitaire</p>
    <p className="text-xs text-gray-500">Les publicités apparaîtront ici</p>
  </div>
);

interface GamePageLayoutProps {
  children: ReactNode;
  variant?: 'game' | 'tournament';
  headerConfig?: Partial<UnifiedHeaderConfig>;
  className?: string;
}

const GamePageLayout: React.FC<GamePageLayoutProps> = ({ 
  children, 
  variant = 'game',
  headerConfig,
  className 
}) => {
  const { shouldShowAds } = useAds();
  const isMobile = useIsMobile();

  return (
    <PageShell variant="game">
      <MobileOptimizer pageType="game">
        {/* Header intégré */}
        {headerConfig?.title && <UnifiedHeader {...headerConfig as UnifiedHeaderConfig} />}
        
        {/* Container unifié avec max-w-6xl */}
        <div className={cn("w-full max-w-6xl mx-auto px-4 py-6 md:py-8", className)}>
          {/* Layout 3 colonnes sur desktop (toujours affiché, avec placeholders si pas de pubs) */}
          {!isMobile ? (
            <div className="grid grid-cols-[250px_1fr_250px] gap-6">
              {/* Sidebar gauche */}
              <aside className="flex flex-col justify-start items-center pt-4">
                <div className="sticky top-4">
                  {shouldShowAds ? (
                    <EnhancedAdSlot placement="game-sidebar-left" priority="medium" />
                  ) : (
                    <AdPlaceholder position="left" />
                  )}
                </div>
              </aside>
              
              {/* Contenu central */}
              <main className="w-full">{children}</main>
              
              {/* Sidebar droite */}
              <aside className="flex flex-col justify-start items-center pt-4">
                <div className="sticky top-4">
                  {shouldShowAds ? (
                    <EnhancedAdSlot placement="game-sidebar-right" priority="medium" />
                  ) : (
                    <AdPlaceholder position="right" />
                  )}
                </div>
              </aside>
            </div>
          ) : (
            <main className="w-full">{children}</main>
          )}
        </div>
      </MobileOptimizer>
    </PageShell>
  );
};

export default GamePageLayout;
