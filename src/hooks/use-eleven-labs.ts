
import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';

interface ElevenLabsConfig {
  apiKey: string | null;
  voiceId: string;
  modelId: string;
  enabled: boolean;
}

// Voix recommandées pour le Professeur Cartouche
export const DEFAULT_VOICE_ID = 'pqHfZKP75CvOlQylNhV4'; // Lily - voix féminine
export const DEFAULT_MODEL_ID = 'eleven_multilingual_v2';

export function useElevenLabs() {
  const [config, setConfig] = useLocalStorage<ElevenLabsConfig>('dutch_eleven_labs_config', {
    apiKey: null,
    voiceId: DEFAULT_VOICE_ID,
    modelId: DEFAULT_MODEL_ID,
    enabled: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Sauvegarder la clé API
  const saveApiKey = useCallback((apiKey: string) => {
    setConfig({
      ...config,
      apiKey,
      enabled: !!apiKey
    });
    setError(null);
  }, [config, setConfig]);
  
  // Changer la voix utilisée
  const setVoice = useCallback((voiceId: string) => {
    setConfig({
      ...config,
      voiceId
    });
  }, [config, setConfig]);
  
  // Changer le modèle utilisé
  const setModel = useCallback((modelId: string) => {
    setConfig({
      ...config,
      modelId
    });
  }, [config, setConfig]);
  
  // Activer ou désactiver l'intégration
  const setEnabled = useCallback((enabled: boolean) => {
    setConfig({
      ...config,
      enabled
    });
  }, [config, setConfig]);
  
  // Générer l'audio à partir du texte
  const generateSpeech = useCallback(async (text: string) => {
    if (!config.apiKey || !config.enabled) return null;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + config.voiceId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
          'xi-api-key': config.apiKey
        },
        body: JSON.stringify({
          text,
          model_id: config.modelId,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail?.message || `Erreur ${response.status}`);
      }
      
      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la génération du discours');
      console.error('Eleven Labs error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [config]);
  
  // Tester si la clé API est valide
  const testApiKey = useCallback(async (apiKey: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'Accept': 'application/json',
          'xi-api-key': apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: Clé API invalide`);
      }
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la vérification de la clé API');
      console.error('Eleven Labs API key test error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Vérifier si la clé API est définie
  const hasApiKey = !!config.apiKey;
  
  // Donner accès aux voix disponibles
  const availableVoices = [
    { id: 'pqHfZKP75CvOlQylNhV4', name: 'Lily (FR)', description: 'Voix féminine française' },
    { id: 'onwK4e9ZLuTAKqWW03F9', name: 'Daniel (FR)', description: 'Voix masculine française' },
    { id: 'XB0fDUnXU5powFXDhCwa', name: 'Charlotte (FR)', description: 'Voix féminine française' },
    { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (EN)', description: 'Voix féminine anglaise' },
    { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie (EN)', description: 'Voix masculine anglaise' }
  ];
  
  // Intégration avec Web Speech API comme fallback
  const speakWithFallback = useCallback(async (text: string, voiceURI?: string) => {
    if (config.enabled && config.apiKey) {
      const audioUrl = await generateSpeech(text);
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        try {
          await audio.play();
          return true;
        } catch (err) {
          console.error('Erreur lors de la lecture audio:', err);
        }
      }
    }
    
    // Fallback sur Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Trouver une voix française si disponible
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = voices.find(voice => voice.lang.includes('fr'));
      
      // Si une voix spécifique est demandée, essayer de la trouver
      if (voiceURI) {
        const requestedVoice = voices.find(voice => voice.voiceURI === voiceURI);
        if (requestedVoice) {
          selectedVoice = requestedVoice;
        }
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.pitch = 1.1; // Légèrement plus aigu
      utterance.rate = 1.05; // Légèrement plus rapide
      utterance.volume = 1;
      
      window.speechSynthesis.speak(utterance);
      return true;
    }
    
    return false;
  }, [config, generateSpeech]);
  
  return {
    config,
    isLoading,
    error,
    saveApiKey,
    setVoice,
    setModel,
    setEnabled,
    generateSpeech,
    testApiKey,
    hasApiKey,
    availableVoices,
    speakWithFallback
  };
}
