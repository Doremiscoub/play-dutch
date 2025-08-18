import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';
import { UnifiedCard } from '@/components/ui/unified-card';
import { useSEO } from '@/hooks/useSEO';
import PageShell from '@/components/layout/PageShell';
import EnhancedContentLayout from '@/components/layout/EnhancedContentLayout';

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Politique de Confidentialité - Dutch Card Game',
    description: 'Politique de confidentialité de Dutch Card Game. Protection des données, cookies, stockage local. Application respectueuse de votre vie privée.',
    keywords: 'politique confidentialité, protection données, RGPD, dutch card game, privacy'
  });

  return (
    <PageShell variant="minimal">
      <UnifiedPageLayout
        title="Politique de Confidentialité"
        showBackButton
        onBack={() => navigate('/')}
        backgroundVariant="minimal"
      >
        <EnhancedContentLayout adPlacement="legal" stickyAds>
          <UnifiedCard variant="light" padding="lg">
            <div className="prose prose-gray max-w-none space-y-6">
              <div className="text-sm text-gray-500 mb-6">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </div>

              <section>
                <h2 className="text-xl font-semibold mb-4">1. Collecte des données</h2>
                <p className="text-gray-600 leading-relaxed">
                  Dutch Card Game fonctionne entièrement en local sur votre appareil. Nous ne collectons 
                  aucune donnée personnelle identifiable. Les informations de jeu (noms des joueurs, scores) 
                  sont stockées uniquement dans le stockage local de votre navigateur.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Stockage des données</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Toutes vos données de jeu sont stockées localement sur votre appareil via :
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>LocalStorage du navigateur pour les préférences et l'historique</li>
                  <li>IndexedDB pour les données de parties plus complexes</li>
                  <li>Cache du service worker pour le fonctionnement hors-ligne</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Cookies et tracking</h2>
                <p className="text-gray-600 leading-relaxed">
                  Nous utilisons uniquement des cookies techniques essentiels au fonctionnement de 
                  l'application. Aucun cookie de tracking ou publicitaire n'est utilisé.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Partage de données</h2>
                <p className="text-gray-600 leading-relaxed">
                  Nous ne partageons, ne vendons, ni ne transmettons vos données à des tiers. 
                  L'application fonctionne sans serveur central, garantissant une confidentialité totale.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Sécurité</h2>
                <p className="text-gray-600 leading-relaxed">
                  Bien que nous ne collections pas de données sensibles, nous nous engageons à 
                  maintenir la sécurité de l'application par des mises à jour régulières et 
                  l'utilisation de protocoles HTTPS.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Vos droits</h2>
                <p className="text-gray-600 leading-relaxed">
                  Vous avez un contrôle total sur vos données. Vous pouvez à tout moment supprimer 
                  l'historique de vos parties via les paramètres de l'application ou en vidant 
                  le cache de votre navigateur.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">7. Contact</h2>
                <p className="text-gray-600 leading-relaxed">
                  Pour toute question concernant cette politique de confidentialité, 
                  vous pouvez nous contacter via les paramètres de l'application.
                </p>
              </section>
            </div>
          </UnifiedCard>
        </EnhancedContentLayout>
      </UnifiedPageLayout>
    </PageShell>
  );
};

export default PrivacyPage;
