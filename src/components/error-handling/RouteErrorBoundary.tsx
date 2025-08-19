import React from 'react';
import GlobalErrorBoundary from './GlobalErrorBoundary';

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  routeName?: string;
}

export const RouteErrorBoundary: React.FC<RouteErrorBoundaryProps> = ({
  children,
  routeName = 'unknown'
}) => {
  return (
    <GlobalErrorBoundary level="route">
      {children}
    </GlobalErrorBoundary>
  );
};

export default RouteErrorBoundary;