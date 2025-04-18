
import { useState } from 'react';

interface UseImageLoaderOptions {
  fallbackImageUrl?: string;
}

interface UseImageLoaderResult {
  imageLoaded: boolean;
  handleImageLoaded: () => void;
  handleImageError: () => void;
  error: boolean;
  currentImageUrl: string;
}

export const useImageLoader = (
  primaryImageUrl: string, 
  options: UseImageLoaderOptions = {}
): UseImageLoaderResult => {
  const { fallbackImageUrl } = options;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(primaryImageUrl);

  const handleImageLoaded = () => {
    console.info(`Image chargée avec succès: ${currentImageUrl}`);
    setImageLoaded(true);
    setError(false);
  };

  const handleImageError = () => {
    console.error(`Erreur lors du chargement de l'image: ${currentImageUrl}`);
    
    if (fallbackImageUrl && currentImageUrl !== fallbackImageUrl) {
      console.info(`Tentative avec l'image de fallback: ${fallbackImageUrl}`);
      setCurrentImageUrl(fallbackImageUrl);
    } else {
      setError(true);
    }
    
    setImageLoaded(false);
  };

  return { 
    imageLoaded, 
    handleImageLoaded, 
    handleImageError, 
    error, 
    currentImageUrl 
  };
};
