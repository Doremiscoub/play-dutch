
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent: React.ComponentType<{ error: Error }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Composant de gestion des erreurs pour capturer et afficher les erreurs de rendu
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Met à jour l'état pour afficher l'UI de fallback
    console.info("ErrorBoundary: Erreur capturée via getDerivedStateFromError");
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Journalisation détaillée de l'erreur
    console.error('ErrorBoundary: Erreur capturée via componentDidCatch:', error);
    console.error('ErrorBoundary: Informations additionnelles:', errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    // Réinitialiser l'état d'erreur si les enfants changent
    if (prevProps.children !== this.props.children && this.state.hasError) {
      console.info("ErrorBoundary: Réinitialisation après changement d'enfants");
      this.setState({ 
        hasError: false,
        error: null
      });
    }
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, FallbackComponent } = this.props;

    if (hasError && error) {
      console.info("ErrorBoundary: Affichage du composant de fallback");
      return <FallbackComponent error={error} />;
    }

    return children;
  }
}

export default ErrorBoundary;
