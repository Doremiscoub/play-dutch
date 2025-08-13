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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* Contenu principal centré */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        
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
            className="w-auto h-48 sm:h-56 md:h-64 lg:h-72 mx-auto object-contain"
          />
        </motion.div>

        {/* Badge Application Compagnon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Sortez vos cartes, <span className="text-orange-500">on</span><br/>
            <span className="text-orange-500">s'occupe des scores !</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            🃏 Votre smartphone devient votre carnet de scores intelligent
          </p>
        </motion.div>

        {/* CTA Principal unique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="pt-4"
        >
          <Button
            onClick={() => navigate('/setup')}
            size="xl"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Gamepad2 className="h-6 w-6 mr-3" />
            {isMobile ? 'JOUER' : '🎮 JOUER 🎯'}
          </Button>
        </motion.div>

        {/* Stats simples en bas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8"
        >
          <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
            <Star className="h-5 w-5 text-orange-500" />
            <span className="text-gray-800 font-semibold">2,500+ joueurs</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100">
            <Zap className="h-5 w-5 text-blue-500" />
            <span className="text-gray-800 font-semibold">100% gratuit</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SimplifiedHeroSection;