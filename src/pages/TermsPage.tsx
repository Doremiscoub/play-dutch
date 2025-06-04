
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';
import { UnifiedCard } from '@/components/ui/unified-card';
import { useSEO } from '@/hooks/useSEO';

const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Conditions d\'Utilisation - Dutch Card Game',
    description: 'Conditions d\'utilisation de Dutch Card Game. Règles d\'usage, responsabilités, droits et devoirs pour l\'utilisation de notre application.',
    keywords: 'conditions utilisation, CGU, règles usage, dutch card game, terms'
  });

  return (
    <UnifiedPageLayout
      title="Conditions d'Utilisation"
      showBackButton
      onBack={() => navigate('/')}
      backgroundVariant="minimal"
    >
      <UnifiedCard variant="light" padding="lg">
        <div className="prose prose-gray max-w-none space-y-6">
          <div className="text-sm text-gray-500 mb-6">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-4">1. Acceptation des conditions</h2>
            <p className="text-gray-600 leading-relaxed">
              En utilisant Dutch Card Game, vous acceptez ces conditions d'utilisation. 
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Description du service</h2>
            <p className="text-gray-600 leading-relaxed">
              Dutch Card Game est une application web gratuite qui permet de suivre les scores 
              lors de parties du jeu de cartes "Dutch". L'application fonctionne entièrement 
              côté client sans nécessiter de compte utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Utilisation acceptable</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Vous vous engagez à utiliser l'application uniquement pour :
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Suivre les scores de vos parties de jeu</li>
              <li>Découvrir les règles du jeu Dutch</li>
              <li>Partager des moments conviviaux entre amis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Disponibilité du service</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous nous efforçons de maintenir l'application accessible 24h/24 et 7j/7, 
              mais nous ne garantissons pas une disponibilité ininterrompue. Des interruptions 
              peuvent survenir pour maintenance ou en cas de force majeure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Propriété intellectuelle</h2>
            <p className="text-gray-600 leading-relaxed">
              L'application Dutch Card Game, son design, ses fonctionnalités et son contenu 
              sont protégés par le droit d'auteur. Vous pouvez utiliser l'application pour 
              votre usage personnel uniquement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Limitation de responsabilité</h2>
            <p className="text-gray-600 leading-relaxed">
              L'application est fournie "en l'état". Nous ne saurions être tenus responsables 
              de tout dommage direct ou indirect résultant de l'utilisation de l'application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Modifications</h2>
            <p className="text-gray-600 leading-relaxed">
              Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. 
              Les modifications prennent effet dès leur publication sur cette page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. Droit applicable</h2>
            <p className="text-gray-600 leading-relaxed">
              Ces conditions sont régies par le droit français. Tout litige sera soumis 
              aux tribunaux compétents français.
            </p>
          </section>
        </div>
      </UnifiedCard>
    </UnifiedPageLayout>
  );
};

export default TermsPage;
