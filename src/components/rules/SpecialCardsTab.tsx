
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

const SpecialCardsTab = () => {
  return (
    <Card className="vision-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          <h2 className="text-xl font-semibold text-dutch-purple">Cartes spéciales</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Action cards */}
          <div className="space-y-4">
            {[
              { value: '2', title: 'Deux', effect: 'Pioche +2', description: 'Le joueur suivant doit piocher 2 cartes et passer son tour.' },
              { value: '8', title: 'Huit', effect: 'Passe tour', description: 'Le joueur suivant passe son tour.' },
              { value: 'J', title: 'Valet', effect: 'Inversement', description: 'Change le sens du jeu.' },
              { value: 'A', title: 'As', effect: 'Change couleur', description: 'Permet de changer la couleur demandée.' }
            ].map((card) => (
              <div key={card.value} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center font-bold text-2xl text-dutch-blue border border-dutch-blue/20">
                    {card.value}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.effect}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
          
          {/* Joker card */}
          <div className="md:col-span-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-shadow">
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialCardsTab;
