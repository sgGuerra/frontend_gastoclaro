"use client";

import React from 'react';
import { Debt } from '../../types/debt.types';
import { Badge } from '../ui/Badge';

interface DebtTableProps {
  debts: Debt[];
  onEdit: (debt: Debt) => void;
  onDelete: (id: string) => void;
}

export const DebtTable: React.FC<DebtTableProps> = ({ debts, onEdit, onDelete }) => {
  if (debts.length === 0) return null;

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="grid grid-cols-6 p-6 border-b border-glass-border font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">
        <div className="col-span-2 md:col-span-2">Acreedor</div>
        <div className="hidden md:block">Pago Mensual</div>
        <div className="hidden md:block">Vencimiento</div>
        <div className="hidden md:block">Estado</div>
        <div className="text-right col-span-4 md:col-span-1">Total</div>
      </div>
      
      <div className="divide-y divide-glass-border">
        {debts.map((debt) => {
          return (
            <div key={debt.id} className="grid grid-cols-6 p-6 items-center hover:bg-white/40 transition-colors group">
              <div className="col-span-2 md:col-span-2 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-debts-coral/10 hidden sm:flex items-center justify-center text-debts-coral">
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                </div>
                <div>
                  <p className="font-title-md text-body-md font-bold truncate">{debt.creditor}</p>
                  {debt.interest_rate ? <p className="font-label-sm text-xs text-debts-coral truncate">Tasa: {debt.interest_rate}%</p> : null}
                </div>
              </div>
              
              <div className="hidden md:block font-body-md text-body-md text-on-surface-variant">
                {debt.monthly_payment ? `$${debt.monthly_payment.toLocaleString('es-CO')}` : 'N/A'}
              </div>
              
              <div className="hidden md:block font-body-md text-body-md text-on-surface-variant">
                {debt.due_date ? new Date(debt.due_date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }) : 'N/A'}
              </div>
              
              <div className="hidden md:flex items-center">
                <Badge color={debt.status === 'paid' ? 'gray' : 'coral'}>
                  {debt.status === 'paid' ? 'Pagada' : 'Activa'}
                </Badge>
              </div>
              
              <div className="col-span-4 md:col-span-1 text-right flex flex-col items-end justify-center">
                <span className={`font-title-md text-title-md font-bold ${debt.status === 'paid' ? 'text-on-surface-variant opacity-70' : 'text-debts-coral'}`}>
                  ${debt.amount.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                  <button onClick={() => onEdit(debt)} className="p-1 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button onClick={() => onDelete(debt.id)} className="p-1 hover:text-error transition-colors">
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
