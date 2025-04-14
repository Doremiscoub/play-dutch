
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useProgress, useGLTF } from '@react-three/drei';
import { CartoucheAvatar } from './CartoucheAvatar';

// Précharger le modèle avec compression Draco si disponible
useGLTF.preload('/models/cartouche.glb', true); // Le paramètre true active Draco si disponible

// Composant de chargement avec progression
function Loader() {
  const { progress } = useProgress();
  return (
    <div className="h-full w-full flex items-center justify-center bg-white/50 rounded-full">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dutch-purple mb-2"></div>
        <div className="text-xs font-medium text-dutch-purple/80">
          {progress.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

interface CartoucheSceneProps {
  className?: string;
  autoRotate?: boolean;
  enableZoom?: boolean;
}

export default function CartoucheScene({ 
  className = '',
  autoRotate = true,
  enableZoom = false
}: CartoucheSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={<Loader />}>
        <Canvas 
          shadows 
          className="w-full h-full" 
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ 
            preserveDrawingBuffer: true, 
            antialias: true,
            powerPreference: 'high-performance', // Optimisation pour les appareils mobiles
            alpha: true, // Fond transparent
          }}
          dpr={[1, 2]} // Limite le DPR pour améliorer les performances sur mobile
          performance={{ min: 0.5 }} // Optimisation pour les appareils mobiles
        >
          {/* Éclairage amélioré et optimisé */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow={false} /> {/* Désactivation des ombres pour améliorer les performances */}
          
          {/* Utilisation de Stage pour un environnement optimisé */}
          <Stage 
            environment="studio" 
            intensity={0.6}
            preset="rembrandt"
            shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
            adjustCamera={false} // Améliore la performance en évitant les ajustements dynamiques
          >
            <CartoucheAvatar scale={1.75} />
          </Stage>
          
          <OrbitControls 
            enableZoom={enableZoom} 
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate={autoRotate} 
            autoRotateSpeed={1}
            enableDamping={false} // Désactivé pour améliorer les performances
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
