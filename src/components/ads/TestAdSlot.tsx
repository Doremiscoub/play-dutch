import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TestAdSlotProps {
  placement: string;
  width?: number;
  height?: number;
  className?: string;
}

const TestAdSlot: React.FC<TestAdSlotProps> = ({ 
  placement, 
  width = 728, 
  height = 90, 
  className 
}) => {
  return (
    <Card className={`border-2 border-dashed border-primary/30 ${className}`}>
      <CardContent className="p-4 text-center" style={{ width, height }}>
        <Badge variant="outline" className="mb-2">
          TEST AdSense
        </Badge>
        <div className="text-sm text-muted-foreground">
          Placement: {placement}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {width}x{height}
        </div>
        <div className="text-xs text-orange-600 mt-2">
          🎯 Annonce apparaîtra ici en production
        </div>
      </CardContent>
    </Card>
  );
};

export default TestAdSlot;