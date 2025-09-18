
import React from 'react';
import { Outlet } from 'react-router-dom';
import PageTransition from '@/components/ui/page-transition';
import EnhancedErrorBoundary from '@/components/ui/error-boundary-enhanced';
import EnhancedLoading from '@/components/ui/enhanced-loading';
import MobileNavigation from '@/components/mobile/MobileNavigation';
import QuickActionMenu from '@/components/navigation/QuickActionMenu';
import InteractiveTutorial from '@/components/InteractiveTutorial';
import PerformanceMonitor from '@/components/performance/PerformanceMonitor';
import { useAppState } from '@/hooks/useAppState';
import { useTutorial } from '@/hooks/useTutorial';
import { toast } from 'sonner';

const AppLayout: React.FC = () => {
  const { globalLoading, loadingMessage, globalError, setGlobalError } = useAppState();
  const { showTutorial, closeTutorial } = useTutorial();

  // Show error toast when global error occurs
  React.useEffect(() => {
    if (globalError) {
      toast.error(globalError);
      setGlobalError(null);
    }
  }, [globalError, setGlobalError]);

  return (
    <EnhancedErrorBoundary>
      <div className="min-h-screen relative pb-16 md:pb-0">
        {/* Global loading overlay */}
        {globalLoading && (
          <EnhancedLoading 
            variant="full-page" 
            message={loadingMessage} 
          />
        )}
        
        {/* Main content with page transitions */}
        <PageTransition>
          <Outlet />
        </PageTransition>
        
        {/* Navigation mobile (visible uniquement sur mobile) */}
        <MobileNavigation />
        
        {/* Menu d'actions rapides flottant */}
        <QuickActionMenu />
        
        {/* Performance Monitor en mode dev */}
        <PerformanceMonitor />
        
        {/* Tutorial interactif */}
        {showTutorial && (
          <InteractiveTutorial onComplete={closeTutorial} />
        )}
      </div>
    </EnhancedErrorBoundary>
  );
};

export default AppLayout;
