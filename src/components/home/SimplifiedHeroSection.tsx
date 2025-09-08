import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdaptiveInterface } from '@/components/ui/adaptive-layout';

const SimplifiedHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile } = useAdaptiveInterface();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-4 sm:py-8 bg-gradient-to-br from-trinity-blue-100 via-trinity-purple-50 to-trinity-orange-100">
      
      {/* Contenu principal centré */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 px-2 sm:px-4">
        
        {/* Logo principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <img 
            src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
            alt="Dutch - Professeur Cartouche"
            className="w-auto h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] mx-auto object-contain"
          />
        </motion.div>

        {/* Badge Application Compagnon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 text-trinity-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm border-2 border-trinity-blue-200 backdrop-blur-sm w-full sm:w-auto max-w-xs sm:max-w-none justify-center">
            📱 Application Compagnon
          </div>
        </motion.div>

        {/* Message principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight px-2">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-500 bg-clip-text text-transparent blur-sm opacity-30" 
                 aria-hidden="true">
              Sortez vos cartes, on s'occupe des scores !
            </div>
            
            {/* Main text with gradient */}
            <span className="relative bg-gradient-to-r from-trinity-blue-700 via-trinity-purple-700 to-trinity-orange-600 bg-clip-text text-transparent drop-shadow-lg">
              Sortez vos cartes, 
              <span className="inline-block transform hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-trinity-orange-500 to-trinity-orange-600 bg-clip-text">
                on
              </span>
              <br className="sm:hidden"/>
              <span className="inline-block transform hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-trinity-orange-500 to-trinity-orange-600 bg-clip-text">
                s'occupe des scores !
              </span>
            </span>
            
            {/* Decorative sparkle effects */}
            <div className="absolute -top-2 left-1/4 w-2 h-2 bg-trinity-orange-400 rounded-full animate-pulse opacity-60" aria-hidden="true"></div>
            <div className="absolute -bottom-1 right-1/3 w-1.5 h-1.5 bg-trinity-blue-400 rounded-full animate-pulse delay-700 opacity-60" aria-hidden="true"></div>
            <div className="absolute top-1/2 -right-2 w-1 h-1 bg-trinity-purple-400 rounded-full animate-pulse delay-1000 opacity-60" aria-hidden="true"></div>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium max-w-full sm:max-w-2xl mx-auto leading-relaxed px-2">
            🃏 Votre smartphone devient votre carnet de scores intelligent
          </p>
        </motion.div>

        {/* CTA Principal unique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="pt-2 sm:pt-4 w-full flex justify-center"
        >
          <Button
            onClick={() => navigate('/setup')}
            size="xl"
            className="bg-gradient-to-r from-trinity-blue-600 to-trinity-purple-600 hover:from-trinity-blue-700 hover:to-trinity-purple-700 text-white font-black px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-200 hover:scale-105 border-4 border-white/30 w-full max-w-xs sm:max-w-sm md:max-w-none md:w-auto text-lg sm:text-xl md:text-2xl"
          >
            {isMobile ? 'JOUER' : '🎮 JOUER 🎯'}
          </Button>
        </motion.div>

        {/* Stats simples en bas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 pt-6 sm:pt-8 w-full px-2"
        >
          <div className="flex items-center gap-2 bg-white/90 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-md border border-trinity-orange-200 backdrop-blur-sm w-full sm:w-auto max-w-xs sm:max-w-none justify-center">
            <Star className="h-4 sm:h-5 w-4 sm:w-5 text-trinity-orange-500 flex-shrink-0" />
            <span className="text-gray-800 font-semibold text-sm sm:text-base">2,500+ joueurs</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white/90 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-md border border-trinity-blue-200 backdrop-blur-sm w-full sm:w-auto max-w-xs sm:max-w-none justify-center">
            <Zap className="h-4 sm:h-5 w-4 sm:w-5 text-trinity-blue-500 flex-shrink-0" />
            <span className="text-gray-800 font-semibold text-sm sm:text-base">100% gratuit</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SimplifiedHeroSection;