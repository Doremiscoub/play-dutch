
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
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-white rounded-2xl border-white/50">
        <AlertDialogHeader>
          <AlertDialogTitle>Terminer la partie ?</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir terminer cette partie ? Cette action ne peut pas être annulée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} className="bg-gray-100 hover:bg-gray-200 text-gray-700">Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-dutch-purple hover:bg-dutch-purple/90 text-white">Terminer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EndGameConfirmationDialog;
