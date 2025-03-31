
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RulesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-4 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-dutch-blue">Règles du jeu</h1>
      </div>

      <div className="dutch-card mb-6">
        <h2 className="text-xl font-semibold mb-2 text-dutch-blue">À propos de Dutch</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• 2 à 10 joueurs</li>
          <li>• Environ 30 minutes</li>
          <li>• Objectif : Avoir le score le plus bas</li>
        </ul>
      </div>

      <div className="dutch-card mb-6">
        <h2 className="text-xl font-semibold mb-2 text-dutch-blue">Déroulement</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            Chaque joueur reçoit 4 cartes face cachée. Il est interdit de regarder ses cartes sans autorisation.
          </p>
          <p>
            Au début, chaque joueur peut regarder 2 de ses 4 cartes. Les joueurs jouent à tour de rôle dans le sens des aiguilles d'une montre.
          </p>
        </div>
      </div>

      <div className="dutch-card mb-6">
        <h2 className="text-xl font-semibold mb-2 text-dutch-blue">À votre tour</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            Piochez une carte. Vous pouvez soit :
          </p>
          <ul className="space-y-2 ml-4">
            <li>• Échanger cette carte avec l'une de vos cartes face cachée</li>
            <li>• La défausser directement</li>
          </ul>
          <p>
            Lorsqu'un joueur défausse une carte, tous les autres peuvent se défausser immédiatement de la même carte (si elle est dans leur main).
          </p>
        </div>
      </div>

      <div className="dutch-card mb-6">
        <h2 className="text-xl font-semibold mb-2 text-dutch-blue">Fin de manche</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            Un joueur peut décider d'arrêter la manche en disant "Dutch". Tous les autres joueurs jouent alors un dernier tour.
          </p>
          <p>
            Les points sont comptés à la fin de la manche.
          </p>
          <p className="text-dutch-orange font-medium">
            Si le joueur qui a dit "Dutch" n'a pas le score le plus bas, il reçoit une pénalité de 10 points.
          </p>
        </div>
      </div>

      <div className="dutch-card mb-6">
        <h2 className="text-xl font-semibold mb-2 text-dutch-blue">Valeur des cartes</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Cartes numérotées : leur valeur numérique</li>
          <li>• Figures (Valet, Dame, Roi noir) : 10 points</li>
          <li>• Roi noir : 15 points</li>
          <li>• Rois rouges : 0 point</li>
        </ul>
      </div>

      <div className="dutch-card">
        <h2 className="text-xl font-semibold mb-2 text-dutch-blue">Cartes spéciales</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Valet : Échange deux cartes entre n'importe quels joueurs</li>
          <li>• Dame : Permet de regarder une de ses propres cartes</li>
          <li>• Rois rouges : Valent 0 point</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default RulesPage;
