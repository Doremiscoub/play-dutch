import React, { useEffect, Suspense } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const sendToAnalytics = (metric: WebVitalsMetric) => {
  // Envoi des métriques à votre service d'analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.rating,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
};

export const CoreWebVitalsOptimizer: React.FC = () => {
  useEffect(() => {
    // Mesure des Core Web Vitals
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);

    // Optimisation du CLS (Cumulative Layout Shift)
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Éviter les shifts layout inattendus
        const target = entry.target as HTMLElement;
        if (target.tagName === 'IMG' && !target.style.aspectRatio) {
          target.style.aspectRatio = '16/9';
        }
      }
    });

    // Observer tous les éléments d'image
    document.querySelectorAll('img').forEach(img => {
      resizeObserver.observe(img);
    });

    // Préchargement des ressources critiques
    const criticalResources = [
      '/favicon.ico',
      '/manifest.json'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.includes('.ico') ? 'image' : 'fetch';
      document.head.appendChild(link);
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return null;
};

// Composant de fallback pour le Suspense
export const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// HOC pour optimiser les performances des composants
export const withPerformanceOptimization = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return React.memo((props: P) => (
    <Suspense fallback={<LoadingFallback />}>
      <Component {...props} />
    </Suspense>
  ));
};