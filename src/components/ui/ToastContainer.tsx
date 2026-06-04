"use client";

import React from 'react';
import { useToast } from '../../hooks/useToast';

export const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-margin-mobile right-margin-mobile flex flex-col gap-2 z-50 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="glass-card p-4 rounded-xl flex items-center space-x-3 shadow-xl animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
        >
          <div
            className={`p-2 rounded-full ${
              toast.type === 'success'
                ? 'bg-savings-emerald/20 text-savings-emerald'
                : toast.type === 'error'
                ? 'bg-debts-coral/20 text-debts-coral'
                : toast.type === 'warning'
                ? 'bg-goals-purple/20 text-goals-purple'
                : 'bg-primary/20 text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {toast.type === 'success'
                ? 'check_circle'
                : toast.type === 'error'
                ? 'error'
                : toast.type === 'warning'
                ? 'warning'
                : 'info'}
            </span>
          </div>
          <div>
            {toast.title && <p className="font-title-md text-sm text-on-surface">{toast.title}</p>}
            <p className="font-body-md text-sm text-on-surface-variant">{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
