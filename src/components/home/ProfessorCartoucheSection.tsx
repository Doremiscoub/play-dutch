import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, MessageCircle, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProfessorCartoucheSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-trinity-purple-600 via-trinity-blue-600 to-trinity-orange-600 bg-clip-text text-transparent mb-6">
            🎩✨ Rencontrez le Professeur Cartouche ✨🎩
          </h2>
          <p className="text-xl text-neutral-700 font-bold max-w-3xl mx-auto">
            Votre compagnon IA intelligent qui transforme chaque partie en aventure mémorable !
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image du Professeur */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Effet de glow autour de l'image */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-trinity-purple-400/30 via-trinity-blue-400/30 to-trinity-orange-400/30 rounded-3xl blur-3xl scale-110"
                animate={{
                  scale: [1.1, 1.2, 1.1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <Card className="relative z-10 bg-white/90 backdrop-blur-xl border-0 shadow-3xl overflow-hidden">
                <CardContent className="p-8">
                  <img 
                    src="/lovable-uploads/0532ef39-c77c-4480-8d74-7af7665596ee.png"
                    alt="Professeur Cartouche - Votre compagnon IA de jeu"
                    className="w-full h-auto object-contain rounded-2xl"
                  />
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Fonctionnalités du Professeur */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                icon: <Brain className="h-8 w-8" />,
                title: "Intelligence Artificielle",
                description: "Analyse vos parties en temps réel et s'adapte à votre style de jeu",
                gradient: "from-trinity-purple-500 to-trinity-blue-500"
              },
              {
                icon: <MessageCircle className="h-8 w-8" />,
                title: "Commentaires Humoristiques",
                description: "Des remarques amusantes et pertinentes qui pimentent vos parties",
                gradient: "from-trinity-blue-500 to-trinity-orange-500"
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Statistiques Avancées",
                description: "Analyse détaillée de vos performances et conseils personnalisés",
                gradient: "from-trinity-orange-500 to-trinity-purple-500"
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "Personnalité Unique",
                description: "Un caractère attachant qui évolue selon vos parties",
                gradient: "from-trinity-purple-400 to-trinity-orange-400"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group"
              >
                <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-3 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-lg text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessorCartoucheSection;