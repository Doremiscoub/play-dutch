/**
 * Composant de monitoring de l'intégrité des scores
 * Pour le debug et la supervision en temps réel
 */
import React, { useState, useEffect } from 'react';
import { Player } from '@/types';
import { auditScoreIntegrity } from '@/utils/scoreEngine';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface ScoreIntegrityMonitorProps {
  players: Player[];
  onFixRequired?: (corrections: any[]) => void;
  autoCheck?: boolean;
  className?: string;
}

export const ScoreIntegrityMonitor: React.FC<ScoreIntegrityMonitorProps> = ({
  players,
  onFixRequired,
  autoCheck = false,
  className = ''
}) => {
  const [auditResult, setAuditResult] = useState<ReturnType<typeof auditScoreIntegrity> | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(null);

  const performAudit = async () => {
    if (isChecking) return;
    
    setIsChecking(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for UX
      const result = auditScoreIntegrity(players);
      setAuditResult(result);
      setLastCheckTime(new Date());
      
      if (!result.isValid && onFixRequired) {
        onFixRequired(result.corrections);
      }
    } catch (error) {
      console.error('Audit error:', error);
      toast.error('Erreur lors de la vérification d\'intégrité');
    } finally {
      setIsChecking(false);
    }
  };

  // Auto-check when players change
  useEffect(() => {
    if (autoCheck && players.length > 0) {
      performAudit();
    }
  }, [players, autoCheck]);

  const getStatusIcon = () => {
    if (isChecking) {
      return <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />;
    }
    
    if (!auditResult) {
      return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
    
    return auditResult.isValid 
      ? <CheckCircle className="w-5 h-5 text-green-500" />
      : <AlertTriangle className="w-5 h-5 text-red-500" />;
  };

  const getStatusText = () => {
    if (isChecking) return 'Vérification en cours...';
    if (!auditResult) return 'Pas encore vérifié';
    
    return auditResult.isValid 
      ? 'Intégrité validée' 
      : `${auditResult.errors.length} problème(s) détecté(s)`;
  };

  const getStatusColor = () => {
    if (isChecking) return 'border-blue-200 bg-blue-50';
    if (!auditResult) return 'border-gray-200 bg-gray-50';
    
    return auditResult.isValid 
      ? 'border-green-200 bg-green-50' 
      : 'border-red-200 bg-red-50';
  };

  if (players.length === 0) {
    return null; // Ne pas afficher si pas de joueurs
  }

  return (
    <Card className={`${getStatusColor()} ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          {getStatusIcon()}
          Intégrité des Scores
          {lastCheckTime && (
            <span className="text-xs text-muted-foreground ml-auto">
              {lastCheckTime.toLocaleTimeString()}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">{getStatusText()}</span>
            <Button 
              onClick={performAudit}
              disabled={isChecking}
              size="sm"
              variant="outline"
            >
              {isChecking ? 'Vérification...' : 'Vérifier'}
            </Button>
          </div>

          {auditResult && !auditResult.isValid && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-red-700">
                Erreurs détectées:
              </div>
              <ul className="text-xs text-red-600 space-y-1">
                {auditResult.errors.slice(0, 3).map((error, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-red-400">•</span>
                    <span>{error}</span>
                  </li>
                ))}
                {auditResult.errors.length > 3 && (
                  <li className="text-red-500 font-medium">
                    ... et {auditResult.errors.length - 3} autres erreurs
                  </li>
                )}
              </ul>
              
              {auditResult.corrections.length > 0 && (
                <div className="text-xs">
                  <div className="font-medium text-blue-700 mb-1">
                    Corrections suggérées:
                  </div>
                  <ul className="text-blue-600 space-y-1">
                    {auditResult.corrections.slice(0, 2).map((correction, index) => (
                      <li key={index}>
                        {correction.playerName}: {correction.from} → {correction.to}
                      </li>
                    ))}
                    {auditResult.corrections.length > 2 && (
                      <li className="font-medium">
                        ... et {auditResult.corrections.length - 2} autres
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {auditResult && auditResult.isValid && (
            <div className="text-xs text-green-700">
              ✅ Tous les scores sont cohérents
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};