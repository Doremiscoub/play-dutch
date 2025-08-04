import React, { Suspense, lazy, memo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import useIsMobile from '@/hooks/use-mobile';

// Lazy loading des composants lourds
const StatsOverview = lazy(() => import('./StatsOverview').then(module => ({ default: module.StatsOverview })));
const PlayerTrends = lazy(() => import('./PlayerTrends').then(module => ({ default: module.PlayerTrends })));
const PlayerRadar = lazy(() => import('./PlayerRadar').then(module => ({ default: module.PlayerRadar })));
const RoundHeatmap = lazy(() => import('./RoundHeatmap').then(module => ({ default: module.RoundHeatmap })));
const AdvancedStats = lazy(() => import('./AdvancedStats').then(module => ({ default: module.AdvancedStats })));
const AchievementsBadges = lazy(() => import('./AchievementsBadges').then(module => ({ default: module.AchievementsBadges })));

interface LazyStatisticsSectionProps {
  sectionId: string;
  component: React.ComponentType<any>;
  props: any;
  isVisible: boolean;
  className?: string;
}

// Composant de fallback optimisé pour mobile
const StatsSkeleton = memo(() => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-xl" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'}`}>
        {Array.from({ length: isMobile ? 2 : 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        ))}
      </div>
      {!isMobile && <Skeleton className="h-64 w-full rounded-lg" />}
    </Card>
  );
});

StatsSkeleton.displayName = 'StatsSkeleton';

export const LazyStatisticsSection = memo<LazyStatisticsSectionProps>(({
  sectionId,
  component: Component,
  props,
  isVisible,
  className = ""
}) => {
  const isMobile = useIsMobile();

  // Sur mobile, on charge seulement les sections visibles
  // Sur desktop, on peut charger plus agressivement
  const shouldLoad = isMobile ? isVisible : true;

  if (!shouldLoad) {
    return <StatsSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Suspense fallback={<StatsSkeleton />}>
        <Component {...props} />
      </Suspense>
    </motion.div>
  );
});

LazyStatisticsSection.displayName = 'LazyStatisticsSection';

// Hook pour gérer la visibilité des sections avec Intersection Observer
export const useVisibilityTracker = (threshold = 0.1) => {
  const [visibleSections, setVisibleSections] = React.useState<Set<string>>(new Set());
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  const trackElement = React.useCallback((element: HTMLElement | null, sectionId: string) => {
    if (!element) return;

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.getAttribute('data-section-id');
            if (!id) return;

            setVisibleSections(prev => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(id);
              } else {
                newSet.delete(id);
              }
              return newSet;
            });
          });
        },
        {
          threshold,
          rootMargin: '50px 0px' // Charge un peu avant que la section soit visible
        }
      );
    }

    element.setAttribute('data-section-id', sectionId);
    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [threshold]);

  React.useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { visibleSections, trackElement };
};