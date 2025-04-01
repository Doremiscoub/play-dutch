
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle, SendHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { animationVariants } from '@/utils/animationUtils';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const RulesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Fonction pour simuler une réponse de l'IA
  const simulateAIResponse = (question: string) => {
    setIsProcessing(true);
    
    // Prévoir les questions courantes
    const responses: { [key: string]: string } = {
      'dutch': "Faire un Dutch signifie que vous n'avez plus qu'une carte en main. Vous devez alors annoncer 'Dutch !' à voix haute. Si vous ne le faites pas et qu'un autre joueur le remarque, vous recevez une pénalité.",
      'pénalité': "Si vous oubliez d'annoncer 'Dutch' quand vous n'avez plus qu'une carte, ou si vous l'annoncez par erreur, vous prenez une pénalité de 2 cartes du talon.",
      'gagne': "Le gagnant est celui qui se débarrasse de toutes ses cartes en premier. Dans Dutch, avoir le moins de points à la fin est l'objectif.",
      'but': "L'objectif du jeu est de se débarrasser de toutes ses cartes le plus vite possible pour marquer le moins de points.",
      'joue': "Chaque joueur joue à son tour dans le sens des aiguilles d'une montre. Vous devez jouer une carte de même valeur ou de même couleur que la carte du dessus de la défausse.",
      'score': "Le score est calculé en additionnant la valeur des cartes restant dans votre main à la fin de la manche. Les cartes numérotées valent leur valeur faciale, les figures valent 10 points, et les jokers valent 20 points.",
      'cartes': "Un jeu complet de 52 cartes plus 2 jokers est utilisé pour jouer à Dutch.",
      'spéciale': "Les cartes spéciales incluent : le 2 (fait piocher 2 cartes), le Valet (change de sens), le 8 (saute le tour du joueur suivant), As (change la couleur), et le Joker (fait piocher 5 cartes et change la couleur).",
    };
    
    const keywords = Object.keys(responses);
    const matchedKeyword = keywords.find(keyword => 
      question.toLowerCase().includes(keyword.toLowerCase())
    );
    
    setTimeout(() => {
      if (matchedKeyword) {
        addMessage(responses[matchedKeyword], false);
      } else {
        addMessage("Je ne suis pas sûr de comprendre votre question. Essayez de demander quelque chose sur les règles de base, les cartes spéciales, les points, ou comment jouer à Dutch.", false);
      }
      setIsProcessing(false);
    }, 1000);
  };
  
  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser
    };
    setMessages(prev => [...prev, newMessage]);
  };
  
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    addMessage(inputValue, true);
    simulateAIResponse(inputValue);
    setInputValue('');
  };
  
  return (
    <PageLayout backgroundVariant="subtle">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-2">
            Règles du Dutch
          </h1>
          <p className="text-gray-600">
            Tout ce que vous devez savoir pour jouer comme un pro
          </p>
        </motion.div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Règles de base</TabsTrigger>
            <TabsTrigger value="special">Cartes spéciales</TabsTrigger>
            <TabsTrigger value="assistant">Assistant de règles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="mt-4">
            <Card className="bg-white/80 backdrop-blur-md">
              <CardContent className="pt-6">
                <motion.div 
                  variants={animationVariants.staggerChildren}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={animationVariants.staggerItem}>
                    <h2 className="text-xl font-semibold text-dutch-blue mb-2">Objectif du jeu</h2>
                    <p className="text-gray-700">
                      Le but du Dutch est d'être le premier à se débarrasser de toutes ses cartes. 
                      Le joueur qui gagne une manche ne reçoit aucun point, tandis que les autres joueurs 
                      marquent des points en fonction des cartes qu'ils ont encore en main.
                      Le joueur avec le moins de points à la fin de la partie est déclaré vainqueur.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={animationVariants.staggerItem}>
                    <h2 className="text-xl font-semibold text-dutch-blue mb-2">Préparation</h2>
                    <p className="text-gray-700">
                      Utilisez un jeu de 52 cartes plus les jokers. Chaque joueur reçoit 7 cartes.
                      Le reste des cartes forme une pioche. Retournez la première carte de la pioche 
                      pour commencer la pile de défausse.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={animationVariants.staggerItem}>
                    <h2 className="text-xl font-semibold text-dutch-blue mb-2">Déroulement du jeu</h2>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                      <li>Les joueurs jouent à tour de rôle dans le sens des aiguilles d'une montre.</li>
                      <li>À votre tour, vous devez jouer une carte de même couleur ou de même valeur que la carte du dessus de la défausse.</li>
                      <li>Si vous ne pouvez pas jouer, vous devez piocher une carte. Si cette carte peut être jouée, vous pouvez la poser immédiatement.</li>
                      <li>Quand vous n'avez plus qu'une seule carte en main, vous devez annoncer "Dutch!". Si vous oubliez et qu'un autre joueur le remarque, vous devez piocher 2 cartes de pénalité.</li>
                      <li>Le premier joueur à se débarrasser de toutes ses cartes gagne la manche.</li>
                    </ol>
                  </motion.div>
                  
                  <motion.div variants={animationVariants.staggerItem}>
                    <h2 className="text-xl font-semibold text-dutch-blue mb-2">Calcul des points</h2>
                    <p className="text-gray-700">
                      À la fin de chaque manche, les joueurs qui ont encore des cartes en main 
                      reçoivent des points selon les valeurs suivantes :
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-gray-700">
                      <li>Cartes numérotées (2-10) : Valeur faciale</li>
                      <li>Valet, Dame, Roi : 10 points chacun</li>
                      <li>As : 11 points</li>
                      <li>Joker : 20 points</li>
                    </ul>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="special" className="mt-4">
            <Card className="bg-white/80 backdrop-blur-md">
              <CardContent className="pt-6">
                <motion.div 
                  variants={animationVariants.staggerChildren}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <motion.div variants={animationVariants.staggerItem}>
                    <h2 className="text-xl font-semibold text-dutch-orange mb-2">Cartes à effets spéciaux</h2>
                    <p className="text-gray-700 mb-4">
                      Certaines cartes ont des effets spéciaux qui s'activent quand elles sont jouées :
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-white/60 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-dutch-blue/10 text-dutch-blue">2</Badge>
                          <h3 className="font-medium">Deux</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Le joueur suivant doit piocher 2 cartes et passer son tour.
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white/60 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-dutch-purple/10 text-dutch-purple">8</Badge>
                          <h3 className="font-medium">Huit</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Le joueur suivant passe son tour.
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white/60 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-dutch-orange/10 text-dutch-orange">J</Badge>
                          <h3 className="font-medium">Valet</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Change le sens du jeu (horaire à anti-horaire ou inversement).
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white/60 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-dutch-green/10 text-dutch-green">A</Badge>
                          <h3 className="font-medium">As</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Jouer un As permet de changer la couleur demandée.
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white/60 rounded-lg border border-gray-100 md:col-span-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-dutch-red/10 text-dutch-red">Joker</Badge>
                          <h3 className="font-medium">Joker</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Le joueur suivant doit piocher 5 cartes et passer son tour. Le joueur qui pose le Joker choisit la couleur.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={animationVariants.staggerItem}>
                    <h2 className="text-xl font-semibold text-dutch-orange mb-2">Combinaisons spéciales</h2>
                    <p className="text-gray-700 mb-4">
                      Le Dutch permet aussi certaines combinaisons de cartes pour des stratégies avancées :
                    </p>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-white/60 rounded-lg border border-gray-100">
                        <h3 className="font-medium mb-1">Cumul des effets "Pioche"</h3>
                        <p className="text-sm text-gray-600">
                          Si un joueur pose un 2 et que le joueur suivant a également un 2, il peut le jouer, 
                          et le joueur d'après devra alors piocher 4 cartes (2 + 2).
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white/60 rounded-lg border border-gray-100">
                        <h3 className="font-medium mb-1">Cartes identiques</h3>
                        <p className="text-sm text-gray-600">
                          Vous pouvez jouer plusieurs cartes de même valeur en un seul tour, 
                          quelle que soit leur couleur (exemple : tous les Rois ou tous les 5).
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="assistant" className="mt-4">
            <Card className="bg-white/80 backdrop-blur-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="text-dutch-purple h-5 w-5" />
                  <h2 className="text-xl font-semibold">Assistant de règles</h2>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Vous avez une question sur les règles ? Posez-la ici et l'assistant vous répondra.
                </p>
                
                <div className="bg-white/60 rounded-xl border border-gray-200 p-4 mb-4 h-64 overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <MessageCircle className="h-10 w-10 mb-2 opacity-20" />
                      <p>Posez une question sur les règles du Dutch</p>
                      <p className="text-xs mt-2">Exemple : "Comment fonctionne le Dutch ?"</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map(message => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3 rounded-lg max-w-[80%] ${
                            message.isUser 
                              ? 'bg-dutch-blue/10 text-dutch-blue ml-auto' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {message.content}
                        </motion.div>
                      ))}
                      {isProcessing && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-3 rounded-lg bg-gray-100 text-gray-700 max-w-[80%]"
                        >
                          <div className="flex gap-1">
                            <span className="animate-pulse">.</span>
                            <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                            <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
                
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Posez votre question sur les règles..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1"
                    disabled={isProcessing}
                  />
                  <Button 
                    type="submit" 
                    disabled={!inputValue.trim() || isProcessing}
                    className="bg-dutch-purple hover:bg-dutch-purple/90 text-white"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default RulesPage;
