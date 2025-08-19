import React, { lazy, Suspense } from 'react';
import LoadingSpinner from '@/components/game/LoadingSpinner';

// Dynamically import 3D components only when needed
const CartoucheScene = lazy(() => import('./CartoucheScene'));

interface CartoucheLoaderProps {
  className?: string;
  autoRotate?: boolean;
  enableZoom?: boolean;
  fallbackImage?: string;
}

export const CartoucheLoader: React.FC<CartoucheLoaderProps> = (props) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CartoucheScene {...props} />
    </Suspense>
  );
};

export default CartoucheLoader;