
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle, SendHorizontal, Info, BookOpen, Heart } from 'lucide-react';
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
            <span className="ml-2 text-sm">✨</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Le Dutch est un jeu de cartes passionnant et stratégique qui se joue entre amis. 
            L'objectif est simple : être le premier à se débarrasser de toutes ses cartes ! 
            Découvrez ci-dessous tout ce que vous devez savoir pour devenir un maître du Dutch.
          </p>
        </motion.div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" /> Règles de base
            </TabsTrigger>
            <TabsTrigger value="special" className="flex items-center gap-1">
              <Info className="h-4 w-4" /> Cartes spéciales
            </TabsTrigger>
            <TabsTrigger value="assistant" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" /> Assistant
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="mt-4">
            <Card className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50">
              <CardContent className="pt-6">
                <motion.div 
                  variants={animationVariants.staggerChildren}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  <motion.div variants={animationVariants.staggerItem} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-dutch-blue" />
                      <h2 className="text-xl font-semibold text-dutch-blue">Objectif du jeu</h2>
                    </div>
                    <div className="bg-dutch-blue/5 border border-dutch-blue/10 rounded-xl p-4">
                      <p className="text-gray-700">
                        Le but du Dutch est d'être le premier à se débarrasser de toutes ses cartes. 
                        Le joueur qui gagne une manche ne reçoit aucun point, tandis que les autres joueurs 
                        marquent des points en fonction des cartes qu'ils ont encore en main.
                        <strong className="block mt-2">Le joueur avec le moins de points à la fin de la partie est déclaré vainqueur.</strong>
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={animationVariants.staggerItem} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-dutch-purple" />
                      <h2 className="text-xl font-semibold text-dutch-purple">Préparation</h2>
                    </div>
                    <div className="bg-dutch-purple/5 border border-dutch-purple/10 rounded-xl p-4">
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Utilisez un jeu de 52 cartes plus les 2 jokers.</li>
                        <li>Chaque joueur reçoit 7 cartes.</li>
                        <li>Le reste des cartes forme une pioche.</li>
                        <li>Retournez la première carte de la pioche pour commencer la pile de défausse.</li>
                      </ul>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={animationVariants.staggerItem} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-dutch-orange" />
                      <h2 className="text-xl font-semibold text-dutch-orange">Déroulement du jeu</h2>
                    </div>
                    <div className="bg-dutch-orange/5 border border-dutch-orange/10 rounded-xl p-4">
                      <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                        <li className="p-2 bg-white/50 rounded-lg">Les joueurs jouent à tour de rôle dans le sens des aiguilles d'une montre.</li>
                        <li className="p-2 bg-white/50 rounded-lg">À votre tour, vous devez jouer une carte de même couleur ou de même valeur que la carte du dessus de la défausse.</li>
                        <li className="p-2 bg-white/50 rounded-lg">Si vous ne pouvez pas jouer, vous devez piocher une carte. Si cette carte peut être jouée, vous pouvez la poser immédiatement.</li>
                        <li className="p-2 bg-white/50 rounded-lg transition-colors hover:bg-dutch-orange/10">
                          <span className="font-medium">Règle du Dutch :</span> Quand vous n'avez plus qu'une seule carte en main, vous devez annoncer "Dutch!". Si vous oubliez et qu'un autre joueur le remarque, vous devez piocher 2 cartes de pénalité.
                        </li>
                        <li className="p-2 bg-white/50 rounded-lg">Le premier joueur à se débarrasser de toutes ses cartes gagne la manche.</li>
                      </ol>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={animationVariants.staggerItem} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                      <h2 className="text-xl font-semibold text-green-600">Calcul des points</h2>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                      <p className="text-gray-700 mb-3">
                        À la fin de chaque manche, les joueurs qui ont encore des cartes en main 
                        reçoivent des points selon les valeurs suivantes :
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <h4 className="font-medium text-gray-800 mb-1">Cartes numérotées (2-10)</h4>
                          <p className="text-gray-600">Valeur faciale (2 = 2 points, etc.)</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <h4 className="font-medium text-gray-800 mb-1">Valet, Dame, Roi</h4>
                          <p className="text-gray-600">10 points chacun</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <h4 className="font-medium text-gray-800 mb-1">As</h4>
                          <p className="text-gray-600">11 points</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <h4 className="font-medium text-gray-800 mb-1">Joker</h4>
                          <p className="text-gray-600">20 points</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="special" className="mt-4">
            <Card className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50">
              <CardContent className="pt-6">
                <motion.div 
                  variants={animationVariants.staggerChildren}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  <motion.div variants={animationVariants.staggerItem}>
                    <h2 className="text-xl font-semibold text-dutch-purple mb-4 flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Cartes à effets spéciaux
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Le Dutch est rendu plus stratégique et amusant grâce aux effets spéciaux de certaines cartes.
                      Maîtrisez-les pour prendre l'avantage sur vos adversaires !
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div 
                        variants={animationVariants.staggerItem}
                        className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center font-bold text-2xl text-dutch-blue border border-dutch-blue/20">
                            2
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Deux</h3>
                            <p className="text-sm text-gray-600">Pioche +2</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Le joueur suivant doit piocher 2 cartes et passer son tour, sauf s'il possède également un 2 qu'il peut jouer pour cumuler l'effet (le joueur d'après piochera alors 4 cartes).
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        variants={animationVariants.staggerItem}
                        className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center font-bold text-2xl text-dutch-purple border border-dutch-purple/20">
                            8
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Huit</h3>
                            <p className="text-sm text-gray-600">Passe tour</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Le joueur suivant passe son tour. Cette carte est particulièrement utile quand vous avez peu de cartes et souhaitez accélérer votre victoire.
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        variants={animationVariants.staggerItem}
                        className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center font-bold text-2xl text-dutch-orange border border-dutch-orange/20">
                            J
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Valet</h3>
                            <p className="text-sm text-gray-600">Inversement</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Change le sens du jeu (horaire à anti-horaire ou inversement). Stratégique si le joueur après vous a peu de cartes ou si vous voulez éviter qu'un joueur fort joue trop vite.
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        variants={animationVariants.staggerItem}
                        className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center font-bold text-2xl text-green-600 border border-green-200">
                            A
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">As</h3>
                            <p className="text-sm text-gray-600">Changement de couleur</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Jouer un As permet de changer la couleur demandée. Vous annoncez la nouvelle couleur et le joueur suivant doit jouer cette couleur ou un autre As.
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        variants={animationVariants.staggerItem}
                        className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-shadow md:col-span-2"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center font-bold text-xl text-red-500 border border-red-200">
                            <span className="transform rotate-90">&#x1F0DF;</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">Joker</h3>
                            <p className="text-sm text-gray-600">Pioche +5 et changement de couleur</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          La carte la plus puissante ! Le joueur suivant doit piocher 5 cartes et passer son tour. Le joueur qui pose le Joker choisit également la couleur pour le joueur d'après.
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={animationVariants.staggerItem} className="mt-8">
                    <h2 className="text-xl font-semibold text-dutch-orange mb-4 flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Combinaisons et stratégies avancées
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="bg-dutch-orange/5 border border-dutch-orange/10 rounded-xl p-4">
                        <h3 className="font-medium text-dutch-orange mb-2">Cumul des effets "Pioche"</h3>
                        <p className="text-gray-700">
                          Si un joueur pose un 2 et que le joueur suivant a également un 2, il peut le jouer, 
                          et le joueur d'après devra alors piocher 4 cartes (2 + 2). Ce principe s'applique aussi aux Jokers !
                        </p>
                      </div>
                      
                      <div className="bg-dutch-purple/5 border border-dutch-purple/10 rounded-xl p-4">
                        <h3 className="font-medium text-dutch-purple mb-2">Cartes identiques</h3>
                        <p className="text-gray-700">
                          Vous pouvez jouer plusieurs cartes de même valeur en un seul tour, 
                          quelle que soit leur couleur (exemple : tous les Rois ou tous les 5).
                          C'est une excellente façon de se débarrasser rapidement de plusieurs cartes.
                        </p>
                      </div>
                      
                      <div className="bg-dutch-blue/5 border border-dutch-blue/10 rounded-xl p-4">
                        <h3 className="font-medium text-dutch-blue mb-2">Tactique du Dutch</h3>
                        <p className="text-gray-700">
                          N'oubliez jamais d'annoncer "Dutch" quand il ne vous reste qu'une seule carte !
                          En même temps, surveillez attentivement vos adversaires - si l'un d'eux oublie d'annoncer "Dutch",
                          faites-le remarquer immédiatement pour lui faire piocher 2 cartes supplémentaires.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="assistant" className="mt-4">
            <Card className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="text-dutch-purple h-5 w-5" />
                  <h2 className="text-xl font-semibold">Assistant de règles</h2>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Vous avez une question spécifique sur les règles ? Posez-la ici et l'assistant vous répondra immédiatement.
                  Essayez par exemple de demander "Comment fonctionne le Dutch ?" ou "Que valent les cartes spéciales ?".
                </p>
                
                <div className="bg-white/60 rounded-xl border border-gray-200 p-4 mb-4 h-64 overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <MessageCircle className="h-10 w-10 mb-2 opacity-20" />
                      <p>Posez une question sur les règles du Dutch</p>
                      <div className="flex gap-2 mt-4 text-xs">
                        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => {
                          setInputValue("Qu'est-ce que le Dutch ?");
                          handleSendMessage();
                        }}>Qu'est-ce que le Dutch ?</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => {
                          setInputValue("Comment calculer les scores ?");
                          handleSendMessage();
                        }}>Calcul des scores</Badge>
                      </div>
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
                    className="flex-1 bg-white border-gray-200 focus:border-dutch-purple/50"
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
