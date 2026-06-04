import React from 'react';
import { GlassCard } from './GlassCard';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  message,
  action
}) => (
  <GlassCard className="p-12 flex flex-col items-center justify-center text-center">
    <div className="w-20 h-20 rounded-full bg-surface-variant/30 flex items-center justify-center text-primary/50 mb-6">
      <span className="material-symbols-outlined text-[40px]">{icon}</span>
    </div>
    <h3 className="font-headline-lg text-title-md text-on-surface mb-2">{title}</h3>
    <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6">
      {message}
    </p>
    {action && <div>{action}</div>}
  </GlassCard>
);
