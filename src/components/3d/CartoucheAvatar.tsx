
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

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

  // Nous tentons de charger le modèle 3D avec une gestion d'erreur améliorée
  try {
    // Utilisation de draco pour la compression si disponible
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
    // Retourner un objet 3D simple en cas d'échec
    return (
      <mesh position={position} rotation={rotation} scale={[scale, scale, scale]}>
        <sphereGeometry args={[0.5, 8, 8]} /> {/* Réduction de la complexité géométrique */}
        <meshStandardMaterial color="#8B5CF6" />
      </mesh>
    );
  }
}

// Préchargement du modèle pour améliorer les performances
// Activer Draco si disponible avec le second paramètre à true
useGLTF.preload('/models/cartouche.glb', true);
