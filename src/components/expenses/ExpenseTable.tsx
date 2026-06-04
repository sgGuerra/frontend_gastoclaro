"use client";

import React from 'react';
import { Expense } from '../../../types/expense.types';
import { Badge } from '../../ui/Badge';

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses, onEdit, onDelete }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Alimentación': return { icon: 'restaurant', color: 'expenses-blue' };
      case 'Entretenimiento': return { icon: 'shopping_bag', color: 'goals-purple' };
      case 'Transporte': return { icon: 'directions_car', color: 'savings-emerald' };
      case 'Salud': return { icon: 'medical_services', color: 'debts-coral' };
      default: return { icon: 'payments', color: 'primary' };
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Alimentación': return 'primary';
      case 'Entretenimiento': return 'purple';
      case 'Transporte': return 'secondary';
      case 'Salud': return 'coral';
      default: return 'gray';
    }
  };

  if (expenses.length === 0) return null;

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="grid grid-cols-6 p-6 border-b border-glass-border font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">
        <div className="col-span-2">Concepto</div>
        <div>Categoría</div>
        <div className="hidden md:block">Fecha</div>
        <div className="hidden md:block">Método</div>
        <div className="text-right col-span-2 md:col-span-1">Monto</div>
      </div>
      
      <div className="divide-y divide-glass-border">
        {expenses.map((expense) => {
          const { icon, color } = getCategoryIcon(expense.category);
          return (
            <div key={expense.id} className="grid grid-cols-6 p-6 items-center hover:bg-white/40 transition-colors group">
              <div className="col-span-3 md:col-span-2 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full bg-${color}/10 hidden sm:flex items-center justify-center text-${color}`}>
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div>
                  <p className="font-title-md text-body-md font-bold truncate pr-2" title={expense.description}>{expense.description || 'Sin descripción'}</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center">
                <Badge color={getCategoryBadgeColor(expense.category)}>{expense.category}</Badge>
              </div>
              
              <div className="hidden md:block font-body-md text-body-md text-on-surface-variant">
                {new Date(expense.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
              
              <div className="hidden md:flex items-center gap-2 font-body-md text-body-md text-on-surface-variant">
                <span className="material-symbols-outlined scale-75">
                  {expense.payment_method?.includes('Tarjeta') ? 'credit_card' : 'account_balance'}
                </span>
                <span className="truncate">{expense.payment_method}</span>
              </div>
              
              <div className="col-span-3 md:col-span-1 text-right flex flex-col items-end justify-center">
                <span className="font-title-md text-title-md text-debts-coral font-bold">
                  -${expense.amount.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                  <button onClick={() => onEdit(expense)} className="p-1 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button onClick={() => onDelete(expense.id)} className="p-1 hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
