
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageLayout from '@/components/PageLayout';
import { Bot, MessageSquare } from 'lucide-react';

const RulesPage: React.FC = () => {
  return (
    <PageLayout
      title="Règles du Dutch"
      subtitle="Comment jouer au Dutch"
    >
      <div className="max-w-3xl mx-auto pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-gray-600 mb-6">
            Le Dutch est un jeu de cartes où chaque joueur essaie d'avoir le moins de points possible. Le joueur ayant le score le plus bas à la fin de la partie est déclaré vainqueur.
          </p>
          
          {/* Encart Professeur Cartouche */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-md rounded-xl border border-dutch-purple/30 p-4 mb-8 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-dutch-purple/10 p-3">
                <Bot className="h-6 w-6 text-dutch-purple" />
              </div>
              <div>
                <h3 className="font-semibold text-dutch-purple mb-1">Professeur Cartouche</h3>
                <p className="text-sm text-gray-600">Une question sur les règles ? Demandez au Professeur Cartouche !</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="w-full max-w-md mx-auto flex justify-center mb-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-full p-1 shadow-sm">
            <TabsTrigger value="setup" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Mise en place</TabsTrigger>
            <TabsTrigger value="gameplay" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Déroulement</TabsTrigger>
            <TabsTrigger value="cards" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Cartes spéciales</TabsTrigger>
            <TabsTrigger value="scoring" className="rounded-full flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Score</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup">
            <Card className="bg-white/60 backdrop-blur-md border border-white/30 shadow-sm rounded-xl">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-dutch-blue">Mise en place</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  <li>2 à 8 joueurs peuvent jouer</li>
                  <li>Utilisez un jeu de 52 cartes standard</li>
                  <li>Retirez les jokers</li>
                  <li>Distribuez 4 cartes à chaque joueur, face cachée</li>
                  <li>Les joueurs ne peuvent regarder que 2 de leurs cartes</li>
                  <li>Les 2 autres cartes restent face cachée</li>
                  <li>Placez le reste des cartes au centre pour former la pioche</li>
                  <li>Retournez la première carte de la pioche pour former la défausse</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gameplay">
            <Card className="bg-white/60 backdrop-blur-md border border-white/30 shadow-sm rounded-xl">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-dutch-blue">Déroulement</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  <li>Le jeu se déroule dans le sens des aiguilles d'une montre</li>
                  <li>À votre tour, vous pouvez soit piocher une carte (de la pioche ou de la défausse), soit annoncer "Dutch!"</li>
                  <li>Si vous piochez une carte, vous devez défausser une carte de votre main</li>
                  <li>L'objectif est d'avoir le minimum de points dans votre main</li>
                  <li>Les cartes valent leur valeur faciale (As = 1, Figure = 10)</li>
                  <li>Certaines cartes ont des pouvoirs spéciaux (voir l'onglet "Cartes spéciales")</li>
                </ul>
                
                <h4 className="text-md font-semibold text-dutch-blue mt-4">Annoncer "Dutch!"</h4>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  <li>Quand vous pensez avoir le score le plus bas, vous pouvez annoncer "Dutch!"</li>
                  <li>Tous les autres joueurs ont alors un dernier tour</li>
                  <li>Après ce dernier tour, les joueurs révèlent leurs cartes</li>
                  <li>Si vous n'avez pas le score le plus bas, vous recevez une pénalité de 10 points</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cards">
            <Card className="bg-white/60 backdrop-blur-md border border-white/30 shadow-sm rounded-xl">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-dutch-blue">Cartes spéciales</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="pb-2 border-b border-gray-100">
                    <span className="font-semibold text-dutch-orange">Roi (K)</span>
                    <p className="mt-1 text-sm">Permet d'échanger une de vos cartes avec une carte d'un autre joueur sans la regarder.</p>
                  </li>
                  <li className="pb-2 border-b border-gray-100">
                    <span className="font-semibold text-dutch-orange">Reine (Q)</span>
                    <p className="mt-1 text-sm">Permet de regarder une de vos cartes. Si vous connaissez déjà toutes vos cartes, vous pouvez l'utiliser pour regarder une carte d'un adversaire.</p>
                  </li>
                  <li className="pb-2 border-b border-gray-100">
                    <span className="font-semibold text-dutch-orange">Valet (J)</span>
                    <p className="mt-1 text-sm">Permet d'échanger deux de vos cartes sans les regarder.</p>
                  </li>
                  <li className="pb-2 border-b border-gray-100">
                    <span className="font-semibold text-dutch-orange">10</span>
                    <p className="mt-1 text-sm">Permet de regarder une des cartes d'un adversaire.</p>
                  </li>
                  <li className="pb-2 border-b border-gray-100">
                    <span className="font-semibold text-dutch-orange">8</span>
                    <p className="mt-1 text-sm">Protège contre l'effet du Roi et du 10.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scoring">
            <Card className="bg-white/60 backdrop-blur-md border border-white/30 shadow-sm rounded-xl">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-dutch-blue">Score</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  <li>As (A) = 1 point</li>
                  <li>2 à 10 = valeur faciale</li>
                  <li>Valet (J) = 10 points</li>
                  <li>Reine (Q) = 10 points</li>
                  <li>Roi (K) = 10 points</li>
                  <li>Pénalité pour un "Dutch" raté = 10 points</li>
                </ul>
                
                <h4 className="text-md font-semibold text-dutch-blue mt-4">Fin de partie</h4>
                <p className="text-gray-700">
                  La partie se termine après un nombre prédéfini de manches, ou lorsqu'un joueur atteint un certain score total (par exemple 100 points). Le joueur ayant le score total le plus bas remporte la partie.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default RulesPage;
