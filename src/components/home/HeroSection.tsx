
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Gamepad2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ModernTitle } from '@/components/ui/modern-title';
import FloatingElements from './FloatingElements';
import ParticleEffect from './ParticleEffect';
import SocialProofPills from './SocialProofPills';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <FloatingElements />
      <ParticleEffect />

      <motion.div 
        className="text-center space-y-12 relative z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Main Title with Enhanced Effects */}
        <div className="relative">
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-dutch-blue/30 via-dutch-purple/30 to-dutch-orange/30 rounded-3xl blur-2xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <ModernTitle 
            variant="h1" 
            withSparkles 
            withIcon 
            className="relative z-10 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-8"
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              textShadow: '0 0 30px rgba(30, 64, 175, 0.3), 0 0 60px rgba(124, 58, 237, 0.2)'
            }}
          >
            DUTCH
          </ModernTitle>
        </div>
        
        {/* Enhanced Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-4"
        >
          <motion.h2 
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-dutch-blue to-dutch-purple leading-tight"
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            L'expérience jeu de cartes
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="text-dutch-orange font-bold">100% gratuite</span> · 
            <span className="text-dutch-purple font-bold mx-2">IA incluse</span> · 
            <span className="text-dutch-blue font-bold">Hors-ligne</span>
          </motion.p>
        </motion.div>
        
        {/* Enhanced Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative"
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000"></div>
              <Button
                onClick={() => navigate('/game/setup')}
                size="xl"
                className="relative bg-gradient-to-r from-dutch-blue to-dutch-purple text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-dutch-blue/25 transition-all duration-300 border-0"
              >
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ x: 2 }}
                >
                  <Gamepad2 className="h-6 w-6" />
                  Jouer maintenant
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>

            {/* Secondary Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => navigate('/sign-in')}
                variant="glass"
                size="xl"
                className="bg-white/20 backdrop-blur-xl border border-white/30 text-gray-800 px-10 py-6 text-lg font-semibold rounded-full shadow-xl hover:bg-white/30 transition-all duration-300"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 2 }}
                >
                  Se connecter
                </motion.div>
              </Button>
            </motion.div>
          </div>

          <SocialProofPills />
        </motion.div>
      </motion.div>
      
      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div 
          className="flex flex-col items-center text-gray-600 cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-sm font-medium mb-3 group-hover:text-dutch-blue transition-colors">
            Découvrir
          </span>
          <div className="relative">
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-dutch-blue/20 to-dutch-purple/20 rounded-full blur"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <ChevronDown className="h-8 w-8 relative z-10 group-hover:text-dutch-blue transition-colors" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
