import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: { icon: 'w-6 h-6', text: 'text-sm' },
  md: { icon: 'w-10 h-10', text: 'text-base' },
  lg: { icon: 'w-14 h-14', text: 'text-lg' },
};

export function LoadingState({
  message = 'Chargement...',
  className,
  size = 'md'
}: LoadingStateProps) {
  const config = sizeConfig[size];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-12',
        className
      )}
    >
      <Loader2 className={cn('animate-spin text-dutch-blue', config.icon)} />
      <p className={cn('text-muted-foreground font-medium', config.text)}>
        {message}
      </p>
    </motion.div>
  );
}
