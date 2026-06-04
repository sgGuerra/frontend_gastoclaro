import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-full";
  
  const variants = {
    primary: "bg-primary text-on-primary shadow-lg hover:brightness-110",
    secondary: "bg-secondary-container text-on-secondary-container shadow-lg hover:brightness-110",
    danger: "bg-error text-on-error shadow-lg hover:brightness-110",
    ghost: "bg-transparent text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface border border-transparent hover:border-glass-border",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-body-md",
    lg: "px-8 py-4 text-title-md",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
      ) : leftIcon ? (
        <span className="material-symbols-outlined mr-2 text-[20px]">{leftIcon}</span>
      ) : null}
      
      {children}
      
      {!isLoading && rightIcon && (
        <span className="material-symbols-outlined ml-2 text-[20px]">{rightIcon}</span>
      )}
    </button>
  );
};
