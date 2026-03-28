import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedCard } from '@/components/ui/unified-card';
import { useSEO } from '@/hooks/useSEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import UnifiedHeader from '@/components/layout/UnifiedHeader';

const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useSEO({
    title: 'FAQ - Questions fréquentes - Dutch Card Game',
    description: 'Toutes les réponses à vos questions sur Dutch Card Game. Règles, fonctionnalités, problèmes techniques. Guide complet pour bien jouer.',
    keywords: 'FAQ dutch card game, questions fréquentes, aide, support, règles dutch, problèmes techniques'
  });

  const faqs = [
    {
      category: "Règles du jeu",
      questions: [
        {
          question: "Comment joue-t-on au Dutch ?",
          answer: "Le Dutch est un jeu de cartes stratégique qui se joue avec un jeu de 52 cartes standard. L'objectif est d'obtenir le score le plus bas possible sur plusieurs manches. Chaque joueur reçoit 4 cartes face cachée et ne peut en regarder que 2 au début de la manche. À chaque tour, vous piochez une carte de la pioche ou de la défausse, puis vous l'échangez avec une de vos cartes ou la défaussez. Certaines cartes ont des pouvoirs spéciaux : le 7 permet d'échanger une carte avec un adversaire, les 9 et 10 permettent de regarder une de vos cartes cachées, et le Valet permet de passer votre tour à un autre joueur. Quand un joueur pense avoir le score le plus bas, il dit 'Dutch' et la manche se termine au tour suivant. Les cartes sont alors révélées et les points comptés. Le joueur qui atteint la limite de points (généralement 100) en premier perd la partie."
        },
        {
          question: "Combien de joueurs peuvent jouer ?",
          answer: "Le Dutch se joue idéalement entre 2 et 10 joueurs. La configuration optimale se situe entre 4 et 6 joueurs, offrant un bon équilibre entre interaction et temps de jeu. Avec 2-3 joueurs, les parties sont plus rapides et plus stratégiques car il est plus facile de suivre les cartes des adversaires. Avec 7-10 joueurs, les parties deviennent plus imprévisibles et amusantes, mais chaque manche prend plus de temps. L'application s'adapte automatiquement au nombre de participants pour le calcul des statistiques et l'affichage des classements."
        },
        {
          question: "Qu'est-ce que le système 'Dutch' ?",
          answer: "Dire 'Dutch' est le moment clé de chaque manche. Quand un joueur pense avoir le score le plus bas parmi tous les joueurs, il annonce 'Dutch' à voix haute. Les autres joueurs ont alors encore un dernier tour pour essayer d'améliorer leur jeu. Ensuite, toutes les cartes sont révélées. Si le joueur qui a dit Dutch a effectivement le score le plus bas, les autres joueurs comptent normalement leurs points. Mais attention : si un autre joueur a un score égal ou inférieur, le joueur qui a dit Dutch reçoit une pénalité de points supplémentaires ! C'est pourquoi le timing est crucial — il faut être suffisamment confiant avant d'annoncer Dutch."
        },
        {
          question: "Comment définir la limite de points ?",
          answer: "La limite de points détermine la durée de la partie. Par défaut, elle est fixée à 100 points, ce qui correspond à environ 30-45 minutes de jeu avec 4 joueurs. Vous pouvez la personnaliser lors de la création de la partie : 50 points pour une partie rapide (15-20 minutes), 75 pour une partie moyenne, 100 pour une partie standard, 150 ou 200 pour une longue session. Plus la limite est élevée, plus les retournements de situation sont possibles et plus la stratégie à long terme compte. Le choix dépend du temps disponible et du niveau d'expérience des joueurs."
        },
        {
          question: "Quelle est la valeur de chaque carte ?",
          answer: "Chaque carte a une valeur en points : l'As vaut 1 point, les cartes numériques (2-10) valent leur valeur faciale, le Valet et la Dame valent 10 points chacun. Le Roi rouge (Cœur et Carreau) vaut 10 points, mais le Roi noir (Trèfle et Pique) vaut 0 point — c'est la carte la plus précieuse du jeu ! Les Jokers, quand ils sont utilisés, valent -2 points (ils réduisent votre score). Connaître ces valeurs est essentiel pour prendre les bonnes décisions d'échange et savoir quand annoncer Dutch."
        }
      ]
    },
    {
      category: "Stratégie et astuces",
      questions: [
        {
          question: "Quelles sont les meilleures stratégies pour gagner au Dutch ?",
          answer: "La stratégie au Dutch repose sur trois piliers : la mémoire, l'observation et le timing. Premièrement, mémorisez toujours vos cartes. Au début de chaque manche, vous voyez 2 de vos 4 cartes. Gardez ces informations en tête et mettez-les à jour chaque fois que vous échangez ou regardez une carte. Un bon joueur connaît au moins 3 de ses 4 cartes à tout moment. Deuxièmement, observez vos adversaires. Quand quelqu'un garde une carte de la défausse, notez laquelle. Quand un joueur hésite, c'est souvent signe qu'il a un bon jeu et envisage de dire Dutch. Troisièmement, gérez le risque sur plusieurs manches. Si vous êtes en tête au classement général, jouez prudemment. Si vous êtes en retard, prenez plus de risques — parfois il vaut mieux tenter un Dutch audacieux que de finir avec un score médiocre."
        },
        {
          question: "Comment bien utiliser les cartes spéciales ?",
          answer: "Les cartes spéciales sont la clé pour maîtriser le Dutch. Le 7 permet d'échanger une de vos cartes avec celle d'un adversaire à l'aveugle — utilisez-le pour vous débarrasser d'une carte haute (Dame, Roi rouge) en espérant récupérer mieux. C'est particulièrement efficace en début de manche quand les adversaires n'ont pas encore optimisé leur jeu. Les 9 et 10 permettent de regarder une de vos cartes cachées — privilégiez cette action quand vous avez 2 cartes inconnues pour réduire l'incertitude avant de décider quoi échanger. Le Valet fait passer le tour d'un adversaire — gardez-le pour bloquer un joueur qui s'apprête à dire Dutch. Enfin, quand vous piochez un Roi noir (0 point), gardez-le absolument, même si cela signifie défausser une carte de faible valeur."
        },
        {
          question: "Quand est-ce le bon moment pour dire Dutch ?",
          answer: "Le timing du Dutch est l'aspect le plus subtil du jeu. En règle générale, dites Dutch quand vous êtes raisonnablement sûr d'avoir un score entre 0 et 5 points. Cela signifie connaître au moins 3 de vos 4 cartes et avoir majoritairement des cartes basses ou des Rois noirs. Évitez de dire Dutch trop tôt dans la manche (les adversaires ont encore trop de tours pour s'améliorer) ou trop tard (quelqu'un pourrait vous devancer). Un bon indicateur : si vous voyez des adversaires défausser des cartes basses, c'est qu'ils ont probablement un bon jeu. Attendez d'être confiant. Rappelez-vous qu'une pénalité pour un Dutch raté peut coûter plus cher qu'un score moyen."
        },
        {
          question: "Comment compter les cartes efficacement ?",
          answer: "Le comptage des cartes au Dutch n'est pas aussi complexe qu'au poker ou au blackjack, mais il offre un avantage significatif. Commencez par noter mentalement les cartes qui passent par la défausse. Si vous voyez passer trois Rois noirs, le quatrième est quelque part dans les mains des joueurs — c'est une information précieuse. Observez aussi les cartes échangées via le 7 : si un adversaire échange une carte qu'il a regardée, il se débarrasse probablement d'une carte haute. Avec l'habitude, vous pouvez estimer grossièrement la main de vos adversaires, ce qui vous aide à décider quand dire Dutch et contre qui utiliser vos 7."
        }
      ]
    },
    {
      category: "Utilisation de l'application",
      questions: [
        {
          question: "L'application fonctionne-t-elle hors ligne ?",
          answer: "Oui ! Dutch Card Game est une PWA (Progressive Web App) qui fonctionne entièrement hors ligne après la première visite. Toutes vos données (parties en cours, historique, statistiques) sont stockées localement sur votre appareil via le localStorage du navigateur. Cela signifie que vous pouvez jouer au parc, dans le train, en camping — partout où vous avez vos cartes physiques, même sans connexion internet. L'application se met à jour automatiquement lorsque vous êtes connecté, mais ne nécessite jamais de connexion pour fonctionner."
        },
        {
          question: "Comment ajouter des scores ?",
          answer: "Après chaque manche de votre partie de cartes, appuyez sur le bouton 'Nouvelle manche' en bas de l'écran. Un formulaire s'ouvre avec un champ pour chaque joueur. Saisissez les scores de chaque joueur (additionnez la valeur de leurs 4 cartes) et indiquez optionnellement qui a dit 'Dutch' en cochant la case correspondante. L'application calcule automatiquement les totaux cumulés, met à jour le classement, les statistiques (moyenne, meilleur score, tendance), et le Professeur Cartouche commente le résultat avec humour. Si vous faites une erreur, vous pouvez annuler la dernière manche immédiatement."
        },
        {
          question: "Peut-on annuler la dernière manche ?",
          answer: "Oui, utilisez le bouton d'annulation (icône de flèche retour) disponible à côté du bouton 'Nouvelle manche'. Cette fonction annule uniquement la dernière manche ajoutée — les manches précédentes ne sont pas affectées. C'est très utile en cas d'erreur de saisie. Notez que l'annulation est définitive : une fois confirmée, les scores de cette manche sont supprimés et ne peuvent pas être restaurés. Si vous n'avez pas encore commencé la manche suivante, c'est le meilleur moment pour corriger."
        },
        {
          question: "Comment installer l'application sur mon téléphone ?",
          answer: "Dutch Card Game est une Progressive Web App (PWA), ce qui signifie qu'elle s'installe directement depuis votre navigateur, sans passer par l'App Store ou le Play Store. Sur Android avec Chrome, appuyez sur le menu (trois points) puis 'Installer l'application' ou 'Ajouter à l'écran d'accueil'. Sur iPhone avec Safari, appuyez sur le bouton de partage (carré avec flèche) puis 'Sur l'écran d'accueil'. L'application apparaîtra ensuite sur votre écran d'accueil comme n'importe quelle application native, avec son icône, son écran de lancement et un fonctionnement plein écran."
        },
        {
          question: "Comment consulter l'historique de mes parties ?",
          answer: "Depuis la page d'accueil, accédez à la section 'Historique' pour retrouver toutes vos parties terminées. Chaque entrée affiche la date, le nombre de joueurs, le nombre de manches jouées, et le classement final. Vous pouvez cliquer sur une partie pour voir le détail manche par manche, les graphiques d'évolution des scores, et les statistiques individuelles de chaque joueur. L'historique est conservé localement sur votre appareil — il reste disponible tant que vous ne videz pas les données de votre navigateur."
        }
      ]
    },
    {
      category: "Fonctionnalités",
      questions: [
        {
          question: "Qu'est-ce que le Professeur Cartouche ?",
          answer: "Le Professeur Cartouche est l'intelligence artificielle intégrée à Dutch Card Game qui commente vos parties en temps réel. Doté d'une personnalité unique mêlant humour, sarcasme bienveillant et encouragements, il réagit aux événements de la partie : un Dutch réussi, un retournement de situation, un joueur qui accumule les mauvais scores... Ses commentaires sont générés dynamiquement en fonction du contexte du jeu (scores actuels, tendances, nombre de manches). Le Professeur Cartouche rend chaque partie unique et ajoute une dimension sociale supplémentaire à votre soirée jeux."
        },
        {
          question: "L'historique des parties est-il sauvegardé ?",
          answer: "Oui, toutes vos parties terminées sont automatiquement sauvegardées dans l'historique local de votre appareil. Vous y retrouverez pour chaque partie : la date et l'heure, la liste des joueurs et le classement final, le score de chaque joueur manche par manche, les graphiques d'évolution, et les statistiques détaillées (moyenne, meilleur score, nombre de Dutch). L'historique est conservé indéfiniment tant que vous ne supprimez pas les données du navigateur. C'est un excellent moyen de suivre votre progression au fil du temps et de comparer vos performances."
        },
        {
          question: "Quelles statistiques sont disponibles ?",
          answer: "L'application propose des statistiques riches et détaillées. Pour chaque joueur dans une partie : score total, moyenne par manche, meilleur et pire score, nombre de Dutch tentés et réussis, tendance récente (en amélioration ou en déclin). En vue graphique, vous pouvez suivre l'évolution des scores au fil des manches, comparer les trajectoires des joueurs, et identifier les moments clés de la partie. Des indicateurs visuels (badges 'Hot Streak', flèches de tendance) rendent les statistiques faciles à lire en un coup d'œil, même pendant le jeu."
        },
        {
          question: "Peut-on personnaliser l'interface ?",
          answer: "L'application offre plusieurs options de personnalisation pour s'adapter à vos préférences. Vous pouvez ajuster les paramètres de jeu (limite de points, nombre de joueurs), choisir d'activer ou désactiver le Professeur Cartouche, et basculer entre différentes vues du tableau de scores (liste, tableau détaillé, statistiques). L'interface s'adapte automatiquement à la taille de votre écran — que vous jouiez sur un smartphone, une tablette ou un ordinateur. Les noms des joueurs et les avatars sont personnalisables à chaque nouvelle partie."
        }
      ]
    },
    {
      category: "Variantes et formats de jeu",
      questions: [
        {
          question: "Quelles sont les variantes populaires du Dutch ?",
          answer: "Le Dutch se décline en plusieurs variantes qui ajoutent de la diversité à vos parties. Le Dutch Classique suit les règles standard décrites dans notre guide. Le Dutch Rapide réduit le nombre de cartes à 3 par joueur pour des manches plus courtes. Le Dutch en Équipes divise les joueurs en paires dont les scores sont additionnés — idéal pour les grands groupes. Le Dutch Progressif augmente le nombre de cartes de 3 à 5 au fil des manches pour une difficulté croissante. Chacune de ces variantes peut être suivie avec notre application en ajustant simplement la saisie des scores."
        },
        {
          question: "Comment organiser un tournoi Dutch ?",
          answer: "Pour organiser un tournoi Dutch entre amis, nous recommandons le format suivant : divisez les joueurs en groupes de 4-5 pour les phases de poule (limite à 50 points pour des parties rapides). Les deux premiers de chaque poule se qualifient pour les demi-finales, puis les vainqueurs s'affrontent en finale avec une limite à 100 points. L'application vous permet de suivre chaque partie indépendamment et de consulter l'historique pour établir le classement. Prévoyez environ 2-3 heures pour un tournoi de 8-12 joueurs. C'est un format parfait pour les soirées jeux ou les après-midi en famille."
        },
        {
          question: "Peut-on jouer avec des règles maison ?",
          answer: "Absolument ! L'application est suffisamment flexible pour s'adapter à vos règles maison. Vous pouvez modifier la limite de points, le nombre de joueurs, et même adapter la façon dont vous comptez les scores. Certains groupes ajoutent des règles spéciales comme le 'Double Dutch' (bonus quand un joueur dit Dutch avec 0 point), ou le 'Dutch Partagé' (quand deux joueurs ont le même score minimal). L'application enregistre fidèlement les scores que vous saisissez, quelle que soit la variante que vous jouez."
        }
      ]
    },
    {
      category: "Problèmes techniques",
      questions: [
        {
          question: "Mes données sont-elles sécurisées ?",
          answer: "Vos données sont entièrement sécurisées car elles restent sur votre appareil. Dutch Card Game utilise le localStorage de votre navigateur pour stocker toutes les informations (parties, historique, préférences). Aucune donnée personnelle n'est envoyée à nos serveurs. Nous ne collectons pas d'adresses email, de noms réels ou de données de localisation. L'application ne nécessite aucune inscription ni création de compte. Cette approche 'privacy-first' garantit que vos données de jeu restent privées et sous votre contrôle total."
        },
        {
          question: "Que faire si l'application ne se charge pas ?",
          answer: "Si l'application ne se charge pas, essayez ces étapes dans l'ordre : 1) Rechargez la page (Ctrl+R ou glisser vers le bas sur mobile). 2) Vérifiez votre connexion internet si c'est votre première visite. 3) Videz le cache de votre navigateur (Paramètres > Confidentialité > Effacer les données de navigation). 4) Essayez un autre navigateur (Chrome et Firefox offrent la meilleure compatibilité). 5) Si l'application était installée comme PWA, désinstallez-la et réinstallez-la. Dans la grande majorité des cas, un simple rechargement de page résout le problème."
        },
        {
          question: "Puis-je récupérer une partie perdue ?",
          answer: "Si vous avez fermé accidentellement l'onglet ou l'application pendant une partie, vos données devraient être sauvegardées automatiquement. Retournez sur l'application — si une partie était en cours, elle devrait apparaître avec l'option de la reprendre. Cependant, si vous avez vidé le cache de votre navigateur ou effacé les données du site, la partie sera définitivement perdue. Pour éviter ce problème, nous vous recommandons d'installer l'application comme PWA (via 'Ajouter à l'écran d'accueil'), ce qui protège mieux les données contre les nettoyages accidentels du navigateur."
        },
        {
          question: "L'application est-elle compatible avec tous les navigateurs ?",
          answer: "Dutch Card Game est compatible avec tous les navigateurs modernes : Google Chrome (recommandé), Mozilla Firefox, Safari (iOS et macOS), Microsoft Edge, et Opera. L'application utilise des technologies web standards (HTML5, CSS3, JavaScript ES6+) et a été testée sur les versions récentes de ces navigateurs. Pour la meilleure expérience, nous recommandons Chrome ou Firefox sur desktop, et Safari sur iPhone/iPad. Certaines fonctionnalités comme l'installation PWA et les notifications peuvent varier selon le navigateur et le système d'exploitation."
        }
      ]
    },
    {
      category: "Histoire et culture du Dutch",
      questions: [
        {
          question: "Quelle est l'origine du jeu de cartes Dutch ?",
          answer: "Le Dutch (aussi appelé 'Cabo' ou 'Golf' dans d'autres régions) est un jeu de cartes traditionnel dont les origines remontent aux jeux de mémoire européens du 19ème siècle. Le nom 'Dutch' fait référence à la tradition ludique néerlandaise, bien que le jeu se soit popularisé dans toute l'Europe francophone sous cette appellation. Sa mécanique unique — l'objectif d'obtenir le score le plus bas avec des cartes partiellement cachées — en fait un jeu à la fois accessible et profondément stratégique. Au fil des décennies, de nombreuses variantes régionales ont émergé, chacune ajoutant ses propres règles et cartes spéciales."
        },
        {
          question: "Pourquoi le Dutch est-il si populaire ?",
          answer: "Le Dutch doit sa popularité à un équilibre rare entre simplicité et profondeur. Les règles de base s'apprennent en 5 minutes, ce qui le rend accessible à tous les âges (dès 8 ans). Mais la stratégie — mémoire des cartes, observation des adversaires, timing du Dutch — offre une courbe de progression qui maintient l'intérêt des joueurs expérimentés. C'est aussi un jeu social par excellence : les moments de tension quand quelqu'un dit Dutch, les exclamations quand les cartes sont révélées, les commentaires sur les coups chanceux ou malchanceux. Une partie de Dutch crée naturellement des souvenirs et des anecdotes que les joueurs se rappellent longtemps après."
        },
        {
          question: "Le Dutch est-il adapté aux enfants ?",
          answer: "Le Dutch est un excellent jeu familial, accessible dès 8 ans environ. Les enfants apprécient la dimension mémoire du jeu (se souvenir de ses cartes cachées) et l'excitation de dire Dutch. Les règles sont assez simples pour être comprises rapidement, et les parties sont suffisamment courtes pour maintenir l'attention des plus jeunes. Pour jouer avec des enfants, nous recommandons de commencer avec 3 cartes au lieu de 4, et de fixer la limite à 50 points pour des parties plus rapides. L'application Dutch Card Game, avec ses couleurs vives et les commentaires amusants du Professeur Cartouche, rend l'expérience encore plus engageante pour les jeunes joueurs."
        }
      ]
    }
  ];

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <PageShell variant="minimal">
      {/* Header unifié avec style glassmorphique */}
      <UnifiedHeader 
        title="Questions Fréquentes"
        showBackButton
        onBack={() => navigate('/')}
        showSettings={true}
      />

      <PageContainer size="md">
          <UnifiedCard variant="glass" padding="lg">
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher dans les questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* FAQ Content */}
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold mb-4 text-dutch-purple">
                    {category.category}
                  </h2>
                  
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${categoryIndex}-${index}`}
                        className="border rounded-lg px-4 glass-surface"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-medium">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              {filteredFAQs.length === 0 && searchTerm && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Aucune question trouvée pour "{searchTerm}"
                  </p>
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="mt-12 p-6 bg-gradient-to-r from-dutch-blue/5 to-dutch-purple/5 rounded-lg glass-surface">
              <h3 className="text-xl font-bold mb-2">Une question non résolue ?</h3>
              <p className="text-muted-foreground mb-4">
                Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter.
                Nous sommes là pour vous aider !
              </p>
              <div className="text-sm text-muted-foreground">
                Vous pouvez nous joindre via les paramètres de l'application.
              </div>
            </div>
          </UnifiedCard>
      </PageContainer>
    </PageShell>
  );
};

export default FAQPage;
