import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Sentry from '@sentry/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  level?: 'global' | 'route' | 'component';
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('GlobalErrorBoundary caught error:', error, errorInfo);
    
    // Enhanced Sentry reporting with context
    try {
      Sentry.withScope((scope) => {
        scope.setTag('errorBoundary', this.props.level || 'unknown');
        scope.setLevel('error');
        scope.setContext('errorInfo', {
          componentStack: errorInfo.componentStack,
          level: this.props.level,
          route: window.location.pathname,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        });
        
        // Add breadcrumb for user context
        scope.addBreadcrumb({
          message: 'Error boundary triggered',
          level: 'error',
          data: {
            level: this.props.level,
            route: window.location.pathname,
          },
        });
        
        Sentry.captureException(error);
      });
    } catch (sentryError) {
      console.error('Failed to report error to Sentry:', sentryError);
    }
    
    this.setState({ errorInfo });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReportBug = () => {
    const bugReport = {
      error: this.state.error?.message,
      stack: this.state.error?.stack,
      component: this.state.errorInfo?.componentStack,
      route: window.location.pathname,
      timestamp: new Date().toISOString(),
    };
    
    console.error('Bug Report:', bugReport);
    
    // Copy to clipboard for user convenience
    navigator.clipboard?.writeText(JSON.stringify(bugReport, null, 2))
      .then(() => alert('Rapport d\'erreur copié dans le presse-papiers'))
      .catch(() => console.error('Failed to copy bug report'));
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { level = 'global' } = this.props;
      const isGlobal = level === 'global';

      return (
        <div className={`flex items-center justify-center p-4 ${
          isGlobal ? 'min-h-screen bg-gradient-to-br from-red-50 to-orange-50' : 'min-h-[400px] bg-red-50/50 rounded-lg'
        }`}>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8 max-w-md w-full text-center space-y-6">
            <div className="text-red-500">
              <AlertTriangle className={`${isGlobal ? 'h-16 w-16' : 'h-12 w-12'} mx-auto`} />
            </div>
            
            <div className="space-y-2">
              <h2 className={`${isGlobal ? 'text-2xl' : 'text-xl'} font-bold text-gray-900`}>
                {isGlobal ? 'Oups ! Une erreur est survenue' : 'Erreur dans ce composant'}
              </h2>
              <p className="text-gray-600">
                {isGlobal 
                  ? 'L\'application a rencontré un problème inattendu.'
                  : 'Ce composant a rencontré une erreur.'
                } Vous pouvez essayer de recharger ou retourner à l'accueil.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-gray-100 rounded-lg p-4 text-sm">
                <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
                  Détails de l'erreur (développement)
                </summary>
                <div className="space-y-2">
                  <pre className="whitespace-pre-wrap text-red-600 text-xs break-all">
                    <strong>Error:</strong> {this.state.error.message}
                  </pre>
                  {this.state.error.stack && (
                    <pre className="whitespace-pre-wrap text-red-500 text-xs break-all">
                      <strong>Stack:</strong> {this.state.error.stack}
                    </pre>
                  )}
                  {this.state.errorInfo?.componentStack && (
                    <pre className="whitespace-pre-wrap text-orange-600 text-xs break-all">
                      <strong>Component Stack:</strong> {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={this.handleRetry}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Réessayer
              </Button>
              
              {isGlobal && (
                <Button
                  onClick={this.handleGoHome}
                  className="flex-1 bg-dutch-blue hover:bg-dutch-blue/90"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Accueil
                </Button>
              )}
              
              {process.env.NODE_ENV === 'development' && (
                <Button
                  onClick={this.handleReportBug}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  <Bug className="h-3 w-3 mr-1" />
                  Copier erreur
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;