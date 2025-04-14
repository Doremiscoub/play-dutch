
/**
 * Hook pour vérifier la disponibilité des modèles 3D
 */
import { useState, useEffect } from 'react';

interface ModelsAvailabilityResult {
  isModelAvailable: boolean;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook pour vérifier si un modèle 3D est disponible
 */
const useModelsAvailability = (modelPath: string): ModelsAvailabilityResult => {
  const [isModelAvailable, setIsModelAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkModelAvailability = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Essayer de charger le modèle via fetch pour vérifier s'il existe
        const response = await fetch(modelPath, { method: 'HEAD' });
        
        if (response.ok) {
          setIsModelAvailable(true);
        } else {
          setIsModelAvailable(false);
          setError(new Error(`Le modèle ${modelPath} n'est pas disponible`));
        }
      } catch (err) {
        setIsModelAvailable(false);
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setIsLoading(false);
      }
    };

    checkModelAvailability();
  }, [modelPath]);

  return { isModelAvailable, isLoading, error };
};

export default useModelsAvailability;
