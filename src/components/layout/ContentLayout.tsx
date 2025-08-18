import React, { ReactNode } from 'react';
import { useAds } from '@/contexts/AdContext';
import AdSlot from '@/components/ads/AdSlot';
import { cn } from '@/lib/utils';

interface ContentLayoutProps {
  children: ReactNode;
  className?: string;
  showInlineAds?: boolean;
  showSidebarAds?: boolean;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ 
  children, 
  className,
  showInlineAds = true,
  showSidebarAds = true 
}) => {
  const { shouldShowAds, isMobile } = useAds();

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
            <AdSlot placement="content-inline" />
          </div>
        )}
      </div>
    );
  }

  // Desktop : layout avec sidebar optionnelle
  if (shouldShowAds && showSidebarAds) {
    return (
      <div className={cn('w-full grid grid-cols-[1fr_300px] gap-8 min-h-[80vh]', className)}>
        {/* Contenu principal */}
        <main className="w-full">
          {children}
          
          {/* Publicité inline en bas si activée */}
          {showInlineAds && (
            <div className="w-full flex justify-center py-6 mt-8">
              <AdSlot placement="content-inline" />
            </div>
          )}
        </main>
        
        {/* Sidebar avec publicité */}
        <aside className="flex flex-col justify-start items-center pt-4">
          <div className="sticky top-4">
            <AdSlot placement="content-sidebar" />
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
          <AdSlot placement="content-inline" />
        </div>
      )}
    </div>
  );
};

export default ContentLayout;