
/**
 * Composant Avatar 3D optimisé du Professeur Cartouche
 * Comprend un fallback robuste et des optimisations de performance
 */
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import useModelsAvailability from '@/hooks/useModelsAvailability';

interface CartoucheAvatarProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function CartoucheAvatar({ 
  scale = 1, 
  position = [0, -0.7, 0], 
  rotation = [0, 0, 0] 
}: CartoucheAvatarProps) {
  // État pour suivre les erreurs de chargement
  const [hasError, setHasError] = useState<boolean>(false);
  const { isModelAvailable } = useModelsAvailability('/models/cartouche.glb');
  
  // Référence pour l'animation
  const modelRef = useRef<Group>(null);
  
  // Animation subtile de "respiration" - optimisée pour les performances
  useFrame(({ clock }) => {
    if (modelRef.current) {
      // Animation légère de respiration avec calculs simplifiés
      const t = clock.getElapsedTime() * 0.3;
      modelRef.current.rotation.y = Math.sin(t) * 0.1;
      
      // Léger mouvement vertical - simplifié
      modelRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05 - 0.7;
    }
  });

  // Si le modèle n'est pas disponible ou a une erreur, afficher un modèle de secours
  if (!isModelAvailable || hasError) {
    return (
      <mesh position={position} rotation={rotation} scale={[scale * 0.5, scale * 0.5, scale * 0.5]}>
        <sphereGeometry args={[0.5, 16, 16]} /> {/* Forme de secours améliorée */}
        <meshStandardMaterial color="hsl(var(--dutch-purple))" />
      </mesh>
    );
  }

  // Essayer de charger le modèle 3D avec gestion d'erreur
  try {
    // Utiliser draco pour la compression si disponible
    const { scene } = useGLTF('/models/cartouche.glb', true);
    
    // Cloner la scène pour éviter les conflits si le composant est monté plusieurs fois
    const clonedScene = scene.clone();
    
    // Optimisation: désactiver les ombres sur le modèle pour améliorer les performances
    clonedScene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = false;
        node.receiveShadow = false;
      }
    });
    
    return (
      <group ref={modelRef} position={position} rotation={rotation}>
        <primitive object={clonedScene} scale={scale} />
      </group>
    );
  } catch (error) {
    console.error('Erreur lors du chargement du modèle 3D:', error);
    setHasError(true);
    
    // Retourner un objet 3D simple en cas d'échec
    return (
      <mesh position={position} rotation={rotation} scale={[scale * 0.5, scale * 0.5, scale * 0.5]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="hsl(var(--dutch-purple))" />
      </mesh>
    );
  }
}

// Préchargement du modèle pour améliorer les performances
// Activer Draco si disponible avec le second paramètre à true
try {
  useGLTF.preload('/models/cartouche.glb', true);
} catch (error) {
  console.error('Erreur lors du préchargement du modèle:', error);
}
