"use client";

import React from 'react';
import { Goal } from '../../../types/goal.types';
import { Badge } from '../../ui/Badge';
import { ProgressBar } from '../../ui/ProgressBar';

interface GoalTableProps {
  goals: Goal[];
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

export const GoalTable: React.FC<GoalTableProps> = ({ goals, onEdit, onDelete }) => {
  if (goals.length === 0) return null;

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="grid grid-cols-6 p-6 border-b border-glass-border font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/70">
        <div className="col-span-2 md:col-span-3">Meta</div>
        <div className="hidden md:block">Fecha Límite</div>
        <div className="hidden md:block">Estado</div>
        <div className="text-right col-span-4 md:col-span-1">Progreso</div>
      </div>
      
      <div className="divide-y divide-glass-border">
        {goals.map((goal) => {
          const progress = (goal.current_amount / goal.target_amount) * 100;
          return (
            <div key={goal.id} className="grid grid-cols-6 p-6 items-center hover:bg-white/40 transition-colors group">
              <div className="col-span-3 md:col-span-3 pr-4">
                <p className="font-title-md text-body-md font-bold truncate">{goal.title}</p>
                {goal.description && <p className="font-label-sm text-xs text-on-surface-variant truncate">{goal.description}</p>}
                
                {/* Mobile progress summary */}
                <div className="md:hidden mt-2 text-xs text-on-surface-variant">
                  ${goal.current_amount} de ${goal.target_amount}
                </div>
              </div>
              
              <div className="hidden md:block font-body-md text-body-md text-on-surface-variant">
                {new Date(goal.deadline).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
              </div>
              
              <div className="hidden md:flex items-center">
                <Badge color={goal.status === 'completed' ? 'emerald' : 'primary'}>
                  {goal.status === 'completed' ? 'Completada' : 'Activa'}
                </Badge>
              </div>
              
              <div className="col-span-3 md:col-span-1 flex flex-col justify-center">
                <ProgressBar progress={progress} color={goal.status === 'completed' ? 'bg-savings-emerald' : 'bg-goals-purple'} />
                
                <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                  <button onClick={() => onEdit(goal)} className="p-1 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button onClick={() => onDelete(goal.id)} className="p-1 hover:text-error transition-colors">
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
