"use client";

import React from 'react';
import { Saving } from '../../types/saving.types';

interface SavingTableProps {
  savings: Saving[];
  onEdit: (saving: Saving) => void;
  onDelete: (id: string) => void;
}

export const SavingTable: React.FC<SavingTableProps> = ({ savings, onEdit, onDelete }) => {
  if (savings.length === 0) return null;

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="grid grid-cols-5 p-6 border-b border-glass-border font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">
        <div className="col-span-2 md:col-span-2">Concepto</div>
        <div className="hidden md:block">Origen</div>
        <div className="hidden md:block">Fecha</div>
        <div className="text-right col-span-3 md:col-span-1">Monto</div>
      </div>
      
      <div className="divide-y divide-glass-border">
        {savings.map((saving) => {
          return (
            <div key={saving.id} className="grid grid-cols-5 p-6 items-center hover:bg-white/40 transition-colors group">
              <div className="col-span-2 md:col-span-2 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-savings-emerald/10 hidden sm:flex items-center justify-center text-savings-emerald">
                  <span className="material-symbols-outlined">savings</span>
                </div>
                <div>
                  <p className="font-title-md text-body-md font-bold truncate">{saving.name}</p>
                </div>
              </div>
              
              <div className="hidden md:block font-body-md text-body-md text-on-surface-variant">
                {saving.source || 'Sin especificar'}
              </div>
              
              <div className="hidden md:block font-body-md text-body-md text-on-surface-variant">
                {new Date(saving.date).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
              </div>
              
              <div className="col-span-3 md:col-span-1 text-right flex flex-col items-end justify-center">
                <span className="font-title-md text-title-md text-savings-emerald font-bold">
                  +${saving.amount.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                  <button onClick={() => onEdit(saving)} className="p-1 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button onClick={() => onDelete(saving.id)} className="p-1 hover:text-error transition-colors">
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
