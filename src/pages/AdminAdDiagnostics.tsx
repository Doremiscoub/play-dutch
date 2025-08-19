import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAds } from '@/contexts/AdContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Only available in development
if (!import.meta.env.DEV) {
  throw new Error('Admin diagnostics only available in development');
}

interface AdEventCount {
  placement: string;
  event: string;
  count: number;
}

const AdminAdDiagnostics: React.FC = () => {
  const { shouldShowAds, isMobile } = useAds();
  const [adEvents, setAdEvents] = useState<AdEventCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get current route placements
  const getCurrentRoutePlacements = () => {
    const path = window.location.pathname;
    const placements: string[] = [];
    
    switch (path) {
      case '/':
        placements.push('homepage-inline');
        break;
      case '/game':
        if (isMobile) {
          placements.push('game-banner-mobile');
        } else {
          placements.push('game-sidebar-left', 'game-sidebar-right');
        }
        break;
      case '/setup':
        placements.push('setup-inline');
        break;
      case '/rules':
        placements.push('rules-inline');
        if (!isMobile) placements.push('rules-sidebar');
        break;
      case '/history':
        placements.push('history-inline');
        if (!isMobile) placements.push('history-sidebar');
        break;
      case '/faq':
        placements.push('faq-inline');
        break;
      default:
        placements.push('content-inline');
        if (!isMobile) placements.push('content-sidebar');
    }
    
    return placements;
  };

  const fetchAdEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('ad_events')
        .select('placement, event')
        .gte('ts', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
      
      if (error) throw error;
      
      // Count events by placement and event type
      const counts: Record<string, AdEventCount> = {};
      data?.forEach(item => {
        const key = `${item.placement}-${item.event}`;
        if (!counts[key]) {
          counts[key] = {
            placement: item.placement,
            event: item.event,
            count: 0
          };
        }
        counts[key].count++;
      });
      
      setAdEvents(Object.values(counts));
    } catch (error) {
      console.error('Failed to fetch ad events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdEvents();
  }, []);

  const envVars = [
    'VITE_ADSENSE_CLIENT_ID',
    'VITE_ADSENSE_SLOT_HOMEPAGE',
    'VITE_ADSENSE_SLOT_GAME_LEFT', 
    'VITE_ADSENSE_SLOT_GAME_RIGHT',
    'VITE_ADSENSE_SLOT_GAME_MOBILE',
    'VITE_ADSENSE_SLOT_SETUP',
    'VITE_ADSENSE_SLOT_RULES_SIDEBAR',
    'VITE_ADSENSE_SLOT_RULES_INLINE',
    'VITE_ADSENSE_SLOT_HISTORY_SIDEBAR',
    'VITE_ADSENSE_SLOT_HISTORY_INLINE',
    'VITE_ADSENSE_SLOT_CONTENT_INLINE',
    'VITE_ADSENSE_SLOT_CONTENT_SIDEBAR',
    'VITE_ADSENSE_SLOT_FAQ',
    'VITE_ADSENSE_SLOT_LEGAL'
  ];

  const currentPlacements = getCurrentRoutePlacements();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
        <h1 className="text-2xl font-bold text-yellow-800 mb-2">
          🔧 AdSense Diagnostics (DEV ONLY)
        </h1>
        <p className="text-yellow-700">
          This page is only available in development mode for debugging AdSense integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Ad Display Status */}
        <Card>
          <CardHeader>
            <CardTitle>Ad Display Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Should Show Ads:</span>
                <Badge variant={shouldShowAds ? "default" : "secondary"}>
                  {shouldShowAds ? "YES" : "NO"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Device:</span>
                <Badge variant="outline">{isMobile ? "Mobile" : "Desktop"}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Route Placements */}
        <Card>
          <CardHeader>
            <CardTitle>Current Route Placements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentPlacements.length > 0 ? (
                currentPlacements.map(placement => (
                  <Badge key={placement} variant="outline" className="mr-2 mb-2">
                    {placement}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground">No placements for this route</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Environment Variables */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent className="max-h-64 overflow-y-auto">
            <div className="space-y-1">
              {envVars.map(envVar => {
                const value = import.meta.env[envVar];
                const isPlaceholder = !value || value.includes('PLACEHOLDER');
                return (
                  <div key={envVar} className="flex justify-between text-xs">
                    <span className="truncate">{envVar.replace('VITE_ADSENSE_', '')}:</span>
                    <Badge 
                      variant={isPlaceholder ? "destructive" : "default"}
                      className="ml-2"
                    >
                      {isPlaceholder ? "MISSING" : "SET"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ad Events (Last 24h) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ad Events (Last 24h)</CardTitle>
          <Button onClick={fetchAdEvents} size="sm" disabled={isLoading}>
            {isLoading ? "Loading..." : "Refresh"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Placement</th>
                  <th className="text-left p-2">Event</th>
                  <th className="text-left p-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {adEvents.length > 0 ? (
                  adEvents.map((event, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{event.placement}</td>
                      <td className="p-2">
                        <Badge variant="outline">{event.event}</Badge>
                      </td>
                      <td className="p-2">{event.count}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center p-4 text-muted-foreground">
                      No ad events in the last 24h
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Missing AdSense IDs Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Missing Real AdSense IDs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            The following environment variables still have placeholder values and need real AdSense slot IDs:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {envVars.filter(envVar => {
              const value = import.meta.env[envVar];
              return !value || value.includes('PLACEHOLDER');
            }).map(envVar => (
              <Badge key={envVar} variant="destructive" className="text-xs">
                {envVar.replace('VITE_ADSENSE_', '')}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAdDiagnostics;