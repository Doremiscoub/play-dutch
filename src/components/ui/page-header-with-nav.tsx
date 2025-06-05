
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageHeaderWithNavProps {
  title: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  backLabel?: string;
  onBack?: () => void;
  className?: string;
}

const PageHeaderWithNav: React.FC<PageHeaderWithNavProps> = ({
  title,
  showBackButton = true,
  showHomeButton = true,
  backLabel = "Retour",
  onBack,
  className = ""
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="bg-white/70 backdrop-blur-md border-white/50 hover:bg-white/90 text-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backLabel}
              </Button>
            </motion.div>
          )}
          
          {showHomeButton && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGoHome}
                className="bg-white/70 backdrop-blur-md border-dutch-blue-500/30 hover:border-dutch-blue-500/50 text-dutch-blue-500 hover:text-dutch-blue-600"
              >
                <Home className="h-4 w-4 mr-2" />
                Accueil
              </Button>
            </motion.div>
          )}
        </div>
      </div>
      
      <motion.h1 
        className="text-3xl font-bold text-center bg-gradient-to-r from-dutch-blue-500 via-dutch-purple-500 to-dutch-orange-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {title}
      </motion.h1>
    </div>
  );
};

export default PageHeaderWithNav;
