
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface ScoreFormFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitHandled: boolean;
}

const ScoreFormFooter: React.FC<ScoreFormFooterProps> = ({
  onCancel,
  onSubmit,
  isSubmitting,
  submitHandled
}) => {
  return (
    <DialogFooter className="flex gap-2">
      <Button 
        variant="outline" 
        onClick={onCancel} 
        className="flex-1 sm:flex-none"
        disabled={isSubmitting || submitHandled}
      >
        Annuler
      </Button>
      <Button 
        onClick={onSubmit}
        className="bg-dutch-blue text-white hover:bg-dutch-blue/90 flex-1 sm:flex-none"
        disabled={isSubmitting || submitHandled}
      >
        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
      </Button>
    </DialogFooter>
  );
};

export default ScoreFormFooter;
