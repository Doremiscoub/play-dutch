import React from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
};

const toastStyles = {
  success: 'text-green-600 bg-green-50 border-green-200',
  error: 'text-red-600 bg-red-50 border-red-200',
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  info: 'text-blue-600 bg-blue-50 border-blue-200'
};

export const enhancedToast = ({ type, title, description, action }: EnhancedToastProps) => {
  const Icon = toastIcons[type];
  
  return toast.custom((t) => (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className={cn(
        'glass-morphism rounded-xl p-4 shadow-lg border backdrop-blur-md',
        'min-w-[300px] max-w-[400px]',
        toastStyles[type]
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{title}</h4>
          {description && (
            <p className="text-xs opacity-80 mt-1">{description}</p>
          )}
          {action && (
            <button
              onClick={() => {
                action.onClick();
                toast.dismiss(t);
              }}
              className="mt-2 text-xs font-medium underline hover:no-underline"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => toast.dismiss(t)}
          className="text-xs opacity-50 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    </motion.div>
  ));
};

// Fonctions utilitaires pour les différents types de toast
export const successToast = (title: string, description?: string) => 
  enhancedToast({ type: 'success', title, description });

export const errorToast = (title: string, description?: string) => 
  enhancedToast({ type: 'error', title, description });

export const warningToast = (title: string, description?: string) => 
  enhancedToast({ type: 'warning', title, description });

export const infoToast = (title: string, description?: string) => 
  enhancedToast({ type: 'info', title, description });