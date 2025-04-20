
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const SetupTab = () => {
  return (
    <Card className="vision-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-dutch-purple" />
          <h2 className="text-xl font-semibold text-dutch-purple">Préparation</h2>
        </div>
        <div className="bg-dutch-purple/5 border border-dutch-purple/10 rounded-xl p-4 mt-4">
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Utilisez un jeu de 52 cartes plus les 2 jokers.</li>
            <li>Chaque joueur reçoit 7 cartes.</li>
            <li>Le reste des cartes forme une pioche.</li>
            <li>Retournez la première carte de la pioche pour commencer la pile de défausse.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SetupTab;
