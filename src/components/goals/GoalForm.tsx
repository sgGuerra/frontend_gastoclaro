"use client";

import React, { useEffect, useState } from 'react';
import { GoalFormData, goalSchema } from '../../schemas/goal.schemas';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Goal } from '../../types/goal.types';

interface GoalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GoalFormData) => Promise<void>;
  initialData?: Goal | null;
  isLoading?: boolean;
}

export const GoalForm: React.FC<GoalFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading
}) => {
  const [formData, setFormData] = useState<GoalFormData>({
    title: '',
    description: '',
    target_amount: 0,
    current_amount: 0,
    deadline: new Date().toISOString().split('T')[0],
    status: 'active',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof GoalFormData, string>>>({});

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        title: initialData.title,
        description: initialData.description || '',
        target_amount: initialData.target_amount,
        current_amount: initialData.current_amount || 0,
        deadline: initialData.deadline.split('T')[0],
        status: initialData.status,
      });
      setErrors({});
    } else if (isOpen) {
      setFormData({
        title: '',
        description: '',
        target_amount: 0,
        current_amount: 0,
        deadline: new Date().toISOString().split('T')[0],
        status: 'active',
      });
      setErrors({});
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'target_amount' || name === 'current_amount' ? Number(value) : value 
    }));
    if (errors[name as keyof GoalFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = goalSchema.safeParse(formData);
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
      title={initialData ? "Editar Meta" : "Nueva Meta de Ahorro"}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              name="title"
              label="Título de la meta"
              placeholder="Ej: Viaje a Europa"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
            />
          </div>
          
          <div className="md:col-span-2">
            <Input
              name="description"
              label="Descripción (Opcional)"
              placeholder="Detalles sobre tu meta"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
            />
          </div>
          
          <div>
            <Input
              name="target_amount"
              type="number"
              step="0.01"
              label="Monto Objetivo"
              icon="flag"
              value={formData.target_amount || ''}
              onChange={handleChange}
              error={errors.target_amount}
            />
          </div>

          <div>
            <Input
              name="current_amount"
              type="number"
              step="0.01"
              label="Ahorro Actual"
              icon="savings"
              value={formData.current_amount || ''}
              onChange={handleChange}
              error={errors.current_amount}
            />
          </div>
          
          <div>
            <Input
              name="deadline"
              type="date"
              label="Fecha Límite"
              value={formData.deadline}
              onChange={handleChange}
              error={errors.deadline}
            />
          </div>
          
          <div>
            <label className="block font-label-sm text-label-sm mb-2 opacity-70">Estado</label>
            <select
              name="status"
              className="w-full bg-white/50 border border-glass-border rounded-xl py-3 px-4 outline-none transition-all font-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Activa</option>
              <option value="completed">Completada</option>
            </select>
            {errors.status && <p className="text-error text-xs mt-1">{errors.status}</p>}
          </div>
        </div>
        
        <div className="pt-4 flex gap-4">
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading} className="flex-1">
            {initialData ? "Actualizar Meta" : "Guardar Meta"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
