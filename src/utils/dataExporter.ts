
import { Game, Player } from '@/types';
import { toast } from 'sonner';

/**
 * Fonction pour exporter toutes les données du jeu
 */
export const exportGameData = () => {
  try {
    // Récupérer toutes les données stockées
    const gameData = {
      games: localStorage.getItem('dutch_games') ? JSON.parse(localStorage.getItem('dutch_games') || '[]') : [],
      players: localStorage.getItem('dutch_players') ? JSON.parse(localStorage.getItem('dutch_players') || '[]') : [],
      settings: {
        soundEnabled: localStorage.getItem('dutch_sound_enabled') === 'true',
        offlineMode: localStorage.getItem('dutch_offline_mode') === 'true',
        theme: localStorage.getItem('dutch_theme') || 'default',
        colorTheme: localStorage.getItem('dutch_color_theme') || 'default',
      },
      version: '1.2.0',
      exportDate: new Date().toISOString(),
    };
    
    // Création du blob et téléchargement
    const blob = new Blob([JSON.stringify(gameData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `dutch_data_export_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Nettoyer
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    
    toast.success('Données exportées avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'exportation des données:', error);
    toast.error('Erreur lors de l\'exportation des données');
    return false;
  }
};

/**
 * Fonction pour importer des données de jeu
 */
export const importGameData = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target || !event.target.result) {
          throw new Error('Erreur de lecture du fichier');
        }
        
        const importedData = JSON.parse(event.target.result as string);
        
        // Vérification de la validité des données
        if (!importedData.version || !importedData.exportDate) {
          throw new Error('Format de fichier non valide');
        }
        
        // Fusion ou remplacement des données
        if (importedData.games && Array.isArray(importedData.games)) {
          const currentGames = localStorage.getItem('dutch_games') 
            ? JSON.parse(localStorage.getItem('dutch_games') || '[]') 
            : [];
            
          // Fusion des jeux, en évitant les doublons
          const mergedGames = [
            ...currentGames,
            ...importedData.games.filter((importedGame: Game) => 
              !currentGames.some((existingGame: Game) => existingGame.id === importedGame.id)
            )
          ];
          
          localStorage.setItem('dutch_games', JSON.stringify(mergedGames));
        }
        
        if (importedData.players && Array.isArray(importedData.players)) {
          const currentPlayers = localStorage.getItem('dutch_players') 
            ? JSON.parse(localStorage.getItem('dutch_players') || '[]') 
            : [];
            
          // Fusion des joueurs, en évitant les doublons
          const mergedPlayers = [
            ...currentPlayers,
            ...importedData.players.filter((importedPlayer: Player) => 
              !currentPlayers.some((existingPlayer: Player) => existingPlayer.id === importedPlayer.id)
            )
          ];
          
          localStorage.setItem('dutch_players', JSON.stringify(mergedPlayers));
        }
        
        // Optionnellement, importer les paramètres
        if (importedData.settings) {
          if (importedData.settings.soundEnabled !== undefined) {
            localStorage.setItem('dutch_sound_enabled', importedData.settings.soundEnabled.toString());
          }
          if (importedData.settings.offlineMode !== undefined) {
            localStorage.setItem('dutch_offline_mode', importedData.settings.offlineMode.toString());
          }
          if (importedData.settings.theme) {
            localStorage.setItem('dutch_theme', importedData.settings.theme);
          }
          if (importedData.settings.colorTheme) {
            localStorage.setItem('dutch_color_theme', importedData.settings.colorTheme);
          }
        }
        
        toast.success('Données importées avec succès');
        resolve(true);
      } catch (error) {
        console.error('Erreur lors de l\'importation des données:', error);
        toast.error('Erreur lors de l\'importation des données');
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      toast.error('Erreur de lecture du fichier');
      reject(error);
    };
    
    reader.readAsText(file);
  });
};

/**
 * Fonction pour importer des données via une interface utilisateur
 */
export const openImportDialog = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        try {
          const imported = await importGameData(target.files[0]);
          resolve(imported);
        } catch (error) {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    };
    
    input.click();
  });
};
