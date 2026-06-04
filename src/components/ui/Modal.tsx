import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-gutter">
      <div
        className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className={`glass-card w-full ${maxWidth} rounded-xl relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200`}
      >
        <div className="p-6 border-b border-glass-border flex justify-between items-center bg-surface/50">
          <h3 className="font-headline-lg text-title-md text-primary">{title}</h3>
          <button
            className="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-full hover:bg-surface-variant/50"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
