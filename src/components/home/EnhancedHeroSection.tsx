import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Gamepad2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const EnhancedHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Background gradient subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-dutch-blue/5 via-transparent to-dutch-purple/5 pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        {/* Logo principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: prefersReducedMotion ? 0.3 : 0.8, 
            ease: "easeOut" 
          }}
          className="relative"
        >
          <img 
            src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
            alt="Dutch - Jeu de cartes avec Professeur Cartouche"
            className="w-auto h-40 sm:h-48 md:h-56 lg:h-64 mx-auto object-contain"
          />
          
          {/* Effet de brillance subtil */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
            animate={prefersReducedMotion ? {} : { 
              opacity: [0, 0.3, 0],
              x: [-100, 300]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Titre principal simplifié */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: prefersReducedMotion ? 0.3 : 0.6, 
            delay: 0.2 
          }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-dutch-blue/10 text-dutch-blue px-4 py-2 rounded-full font-semibold text-sm mb-4 border border-dutch-blue/20">
            📱 Application Compagnon
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Accompagnez vos parties de <span className="text-dutch-blue">Dutch</span>
            <br />
            <span className="text-dutch-orange">en toute simplicité</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            🃏 L'application compagnon pour vos parties de cartes réelles
          </p>
        </motion.div>

        {/* CTA principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: prefersReducedMotion ? 0.3 : 0.6, 
            delay: 0.4 
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={() => navigate('/setup')}
            size="xl"
            className="bg-gradient-to-r from-dutch-blue to-dutch-purple hover:scale-105 transition-all duration-200 text-white font-bold text-lg px-12 py-6 shadow-lg hover:shadow-xl"
          >
            <Gamepad2 className="h-6 w-6 mr-3" />
            Commencer à jouer
            <ArrowRight className="h-5 w-5 ml-3" />
          </Button>
          
          <Button
            onClick={() => navigate('/rules')}
            variant="outline"
            size="xl"
            className="border-2 border-gray-300 hover:border-dutch-blue hover:text-dutch-blue transition-all duration-200 text-lg px-8 py-6"
          >
            Voir les règles
          </Button>
        </motion.div>

        {/* Badges de confiance discrets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: prefersReducedMotion ? 0.3 : 0.6, 
            delay: 0.6 
          }}
          className="flex flex-wrap justify-center gap-6 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-dutch-blue">2,500+</span>
            <span>joueurs actifs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-dutch-orange">15k+</span>
            <span>parties jouées</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-dutch-purple">100%</span>
            <span>gratuit & hors-ligne</span>
          </div>
        </motion.div>
      </div>

      {/* Indicateur de scroll épuré */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-dutch-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dutch-blue/20 rounded-lg p-2"
        initial={{ opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { 
          opacity: 1, 
          y: [0, 8, 0] 
        }}
        transition={prefersReducedMotion ? { delay: 1 } : { 
          opacity: { delay: 1 }, 
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
        }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Découvrir plus de contenu"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium">Découvrir</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </motion.button>
    </section>
  );
};

export default EnhancedHeroSection;