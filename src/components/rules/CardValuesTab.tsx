import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Crown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const CardValuesTab = () => {
  const cardValues = [
    { name: 'As', symbol: 'A', points: -1, color: 'text-green-600', bgColor: 'from-green-400 to-emerald-500', description: 'Très avantageux !' },
    { name: 'Joker', symbol: '🃏', points: -3, color: 'text-green-700', bgColor: 'from-green-500 to-emerald-600', description: 'Le meilleur score !' },
    { name: 'Roi noir', symbol: '♠/♣', points: 0, color: 'text-blue-600', bgColor: 'from-blue-400 to-blue-500', description: 'Roi de Pique ou Trèfle' },
    { name: 'Roi rouge', symbol: '♥/♦', points: 15, color: 'text-red-600', bgColor: 'from-red-400 to-red-500', description: 'Roi de Cœur ou Carreau' },
    { name: 'Dame', symbol: 'Q', points: 10, color: 'text-purple-600', bgColor: 'from-purple-400 to-purple-500', description: '+ Pouvoir Regarder' },
    { name: 'Valet', symbol: 'J', points: 10, color: 'text-orange-600', bgColor: 'from-orange-400 to-orange-500', description: '+ Pouvoir Échanger' },
  ];

  const numberCards = [
    { range: '2 → 10', description: 'Valeur faciale de la carte' }
  ];

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Cartes spéciales */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-purple-500 to-trinity-blue-500 rounded-2xl p-4 text-white">
              <Star className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-purple-600 to-trinity-blue-600 bg-clip-text text-transparent">
              Valeur des cartes
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardValues.map((card, index) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${card.bgColor} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-black mb-2">{card.symbol}</div>
                    <h3 className="text-xl font-black">{card.name}</h3>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-black mb-2">
                      {card.points > 0 ? '+' : ''}{card.points} pts
                    </div>
                    <p className="text-sm font-bold opacity-90">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cartes numériques */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-orange-500 to-trinity-purple-500 rounded-2xl p-4 text-white">
              <Crown className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-orange-600 to-trinity-purple-600 bg-clip-text text-transparent">
              Cartes numériques
            </h2>
          </div>
          
          <div className="bg-gradient-to-r from-trinity-orange-50 to-trinity-purple-50 rounded-2xl p-6 border-2 border-trinity-orange-200">
            <div className="text-center">
              <div className="flex justify-center gap-4 mb-6">
                {['2', '3', '4', '5', '6', '7', '8', '9', '10'].map((num, index) => (
                  <div key={num} className={`w-12 h-16 bg-gradient-to-br from-trinity-blue-400 to-trinity-purple-400 rounded-lg border-2 border-white shadow-lg flex items-center justify-center text-white font-black text-sm ${index > 6 ? 'hidden md:flex' : ''}`}>
                    {num}
                  </div>
                ))}
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-4">Cartes 2 à 10</h3>
              <p className="text-xl font-bold text-gray-700">
                Valeur = <span className="text-trinity-orange-600">Chiffre inscrit sur la carte</span>
              </p>
              <div className="mt-4 bg-white/80 rounded-xl p-4">
                <p className="text-gray-600 font-semibold">
                  Exemple : Un 7 de cœur = 7 points, un 3 de pique = 3 points
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Point important */}
      <Card className="bg-gradient-to-br from-trinity-blue-600 to-trinity-purple-600 backdrop-blur-xl border-0 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10" />
        <CardContent className="relative z-10 p-8">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-white mb-4">📊 Point clé à retenir</h3>
              <p className="text-lg font-bold text-white/95 leading-relaxed">
                <strong>Attention aux Rois !</strong> Les Rois noirs (♠️ ♣️) valent 0 point (excellent), 
                mais les Rois rouges (♥️ ♦️) valent 15 points (catastrophique) ! 
                Ne les confondez jamais ! 🔴⚫
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CardValuesTab;