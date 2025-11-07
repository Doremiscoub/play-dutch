import React, { ReactNode } from 'react';
import { useAds } from '@/contexts/EnhancedAdContext';
import EnhancedAdSlot from '@/components/ads/EnhancedAdSlot';
import { cn } from '@/lib/utils';
import useIsMobile from '@/hooks/use-mobile';
import PageShell from './PageShell';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import UnifiedHeader from './UnifiedHeader';
import type { UnifiedHeaderConfig } from '@/hooks/useUnifiedHeader';

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
          {/* Gestion ads desktop uniquement */}
          {!isMobile && shouldShowAds ? (
            <div className="grid grid-cols-[250px_1fr_250px] gap-6">
              {/* Sidebar gauche */}
              <aside className="flex flex-col justify-start items-center pt-4">
                <div className="sticky top-4">
                  <EnhancedAdSlot placement="game-sidebar-left" priority="medium" />
                </div>
              </aside>
              
              {/* Contenu central */}
              <main className="w-full">{children}</main>
              
              {/* Sidebar droite */}
              <aside className="flex flex-col justify-start items-center pt-4">
                <div className="sticky top-4">
                  <EnhancedAdSlot placement="game-sidebar-right" priority="medium" />
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
