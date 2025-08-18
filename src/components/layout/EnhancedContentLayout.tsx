import React, { ReactNode } from 'react';
import { useAds } from '@/contexts/AdContext';
import EnhancedAdSlot from '@/components/ads/EnhancedAdSlot';
import { cn } from '@/lib/utils';

interface ContentLayoutProps {
  children: ReactNode;
  className?: string;
  showInlineAds?: boolean;
  showSidebarAds?: boolean;
  adPlacement?: 'content' | 'rules' | 'history' | 'faq' | 'legal';
  stickyAds?: boolean;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ 
  children, 
  className,
  showInlineAds = true,
  showSidebarAds = true,
  adPlacement = 'content',
  stickyAds = true
}) => {
  const { shouldShowAds, isMobile } = useAds();

  // Mapping des placements
  const placementMap = {
    content: {
      inline: 'content-inline' as const,
      sidebar: 'content-sidebar' as const
    },
    rules: {
      inline: 'rules-inline' as const,
      sidebar: 'rules-sidebar' as const
    },
    history: {
      inline: 'history-inline' as const,
      sidebar: 'history-sidebar' as const
    },
    faq: {
      inline: 'faq-inline' as const,
      sidebar: 'content-sidebar' as const
    },
    legal: {
      inline: 'legal-inline' as const,
      sidebar: 'content-sidebar' as const
    }
  };

  const placements = placementMap[adPlacement];

  // Mobile : layout simple avec publicités inline
  if (isMobile) {
    return (
      <div className={cn('w-full', className)}>
        {/* Contenu principal */}
        <div className="w-full">
          {children}
        </div>
        
        {/* Publicité inline en bas si activée */}
        {shouldShowAds && showInlineAds && (
          <div className="w-full flex justify-center py-4 mt-6">
            <EnhancedAdSlot 
              placement={placements.inline} 
              refreshable={adPlacement === 'content'}
            />
          </div>
        )}
      </div>
    );
  }

  // Desktop : layout avec sidebar optionnelle
  if (shouldShowAds && showSidebarAds) {
    return (
      <div className={cn('w-full grid grid-cols-[1fr_320px] gap-8 min-h-[80vh]', className)}>
        {/* Contenu principal */}
        <main className="w-full min-w-0">
          {children}
          
          {/* Publicité inline en bas si activée */}
          {showInlineAds && (
            <div className="w-full flex justify-center py-6 mt-8">
              <EnhancedAdSlot 
                placement={placements.inline} 
                refreshable={adPlacement === 'content'}
              />
            </div>
          )}
        </main>
        
        {/* Sidebar avec publicité sticky */}
        <aside className="flex flex-col justify-start items-center pt-4">
          <EnhancedAdSlot 
            placement={placements.sidebar} 
            sticky={stickyAds}
            refreshable={adPlacement === 'content'}
          />
          
          {/* Espace pour d'autres éléments de sidebar si nécessaire */}
          <div className="mt-6 w-full">
            {/* Future: widgets, liens, etc. */}
          </div>
        </aside>
      </div>
    );
  }

  // Desktop sans sidebar ads
  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {children}
      
      {/* Publicité inline en bas si activée */}
      {shouldShowAds && showInlineAds && (
        <div className="w-full flex justify-center py-6 mt-8">
          <EnhancedAdSlot 
            placement={placements.inline} 
            refreshable={adPlacement === 'content'}
          />
        </div>
      )}
    </div>
  );
};

export default ContentLayout;