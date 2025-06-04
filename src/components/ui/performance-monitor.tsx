
import React, { useEffect } from 'react';

interface PerformanceMonitorProps {
  enableAnalytics?: boolean;
  logPerformance?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enableAnalytics = false,
  logPerformance = false
}) => {
  useEffect(() => {
    // Surveiller les Core Web Vitals
    const measureWebVitals = () => {
      if ('web-vital' in window) return;

      // Largest Contentful Paint (LCP)
      const observeLCP = () => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          if (logPerformance) {
            console.log('LCP:', lastEntry.startTime);
          }
          
          // Analyser la performance
          if (lastEntry.startTime > 2500) {
            console.warn('LCP is poor (>2.5s):', lastEntry.startTime);
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      };

      // First Input Delay (FID) via PerformanceEventTiming
      const observeFID = () => {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Cast to PerformanceEventTiming to access specific properties
            const eventEntry = entry as PerformanceEventTiming;
            if (entry.name === 'first-input' && eventEntry.processingStart) {
              const fid = eventEntry.processingStart - entry.startTime;
              
              if (logPerformance) {
                console.log('FID:', fid);
              }
              
              if (fid > 100) {
                console.warn('FID is poor (>100ms):', fid);
              }
            }
          });
        });
        
        observer.observe({ entryTypes: ['event'] });
      };

      // Cumulative Layout Shift (CLS)
      const observeCLS = () => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Cast to LayoutShift to access specific properties
            const layoutShiftEntry = entry as LayoutShift;
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
              
              if (logPerformance) {
                console.log('CLS:', clsValue);
              }
              
              if (clsValue > 0.1) {
                console.warn('CLS is poor (>0.1):', clsValue);
              }
            }
          });
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
      };

      // Lancer les observations
      if ('PerformanceObserver' in window) {
        observeLCP();
        observeFID();
        observeCLS();
      }

      // Marquer comme initialisé
      (window as any)['web-vital'] = true;
    };

    // Surveiller les ressources
    const monitorResources = () => {
      if (logPerformance) {
        const resources = performance.getEntriesByType('resource');
        const slowResources = resources.filter((resource: any) => resource.duration > 1000);
        
        if (slowResources.length > 0) {
          console.warn('Slow resources detected:', slowResources);
        }
      }
    };

    // Détecter les problèmes de performance
    const detectPerformanceIssues = () => {
      // Vérifier si le device est lent
      const connection = (navigator as any).connection;
      if (connection && connection.effectiveType === 'slow-2g') {
        console.warn('Slow connection detected');
        document.documentElement.classList.add('slow-connection');
      }

      // Vérifier la mémoire disponible
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMemoryMB = memory.usedJSHeapSize / 1048576;
        
        if (usedMemoryMB > 50) {
          console.warn('High memory usage detected:', usedMemoryMB + 'MB');
        }
      }
    };

    // Initialiser après le chargement
    if (document.readyState === 'complete') {
      measureWebVitals();
      monitorResources();
      detectPerformanceIssues();
    } else {
      window.addEventListener('load', () => {
        measureWebVitals();
        monitorResources();
        detectPerformanceIssues();
      });
    }

    // Nettoyer au démontage
    return () => {
      document.documentElement.classList.remove('slow-connection');
    };
  }, [enableAnalytics, logPerformance]);

  return null; // Composant invisible
};

// Utility function pour précharger les ressources critiques
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/fonts/inter.woff2',
    '/images/hero-bg.webp'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    if (resource.includes('.woff')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (resource.includes('.webp') || resource.includes('.jpg')) {
      link.as = 'image';
    }
    
    document.head.appendChild(link);
  });
};

// Type definitions for Web APIs
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}
