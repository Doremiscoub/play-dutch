
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { composedClasses } from '@/config/uiConfig';

interface EndGameDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Dialogue de confirmation pour terminer une partie
 */
const EndGameDialog: React.FC<EndGameDialogProps> = ({ open, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className={composedClasses.modalCard}>
        <DialogHeader>
          <DialogTitle className={composedClasses.title}>
            Terminer la partie ?
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            Cette action terminera la partie actuelle et affichera les résultats finaux.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex gap-3 sm:justify-end mt-4">
          <Button
            variant="dutch-outline"
            onClick={onCancel}
            className="flex-1 sm:flex-initial"
          >
            Annuler
          </Button>
          <Button
            variant="dutch-orange"
            onClick={onConfirm}
            className="flex-1 sm:flex-initial"
          >
            Terminer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EndGameDialog;
