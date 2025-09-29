
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Table as TableIcon, Share2, Printer, FileCog } from 'lucide-react';
import { toast } from 'sonner';
import { Game, Player } from '@/types';
import html2canvas from 'html2canvas';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DESIGN_TOKENS } from '@/design/index';

interface ResultsExporterProps {
  games: Game[];
  currentPlayers?: Player[];
  isGameActive?: boolean;
}

const ResultsExporter: React.FC<ResultsExporterProps> = ({ 
  games, 
  currentPlayers = [],
  isGameActive = false
}) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [includeStats, setIncludeStats] = useState(true);
  const [includePastGames, setIncludePastGames] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleExport = async () => {
    setLoading(true);
    
    try {
      // Prepare the data for export
      let data: any;
      
      if (exportFormat === 'csv') {
        data = generateCSV(includePastGames);
      } else if (exportFormat === 'json') {
        data = generateJSON(includePastGames);
      } else {
        // For PDF, we'll use a different approach
        await generatePDF();
        setLoading(false);
        return;
      }
      
      // Create a blob and download it
      const blob = new Blob([data], { type: getContentType(exportFormat) });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = getFileName(exportFormat);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`Export réussi en format ${exportFormat.toUpperCase()}`, {
        description: `Le fichier ${getFileName(exportFormat)} a été téléchargé`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Erreur lors de l\'export', {
        description: 'Veuillez réessayer ultérieurement',
      });
    }
    
    setLoading(false);
  };
  
  const generateCSV = (includePastGames: boolean): string => {
    let csv = 'Nom du joueur,Score total,Meilleur tour,Pire tour,Tours Dutch,Score moyen\n';
    
    // Current game if active
    if (isGameActive && currentPlayers.length > 0) {
      currentPlayers.forEach(player => {
        const bestRound = player.stats?.bestRound || Math.min(...player.rounds.map(r => r.score).filter(s => s > 0), 0);
        const worstRound = player.stats?.worstRound || Math.max(...player.rounds.map(r => r.score), 0);
        const dutchCount = player.stats?.dutchCount || player.rounds.filter(r => r.isDutch).length;
        const avgScore = player.stats?.averageScore || 
          (player.rounds.length > 0 ? player.rounds.reduce((sum, r) => sum + r.score, 0) / player.rounds.length : 0);
        
        csv += `${player.name},${player.totalScore},${bestRound},${worstRound},${dutchCount},${avgScore.toFixed(1)}\n`;
      });
      
      // Add a separator if including past games
      if (includePastGames && games.length > 0) {
        csv += '\nHistorique des parties\n';
        csv += 'Date,Vainqueur,Nombre de manches,Nombre de joueurs\n';
      }
    }
    
    // Past games
    if (includePastGames && games.length > 0) {
      games.forEach(game => {
        const date = new Date(game.date).toLocaleDateString();
        csv += `${date},${game.winner},${game.rounds},${game.players.length}\n`;
        
        // Add details for each player
        if (includeStats) {
          csv += '\nJoueurs,Score\n';
          game.players.forEach(player => {
            csv += `${player.name},${player.score}\n`;
          });
          csv += '\n';
        }
      });
    }
    
    return csv;
  };
  
  const generateJSON = (includePastGames: boolean): string => {
    const data: any = {};
    
    // Current game if active
    if (isGameActive && currentPlayers.length > 0) {
      data.currentGame = {
        players: currentPlayers.map(player => ({
          name: player.name,
          totalScore: player.totalScore,
          bestRound: player.stats?.bestRound || Math.min(...player.rounds.map(r => r.score).filter(s => s > 0), 0),
          worstRound: player.stats?.worstRound || Math.max(...player.rounds.map(r => r.score), 0),
          dutchCount: player.stats?.dutchCount || player.rounds.filter(r => r.isDutch).length,
          averageScore: player.stats?.averageScore || 
            (player.rounds.length > 0 ? player.rounds.reduce((sum, r) => sum + r.score, 0) / player.rounds.length : 0),
          rounds: includeStats ? player.rounds : undefined
        }))
      };
    }
    
    // Past games
    if (includePastGames) {
      data.pastGames = games.map(game => ({
        date: new Date(game.date).toISOString(),
        winner: game.winner,
        rounds: game.rounds,
        players: game.players
      }));
    }
    
    return JSON.stringify(data, null, 2);
  };
  
  const generatePDF = async (): Promise<void> => {
    toast.info('Préparation du PDF', {
      description: 'Veuillez patienter pendant la génération du document',
    });
    
    try {
      // Create an element to render the content
      const element = document.createElement('div');
      element.style.width = '800px';
      element.style.padding = '20px';
      element.style.backgroundColor = 'white';
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      
      // Add heading
      const heading = document.createElement('h1');
      heading.textContent = 'Résultats Dutch Blitz';
      heading.style.textAlign = 'center';
      heading.style.color = DESIGN_TOKENS.primitive.dutch.blue[500];
      heading.style.margin = '20px 0';
      element.appendChild(heading);
      
      // Add current game if active
      if (isGameActive && currentPlayers.length > 0) {
        const currentGameTitle = document.createElement('h2');
        currentGameTitle.textContent = 'Partie en cours';
        currentGameTitle.style.color = DESIGN_TOKENS.primitive.dutch.purple[500];
        currentGameTitle.style.marginTop = '30px';
        element.appendChild(currentGameTitle);
        
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '10px';
        
        // Add table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Joueur', 'Score', 'Meilleur tour', 'Pire tour', 'Tours Dutch', 'Score moyen'].forEach(text => {
          const th = document.createElement('th');
          th.textContent = text;
          th.style.border = `1px solid ${DESIGN_TOKENS.primitive.neutral[300]}`;
          th.style.padding = '12px';
          th.style.backgroundColor = DESIGN_TOKENS.primitive.neutral[100];
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Add table body
        const tbody = document.createElement('tbody');
        currentPlayers.forEach(player => {
          const row = document.createElement('tr');
          
          const bestRound = player.stats?.bestRound || Math.min(...player.rounds.map(r => r.score).filter(s => s > 0), 0);
          const worstRound = player.stats?.worstRound || Math.max(...player.rounds.map(r => r.score), 0);
          const dutchCount = player.stats?.dutchCount || player.rounds.filter(r => r.isDutch).length;
          const avgScore = player.stats?.averageScore || 
            (player.rounds.length > 0 ? player.rounds.reduce((sum, r) => sum + r.score, 0) / player.rounds.length : 0);
          
          [
            player.name, 
            player.totalScore, 
            bestRound, 
            worstRound, 
            dutchCount, 
            avgScore.toFixed(1)
          ].forEach(text => {
            const td = document.createElement('td');
            td.textContent = String(text);
            td.style.border = `1px solid ${DESIGN_TOKENS.primitive.neutral[300]}`;
            td.style.padding = '12px';
            row.appendChild(td);
          });
          
          tbody.appendChild(row);
        });
        table.appendChild(tbody);
        element.appendChild(table);
      }
      
      // Add past games if requested
      if (includePastGames && games.length > 0) {
        const pastGamesTitle = document.createElement('h2');
        pastGamesTitle.textContent = 'Historique des parties';
        pastGamesTitle.style.color = DESIGN_TOKENS.primitive.dutch.orange[500];
        pastGamesTitle.style.marginTop = '30px';
        element.appendChild(pastGamesTitle);
        
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '10px';
        
        // Add table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Date', 'Vainqueur', 'Manches', 'Joueurs'].forEach(text => {
          const th = document.createElement('th');
          th.textContent = text;
          th.style.border = `1px solid ${DESIGN_TOKENS.primitive.neutral[300]}`;
          th.style.padding = '12px';
          th.style.backgroundColor = DESIGN_TOKENS.primitive.neutral[100];
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Add table body
        const tbody = document.createElement('tbody');
        games.forEach(game => {
          const row = document.createElement('tr');
          
          [
            new Date(game.date).toLocaleDateString(), 
            game.winner, 
            game.rounds, 
            game.players.length
          ].forEach(text => {
            const td = document.createElement('td');
            td.textContent = String(text);
            td.style.border = '1px solid #ddd';
            td.style.padding = '12px';
            row.appendChild(td);
          });
          
          tbody.appendChild(row);
        });
        table.appendChild(tbody);
        element.appendChild(table);
        
        // Include detailed stats if requested
        if (includeStats) {
          games.forEach((game, index) => {
            if (index < 5) { // Limit to 5 past games to keep PDF manageable
              const gameTitle = document.createElement('h3');
              gameTitle.textContent = `Partie du ${new Date(game.date).toLocaleDateString()} - Vainqueur: ${game.winner}`;
              gameTitle.style.color = DESIGN_TOKENS.primitive.dutch.blue[500].replace('hsl(', '').replace(')', '');
              gameTitle.style.marginTop = '20px';
              element.appendChild(gameTitle);
              
              const playersTable = document.createElement('table');
              playersTable.style.width = '100%';
              playersTable.style.borderCollapse = 'collapse';
              playersTable.style.marginTop = '10px';
              
              // Add table header
              const thead = document.createElement('thead');
              const headerRow = document.createElement('tr');
              ['Joueur', 'Score', 'Dutch'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                th.style.border = '1px solid #ddd';
                th.style.padding = '8px';
                th.style.backgroundColor = '#f3f4f6';
                headerRow.appendChild(th);
              });
              thead.appendChild(headerRow);
              playersTable.appendChild(thead);
              
              // Add table body
              const tbody = document.createElement('tbody');
              game.players.forEach(player => {
                const row = document.createElement('tr');
                
                [
                  player.name, 
                  player.score, 
                  player.isDutch ? '✓' : '-'
                ].forEach(text => {
                  const td = document.createElement('td');
                  td.textContent = String(text);
                  td.style.border = '1px solid #ddd';
                  td.style.padding = '8px';
                  row.appendChild(td);
                });
                
                tbody.appendChild(row);
              });
              playersTable.appendChild(tbody);
              element.appendChild(playersTable);
            }
          });
        }
      }
      
      // Add footer
      const footer = document.createElement('div');
      footer.style.marginTop = '30px';
      footer.style.textAlign = 'center';
      footer.style.color = DESIGN_TOKENS.semantic.text.secondary;
      footer.style.fontSize = '12px';
      footer.textContent = `Généré le ${new Date().toLocaleDateString()} par Dutch Blitz Digital Buddy`;
      element.appendChild(footer);
      
      // Add to document, capture as image, then remove
      document.body.appendChild(element);
      const canvas = await html2canvas(element, { scale: 2 });
      document.body.removeChild(element);
      
      // Convert to PDF and download
      const imgData = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = imgData;
      a.download = 'dutch-blitz-resultats.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success('Export réussi en format PNG', {
        description: 'Le fichier d\'image a été téléchargé',
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Erreur lors de la génération du PDF', {
        description: 'Veuillez réessayer ultérieurement',
      });
    }
  };
  
  const getContentType = (format: string): string => {
    switch (format) {
      case 'csv':
        return 'text/csv';
      case 'json':
        return 'application/json';
      default:
        return 'text/plain';
    }
  };
  
  const getFileName = (format: string): string => {
    const date = new Date().toISOString().split('T')[0];
    return `dutch-blitz-resultats-${date}.${format}`;
  };
  
  return (
    <Card className="border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-dutch-blue" />
          Exporter les résultats
        </CardTitle>
        <CardDescription>
          Téléchargez vos résultats dans différents formats
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Format d'export</h3>
            <RadioGroup 
              value={exportFormat} 
              onValueChange={(value) => setExportFormat(value as 'csv' | 'json' | 'pdf')}
              className="grid grid-cols-3 gap-2"
            >
              <div>
                <RadioGroupItem value="csv" id="csv" className="peer sr-only" />
                <Label
                  htmlFor="csv"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white/70 p-3 hover:bg-white hover:border-dutch-blue/30 peer-data-[state=checked]:border-dutch-blue peer-data-[state=checked]:bg-dutch-blue/10 [&:has([data-state=checked])]:border-dutch-blue [&:has([data-state=checked])]:bg-dutch-blue/10"
                >
                  <FileText className="mb-1 h-5 w-5 text-dutch-blue" />
                  <span className="text-sm font-medium">CSV</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem value="json" id="json" className="peer sr-only" />
                <Label
                  htmlFor="json"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white/70 p-3 hover:bg-white hover:border-dutch-blue/30 peer-data-[state=checked]:border-dutch-blue peer-data-[state=checked]:bg-dutch-blue/10 [&:has([data-state=checked])]:border-dutch-blue [&:has([data-state=checked])]:bg-dutch-blue/10"
                >
                  <FileCog className="mb-1 h-5 w-5 text-dutch-orange" />
                  <span className="text-sm font-medium">JSON</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem value="pdf" id="pdf" className="peer sr-only" />
                <Label
                  htmlFor="pdf"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white/70 p-3 hover:bg-white hover:border-dutch-blue/30 peer-data-[state=checked]:border-dutch-blue peer-data-[state=checked]:bg-dutch-blue/10 [&:has([data-state=checked])]:border-dutch-blue [&:has([data-state=checked])]:bg-dutch-blue/10"
                >
                  <TableIcon className="mb-1 h-5 w-5 text-dutch-purple" />
                  <span className="text-sm font-medium">PNG/PDF</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Options</h3>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="include-stats">Inclure les statistiques détaillées</Label>
                  <p className="text-sm text-muted-foreground">Ajoute des détails sur les performances des joueurs</p>
                </div>
                <Switch 
                  id="include-stats" 
                  checked={includeStats}
                  onCheckedChange={setIncludeStats}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="include-history">Inclure l'historique des parties</Label>
                  <p className="text-sm text-muted-foreground">Ajoute les résultats des parties précédentes</p>
                </div>
                <Switch 
                  id="include-history" 
                  checked={includePastGames}
                  onCheckedChange={setIncludePastGames}
                />
              </div>
            </div>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-2">
                <Share2 className="h-4 w-4 mr-2" />
                Prévisualiser le document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Aperçu de l'export</DialogTitle>
              </DialogHeader>
              <div className="p-4 rounded-lg border bg-white/70 max-h-80 overflow-y-auto">
                <p className="font-medium text-lg text-center mb-4 text-dutch-blue">Résultats Dutch Blitz</p>
                
                {isGameActive && currentPlayers.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium text-dutch-purple mb-2">Partie en cours</h3>
                    <div className="border rounded overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted/30">
                          <tr>
                            <th className="p-2 text-left text-xs">Joueur</th>
                            <th className="p-2 text-left text-xs">Score</th>
                            {includeStats && (
                              <>
                                <th className="p-2 text-left text-xs">Best</th>
                                <th className="p-2 text-left text-xs">Dutch</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {currentPlayers.slice(0, 3).map((player, index) => (
                            <tr key={player.id} className="border-t">
                              <td className="p-2 text-xs">{player.name}</td>
                              <td className="p-2 text-xs">{player.totalScore}</td>
                              {includeStats && (
                                <>
                                  <td className="p-2 text-xs">{player.stats?.bestRound || '-'}</td>
                                  <td className="p-2 text-xs">{player.rounds.filter(r => r.isDutch).length}</td>
                                </>
                              )}
                            </tr>
                          ))}
                          {currentPlayers.length > 3 && (
                            <tr className="border-t">
                              <td colSpan={includeStats ? 4 : 2} className="p-2 text-xs text-center text-muted-foreground">
                                + {currentPlayers.length - 3} autres joueurs
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {includePastGames && games.length > 0 && (
                  <div>
                    <h3 className="font-medium text-dutch-orange mb-2">Historique des parties</h3>
                    <div className="border rounded overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted/30">
                          <tr>
                            <th className="p-2 text-left text-xs">Date</th>
                            <th className="p-2 text-left text-xs">Vainqueur</th>
                            <th className="p-2 text-left text-xs">Manches</th>
                          </tr>
                        </thead>
                        <tbody>
                          {games.slice(0, 3).map((game, index) => (
                            <tr key={index} className="border-t">
                              <td className="p-2 text-xs">{new Date(game.date).toLocaleDateString()}</td>
                              <td className="p-2 text-xs">{game.winner}</td>
                              <td className="p-2 text-xs">{game.rounds}</td>
                            </tr>
                          ))}
                          {games.length > 3 && (
                            <tr className="border-t">
                              <td colSpan={3} className="p-2 text-xs text-center text-muted-foreground">
                                + {games.length - 3} autres parties
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Généré le {new Date().toLocaleDateString()} par Dutch Blitz Digital Buddy
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2">
        <Button 
          onClick={handleExport}
          className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-md"
          disabled={loading}
        >
          <Download className="h-4 w-4 mr-2" />
          {loading ? 'Exportation en cours...' : `Exporter en ${exportFormat.toUpperCase()}`}
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => generatePDF()}
        >
          <Printer className="h-4 w-4 mr-2" />
          Imprimer ou enregistrer en PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsExporter;
