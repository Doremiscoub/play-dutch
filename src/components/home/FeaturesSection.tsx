
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Heart, Sparkles } from 'lucide-react';
import { Enhanced3DFeatureCard } from '@/components/home/Enhanced3DFeatureCard';

const features = [
  {
    icon: <div className="text-2xl">🃏</div>,
    title: "Compagnon parfait",
    description: "Remplace votre carnet de scores papier par une expérience interactive"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "2 à 10 joueurs",
    description: "Parfait pour accompagner vos parties entre amis autour de la table"
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "100% Hors-ligne",
    description: "Fonctionne sans internet, vos données restent sur votre appareil"
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "IA Commentateur",
    description: "Professeur Cartouche analyse et commente vos performances en temps réel"
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <motion.section 
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800 px-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Pourquoi choisir l'Application Compagnon Dutch ?
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
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
  );
};
