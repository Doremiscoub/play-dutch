import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AdvancedSettings } from '@/components/settings/AdvancedSettings';
import { useSEO } from '@/hooks/useSEO';
import PageContainer from '@/components/layout/PageContainer';

const SettingsPage: React.FC = () => {
  useSEO({
    title: 'Paramètres - Dutch Blitz Score Tracker',
    description: 'Personnalisez votre expérience Dutch avec nos paramètres avancés : thèmes, notifications, synchronisation et plus.',
    keywords: 'paramètres, configuration, thème, synchronisation, dutch blitz'
  });

  return (
    <PageContainer size="md">
      <div>
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Paramètres
          </h1>
          <p className="text-muted-foreground">
            Personnalisez votre expérience Dutch selon vos préférences
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Contenu principal */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Configuration avancée
            </CardTitle>
            <CardDescription>
              Gérez tous les aspects de votre application Dutch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdvancedSettings />
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Vos paramètres sont automatiquement sauvegardés localement et synchronisés si vous êtes connecté.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default SettingsPage;