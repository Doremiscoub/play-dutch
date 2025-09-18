import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Wifi, WifiOff, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  isOnline: boolean;
  connectionType: string;
  renderTime: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    isOnline: navigator.onLine,
    connectionType: 'unknown',
    renderTime: 0
  });
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrame: number;

    const updateMetrics = () => {
      const currentTime = performance.now();
      frameCount++;

      // Calculer les FPS toutes les secondes
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memory: (performance as any).memory ? 
            Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 0,
          renderTime: currentTime - lastTime,
          isOnline: navigator.onLine,
          connectionType: (navigator as any).connection?.effectiveType || 'unknown'
        }));

        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrame = requestAnimationFrame(updateMetrics);
    };

    // Commencer le monitoring seulement en dev mode
    if (process.env.NODE_ENV === 'development') {
      updateMetrics();
    }

    // Écouter les changements de connexion
    const handleOnline = () => setMetrics(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setMetrics(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Raccourci clavier pour afficher/masquer le monitor (Ctrl+Shift+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getPerformanceColor = (fps: number) => {
    if (fps >= 50) return 'text-green-500';
    if (fps >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConnectionIcon = () => {
    if (!metrics.isOnline) return <WifiOff className="w-4 h-4 text-red-500" />;
    return <Wifi className="w-4 h-4 text-green-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 right-4 z-[9999]"
    >
      <Card className="glass-morphism border-white/20 backdrop-blur-md w-64">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Performance</span>
            </div>
            <Badge 
              variant="outline" 
              className="text-xs"
              onClick={() => setIsVisible(false)}
            >
              DEV
            </Badge>
          </div>

          <div className="space-y-2 text-xs">
            {/* FPS */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">FPS:</span>
              <span className={cn('font-mono', getPerformanceColor(metrics.fps))}>
                {metrics.fps}
              </span>
            </div>

            {/* Mémoire */}
            {metrics.memory > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Mémoire:</span>
                <span className="font-mono">
                  {metrics.memory} MB
                </span>
              </div>
            )}

            {/* Connexion */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Réseau:</span>
              <div className="flex items-center gap-1">
                {getConnectionIcon()}
                <span className="font-mono text-xs">
                  {metrics.connectionType}
                </span>
              </div>
            </div>

            {/* Temps de rendu */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Rendu:</span>
              <span className="font-mono">
                {Math.round(metrics.renderTime)}ms
              </span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-white/10">
            <p className="text-xs text-muted-foreground text-center">
              Ctrl+Shift+P pour masquer
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PerformanceMonitor;