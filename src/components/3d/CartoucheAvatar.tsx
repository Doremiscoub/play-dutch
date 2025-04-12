
import React from 'react';
import { useGLTF } from '@react-three/drei';

export function CartoucheAvatar(props: any) {
  // Nous tentons de charger le modèle 3D
  // Si le modèle n'existe pas, nous allons gérer cette erreur silencieusement
  try {
    const { scene } = useGLTF('/models/cartouche.glb');
    return <primitive object={scene} {...props} />;
  } catch (error) {
    console.error('Erreur lors du chargement du modèle 3D:', error);
    // Retourner un élément null en cas d'erreur
    return null;
  }
}
