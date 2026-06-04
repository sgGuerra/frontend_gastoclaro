import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className={`w-full flex flex-col gap-1 ${className}`}>
        {label && (
          <label className="font-label-sm text-label-sm px-1 opacity-70 text-outline">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full bg-white/40 border ${
              error ? 'border-error' : 'border-glass-border'
            } rounded-xl py-3 px-4 outline-none transition-all font-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-on-surface-variant/50 ${
              icon ? 'pl-10' : ''
            }`}
            {...props}
          />
        </div>
        {error && (
          <span className="font-label-sm text-label-sm text-error px-1 animate-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
