
/**
 * Hook pour la gestion centralisée des erreurs
 * Permet de capturer, enregistrer et afficher les erreurs de manière cohérente
 */
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import * as Sentry from '@sentry/react';
import { addBreadcrumb } from '../utils/sentryConfig';
import { useNavigate } from 'react-router-dom';
import { logger } from '../utils/logger';

export interface ErrorOptions {
  notify: boolean;       // Afficher un toast
  log: boolean;          // Logger dans la console
  report: boolean;       // Envoyer à Sentry
  critical: boolean;     // Erreur critique qui nécessite une action
  redirect?: string;     // Rediriger vers une route en cas d'erreur
  context?: Record<string, any>; // Données contextuelles supplémentaires
}

const defaultOptions: ErrorOptions = {
  notify: true,
  log: true,
  report: true,
  critical: false
};

export function useErrorHandler() {
  const [lastError, setLastError] = useState<Error | null>(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  
  /**
   * Gestionnaire d'erreurs centralisé
   */
  const handleError = useCallback((
    error: Error | string,
    message?: string,
    options: Partial<ErrorOptions> = {}
  ) => {
    const opts = { ...defaultOptions, ...options };
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    const displayMessage = message || errorObj.message;
    
    // Mettre à jour l'état
    setLastError(errorObj);
    setIsError(true);
    
    // Journalisation
    if (opts.log) {
      logger.error('Dutch Error:', displayMessage, errorObj);
      if (opts.context) {
        logger.error('Contexte:', opts.context);
      }
    }
    
    // Notification
    if (opts.notify) {
      toast.error(displayMessage, {
        duration: opts.critical ? 8000 : 4000,
        action: opts.critical ? {
          label: 'Réessayer',
          onClick: () => window.location.reload()
        } : undefined
      });
    }
    
    // Redirection en cas d'erreur critique
    if (opts.redirect) {
      navigate(opts.redirect);
    }
    
    // Reporting
    if (opts.report) {
      try {
        addBreadcrumb(
          'error',
          displayMessage,
          opts.context || {}
        );
        
        Sentry.captureException(errorObj, {
          extra: {
            message: displayMessage,
            ...opts.context
          }
        });
      } catch (reportingError) {
        logger.error('Erreur lors du signalement de l\'erreur:', reportingError);
      }
    }
    
    return errorObj;
  }, [navigate]);
  
  /**
   * Réinitialise l'état d'erreur
   */
  const clearError = useCallback(() => {
    setLastError(null);
    setIsError(false);
  }, []);
  
  /**
   * Wrapper pour try/catch avec gestion d'erreur automatique
   */
  const tryCatch = useCallback(async <T,>(
    fn: () => Promise<T> | T,
    errorMessage?: string,
    options?: Partial<ErrorOptions>
  ): Promise<T | null> => {
    try {
      return await fn();
    } catch (error) {
      handleError(error as Error, errorMessage, options);
      return null;
    }
  }, [handleError]);
  
  return {
    handleError,
    clearError,
    tryCatch,
    lastError,
    isError
  };
}
