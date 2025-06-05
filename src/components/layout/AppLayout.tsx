
import React from 'react';
import { Outlet } from 'react-router-dom';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';
import PageTransition from '@/components/ui/page-transition';
import EnhancedErrorBoundary from '@/components/ui/error-boundary-enhanced';
import EnhancedLoading from '@/components/ui/enhanced-loading';
import { useAppState } from '@/hooks/useAppState';
import { toast } from 'sonner';

const AppLayout: React.FC = () => {
  const { globalLoading, loadingMessage, globalError, setGlobalError } = useAppState();

  // Show error toast when global error occurs
  React.useEffect(() => {
    if (globalError) {
      toast.error(globalError);
      setGlobalError(null);
    }
  }, [globalError, setGlobalError]);

  return (
    <EnhancedErrorBoundary>
      <div className="min-h-screen relative">
        {/* Global loading overlay */}
        {globalLoading && (
          <EnhancedLoading 
            variant="full-page" 
            message={loadingMessage} 
          />
        )}
        
        {/* Breadcrumb navigation - only show on pages other than home */}
        <div className="absolute top-4 left-4 z-40">
          <BreadcrumbNavigation />
        </div>
        
        {/* Main content with page transitions */}
        <PageTransition>
          <Outlet />
        </PageTransition>
      </div>
    </EnhancedErrorBoundary>
  );
};

export default AppLayout;
