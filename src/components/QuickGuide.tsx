
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle, FileText, Info, RotateCcw, Plus, Award, Lightbulb } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';

const QuickGuide = () => {
  const navigate = useNavigate();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="shadow-md hover:shadow-lg"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-dutch-orange" />
            Guide rapide
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="basics" className="mt-2">
          <TabsList className="grid w-full grid-cols-3 bg-white/20 backdrop-blur-sm rounded-full">
            <TabsTrigger value="basics" className="rounded-full data-[state=active]:bg-white/80">Les bases</TabsTrigger>
            <TabsTrigger value="scoring" className="rounded-full data-[state=active]:bg-white/80">Scores</TabsTrigger>
            <TabsTrigger value="tips" className="rounded-full data-[state=active]:bg-white/80">Astuces</TabsTrigger>
          </TabsList>
          <TabsContent value="basics" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-dutch-blue" />
                Principe du jeu
              </h3>
              <p className="text-sm text-gray-700">
                Le Dutch Blitz est un jeu de cartes rapide où chaque joueur tente de se débarrasser de ses cartes le plus rapidement possible.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-dutch-purple" />
                Comment jouer
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                <li>Chaque joueur possède sa propre pile de cartes</li>
                <li>Les joueurs placent leurs cartes au centre simultanément</li>
                <li>L'objectif est de placer toutes ses cartes en premier</li>
              </ul>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                navigate('/rules');
              }}
            >
              Voir les règles complètes
            </Button>
          </TabsContent>
          <TabsContent value="scoring" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Plus className="h-4 w-4 text-dutch-green" />
                Ajouter un score
              </h3>
              <p className="text-sm text-gray-700">
                À la fin de chaque manche, appuyez sur "Nouvelle manche" pour ajouter les scores de tous les joueurs.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-dutch-orange" />
                Annuler une manche
              </h3>
              <p className="text-sm text-gray-700">
                Vous pouvez annuler la dernière manche ajoutée en cas d'erreur en utilisant le bouton "Annuler dernière manche".
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4 text-dutch-blue" />
                Fin de partie
              </h3>
              <p className="text-sm text-gray-700">
                La partie se termine lorsqu'un joueur atteint ou dépasse 100 points. Le joueur avec le moins de points gagne!
              </p>
            </div>
          </TabsContent>
          <TabsContent value="tips" className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-dutch-yellow" />
                Astuces utiles
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                <li>Consultez les statistiques pour analyser votre progression</li>
                <li>Désignez le joueur "Dutch" à chaque manche</li>
                <li>Personnalisez les couleurs du jeu selon vos préférences</li>
                <li>Regardez le podium à la fin de chaque partie pour célébrer</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuickGuide;
