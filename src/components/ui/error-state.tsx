import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Une erreur est survenue',
  message = 'Veuillez réessayer ultérieurement.',
  onRetry,
  className
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-12 px-4 text-center',
        'bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl',
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-red-500" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="border-red-200 text-red-700 hover:bg-red-50"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Réessayer
        </Button>
      )}
    </motion.div>
  );
}
