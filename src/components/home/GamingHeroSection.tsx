import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GamingHeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background Trinity coloré optimisé */}
      <div className="absolute inset-0 bg-gradient-to-br from-trinity-blue-500 via-trinity-purple-500 to-trinity-orange-500">
        {/* Overlay pour profondeur */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Éléments gaming simplifiés et colorés */}
        <div className="absolute inset-0">
          {/* Cartes stylisées */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`card-${i}`}
              className="absolute w-20 h-28 bg-gradient-to-br from-white to-neutral-100 rounded-xl border-4 border-trinity-orange-300 shadow-2xl"
              style={{
                left: `${15 + i * 25}%`,
                top: `${25 + i * 20}%`,
                rotate: `${-20 + i * 15}deg`
              }}
              animate={{
                y: [-8, 8, -8],
                rotate: [-5, 5, -5],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 4 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-trinity-purple-600 text-3xl font-black">
                {['♠', '♥', '♦'][i]}
              </div>
            </motion.div>
          ))}
          
          {/* Jetons vibrants */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`chip-${i}`}
              className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-trinity-orange-400 to-trinity-orange-600 border-4 border-white shadow-xl"
              style={{
                right: `${10 + i * 20}%`,
                top: `${40 + i * 25}%`,
              }}
              animate={{
                y: [-12, 12, -12],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-black text-sm">
                {(i + 1) * 50}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
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
          
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border-4 border-trinity-orange-400 shadow-2xl">
            <img 
              src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
              alt="Dutch Card Game - Professeur Cartouche"
              className="w-auto h-32 sm:h-40 md:h-48 mx-auto object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Titre supprimé pour design épuré avec logo uniquement */}
        
        {/* Sous-titre descriptif */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold max-w-3xl mx-auto leading-relaxed bg-white/95 backdrop-blur-xl rounded-2xl py-6 px-8 border-3 border-trinity-blue-300 shadow-xl text-neutral-800"
        >
          🎮 Défiez vos amis avec le{' '}
          <span className="text-trinity-purple-600 font-black">Professeur Cartouche</span>{' '}
          🎓✨
        </motion.p>

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
            {/* Effet glow coloré */}
            <motion.div
              className="absolute -inset-3 bg-gradient-to-r from-trinity-orange-400 via-trinity-purple-400 to-trinity-blue-400 rounded-2xl blur-xl opacity-60"
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
              className="relative z-10 bg-gradient-to-r from-trinity-orange-500 to-trinity-orange-600 hover:from-trinity-purple-500 hover:to-trinity-blue-500 text-white font-black text-xl sm:text-2xl px-16 py-8 shadow-2xl border-4 border-white rounded-2xl transition-all duration-300 hover:border-trinity-orange-300 hover:scale-105"
            >
              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <Gamepad2 className="h-8 w-8 group-hover:animate-bounce" />
                🚀 JOUER MAINTENANT ! 🎯
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
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

      {/* Effet de particules en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  );
};

export default GamingHeroSection;