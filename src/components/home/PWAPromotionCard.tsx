import React from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, Wifi, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const PWAPromotionCard: React.FC = () => {
  const features = [
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Expérience Native",
      description: "Interface optimisée comme une vraie app mobile"
    },
    {
      icon: <Wifi className="h-5 w-5" />,
      title: "Mode Hors Ligne",
      description: "Jouez même sans connexion internet"
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Notifications",
      description: "Recevez des rappels pour vos parties"
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: "Installation Facile", 
      description: "Directement depuis votre navigateur"
    }
  ];

  return (
    <Card className="glass-morphism border-gradient-primary">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-xl">
          <Smartphone className="h-6 w-6 text-primary" />
          Application Mobile PWA
        </CardTitle>
        <CardDescription>
          Installez Dutch sur votre téléphone pour une expérience optimale
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-3 rounded-lg glass-card"
            >
              <div className="flex justify-center mb-2 text-primary">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            onClick={() => {
              // Trigger PWA install banner
              window.dispatchEvent(new Event('show-pwa-install'));
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Installer maintenant
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Compatible avec tous les navigateurs modernes
          </p>
        </div>
      </CardContent>
    </Card>
  );
};