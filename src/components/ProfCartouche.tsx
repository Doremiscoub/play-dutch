
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Brain, Trophy, Flag, Sparkles } from 'lucide-react';
import { Player } from '@/types';

interface ProfCartoucheProps {
  players: Player[];
  roundNumber: number;
  view: 'podium' | 'table';
}

const ProfCartouche: React.FC<ProfCartoucheProps> = ({ players, roundNumber, view }) => {
  const [comment, setComment] = useState<string>('');
  const [icon, setIcon] = useState<React.ReactNode>(<Lightbulb className="h-5 w-5 text-dutch-yellow" />);

  useEffect(() => {
    if (players.length === 0 || roundNumber === 0) {
      setComment("Allez, on se bouge le popotin ! Faut jouer pour que je puisse te clasher !");
      setIcon(<Lightbulb className="h-5 w-5 text-dutch-yellow" />);
      return;
    }

    // Trier les joueurs par score
    const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
    const leader = sortedPlayers[0];
    const lastPlace = sortedPlayers[sortedPlayers.length - 1];
    const randomFactor = Math.random();
    
    // Commentaires pour le leader
    const leaderComments = [
      `${leader.name} domine comme Mbappé face à des U12 ! Les autres, vous jouez avec vos pieds ou quoi ?`,
      `Franchement, ${leader.name} a tellement d'avance qu'on dirait que les autres sont sous Lexomil !`,
      `${leader.name} en tête, normal ! Les autres, c'est quoi votre excuse ? "Mon chien a mangé mes cartes" ?`,
      `${leader.name} premier ? Même ma grand-mère avec ses lunettes cassées ferait mieux que vous autres !`,
      `C'est ${leader.name} le patron ici ! Les autres, vous êtes juste des stagiaires du Dutch !`
    ];
    
    // Commentaires pour le dernier
    const lastPlaceComments = [
      `Oh la honte pour ${lastPlace.name} ! T'as confondu Dutch avec UNO ou t'es juste nul comme ça naturellement ?`,
      `${lastPlace.name}, t'es en train de battre le record du monde du joueur le plus poissard. Chapeau l'artiste !`,
      `${lastPlace.name}, même un joueur avec un bandeau sur les yeux ferait mieux ! Faut se réveiller mon coco !`,
      `Alors ${lastPlace.name}, on fait la sieste pendant le jeu ? T'as tellement de points que t'as même pas besoin de chauffage cet hiver !`,
      `${lastPlace.name}, t'es sûr que t'as compris les règles ? On dirait que tu joues à "qui ramasse le plus de points" !`
    ];
    
    // Commentaires sur le dutch
    const dutchComments = [
      "Y'a quelqu'un qui va se faire trasher pour son Dutch... Ça va piquer plus qu'une diarrhée de piments !",
      "Être Dutch c'est comme oublier son maillot à la piscine... Tout le monde va se foutre de ta tronche !",
      "Le Dutch c'est comme les examens, y'a ceux qui révisent et ceux qui vont pleurer après !",
      "Oh le Dutch de boloss ! C'est comme arriver en tongs à un mariage, ça la fout mal !",
      "Y'a un Dutch qui pue plus qu'un fromage oublié au soleil... Bonne chance pour t'en sortir !"
    ];
    
    // Commentaires généraux sur le jeu
    const generalComments = [
      "Vous jouez comme des pieds ! Même ma tortue serait plus vive avec les cartes !",
      "Cette partie est plus chaotique que mon appart un dimanche matin après soirée !",
      "Vous êtes tous nuls, mais genre, vraiment nuls ! Je kiffe trop vous voir galérer !",
      "C'est quoi ce jeu de fillettes ? Mettez un peu de peps, on dirait un tournoi de belote en EHPAD !",
      "Ce niveau de jeu est plus bas que mes notes au bac ! Et croyez-moi, c'était pas glorieux !"
    ];
    
    // Commentaires sur l'évolution du jeu
    const progressComments = [
      "Le match s'enflamme comme un barbecue un 14 juillet ! Ça va finir en baston tout ça !",
      "C'est plus serré qu'un jean après les fêtes ! Qui va craquer en premier ?",
      "Vous êtes au coude-à-coude comme deux poivrots au comptoir ! Qui va tomber en premier ?",
      "Ça se tire la bourre plus que pour les dernières PS5 en promo ! J'adore ce bordel !",
      "C'est le feu dans ce match ! Plus chaud qu'une chicha mal dosée !"
    ];
    
    // Sélection du type de commentaire en fonction de la situation et du hasard
    let selectedComment: string;
    
    if (randomFactor < 0.25) {
      selectedComment = generalComments[Math.floor(Math.random() * generalComments.length)];
      setIcon(<Brain className="h-5 w-5 text-dutch-orange" />);
    } else if (randomFactor < 0.45) {
      selectedComment = leaderComments[Math.floor(Math.random() * leaderComments.length)];
      setIcon(<Trophy className="h-5 w-5 text-dutch-yellow" />);
    } else if (randomFactor < 0.65) {
      selectedComment = lastPlaceComments[Math.floor(Math.random() * lastPlaceComments.length)];
      setIcon(<Flag className="h-5 w-5 text-dutch-red" />);
    } else if (randomFactor < 0.85) {
      selectedComment = dutchComments[Math.floor(Math.random() * dutchComments.length)];
      setIcon(<Lightbulb className="h-5 w-5 text-dutch-yellow" />);
    } else {
      selectedComment = progressComments[Math.floor(Math.random() * progressComments.length)];
      setIcon(<Sparkles className="h-5 w-5 text-dutch-purple" />);
    }
    
    setComment(selectedComment);
  }, [players, roundNumber, view]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={comment}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`prof-cartouche relative overflow-hidden ${view === 'podium' ? 'mb-4' : 'my-2'}`}
      >
        <div className="absolute -z-10 inset-0 bg-gradient-to-r from-dutch-blue/5 via-dutch-orange/5 to-dutch-purple/5 rounded-2xl" />
        <div className="absolute -z-10 top-0 right-0 w-32 h-32 bg-dutch-orange/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute -z-10 bottom-0 left-0 w-32 h-32 bg-dutch-blue/10 rounded-full blur-3xl opacity-30" />
        
        <div className={`relative rounded-2xl border border-white/30 backdrop-blur-sm shadow-sm overflow-hidden
          ${view === 'podium' 
            ? 'bg-white/70 p-4 md:p-5' 
            : 'bg-white/80 p-3 md:p-4'}`}
        >
          <div className="flex items-start gap-3">
            <div className="prof-avatar flex-shrink-0">
              <motion.div
                whileHover={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
                className={`relative overflow-hidden ${view === 'podium' ? 'w-12 h-12 md:w-14 md:h-14' : 'w-10 h-10 md:w-12 md:h-12'} rounded-full bg-gradient-to-br from-dutch-orange to-dutch-pink border-2 border-white/50 shadow-md`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`font-bold text-white ${view === 'podium' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>P</span>
                </div>
              </motion.div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className={`font-semibold bg-gradient-to-r from-dutch-orange to-dutch-pink bg-clip-text text-transparent
                  ${view === 'podium' ? 'text-lg' : 'text-base'}`}>
                  Prof. Cartouche
                </h3>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 10 }}
                >
                  {icon}
                </motion.div>
              </div>
              
              <motion.p 
                className={`text-gray-800 ${view === 'podium' ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {comment}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfCartouche;
