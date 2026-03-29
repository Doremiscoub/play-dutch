/**
 * Templates de commentaires pour l'AI Commentator - Professeur Cartouche
 * Event-specific, personality-aware, player-name-injected templates
 */

export const COMMENT_TEMPLATES = {
  game_start: [
    "Ah ! {playerCount} valeureux combattants s'apprêtent à danser le tango du Dutch ! Que le spectacle commence !",
    "Parfait ! J'ai apporté mon carnet de notes... et mon popcorn ! Cette partie s'annonce épicée !",
    "Mesdames et messieurs, bienvenue dans l'arène ! Objectif : {scoreLimit} points. Que les stratégies les plus retorses l'emportent !",
    "Tiens, tiens... {playerCount} joueurs pleins d'espoir ! L'un d'eux va bientôt découvrir que l'espoir, c'est comme un bon vin : ça peut vite tourner au vinaigre !",
    "Place au spectacle ! {playerCount} gladiateurs du Dutch font leur entrée ! Qui repartira couvert de gloire, qui repartira... couvert de honte ?",
    "Bien le bonjour ! {playerCount} têtes brûlées prêtes à s'affronter ! Je sens que mes neurones vont s'amuser ce soir !",
    "Oyez oyez ! Le tournoi du Dutch ouvre ses portes avec {playerCount} concurrents ! Que les dieux de la stratégie vous soient favorables !"
  ],

  endgame_pressure: [
    "L'étau se resserre ! {leadingPlayer} sent la pression monter... C'est le moment où les champions révèlent leur vraie nature !",
    "Attention, nous approchons du dénouement ! {leadingPlayer} a {gap} points d'avance, mais dans le Dutch, tout peut basculer en un claquement de doigts !",
    "Le suspense est à son comble ! {strugglingPlayer}, c'est maintenant ou jamais pour votre remontada légendaire !",
    "Nous entrons dans la zone rouge ! {leadingPlayer}, attention aux excès de confiance... l'histoire du Dutch est pavée de chutes spectaculaires !",
    "La ligne d'arrivée approche ! {leadingPlayer} peut presque toucher la victoire... mais {strugglingPlayer} n'a pas dit son dernier mot !",
    "Tension maximale ! Chaque carte compte maintenant... {leadingPlayer}, gardez vos nerfs d'acier !",
    "On entre dans le money time ! {gap} points séparent les extrêmes... Un Dutch maintenant et TOUT change !"
  ],

  gap_analysis: [
    "Aïe aïe aïe ! {gap} points d'écart... {strugglingPlayer}, il va falloir sortir l'artillerie lourde !",
    "Regardez-moi cet écart béant ! {gap} points... {leadingPlayer} creuse sa tranchée tandis que {strugglingPlayer} cherche encore sa pelle !",
    "Houston, nous avons un problème ! {strugglingPlayer} accuse {gap} points de retard... Il est temps de passer en mode kamikaze !",
    "Mes chers spectateurs, nous assistons à un véritable carnage ! {gap} points d'écart... C'est David contre Goliath, mais David a oublié sa fronde !",
    "Sapristi ! {gap} points de différence ! {leadingPlayer} trace sa route comme un TGV pendant que {strugglingPlayer} pédale sur un tricycle !",
    "On appelle ça comment déjà ? Ah oui, une DÉROUTE ! {gap} points d'écart, {strugglingPlayer} va avoir besoin d'un miracle !"
  ],

  tension_build: [
    "L'atmosphère se tend ! Je sens les neurones qui grésillent... Qui va craquer en premier ?",
    "Mmh, mmh... Je détecte une montée d'adrénaline ! Les cartes vont bientôt voler !",
    "Attention, la pression monte ! On dirait que quelqu'un va exploser... et ce ne sera pas moi !",
    "Fascinant ! Le stress commence à faire des ravages... Je parie que {focusPlayer} transpire déjà !"
  ],

  dutch_celebration: [
    "DUTCH ! {focusPlayer} vient de faire le grand saut ! Magnifique plongeon dans l'abîme !",
    "Et voilà ! {focusPlayer} nous offre un Dutch de toute beauté ! C'est du grand art !",
    "Bravo {focusPlayer} ! Ce Dutch était si parfait qu'on aurait dit une chorégraphie !",
    "DUTCH ATTACK ! {focusPlayer} vient de transformer l'espoir en désespoir en une fraction de seconde !",
    "BOUM ! Dutch atomique de {focusPlayer} ! Les autres joueurs peuvent aller se rhabiller !",
    "Mesdames et messieurs, {focusPlayer} vient de rentrer dans la légende avec ce Dutch magistral ! Standing ovation !",
    "INCROYABLE ! {focusPlayer} vient de pulvériser la concurrence avec ce Dutch de feu ! Chapeau l'artiste !"
  ],

  poor_performance: [
    "Alors {focusPlayer}, on fait du tourisme dans les profondeurs du classement ?",
    "Dites-moi {focusPlayer}, c'est une stratégie secrète ou vous improvisez vraiment ?",
    "{focusPlayer}, j'admire votre persévérance ! Continuer à jouer malgré ces scores... c'est du courage !",
    "Ah {focusPlayer} ! Vous nous prouvez que dans le Dutch, il n'y a pas que la victoire qui compte... il y a aussi l'art de perdre avec panache !"
  ],

  strategic_advice: [
    "Petit conseil à {focusPlayer} : parfois, la prudence est la mère de toutes les vertus !",
    "{focusPlayer}, je vous observe... Vous jouez avec le feu ! Attention à ne pas vous brûler les doigts !",
    "Note tactique : {focusPlayer}, variez vos stratégies ! La prévisibilité est l'ennemi du Dutch !",
    "Observation du professeur : {focusPlayer}, vous avez le talent, maintenant il faut la patience !"
  ],

  general: [
    "Intéressant... très intéressant même !",
    "Ah ! Les subtilités du Dutch ne cessent de m'émerveiller !",
    "Mes chers joueurs, vous m'offrez un spectacle délicieux !",
    "Continuez comme ça, c'est passionnant à analyser !"
  ],

  // ========= NEW EVENT-SPECIFIC TEMPLATES =========

  lead_change: [
    "COUP DE THÉÂTRE ! {focusPlayer} s'empare de la tête ! {previousLeader} vient de perdre sa couronne !",
    "Renversement de situation ! {focusPlayer} détrône {previousLeader} ! Le Dutch n'a aucune pitié !",
    "Et paf ! {focusPlayer} passe en première place ! {previousLeader}, ça fait quoi de redescendre sur terre ?",
    "ALERTE ROUGE ! Changement de leader ! {focusPlayer} prend les commandes, {previousLeader} est relégué ! Quel retournement !",
    "Ça bouge au sommet ! {focusPlayer} arrache la première place à {previousLeader} ! On n'est jamais tranquille dans le Dutch !",
    "Ah ah ! {previousLeader} se croyait en sécurité... C'était sans compter sur {focusPlayer} qui débarque en tête !"
  ],

  low_round_score: [
    "MAGISTRAL ! {focusPlayer} signe une manche à {lastRoundScore} points ! C'est du travail de chirurgien !",
    "{focusPlayer} avec {lastRoundScore} points cette manche ! Même moi, je suis impressionné... et c'est pas facile !",
    "Chapeau bas ! {lastRoundScore} points pour {focusPlayer} ! Une performance digne des plus grands maîtres du Dutch !",
    "Oh là là ! {focusPlayer} nous sort un {lastRoundScore} de derrière les fagots ! Voilà ce que j'appelle du génie pur !",
    "{lastRoundScore} points ?! {focusPlayer}, vous nous faites un récital ce soir ! Les autres prennent des notes, j'espère !",
    "PERFECTION ! {focusPlayer} claque un {lastRoundScore} ! Les rivaux peuvent trembler !"
  ],

  high_round_score: [
    "Outch ! {focusPlayer} encaisse {lastRoundScore} points ! Ça pique, ça brûle, ça fait mal !",
    "Aïe aïe aïe ! {lastRoundScore} points pour {focusPlayer} ! C'est ce qu'on appelle une manche catastrophique !",
    "{focusPlayer} vient de ramasser {lastRoundScore} points ! Mon cœur de professeur saigne pour vous...",
    "BOUM ! {lastRoundScore} points dans la figure de {focusPlayer} ! On peut dire que les cartes n'étaient pas de son côté !",
    "{lastRoundScore} points ! {focusPlayer}, je ne sais pas ce qui s'est passé, mais c'était spectaculairement douloureux !",
    "Mes condoléances {focusPlayer}... {lastRoundScore} points en une seule manche ! L'horreur absolue !"
  ],

  dutch_win: [
    "DUTCH VICTORIEUX ! {focusPlayer} a parié et GAGNÉ ! Score de {lastRoundScore} — du grand art !",
    "{focusPlayer} tente le Dutch et c'est un TRIOMPHE ! {lastRoundScore} points, les adversaires sont sous le choc !",
    "LE COUP PARFAIT ! {focusPlayer} Dutch avec {lastRoundScore} points ! Ça, c'est du culot récompensé !",
    "MAGISTRAL ! {focusPlayer} appelle Dutch et écrase tout le monde ! {lastRoundScore} points de pure domination !",
    "Dutch gagnant pour {focusPlayer} ! {lastRoundScore} points ! Quand l'audace paie, ça fait des étincelles !",
    "BOOM SHAKALAKA ! {focusPlayer} Dutch à {lastRoundScore} points ! Les légendes se construisent sur ce genre de coups !"
  ],

  dutch_fail: [
    "CATASTROPHE ! {focusPlayer} tente le Dutch mais se prend {lastRoundScore} points ! L'arroseur arrosé !",
    "OH NON ! Dutch raté pour {focusPlayer} ! {lastRoundScore} points ! Le karma du Dutch a encore frappé !",
    "{focusPlayer} a voulu jouer les héros avec un Dutch... {lastRoundScore} points ! Retour brutal à la réalité !",
    "AOUTCH ! Dutch suicidaire de {focusPlayer} ! {lastRoundScore} points ! Parfois il vaut mieux rester discret...",
    "Le Dutch de la honte ! {focusPlayer} s'effondre avec {lastRoundScore} points ! Même moi j'ai mal pour vous !",
    "DÉSASTRE ! {focusPlayer} appelle Dutch et se prend un mur ! {lastRoundScore} points ! L'hubris, mes amis, l'hubris !"
  ],

  close_scores: [
    "Les scores sont SERRÉS ! {topGap} points entre {leadingPlayer} et {focusPlayer} ! Ça va se jouer au couteau !",
    "Attention, c'est du coude à coude ! Seulement {topGap} points séparent {leadingPlayer} de {focusPlayer} !",
    "Le suspense est INSOUTENABLE ! {topGap} points d'écart au sommet ! La moindre erreur sera fatale !",
    "Tête à tête haletant entre {leadingPlayer} et {focusPlayer} ! {topGap} petits points... Tout peut basculer !",
    "TENSION MAXIMALE ! {leadingPlayer} mène de seulement {topGap} points ! {focusPlayer} est juste derrière, prêt à bondir !",
    "On se croirait dans un thriller ! {topGap} points entre les deux premiers ! Un Dutch et tout explose !"
  ],

  danger_zone: [
    "ALERTE ! {focusPlayer} n'est plus qu'à {distanceToLimit} points de la limite ! La zone de danger est atteinte !",
    "Sirène d'alarme pour {focusPlayer} ! Plus que {distanceToLimit} points avant l'élimination... Chaque manche est un défi de survie !",
    "{focusPlayer} flirte avec la limite à {distanceToLimit} points ! Un gros score maintenant et c'est TERMINÉ !",
    "Tic tac tic tac... {focusPlayer} est à {distanceToLimit} points de la fin ! Le compte à rebours est lancé !",
    "ZONE ROUGE pour {focusPlayer} ! {distanceToLimit} points de marge, c'est RIEN dans le Dutch ! Sueurs froides garanties !",
    "{focusPlayer} marche sur un fil ! {distanceToLimit} points avant le game over... Vous aimez le risque ou quoi ?!"
  ],

  comeback: [
    "REMONTADA ! {focusPlayer} revient de nulle part et gagne {positionsGained} places ! Les miracles existent !",
    "Quelle renaissance pour {focusPlayer} ! +{positionsGained} positions ! Le phénix renaît de ses cendres !",
    "{focusPlayer} nous fait un comeback monumental ! {positionsGained} places récupérées ! Les frissons, mes amis !",
    "INCROYABLE remontée de {focusPlayer} ! Qui avait parié sur un tel retour ? Certainement pas moi !",
    "{focusPlayer} défie les pronostics avec une remontée de {positionsGained} places ! L'espoir n'est JAMAIS mort dans le Dutch !",
    "Le comeback de l'année signé {focusPlayer} ! +{positionsGained} positions ! Hollywood n'aurait pas fait mieux !"
  ]
};

export const ADVICE_TEMPLATES = [
  "Conseil du professeur : la régularité bat souvent la brillance !",
  "Tactique recommandée : observez les patterns de vos adversaires !",
  "Astuce : parfois, il vaut mieux perdre une bataille pour gagner la guerre !",
  "Stratégie avancée : utilisez la psychologie autant que vos cartes !",
  "Sage conseil : gardez toujours un plan B... et même un plan C !"
];

export const RUNNING_GAGS = {
  dutch_master_3: "Le roi du Dutch !",
  dutch_master_5: "La légende vivante du Dutch !",
  dutch_master_8: "Le maître incontesté !",
  precision_ace: "L'as de la précision !",
  comeback_kid: "Le comeback kid !"
};
