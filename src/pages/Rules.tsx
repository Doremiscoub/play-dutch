
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';

const Rules: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0">
        <AnimatedBackground variant="subtle" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-8 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
          Règles du jeu
        </h1>
        
        <div className="vision-card p-6">
          <h2 className="text-xl font-medium mb-4 text-dutch-blue">Comment jouer à Dutch</h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              Dutch est un jeu de cartes traditionnel et convivial. Voici les règles de base:
            </p>
            
            <div className="bg-white/50 rounded-xl p-4 space-y-2">
              <h3 className="font-medium text-dutch-purple">Préparation</h3>
              <p className="text-sm">Utilisez un jeu de 52 cartes. Distribuez toutes les cartes aux joueurs.</p>
            </div>
            
            <div className="bg-white/50 rounded-xl p-4 space-y-2">
              <h3 className="font-medium text-dutch-purple">Déroulement</h3>
              <ol className="text-sm space-y-2 list-decimal list-inside">
                <li>Le joueur avec la carte la plus basse commence.</li>
                <li>À votre tour, jouez une ou plusieurs cartes de même valeur.</li>
                <li>Le joueur suivant doit jouer le même nombre de cartes d'une valeur supérieure.</li>
                <li>Si un joueur ne peut pas ou ne veut pas jouer, il passe son tour.</li>
                <li>Quand tous les joueurs passent, le dernier joueur à avoir posé des cartes remporte la manche et commence la suivante.</li>
              </ol>
            </div>
            
            <div className="bg-white/50 rounded-xl p-4 space-y-2">
              <h3 className="font-medium text-dutch-purple">Fin de la partie</h3>
              <p className="text-sm">Le premier joueur qui n'a plus de cartes gagne la partie.</p>
            </div>
            
            <p className="text-sm text-dutch-orange italic">
              N'oubliez pas que l'application Dutch vous aide à suivre les scores et les statistiques, mais le jeu réel se déroule avec de vraies cartes !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
