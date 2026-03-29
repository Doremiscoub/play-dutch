
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';
import { UnifiedCard } from '@/components/ui/unified-card';
import { useSEO } from '@/hooks/useSEO';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Brain, Trophy, Users, AlertTriangle, Lightbulb } from 'lucide-react';

const GuideStrategy: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Guide de Stratégie Dutch - Astuces et Techniques de Jeu',
    description: 'Maîtrisez le jeu de cartes Dutch avec nos stratégies avancées, astuces de pro et techniques de comptage. Devenez un expert du Dutch Card Game.',
    keywords: 'stratégie dutch, astuces jeu dutch, technique dutch card game, comment gagner dutch, guide expert dutch'
  });

  const strategies = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Stratégie de Base",
      level: "Débutant",
      color: "bg-green-100 text-green-700",
      tips: [
        "Évitez toujours de prendre des cœurs si possible",
        "La Dame de pique vaut 13 points - évitez-la à tout prix",
        "L'As de pique vaut également 13 points",
        "Comptez les cartes jouées pour anticiper ce qui reste"
      ]
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Stratégie Intermédiaire",
      level: "Intermédiaire",
      color: "bg-blue-100 text-blue-700",
      tips: [
        "Mémorisez qui a joué quelles cartes importantes",
        "Défaussez-vous des cartes dangereuses en début de partie",
        "Observez les réactions des autres joueurs",
        "Gardez des cartes de sortie pour les moments critiques"
      ]
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Stratégie Avancée",
      level: "Expert",
      color: "bg-purple-100 text-purple-700",
      tips: [
        "Maîtrisez l'art du 'forcing' pour faire prendre des points",
        "Calculez les probabilités de distribution des cartes",
        "Utilisez la psychologie pour influencer les autres joueurs",
        "Adaptez votre stratégie selon le nombre de joueurs"
      ]
    }
  ];

  const tactiques = [
    {
      title: "La Défausse Stratégique",
      description: "Comment se débarrasser intelligemment des cartes dangereuses",
      details: [
        "Défaussez les cartes hautes de cœur en premier",
        "Gardez les petites cartes pour les fins de plis",
        "Évitez de donner des indices sur vos cartes importantes"
      ]
    },
    {
      title: "Le Comptage de Cartes",
      description: "Techniques pour mémoriser les cartes jouées",
      details: [
        "Comptez les cœurs déjà joués (13 au total)",
        "Suivez la Dame de pique et l'As de pique",
        "Notez mentalement les couleurs épuisées chez chaque joueur"
      ]
    },
    {
      title: "La Lecture des Adversaires",
      description: "Observer et interpréter le comportement des autres",
      details: [
        "Attention aux hésitations lors du jeu",
        "Observez les patterns de défausse",
        "Identifiez qui évite certaines couleurs"
      ]
    }
  ];

  const situationSpeciales = [
    {
      situation: "Vous avez la Dame de pique",
      solution: "Essayez de la défausser rapidement sur un pli que vous ne prenez pas, ou gardez-la si vous pensez pouvoir faire 'chelem' (prendre tous les cœurs)."
    },
    {
      situation: "Fin de partie serrée",
      solution: "Soyez encore plus prudent, chaque point compte. Privilégiez la sécurité à la prise de risque."
    },
    {
      situation: "Un joueur proche de la limite",
      solution: "Concentrez-vous pour lui faire prendre les derniers points nécessaires pour qu'il dépasse la limite."
    },
    {
      situation: "Vous menez largement",
      solution: "Jouez défensif, évitez tout risque inutile. Laissez les autres se battre entre eux."
    }
  ];

  return (
    <UnifiedPageLayout
      title="Guide de Stratégie Dutch"
      showBackButton
      onBack={() => navigate('/rules')}
      backgroundVariant="subtle"
    >
      <UnifiedCard variant="light" padding="lg">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Maîtrisez l'art du Dutch avec nos stratégies éprouvées. 
              Du débutant à l'expert, découvrez les techniques qui feront de vous un redoutable adversaire.
            </p>
          </div>

          {/* Niveaux de Stratégie */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              <Users className="inline mr-2 h-6 w-6 text-dutch-purple" />
              Stratégies par Niveau
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {strategies.map((strategy, index) => (
                <Card key={index} className="border-l-4 border-l-dutch-purple">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {strategy.icon}
                        <CardTitle className="text-lg">{strategy.title}</CardTitle>
                      </div>
                      <Badge className={strategy.color}>
                        {strategy.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {strategy.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-dutch-purple rounded-full mt-2 flex-shrink-0"></div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Tactiques Avancées */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              <Brain className="inline mr-2 h-6 w-6 text-dutch-blue" />
              Tactiques Avancées
            </h2>
            
            <div className="space-y-6">
              {tactiques.map((tactique, index) => (
                <Card key={index} className="border border-border">
                  <CardHeader>
                    <CardTitle className="text-xl text-dutch-purple">
                      {tactique.title}
                    </CardTitle>
                    <p className="text-muted-foreground">{tactique.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {tactique.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Situations Spéciales */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              <AlertTriangle className="inline mr-2 h-6 w-6 text-dutch-orange" />
              Situations Spéciales
            </h2>
            
            <div className="space-y-4">
              {situationSpeciales.map((situation, index) => (
                <Card key={index} className="border-l-4 border-l-dutch-orange">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg text-foreground">
                        🎯 {situation.situation}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>Solution :</strong> {situation.solution}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Conseils Généraux */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              <Trophy className="inline mr-2 h-6 w-6 text-dutch-purple" />
              Conseils de Pro
            </h2>
            
            <Card className="bg-gradient-to-r from-dutch-blue/5 to-dutch-purple/5">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-dutch-purple">Mental et Concentration</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Restez calme même avec de mauvaises cartes</li>
                      <li>• Ne montrez pas vos émotions</li>
                      <li>• Concentrez-vous sur le long terme</li>
                      <li>• Apprenez de vos erreurs</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-dutch-purple">Adaptation au Jeu</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Adaptez votre stratégie au nombre de joueurs</li>
                      <li>• Observez le style de jeu de chacun</li>
                      <li>• Variez vos patterns pour être imprévisible</li>
                      <li>• Profitez des erreurs des autres</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Conclusion */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-dutch-purple/10 to-dutch-blue/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  🎊 Prêt à devenir un maître du Dutch ?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Ces stratégies vous donneront un avantage certain, mais n'oubliez pas : 
                  la pratique reste le meilleur moyen de progresser !
                </p>
                <div className="text-sm text-muted-foreground">
                  Bonne chance et que les meilleures cartes soient avec vous ! 🃏
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </UnifiedCard>
    </UnifiedPageLayout>
  );
};

export default GuideStrategy;
