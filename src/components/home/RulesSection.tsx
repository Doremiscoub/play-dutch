import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Lightbulb, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RulesSection: React.FC = () => {
  const navigate = useNavigate();

  const ruleHighlights = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Objectif",
      description: "Avoir le score le plus bas à la fin de la partie"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Le Dutch",
      description: "Le joueur qui coupe désigne un autre joueur qui double ses points"
    }
  ];

  return (
    <section className="relative py-24 px-4 z-10 bg-gradient-to-br from-trinity-orange-50/80 via-white to-trinity-blue-50/80">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-trinity-orange-600 via-trinity-purple-600 to-trinity-blue-600 bg-clip-text text-transparent mb-6">
            📖 Découvrez les règles du Dutch 📖
          </h2>
          <p className="text-xl text-neutral-700 font-bold max-w-3xl mx-auto">
            Un jeu de cartes stratégique et amusant qui se joue entre amis !
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Description et règles principales */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-trinity-orange-500 to-trinity-purple-500 rounded-2xl p-3 text-white">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">
                    Le principe du jeu
                  </h3>
                </div>
                
                <p className="text-gray-700 font-semibold leading-relaxed mb-6">
                  Le Dutch est un jeu de cartes passionnant où la stratégie rencontre la chance. 
                  Chaque manche compte, et un seul moment d'inattention peut tout changer !
                </p>

                <div className="space-y-4">
                  {ruleHighlights.map((rule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-4 bg-gradient-to-r from-trinity-orange-50 to-trinity-purple-50 rounded-xl border border-trinity-orange-200"
                    >
                      <div className="bg-gradient-to-br from-trinity-orange-400 to-trinity-purple-400 rounded-lg p-2 text-white flex-shrink-0">
                        {rule.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 mb-1">
                          {rule.title}
                        </h4>
                        <p className="text-gray-600 font-semibold">
                          {rule.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA vers les règles complètes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-trinity-orange-500/95 to-trinity-purple-500/95 backdrop-blur-xl border-0 shadow-xl text-white overflow-hidden">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-black mb-4">
                    🎯 Envie d'en savoir plus ?
                  </h3>
                  <p className="text-lg font-bold mb-6 opacity-90">
                    Consultez le guide complet avec exemples et stratégies !
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => navigate('/rules')}
                      variant="outline"
                      size="lg"
                      className="border-4 border-white text-white bg-transparent hover:bg-white hover:text-trinity-purple-700 font-black text-lg px-8 py-4"
                    >
                      <BookOpen className="h-5 w-5 mr-3" />
                      Règles complètes
                      <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Illustration/Exemple visuel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">
                  🃏 Exemple de manche
                </h3>
                
                {/* Simulation d'un petit tableau de scores */}
                <div className="bg-gradient-to-br from-trinity-blue-50 to-trinity-purple-50 rounded-2xl p-6 border-2 border-trinity-blue-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 px-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-gray-800">👤 Alex</span>
                      <span className="font-black text-trinity-blue-600">12 pts</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-gray-800">👤 Marie</span>
                      <span className="font-black text-trinity-purple-600">8 pts</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-gradient-to-r from-red-100 to-red-200 rounded-lg shadow-sm border-2 border-red-300">
                      <span className="font-bold text-gray-800">👤 Tom (Dutch!)</span>
                      <span className="font-black text-red-600">20 pts</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-white rounded-lg shadow-sm">
                      <span className="font-bold text-gray-800">👤 Lisa</span>
                      <span className="font-black text-trinity-orange-600">15 pts</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-trinity-orange-100 rounded-xl border border-trinity-orange-300">
                    <p className="text-sm font-bold text-trinity-orange-800 text-center">
                      💡 Tom a coupé et a désigné Alex - Alex double ses points !
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 font-semibold">
                    ✨ L'application calcule tout automatiquement !
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;