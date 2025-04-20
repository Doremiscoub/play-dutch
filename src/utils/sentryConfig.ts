
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { supabase } from '@/integrations/supabase/client';

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
      console.error('Error fetching Sentry DSN:', response.error);
      return null;
    }

    sentryDsn = response.data?.dsn || null;
    
    // Store in localStorage for offline use
    if (sentryDsn) {
      localStorage.setItem('dutch_sentry_dsn', sentryDsn);
    }
    
    return sentryDsn;
  } catch (error) {
    console.error('Failed to fetch Sentry DSN:', error);
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
      console.warn('Sentry initialization skipped: No DSN available');
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
      
      // Enable offline capability
      transport: Sentry.makeBrowserTransport({
        // Maximum number of events to queue
        maxQueueSize: 30,
        
        // Flush events when online
        flushAtStartup: true,
        
        // Attempt to send events when connection is restored
        sendClientReports: true
      }),
      
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
      console.info('🔍 Sentry monitoring initialized successfully');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to initialize Sentry:', error);
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
    console.error('Failed to add Sentry breadcrumb:', error);
  }
};

/**
 * Custom error boundary component for React rendering errors
 */
export const SentryErrorBoundary = Sentry.ErrorBoundary;
