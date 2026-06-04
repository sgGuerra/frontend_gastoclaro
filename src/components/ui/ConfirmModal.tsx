import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-sm">
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-error-container/20 text-error rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-[40px]">warning</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">
          {message}
        </p>
        <div className="flex flex-col gap-3">
          <Button 
            variant="danger" 
            onClick={onConfirm} 
            isLoading={isLoading}
            className="w-full"
          >
            {confirmText}
          </Button>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            disabled={isLoading}
            className="w-full"
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
