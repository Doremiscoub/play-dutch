import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSimpleGameState } from '@/hooks/useSimpleGameState';
import { toast } from 'sonner';

interface ProtectedGameRouteProps {
  children: React.ReactNode;
  requiresGame?: boolean;
}

export const ProtectedGameRoute: React.FC<ProtectedGameRouteProps> = ({ 
  children, 
  requiresGame = true 
}) => {
  const { hasGame, players } = useSimpleGameState();
  
  if (requiresGame && (!hasGame || players.length === 0)) {
    toast.info('Veuillez d\'abord créer une partie');
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedGameRoute;