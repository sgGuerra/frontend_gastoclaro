import React from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <GlassCard className="p-8 flex flex-col items-center justify-center text-center border-error/20 bg-error/5">
    <span className="material-symbols-outlined text-[40px] text-error mb-4">error</span>
    <h3 className="font-title-md text-title-md text-error mb-2">Algo salió mal</h3>
    <p className="font-body-md text-body-md text-on-surface-variant mb-6">{message}</p>
    {onRetry && (
      <Button variant="secondary" onClick={onRetry} leftIcon="refresh">
        Reintentar
      </Button>
    )}
  </GlassCard>
);
