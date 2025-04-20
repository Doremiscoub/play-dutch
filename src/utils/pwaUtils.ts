
/**
 * Utility functions related to Progressive Web App functionality
 */

/**
 * Checks if the application is currently running as an installed PWA
 * @returns boolean indicating if app is running in standalone or fullscreen mode
 */
export const isRunningAsPWA = (): boolean => {
  // Check for display-mode: standalone (most browsers)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  
  // Check for display-mode: fullscreen (some PWA implementations)
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return true;
  }
  
  // Check for standalone mode in Safari on iOS
  if ('standalone' in window.navigator && (window.navigator as any).standalone === true) {
    return true;
  }
  
  return false;
};

/**
 * Checks if the application can be installed as a PWA
 * @returns boolean indicating if the browser supports installation
 */
export const isPwaInstallable = (): boolean => {
  return typeof window !== 'undefined' && 
         'BeforeInstallPromptEvent' in window || 
         'onbeforeinstallprompt' in window;
};
