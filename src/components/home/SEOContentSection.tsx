
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users, Trophy, BookOpen, Star, Zap, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Enhanced3DFeatureCard } from '@/components/home/Enhanced3DFeatureCard';
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

        {/* Comment jouer section - Enhanced */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-4xl font-bold text-center mb-8 text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Comment jouer au Dutch ?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {[
                  {
                    step: "1",
                    title: "Distribution",
                    description: "Chaque joueur reçoit des cartes selon le nombre de participants",
                    color: "bg-dutch-blue"
                  },
                  {
                    step: "2", 
                    title: "Objectif",
                    description: "Faire le moins de points possible en évitant les cartes de cœur",
                    color: "bg-dutch-purple"
                  },
                  {
                    step: "3",
                    title: "Victoire", 
                    description: "Le joueur avec le moins de points gagne quand la limite est atteinte",
                    color: "bg-dutch-orange"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 * index }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group"
                  >
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl ${item.color} flex items-center justify-center text-white font-bold text-3xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      {item.step}
                    </div>
                    <h3 className="font-semibold mb-2 text-xl">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
              
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
            </CardContent>
          </Card>
        </motion.section>

        {/* Enhanced Testimonials */}
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
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-white/70 backdrop-blur-xl border border-white/50 h-full shadow-lg hover:shadow-xl transition-all duration-300">
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
              </motion.div>
            ))}
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
                  <Play className="mr-2 h-5 w-5" />
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
