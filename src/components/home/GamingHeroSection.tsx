import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GamingHeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background gaming vibrant */}
      <div className="absolute inset-0 bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange">
        {/* Overlay pour améliorer le contraste */}
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Éléments gaming décoratifs */}
        <div className="absolute inset-0">
          {/* Cartes volantes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`card-${i}`}
              className="absolute w-16 h-24 bg-white/20 rounded-lg border-2 border-white/30 backdrop-blur-sm"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
                rotate: `${-15 + i * 10}deg`
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-white/60 text-2xl font-bold">
                {['♠', '♥', '♦', '♣', '🃏'][i]}
              </div>
            </motion.div>
          ))}
          
          {/* Jetons de casino */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`chip-${i}`}
              className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-4 border-white shadow-lg"
              style={{
                right: `${5 + i * 15}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: [-15, 15, -15],
                x: [-5, 5, -5],
                rotate: [0, 360]
              }}
              transition={{
                duration: 4 + i * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-black text-xs">
                {(i + 1) * 10}
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
          
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border-4 border-white/30 shadow-2xl">
            <img 
              src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
              alt="Dutch Card Game - Professeur Cartouche"
              className="w-auto h-32 sm:h-40 md:h-48 mx-auto object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Titre MEGA gaming */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                  "0 0 20px #FFD700, 0 0 40px #FFD700, 0 0 60px #FFD700",
                  "0 0 30px #FF6B6B, 0 0 50px #FF6B6B, 0 0 70px #FF6B6B",
                  "0 0 20px #4ECDC4, 0 0 40px #4ECDC4, 0 0 60px #4ECDC4",
                  "0 0 20px #FFD700, 0 0 40px #FFD700, 0 0 60px #FFD700"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              DUTCH
            </motion.span>
            <br />
            <span className="text-yellow-300 text-shadow-lg">
              CARD GAME
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl text-white font-bold max-w-3xl mx-auto leading-relaxed bg-black/20 backdrop-blur-sm rounded-2xl py-4 px-6 border-2 border-white/30"
          >
            🎮 Défiez vos amis avec le{' '}
            <span className="text-yellow-300 font-black text-shadow-lg">Professeur Cartouche</span>{' '}
            🎓✨
          </motion.p>
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
            {/* Effet néon pour le bouton */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 rounded-2xl blur-lg opacity-70"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <Button
              onClick={() => navigate('/setup')}
              size="xl"
              className="relative z-10 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-black hover:text-white font-black text-xl sm:text-2xl px-16 py-8 shadow-2xl border-4 border-white rounded-2xl transition-all duration-300 group-hover:border-yellow-300"
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
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border-2 border-white/40">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-black text-lg">2,500+ joueurs</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border-2 border-white/40">
              <Zap className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-black text-lg">100% gratuit</span>
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