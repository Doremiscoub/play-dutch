import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

// Only available in development
if (!import.meta.env.DEV) {
  throw new Error('Dev panel only available in development');
}

interface DevPanelState {
  isPremiumOverride: boolean | null;
  isOfflineSimulation: boolean;
  forceAdPlaceholders: boolean;
}

const DevPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<DevPanelState>({
    isPremiumOverride: null,
    isOfflineSimulation: false,
    forceAdPlaceholders: false
  });

  // Load state from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('dev-panel-state');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load dev panel state:', e);
      }
    }
  }, []);

  // Save state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('dev-panel-state', JSON.stringify(state));
    
    // Apply overrides to global objects for testing
    if (typeof window !== 'undefined') {
      (window as any).__DEV_OVERRIDES__ = state;
    }
  }, [state]);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const seedFakeAdEvents = async () => {
    const placements = [
      'homepage-inline', 'game-sidebar-left', 'game-sidebar-right', 
      'game-banner-mobile', 'setup-inline'
    ];
    const events = ['mounted', 'requested', 'rendered', 'error'];
    
    const fakeEvents = [];
    for (let i = 0; i < 20; i++) {
      fakeEvents.push({
        placement: placements[Math.floor(Math.random() * placements.length)],
        event: events[Math.floor(Math.random() * events.length)],
        ts: new Date(Date.now() - Math.random() * 86400000).toISOString()
      });
    }

    try {
      const { error } = await supabase.from('ad_events').insert(fakeEvents);
      if (error) throw error;
      alert('Seeded 20 fake ad events');
    } catch (error) {
      console.error('Failed to seed ad events:', error);
      alert('Failed to seed ad events');
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
        >
          🔧 Dev
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <Card className="border-yellow-300 bg-yellow-50">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm text-yellow-800">🔧 Dev Panel</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          <p className="text-xs text-yellow-600">
            Press Ctrl+Shift+D to toggle
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Premium Override */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Premium Override</label>
              <p className="text-xs text-muted-foreground">
                Force premium/free status
              </p>
            </div>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={state.isPremiumOverride === true ? "default" : "outline"}
                onClick={() => setState(prev => ({ 
                  ...prev, 
                  isPremiumOverride: prev.isPremiumOverride === true ? null : true 
                }))}
                className="text-xs px-2 py-1"
              >
                Premium
              </Button>
              <Button
                size="sm"
                variant={state.isPremiumOverride === false ? "default" : "outline"}
                onClick={() => setState(prev => ({ 
                  ...prev, 
                  isPremiumOverride: prev.isPremiumOverride === false ? null : false 
                }))}
                className="text-xs px-2 py-1"
              >
                Free
              </Button>
            </div>
          </div>

          {/* Offline Simulation */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Offline Mode</label>
              <p className="text-xs text-muted-foreground">
                Simulate offline state
              </p>
            </div>
            <Switch
              checked={state.isOfflineSimulation}
              onCheckedChange={(checked) => setState(prev => ({ 
                ...prev, 
                isOfflineSimulation: checked 
              }))}
            />
          </div>

          {/* Force Ad Placeholders */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Force Ad Placeholders</label>
              <p className="text-xs text-muted-foreground">
                Show placeholders in prod
              </p>
            </div>
            <Switch
              checked={state.forceAdPlaceholders}
              onCheckedChange={(checked) => setState(prev => ({ 
                ...prev, 
                forceAdPlaceholders: checked 
              }))}
            />
          </div>

          <hr className="border-yellow-200" />

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-yellow-800">Quick Actions</h4>
            
            <Button
              size="sm"
              variant="outline"
              onClick={seedFakeAdEvents}
              className="w-full text-xs"
            >
              Seed Fake Ad Events
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open('/admin/ad-diagnostics', '_blank')}
              className="w-full text-xs"
            >
              Open Ad Diagnostics
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                sessionStorage.clear();
                localStorage.clear();
                alert('Storage cleared');
              }}
              className="w-full text-xs"
            >
              Clear All Storage
            </Button>
          </div>

          {/* Current State */}
          <div className="space-y-1 text-xs">
            <h4 className="font-medium text-yellow-800">Current State:</h4>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                Premium: {state.isPremiumOverride?.toString() ?? 'default'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Offline: {state.isOfflineSimulation.toString()}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Ads: {state.forceAdPlaceholders ? 'forced' : 'normal'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevPanel;