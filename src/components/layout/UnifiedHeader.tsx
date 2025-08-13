import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, BookOpen, Clock, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GameSettings from '@/components/GameSettings';
import { ModernTitle } from '@/components/ui/modern-title';
import { useAdaptiveInterface } from '@/components/ui/adaptive-layout';

interface UnifiedHeaderProps {
  title: string;
  roundCount?: number;
  scoreLimit?: number;
  showBackButton?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  showRulesButton?: boolean;
  variant?: 'default' | 'game' | 'simple';
  hideTitle?: boolean;
  gameStartTime?: Date;
}

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  title,
  roundCount = 0,
  scoreLimit = 100,
  showBackButton = false,
  onBack,
  showSettings = true,
  showRulesButton = true,
  variant = 'default',
  hideTitle = false,
  gameStartTime
}) => {
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState<string>('00:00');
  const { 
    isMobile, 
    isTablet, 
    orientation, 
    getAdaptiveSpacing, 
    getAdaptiveTextSize, 
    getAdaptiveButtonSize 
  } = useAdaptiveInterface();

  // Chronomètre
  useEffect(() => {
    if (!gameStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - gameStartTime.getTime()) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      setElapsedTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStartTime]);
  // Classes adaptatives améliorées
  const headerClasses = `relative z-10 w-full ${
    isMobile && orientation === 'landscape' ? 'py-1' : isMobile ? 'py-2' : 'py-6'
  }`;
  const titleSize = isMobile 
    ? (orientation === 'landscape' ? 'text-xs' : 'text-sm') 
    : 'text-2xl lg:text-3xl';
  
  // Helper pour adapter les textes sur mobile
  const getMobileAdaptedText = (fullText: string, shortText: string) => {
    return isMobile ? shortText : fullText;
  };
  return (
    <motion.header 
      data-testid="unified-header"
      className={headerClasses}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.23, 1, 0.32, 1],
        delay: 0.1
      }}
    >
      <div className="max-w-7xl mx-auto">
        {!hideTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            <div className="relative">
              {/* Fond avec glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-trinity-blue-500/20 via-trinity-purple-500/20 to-trinity-orange-500/20 rounded-2xl blur-xl"></div>
              
                {/* Conteneur unifié pour tout le header */}
                <div className={`relative bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl ${
                  isMobile ? 'px-2 py-2 space-y-1' : 'px-6 py-4 space-y-3'
                }`}>
                {/* Ligne principale avec boutons et titre */}
                <div className="relative flex items-center justify-between min-h-[44px] w-full">
                  {/* Left side - Back button */}
                  <div className={`flex items-center ${isMobile ? 'gap-1' : 'gap-4'} flex-shrink-0`}>
                    {showBackButton && onBack && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Button
                          variant="liquidHeader"
                          size={isMobile ? "sm" : "icon"}
                          onClick={onBack}
                          className={`rounded-xl flex-shrink-0 ${
                            isMobile ? 'h-8 w-8 min-w-[32px] p-1' : 'h-10 w-10'
                          }`}
                          aria-label="Retour"
                        >
                          <ArrowLeft className={`${isMobile ? 'h-3 w-3' : 'h-5 w-5'}`} />
                        </Button>
                      </motion.div>
                    )}
                  </div>

                  {/* Center - Title */}
                  <div className="flex-1 flex justify-center mx-2 overflow-hidden">
                    <motion.h1 
                      className={`${titleSize} font-black text-gray-900 flex items-center justify-center ${
                        isMobile ? 'gap-0.5' : 'gap-2 sm:gap-4'
                      } hover-scale text-center leading-tight break-words hyphens-auto`}
                      whileHover={{ 
                        scale: 1.05,
                        rotate: [-1, 1, -1, 0],
                      }}
                      transition={{ 
                        duration: 0.3,
                        rotate: { duration: 0.5, ease: "easeInOut" }
                      }}
                    >
                      {!isMobile && (
                        <motion.span 
                          className="text-xl"
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1] 
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          🎯
                        </motion.span>
                      )}
                      <motion.span 
                        className="bg-gradient-to-r from-trinity-blue-700 via-trinity-purple-700 to-trinity-orange-700 bg-clip-text text-transparent font-extrabold text-shadow-lg story-link leading-tight break-words hyphens-auto"
                        whileHover={{
                          backgroundPosition: "200% center"
                        }}
                        style={{
                          backgroundSize: "200% 200%"
                        }}
                      >
                        {variant === 'game' 
                          ? getMobileAdaptedText('Partie en cours', 'Partie')
                          : getMobileAdaptedText(title, 
                              title === 'Configuration de partie' ? 'Configuration' :
                              title === 'Historique des parties' ? 'Historique' :
                              title === 'Règles du jeu' ? 'Règles' :
                              title === 'Dutch - Carnet de scores' ? 'Dutch' :
                              title.length > 12 ? title.substring(0, 12) : title
                            )
                        }
                      </motion.span>
                      {!isMobile && (
                        <motion.span 
                          className="text-xl"
                          animate={{ 
                            rotate: [0, -10, 10, 0],
                            scale: [1, 1.1, 1] 
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                          }}
                        >
                          🎯
                        </motion.span>
                      )}
                    </motion.h1>
                  </div>

                  {/* Right side - Rules button and Settings */}
                  <div className={`flex items-center ${isMobile ? 'gap-0.5' : 'gap-2 sm:gap-3'} flex-shrink-0 justify-end`}>
                    {/* Bouton Règles */}
                    {showRulesButton && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Button
                          variant="liquidHeader"
                          size={isMobile ? "sm" : "sm"}
                          onClick={() => navigate('/rules')}
                          className={`flex items-center rounded-xl bg-gradient-to-r from-trinity-purple-100/90 to-trinity-blue-100/90 backdrop-blur-xl border border-trinity-purple-200/60 hover:from-trinity-purple-200/90 hover:to-trinity-blue-200/90 transition-all duration-300 ${
                            isMobile ? 'p-0.5 h-6 w-6 min-w-[24px]' : 'gap-2 px-3 py-1.5'
                          }`}
                          aria-label="Consulter les règles"
                        >
                          <BookOpen className={`${isMobile ? 'h-2.5 w-2.5' : 'h-4 w-4'} text-trinity-purple-600`} />
                          {!isMobile && <span className="text-trinity-purple-700 font-semibold">Règles</span>}
                        </Button>
                      </motion.div>
                    )}
                    
                    {/* Bouton Settings */}
                    {showSettings && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <GameSettings />
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Pastilles d'information pour la partie */}
                {variant === 'game' && (
                  <motion.div 
                    className={`flex flex-wrap justify-center items-center ${
                      isMobile ? 'gap-0.5 pt-0.5' : 'gap-2 sm:gap-3 pt-1'
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {/* Numéro de manche */}
                    <motion.div 
                      className={`flex items-center ${isMobile ? 'gap-0.5 px-1.5 py-0.5' : 'gap-2 px-3 py-2'} bg-gradient-to-r from-trinity-blue-100/90 to-trinity-blue-50/90 backdrop-blur-xl rounded-xl border border-trinity-blue-200/60 shadow-lg`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Zap className={`${isMobile ? 'h-2.5 w-2.5' : 'h-4 w-4'} text-trinity-blue-600`} />
                      <span className={`${isMobile ? 'text-[10px]' : 'text-sm'} font-bold text-trinity-blue-700`}>
                        {getMobileAdaptedText(`Manche ${roundCount || 1}`, `M${roundCount || 1}`)}
                      </span>
                    </motion.div>

                    {/* Limite de points */}
                    <motion.div 
                      className={`flex items-center ${isMobile ? 'gap-0.5 px-1.5 py-0.5' : 'gap-2 px-3 py-2'} bg-gradient-to-r from-trinity-purple-100/90 to-trinity-purple-50/90 backdrop-blur-xl rounded-xl border border-trinity-purple-200/60 shadow-lg`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Target className={`${isMobile ? 'h-2.5 w-2.5' : 'h-4 w-4'} text-trinity-purple-600`} />
                      <span className={`${isMobile ? 'text-[10px]' : 'text-sm'} font-bold text-trinity-purple-700`}>
                        {getMobileAdaptedText(`Objectif ${scoreLimit} pts`, `${scoreLimit}pts`)}
                      </span>
                    </motion.div>

                    {/* Chronomètre */}
                    {gameStartTime && (
                      <motion.div 
                        className={`flex items-center ${isMobile ? 'gap-0.5 px-1.5 py-0.5' : 'gap-2 px-3 py-2'} bg-gradient-to-r from-trinity-orange-100/90 to-trinity-orange-50/90 backdrop-blur-xl rounded-xl border border-trinity-orange-200/60 shadow-lg`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        animate={{ 
                          boxShadow: [
                            "0 4px 6px rgba(0, 0, 0, 0.1)",
                            "0 4px 20px rgba(251, 146, 60, 0.3)",
                            "0 4px 6px rgba(0, 0, 0, 0.1)"
                          ]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          scale: { type: "spring", stiffness: 300 }
                        }}
                      >
                        <Clock className={`${isMobile ? 'h-2.5 w-2.5' : 'h-4 w-4'} text-trinity-orange-600`} />
                        <span className={`${isMobile ? 'text-[10px]' : 'text-sm'} font-bold text-trinity-orange-700 font-mono`}>
                          {elapsedTime}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default UnifiedHeader;