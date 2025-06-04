
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users, Trophy, BookOpen, Star, Zap, Heart, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import GameSettings from '@/components/GameSettings';
import SEOFooter from '@/components/SEOFooter';
import AuthStatus from '@/components/AuthStatus';
import { ModernTitle } from '@/components/ui/modern-title';
import { useSEO } from '@/hooks/useSEO';

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
      title: "Facile à utiliser",
      description: "Interface intuitive pour ajouter les scores en quelques clics"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "2 à 10 joueurs",
      description: "Parfait pour les petites et grandes tablées entre amis"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "100% Gratuit",
      description: "Aucun abonnement, aucune publicité intrusive, juste du plaisir"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "IA Commentateur",
      description: "Professeur Cartouche commente vos parties avec humour"
    }
  ];

  const testimonials = [
    {
      name: "Marie L.",
      comment: "Parfait pour nos soirées jeux ! Plus besoin de papier et crayon.",
      rating: 5
    },
    {
      name: "Thomas K.",
      comment: "L'IA commentateur est hilarante, ça ajoute du fun à nos parties.",
      rating: 5
    },
    {
      name: "Sophie M.",
      comment: "Interface très claire, même ma grand-mère arrive à s'en servir !",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Settings positioned in top-right */}
      <div className="absolute top-4 right-4 z-50">
        <GameSettings />
      </div>
      
      {/* Hero Section - Clean and Minimal */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4">
        <motion.div 
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Title with Sparkle Icon */}
          <ModernTitle 
            variant="h1" 
            withSparkles 
            withIcon 
            className="mb-6"
          >
            Dutch Card Game
          </ModernTitle>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            L'application <strong>gratuite</strong> pour suivre les scores de vos parties de Dutch
          </motion.p>
          
          {/* Auth Status Component with Login/Play buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <AuthStatus 
              showLoginButtons={true} 
              buttonStyle="default"
              className="flex flex-col items-center space-y-4"
            />
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center text-gray-500">
            <span className="text-sm mb-2">Découvrir</span>
            <ChevronDown className="h-6 w-6" />
          </div>
        </motion.div>
      </section>

      {/* SEO Content Section - Appears on scroll */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          
          {/* Quick Navigation */}
          <motion.section 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                onClick={() => navigate('/game/setup')}
                size="lg"
                className="bg-gradient-to-r from-dutch-blue to-dutch-purple hover:scale-105 transition-transform text-lg px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                Créer une partie
              </Button>
              
              <Button 
                onClick={() => navigate('/rules')}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Apprendre les règles
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                ✅ 100% Gratuit
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                📱 Fonctionne hors-ligne
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                🤖 IA Commentateur
              </Badge>
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Pourquoi choisir Dutch Card Game ?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white/70 backdrop-blur-xl border border-white/50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-dutch-blue to-dutch-purple flex items-center justify-center text-white">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold mb-2 text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Comment jouer section */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/70 backdrop-blur-xl border border-white/50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  Comment jouer au Dutch ?
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dutch-blue flex items-center justify-center text-white font-bold text-2xl">
                      1
                    </div>
                    <h3 className="font-semibold mb-2">Distribution</h3>
                    <p className="text-gray-600">Chaque joueur reçoit des cartes selon le nombre de participants</p>
                  </div>
                  
                  <div>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dutch-purple flex items-center justify-center text-white font-bold text-2xl">
                      2
                    </div>
                    <h3 className="font-semibold mb-2">Objectif</h3>
                    <p className="text-gray-600">Faire le moins de points possible en évitant les cartes de cœur</p>
                  </div>
                  
                  <div>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dutch-orange flex items-center justify-center text-white font-bold text-2xl">
                      3
                    </div>
                    <h3 className="font-semibold mb-2">Victoire</h3>
                    <p className="text-gray-600">Le joueur avec le moins de points gagne quand la limite est atteinte</p>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <Button 
                    onClick={() => navigate('/rules')}
                    variant="outline"
                    size="lg"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Règles complètes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Testimonials */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Ce que disent nos joueurs
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/70 backdrop-blur-xl border border-white/50">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                    <p className="font-semibold text-gray-800">— {testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* CTA Final */}
          <motion.section 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 border border-white/50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  Prêt pour votre première partie ?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Rejoignez des milliers de joueurs qui ont déjà adopté Dutch Card Game
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/game/setup')}
                    size="lg"
                    className="bg-gradient-to-r from-dutch-blue to-dutch-purple hover:scale-105 transition-transform text-lg px-8 py-4"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Commencer maintenant
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/history')}
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-4"
                  >
                    <Trophy className="mr-2 h-5 w-5" />
                    Voir l'historique
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <SEOFooter className="mt-16" />
        </div>
      </div>
    </div>
  );
};

export default Home;
