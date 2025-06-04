
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Heart, Sparkles } from 'lucide-react';
import { Enhanced3DFeatureCard } from '@/components/home/Enhanced3DFeatureCard';

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

export const FeaturesSection: React.FC = () => {
  return (
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
  );
};
