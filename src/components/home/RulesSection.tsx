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
      description: "Obtenir le total de points le plus BAS après plusieurs manches"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Cartes magiques",
      description: "As = -1 pt, Joker = -3 pts, Roi noir = 0 pt ! Dames et Valets ont des pouvoirs spéciaux"
    }
  ];

  return (
    <section className="relative py-24 px-4 z-10 bg-gradient-to-br from-dutch-orange/8 via-transparent to-dutch-blue/8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gradient-trinity mb-6 leading-tight py-2">
            📖 Comment jouer au Dutch ? 📖
          </h2>
          <p className="text-xl text-foreground font-bold max-w-3xl mx-auto">
            Objectif : avoir le score le plus BAS ! Mémorisez, échangez, utilisez les pouvoirs des cartes.
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
            <Card variant="glass-elevated" className="shadow-md overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-dutch-orange to-dutch-purple rounded-2xl p-3 text-white">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground">
                    Le principe du jeu
                  </h3>
                </div>

                <p className="text-foreground font-semibold leading-relaxed mb-6">
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
                      className="flex items-start gap-4 p-4 glass-surface rounded-xl"
                    >
                      <div className="bg-gradient-to-br from-dutch-orange to-dutch-purple rounded-lg p-2 text-white flex-shrink-0">
                        {rule.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-foreground mb-1">
                          {rule.title}
                        </h4>
                        <p className="text-muted-foreground font-semibold">
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
              <Card className="bg-gradient-to-br from-dutch-orange via-dutch-purple to-dutch-blue border-0 shadow-lg neon-purple overflow-hidden">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-black mb-4 text-white">
                    Envie d'en savoir plus ?
                  </h3>
                  <p className="text-lg font-bold mb-6 text-white/90">
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
                      className="group border-2 border-white text-white bg-transparent hover:bg-white hover:text-dutch-purple font-black text-lg px-8 py-4"
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
            <Card variant="glass-elevated" className="shadow-md overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-black text-foreground mb-6 text-center">
                  🃏 Exemple de manche
                </h3>

                {/* Simulation d'un petit tableau de scores */}
                <div className="glass-surface rounded-2xl p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 px-4 bg-white/60 rounded-lg shadow-sm">
                      <span className="font-bold text-foreground">👤 Alex</span>
                      <span className="font-black text-dutch-blue">12 pts</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-white/60 rounded-lg shadow-sm">
                      <span className="font-bold text-foreground">👤 Marie</span>
                      <span className="font-black text-dutch-purple">8 pts</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-red-50 rounded-lg shadow-sm border-2 border-red-300">
                      <span className="font-bold text-foreground">👤 Tom (Dutch!)</span>
                      <span className="font-black text-red-600">20 pts</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-4 bg-white/60 rounded-lg shadow-sm">
                      <span className="font-bold text-foreground">👤 Lisa</span>
                      <span className="font-black text-dutch-orange">15 pts</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-dutch-orange/10 rounded-xl border border-dutch-orange/30">
                    <p className="text-sm font-bold text-foreground text-center">
                      💡 Tom a coupé et a désigné Alex - Alex double ses points !
                    </p>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground font-semibold">
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
