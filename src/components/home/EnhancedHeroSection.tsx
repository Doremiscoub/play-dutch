
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
        className="text-center space-y-4 relative z-20 max-w-5xl"
        initial="initial"
        animate="animate"
        variants={animationVariants}
      >
        {/* Enhanced Main Title - Simplified for readability */}
        <div className="relative flex items-center justify-center mb-4">
          {/* Single glowing background layer */}
          <motion.div
            className="absolute -inset-12 bg-gradient-to-r from-dutch-blue/20 via-dutch-purple/20 to-dutch-orange/20 rounded-3xl blur-xl"
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Logo principal avec votre image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: prefersReducedMotion ? 0 : 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.2 : 1.2, 
              delay: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="relative z-10 flex items-center justify-center"
          >
            <img 
              src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
              alt="Dutch - Logo du jeu avec Professeur Cartouche"
              className="w-auto h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] 2xl:h-[40rem] max-w-full object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
              }}
            />
            
            {/* Sparkle effects around the logo */}
            <motion.div
              className="absolute -top-12 -right-12 text-dutch-orange text-4xl"
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -bottom-8 -left-8 text-dutch-purple text-3xl"
              animate={prefersReducedMotion ? {} : {
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              ⭐
            </motion.div>
            <motion.div
              className="absolute top-4 left-8 text-dutch-blue text-3xl"
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.4, 1],
                rotate: [0, -180, -360],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              💫
            </motion.div>
          </motion.div>
          
          {/* Floating particles effect */}
          {!prefersReducedMotion && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-dutch-orange/60 rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              ))}
            </>
          )}
        </div>
        
        {/* Updated Tagline */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 1, delay: 0.3 }}
          className="space-y-4 mb-4"
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
          className="flex justify-center gap-4 flex-wrap mb-4"
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
          className="relative mb-4"
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
                variant="trinity"
                size="xl"
                className="font-display font-black text-xl px-12 py-6"
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
                variant="glass"
                size="xl"
                className="font-body font-semibold text-lg px-10 py-6"
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
