
/**
 * Dialogue de confirmation pour terminer une partie
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
import { Flag } from 'lucide-react';

interface EndGameConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const EndGameConfirmationDialog: React.FC<EndGameConfirmationDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent className="bg-white/90 backdrop-blur-lg border border-white/70 rounded-2xl shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-dutch-orange flex items-center gap-2">
            <Flag className="h-5 w-5" /> Terminer la partie ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            La partie sera enregistrée dans l'historique avec les scores actuels.
            <br/>
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="rounded-xl bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-700"
            onClick={onCancel}
          >
            Continuer de jouer
          </AlertDialogCancel>
          <AlertDialogAction 
            className="rounded-xl bg-dutch-orange text-white hover:bg-dutch-orange/90"
            onClick={onConfirm}
          >
            Terminer la partie
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EndGameConfirmationDialog;
