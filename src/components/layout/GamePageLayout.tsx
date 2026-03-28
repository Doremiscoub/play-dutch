import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
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
  return (
    <PageShell variant="game">
      <MobileOptimizer pageType="game">
        {/* Header intégré */}
        {headerConfig?.title && <UnifiedHeader {...headerConfig as UnifiedHeaderConfig} />}

        {/* Container unifié */}
        <div className={cn("w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8", className)}>
          <main className="w-full">{children}</main>
        </div>
      </MobileOptimizer>
    </PageShell>
  );
};

export default GamePageLayout;
