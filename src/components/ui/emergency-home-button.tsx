
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

const EmergencyHomeButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ne pas afficher sur la page d'accueil
  if (location.pathname === '/') {
    return null;
  }

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={handleGoHome}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-md border-dutch-blue/30 hover:border-dutch-blue/50 text-dutch-blue hover:text-dutch-blue shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Retour à l'accueil"
      >
        <Home className="h-4 w-4 mr-2" />
        Accueil
      </Button>
    </motion.div>
  );
};

export default EmergencyHomeButton;
