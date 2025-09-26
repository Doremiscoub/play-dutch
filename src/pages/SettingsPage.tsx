import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AdvancedSettings } from '@/components/settings/AdvancedSettings';
import { useSEO } from '@/hooks/useSEO';
import { DESIGN_TOKENS } from '@/design';

const SettingsPage: React.FC = () => {
  useSEO({
    title: 'Paramètres - Dutch Blitz Score Tracker',
    description: 'Personnalisez votre expérience Dutch avec nos paramètres avancés : thèmes, notifications, synchronisation et plus.',
    keywords: 'paramètres, configuration, thème, synchronisation, dutch blitz'
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
        <Card variant="glassColored" className="border-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ Configuration avancée
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>
            Vos paramètres sont automatiquement sauvegardés localement et synchronisés si vous êtes connecté.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;