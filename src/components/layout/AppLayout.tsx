
import React from 'react';
import { Outlet } from 'react-router-dom';
import PageTransition from '@/components/ui/page-transition';
import GlobalErrorBoundary from '@/components/error-handling/GlobalErrorBoundary';
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
    <GlobalErrorBoundary level="global">
      <div className="min-h-screen relative">
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
      </div>
    </GlobalErrorBoundary>
  );
};

export default AppLayout;
