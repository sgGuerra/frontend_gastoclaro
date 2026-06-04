"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'; // Note: Decided to use standard state based on previous decisions, let's use standard state for forms
import { ExpenseFormData, expenseSchema } from '../../schemas/expense.schemas';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Expense } from '../../types/expense.types';

interface ExpenseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExpenseFormData) => Promise<void>;
  initialData?: Expense | null;
  isLoading?: boolean;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading
}) => {
  const [formData, setFormData] = useState<ExpenseFormData>({
    category: '',
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    payment_method: 'Efectivo',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ExpenseFormData, string>>>({});

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        category: initialData.category,
        description: initialData.description || '',
        amount: initialData.amount,
        date: initialData.date.split('T')[0], // format date for input
        payment_method: initialData.payment_method || 'Efectivo',
      });
      setErrors({});
    } else if (isOpen) {
      setFormData({
        category: 'Alimentación',
        description: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        payment_method: 'Efectivo',
      });
      setErrors({});
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
    if (errors[name as keyof ExpenseFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = expenseSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    await onSubmit(formData);
    if (!initialData) { // close only on create or if successful
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar Gasto" : "Nuevo Gasto"}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              name="description"
              label="Descripción / Concepto"
              placeholder="Ej: Supermercado Semanal"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
            />
          </div>
          
          <div>
            <Input
              name="amount"
              type="number"
              step="0.01"
              label="Monto"
              icon="attach_money"
              placeholder="0.00"
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
          
          <div>
            <label className="block font-label-sm text-label-sm mb-2 opacity-70">Categoría</label>
            <select
              name="category"
              className="w-full bg-white/50 border border-glass-border rounded-xl py-3 px-4 outline-none transition-all font-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Alimentación">Alimentación</option>
              <option value="Transporte">Transporte</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="Hogar">Hogar</option>
              <option value="Salud">Salud</option>
              <option value="Educación">Educación</option>
              <option value="Otros">Otros</option>
            </select>
            {errors.category && <p className="text-error text-xs mt-1">{errors.category}</p>}
          </div>
          
          <div>
            <label className="block font-label-sm text-label-sm mb-2 opacity-70">Método de Pago</label>
            <select
              name="payment_method"
              className="w-full bg-white/50 border border-glass-border rounded-xl py-3 px-4 outline-none transition-all font-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={formData.payment_method}
              onChange={handleChange}
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
              <option value="Tarjeta de Débito">Tarjeta de Débito</option>
              <option value="Transferencia">Transferencia</option>
            </select>
            {errors.payment_method && <p className="text-error text-xs mt-1">{errors.payment_method}</p>}
          </div>
        </div>
        
        <div className="pt-4 flex gap-4">
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading} className="flex-1">
            {initialData ? "Actualizar Gasto" : "Guardar Gasto"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
