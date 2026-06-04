import React from 'react';

type BadgeColor = 'primary' | 'secondary' | 'emerald' | 'coral' | 'purple' | 'gray';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'primary', className = '' }) => {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary-container/10 text-secondary-container',
    emerald: 'bg-savings-emerald/10 text-savings-emerald',
    coral: 'bg-debts-coral/10 text-debts-coral',
    purple: 'bg-goals-purple/10 text-goals-purple',
    gray: 'bg-surface-variant text-on-surface-variant',
  };

  return (
    <span className={`px-3 py-1 rounded-full font-label-sm text-xs inline-flex items-center ${colorMap[color]} ${className}`}>
      {children}
    </span>
  );
};
