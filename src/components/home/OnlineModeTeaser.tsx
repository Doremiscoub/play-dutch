import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Clock, Users, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OnlineModeTeaser: React.FC = () => {
  return (
    <section className="relative py-24 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-4 px-4 py-2 text-sm font-bold">
            🚀 Bientôt disponible
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight py-2">
            🌐 Mode En Ligne Dutch 🌐
          </h2>
          <p className="text-xl text-neutral-700 font-bold max-w-4xl mx-auto mb-8">
            Préparez-vous à découvrir le Dutch en ligne complet ! Jouez contre vos amis à distance avec des cartes virtuelles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Version actuelle */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🃏</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-green-800">Version Actuelle</h3>
                    <Badge className="bg-green-500 text-white text-xs">✅ Disponible maintenant</Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-semibold">Application compagnon</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-semibold">Cartes physiques requises</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-semibold">Calcul automatique des scores</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-semibold">Professeur Cartouche inclus</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Version future */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-lg relative overflow-hidden">
              {/* Effet brillant */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Wifi className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-purple-800">Version En Ligne</h3>
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">🔜 Bientôt</Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700 font-semibold">Jeu en ligne complet</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700 font-semibold">Multijoueur à distance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700 font-semibold">Parties en temps réel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700 font-semibold">Cartes virtuelles intégrées</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 border-2 border-purple-200">
            <h4 className="text-lg font-black text-purple-800 mb-4">🗓️ Roadmap de développement</h4>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-green-800">Aujourd'hui : App compagnon</span>
              </div>
              <div className="w-6 h-0.5 bg-gradient-to-r from-green-500 to-purple-500 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-purple-800">2025 : Mode en ligne</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OnlineModeTeaser;