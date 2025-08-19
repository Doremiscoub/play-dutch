import { useEffect } from 'react';

/**
 * Preload 3D components only when idle and on game routes
 */
export const use3DPreloader = (shouldPreload: boolean = false) => {
  useEffect(() => {
    if (!shouldPreload) return;

    const preload3D = () => {
      // Use requestIdleCallback if available, otherwise fallback to setTimeout
      const schedulePreload = (window.requestIdleCallback || window.setTimeout.bind(window));
      
      schedulePreload(() => {
        // Preload 3D modules
        import('@/components/3d/CartoucheScene').catch(console.error);
        import('@/components/3d/CartoucheAvatar').catch(console.error);
      });
    };

    preload3D();
  }, [shouldPreload]);
};