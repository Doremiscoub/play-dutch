
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

const GameplayTab = () => {
  return (
    <Card className="vision-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-dutch-orange" />
          <h2 className="text-xl font-semibold text-dutch-orange">Déroulement du jeu</h2>
        </div>
        <div className="bg-dutch-orange/5 border border-dutch-orange/10 rounded-xl p-4 mt-4">
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
      </CardContent>
    </Card>
  );
};

export default GameplayTab;
