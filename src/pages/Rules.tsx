
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedBackground from '@/components/AnimatedBackground';

const Rules: React.FC = () => {
  const [activeTab, setActiveTab] = useState('introduction');

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0">
        <AnimatedBackground variant="subtle" />
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
        
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent"
        >
          Règles du Dutch
        </motion.h1>
        
        <div className="mb-8">
          <Tabs defaultValue="introduction" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4">
              <TabsTrigger value="introduction">Introduction</TabsTrigger>
              <TabsTrigger value="setup">Mise en place</TabsTrigger>
              <TabsTrigger value="gameplay">Déroulement</TabsTrigger>
              <TabsTrigger value="special">Cartes spéciales</TabsTrigger>
            </TabsList>
            
            <TabsContent value="introduction" className="space-y-4">
              <Card className="vision-card">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Introduction au Dutch</h2>
                  <p className="text-gray-700">
                    Le Dutch est un jeu de cartes stratégique et social qui se joue généralement entre 2 et 10 joueurs.
                    L'objectif est d'éliminer vos cartes en faisant des combinaisons et en anticipant les actions des autres joueurs.
                    Le dernier joueur avec des cartes en main sera déclaré perdant !
                  </p>
                  <div className="mt-4 p-4 bg-dutch-purple/10 rounded-xl">
                    <p className="text-dutch-purple font-medium">
                      C'est un jeu qui mélange hasard, stratégie et bluff, parfait pour les soirées entre amis !
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="vision-card flex items-start p-6 gap-4">
                <div className="mt-1 bg-dutch-orange/20 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 text-dutch-orange" />
                </div>
                <div>
                  <h3 className="font-medium text-dutch-orange mb-1">Professeur Cartouche dit :</h3>
                  <p className="text-sm text-gray-700">
                    "Le Dutch, c'est comme la vie : parfois tu bluffes, parfois tu te plantes, mais c'est toujours plus fun quand t'as un verre à la main !"
                  </p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="setup" className="space-y-4">
              <Card className="vision-card">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Mise en place</h2>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li>Utilisez un jeu de 52 cartes standard.</li>
                    <li>Distribuez 5 cartes à chaque joueur.</li>
                    <li>Placez le reste des cartes face cachée au centre pour former la pioche.</li>
                    <li>Retournez la première carte de la pioche pour commencer la défausse.</li>
                    <li>Déterminez l'ordre de jeu (généralement dans le sens des aiguilles d'une montre).</li>
                    <li>Le premier joueur est celui à la gauche du donneur.</li>
                  </ol>
                  <div className="mt-6 p-4 bg-dutch-blue/10 rounded-xl">
                    <h3 className="font-medium text-dutch-blue mb-2">Astuce</h3>
                    <p className="text-sm">
                      Pour des parties plus courtes, commencez avec 3 ou 4 cartes par joueur.
                      Pour des parties plus stratégiques, commencez avec 7 cartes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gameplay" className="space-y-4">
              <Card className="vision-card">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Déroulement du jeu</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>À votre tour, vous pouvez :</p>
                    <ol className="list-decimal list-inside space-y-3 ml-4">
                      <li>Jouer une carte de même valeur ou de même couleur que celle sur le dessus de la défausse.</li>
                      <li>Jouer une carte spéciale (voir section Cartes spéciales).</li>
                      <li>Si vous ne pouvez pas jouer, piochez une carte et passez votre tour.</li>
                    </ol>
                    
                    <h3 className="font-medium mt-6 mb-2">Règles importantes :</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Si vous n'avez plus qu'une carte, vous devez annoncer "Dutch !" lorsque c'est votre tour.</li>
                      <li>Si vous oubliez d'annoncer "Dutch", et qu'un autre joueur le remarque avant que le joueur suivant ne joue, vous devez piocher deux cartes de pénalité.</li>
                      <li>Le premier joueur qui se débarrasse de toutes ses cartes gagne la manche.</li>
                      <li>Les autres joueurs marquent des points équivalents à la valeur des cartes qu'ils ont encore en main.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="vision-card flex items-start p-6 gap-4">
                <div className="mt-1 bg-dutch-orange/20 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 text-dutch-orange" />
                </div>
                <div>
                  <h3 className="font-medium text-dutch-orange mb-1">Professeur Cartouche dit :</h3>
                  <p className="text-sm text-gray-700">
                    "Si t'oublies de dire 'Dutch', t'es bon pour piocher deux cartes... C'est comme oublier de dire 'Tchine' quand on trinque, sauf que là tu te retrouves avec des cartes en plus au lieu d'avoir 7 ans de galère !"
                  </p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="special" className="space-y-4">
              <Card className="vision-card">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Cartes spéciales</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-10 bg-white border border-gray-300 rounded-md flex items-center justify-center font-bold text-red-600 text-2xl">A</div>
                      <div>
                        <h3 className="font-medium">As</h3>
                        <p className="text-gray-700">Change la couleur de jeu. Le joueur annonce la nouvelle couleur de son choix.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-10 bg-white border border-gray-300 rounded-md flex items-center justify-center font-bold text-black text-2xl">2</div>
                      <div>
                        <h3 className="font-medium">Deux</h3>
                        <p className="text-gray-700">Le joueur suivant doit piocher 2 cartes et passer son tour.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-10 bg-white border border-gray-300 rounded-md flex items-center justify-center font-bold text-red-600 text-2xl">8</div>
                      <div>
                        <h3 className="font-medium">Huit</h3>
                        <p className="text-gray-700">Le joueur suivant doit passer son tour.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-10 bg-white border border-gray-300 rounded-md flex items-center justify-center font-bold text-black text-2xl">J</div>
                      <div>
                        <h3 className="font-medium">Valet</h3>
                        <p className="text-gray-700">Inverse le sens du jeu.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-10 bg-white border border-gray-300 rounded-md flex items-center justify-center font-bold text-red-600 text-2xl">Q</div>
                      <div>
                        <h3 className="font-medium">Dame</h3>
                        <p className="text-gray-700">Permet de regarder une de ses cartes, ou si toutes sont connues, une carte d'un adversaire.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-10 bg-white border border-gray-300 rounded-md flex items-center justify-center font-bold text-black text-2xl">K</div>
                      <div>
                        <h3 className="font-medium">Roi</h3>
                        <p className="text-gray-700">Le joueur rejoue immédiatement.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="vision-card flex items-start p-6 gap-4">
                <div className="mt-1 bg-dutch-orange/20 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 text-dutch-orange" />
                </div>
                <div>
                  <h3 className="font-medium text-dutch-orange mb-1">Professeur Cartouche dit :</h3>
                  <p className="text-sm text-gray-700">
                    "Si t'as un Roi en main, garde-le pour le grand final. Y'a rien de plus beau que de voir la tête de tes potes quand tu joues deux cartes d'affilée pour gagner. Ça, c'est du grand art !"
                  </p>
                </div>
              </Card>
              
              <div className="p-4 bg-dutch-blue/10 rounded-xl mt-4">
                <h3 className="font-medium text-dutch-blue mb-2">Une question ?</h3>
                <p className="text-sm text-gray-700">
                  Vous avez une question sur les règles ou besoin de précisions ? 
                  N'hésitez pas à demander au Professeur Cartouche !
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Rules;
