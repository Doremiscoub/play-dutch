
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const IntroductionTab = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default IntroductionTab;
