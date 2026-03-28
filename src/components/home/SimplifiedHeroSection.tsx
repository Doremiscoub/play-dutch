import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SimplifiedHeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col items-center justify-center px-4 sm:px-6 pt-8 pb-16 sm:pt-12 sm:pb-24">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-purple-50/30 to-transparent pointer-events-none" />

      <div className="relative z-10 text-center w-full max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img
            src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
            alt="Dutch - Professeur Cartouche"
            className="w-auto h-40 sm:h-52 md:h-60 mx-auto object-contain"
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 bg-primary/8 text-primary px-4 py-1.5 rounded-full font-medium text-xs tracking-wide border border-primary/10">
            Application Compagnon de Jeu
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-3"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display leading-tight tracking-tight text-foreground">
            Sortez vos cartes,{' '}
            <span className="text-gradient-trinity">
              on gère les scores
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Votre smartphone devient votre carnet de scores intelligent. Gratuit, hors-ligne, sans inscription.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <Button
            onClick={() => navigate('/setup')}
            size="xl"
            variant="trinity"
            className="w-full sm:w-auto min-w-[200px] text-base font-bold py-6 rounded-xl"
          >
            Nouvelle partie
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>

          <Button
            onClick={() => navigate('/rules')}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <BookOpen className="h-4 w-4" />
            Règles du jeu
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            100% gratuit
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Fonctionne hors-ligne
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            2 à 10 joueurs
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SimplifiedHeroSection;
