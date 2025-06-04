
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users, Trophy, BookOpen, Star, Zap, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import GameSettings from '@/components/GameSettings';
import SEOFooter from '@/components/SEOFooter';
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
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
            Dutch Card Game
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            L'application <strong>gratuite</strong> pour suivre les scores de vos parties de Dutch. 
            Fini le papier et le crayon, place au digital avec style !
          </p>
          
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
        </motion.div>

        {/* Features Grid */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Pourquoi choisir Dutch Card Game ?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
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
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
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
  );
};

export default Home;
