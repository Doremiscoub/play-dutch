/**
 * Templates de commentaires pour l'AI Commentator
 * Extraction centralisée pour faciliter la maintenance et l'extension
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
