"use client";

import React, { useEffect, useState } from 'react';
import { useGoals } from '../../src/hooks/useGoals';
import { AppLayout } from '../../src/components/layout/AppLayout';
import { PrivateRoute } from '../../src/components/auth/PrivateRoute';
import { GoalTable } from '../../src/components/goals/GoalTable';
import { GoalForm } from '../../src/components/goals/GoalForm';
import { ConfirmModal } from '../../src/components/ui/ConfirmModal';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { Spinner } from '../../src/components/ui/Spinner';
import { ErrorMessage } from '../../src/components/ui/ErrorMessage';
import { Pagination } from '../../src/components/ui/Pagination';
import { Goal } from '../../src/types/goal.types';
import { Button } from '../../src/components/ui/Button';

export default function GoalsPage() {
  const { data, meta, isLoading, error, fetchGoals, createGoal, updateGoal, deleteGoal } = useGoals();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [goalToDelete, setGoalToDelete] = useState<string | null>(null);
  
  const [filterStatus, setFilterStatus] = useState<string>('');

  useEffect(() => {
    fetchGoals({ page: 1, limit: 10 });
  }, [fetchGoals]);

  const handlePageChange = (page: number) => {
    fetchGoals({ page, limit: meta.limit, status: filterStatus || undefined });
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    fetchGoals({ page: 1, limit: meta.limit, status: status || undefined });
  };

  const handleFormSubmit = async (formData: any) => {
    if (editingGoal) {
      await updateGoal(editingGoal.id, formData);
      setEditingGoal(null);
    } else {
      await createGoal(formData);
    }
    setIsFormOpen(false);
  };

  const confirmDelete = async () => {
    if (goalToDelete) {
      await deleteGoal(goalToDelete);
      setIsDeleteOpen(false);
      setGoalToDelete(null);
    }
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Metas de Ahorro</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Establece objetivos financieros y haz seguimiento a tu progreso paso a paso.
            </p>
          </div>
          <Button leftIcon="add" onClick={() => { setEditingGoal(null); setIsFormOpen(true); }}>
            Nueva Meta
          </Button>
        </header>

        <section className="mb-8">
          <div className="glass-card p-2 inline-flex rounded-xl space-x-1">
            <button 
              className={`px-4 py-2 rounded-lg font-label-sm text-sm transition-colors ${filterStatus === '' ? 'bg-primary/20 text-primary font-bold' : 'text-on-surface-variant hover:bg-white/40'}`}
              onClick={() => handleFilterChange('')}
            >
              Todas
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-label-sm text-sm transition-colors ${filterStatus === 'active' ? 'bg-primary/20 text-primary font-bold' : 'text-on-surface-variant hover:bg-white/40'}`}
              onClick={() => handleFilterChange('active')}
            >
              Activas
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-label-sm text-sm transition-colors ${filterStatus === 'completed' ? 'bg-primary/20 text-primary font-bold' : 'text-on-surface-variant hover:bg-white/40'}`}
              onClick={() => handleFilterChange('completed')}
            >
              Completadas
            </button>
          </div>
        </section>

        {isLoading && data.length === 0 ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error.message} onRetry={() => fetchGoals({ page: meta.page, limit: meta.limit })} />
        ) : data.length === 0 ? (
          <EmptyState 
            icon="target" 
            title="Sin metas registradas" 
            message="No has establecido ninguna meta de ahorro. Comienza ahora para alcanzar tus sueños financieros."
            action={<Button onClick={() => { setEditingGoal(null); setIsFormOpen(true); }}>Crear primera meta</Button>}
          />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <GoalTable 
              goals={data} 
              onEdit={(goal) => { setEditingGoal(goal); setIsFormOpen(true); }}
              onDelete={(id) => { setGoalToDelete(id); setIsDeleteOpen(true); }}
            />
            <Pagination 
              currentPage={meta.page} 
              totalPages={meta.totalPages} 
              totalItems={meta.totalItems}
              onPageChange={handlePageChange} 
            />
          </div>
        )}

        <GoalForm 
          isOpen={isFormOpen} 
          onClose={() => { setIsFormOpen(false); setEditingGoal(null); }}
          onSubmit={handleFormSubmit}
          initialData={editingGoal}
          isLoading={isLoading}
        />

        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => { setIsDeleteOpen(false); setGoalToDelete(null); }}
          onConfirm={confirmDelete}
          title="¿Eliminar Meta?"
          message="Se borrará permanentemente de tu cuenta. Todo tu progreso registrado en esta meta se perderá."
          confirmText="Sí, Eliminar Meta"
          cancelText="No, mantener"
          isLoading={isLoading}
        />
      </AppLayout>
    </PrivateRoute>
  );
}
