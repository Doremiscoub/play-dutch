
/**
 * Utilitaires pour la gestion des fonctionnalités PWA (Progressive Web App)
 */

/**
 * Vérifie si l'application peut être installée comme PWA
 * @returns Un booléen indiquant si l'application peut être installée
 */
export const canInstallPWA = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Vérifier si les caractéristiques BeforeInstallPrompt sont disponibles
  return (
    'BeforeInstallPromptEvent' in window || 
    (navigator as any).getInstalledRelatedApps !== undefined
  );
};

/**
 * Détecte si l'application s'exécute en mode "installé" (PWA)
 * @returns Un booléen indiquant si l'application est en mode PWA
 */
export const isRunningAsPWA = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Diverses méthodes pour détecter si l'app tourne en mode PWA
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    (window.navigator as any).standalone === true // Pour iOS
  );
};

/**
 * Vérifie si l'appareil est connecté à Internet
 * @returns Un booléen indiquant si l'appareil est en ligne
 */
export const isOnline = (): boolean => {
  if (typeof navigator === 'undefined') return true;
  return navigator.onLine;
};

/**
 * Enregistre un écouteur pour les changements d'état de la connexion
 * @param onLineCallback Fonction appelée quand l'appareil se connecte
 * @param offLineCallback Fonction appelée quand l'appareil se déconnecte
 * @returns Une fonction pour supprimer les écouteurs
 */
export const registerConnectivityListeners = (
  onLineCallback: () => void,
  offLineCallback: () => void
): () => void => {
  if (typeof window === 'undefined') return () => {};
  
  window.addEventListener('online', onLineCallback);
  window.addEventListener('offline', offLineCallback);
  
  return () => {
    window.removeEventListener('online', onLineCallback);
    window.removeEventListener('offline', offLineCallback);
  };
};

/**
 * Récupère la taille occupée par les données en localStorage
 * @returns La taille approximative en Ko
 */
export const getLocalStorageSize = (): number => {
  if (typeof localStorage === 'undefined') return 0;
  
  let totalSize = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalSize += (localStorage[key].length + key.length) * 2; // 2 octets par caractère en UTF-16
    }
  }
  
  return Math.round(totalSize / 1024); // Conversion en Ko
};

/**
 * Nettoie les anciennes données du localStorage pour libérer de l'espace
 * @param maxAgeInDays Âge maximum des données à conserver (en jours)
 */
export const cleanupOldData = (maxAgeInDays: number = 30): void => {
  if (typeof localStorage === 'undefined') return;
  
  const now = new Date();
  const cutoffDate = new Date(now.getTime() - (maxAgeInDays * 24 * 60 * 60 * 1000));
  
  // Nettoyer les anciennes parties
  try {
    const games = JSON.parse(localStorage.getItem('dutch_games') || '[]');
    const filteredGames = games.filter((game: any) => {
      if (!game.date) return true;
      const gameDate = new Date(game.date);
      return gameDate >= cutoffDate;
    });
    
    if (filteredGames.length !== games.length) {
      localStorage.setItem('dutch_games', JSON.stringify(filteredGames));
    }
  } catch (error) {
    console.error('Erreur lors du nettoyage des anciennes parties:', error);
  }
};

export default {
  canInstallPWA,
  isRunningAsPWA,
  isOnline,
  registerConnectivityListeners,
  getLocalStorageSize,
  cleanupOldData
};
