"use client";

import React, { useEffect, useState } from 'react';
import { DebtFormData, debtSchema } from '../../schemas/debt.schemas';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Debt } from '../../types/debt.types';

interface DebtFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DebtFormData) => Promise<void>;
  initialData?: Debt | null;
  isLoading?: boolean;
}

export const DebtForm: React.FC<DebtFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading
}) => {
  const [formData, setFormData] = useState<DebtFormData>({
    creditor: '',
    amount: 0,
    interest_rate: 0,
    monthly_payment: 0,
    due_date: '',
    status: 'active',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof DebtFormData, string>>>({});

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        creditor: initialData.creditor,
        amount: initialData.amount,
        interest_rate: initialData.interest_rate || 0,
        monthly_payment: initialData.monthly_payment || 0,
        due_date: initialData.due_date ? initialData.due_date.split('T')[0] : '',
        status: initialData.status,
      });
      setErrors({});
    } else if (isOpen) {
      setFormData({
        creditor: '',
        amount: 0,
        interest_rate: 0,
        monthly_payment: 0,
        due_date: '',
        status: 'active',
      });
      setErrors({});
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: ['amount', 'interest_rate', 'monthly_payment'].includes(name) ? Number(value) : value 
    }));
    if (errors[name as keyof DebtFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = debtSchema.safeParse(formData);
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
      title={initialData ? "Editar Deuda" : "Nueva Deuda"}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              name="creditor"
              label="Acreedor (A quién le debes)"
              placeholder="Ej: Banco Nacional, Tarjeta Visa..."
              value={formData.creditor}
              onChange={handleChange}
              error={errors.creditor}
            />
          </div>
          
          <div>
            <Input
              name="amount"
              type="number"
              step="0.01"
              label="Monto Total"
              icon="account_balance_wallet"
              value={formData.amount || ''}
              onChange={handleChange}
              error={errors.amount}
            />
          </div>
          
          <div>
            <Input
              name="interest_rate"
              type="number"
              step="0.01"
              label="Tasa de Interés (%)"
              icon="percent"
              value={formData.interest_rate || ''}
              onChange={handleChange}
              error={errors.interest_rate}
            />
          </div>

          <div>
            <Input
              name="monthly_payment"
              type="number"
              step="0.01"
              label="Pago Mensual"
              icon="payments"
              value={formData.monthly_payment || ''}
              onChange={handleChange}
              error={errors.monthly_payment}
            />
          </div>
          
          <div>
            <Input
              name="due_date"
              type="date"
              label="Fecha de Vencimiento"
              value={formData.due_date || ''}
              onChange={handleChange}
              error={errors.due_date}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-label-sm text-label-sm mb-2 opacity-70">Estado</label>
            <select
              name="status"
              className="w-full bg-white/50 border border-glass-border rounded-xl py-3 px-4 outline-none transition-all font-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Activa</option>
              <option value="paid">Pagada</option>
            </select>
            {errors.status && <p className="text-error text-xs mt-1">{errors.status}</p>}
          </div>
        </div>
        
        <div className="pt-4 flex gap-4">
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading} className="flex-1">
            {initialData ? "Actualizar Deuda" : "Guardar Deuda"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
