"use client";

import React, { useEffect, useState } from 'react';
import { SavingFormData, savingSchema } from '../../schemas/saving.schemas';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Saving } from '../../types/saving.types';

interface SavingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SavingFormData) => Promise<void>;
  initialData?: Saving | null;
  isLoading?: boolean;
}

export const SavingForm: React.FC<SavingFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading
}) => {
  const [formData, setFormData] = useState<SavingFormData>({
    name: '',
    amount: 0,
    source: '',
    date: new Date().toISOString().split('T')[0],
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof SavingFormData, string>>>({});

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        name: initialData.name,
        amount: initialData.amount,
        source: initialData.source || '',
        date: initialData.date.split('T')[0],
      });
      setErrors({});
    } else if (isOpen) {
      setFormData({
        name: '',
        amount: 0,
        source: '',
        date: new Date().toISOString().split('T')[0],
      });
      setErrors({});
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'amount' ? Number(value) : value 
    }));
    if (errors[name as keyof SavingFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = savingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    await onSubmit(formData);
    if (!initialData) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar Ahorro" : "Nuevo Ahorro"}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              name="name"
              label="Nombre del fondo o concepto"
              placeholder="Ej: Fondo de Emergencia"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
          </div>
          
          <div>
            <Input
              name="amount"
              type="number"
              step="0.01"
              label="Monto"
              icon="savings"
              value={formData.amount || ''}
              onChange={handleChange}
              error={errors.amount}
            />
          </div>
          
          <div>
            <Input
              name="date"
              type="date"
              label="Fecha"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
            />
          </div>

          <div className="md:col-span-2">
            <Input
              name="source"
              label="Origen (Opcional)"
              placeholder="Ej: Sueldo, Venta de garaje, Regalo..."
              value={formData.source}
              onChange={handleChange}
              error={errors.source}
            />
          </div>
        </div>
        
        <div className="pt-4 flex gap-4">
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading} className="flex-1">
            {initialData ? "Actualizar Ahorro" : "Guardar Ahorro"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
