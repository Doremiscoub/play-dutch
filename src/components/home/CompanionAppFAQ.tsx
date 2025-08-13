import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Smartphone, Wifi, Users, Crown, Gamepad2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CompanionAppFAQ: React.FC = () => {
  const faqItems = [
    {
      question: "Ai-je besoin de cartes physiques pour jouer ?",
      answer: "Oui ! Dutch Card Game est une application compagnon. Vous devez avoir un jeu de cartes Dutch physique pour jouer. L'application calcule automatiquement les scores pendant que vous jouez avec de vraies cartes autour de la table.",
      icon: <div className="text-2xl">🃏</div>
    },
    {
      question: "Comment ça fonctionne exactement ?",
      answer: "C'est simple : 1) Sortez vos cartes Dutch physiques, 2) Créez une partie dans l'app avec vos amis, 3) Jouez normalement aux cartes, 4) Saisissez les scores dans l'app après chaque manche. L'application calcule tout automatiquement !",
      icon: <Smartphone className="h-5 w-5" />
    },
    {
      question: "Faut-il une connexion internet ?",
      answer: "Non ! L'application fonctionne entièrement hors-ligne. Vos données restent sur votre appareil et vous n'avez besoin d'aucune connexion internet pour jouer.",
      icon: <Wifi className="h-5 w-5" />
    },
    {
      question: "Combien de personnes peuvent jouer ?",
      answer: "L'application supporte de 2 à 10 joueurs, parfait pour les petites soirées intimes ou les grandes tablées entre amis !",
      icon: <Users className="h-5 w-5" />
    },
    {
      question: "Qu'est-ce que le Professeur Cartouche ?",
      answer: "C'est notre IA commentateur intégrée ! Il analyse vos performances en temps réel et vous fait des commentaires humoristiques et personnalisés pendant vos parties. Un vrai compagnon de jeu !",
      icon: <Crown className="h-5 w-5" />
    },
    {
      question: "Quand le mode en ligne sera-t-il disponible ?",
      answer: "Nous travaillons sur un mode en ligne complet avec cartes virtuelles pour 2025 ! En attendant, profitez de l'application compagnon qui est déjà parfaite pour vos soirées entre amis.",
      icon: <Gamepad2 className="h-5 w-5" />
    }
  ];

  return (
    <section className="relative py-24 px-4 z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm mb-6">
            <HelpCircle className="h-4 w-4" />
            Questions fréquentes
          </div>
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight py-2">
            🤔 Vous avez des questions ? 🤔
          </h2>
          <p className="text-xl text-neutral-700 font-bold max-w-3xl mx-auto">
            Tout ce que vous devez savoir sur l'application compagnon Dutch Card Game
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-xl">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <AccordionItem value={`item-${index}`} className="border border-gray-200 rounded-lg">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-4 text-left">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                            {item.icon}
                          </div>
                          <span className="font-bold text-gray-900 text-lg">
                            {item.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="ml-14">
                          <p className="text-gray-700 font-medium leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 border-2 border-blue-200">
            <p className="text-lg text-blue-800 font-bold mb-4">
              📱 Encore des questions ? 
            </p>
            <p className="text-blue-700 font-semibold">
              L'application est gratuite et fonctionne instantanément - testez-la dès maintenant avec vos cartes Dutch !
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanionAppFAQ;