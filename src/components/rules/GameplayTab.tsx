
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle, RefreshCw, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const GameplayTab = () => {
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Tour de jeu */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 rounded-2xl p-4 text-white">
              <PlayCircle className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-blue-600 to-trinity-purple-600 bg-clip-text text-transparent">
              Déroulement d'un tour
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-trinity-blue-50 to-trinity-purple-50 rounded-2xl p-6 border-2 border-trinity-blue-200">
              <h3 className="text-xl font-black text-gray-800 mb-4">🎯 Actions possibles à votre tour (sens horaire)</h3>
              
              <div className="space-y-4">
                <div className="bg-white/80 rounded-xl p-4 border-l-4 border-trinity-blue-500">
                  <h4 className="font-black text-gray-800 mb-2">1️⃣ Piocher ou prendre la défausse</h4>
                  <p className="text-gray-700 font-semibold">
                    Soit vous piochez une carte de la pile, soit vous prenez la carte du dessus de la défausse.
                  </p>
                </div>
                
                <div className="bg-white/80 rounded-xl p-4 border-l-4 border-trinity-purple-500">
                  <h4 className="font-black text-gray-800 mb-2">2️⃣ Choisir votre action</h4>
                  <div className="space-y-2 ml-4">
                    <p className="text-gray-700 font-semibold">
                      <strong>a)</strong> Remplacer une de vos cartes face cachée (la nouvelle devient visible)
                    </p>
                    <p className="text-gray-700 font-semibold">
                      <strong>b)</strong> Défausser et retourner une de vos cartes pour appliquer son pouvoir
                    </p>
                    <p className="text-gray-700 font-semibold">
                      <strong>c)</strong> Défausser directement si la carte piochée est mauvaise
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-xl p-4 border-l-4 border-trinity-orange-500">
                  <h4 className="font-black text-gray-800 mb-2">3️⃣ Fin de tour spéciale</h4>
                  <p className="text-gray-700 font-semibold">
                    Si vous pensez avoir le plus petit total, vous pouvez "sonner" la fin - tous les autres jouent encore une fois !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fin de manche */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-orange-500 to-trinity-purple-500 rounded-2xl p-4 text-white">
              <RefreshCw className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-orange-600 to-trinity-purple-600 bg-clip-text text-transparent">
              Fin de manche
            </h2>
          </div>
          
          <div className="bg-gradient-to-r from-trinity-orange-50 to-trinity-purple-50 rounded-2xl p-6 border-2 border-trinity-orange-200">
            <div className="space-y-4">
              <div className="bg-white/80 rounded-xl p-4">
                <h4 className="font-black text-gray-800 mb-2">📊 Décompte des points</h4>
                <div className="space-y-2">
                  <p className="text-gray-700 font-semibold">• Toutes les cartes sont révélées</p>
                  <p className="text-gray-700 font-semibold">• Chaque joueur compte ses points (négatifs inclus)</p>
                  <p className="text-gray-700 font-semibold">• Le joueur avec le <strong>plus bas score</strong> remporte la manche</p>
                </div>
              </div>
              
              <div className="bg-trinity-orange-100 rounded-xl p-4 border border-trinity-orange-300">
                <h4 className="font-black text-trinity-orange-800 mb-2">🏆 Score cumulé</h4>
                <p className="text-trinity-orange-700 font-semibold">
                  Le gagnant additionne son total au score cumulé des autres joueurs (optionnel : tenue d'un historique).
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fin de partie */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-purple-500 to-trinity-blue-500 rounded-2xl p-4 text-white">
              <Trophy className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-purple-600 to-trinity-blue-600 bg-clip-text text-transparent">
              Fin de partie
            </h2>
          </div>
          
          <div className="bg-gradient-to-r from-trinity-purple-50 to-trinity-blue-50 rounded-2xl p-6 border-2 border-trinity-purple-200">
            <div className="space-y-4">
              <div className="bg-white/80 rounded-xl p-4">
                <h4 className="font-black text-gray-800 mb-2">🎯 Condition de fin</h4>
                <p className="text-gray-700 font-semibold">
                  On joue autant de manches que nécessaire jusqu'à ce qu'un joueur atteigne ou dépasse la <strong>limite fixée</strong> (ex: 100 pts).
                </p>
              </div>
              
              <div className="bg-white/80 rounded-xl p-4">
                <h4 className="font-black text-gray-800 mb-2">🏆 Vainqueur final</h4>
                <p className="text-gray-700 font-semibold">
                  Le gagnant est celui avec le <span className="text-trinity-purple-600 font-black">plus petit score cumulé</span> à la fin !
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GameplayTab;
