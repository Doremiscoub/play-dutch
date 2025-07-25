import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, BarChart3, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "1",
      icon: <Users className="h-8 w-8" />,
      title: "Créez votre partie",
      description: "Ajoutez 2 à 10 joueurs et définissez vos paramètres de jeu",
      gradient: "from-trinity-blue-500 to-trinity-purple-500"
    },
    {
      number: "2", 
      icon: <Plus className="h-8 w-8" />,
      title: "Ajoutez les scores",
      description: "Saisissez les points manche par manche en un seul clic",
      gradient: "from-trinity-purple-500 to-trinity-orange-500"
    },
    {
      number: "3",
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Suivez les statistiques", 
      description: "Le Professeur Cartouche analyse et commente vos performances",
      gradient: "from-trinity-orange-500 to-trinity-blue-500"
    },
    {
      number: "4",
      icon: <Trophy className="h-8 w-8" />,
      title: "Célébrez la victoire",
      description: "Découvrez le gagnant avec style et consultez l'historique",
      gradient: "from-trinity-blue-400 to-trinity-purple-400"
    }
  ];

  return (
    <section className="relative py-24 px-4 z-10 bg-gradient-to-br from-trinity-blue-50/80 via-white to-trinity-purple-50/80">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent mb-6 leading-tight py-2">
            🚀 Comment ça marche ? 🚀
          </h2>
          <p className="text-xl text-neutral-700 font-bold max-w-3xl mx-auto">
            Lancez votre partie en 4 étapes simples et laissez la magie opérer !
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="relative group"
            >
              {/* Ligne de connexion pour desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-trinity-purple-300 to-trinity-blue-300 z-0">
                  <motion.div
                    className="h-full bg-gradient-to-r from-trinity-purple-500 to-trinity-blue-500"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: (index + 1) * 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              )}

              <Card className="relative z-10 h-full bg-white/90 backdrop-blur-xl border-0 shadow-xl hover:shadow-3xl transition-all duration-300 overflow-hidden">
                {/* Badge numéro */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                  {step.number}
                </div>
                
                <CardContent className="p-8 text-center h-full flex flex-col">
                  {/* Icône */}
                  <motion.div
                    className={`bg-gradient-to-br ${step.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.icon}
                  </motion.div>
                  
                  <h3 className="font-black text-xl text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 font-semibold flex-grow">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-neutral-600 font-bold">
            ✨ <span className="text-trinity-purple-600">Simple, intuitif et amusant</span> - Essayez dès maintenant ! ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;