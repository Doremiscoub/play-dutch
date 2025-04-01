
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, HelpCircle } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const RulesPage: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Simulons une réponse d'IA - dans une version réelle, ceci serait remplacé par un appel API
    setTimeout(() => {
      const possibleAnswers = [
        "Selon les règles officielles du Dutch, oui c'est autorisé!",
        "Non, ce n'est pas autorisé dans les règles standard du Dutch, mais certaines variantes le permettent.",
        "Les règles ne précisent rien à ce sujet, donc c'est généralement permis tant que tous les joueurs sont d'accord.",
        "C'est une question intéressante! Dans le Dutch classique, cette action est permise uniquement lors des manches à atout.",
        "Bonne question! Cette règle varie selon les régions, mais la version la plus répandue l'interdit."
      ];
      
      const randomAnswer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
      setAnswer(randomAnswer);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <PageLayout
      title="Règles du jeu"
      subtitle="Apprenez à jouer au Dutch Card Game"
      showBackButton={true}
    >
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L 24 0 M 0 0 L 0 24' stroke='%23DADADA' stroke-opacity='0.1' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto"
      >
        <Card className="rounded-3xl bg-white/80 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg transition-all">
          <CardContent className="pt-6">
            <ScrollArea className="h-[calc(100vh-400px)] pr-4">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">Principes du jeu</h2>
                  <p className="text-gray-700 mb-4">Dutch est un jeu de cartes de plis, dans lequel chaque joueur essaie de faire exactement le nombre de plis annoncé avant le début de chaque manche.</p>
                  <p className="text-gray-700 mb-4">Les points sont calculés en fonction de la précision des prédictions faites par chaque joueur. À la fin du jeu, le joueur ayant accumulé le plus de points gagne.</p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">Préparation</h2>
                  <motion.ul 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                    className="list-disc list-inside text-gray-700 space-y-2"
                  >
                    <motion.li
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      Le jeu se joue avec un paquet standard de 52 cartes.
                    </motion.li>
                    <motion.li
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      Il peut être joué de 2 à 7 joueurs.
                    </motion.li>
                    <motion.li
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Chaque joueur reçoit le même nombre de cartes à chaque manche.
                    </motion.li>
                    <motion.li
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      Le nombre de cartes distribuées change à chaque manche selon un schéma prédéfini.
                    </motion.li>
                  </motion.ul>
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
        
        {/* Section pour poser des questions sur les règles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <Card className="rounded-3xl bg-white/80 backdrop-blur-md border border-white/40 shadow-md transition-all">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 text-dutch-purple" />
                <span className="bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                  Une question sur les règles?
                </span>
              </h3>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Est-ce que je peux... ?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="rounded-full bg-white/70 border-gray-200"
                  onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                />
                <Button 
                  onClick={handleAskQuestion} 
                  disabled={isLoading}
                  className="rounded-full bg-dutch-purple text-white hover:bg-dutch-purple/90 px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {(isLoading || answer) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4"
                >
                  <div className="p-4 rounded-xl bg-dutch-purple/10 border border-dutch-purple/20">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-t-2 border-dutch-purple rounded-full animate-spin"></div>
                        <span className="ml-2 text-dutch-purple/80">Réflexion en cours...</span>
                      </div>
                    ) : (
                      <p className="text-dutch-purple">{answer}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default RulesPage;
