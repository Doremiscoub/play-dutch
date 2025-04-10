
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

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
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-white rounded-2xl border-white/50">
        <AlertDialogHeader>
          <AlertDialogTitle>Annuler la dernière manche ?</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir annuler la dernière manche ? Les scores seront définitivement perdus.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} className="bg-gray-100 hover:bg-gray-200 text-gray-700">Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-dutch-orange hover:bg-dutch-orange/90 text-white">Confirmer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UndoConfirmationDialog;
