
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSEO } from '@/hooks/useSEO';
import { StructuredData } from '@/components/seo/StructuredData';
import { Heart, Users, Smartphone, Zap, History, Shield, BarChart3, BookOpen, Sparkles } from 'lucide-react';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import UnifiedHeader from '@/components/layout/UnifiedHeader';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'À propos - Dutch Card Game | Application jeu de cartes',
    description: 'Découvrez Dutch Card Game, l\'application web gratuite pour suivre vos scores de jeu de cartes. Créée pour les soirées entre amis, interface moderne et intuitive.',
    keywords: 'dutch card game, à propos, application jeu cartes, équipe développement, histoire dutch'
  });

  return (
    <PageShell variant="minimal">
      <StructuredData 
        type="WebApplication" 
        data={{
          name: 'Dutch Card Game',
          description: 'Application web pour le jeu de cartes Dutch',
          applicationCategory: 'Game',
          operatingSystem: 'Web Browser'
        }} 
      />
      
      <UnifiedHeader 
        title="À propos de Dutch"
        showBackButton
        onBack={() => navigate('/')}
        showSettings={true}
      />

      <PageContainer size="md" className="space-y-8">
          {/* Introduction */}
          <Card variant="glass">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  L'application compagnon pour vos soirées jeux
                </h2>
                <p className="max-w-2xl mx-auto leading-relaxed text-muted-foreground">
                  Dutch Card Game est née d'une frustration simple : combien de fois avez-vous perdu 
                  le carnet de scores au milieu d'une partie ? Nous avons créé cette application pour 
                  que vous puissiez vous concentrer sur l'essentiel : passer un bon moment entre amis.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Histoire */}
          <Card variant="glass">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-dutch-orange/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-dutch-orange" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    L'histoire de Dutch Card Game
                  </h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  Tout a commencé lors d'une soirée jeux entre amis, comme tant d'autres. Les scores étaient griffonnés
                  sur un bout de papier, les additions se faisaient de tête, et inévitablement, quelqu'un contestait
                  le total. « Attends, tu as oublié ma manche à 5 points ! » — une phrase que nous avons tous entendue
                  au moins une fois. C'est de cette frustration récurrente qu'est née l'idée de Dutch Card Game :
                  une application simple, rapide et fiable pour suivre les scores de vos parties de Dutch, afin que
                  personne ne perde le fil et que tout le monde puisse se concentrer sur le plaisir de jouer.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Au départ, le projet n'était qu'une simple calculatrice de scores. Mais très vite, nous avons réalisé
                  qu'il y avait une opportunité de créer quelque chose de bien plus riche. Nous avons ajouté un système
                  de statistiques avancées pour suivre l'évolution des joueurs au fil des parties, des graphiques
                  interactifs pour visualiser les scores en temps réel, et un historique complet des parties jouées.
                  La fonctionnalité qui a véritablement transformé l'application a été l'intégration de l'intelligence
                  artificielle avec le Professeur Cartouche, un commentateur virtuel qui analyse chaque manche et
                  délivre des commentaires drôles, pertinents et parfois piquants sur les performances des joueurs.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Le choix de développer Dutch Card Game en tant que Progressive Web App (PWA) a été mûrement réfléchi.
                  Plutôt que de publier une application sur l'App Store ou le Google Play Store — avec les contraintes
                  de validation, de mises à jour et de compatibilité que cela implique — nous avons opté pour une
                  solution universelle. Une PWA fonctionne directement dans le navigateur, peut être installée sur
                  l'écran d'accueil comme une application native, et continue de fonctionner même sans connexion internet.
                  C'est la solution idéale pour un jeu de société : vous sortez votre téléphone, vous ouvrez l'app,
                  et c'est parti. Pas de téléchargement, pas de compte à créer, pas de mise à jour à attendre.
                  Quant au Professeur Cartouche, il est né de notre conviction que la technologie doit aussi faire sourire.
                  Un simple tableau de scores, c'est utile. Un tableau de scores commenté par un personnage attachant
                  et plein d'humour, c'est mémorable.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Fonctionnalités */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="glass">
              <CardContent className="p-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-dutch-blue/10 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-dutch-blue" />
                  </div>
                  <h3 className="text-lg font-semibold">100% Web</h3>
                  <p className="text-sm text-muted-foreground">
                    Aucune installation nécessaire. Fonctionne sur tous vos appareils, même hors-ligne.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="p-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-dutch-purple/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-dutch-purple" />
                  </div>
                  <h3 className="text-lg font-semibold">Multijoueur</h3>
                  <p className="text-sm text-muted-foreground">
                    Jusqu'à 10 joueurs simultanés. Parfait pour les grandes tablées.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="p-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-dutch-orange/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-dutch-orange" />
                  </div>
                  <h3 className="text-lg font-semibold">IA Intégrée</h3>
                  <p className="text-sm text-muted-foreground">
                    Le Professeur Cartouche commente vos parties avec humour et perspicacité.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="p-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-dutch-green/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-dutch-green" />
                  </div>
                  <h3 className="text-lg font-semibold">Gratuit</h3>
                  <p className="text-sm text-muted-foreground">
                    Et ça le restera ! Aucune publicité intrusive, aucun abonnement caché.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comment ça marche */}
          <Card variant="glass">
            <CardContent className="p-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground text-center">
                  Comment fonctionne l'application
                </h2>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                  Dutch Card Game est conçue pour être intuitive et rapide à prendre en main. Voici les étapes
                  pour profiter pleinement de votre expérience de jeu.
                </p>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-dutch-blue/10 flex items-center justify-center font-bold text-dutch-blue">
                      1
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground">Créer une partie</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Commencez par configurer votre partie en choisissant le nombre de joueurs présents autour de la
                        table, de 2 à 10 personnes. Entrez ensuite le prénom de chaque joueur pour personnaliser
                        l'expérience. Vous pouvez également définir une limite de score qui déterminera la fin de la
                        partie. L'interface de configuration est simple et rapide : en quelques secondes, tout est prêt
                        pour lancer votre première manche.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-dutch-purple/10 flex items-center justify-center font-bold text-dutch-purple">
                      2
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground">Jouez votre partie de cartes à la table</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Une fois la partie créée dans l'application, posez votre téléphone et profitez du jeu ! Dutch
                        Card Game n'est pas un jeu vidéo : c'est un compagnon pour votre vrai jeu de cartes physique.
                        Jouez normalement avec vos amis ou votre famille, distribuez les cartes, bluffez, riez, et
                        vivez pleinement l'expérience sociale du jeu de société. L'application attend patiemment
                        que la manche se termine pour entrer en action.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-dutch-orange/10 flex items-center justify-center font-bold text-dutch-orange">
                      3
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground">Saisir les scores après chaque manche</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        À la fin de chaque manche, reprenez votre téléphone et entrez les scores de chaque joueur.
                        L'interface de saisie est optimisée pour être rapide : un clavier numérique adapté, la possibilité
                        de naviguer facilement entre les joueurs, et une validation instantanée. Vous pouvez également
                        indiquer si un joueur a réalisé un « Dutch » (score de 0), ce qui est automatiquement pris en
                        compte dans les statistiques et les commentaires du Professeur Cartouche.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-dutch-green/10 flex items-center justify-center font-bold text-dutch-green">
                      4
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground">Consultez les totaux, classements et commentaires</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Après chaque saisie, l'application calcule automatiquement les totaux cumulés de chaque joueur
                        et met à jour le classement en temps réel. Vous voyez instantanément qui mène la partie, qui
                        est en danger et qui remonte au classement. C'est aussi le moment où le Professeur Cartouche
                        entre en scène : notre commentateur IA analyse la situation et délivre un commentaire unique,
                        parfois encourageant, parfois taquin, toujours divertissant. Ses remarques ajoutent une
                        dimension ludique supplémentaire à chaque manche.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-dutch-blue/10 flex items-center justify-center font-bold text-dutch-blue">
                      5
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground">Explorez les statistiques et l'historique</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        À tout moment pendant ou après la partie, accédez à des statistiques détaillées : graphiques
                        d'évolution des scores au fil des manches, moyennes par joueur, meilleure et pire manche,
                        nombre de Dutch réalisés, et bien plus encore. L'historique complet de vos parties est conservé
                        localement sur votre appareil, vous permettant de revivre vos meilleures soirées et de comparer
                        les performances sur le long terme. Ces données sont présentées sous forme de tableaux et de
                        graphiques interactifs clairs et agréables à consulter.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Pourquoi choisir Dutch */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground text-center">
              Pourquoi choisir Dutch Card Game ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="glass">
                <CardContent className="p-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-dutch-orange/10 flex items-center justify-center">
                        <History className="w-5 h-5 text-dutch-orange" />
                      </div>
                      <h3 className="text-lg font-semibold">Vs. le papier et le stylo</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Fini les carnets de scores égarés, les colonnes mal alignées et les additions approximatives.
                      Avec Dutch Card Game, chaque score est enregistré de manière fiable, les calculs sont
                      automatiques et instantanés, et il n'y a plus jamais d'erreur de mathématiques.
                      Votre historique est conservé indéfiniment, manche après manche, partie après partie.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardContent className="p-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-dutch-blue" />
                      </div>
                      <h3 className="text-lg font-semibold">Vs. les autres applications</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Contrairement à d'autres applications de scores, Dutch Card Game fonctionne hors-ligne,
                      ne nécessite aucune création de compte et est entièrement gratuite sans publicité intrusive.
                      Notre fonctionnalité unique de commentateur IA — le Professeur Cartouche — apporte une touche
                      d'humour et de personnalité que vous ne trouverez nulle part ailleurs.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardContent className="p-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-dutch-green/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-dutch-green" />
                      </div>
                      <h3 className="text-lg font-semibold">Pour les familles</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      L'interface a été pensée pour être accessible à tous les âges. Les enfants adorent les
                      commentaires du Professeur Cartouche, les parents apprécient la simplicité de la saisie
                      des scores, et les grands-parents trouvent l'affichage clair et lisible. Le design coloré
                      et moderne rend l'utilisation agréable pour toute la famille.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardContent className="p-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-dutch-purple/10 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-dutch-purple" />
                      </div>
                      <h3 className="text-lg font-semibold">Pour les joueurs assidus</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Si vous prenez vos parties au sérieux, Dutch Card Game vous offre des statistiques avancées
                      dignes d'un outil professionnel. Courbes d'évolution des scores, moyennes par joueur,
                      analyse des tendances, historique complet des parties passées — tout est là pour vous
                      permettre de suivre votre progression et d'affiner votre stratégie de jeu.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mission */}
          <Card variant="glass">
            <CardContent className="p-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Notre Mission</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Nous croyons que les meilleurs moments se passent autour d'une table, avec des amis, 
                  des cartes et quelques éclats de rire. Notre mission est de faciliter ces moments 
                  précieux en vous débarrassant des tracas logistiques.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Dutch Card Game n'est pas qu'une application, c'est un facilitateur de souvenirs. 
                  Chaque partie enregistrée, chaque statistique calculée, chaque commentaire du 
                  Professeur Cartouche contribue à enrichir l'expérience de jeu.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Technologies et vie privée */}
          <Card variant="glass">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-dutch-green/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-dutch-green" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Technologies et respect de la vie privée
                  </h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  Dutch Card Game est construite en tant que Progressive Web App (PWA), une technologie moderne
                  qui combine le meilleur du web et des applications natives. Concrètement, cela signifie que
                  vous pouvez accéder à l'application depuis n'importe quel navigateur web, l'installer sur
                  l'écran d'accueil de votre smartphone ou tablette, et l'utiliser même lorsque vous n'avez
                  pas de connexion internet. L'application se charge instantanément, fonctionne de manière fluide
                  et reçoit automatiquement les mises à jour sans que vous ayez quoi que ce soit à faire.
                  Cette approche nous permet de proposer une expérience identique sur iPhone, Android, tablette
                  et ordinateur, sans avoir à maintenir plusieurs versions de l'application.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Le respect de votre vie privée est au cœur de nos préoccupations. Toutes les données de vos
                  parties — scores, noms des joueurs, historique — sont stockées exclusivement sur votre propre
                  appareil, dans le stockage local de votre navigateur. Nous ne collectons aucune donnée personnelle,
                  nous n'utilisons aucun cookie de suivi publicitaire, et nous ne partageons aucune information
                  avec des tiers. Il n'y a pas de compte utilisateur à créer, pas d'adresse email à fournir,
                  pas de profil à remplir. Nous adoptons une approche transparente et minimaliste : l'application
                  fait exactement ce qu'elle promet, sans contrepartie cachée. Vos données vous appartiennent,
                  et elles restent sur votre appareil. Point final.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to action */}
          <div className="text-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate('/setup')}

            >
              Commencer une partie
            </Button>
          </div>
      </PageContainer>
    </PageShell>
  );
};

export default AboutPage;
