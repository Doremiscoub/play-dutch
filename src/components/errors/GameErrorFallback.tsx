import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const GameErrorFallback: React.FC<GameErrorFallbackProps> = ({
  error,
  resetErrorBoundary
}) => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8 max-w-md w-full text-center space-y-6">
        <div className="text-red-500">
          <AlertTriangle className="h-16 w-16 mx-auto" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Oups ! Une erreur est survenue</h2>
          <p className="text-gray-600">
            Le tableau de scores a rencontré un problème. Vous pouvez réessayer ou retourner à l'accueil.
          </p>
        </div>

        {import.meta.env.MODE === 'development' && (
          <details className="text-left bg-gray-100 rounded-lg p-4 text-sm">
            <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
              Détails de l'erreur (développement)
            </summary>
            <pre className="whitespace-pre-wrap text-red-600 text-xs">
              {error.message}
              {'\n'}
              {error.stack}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={resetErrorBoundary}
            variant="outline"
            className="flex-1"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
          <Button
            onClick={handleGoHome}
            className="flex-1"
          >
            <Home className="h-4 w-4 mr-2" />
            Accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameErrorFallback;
