import React from 'react';

interface SkeletonProps {
  className?: string;
  type?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', type = 'text' }) => {
  const baseClass = "bg-surface-variant/50 animate-[shimmer_1.5s_infinite] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0)_100%)] bg-[length:200%_100%]";
  
  const typeClasses = {
    text: "h-4 rounded-md w-full",
    circular: "rounded-full",
    rectangular: "rounded-xl",
  };

  return (
    <div className={`${baseClass} ${typeClasses[type]} ${className}`} />
  );
};
