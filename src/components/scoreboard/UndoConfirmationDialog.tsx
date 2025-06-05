
/**
 * Dialogue de confirmation pour annuler une manche
 */
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RotateCcw } from 'lucide-react';

interface UndoConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const UndoConfirmationDialog: React.FC<UndoConfirmationDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-dutch-blue flex items-center gap-2">
            <RotateCcw className="h-5 w-5" /> Annuler la dernière manche ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action supprimera les scores de la dernière manche pour tous les joueurs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="text-gray-700"
            onClick={onCancel}
          >
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-dutch-purple text-white hover:bg-dutch-purple/90"
            onClick={onConfirm}
          >
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UndoConfirmationDialog;
