
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users, Trophy, BookOpen, Star, Zap, Heart, Sparkles, ChevronDown, ArrowRight, Gamepad2 } from 'lucide-react';
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
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Settings positioned in top-right */}
      <div className="absolute top-4 right-4 z-50">
        <GameSettings />
      </div>
      
      {/* Hero Section - Ultra Modern and Sexy */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Floating Elements Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20 backdrop-blur-xl"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0.5,
                opacity: 0
              }}
              animate={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [0.5, 1, 0.8],
                opacity: [0, 0.7, 0.3]
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        {/* Particle Effect Overlay */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-dutch-orange to-dutch-purple rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 20,
                opacity: 0
              }}
              animate={{ 
                x: Math.random() * window.innerWidth,
                y: -20,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
            />
          ))}
        </div>

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
          
          {/* Enhanced Subtitle with Typewriter Effect */}
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
          
          {/* Enhanced Auth Status with Glassmorphism */}
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

            {/* Social Proof Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex justify-center mt-8 gap-4 flex-wrap"
            >
              {[
                { icon: "⚡", text: "Instant", color: "from-yellow-400 to-orange-500" },
                { icon: "🎯", text: "Précis", color: "from-blue-400 to-purple-500" },
                { icon: "🚀", text: "Moderne", color: "from-purple-400 to-pink-500" }
              ].map((pill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${pill.color} text-white text-sm font-semibold shadow-lg backdrop-blur-xl border border-white/20`}
                >
                  {pill.icon} {pill.text}
                </motion.div>
              ))}
            </motion.div>
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
