
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GestureHandler } from './gesture-handler';
import { AdaptiveLayout, useAdaptiveInterface } from './adaptive-layout';
import { TouchOptimizedButton } from './touch-optimized-button';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { Card } from './card';
import { Badge } from './badge';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Zap, 
  Hand, 
  RotateCcw,
  Vibrate
} from 'lucide-react';

export const MobileExperienceDemo: React.FC = () => {
  const [gestureStatus, setGestureStatus] = useState<string>('Swipez dans n\'importe quelle direction');
  const [pinchScale, setPinchScale] = useState<number>(1);
  const [hapticCount, setHapticCount] = useState<number>(0);
  
  const { 
    isMobile, 
    isTablet, 
    isDesktop, 
    orientation,
    deviceClass,
    getAdaptiveSpacing,
    getAdaptiveTextSize 
  } = useAdaptiveInterface();
  
  const { triggerHaptic, isSupported } = useHapticFeedback();

  const handleGesture = (direction: string) => {
    setGestureStatus(`Swipe ${direction} détecté!`);
    setTimeout(() => setGestureStatus('Swipez dans n\'importe quelle direction'), 2000);
  };

  const handleHapticTest = (pattern: 'light' | 'medium' | 'heavy') => {
    triggerHaptic({ pattern });
    setHapticCount(prev => prev + 1);
  };

  const DeviceIcon = isMobile ? Smartphone : isTablet ? Tablet : Monitor;

  return (
    <AdaptiveLayout
      className="p-4 space-y-6"
      enableTransitions
      mobileLayout={
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-center">Mode Mobile</h2>
          <MobileContent />
        </div>
      }
      tabletLayout={
        <div className="grid grid-cols-2 gap-4">
          <h2 className="col-span-2 text-2xl font-bold text-center">Mode Tablette</h2>
          <TabletContent />
        </div>
      }
      desktopLayout={
        <div className="grid grid-cols-3 gap-6">
          <h2 className="col-span-3 text-3xl font-bold text-center">Mode Desktop</h2>
          <DesktopContent />
        </div>
      }
    >
      {/* Contenu par défaut */}
      <div className={`space-y-6 ${getAdaptiveSpacing()}`}>
        {/* En-tête avec informations sur l'appareil */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <DeviceIcon className="h-6 w-6" />
              <h3 className={`font-semibold ${getAdaptiveTextSize()}`}>
                Expérience {deviceClass.charAt(0).toUpperCase() + deviceClass.slice(1)}
              </h3>
            </div>
            <Badge variant="secondary">{orientation}</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Appareil:</span> {deviceClass}
            </div>
            <div>
              <span className="font-medium">Orientation:</span> {orientation}
            </div>
            <div>
              <span className="font-medium">Tactile:</span> {isMobile ? 'Oui' : 'Non'}
            </div>
            <div>
              <span className="font-medium">Haptique:</span> {isSupported ? 'Supporté' : 'Non supporté'}
            </div>
          </div>
        </Card>

        {/* Zone de démonstration des gestes */}
        <GestureHandler
          onSwipeLeft={() => handleGesture('gauche')}
          onSwipeRight={() => handleGesture('droite')}
          onSwipeUp={() => handleGesture('haut')}
          onSwipeDown={() => handleGesture('bas')}
          onPinch={(scale) => setPinchScale(scale)}
          onDoubleTap={() => setGestureStatus('Double tap détecté!')}
          onLongPress={() => setGestureStatus('Long press détecté!')}
          className="w-full"
        >
          <Card className="p-8 text-center border-2 border-dashed border-gray-300 bg-gradient-to-br from-blue-50 to-purple-50">
            <Hand className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="font-semibold mb-2">Zone de Gestes</h3>
            <p className="text-sm text-gray-600 mb-4">{gestureStatus}</p>
            {pinchScale !== 1 && (
              <motion.div
                animate={{ scale: pinchScale }}
                className="w-16 h-16 bg-blue-500 rounded-full mx-auto"
              />
            )}
          </Card>
        </GestureHandler>

        {/* Boutons de test haptique */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Vibrate className="h-5 w-5" />
            Test Feedback Haptique ({hapticCount})
          </h3>
          
          <div className="grid grid-cols-3 gap-2">
            <TouchOptimizedButton
              onClick={() => handleHapticTest('light')}
              variant="outline"
              className="text-xs"
              disabled={!isSupported}
            >
              Léger
            </TouchOptimizedButton>
            
            <TouchOptimizedButton
              onClick={() => handleHapticTest('medium')}
              variant="outline"
              className="text-xs"
              disabled={!isSupported}
            >
              Moyen
            </TouchOptimizedButton>
            
            <TouchOptimizedButton
              onClick={() => handleHapticTest('heavy')}
              variant="outline"
              className="text-xs"
              disabled={!isSupported}
            >
              Fort
            </TouchOptimizedButton>
          </div>
          
          {!isSupported && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Feedback haptique non supporté sur cet appareil
            </p>
          )}
        </Card>

        {/* Boutons adaptatifs */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Boutons Adaptatifs
          </h3>
          
          <div className="space-y-2">
            <TouchOptimizedButton
              className="w-full"
              longPressAction={() => setGestureStatus('Long press sur bouton détecté!')}
            >
              Bouton Standard (long press activé)
            </TouchOptimizedButton>
            
            <TouchOptimizedButton
              variant="outline"
              className="w-full"
              rippleEffect={true}
              touchFeedback={true}
            >
              Avec Effet Ripple
            </TouchOptimizedButton>
            
            <TouchOptimizedButton
              variant="destructive"
              className="w-full"
              hapticFeedback={false}
            >
              Sans Feedback Haptique
            </TouchOptimizedButton>
          </div>
        </Card>
      </div>
    </AdaptiveLayout>
  );
};

// Composants spécialisés par appareil
const MobileContent: React.FC = () => (
  <Card className="p-4 bg-green-50">
    <h3 className="font-semibold text-green-800 mb-2">Optimisations Mobile</h3>
    <ul className="text-sm text-green-700 space-y-1">
      <li>• Interface compacte</li>
      <li>• Gestes tactiles</li>
      <li>• Feedback haptique</li>
      <li>• Navigation par swipe</li>
    </ul>
  </Card>
);

const TabletContent: React.FC = () => (
  <>
    <Card className="p-4 bg-orange-50">
      <h3 className="font-semibold text-orange-800 mb-2">Mode Tablette</h3>
      <p className="text-sm text-orange-700">
        Interface adaptée pour écrans moyens avec support tactile avancé.
      </p>
    </Card>
    <Card className="p-4 bg-orange-100">
      <h3 className="font-semibold text-orange-800 mb-2">Fonctionnalités</h3>
      <ul className="text-sm text-orange-700 space-y-1">
        <li>• Layout en grille</li>
        <li>• Multi-touch</li>
        <li>• Orientation adaptative</li>
      </ul>
    </Card>
  </>
);

const DesktopContent: React.FC = () => (
  <>
    <Card className="p-4 bg-blue-50">
      <h3 className="font-semibold text-blue-800 mb-2">Mode Desktop</h3>
      <p className="text-sm text-blue-700">
        Interface complète optimisée pour souris et clavier.
      </p>
    </Card>
    <Card className="p-4 bg-blue-100">
      <h3 className="font-semibold text-blue-800 mb-2">Avantages</h3>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>• Plus d'espace</li>
        <li>• Interactions précises</li>
        <li>• Raccourcis clavier</li>
      </ul>
    </Card>
    <Card className="p-4 bg-blue-200">
      <h3 className="font-semibold text-blue-800 mb-2">Performance</h3>
      <p className="text-sm text-blue-700">
        Rendu optimisé pour les écrans haute résolution.
      </p>
    </Card>
  </>
);
