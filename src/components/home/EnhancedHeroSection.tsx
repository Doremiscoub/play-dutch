
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Gamepad2, ChevronDown, Users, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ModernTitle } from '@/components/ui/modern-title';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const FloatingElements = React.lazy(() => import('./FloatingElements'));

interface TrustIndicatorProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const TrustIndicator: React.FC<TrustIndicatorProps> = ({ icon, value, label }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.8 }}
    className="flex items-center gap-2 bg-white/80 backdrop-blur-xl rounded-full px-4 py-2 shadow-sm border border-white/30"
  >
    <div className="text-dutch-blue">{icon}</div>
    <div className="text-sm">
      <span className="font-bold text-gray-800">{value}</span>
      <span className="text-gray-600 ml-1">{label}</span>
    </div>
  </motion.div>
);

const FeatureBadge: React.FC<{ icon: string; text: string; color: string }> = ({ icon, text, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-xl border border-white/20 ${color}`}
  >
    {icon} {text}
  </motion.div>
);

const EnhancedHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const animationVariants = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: prefersReducedMotion ? 0.2 : 1, ease: "easeOut" }
  };

  return (
    <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <Suspense fallback={<div />}>
        <FloatingElements />
      </Suspense>

      <motion.div 
        className="text-center space-y-8 relative z-20 max-w-5xl"
        initial="initial"
        animate="animate"
        variants={animationVariants}
      >
        {/* Enhanced Title with Space Grotesk font */}
        <div className="relative mb-8">
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-dutch-blue/30 via-dutch-purple/30 to-dutch-orange/30 rounded-3xl blur-2xl"
            animate={prefersReducedMotion ? {} : {
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
            className="relative z-10 text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none"
            style={{
              fontFamily: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              textShadow: '0 0 30px rgba(30, 64, 175, 0.3), 0 0 60px rgba(124, 58, 237, 0.2)'
            }}
          >
            DUTCH
          </ModernTitle>
        </div>
        
        {/* Updated Tagline */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 1, delay: 0.3 }}
          className="space-y-4 mb-8"
        >
          <motion.h2 
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-dutch-blue to-dutch-purple leading-tight"
            style={{
              fontFamily: "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Votre compagnon de Dutch :<br />
            <span className="text-dutch-orange">jouez, suivez, laissez l'IA vous guider</span>
          </motion.h2>
        </motion.div>

        {/* Trust Indicators moved below title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 1, delay: 0.5 }}
          className="flex justify-center gap-4 flex-wrap mb-8"
        >
          <TrustIndicator 
            icon={<Users className="h-4 w-4" />}
            value="2,500+"
            label="joueurs"
          />
          <TrustIndicator 
            icon={<Star className="h-4 w-4" />}
            value="4.8/5"
            label="satisfaction"
          />
          <TrustIndicator 
            icon={<Gamepad2 className="h-4 w-4" />}
            value="15k+"
            label="parties"
          />
        </motion.div>
        
        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 1, delay: 0.7 }}
          className="relative mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary CTA - corrigé pour naviguer vers /setup */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <Button
                onClick={() => navigate('/setup')}
                size="xl"
                className="relative bg-gradient-to-r from-dutch-blue to-dutch-purple text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-dutch-blue/25 transition-all duration-300 border-0 group"
                aria-label="Commencer une nouvelle partie de Dutch"
              >
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={prefersReducedMotion ? {} : { x: 2 }}
                >
                  <Gamepad2 className="h-6 w-6 group-hover:animate-pulse" />
                  Jouer maintenant
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Button>
            </motion.div>

            {/* Secondary Button */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Button
                onClick={() => navigate('/rules')}
                variant="outline"
                size="xl"
                className="bg-white/30 backdrop-blur-xl border-2 border-dutch-blue/30 text-dutch-blue px-10 py-6 text-lg font-semibold rounded-full shadow-xl hover:bg-white/40 transition-all duration-300"
                aria-label="Découvrir les règles du jeu Dutch"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={prefersReducedMotion ? {} : { x: 2 }}
                >
                  <BookOpen className="h-5 w-5" />
                  Découvrir les règles
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature badges moved below CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 1, delay: 1 }}
          className="flex justify-center gap-3 flex-wrap"
        >
          <FeatureBadge 
            icon="✅" 
            text="100% Gratuit" 
            color="bg-green-100/80 text-green-800 border-green-200" 
          />
          <FeatureBadge 
            icon="🤖" 
            text="IA Professeur Cartouche" 
            color="bg-purple-100/80 text-purple-800 border-purple-200" 
          />
          <FeatureBadge 
            icon="📱" 
            text="Fonctionne hors-ligne" 
            color="bg-blue-100/80 text-blue-800 border-blue-200" 
          />
        </motion.div>
      </motion.div>
      
      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 1, delay: 1.5 }}
      >
        <motion.button 
          className="flex flex-col items-center text-gray-600 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-dutch-blue focus:ring-offset-2 rounded-lg p-2"
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          aria-label="Faire défiler vers le contenu suivant"
        >
          <span className="text-sm font-medium mb-3 group-hover:text-dutch-blue transition-colors">
            Découvrir
          </span>
          <div className="relative">
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-dutch-blue/20 to-dutch-purple/20 rounded-full blur"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <ChevronDown className="h-8 w-8 relative z-10 group-hover:text-dutch-blue transition-colors" />
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default EnhancedHeroSection;
