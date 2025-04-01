
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';

const RulesPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout
      title="Règles du Dutch"
      subtitle="Apprenez à jouer comme un pro"
      showBackButton={true}
    >
      <div className="mb-8 bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-dutch-purple/10 rounded-full">
            <HelpCircle className="h-6 w-6 text-dutch-purple" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-dutch-purple mb-1">Une question sur les règles ?</h3>
            <p className="text-sm text-gray-600">Demandez au Professeur Cartouche !</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="setup">Mise en place</TabsTrigger>
          <TabsTrigger value="gameplay">Déroulement</TabsTrigger>
          <TabsTrigger value="cards">Cartes spéciales</TabsTrigger>
          <TabsTrigger value="tips">Astuces</TabsTrigger>
          <TabsTrigger value="scoring">Scores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup">
          <Card className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/30 shadow-sm">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-dutch-blue">Mise en place</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Matériel nécessaire</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Un jeu de 52 cartes</li>
                    <li>2 à 10 joueurs</li>
                    <li>L'application Dutch pour suivre les scores</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Distribution</h4>
                  <p className="text-gray-700 text-sm">
                    Chaque joueur reçoit 4 cartes face cachée disposées en carré.
                    Les joueurs ne peuvent pas regarder leurs cartes au début du jeu.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">But du jeu</h4>
                  <p className="text-gray-700 text-sm">
                    Avoir le moins de points possible à la fin de la partie. Le premier joueur qui dépasse 100 points déclenche la fin de la partie, et le joueur avec le moins de points remporte la victoire.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gameplay">
          <Card className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/30 shadow-sm">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-dutch-blue">Déroulement de la partie</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Tour de jeu</h4>
                  <p className="text-gray-700 text-sm">
                    À son tour, un joueur doit :
                  </p>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 pl-2 text-sm">
                    <li>Piocher une carte</li>
                    <li>Soit la garder en remplaçant une de ses cartes face cachée</li>
                    <li>Soit la défausser face visible au centre</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Connaître ses cartes</h4>
                  <p className="text-gray-700 text-sm">
                    Au début, aucun joueur ne connaît ses cartes. C'est en remplaçant progressivement ses cartes face cachée par celles piochées que l'on découvre son jeu.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Annoncer "Dutch"</h4>
                  <p className="text-gray-700 text-sm">
                    Quand un joueur pense avoir le jeu avec le moins de points, il peut crier "Dutch" à n'importe quel moment. La manche s'arrête immédiatement, tous les joueurs retournent leurs cartes et on compte les points.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Fin de la manche</h4>
                  <p className="text-gray-700 text-sm">
                    Si le joueur qui a crié "Dutch" a effectivement le moins de points (ou à égalité), les autres joueurs marquent leurs points. S'il s'est trompé, lui seul prend une pénalité de 10 points, et les autres joueurs ne marquent rien.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cards">
          <Card className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/30 shadow-sm">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-dutch-blue">Cartes spéciales</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-dutch-blue/10 flex items-center justify-center text-dutch-blue font-bold">
                    K
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Roi</h4>
                    <p className="text-gray-700 text-sm">
                      Permet d'échanger une de vos cartes avec une carte d'un adversaire, sans les regarder.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-dutch-purple/10 flex items-center justify-center text-dutch-purple font-bold">
                    Q
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Dame</h4>
                    <p className="text-gray-700 text-sm">
                      Permet de regarder une de vos cartes. Si vous connaissez déjà toutes vos cartes, vous pouvez l'utiliser pour regarder une carte d'un adversaire.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-dutch-orange/10 flex items-center justify-center text-dutch-orange font-bold">
                    J
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Valet</h4>
                    <p className="text-gray-700 text-sm">
                      Permet d'échanger deux de vos cartes, sans les regarder.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 font-bold">
                    8
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Huit</h4>
                    <p className="text-gray-700 text-sm">
                      Regardez secrètement la carte du dessus de la pioche, puis remettez-la ou utilisez-la.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 font-bold">
                    10
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Dix</h4>
                    <p className="text-gray-700 text-sm">
                      Jetez un coup d'œil à deux de vos cartes, puis remettez-les à leur place.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tips">
          <Card className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/30 shadow-sm">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-dutch-blue">Astuces de jeu</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Mémorisation</h4>
                  <p className="text-gray-700 text-sm">
                    Mémorisez bien la position de vos cartes, surtout après avoir utilisé un Roi, une Dame ou un Valet.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Bluff</h4>
                  <p className="text-gray-700 text-sm">
                    N'hésitez pas à simuler la confiance même avec un mauvais jeu pour déstabiliser vos adversaires.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Timing</h4>
                  <p className="text-gray-700 text-sm">
                    Criez "Dutch" dès que vous pensez avoir un bon jeu, mais pas trop tôt car les pénalités sont lourdes.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Observation</h4>
                  <p className="text-gray-700 text-sm">
                    Observez les réactions des autres joueurs quand ils regardent leurs cartes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scoring">
          <Card className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/30 shadow-sm">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-dutch-blue">Calcul des scores</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Valeur des cartes</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>As: 1 point</li>
                    <li>2 à 10: Valeur faciale</li>
                    <li>Valet: 11 points</li>
                    <li>Dame: 12 points</li>
                    <li>Roi: 13 points</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Combinaisons</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Deux cartes de même valeur côte à côte = 0 point</li>
                    <li>Deux cartes de même valeur en diagonale = 0 point</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Fin de partie</h4>
                  <p className="text-gray-700 text-sm">
                    La partie s'arrête dès qu'un joueur atteint ou dépasse 100 points. Le joueur avec le moins de points est déclaré vainqueur.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default RulesPage;
