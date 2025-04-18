
import { useState, useEffect } from 'react';

interface UseImageLoaderOptions {
  fallbackImageUrl?: string;
}

interface UseImageLoaderResult {
  imageLoaded: boolean;
  error: boolean;
  currentImageUrl: string;
}

export const useImageLoader = (
  primaryImageUrl: string, 
  options: UseImageLoaderOptions = {}
): UseImageLoaderResult => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(primaryImageUrl);
  
  useEffect(() => {
    // Préchargement de l'image pour vérifier si elle existe
    const img = new Image();
    img.src = primaryImageUrl;
    
    img.onload = () => {
      setImageLoaded(true);
      setError(false);
      setCurrentImageUrl(primaryImageUrl);
    };
    
    img.onerror = () => {
      console.error(`Erreur critique: Impossible de charger l'image: ${primaryImageUrl}`);
      setError(true);
      setImageLoaded(false);
    };
    
    return () => {
      // Nettoyage
      img.onload = null;
      img.onerror = null;
    };
  }, [primaryImageUrl]);

  return { 
    imageLoaded, 
    error,
    currentImageUrl 
  };
};
