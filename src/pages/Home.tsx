import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, Users, Trophy, Heart, Zap, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import PageShell from '@/components/layout/PageShell';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import GamingHeroSection from '@/components/home/GamingHeroSection';
import LazyHomeSections from '@/components/home/LazyHomeSections';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // SEO optimisé
  const seoData = {
    title: 'Dutch Card Game - Application gratuite pour jeu de cartes entre amis avec IA',
    description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Interface moderne, hors-ligne, avec IA commentateur Professeur Cartouche. Compagnon de jeu parfait pour vos soirées entre amis. Calculateur de scores automatique, statistiques avancées et commentaires humoristiques.',
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne, professeur cartouche, IA, compagnon de jeu, calculateur scores, statistiques jeu, gaming, cartes entre amis'
  };

  useSEO(seoData);

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Interface simple",
      description: "Ajoutez les scores en un clic",
      gradient: "from-trinity-orange-400 to-trinity-orange-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "2 à 10 joueurs",
      description: "Pour toutes les tablées",
      gradient: "from-trinity-blue-400 to-trinity-blue-600"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "100% gratuit",
      description: "Aucun abonnement requis",
      gradient: "from-trinity-purple-400 to-trinity-purple-600"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "IA Professeur Cartouche",
      description: "Commentaires humoristiques",
      gradient: "from-trinity-blue-500 to-trinity-purple-500"
    }
  ];

  return (
    <PageShell variant="default">
      <MobileOptimizer pageType="home" className="min-h-screen">
        <UnifiedHeader 
          title="Dutch Card Game"
          showBackButton={false}
          showSettings={true}
          hideTitle={true}
        />

        {/* Nouvelle Hero Section Gaming */}
        <GamingHeroSection />

      {/* Section Features Colorée */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent mb-6">
              🌟 Pourquoi Dutch Card Game ? 🌟
            </h2>
            <p className="text-xl text-neutral-700 font-bold max-w-3xl mx-auto">
              Une application pensée pour transformer vos soirées jeux en moments inoubliables ! 🎉
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group"
              >
                <Card className="h-full bg-white/90 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden relative">
                  {/* Gradient de fond animé */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  />
                  
                  <CardContent className="relative z-10 p-8 text-center">
                    <motion.div
                      className={`bg-gradient-to-br ${feature.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="font-black text-xl text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-semibold">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Ultra-Coloré */}
      <section className="relative py-20 px-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 backdrop-blur-xl border-0 shadow-3xl text-white overflow-hidden relative">
            {/* Overlay pour améliorer le contraste */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Effets de particules dans le fond - réduits pour la lisibilité */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/15 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                />
              ))}
            </div>
            
            <CardContent className="relative z-10 p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  🎊 Prêt pour votre première partie ? 🎊
                </h2>
                <p className="text-xl font-bold mb-8 max-w-2xl mx-auto">
                  Lancez-vous dès maintenant dans l'aventure Dutch ! 
                  C'est gratuit, fun et sans inscription ! 🚀✨
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.div
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => navigate('/setup')}
                      size="xl"
                      className="bg-white text-trinity-purple-700 hover:bg-trinity-orange-100 hover:text-trinity-blue-700 font-black text-xl px-12 py-6 shadow-2xl border-4 border-white/80 transition-all duration-300 hover:scale-105"
                    >
                      <Gamepad2 className="h-6 w-6 mr-3" />
                      🎮 C'EST PARTI ! 🎯
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => navigate('/history')}
                      variant="outline"
                      size="xl"
                      className="border-4 border-white text-white bg-transparent hover:bg-white hover:text-trinity-purple-700 font-bold text-lg px-10 py-6 transition-all duration-300 hover:scale-105"
                    >
                      <Trophy className="h-5 w-5 mr-2" />
                      📊 Historique
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

        {/* Sections lazy-loaded pour optimiser les performances */}
        <LazyHomeSections navigate={navigate} />
      </MobileOptimizer>
    </PageShell>
  );
};

export default Home;