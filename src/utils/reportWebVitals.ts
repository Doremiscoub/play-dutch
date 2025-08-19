import { onCLS, onINP, onLCP, onTTFB } from 'web-vitals';
import { supabase } from '@/integrations/supabase/client';

interface WebVitalMetric {
  id: string;
  name: string;
  value: number;
  delta: number;
  entries: any[];
}

const reportWebVitals = (metric: WebVitalMetric) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('Web Vital:', metric);
    return;
  }

  // Send to Supabase in production
  if (import.meta.env.PROD) {
    supabase
      .from('web_vitals')
      .insert({
        t: metric.id,
        name: metric.name,
        value: metric.value,
        delta: metric.delta,
        user_id: null // Will be populated by RLS if user is authenticated
      })
      .then(({ error }) => {
        if (error) {
          console.error('Failed to report web vital:', error);
        }
      });
  }
};

// Initialize web vitals monitoring
export const initWebVitals = () => {
  onCLS(reportWebVitals);
  onINP(reportWebVitals);
  onLCP(reportWebVitals);
  onTTFB(reportWebVitals);
};

export default reportWebVitals;