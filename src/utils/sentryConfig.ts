
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { supabase } from '@/integrations/supabase/client';
import { logger } from './logger';

// Cache for the Sentry DSN
let sentryDsn: string | null = null;

/**
 * Fetches the Sentry DSN from the Supabase Edge Function
 */
export const fetchSentryDsn = async (): Promise<string | null> => {
  try {
    // Try to get from cache first
    if (sentryDsn) return sentryDsn;
    
    // Try to get from localStorage as fallback for offline cases
    const cachedDsn = localStorage.getItem('dutch_sentry_dsn');
    if (cachedDsn) {
      sentryDsn = cachedDsn;
      return cachedDsn;
    }

    // Call the Edge Function with auth header
    const response = await supabase.functions.invoke('get-sentry-dsn', {
      method: 'GET',
      headers: {
        'x-dutch-auth': 'true'
      }
    });

    if (response.error) {
      logger.error('Error fetching Sentry DSN:', response.error);
      return null;
    }

    sentryDsn = response.data?.dsn || null;
    
    // Store in localStorage for offline use
    if (sentryDsn) {
      localStorage.setItem('dutch_sentry_dsn', sentryDsn);
    }
    
    return sentryDsn;
  } catch (error) {
    logger.error('Failed to fetch Sentry DSN:', error);
    return null;
  }
};

/**
 * Initializes Sentry with the fetched DSN and proper configuration
 */
export const initializeSentry = async () => {
  try {
    const dsn = await fetchSentryDsn();
    
    if (!dsn) {
      logger.warn('Sentry initialization skipped: No DSN available');
      return false;
    }

    // Get app version/release from package.json if available
    const appVersion = '1.0.0'; // Placeholder - could be replaced with dynamic version
    const environment = import.meta.env.MODE || 'development';
    
    Sentry.init({
      dsn,
      integrations: [new BrowserTracing()],
      release: `dutch@${appVersion}`,
      environment,
      
      // Performance monitoring
      tracesSampleRate: environment === 'production' ? 0.2 : 1.0,
      
      // Session replay (optional, disabled by default)
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      
      // Enable offline capability - using standard transport config
      transport: undefined, // Use default transport
      
      // Queue options for offline capability
      maxBreadcrumbs: 30,
      beforeSend: (event) => {
        // Custom logic for offline handling if needed
        return event;
      },
      
      // Only enable in non-development environments if needed
      enabled: environment !== 'development' || import.meta.env.VITE_ENABLE_SENTRY === 'true',
      
      // Add useful context
      initialScope: {
        tags: {
          app: 'Dutch',
          mode: localStorage.getItem('clerk_auth_failed') === 'true' ? 'offline' : 'online'
        }
      }
    });
    
    // For development only - notify that Sentry is initialized
    if (environment === 'development') {
      logger.info('🔍 Sentry monitoring initialized successfully');
    }
    
    return true;
  } catch (error) {
    logger.error('Failed to initialize Sentry:', error);
    return false;
  }
};

/**
 * Creates a breadcrumb in Sentry for tracking user actions
 */
export const addBreadcrumb = (
  category: string, 
  message: string, 
  data?: Record<string, any>
) => {
  try {
    Sentry.addBreadcrumb({
      category,
      message,
      data,
      level: 'info'
    });
  } catch (error) {
    logger.error('Failed to add Sentry breadcrumb:', error);
  }
};

/**
 * Custom error boundary component for React rendering errors
 */
export const SentryErrorBoundary = Sentry.ErrorBoundary;
