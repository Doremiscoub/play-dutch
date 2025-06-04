
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Trophy, BookOpen, Star, Zap, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Enhanced3DFeatureCard } from '@/components/home/Enhanced3DFeatureCard';
import { InteractiveTimeline } from '@/components/home/InteractiveTimeline';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';
import { AnimatedStats } from '@/components/home/AnimatedStats';
import SEOFooter from '@/components/SEOFooter';

const SEOContentSection: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Facile à utiliser",
      description: "Interface intuitive pour ajouter les scores en quelques clics"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "2 à 10 joueurs",
      description: "Parfait pour les petites et grandes tablées entre amis"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "100% Gratuit",
      description: "Aucun abonnement, aucune publicité intrusive, juste du plaisir"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "IA Commentateur",
      description: "Professeur Cartouche commente vos parties avec humour"
    }
  ];

  return (
    <div className="relative z-10 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-16">
        
        {/* Enhanced Features Grid with 3D Cards */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Pourquoi choisir Dutch Card Game ?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Enhanced3DFeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.1 * index}
              />
            ))}
          </div>
        </motion.section>

        {/* Interactive Timeline - Enhanced */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Comment jouer au Dutch ?
          </h2>
          
          <InteractiveTimeline />
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate('/rules')}
              variant="outline"
              size="lg"
              className="hover:scale-105 transition-transform"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Règles complètes
            </Button>
          </div>
        </motion.section>

        {/* Animated Stats Section */}
        <AnimatedStats />

        {/* Enhanced Testimonials Carousel */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ce que disent nos joueurs
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <TestimonialsCarousel />
          </div>
        </motion.section>

        {/* Enhanced CTA Final */}
        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 border border-white/50 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-4xl font-bold mb-4 text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                  <Users className="mr-2 h-5 w-5" />
                  Commencer maintenant
                </Button>
                
                <Button 
                  onClick={() => navigate('/history')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 hover:scale-105 transition-transform"
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

export default SEOContentSection;
