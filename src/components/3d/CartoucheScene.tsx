
/**
 * Scène 3D complète pour le Professeur Cartouche
 * Optimisée pour les performances mobiles et avec fallback
 */
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useProgress, useGLTF } from '@react-three/drei';
import { CartoucheAvatar } from './CartoucheAvatar';
import { ErrorBoundary } from 'react-error-boundary';

// Composant pour afficher une erreur de rendu 3D
const FallbackErrorComponent = () => (
  <div className="h-full w-full flex items-center justify-center bg-white/50 rounded-full">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 bg-dutch-purple rounded-full flex items-center justify-center text-white text-xl">
        ?
      </div>
      <div className="text-xs font-medium text-dutch-purple/80 mt-2">
        Erreur 3D
      </div>
    </div>
  </div>
);

// Composant de chargement avec progression
function Loader() {
  const { progress, active } = useProgress();
  
  if (!active) return null;
  
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
  fallbackImage?: string;
}

export default function CartoucheScene({ 
  className = '',
  autoRotate = true,
  enableZoom = false,
  fallbackImage = '/lovable-uploads/a2234ca1-7b29-4c32-8167-2ff6be271875.png'
}: CartoucheSceneProps) {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Vérifier l'existence du modèle 3D
  useEffect(() => {
    const checkModelExistence = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/models/cartouche.glb');
        if (!response.ok) {
          throw new Error(`Modèle non disponible: ${response.status}`);
        }
        setHasError(false);
      } catch (error) {
        console.error('Erreur lors de la vérification du modèle:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkModelExistence();
  }, []);
  
  // Si une erreur est détectée ou le modèle est en cours de chargement, afficher l'image de secours
  if (hasError || isLoading) {
    return (
      <div className={`w-full h-full ${className} flex items-center justify-center`}>
        <img 
          src={fallbackImage}
          alt="Professeur Cartouche"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBmaWxsPSJub25lIj4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iI0YyRjVGRiIvPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjcwIiByPSI0MCIgZmlsbD0iIzhCNUNGNiIvPgogIDxjaXJjbGUgY3g9Ijg1IiBjeT0iNjAiIHI9IjgiIGZpbGw9IndoaXRlIi8+CiAgPGNpcmNsZSBjeD0iMTE1IiBjeT0iNjAiIHI9IjgiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTg1IDgwSDExNUMxMjUgODAgMTI1IDEwMCAxMDAgMTAwQzc1IDEwMCA3NSA4MCA4NSA4MFoiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTYwIDEyMEM2MCAxMjAgNzAgMTYwIDEwMCAxNjBDMTMwIDE2MCAxNDAgMTIwIDE0MCAxMjAiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cGF0aCBkPSJNNjUgNDBDNjUgNDAgNzAgMzAgODUgMzBDMTAwIDMwIDEzMCAzMCAxMzAgNDUiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cGF0aCBkPSJNNzAgNDBDNzAgNDAgNjUgMjAgOTAgMjBDMTI1IDIwIDEzMCAzMCAxMzAgMzAiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8Y2lyY2xlIGN4PSIxMzAiIGN5PSI1MCIgcj0iOCIgZmlsbD0iI0Y5NzMxNiIvPgogIDxwYXRoIGQ9Ik04NSAxMDBDODUgMTAwIDkwIDExMCAxMDAgMTEwQzExMCAxMTAgMTE1IDEwMCAxMTUgMTAwIiBzdHJva2U9IiNGOTczMTYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTc1IDUwQzc1IDUwIDgwIDQwIDg1IDUwIiBzdHJva2U9IiM4QjVDRjYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTEyNSA1MEMxMjUgNTAgMTIwIDQwIDExNSA1MCIgc3Ryb2tlPSIjOEI1Q0Y2IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwYXRoIGQ9Ik03NSAxNTBDNzUgMTUwIDEwMCAxNDAgMTI1IDE1MCIgc3Ryb2tlPSIjOEI1Q0Y2IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
          }}
        />
      </div>
    );
  }

  // Rendu de la scène 3D avec ErrorBoundary pour capturer les erreurs
  return (
    <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
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
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow={false} />
            
            {/* Utilisation de Stage pour un environnement optimisé */}
            <Stage 
              environment="studio" 
              intensity={0.6}
              preset="rembrandt"
              shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
              adjustCamera={false}
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
              enableDamping={false}
            />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
