
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import PageLayout from '@/components/PageLayout';

const RulesPage: React.FC = () => {
  return (
    <PageLayout
      title="Règles du jeu"
      subtitle="Apprenez à jouer au Dutch Card Game"
      showThemeSelector={true}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto"
      >
        <Card className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all">
          <CardContent className="pt-6">
            <ScrollArea className="h-[calc(100vh-280px)] pr-4">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">Principes du jeu</h2>
                  <p className="text-gray-700 mb-4">Dutch est un jeu de cartes de plis, dans lequel chaque joueur essaie de faire exactement le nombre de plis annoncé avant le début de chaque manche.</p>
                  <p className="text-gray-700 mb-4">Les points sont calculés en fonction de la précision des prédictions faites par chaque joueur. À la fin du jeu, le joueur ayant accumulé le plus de points gagne.</p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">Préparation</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Le jeu se joue avec un paquet standard de 52 cartes.</li>
                    <li>Il peut être joué de 2 à 7 joueurs.</li>
                    <li>Chaque joueur reçoit le même nombre de cartes à chaque manche.</li>
                    <li>Le nombre de cartes distribuées change à chaque manche selon un schéma prédéfini.</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">Déroulement d'une manche</h2>
                  <ol className="list-decimal list-inside text-gray-700 space-y-3">
                    <li>
                      <strong>Distribution</strong> - Les cartes sont distribuées à chaque joueur selon le nombre défini pour la manche.
                    </li>
                    <li>
                      <strong>Annonce</strong> - Chaque joueur annonce combien de plis il pense pouvoir remporter durant cette manche.
                    </li>
                    <li>
                      <strong>Jeu</strong> - Le joueur à gauche du donneur joue la première carte. Chaque joueur doit suivre la couleur si possible. Si un joueur ne peut pas suivre, il peut jouer n'importe quelle carte.
                    </li>
                    <li>
                      <strong>Plis</strong> - Le pli est remporté par le joueur ayant joué la carte la plus forte dans la couleur demandée (ou par la plus forte carte atout si des atouts ont été joués).
                    </li>
                    <li>
                      <strong>Tour suivant</strong> - Le gagnant du pli précédent joue la première carte du pli suivant.
                    </li>
                  </ol>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">Calcul des points</h2>
                  <p className="text-gray-700 mb-4">À la fin de chaque manche :</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Si un joueur réalise exactement son annonce, il marque 10 points + 1 point par pli réalisé.</li>
                    <li>Si un joueur ne réalise pas son annonce, il perd 1 point par pli d'écart (en plus ou en moins).</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">Fin du jeu</h2>
                  <p className="text-gray-700 mb-4">Le jeu se termine après un nombre prédéfini de manches ou lorsqu'un joueur atteint un nombre de points déterminé à l'avance.</p>
                  <p className="text-gray-700">Le joueur avec le plus grand nombre de points à la fin est déclaré vainqueur.</p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">Variantes</h2>
                  <p className="text-gray-700 mb-4">Plusieurs variantes du jeu existent, avec des règles légèrement différentes :</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Dutch aveugle</strong> - Les joueurs ne voient pas leurs cartes quand ils font leur annonce.</li>
                    <li><strong>Dutch avec atout</strong> - Une couleur d'atout est désignée à chaque manche.</li>
                    <li><strong>Dutch progressif</strong> - Le nombre de cartes augmente puis diminue au fil des manches.</li>
                  </ul>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </PageLayout>
  );
};

export default RulesPage;
