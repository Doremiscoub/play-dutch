
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shuffle, Eye, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

const SetupTab = () => {
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Distribution des cartes */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-purple-500 to-trinity-blue-500 rounded-2xl p-4 text-white">
              <Shuffle className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-purple-600 to-trinity-blue-600 bg-clip-text text-transparent">
              Distribution des cartes
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-trinity-purple-50 to-trinity-blue-50 rounded-2xl p-6 border-2 border-trinity-purple-200">
              <h3 className="text-xl font-black text-gray-800 mb-4">🃏 Chaque joueur reçoit 4 cartes</h3>
              <div className="space-y-3">
                <p className="text-lg font-bold text-gray-700">
                  • Les cartes sont distribuées <span className="text-trinity-purple-600">face cachée</span>
                </p>
                <p className="text-lg font-bold text-gray-700">
                  • Chaque joueur dispose ses cartes <span className="text-trinity-blue-600">côte-à-côte en rangée</span> devant lui
                </p>
                <p className="text-lg font-bold text-gray-700">
                  • ⚠️ <strong>Important :</strong> Pas de grille 2×2, mais une <strong>ligne droite</strong> !
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placement des cartes */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-orange-500 to-trinity-purple-500 rounded-2xl p-4 text-white">
              <Layout className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-orange-600 to-trinity-purple-600 bg-clip-text text-transparent">
              Disposition des cartes
            </h2>
          </div>
          
          <div className="bg-gradient-to-r from-trinity-orange-50 to-trinity-purple-50 rounded-2xl p-6 border-2 border-trinity-orange-200">
            <div className="text-center mb-6">
              <h3 className="text-xl font-black text-gray-800 mb-4">📋 Exemple de disposition</h3>
              <div className="flex justify-center gap-4 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-16 h-24 bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 rounded-lg border-2 border-white shadow-lg flex items-center justify-center text-white font-black">
                    ?
                  </div>
                ))}
              </div>
              <p className="text-lg font-bold text-gray-700">
                ← Carte 1 | Carte 2 | Carte 3 | Carte 4 →
              </p>
            </div>
            
            <div className="bg-white/80 rounded-xl p-4">
              <h4 className="font-black text-gray-800 mb-2">💡 Astuce de placement :</h4>
              <p className="text-gray-700 font-semibold">
                Gardez toujours le même ordre pour vos cartes ! Cela vous aidera à mémoriser leur position pendant la partie.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Début de partie */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-blue-500 to-trinity-orange-500 rounded-2xl p-4 text-white">
              <Eye className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-blue-600 to-trinity-orange-600 bg-clip-text text-transparent">
              Début de partie
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-trinity-blue-50 to-trinity-orange-50 rounded-2xl p-6 border-2 border-trinity-blue-200">
              <h3 className="text-xl font-black text-gray-800 mb-4">👀 Phase de découverte</h3>
              <div className="space-y-4">
                <p className="text-lg font-bold text-gray-700">
                  <span className="text-trinity-blue-600">1.</span> Chaque joueur choisit et regarde <strong>2 cartes au choix</strong> parmi ses 4 cartes
                </p>
                <p className="text-lg font-bold text-gray-700">
                  <span className="text-trinity-orange-600">2.</span> Vous pouvez regarder : 2 cartes à gauche, 2 cartes à droite, ou 1 de chaque côté
                </p>
                <p className="text-lg font-bold text-gray-700">
                  <span className="text-trinity-purple-600">3.</span> Les 2 autres cartes restent <strong>inconnues</strong> jusqu'à ce que vous décidiez de les jouer
                </p>
              </div>
            </div>
            
            <div className="bg-trinity-orange-100 rounded-xl p-4 border border-trinity-orange-300">
              <h4 className="font-black text-trinity-orange-800 mb-2">⚡ Stratégie de départ :</h4>
              <p className="text-trinity-orange-700 font-semibold">
                Mémorisez bien vos 2 cartes vues ! Cette information sera cruciale pour prendre de bonnes décisions pendant la partie.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SetupTab;
