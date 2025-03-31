
import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<any>;
  pullDistance?: number;
  backgroundColor?: string;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  pullDistance = 80,
  backgroundColor = 'transparent',
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const pullY = useMotionValue(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const isDragging = useRef(false);

  // Transform the pull distance to rotate the refresh icon
  const iconRotation = useTransform(pullY, [0, pullDistance], [0, 360]);
  
  // Transform the pull distance to scale the refresh icon
  const iconScale = useTransform(
    pullY,
    [0, pullDistance * 0.5, pullDistance],
    [0.6, 0.75, 1]
  );
  
  // Transform opacity based on pull distance
  const iconOpacity = useTransform(
    pullY,
    [0, pullDistance * 0.3, pullDistance * 0.5],
    [0, 0.5, 1]
  );

  const handleTouchStart = (e: TouchEvent) => {
    if (containerRef.current && window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      isDragging.current = true;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    // Only allow pulling down when at the top of the page
    if (window.scrollY === 0 && diff > 0) {
      // Resistance factor to make the pull feel more natural
      const resistance = 0.4;
      pullY.set(diff * resistance);
      
      // Prevent normal scrolling behavior
      e.preventDefault();
    }
  };

  const handleTouchEnd = async () => {
    if (!isDragging.current) return;
    
    isDragging.current = false;
    
    // If pulled far enough, trigger refresh
    if (pullY.get() > pullDistance * 0.6) {
      setRefreshing(true);
      
      // Animate to loading state
      await controls.start({
        y: pullDistance * 0.5,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      });
      
      try {
        // Trigger the provided refresh function
        await onRefresh();
      } catch (error) {
        console.error('Error during refresh:', error);
      } finally {
        setRefreshing(false);
        
        // Animate back to initial position
        controls.start({
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        });
        pullY.set(0);
      }
    } else {
      // If not pulled far enough, animate back to initial position
      controls.start({
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
      });
      pullY.set(0);
    }
  };

  useEffect(() => {
    // Add event listeners for touch events
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      // Clean up event listeners
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Refresh indicator */}
      <motion.div
        className="absolute left-0 right-0 flex justify-center pointer-events-none z-10"
        style={{ top: -60 }}
        animate={controls}
      >
        <motion.div 
          className="rounded-full bg-white/50 backdrop-blur-md p-3 shadow-md border border-white/50"
          style={{ 
            rotate: iconRotation,
            scale: iconScale,
            opacity: iconOpacity
          }}
        >
          <RefreshCw className={`w-6 h-6 ${refreshing ? 'text-dutch-blue animate-spin' : 'text-gray-500'}`} />
        </motion.div>
      </motion.div>
      
      {/* Content container */}
      <motion.div
        style={{ y: pullY }}
        animate={controls}
        className="bg-transparent"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;
