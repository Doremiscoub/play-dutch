import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, Users, Trophy, Heart, Zap, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import PageShell from '@/components/layout/PageShell';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Dutch Card Game - Application gratuite pour jeu de cartes entre amis',
    description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Interface moderne, hors-ligne, avec IA commentateur Professeur Cartouche. Parfait pour vos soirées entre amis.',
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne, professeur cartouche'
  });

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Interface simple",
      description: "Ajoutez les scores en un clic"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "2 à 10 joueurs",
      description: "Pour toutes les tablées"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "100% gratuit",
      description: "Aucun abonnement requis"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "IA Professeur Cartouche",
      description: "Commentaires humoristiques"
    }
  ];

  return (
    <PageShell variant="default">
      <UnifiedHeader 
        title="Dutch Card Game"
        showBackButton={false}
        showSettings={true}
        hideTitle={true}
      />

      {/* Hero Section Ultra-Simplifiée */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-dutch-blue/3 via-transparent to-dutch-orange/3 pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <img 
              src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
              alt="Dutch Card Game"
              className="w-auto h-32 sm:h-40 md:h-48 mx-auto object-contain"
            />
          </motion.div>

          {/* Titre principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Le jeu de cartes <span className="text-dutch-blue">Dutch</span>
              <br />
              <span className="text-dutch-orange">réinventé</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
              Suivez vos scores, défiez vos amis, amusez-vous avec le Professeur Cartouche
            </p>
          </motion.div>

          {/* CTA principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => navigate('/setup')}
                size="xl"
                className="bg-gradient-to-r from-dutch-blue to-dutch-purple hover:scale-105 transition-all duration-200 text-white font-bold text-lg px-12 py-6 shadow-lg hover:shadow-xl group"
              >
                <Gamepad2 className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                Jouer maintenant
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={() => navigate('/rules')}
                variant="outline"
                size="xl"
                className="border-2 border-gray-300 hover:border-dutch-blue hover:text-dutch-blue transition-all duration-200 text-lg px-8 py-6"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Les règles
              </Button>
            </div>
          </motion.div>

          {/* Stats en ligne */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 mb-16"
          >
            <div className="text-center">
              <div className="font-bold text-2xl text-dutch-blue">2,500+</div>
              <div>joueurs actifs</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-dutch-orange">15k+</div>
              <div>parties jouées</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-dutch-purple">100%</div>
              <div>gratuit</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Features Épurée */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Dutch Card Game ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une application pensée pour simplifier vos soirées jeux
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-dutch-blue/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-br from-dutch-blue/10 to-dutch-purple/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-dutch-blue">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Simplifié */}
      <section className="py-16 px-4 bg-gradient-to-r from-dutch-blue/5 to-dutch-purple/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Prêt pour votre première partie ?
            </h2>
            <p className="text-xl text-gray-600">
              Lancez-vous dès maintenant, c'est gratuit et sans inscription
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => navigate('/setup')}
                size="xl"
                className="bg-gradient-to-r from-dutch-blue to-dutch-purple hover:scale-105 transition-all duration-200 text-white font-bold text-lg px-12 py-6 shadow-lg"
              >
                <Gamepad2 className="h-6 w-6 mr-3" />
                Commencer à jouer
              </Button>
              <Button
                onClick={() => navigate('/history')}
                variant="outline"
                size="xl"
                className="text-lg px-8 py-6"
              >
                <Trophy className="h-5 w-5 mr-2" />
                Voir l'historique
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
};

export default Home;