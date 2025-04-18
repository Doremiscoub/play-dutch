
import { useState, useEffect } from 'react';

interface UseImageLoaderResult {
  imageLoaded: boolean;
  handleImageLoaded: () => void;
  error: boolean;
}

export const useImageLoader = (): UseImageLoaderResult => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleImageLoaded = () => {
    console.info("L'image s'est chargée avec succès");
    setImageLoaded(true);
    setError(false);
  };

  const handleImageError = () => {
    console.error("Erreur lors du chargement de l'image");
    setError(true);
    setImageLoaded(false);
  };

  useEffect(() => {
    return () => {
      setImageLoaded(false);
      setError(false);
    };
  }, []);

  return { imageLoaded, handleImageLoaded, error };
};
