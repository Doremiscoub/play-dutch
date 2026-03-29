import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Smartphone, Cloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const GameCompanionSection: React.FC = () => {
  const benefits = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Votre compagnon de soirée",
      description: "Fini les calculs à la main et les disputes de scores ! Dutch Card Game s'occupe de tout.",
      gradient: "from-dutch-orange to-dutch-purple"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Plus de temps pour jouer",
      description: "Concentrez-vous sur l'essentiel : le plaisir de jouer entre amis.",
      gradient: "from-dutch-blue to-dutch-purple"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Toujours dans votre poche",
      description: "Sur mobile, tablette ou ordinateur - partout où vos amis vous accompagnent.",
      gradient: "from-dutch-purple to-dutch-orange"
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Hors-ligne et sécurisé",
      description: "Aucune connexion requise, vos données restent privées et sur votre appareil.",
      gradient: "from-dutch-blue to-dutch-orange"
    }
  ];

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
          <h2 className="text-4xl md:text-5xl font-black text-gradient-trinity mb-6 leading-tight py-2">
            🤝 Votre compagnon de jeu idéal 🤝
          </h2>
          <p className="text-xl text-foreground font-bold max-w-4xl mx-auto mb-8">
            Dutch Card Game n'est pas un jeu - c'est le partenaire parfait pour vos parties de cartes réelles !
          </p>
          <div className="max-w-3xl mx-auto glass-elevated rounded-2xl p-8">
            <p className="text-lg text-foreground font-bold leading-relaxed">
              <strong className="text-dutch-blue">Le concept :</strong> Gardez vos cartes Dutch physiques et laissez l'application s'occuper intelligemment des calculs, statistiques et commentaires du Professeur Cartouche !
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card variant="glass" className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-8 flex items-start gap-6">
                  <motion.div
                    className={`bg-gradient-to-br ${benefit.gradient} rounded-2xl p-4 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex-shrink-0`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-black text-xl text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground font-semibold leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Citation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="bg-gradient-to-br from-dutch-purple via-dutch-blue to-dutch-orange border-0 shadow-lg neon-purple overflow-hidden">
            {/* Guillemets décoratifs */}
            <div className="absolute top-6 left-8 text-8xl font-black opacity-20 text-white">"</div>
            <div className="absolute bottom-6 right-8 text-8xl font-black opacity-20 rotate-180 text-white">"</div>

            <CardContent className="relative z-10 p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl md:text-3xl font-black mb-6 leading-relaxed text-white">
                  Depuis qu'on utilise l'application compagnon Dutch, nos soirées cartes sont parfaites ! Plus de disputes de scores et le Professeur nous fait mourir de rire ! 😂🃏
                </p>
                <p className="text-xl font-bold text-white/90">
                  - Marie & ses amis, utilisateurs conquis
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default GameCompanionSection;
