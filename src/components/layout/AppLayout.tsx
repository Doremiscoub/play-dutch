
import React from 'react';
import { Outlet } from 'react-router-dom';
import PageTransition from '@/components/ui/page-transition';
import EnhancedErrorBoundary from '@/components/ui/error-boundary-enhanced';
import EnhancedLoading from '@/components/ui/enhanced-loading';
import { useAppState } from '@/hooks/useAppState';
import { toast } from 'sonner';
import GlobalFooter from './GlobalFooter';

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
      <div className="min-h-screen relative flex flex-col">
        {/* Global loading overlay */}
        {globalLoading && (
          <EnhancedLoading 
            variant="full-page" 
            message={loadingMessage} 
          />
        )}
        
        {/* Main content with page transitions */}
        <div className="flex-1">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </div>

        {/* Global Footer pour les routes sans PageShell */}
        <GlobalFooter variant="minimal" className="mt-auto" />
      </div>
    </EnhancedErrorBoundary>
  );
};

export default AppLayout;
