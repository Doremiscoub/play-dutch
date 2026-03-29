
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const IntroductionTab = () => {
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Objectif principal */}
      <Card className="bg-white border border-border shadow-md overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 rounded-2xl p-4 text-white">
              <Target className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-blue-600 to-trinity-purple-600 bg-clip-text text-transparent">
              Objectif du jeu
            </h2>
          </div>
          
          <div className="bg-gradient-to-r from-trinity-blue-50 to-trinity-purple-50 rounded-2xl p-6 border-2 border-trinity-blue-200">
            <p className="text-xl font-bold text-foreground mb-4">
              🎯 <strong>But principal :</strong> Obtenir le total de points le plus <span className="text-trinity-blue-600 font-black">BAS</span> après plusieurs manches.
            </p>
            <p className="text-lg text-foreground font-semibold">
              Contrairement à la plupart des jeux de cartes, ici vous voulez avoir le <strong>minimum de points possible</strong> ! 
              Certaines cartes rapportent même des points négatifs qui vous aideront à gagner.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Participants */}
      <Card className="bg-white border border-border shadow-md overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-trinity-orange-500 to-trinity-purple-500 rounded-2xl p-4 text-white">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-trinity-orange-600 to-trinity-purple-600 bg-clip-text text-transparent">
              Nombre de joueurs
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-trinity-orange-50 to-trinity-purple-50 rounded-xl p-6 border border-trinity-orange-200">
              <h3 className="text-xl font-black text-foreground mb-3">👥 Participants</h3>
              <p className="text-lg font-bold text-foreground">
                De <span className="text-trinity-orange-600">2 à 10 joueurs</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                Idéal entre 4 et 6 joueurs pour plus d'interactions !
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-trinity-purple-50 to-trinity-blue-50 rounded-xl p-6 border border-trinity-purple-200">
              <h3 className="text-xl font-black text-foreground mb-3">⏱️ Durée</h3>
              <p className="text-lg font-bold text-foreground">
                <span className="text-trinity-purple-600">15-30 minutes</span> par partie
              </p>
              <p className="text-sm text-muted-foreground mt-2 font-medium">
                Parfait pour une soirée entre amis !
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Message du Professeur Cartouche */}
      <Card className="bg-gradient-to-br from-trinity-orange-500 to-trinity-purple-500 border-0 shadow-md overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10" />
        <CardContent className="relative z-10 p-8">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl border border-white/30">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-black text-white mb-4">💡 Professeur Cartouche vous dit :</h3>
              <p className="text-lg font-bold text-white/95 leading-relaxed">
                "Le Dutch, c'est l'art de jouer petit pour gagner gros ! Mémorisez vos cartes, surveillez vos adversaires, 
                et n'oubliez pas : parfois il vaut mieux garder une mauvaise carte connue qu'échanger avec l'inconnu !"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IntroductionTab;
