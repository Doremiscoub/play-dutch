
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const SpecialCardsTab = () => {
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Pouvoirs des cartes */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-purple-500 to-trinity-blue-500 rounded-2xl p-4 text-white">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-purple-600 to-trinity-blue-600 bg-clip-text text-transparent">
              Pouvoirs des cartes
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pouvoir Dame */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl font-black mb-2">Q</div>
                  <h3 className="text-2xl font-black">Dame</h3>
                  <div className="text-xl font-bold opacity-90">Pouvoir Regarder</div>
                </div>
                
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="font-black mb-3">🔍 Activation :</h4>
                  <p className="font-bold mb-4">
                    Quand tu poses ou dévoiles une Dame
                  </p>
                  
                  <h4 className="font-black mb-3">✨ Effet :</h4>
                  <div className="space-y-2">
                    <p className="font-bold">
                      • Choisis 1 carte NON vue de tes cartes
                    </p>
                    <p className="font-bold">
                      • Si tu as déjà vu toutes tes 4 cartes : regarde 1 carte adverse (sans la montrer)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pouvoir Valet */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-5xl font-black mb-2">J</div>
                  <h3 className="text-2xl font-black">Valet</h3>
                  <div className="text-xl font-bold opacity-90">Pouvoir Échanger</div>
                </div>
                
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="font-black mb-3">🔄 Activation :</h4>
                  <p className="font-bold mb-4">
                    Quand tu poses ou dévoiles un Valet
                  </p>
                  
                  <h4 className="font-black mb-3">✨ Effet :</h4>
                  <div className="space-y-2">
                    <p className="font-bold">
                      • Échange IMMÉDIATEMENT une de tes cartes (vue ou non) avec une carte adverse (vue ou non)
                    </p>
                    <p className="font-bold">
                      • L'échange se fait sans révéler les cartes
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Stratégies et astuces */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-blue-500 to-trinity-orange-500 rounded-2xl p-4 text-white">
              <RefreshCw className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-blue-600 to-trinity-orange-600 bg-clip-text text-transparent">
              Bonnes pratiques
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-trinity-blue-50 to-trinity-orange-50 rounded-2xl p-6 border-2 border-trinity-blue-200">
              <h3 className="text-xl font-black text-gray-800 mb-4">💡 Conseils stratégiques</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="bg-white/80 rounded-xl p-4">
                    <h4 className="font-black text-gray-800 mb-2">🔢 Scores négatifs</h4>
                    <p className="text-gray-700 font-semibold">
                      Gérer les scores négatifs avec attention - ils sont votre meilleur atout !
                    </p>
                  </div>
                  
                  <div className="bg-white/80 rounded-xl p-4">
                    <h4 className="font-black text-gray-800 mb-2">👑 Différence Rois</h4>
                    <p className="text-gray-700 font-semibold">
                      Noir = 0 pt (bon) vs Rouge = 15 pts (catastrophique)
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white/80 rounded-xl p-4">
                    <h4 className="font-black text-gray-800 mb-2">🧠 Mémoire</h4>
                    <p className="text-gray-700 font-semibold">
                      Mémorisez vos cartes et observez les actions adverses
                    </p>
                  </div>
                  
                  <div className="bg-white/80 rounded-xl p-4">
                    <h4 className="font-black text-gray-800 mb-2">⚡ Timing</h4>
                    <p className="text-gray-700 font-semibold">
                      Utilisez les pouvoirs au bon moment pour maximiser l'effet
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-trinity-orange-100 rounded-xl p-6 border border-trinity-orange-300">
              <h4 className="font-black text-trinity-orange-800 mb-3">🎯 Astuce de pro :</h4>
              <p className="text-trinity-orange-700 font-semibold text-lg">
                Les Dames et Valets sont à double tranchant : ils valent 10 points mais leurs pouvoirs peuvent changer la donne. 
                Utilisez-les stratégiquement pour perturber vos adversaires tout en minimisant leur impact sur votre score !
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SpecialCardsTab;
