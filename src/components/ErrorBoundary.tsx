import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent?: React.ComponentType<{ error: Error; errorInfo: ErrorInfo; errorCode: string; reset?: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCode: string;
}

/**
 * Système global de gestion des erreurs avec codes uniques et journalisation détaillée
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCode: ''
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Génération d'un code d'erreur unique basé sur le message ou la stack
    const errorCode = `ERR_${error.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 10)}_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
    
    console.info(`ErrorBoundary: Erreur capturée via getDerivedStateFromError - Code: ${errorCode}`);
    return {
      hasError: true,
      error,
      errorInfo: null,
      errorCode
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Journalisation détaillée de l'erreur avec code et composant
    const componentName = errorInfo.componentStack
      ?.split('\n')[1]
      ?.trim()
      ?.replace(/^in\s+/, '') || 'Unknown';
    
    console.error(`ErrorBoundary: Erreur dans le composant "${componentName}" - Code: ${this.state.errorCode}`);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    console.error('Informations additionnelles:', errorInfo);
    
    // Mettre à jour l'état avec les infos d'erreur complètes
    this.setState({
      errorInfo
    });
    
    // Si l'environnement est configuré pour, envoyer l'erreur à un service de monitoring
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      try {
        const errorData = {
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          url: window.location.href,
          errorCode: this.state.errorCode,
          timestamp: new Date().toISOString()
        };
        
        console.info('Données d\'erreur complètes:', errorData);
        
        // Point d'extension pour l'envoi à un service de monitoring futur
        // sendToMonitoring(errorData);
      } catch (loggingError) {
        console.error('Erreur lors de la journalisation:', loggingError);
      }
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Réinitialiser l'état d'erreur si les enfants changent
    if (prevProps.children !== this.props.children && this.state.hasError) {
      console.info(`ErrorBoundary: Réinitialisation après changement d'enfants`);
      this.setState({ 
        hasError: false,
        error: null,
        errorInfo: null,
        errorCode: ''
      });
    }
  }
  
  // Méthode pour réinitialiser manuellement l'état d'erreur
  resetErrorBoundary = () => {
    console.info('ErrorBoundary: Réinitialisation manuelle');
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorCode: ''
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo, errorCode } = this.state;
    const { children, FallbackComponent } = this.props;

    if (hasError && error) {
      // Utiliser le composant de fallback personnalisé s'il est fourni
      if (FallbackComponent) {
        return <FallbackComponent 
          error={error} 
          errorInfo={errorInfo || {componentStack: ''}} 
          errorCode={errorCode}
          reset={this.resetErrorBoundary}
        />;
      }
      
      // Sinon, afficher l'UI de fallback par défaut
      return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-full max-w-md p-6">
            <Alert variant="destructive" className="mb-6">
              <AlertTitle className="text-lg font-medium mb-2">Une erreur est survenue</AlertTitle>
              <AlertDescription>
                <p className="mb-4">{error.message}</p>
                <div className="text-xs text-muted-foreground mt-2 font-mono">Code: {errorCode}</div>
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col gap-3 mt-6">
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Essayez de rafraîchir la page
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/'} 
                className="w-full flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
