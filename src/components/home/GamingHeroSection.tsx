import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdaptiveInterface } from '@/components/ui/adaptive-layout';


const GamingHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile } = useAdaptiveInterface();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      
      {/* Éléments gaming stylisés (réduits) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cartes stylisées (réduites) */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`card-${i}`}
            className="absolute w-16 h-22 bg-gradient-to-br from-white/80 to-white/60 rounded-lg border-2 border-white/40 shadow-lg backdrop-blur-sm"
            style={{
              left: `${20 + i * 60}%`,
              top: `${20 + i * 15}%`,
              rotate: `${-15 + i * 30}deg`
            }}
            animate={{
              y: [-6, 6, -6],
              rotate: [-3, 3, -3],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-trinity-purple-600 text-xl font-black">
              {['♠', '♥'][i]}
            </div>
          </motion.div>
        ))}
        
        {/* Jeton vibrant (réduit) */}
        <motion.div
          className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-trinity-orange-400 to-trinity-orange-600 border-3 border-white/60 shadow-xl"
          style={{
            right: '15%',
            top: '35%',
          }}
          animate={{
            y: [-8, 8, -8],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-white font-black text-xs">
            100
          </div>
        </motion.div>
      </div>

      {/* Contenu principal - logo remonté */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 px-4 flex flex-col items-center justify-center">
        {/* Logo avec effet néon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Effet néon autour du logo */}
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full blur-3xl scale-125"
            animate={{
              scale: [1.1, 1.4, 1.1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative">
            <img 
              src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
              alt="Dutch Card Game - Professeur Cartouche"
              className="w-auto h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] mx-auto object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Titre supprimé pour design épuré avec logo uniquement */}
        
        {/* Badge Application Compagnon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 text-white px-6 py-3 rounded-full font-black text-sm shadow-lg border-2 border-white/40">
            📱 Application Compagnon
          </div>
        </motion.div>

        {/* Sous-titre descriptif */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-black max-w-4xl mx-auto leading-relaxed">
            <span 
              className="text-white"
              style={{
                textShadow: '0 0 20px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.5)'
              }}
            >
              Sortez vos cartes,{' '}
            </span>
            <span 
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent font-black"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
              }}
            >
              on s'occupe des scores !
            </span>
          </p>
          
          <p 
            className="text-lg sm:text-xl text-white/90 font-bold max-w-3xl mx-auto"
            style={{
              textShadow: '0 0 10px rgba(0,0,0,0.8)'
            }}
          >
            🃏 Votre smartphone devient votre carnet de scores intelligent
          </p>
        </motion.div>

        {/* CTA MEGA visible */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-6"
        >
          {/* Bouton principal ULTRA visible */}
          <motion.div
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            {/* Effet glow simplifié */}
            <motion.div
              className="absolute -inset-3 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 rounded-2xl blur-xl opacity-60"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <Button
              onClick={() => navigate('/setup')}
              size="xl"
              className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 hover:from-orange-500 hover:via-purple-500 hover:to-blue-600 text-white font-black text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 shadow-2xl border-4 border-white rounded-2xl transition-all duration-300 hover:scale-105 w-auto max-w-full"
            >
              <motion.div
                className="flex items-center justify-center gap-2 sm:gap-4 text-center whitespace-nowrap overflow-hidden"
                whileHover={{ x: 5 }}
              >
                <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 group-hover:animate-bounce flex-shrink-0" />
                <span className="whitespace-nowrap">{isMobile ? 'JOUER' : '🚀 JOUER ! 🎯'}</span>
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform flex-shrink-0" />
              </motion.div>
            </Button>
          </motion.div>
          
          {/* Stats gaming compactes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center items-center gap-8 flex-wrap"
          >
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-xl rounded-full px-8 py-4 border-3 border-trinity-orange-300 shadow-lg">
              <Star className="h-6 w-6 text-trinity-orange-600" />
              <span className="text-neutral-800 font-black text-lg">2,500+ joueurs</span>
            </div>
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-xl rounded-full px-8 py-4 border-3 border-trinity-purple-300 shadow-lg">
              <Zap className="h-6 w-6 text-trinity-purple-600" />
              <span className="text-neutral-800 font-black text-lg">100% gratuit</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default GamingHeroSection;