import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAds } from '@/contexts/AdContext';

interface VideoAdOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  trigger?: 'round-added' | 'game-ended';
}

const VideoAdOverlay: React.FC<VideoAdOverlayProps> = ({ 
  isVisible, 
  onClose, 
  trigger = 'round-added' 
}) => {
  const { shouldShowAds } = useAds();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isVisible && shouldShowAds) {
      setIsLoading(true);
      setError(false);
      setCountdown(5);
      setCanSkip(false);
      
      // Simuler le chargement de la pub
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
      // Timer pour permettre le skip après 5 secondes
      const skipTimer = setTimeout(() => {
        setCanSkip(true);
      }, 5000);
      
      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(loadingTimer);
        clearTimeout(skipTimer);
        clearInterval(countdownInterval);
      };
    }
  }, [isVisible, shouldShowAds]);

  const handleClose = () => {
    if (canSkip || error) {
      onClose();
    }
  };

  const handleRetry = () => {
    setError(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  if (!shouldShowAds || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[99999]"
            onClick={handleClose}
          />
          
          {/* Video Ad Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center z-[999999] p-4"
          >
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Header avec contrôles */}
              <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/70 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-md">
                      <span className="text-white text-sm font-medium">Publicité</span>
                    </div>
                    {!canSkip && countdown > 0 && (
                      <div className="px-3 py-1 bg-primary/20 rounded-full backdrop-blur-md">
                        <span className="text-white text-sm font-medium">
                          Skip dans {countdown}s
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? 
                        <VolumeX className="h-5 w-5" /> : 
                        <Volume2 className="h-5 w-5" />
                      }
                    </Button>
                    
                    {canSkip && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="text-white hover:bg-white/20"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Contenu principal */}
              <div className="w-full h-full flex items-center justify-center">
                {isLoading ? (
                  /* État de chargement */
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg">Chargement de la publicité...</p>
                  </div>
                ) : error ? (
                  /* État d'erreur */
                  <div className="text-center">
                    <div className="text-red-400 mb-4">
                      <X className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-lg">Erreur de chargement</p>
                    </div>
                    <Button onClick={handleRetry} variant="outline" className="text-white border-white/30">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Réessayer
                    </Button>
                  </div>
                ) : (
                  /* Placeholder pour la vraie publicité vidéo */
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center text-white">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🎮</div>
                      <h3 className="text-2xl font-bold mb-2">Publicité Vidéo</h3>
                      <p className="text-lg opacity-80 mb-4">
                        {trigger === 'round-added' 
                          ? 'Manche ajoutée avec succès !' 
                          : 'Partie terminée !'}
                      </p>
                      <div className="text-sm opacity-60">
                        Ici s'afficherait une vraie publicité vidéo AdSense
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bouton Skip en bas à droite */}
              {canSkip && !isLoading && !error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-4 right-4"
                >
                  <Button
                    onClick={handleClose}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    Passer la publicité
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VideoAdOverlay;