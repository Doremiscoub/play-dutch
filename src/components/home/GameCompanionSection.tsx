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
      gradient: "from-red-400 to-pink-500"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Plus de temps pour jouer",
      description: "Concentrez-vous sur l'essentiel : le plaisir de jouer entre amis.",
      gradient: "from-trinity-blue-500 to-trinity-purple-500"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Toujours dans votre poche",
      description: "Sur mobile, tablette ou ordinateur - partout où vos amis vous accompagnent.",
      gradient: "from-trinity-purple-500 to-trinity-orange-500"
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Hors-ligne et sécurisé",
      description: "Aucune connexion requise, vos données restent privées et sur votre appareil.",
      gradient: "from-trinity-orange-500 to-trinity-blue-500"
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
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-trinity-purple-600 via-trinity-blue-600 to-trinity-orange-600 bg-clip-text text-transparent mb-6 leading-tight py-2">
            🤝 Votre compagnon de jeu idéal 🤝
          </h2>
          <p className="text-xl text-neutral-700 font-bold max-w-4xl mx-auto mb-8">
            Dutch Card Game n'est pas qu'une simple application - c'est le partenaire parfait pour vos soirées jeux !
          </p>
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-trinity-blue-100 to-trinity-purple-100 rounded-2xl p-8 border-2 border-trinity-blue-200">
            <p className="text-lg text-neutral-800 font-bold leading-relaxed">
              💡 <strong>L'idée :</strong> Remplacer définitivement le carnet de scores papier tout en ajoutant une dimension interactive et amusante à vos parties grâce au Professeur Cartouche !
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
              <Card className="h-full bg-white/90 backdrop-blur-xl border-0 shadow-xl hover:shadow-3xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-8 flex items-start gap-6">
                  <motion.div
                    className={`bg-gradient-to-br ${benefit.gradient} rounded-2xl p-4 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex-shrink-0`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-black text-xl text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 font-semibold leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Témoignage/Citation imaginaire */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="bg-gradient-to-br from-trinity-purple-600 via-trinity-blue-600 to-trinity-orange-600 backdrop-blur-xl border-0 shadow-3xl overflow-hidden">
            {/* Overlay pour améliorer le contraste */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Guillemets décoratifs */}
            <div className="absolute top-6 left-8 text-8xl font-black opacity-30 text-white">"</div>
            <div className="absolute bottom-6 right-8 text-8xl font-black opacity-30 rotate-180 text-white">"</div>
            
            <CardContent className="relative z-10 p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl md:text-3xl font-black mb-6 leading-relaxed text-white">
                  Depuis qu'on utilise Dutch Card Game, nos soirées cartes sont encore plus fun ! Le Professeur Cartouche nous fait mourir de rire avec ses commentaires ! 😂
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