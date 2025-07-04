import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './button';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class SimpleErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 SimpleErrorBoundary: Erreur capturée:', error, errorInfo);
  }

  private handleRetry = () => {
    console.log('🔄 SimpleErrorBoundary: Tentative de récupération');
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8 max-w-md w-full text-center space-y-6">
            <div className="text-red-500">
              <AlertTriangle className="h-16 w-16 mx-auto" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Erreur détectée</h2>
              <p className="text-gray-600">
                {this.props.fallbackMessage || 'Un problème est survenu dans cette section.'}
              </p>
            </div>

            <Button onClick={this.handleRetry} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SimpleErrorBoundary;