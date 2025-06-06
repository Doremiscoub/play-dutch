import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';
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
          answer: "Le Dutch est un jeu de cartes où l'objectif est de faire le moins de points possible. Chaque carte de cœur vaut des points, l'As de pique vaut 13 points, et la Dame de pique vaut 13 points également. Le joueur qui atteint la limite de points en premier perd la partie."
        },
        {
          question: "Combien de joueurs peuvent jouer ?",
          answer: "Le Dutch peut se jouer de 2 à 10 joueurs. L'application s'adapte automatiquement au nombre de participants et distribue les cartes en conséquence."
        },
        {
          question: "Qu'est-ce que le système 'Dutch' ?",
          answer: "Le système Dutch désigne le joueur qui a 'coupé' (pris des points) pendant la manche. Cette information est utile pour suivre les statistiques et comprendre le déroulement de la partie."
        },
        {
          question: "Comment définir la limite de points ?",
          answer: "Par défaut, la limite est fixée à 100 points, mais vous pouvez la personnaliser lors de la création de la partie. Une fois cette limite atteinte par un joueur, la partie se termine."
        }
      ]
    },
    {
      category: "Utilisation de l'application",
      questions: [
        {
          question: "L'application fonctionne-t-elle hors ligne ?",
          answer: "Oui ! Dutch Card Game est une PWA (Progressive Web App) qui fonctionne entièrement hors ligne. Toutes vos données sont stockées localement sur votre appareil."
        },
        {
          question: "Comment ajouter des scores ?",
          answer: "Cliquez sur le bouton '+' ou 'Ajouter une manche', saisissez les scores de chaque joueur, et indiquez optionnellement qui a 'coupé'. L'application calcule automatiquement les totaux."
        },
        {
          question: "Peut-on annuler la dernière manche ?",
          answer: "Oui, utilisez le bouton 'Annuler' pour supprimer la dernière manche ajoutée. Cette fonction est très utile en cas d'erreur de saisie."
        },
        {
          question: "Comment installer l'application sur mon téléphone ?",
          answer: "Ouvrez Dutch Card Game dans votre navigateur, puis cherchez l'option 'Ajouter à l'écran d'accueil' dans le menu de votre navigateur. L'application s'installera comme une app native."
        }
      ]
    },
    {
      category: "Fonctionnalités",
      questions: [
        {
          question: "Qu'est-ce que le Professeur Cartouche ?",
          answer: "Le Professeur Cartouche est notre IA commentateur qui ajoute de l'humour à vos parties en commentant les scores et les performances des joueurs avec des répliques amusantes."
        },
        {
          question: "L'historique des parties est-il sauvegardé ?",
          answer: "Oui, toutes vos parties terminées sont automatiquement sauvegardées dans l'historique. Vous pouvez consulter les résultats, les statistiques et les performances de chaque joueur."
        },
        {
          question: "Y a-t-il des statistiques disponibles ?",
          answer: "L'application calcule automatiquement diverses statistiques : moyenne des scores, nombre de victoires, meilleures performances, et bien plus encore."
        },
        {
          question: "Peut-on personnaliser l'interface ?",
          answer: "Oui, vous pouvez choisir entre plusieurs thèmes (clair/sombre), personnaliser les couleurs, et ajuster les paramètres d'affichage selon vos préférences."
        }
      ]
    },
    {
      category: "Problèmes techniques",
      questions: [
        {
          question: "Mes données sont-elles sécurisées ?",
          answer: "Absolument ! Toutes vos données restent sur votre appareil. Nous ne collectons aucune information personnelle et l'application fonctionne sans serveur central."
        },
        {
          question: "Que faire si l'application ne se charge pas ?",
          answer: "Vérifiez votre connexion internet, videz le cache de votre navigateur, ou essayez de recharger la page. Si le problème persiste, contactez-nous via les paramètres."
        },
        {
          question: "Puis-je récupérer une partie perdue ?",
          answer: "Si vous aviez commencé une partie, elle devrait être automatiquement sauvegardée. Vérifiez la section 'Reprendre une partie' sur la page d'accueil."
        },
        {
          question: "L'application est-elle compatible avec tous les navigateurs ?",
          answer: "Dutch Card Game fonctionne sur tous les navigateurs modernes : Chrome, Firefox, Safari, Edge. Pour une meilleure expérience, nous recommandons Chrome ou Firefox."
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
      <UnifiedPageLayout
        title="Questions Fréquentes"
        showBackButton
        onBack={() => navigate('/')}
        backgroundVariant="subtle"
      >
        <UnifiedCard variant="light" padding="lg">
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
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            {filteredFAQs.length === 0 && searchTerm && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Aucune question trouvée pour "{searchTerm}"
                </p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-6 bg-gradient-to-r from-dutch-blue/5 to-dutch-purple/5 rounded-lg border">
            <h3 className="text-xl font-bold mb-2">Une question non résolue ?</h3>
            <p className="text-gray-600 mb-4">
              Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter.
              Nous sommes là pour vous aider !
            </p>
            <div className="text-sm text-gray-500">
              Vous pouvez nous joindre via les paramètres de l'application.
            </div>
          </div>
        </UnifiedCard>
      </UnifiedPageLayout>
    </PageShell>
  );
};

export default FAQPage;
