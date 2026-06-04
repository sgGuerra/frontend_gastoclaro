import React, { HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false,
  ...props 
}) => {
  return (
    <div 
      className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${
        hoverEffect ? 'hover:-translate-y-1 hover:shadow-xl' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
